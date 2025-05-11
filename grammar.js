/**
 * @file A low-level language
 * @author Firdaus Yusof <firdausyusof06@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "flang",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
