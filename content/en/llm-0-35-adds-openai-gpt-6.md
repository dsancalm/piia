---
title: "llm 0.35 adds OpenAI gpt-6-astra model support"
summary: "Simon Willison released version 0.35 of the llm command-line tool on September 7, 2026. The update maps the new gpt-6-astra identifier to OpenAI's API, letting users call the model immediately with existing commands and scripts."
lang: en
story: llm-0-35-adds-openai-gpt-6
publishedAt: 2026-09-08T11:35:21.949Z
sourceUrl: "https://simonwillison.net/2026/Sep/7/llm/"
sourceName: "Simon Willison"
priority: routine
tags: [llm, openai, cli, release]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The llm command-line tool has reached version 0.35. The release adds support for OpenAI's new gpt-6-astra model, making it available immediately through the same interface used for other providers.

You can now reference the model by name in commands and scripts:

```bash
llm -m gpt-6-astra "Explain the difference between a monad and a functor"
```

The tool continues to handle API key management, conversation history, and output piping across supported models. Adding gpt-6-astra follows the pattern established for previous OpenAI releases: the model identifier is mapped to the appropriate API endpoint without requiring changes to your workflow.

Simon Willison published the release on September 7, 2026.

## What is not known

- What other changes, fixes, or features are included in llm 0.35 beyond gpt-6-astra support.
- The capabilities, pricing, context window, or knowledge cutoff of the gpt-6-astra model.
- The exact installation or upgrade command for this specific version.
- Which other models or providers llm currently supports.
