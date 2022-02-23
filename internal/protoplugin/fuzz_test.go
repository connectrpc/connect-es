// Copyright 2020-2022 Buf Technologies, Inc.
//
// All rights reserved.

//go:build go1.18
// +build go1.18

package protoplugin

import (
	"testing"
)

func FuzzProtoCamelCase(f *testing.F) {
	f.Add("foo_bar")
	f.Add("__proto__")
	f.Add(`FacilityFactoryFacadeMutator66Generator_`)
	for k, _ := range reservedIdentifiers {
		f.Add(k)
	}
	for k, _ := range reservedObjectProperties {
		f.Add(k)
	}
	f.Fuzz(assertProtoCamelCaseEqualsProtocJsonName)
}
