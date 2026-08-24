---
title: "LLM 0.32 ships with reasoning traces, server-side tools, and a Git-like log store"
summary: "Simon Willison's CLI tool gets its biggest update in a while. You can now watch model reasoning traces, use provider-side tools like OpenAI's code execution, and resume long conversations faster thanks to a content-addressable log store inspired by Git."
lang: en
story: llm-0-32-ships-with-reasoning-traces
publishedAt: 2026-08-05T09:20:38.439Z
sourceUrl: "https://simonwillison.net/2026/Aug/4/new-release-of-llm/#atom-everything"
sourceName: "Simon Willison"
priority: flash
tags: [llm, cli, tools, update]
generatedBy: deepseek/deepseek-v4-flash-0731
---
LLM 0.32 shipped on 4th August 2026, and it is the biggest update to Simon Willison's command-line tool in a while. The headline features are visible reasoning traces, server-side provider tools, and a redesigned log store that borrows a trick from Git.

Reasoning traces are now first-class. When a model thinks out loud, you can watch it with the default `llm` prompt command, or hide it with `-R/--hide-reasoning`:

```bash
llm -R 'Explain the difference between a list and a tuple'
```

The Python API gets the same treatment. `stream_events()` returns typed events for `reasoning`, `text`, and others, so you can build agent loops that distinguish between a model's internal deliberation and its actual output. There is also a new `model.prompt(messages=[])` parameter, which lets you pass a full conversation history in one call:

```python
import llm

from llm import user, assistant, system

model = llm.get_model("gpt-5.6-luna")
response = model.prompt(
    messages=[
        system("You are a helpful pirate."),
        user("What is the capital of France?"),
        assistant("Paris, matey."),
        user("And Germany?"),
    ]
)
print(response.text())
```

Server-side tools are the other big shift. Instead of wiring tools into your own process, you can hand the model a tool that runs on the provider's infrastructure. OpenAI's code execution environment and WebSearch work out of the box. The `llm-anthropic` plugin, updated to 0.26, adds WebSearch, WebFetch, CodeExecution, and AnthropicMCP. That last one lets you point Claude at any MCP endpoint directly from the CLI:

```bash
llm -m claude-sonnet-5 \
  -T 'AnthropicMCP("https://datasette.simonwillison.net/-/mcp")' \
  'how many rows in the blog_blogmark table?'
```

The new `llm openai endpoint` command does the same trick for any OpenAI-compatible server, with a one-liner:

```bash
uvx --with llm-tools-quickjs \
  llm openai endpoint http://localhost:1234/v1 -m google/gemma-4-12b \
  -T QuickJS 'Use QuickJS to multiply 3434 * 2434' --td
```

The logs are redesigned too. The message store is now content-addressable, modeled after Git, which means deduplication and faster resumption of long conversations. Tool chains can pause for human approval and pick up again from stored history. The lower-level changes were driven by Datasette Agent, which needed the streaming events and the tool pause/resume cycle.

Existing plugins should keep working, but anything that provides extra models needs to upgrade to 0.32 to fully participate in the new streaming events system. The `llm-chat-completions-server` plugin is already updated to serve the semi-standard OpenAI chat completions API, useful for local testing. Updates for `llm-gemini`, `llm-openrouter`, and `llm-mistral` are nearly ready.

What is not known: the exact release notes are not in the source text, so the full list of new models beyond GPT-5.6 is not specified. The content-addressable schema is not described in detail, and release dates for the pending plugin updates are not given. The core library's "agent" concept is mentioned but not yet defined.
