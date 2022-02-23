package protoplugin

import (
	"reflect"
	"testing"
)

func TestSymbol(t *testing.T) {
	symbol := &symbolPool{}
	t.Run("is re-used", func(t *testing.T) {
		f := newGeneratedFile(symbol, "t.js", "t.js")
		a := f.Symbol("A")
		a2 := f.Symbol("A")
		if a != a2 {
			t.Error("expected same symbol")
		}
	})
	t.Run("keeps its name", func(t *testing.T) {
		f := newGeneratedFile(symbol, "t.js", "t.js")
		f.P(f.Symbol("A"))
		const wantContent = "A\n"
		gotContent := f.GetContent()
		if gotContent != wantContent {
			t.Errorf("want %q, got %q", wantContent, gotContent)
		}
	})
}

func TestImport(t *testing.T) {
	symbol := &symbolPool{}
	t.Run("import clashes with own identifier", func(t *testing.T) {
		f := newGeneratedFile(symbol, "t.js", "t.js")
		f.P(
			symbol.new("A", "t2.js"),
			symbol.new("A", "t.js"),
		)
		assertGeneratedFileImports(t, f, generatedFileImports{
			typeOnly: false,
			from:     "t2.js",
			names:    map[string]string{"A": "A$1"},
		})
	})
	t.Run("import many names", func(t *testing.T) {
		f := newGeneratedFile(symbol, "t.js", "t.js")
		f.P(
			symbol.new("A", "t2.js"),
			symbol.new("B", "t2.js"),
			symbol.new("C", "t2.js"),
			symbol.new("D", "t2.js"),
		)
		assertGeneratedFileImports(t, f, generatedFileImports{
			typeOnly: false,
			from:     "t2.js",
			names:    map[string]string{"A": "", "B": "", "C": "", "D": ""},
		})
	})
	t.Run("imports clash", func(t *testing.T) {
		f := newGeneratedFile(symbol, "t.js", "t.js")
		f.P(
			symbol.new("A", "t2.js"),
			symbol.new("A", "t3.js"),
		)
		assertGeneratedFileImports(t, f, generatedFileImports{
			typeOnly: false,
			from:     "t2.js",
			names:    map[string]string{"A": ""},
		}, generatedFileImports{
			typeOnly: false,
			from:     "t3.js",
			names:    map[string]string{"A": "A$1"},
		})
	})
	t.Run("import clashes with own identifier", func(t *testing.T) {
		f := newGeneratedFile(symbol, "t.js", "t.js")
		f.P(
			symbol.new("A", "t2.js"),
			symbol.new("A", "t.js"),
		)
		assertGeneratedFileImports(t, f, generatedFileImports{
			typeOnly: false,
			from:     "t2.js",
			names:    map[string]string{"A": "A$1"},
		})
	})
}

type generatedFileImports struct {
	typeOnly bool
	from     string
	names    map[string]string
}

func assertGeneratedFileImports(t *testing.T, f *GeneratedFile, want ...generatedFileImports) {
	got := make([]generatedFileImports, 0)
	f.processSymbols(func(typeOnly bool, from string, names map[string]string) {
		got = append(got, generatedFileImports{typeOnly, from, names})
	})
	if len(got) != len(want) {
		t.Errorf("got %d imports, want %d", len(got), len(want))
	}
	for i, g := range got {
		w := want[i]
		if w.typeOnly != g.typeOnly {
			t.Errorf("got import[%d] typeOnly %t, want %t", i, g.typeOnly, w.typeOnly)
		}
		if w.from != g.from {
			t.Errorf("got import[%d] from %q, want %q", i, g.from, w.from)
		}
		if !reflect.DeepEqual(w.names, g.names) {
			t.Errorf("got import[%d] names %q, want %q", i, g.names, w.names)
		}
	}
}
