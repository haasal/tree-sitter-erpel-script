"DELAY" @keyword
"SCRIPT" @keyword
"SERIAL_DEVICE" @keyword
"INPUT_FILE" @keyword
"OUTPUT_FILE" @keyword
"SEND" @keyword
"STOP" @keyword

"(" @punctuation.bracket
")" @punctuation.bracket

(command (delay_args) @number)

(generic_args (lowercase_key) @string)

(modifier_key) @operator

(key_click (fn_key "(" @punctuation.bracket ")" @punctuation.bracket) @constant)
(key_click (special_key) @constant)
(key_click (lowercase_key) @string)

(macro) @keyword
