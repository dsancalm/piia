---
title: "llm 0.36 adds GPT-6 model aliases and single-turn model flag"
summary: "The release introduces aliases for GPT-6 Sol and Luna plus a plugin mechanism to mark models as single-turn only, raising an error if conversation history is supplied."
lang: en
story: llm-0-36-adds-gpt-6-model
publishedAt: 2026-09-23T12:05:30.879Z
sourceUrl: "https://simonwillison.net/2026/Sep/22/llm/"
sourceName: "Simon Willison"
priority: urgent
tags: [llm, openai, plugins, cli]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The llm command-line tool has reached version 0.36. The headline additions are two new OpenAI model aliases: `gpt-6-sol` for GPT-6 Sol and `gpt-6-luna` for GPT-6 Luna. More broadly, the release introduces a mechanism for plugins to declare that a model only supports single-turn requests.

Plugins can now set `supports_conversation = False` on a model class. When that flag is present, llm will raise `llm.ConversationNotSupported` if you pass assistant history or tool messages to the model. The `llm chat` command also rejects these models before a session starts. The first plugin to use the feature is `llm-typesafe`.

```python
supports_conversation = False
```

```python
llm.ConversationNotSupported
```

Reasoning traces in the Markdown output of `llm logs` are now wrapped in HTML `<details><summary>` tags so they collapse by default.

```html
<details><summary>
```

Five new contributors supplied bug fixes for this release.

### What is not known
- Exact knowledge cutoff or launch date for the GPT-6 Sol and GPT-6 Luna models.
- Specific details of the bug fixes included in this version.
- Concrete capabilities of the `llm-typesafe` plugin beyond the lack of conversation support.
- Any changes to dependencies, Python version requirements, or installation steps.
