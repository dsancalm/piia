---
title: "Python 3.15 soft-deprecates re.match in favor of re.prefixmatch"
summary: "The function remains in the standard library with no removal schedule, but documentation and tooling will steer new code toward re.prefixmatch, which makes the prefix-only behavior explicit."
lang: en
story: python-3-15-soft-deprecates-re-match
publishedAt: 2026-09-12T11:21:34.099Z
sourceUrl: "https://simonwillison.net/2026/Sep/11/soft-deprecating-re-match/"
sourceName: "Simon Willison"
priority: routine
tags: [python, regex, deprecation, stdlib]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Python 3.15 will mark `re.match()` as softly deprecated. The function stays in the standard library with no removal timeline, but the documentation and tooling will steer new code toward `re.prefixmatch()`, a name that matches what the function actually does: anchor at the start of the string without requiring a match at the end.

The confusion has existed for decades. `re.match()` sounds like it should match the whole string, yet it only checks the prefix. Developers who expect full-string validation often get silent bugs when trailing characters slip through. `re.prefixmatch()` makes the contract explicit. For the more common cases, the guidance points to `re.search()` when the pattern can appear anywhere, and `re.fullmatch()` when the entire string must conform.

```python
import re

re.prefixmatch(r"foo", "foobar")   # matches
re.fullmatch(r"foo", "foobar")     # None
re.search(r"foo", "barfoo")        # matches
```

Hugo van Kemenade, the 3.15 release manager, framed the change as a readability improvement rather than a correctness fix. The soft-deprecation label means linters and type checkers may start flagging `re.match()`, but the interpreter will not emit runtime warnings.

What is not known
- The exact release date of Python 3.15.
- Whether `re.match()` will trigger `DeprecationWarning` at runtime or only appear in static analysis.
- Which Python version first introduced `re.prefixmatch()`.
- Any future plans for hard deprecation or removal of `re.match()`.
