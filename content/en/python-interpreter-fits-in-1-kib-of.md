---
title: "Python interpreter fits in 1 KiB of C source"
summary: "Austin Z. Henley golfed a recursive-descent interpreter to exactly 1,024 bytes. It supports variables, arithmetic, loops, functions with recursion, and indentation-based blocks using a 999-byte buffer and a 256-entry global symbol table."
lang: en
story: python-interpreter-fits-in-1-kib-of
publishedAt: 2026-09-07T12:52:20.120Z
sourceUrl: "https://austinhenley.com/blog/python1024.html"
sourceName: "Hacker News (portada)"
priority: flash
tags: [interpreter, code-golf, c, python]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Austin Z. Henley built a Python interpreter that fits in 1024 bytes of C source. The initial goal was 512 bytes, but the feature set pushed the golfed version to exactly 1 KiB. That feature set includes single-letter integer variables, arithmetic with precedence, comparisons, if/else, while loops, for-in-range loops with else blocks, function definitions and calls including recursion, indentation-based blocks, and print. A readable reference implementation weighs in at over 4800 bytes. Both are on GitHub.

The parser is a recursive-descent evaluator. It does not build an AST or emit bytecode. It executes expressions while parsing them. Global state holds everything: a 999-character source buffer, a 256-entry symbol table mapping ASCII codes to integer values, and a handful of indices for position, current character, and line start.

```c
char src[999];
int vars[256];
int pos;
int ch;
int line_start;
```

Variables are single lowercase letters. The check `ch > 96` identifies them; the ASCII code indexes directly into `vars`. No hash table, no string interning.

```c
if (ch > 96) {
    value = vars[ch];
    next();
}
```

Precedence climbs through `parse_sum`, `parse_term`, `parse_factor`, and `parse_atom`. Each function returns an integer. The ternary and comma operators keep the functions to one statement where possible.

```c
int parse_sum(void) {
    int value = parse_term();
    while (ch == '+' || ch == '-') {
        if (ch == '+') value = value + parse_term();
        else value = value - parse_term();
    }
    return value;
}
```

Control flow works by re-parsing. A `while` loop records the position of its condition, executes the body block, then jumps `pos` back to re-evaluate. A `for K in range(N):` loop initializes `vars[K] = 0`, then on each iteration increments the variable and re-parses the body until the limit is reached. Function calls push the return position onto the C stack via recursion; the body is parsed again on every call. There is no lexical scope. Variables are global.

```c
if (ch == 'w' || ch == 'i' || ch == 'f') {
    int keyword = ch;
    int loop_var = 0;
    if (keyword == 'f') {
        pos += 2;
        loop_var = next();
        pos += 8;
        vars[loop_var] = 0;
    } else if (keyword == 'w') pos += 4;
    else pos += 1;
}
```

Indentation is significant. `run_block` reads the indent level of each line. If the indent drops below the block's minimum, or the source ends, the function returns to the caller.

```c
void run_block(int min_indent) {
    for (;;) {
        int indent = read_indent();
        if (ch == '\n') continue;
        if (indent < min_indent || ch == 0) {
            pos = line_start;
            return;
        }
```

The FizzBuzz example runs:

```python
def buzz():
    for n in range(101):
        if n % 15 == 0:
            print("FizzBuzz")
        else:
            if n % 3 == 0:
                print("Fizz")
            else:
                if n % 5 == 0:
                    print("Buzz")
                else:
                    print(n)
buzz()
```

The golfed code leans on C89 quirks: implicit `int`, single-letter globals, omitted braces, ASCII constants instead of character literals, and heavy use of the comma operator. It compiles with GCC and Clang; MSVC support is not guaranteed.

What is not known: relative performance against CPython or other tiny interpreters; exact error-handling behavior (the article states there is none); whether unary operators beyond the start of an expression parse correctly; behavior with mixed tabs and spaces or inconsistent indentation; recursion depth limits imposed by the host C stack.
