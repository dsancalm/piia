---
title: "Prime Agent turns the coding agent itself into a mutable program"
summary: "Prime Intellect's open-source harness runs the agent on a single persistent IPython kernel, with subagents as child processes and full CRUD access to its own prompts and memory."
lang: en
story: prime-agent-turns-the-coding-agent-itself
publishedAt: 2026-08-06T09:28:25.921Z
sourceUrl: "https://www.primeintellect.ai/blog/prime-agent"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [open-source, agents, coding, harness]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Prime Intellect released Prime Agent, an open-source coding harness that treats the agent itself as a mutable program. Instead of a fixed prompt with a static toolset, the agent gets two abstractions: Recursive Language Model (RLM) and Continual Harness. RLM treats context as a variable and subagent delegation as function calls inside a REPL. Continual Harness gives the agent CRUD access to its own state: prompts, skills, memory, and subagents.

The agent runs on a single persistent IPython kernel as its only tool. Subagents are just other instances of prime-agent, and multi-agent communication is restricted to the "nuclear family": parent, sibling, or child processes. A background daemon manages all live sessions through a local socket, and the full session history is stored as append-only JSONL files on disk.

What makes this notable is the lifecycle. Context compaction triggers at a threshold or manually via `compact.run()` in the REPL. Subagents get evicted from memory after 30 minutes of inactivity and reloaded from disk when addressed again. That means long-horizon sessions can survive kernel restarts and context limits without losing the thread.

Installation is a single curl pipe:

```bash
curl -fsSL https://app.primeintellect.ai/prime-agent/install.sh | sh
```

Spawning a child and steering it mid-flight looks like this:

```python
# Spawn a named child; the handle returns at admission.
handle = await rlm("Find what's wrong in this auth-flow. Reply to me with your findings.", name="auth-reviewer")
# ... the child's findings arrive as a parent-role reply, not a return value ...
# Later (survives compaction and kernel restarts): recover the retained child.
children = await rlm.list_subagents()
auth_child = next(c for c in children if c.session_name == "auth-reviewer")
# Send a follow-up turn into the same retained child session.
await agent_message.send("Follow up: identify the main edge cases and any likely bugs.", receiver_role="child", receiver_name=auth_child.session_name, mode="follow_up")
```

Parallel fan-out is explicit: `rlm()` returns at task admission with a child handle, never the child's answer. Results arrive as `agent_message` replies. You can continue independent work while children run.

The design is reproducible. The entire harness is open source, so you can inspect how the daemon, the JSONL store, and the compaction logic fit together. For anyone building agents that need to run for hours or days, the ability to programmatically manage subagents and context is the missing piece.

What is not known: the exact context threshold that triggers compaction, comparative performance against other harnesses, which specific models are supported or recommended, hardware or OS requirements, and the precise open-source license.
