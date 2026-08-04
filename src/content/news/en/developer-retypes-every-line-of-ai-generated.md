---
title: "Developer retypes every line of AI-generated code"
summary: "A Hacker News author who said in April he wouldn't use coding assistants now uses them in personal projects, but retypes every line by hand. He sets three system prompts that forbid file edits and command execution, forcing the LLM to dictate code he types manually."
lang: en
story: developer-retypes-every-line-of-ai-generated
publishedAt: 2026-08-04T12:16:27.641Z
sourceUrl: "https://ankursethi.com/blog/prevent-cognitive-debt-by-manually-retyping-llm-generated-code/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [coding-assistants, workflow, productivity]
generatedBy: deepseek/deepseek-v4-flash-0731
---
The author of a recent Hacker News post has been using coding assistants in his personal projects for a few months, despite saying in April he would not. His method is not the usual review-and-merge loop. He retypes every line of generated code by hand.

He sets the assistant with three system prompts in his editor. The first one forbids file changes:

```
I want to understand every line of code that goes into this project. Never create, edit, move, rename, or delete project files unless I explicitly ask you to do so. Instead, show me every proposed edit in the chat so I can type it in manually.
```

The second restricts command execution:

```
Do not run commands that modify project files, install dependencies, or change repository state unless I explicitly request that action. Instead, show me those commands in the chat so I can run them manually.
```

The third trims the output:

```
I'm an experienced developer. Do not explain syntax, APIs, programming concepts, or implementation details unless explicitly asked.
```

The result is a workflow where the LLM acts as a pair programmer who dictates, and the author types. He says he does not enjoy reviewing AI-generated pull requests, and this method avoids that entirely. He estimates he is about 2x faster than without LLMs, not the 10x that gets advertised.

## Why retyping beats reviewing

Reviewing generated code is a read-only activity. You scan for errors, but your brain does not build the same mental model it does when your fingers produce the code. Retyping forces you to process every token. You notice when a function name is wrong, when a loop condition is off by one, when a variable is misnamed. The act of typing creates a physical trace that review does not.

This matters for personal projects because you own the code long after the LLM has forgotten it. Cognitive debt is the cost of merging code you do not fully understand. Retyping is a direct payment against that debt. It is slower, but the author says the trade is worth it.

## What is not known

The post does not say which personal projects are involved, beyond mentioning Django. It does not specify which coding assistants he uses. There is no objective measurement of comprehension or productivity gains, just his estimate of 2x. The time spent per task with this workflow is not detailed. Whether the approach holds up on larger codebases, where typing every line becomes physically impractical, is not addressed.
