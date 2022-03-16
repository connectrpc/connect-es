// Copyright 2020-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package genpb

import (
	"bytes"
	"errors"
	"strconv"
	"unicode/utf8"
)

var errUnescape = errors.New("cannot unescape")

// unescapeBytesDefaultValue parses a text-encoded default value (proto2) of a
// BYTES field.
func unescapeBytesDefaultValue(str string) ([]byte, error) {
	p := newInput(str)
	var b bytes.Buffer
	for p.next() {
		switch p.r {
		case '\\':
			if p.next() {
				switch p.r {
				case '\\':
					b.WriteRune(p.r)
				case 'b':
					b.WriteRune('\b')
				case 'f':
					b.WriteRune('\f')
				case 'n':
					b.WriteRune('\n')
				case 'r':
					b.WriteRune('\r')
				case 't':
					b.WriteRune('\t')
				case 'v':
					b.WriteRune('\v')
				case '0', '1', '2', '3', '4', '5', '6', '7':
					s := string(p.r)
					t, ok := p.take(2)
					if !ok {
						return nil, errUnescape
					}
					s = s + t
					i, err := strconv.ParseUint(s, 8, 8)
					if err != nil {
						return nil, errors.New("cannot parse " + s)
					}
					b.WriteByte(byte(i))
				case 'x':
					p.next()
					s, ok := p.take(2)
					if !ok {
						return nil, errUnescape
					}
					i, err := strconv.ParseUint(s, 16, 64)
					if err != nil {
						return nil, errUnescape
					}
					b.WriteByte(byte(i))
				case 'u':
					p.next()
					s, ok := p.take(4)
					if !ok {
						return nil, errUnescape
					}
					i, err := strconv.ParseUint(s, 16, 64)
					if err != nil {
						return nil, errUnescape
					}
					b.WriteRune(rune(i))
				case 'U':
					p.next()
					s, ok := p.take(8)
					if !ok {
						return nil, errUnescape
					}
					i, err := strconv.ParseUint(s, 16, 64)
					if err != nil {
						return nil, errUnescape
					}
					b.WriteRune(rune(i))
				}
			}
		default:
			b.WriteRune(p.r)
		}
	}
	return b.Bytes(), nil
}

type input struct {
	tail string
	r    rune
}

func newInput(str string) *input {
	return &input{
		tail: str,
	}
}

func (p *input) next() bool {
	if len(p.tail) == 0 {
		return false
	}
	var l int
	p.r, l = utf8.DecodeRuneInString(p.tail)
	if p.r == utf8.RuneError {
		return false
	}
	p.tail = p.tail[l:]
	return true
}

func (p *input) take(n int) (string, bool) {
	b := make([]rune, 0, n)
	for len(b) < n {
		if !p.next() {
			return "", false
		}
		b = append(b, p.r)
	}
	return string(b), true
}
