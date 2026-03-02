(comment) @comment

"DELAY" @keyword
"SCRIPT" @keyword
"SERIAL_DEVICE" @keyword
"INPUT_FILE" @keyword
"OUTPUT_FILE" @keyword
"SEND" @keyword
"SEND_FILE" @keyword
"STOP" @keyword

"(" @punctuation.bracket
")" @punctuation.bracket

(command (delay_args) @number)

(command (generic_args) @string)
(command (lowercase_args) @string)

(modifier_key) @operator

(key_click (fn_key "(" @punctuation.bracket ")" @punctuation.bracket) @constant)
(key_click (special_key) @constant)
(key_click (lowercase_key) @string)

(macro) @keyword
