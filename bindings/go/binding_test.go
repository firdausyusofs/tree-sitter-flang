package tree_sitter_flang_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_flang "github.com/firdausyusofs/tree-sitter-flang/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_flang.Language())
	if language == nil {
		t.Errorf("Error loading FLang grammar")
	}
}
