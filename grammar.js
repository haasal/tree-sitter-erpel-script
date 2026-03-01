/**
 * @file A parser for script file automating rubber duckies
 * @author Alexander Haas <alexander@haas.me>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "erpel_script",
  rules: {
    source_file: ($) => repeat($.command),
    command: ($) =>
      choice(
        seq("DELAY", "(", $.delay_args, ")"),
        seq("SCRIPT", "(", $.script, ")"),
        seq("SERIAL_DEVICE", "(", $.generic_args, ")"),
        seq("INPUT_FILE", "(", $.generic_args, ")"),
        seq("OUTPUT_FILE", "(", $.generic_args, ")"),
        seq("SEND", "(", ")"),
        seq("STOP", "(", ")"),
      ),
    generic_args: ($) => repeat1($.lowercase_key),
    delay_args: ($) => /\d+/,
    script: ($) => repeat1($.action),
    action: ($) => choice($.report, $.macro),
    report: ($) => seq(optional(repeat($.modifier_key)), $.key_click),
    modifier_key: ($) => choice("SHIFT", "^", "GUI", "CTRL", "ALT"),
    key_click: ($) => choice($.lowercase_key, $.fn_key, $.special_key),
    lowercase_key: ($) => /[a-z0-9,.\[\]\\§=;/]/,
    fn_key: ($) => seq("FN", "(", /\d[012]?/, ")"),
    special_key: ($) =>
      choice(
        "SPACE",
        "_",
        "UP",
        "DOWN",
        "LEFT",
        "RIGHT",
        "TAB",
        "ESC",
        "BACKSPACE",
        "ENTER",
      ),
    macro: ($) => choice("SAVE", "SERIAL_DEVICE"),
  },
});
