---
title: "Graham Dumpleton releases wrapture for testing and runtime tracing"
summary: "The creator of wrapt and mod_wsgi built a new library that patches functions at import time or via context managers, letting developers stub returns in tests or emit OpenTelemetry traces in production without changing source code."
lang: en
story: graham-dumpleton-releases-wrapture-for-testing-and
publishedAt: 2026-09-01T12:10:33.574Z
sourceUrl: "https://simonwillison.net/2026/Aug/31/introducing-wrapture/"
sourceName: "Simon Willison"
priority: urgent
tags: [python, testing, observability, monkeypatching]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Graham Dumpleton has released wrapture, a Python library that extends the monkeypatching mechanics of his earlier wrapt package into a single tool for both testing and runtime tracing. The project is only a few weeks old as of late August 2026. Dumpleton, who also wrote mod_wsgi and the New Relic Python agent, says every line of code and documentation was produced by an AI assistant under his direction rather than through informal prompting.

wrapture lets you wrap any function or method to record every call or to replace the return value. It positions itself as an alternative to unittest.mock and as a way to add observability to existing codebases without modifying the observed code. The library includes built-in OpenTelemetry support and a configuration-driven mechanism for enabling tracing.

```python
def test_stub_with_wrapture():
    with wrapture.binding(Gateway, "charge").on_call.returns({"id": "stub", "amount": 0}):
        assert OrderService().place(500)["id"] == "stub"

def test_pinned_result_with_wrapture():
    charge = wrapture.binding(Gateway, "charge")
    charge.on_call.transforms_result(lambda r: {**r, "id": "ch_TEST"})
    with charge:
        assert OrderService().place(500) == {"id": "ch_TEST", "amount": 500}
```

The same binding API works for production tracing. A configuration snippet can direct JSON Lines output to a file for any target matching a domain and name pattern:

```
capture = " summary " [[ observe ]] target = " domain:Calculator " name = [ " outer " , " inner " ] [[ sink ]] type = " jsonlines " path = " trace.jsonl "
```

Because the patching happens at import time or via context managers, third-party or legacy code can be instrumented without source changes. That reduces boilerplate and the risk of diverging from upstream dependencies.

What is not known
- Current package version and exact initial release date.
- License terms.
- Minimum supported Python version.
- Repository location and URL.
- Test coverage and CI/CD status.
- Production tracing overhead and performance characteristics.
- Compatibility with pytest, unittest, or other mocking libraries.
- Full public API beyond the examples shown.
- Configuration management via environment variables or dictionaries.
- Support for async/await and contextvars.
