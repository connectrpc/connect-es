package protoplugin

import (
	"bytes"
	"fmt"
	"sort"
	"strings"
)

type GeneratedFile struct {
	Name             string // path to the file as generated
	ImportPath       string // path used to import this file
	SkipIfEmpty      bool   // unless explicitly set to false, the file is excluded from the output if it has an empty body
	symbolPool       *symbolPool
	header           bytes.Buffer
	elements         []interface{}
	ownSymbolsByName map[string]*Symbol
}

func newGeneratedFile(symbolPool *symbolPool, name string, importPath string) *GeneratedFile {
	f := &GeneratedFile{
		Name:             name,
		ImportPath:       importPath,
		SkipIfEmpty:      true,
		symbolPool:       symbolPool,
		ownSymbolsByName: make(map[string]*Symbol),
	}
	return f
}

// H prints a line to the header of the file. All values are converted to
// string using their default format in Go. The header appears before any
// lines added with P. Imports are inserted right after it.
func (f *GeneratedFile) H(v ...interface{}) {
	for _, x := range v {
		f.header.WriteString(fmt.Sprint(x))
	}
	f.header.WriteByte('\n')
}

// P prints a line to the file. Symbols imported from other files will
// be aliased automatically if necessary. Symbols owned by this file retain
// their name. All other values are converted to string using their default
// format in Go.
func (f *GeneratedFile) P(v ...interface{}) {
	var buf bytes.Buffer
	f.p(&buf, v...)
	buf.WriteByte('\n')
	f.elements = append(f.elements, buf.String())
}

func (f *GeneratedFile) p(buf *bytes.Buffer, v ...interface{}) {
	for _, x := range v {
		switch x := x.(type) {
		case []interface{}:
			f.p(buf, x...)
		case *Symbol:
			if buf.Len() > 0 {
				f.elements = append(f.elements, buf.String())
				buf.Reset()
			}
			f.elements = append(f.elements, x)
		default:
			buf.WriteString(fmt.Sprint(x))
		}
	}
}

// Symbol reserves an identifier in this file. Repeated calls with the same
// name will return the same instance. If the Symbol is printed in another
// file, it is automatically imported.
func (f *GeneratedFile) Symbol(name string) *Symbol {
	s, ok := f.ownSymbolsByName[name]
	if !ok {
		s = f.symbolPool.new(name, f.Name)
		f.ownSymbolsByName[name] = s
	}
	return s
}

func (f *GeneratedFile) Import(name string, from string) *Symbol {
	return f.symbolPool.new(name, from)
}

func (f *GeneratedFile) GetName() string {
	return f.Name
}

func (f *GeneratedFile) IsEmpty() bool {
	for _, x := range f.elements {
		switch e := x.(type) {
		case string:
			e = strings.TrimSpace(e)
			e = strings.TrimSuffix(e, "\n")
			if len(e) > 0 {
				return false
			}
		}
	}
	return true
}

func (f *GeneratedFile) GetContent() string {
	var buf bytes.Buffer
	buf.Write(f.header.Bytes())
	if f.header.Len() > 0 {
		buf.WriteByte('\n')
	}
	var imports bytes.Buffer
	symbolToIdentifier := f.processSymbols(func(typeOnly bool, from string, names map[string]string) {
		x := make([]string, 0, len(names))
		for name, alias := range names {
			if len(alias) > 0 {
				x = append(x, name+" as "+alias)
			} else {
				x = append(x, name)
			}
		}
		sort.Strings(x)
		y := strings.Join(x, ", ")
		// TODO support require()
		// TODO .js extension optional?
		if typeOnly {
			fmt.Fprintf(&imports, "import type {%s} from %q;\n", y, from)
		} else {
			fmt.Fprintf(&imports, "import {%s} from %q;\n", y, from)
		}
	})
	buf.Write(imports.Bytes())
	if imports.Len() > 0 {
		buf.WriteByte('\n')
	}
	for _, x := range f.elements {
		switch e := x.(type) {
		case string:
			buf.WriteString(e)
		case *Symbol:
			buf.WriteString(symbolToIdentifier[e.id])
		}
	}
	return buf.String()
}

func (f *GeneratedFile) processSymbols(makeImportStatement func(typeOnly bool, from string, names map[string]string)) map[symbolID]string {

	var symbolToIdentifier = make(map[symbolID]string) // identifiers to use in the output
	var symbolToIsValue = make(map[symbolID]bool)      // symbols that need a value import (as opposed to a type-only import)
	var identifiersTaken = make(map[string]bool)       // taken in this file
	var foreignSymbols []*Symbol                       // foreign symbols need an import

	// Walk through all symbols used and populate the collections above.
	for _, e := range f.elements {
		if s, ok := e.(*Symbol); ok {
			symbolToIdentifier[s.id] = s.Name
			if !s.typeOnly {
				// a symbol is only type-imported as long as all uses are type-only
				symbolToIsValue[s.id] = true
			}
			switch s.From {
			case f.ImportPath:
				// always reserve the names of symbols defined in this file
				identifiersTaken[s.Name] = true
			default:
				foreignSymbols = append(foreignSymbols, s)
			}
		}
	}

	// Walk through all foreign symbols and make their identifiers unique.
	handledSymbols := make(map[symbolID]bool)
	for _, s := range foreignSymbols {
		if handledSymbols[s.id] {
			continue
		}
		handledSymbols[s.id] = true
		if !identifiersTaken[s.Name] {
			identifiersTaken[s.Name] = true
			continue
		}
		var i = 1
		var alias string
		for {
			alias = fmt.Sprintf("%s$%d", s.Name, i)
			if !identifiersTaken[alias] {
				break
			}
			i++
		}
		identifiersTaken[alias] = true
		symbolToIdentifier[s.id] = alias
	}

	// Group foreign symbols by their source.
	type imp struct {
		types  map[string]string // type-only imports, name to (optional) alias
		values map[string]string // value imports, name to (optional) alias
	}
	sourceToImport := make(map[string]*imp)
	for _, s := range foreignSymbols {
		i, ok := sourceToImport[s.From]
		if !ok {
			i = &imp{
				types:  make(map[string]string),
				values: make(map[string]string),
			}
			sourceToImport[s.From] = i
		}
		alias := symbolToIdentifier[s.id]
		if alias == s.Name {
			alias = ""
		}
		if symbolToIsValue[s.id] {
			i.values[s.Name] = alias
		} else {
			i.types[s.Name] = alias
		}
	}

	// Make import statements.
	imported := make(map[string]bool)
	for _, s := range foreignSymbols {
		if imported[s.From] {
			continue
		}
		imported[s.From] = true
		i := sourceToImport[s.From]
		from := makeImportPathRelative(f.ImportPath, s.From)
		if len(i.types) > 0 {
			makeImportStatement(true, from, i.types)
		}
		if len(i.values) > 0 {
			makeImportStatement(false, from, i.values)
		}
	}

	return symbolToIdentifier
}

type symbolID uint64

type Symbol struct {
	Name     string
	From     string
	typeOnly bool
	id       symbolID
}

func (s *Symbol) ToTypeOnly() *Symbol {
	if s.typeOnly {
		return s
	}
	return &Symbol{
		Name:     s.Name,
		From:     s.From,
		typeOnly: true,
		id:       s.id,
	}
}

type symbolPool struct {
	c uint64
	m map[string]map[string]symbolID
}

func (p *symbolPool) new(name string, from string) *Symbol {
	if p.m == nil {
		p.m = make(map[string]map[string]symbolID)
	}
	if _, ok := p.m[from]; !ok {
		p.m[from] = make(map[string]symbolID)
	}
	id, ok := p.m[from][name]
	if !ok {
		p.c++
		id = symbolID(p.c)
		p.m[from][name] = id
	}
	return &Symbol{
		Name:     name,
		From:     from,
		typeOnly: false,
		id:       id,
	}
}
