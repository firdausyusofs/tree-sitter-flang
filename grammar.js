/**
 * @file A low-level language
 * @author Firdaus Yusof <firdausyusof06@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "flang",

  extras: $ => [$.comment, $._whitespace],

  rules: {
    source_file: $ => nonempty_separated_list(";", $.expression),

    _whitespace: () => /\s+/,
    comment: () => token(seq("#", /.*\n/)),

    expression: $ => choice(
      $.int_literal,
      $.ident,
      $.unit,
      $.prefix_expression,
      $.infix_expression,
      $.function_expression,
      $.function_call,
      $.variable_declaration,
    ),

    int_literal: () => /\d+/,
    ident: () => /[a-zA-Z_][a-zA-Z0-9_]*/,
    unit: () => "unit",
    prefix_expression: $ => choice(
      prec(10, seq("+", $.expression)),
      prec(10, seq("-", $.expression)),
      prec(10, seq("!", $.expression)),
    ),
    infix_expression: $ =>
      choice(
        prec.left(5, seq($.expression, "^", $.expression)),
        prec.left(4, seq($.expression, "*", $.expression)),
        prec.left(4, seq($.expression, "/", $.expression)),
        prec.left(3, seq($.expression, "+", $.expression)),
        prec.left(3, seq($.expression, "-", $.expression)),
        prec.left(2, seq($.expression, "<", $.expression)),
        prec.left(2, seq($.expression, ">", $.expression)),
        prec.left(2, seq($.expression, "<=", $.expression)),
        prec.left(2, seq($.expression, ">=", $.expression)),
        prec.left(1, seq($.expression, "==", $.expression)),
        prec.left(1, seq($.expression, "!=", $.expression)),
      ),
    function_expression: $ => seq(
      "fun",
      "(",
      separated_list(",", $.function_parameter),
      ")",
      optional($.type),
      "{",
      nonempty_separated_list(";", $.expression),
      "}"
    ),
    function_call: $ => seq(
      $.ident,
      "(",
      separated_list(",", seq(optional(seq($.ident, ":")), $.expression)),
      ")"
    ),
    variable_declaration: $ => 
      prec(0, 
        seq($.ident, ":", optional($.type), choice("=", ":"), $.expression)
      ),

    function_parameter: $ => seq(optional("~"), $.ident, optional($.ident), ":", $.type),

    type: $ => prec(2, $.ident),
  }
});

function nonempty_separated_list(separator, rule) {
  return seq(
    rule,
    repeat(seq(
      separator,
      rule
    ))
  );
}

function separated_list(separator, rule) {
  return optional(
    seq(
      rule,
      repeat(seq(
        separator,
        rule
      ))
    )
  );
}
