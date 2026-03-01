# Erpel script grammar

This is a tree-sitter grammar for the _Erpel_ scripting language.
This is a very simple scripting language used to control rubber ducky USB sticks.

## Install

On MacOS run with C++20 compiler flag

```zsh
CXXFLAGS="-std=c++20" npm install
```

## Grammar

This is the grammar for the scripting language in Extended BNF.
Everything uppercase on a US keyboard is generally considered a command or macro to distinguish from key presses (lowercase).
There are two layers in the scripting language:

1. **Command layer**: Control commands like, delays, file operations, etc. and scripting environments
2. **Scripting layer**: Started by `SCRIPT(...)`. Here actual key presses are sent to the connected device.

### Command layer grammar

```EBNF
Comment = '(*', ?...?, '*)';
```

```EBNF
(* ## Terminals *)
CommandName = 'DELAY' | 'STOP' | 'SERIAL_DEVICE' | 'SCRIPT' | 'INPUT_FILE' | 'OUTPUT_FILE' | 'SEND' ;

(* ## Non-terminals *)
Program = Command, { Command };
Command = CommandName, '(', ?...?, ')';
```

| Command         | Arguments           | Explanation                                                               |
| --------------- | ------------------- | ------------------------------------------------------------------------- |
| `DELAY`         | `\d+`               | Delay the programm `arg` ms                                               |
| `SCRIPT`        | `Script`            | Send the keyboard reports defined in the arguments                        |
| `STOP`          |                     | Stop the script execution                                                 |
| `SERIAL_DEVICE` | `string`            | Set the name of the serial device                                         |
| `OUTPUT_FILE`   | `string (filename)` | Set the output file name on the sd card                                   |
| `INPUT_FILE`    | `string (filename)` | Set's the current input file for outbound serial communication on sd card |
| `SEND`          |                     | Send the `INPUT_FILE` to the serial output                                |

### Scripting layer grammar

```EBNF
(* ## Terminals *)
Letter = '[a-z]';
Number = '[0-9]';
FNKey = 'FN', (1 | 2 | ?...? | 12); (* Second number must be 0, 1 or 2 *)
SpecialKey = 'SPACE' | 'PLUS' | 'UP' | 'DOWN' | 'TAB' | ?...?;

ModifierKey = 'SHIFT' | '^' | 'GUI' | 'CTRL' | 'ALT'; (* '^' = 'SHIFT' *)
KeyClick = Letter | Number | SpecialKey | FNKey; (* Either lowercase or Uppercase command*)

Macro = 'SAVE' | '';

(* ## Non-terminals *)
Script = Action, { Action };
Action = Report | Macro;
Report = [ Modifier ], KeyClick; (* A send report is some optionally modified keypress *)
Modifier = ModifierKey, { ModifierKey }; (* e.g. SHIFT ALT, modifies only next keypress *)
```
