---
title: "ChatGPT desktop bundles 1.7 GB of runtimes including LibreOffice"
summary: "The OpenAI Codex desktop app, now ChatGPT, installs a 1.7 GB runtime with full copies of Python, Node.js, Poppler, git, and LibreOffice. The agent uses pinned versions instead of system tools, so you cannot update them yourself."
lang: en
story: chatgpt-desktop-bundles-1-7-gb-of
publishedAt: 2026-09-02T11:50:06.166Z
sourceUrl: "https://simonwillison.net/2026/Sep/1/codex-libreoffice/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [openai, chatgpt, security, bundling]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The OpenAI Codex desktop application, now branded as ChatGPT, installs a 1.7 GB runtime directory at `~/.cache/codex-primary-runtime`. Inside are full, standalone copies of Python, Node.js, Poppler, git, and LibreOffice. The LibreOffice inclusion is the largest single component and the most surprising: a general-purpose coding agent now ships an entire office suite to your machine without asking.

The runtime layout reveals the intent. Skills definitions live in `~/.cache/codex-runtimes/codex-primary-runtime/plugins/openai-primary-runtime/plugins/documents`. These JSON files tell the agent where to find the embedded binaries and how to invoke them. The agent does not rely on your system PATH for these tools; it carries its own pinned versions. That design choice guarantees reproducible behavior across macOS, Windows, and Linux, but it also means you are running LibreOffice, Python, and Node versions you did not select, cannot easily update, and may not even know exist.

LibreOffice is a fork of OpenOffice.org dating back to 2010. It is a heavy, complex codebase with a long history of CVEs. Bundling it headless for document conversion or report generation expands the attack surface of a chat client significantly. If a vulnerability appears in the bundled LibreOffice, the fix depends on OpenAI releasing a new desktop build. You cannot `apt upgrade` or `brew upgrade` your way out of it. The same applies to the embedded Python and Node runtimes.

The 1.7 GB figure is the total footprint today. There is no documented cleanup policy, no version manifest exposed to the user, and no opt-out flag in the installer. If you run multiple AI tools that adopt this pattern , each vendoring its own copy of runtimes , disk usage grows linearly with no deduplication.

## What is not known

- Exact versions of LibreOffice, Python, Node.js, Poppler, and git inside the bundle.
- Whether LibreOffice runs strictly headless or initializes any GUI subsystems.
- Individual size breakdown of each component within the 1.7 GB.
- Update cadence or security patching policy for these embedded runtimes.
- Technical rationale for requiring a full office suite versus a lighter conversion library.
