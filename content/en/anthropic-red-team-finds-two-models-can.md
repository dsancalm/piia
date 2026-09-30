---
title: "Anthropic red team finds two models can hijack control flow on binary tasks"
summary: "GLM-5.3 and an unreleased Claude Mythos Preview scored 4% and 6% on 100 internal binary-exploitation tasks where their immediate predecessors scored zero, marking a measurable threshold in automated exploit reasoning."
lang: en
story: anthropic-red-team-finds-two-models-can
publishedAt: 2026-09-30T12:57:11.784Z
sourceUrl: "https://simonwillison.net/2026/Sep/29/anthropic-frontier-red-team/"
sourceName: "Simon Willison"
priority: urgent
tags: [security, ai, exploits, anthropic]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anthropic's Frontier Red Team published results showing that two current models can achieve full control-flow hijacks on a sample of binary exploitation tasks where their immediate predecessors scored zero. In a random draw of 100 tasks from an internal benchmark, GLM-5.3 succeeded in 4 percent of trials and the unreleased Claude Mythos Preview succeeded in 6 percent. Claude Opus 4.6 and GLM-5.2 recorded no successes across the same 100 tasks. The figures come from the team's post "GLM-5.3 and the spread of advanced cyber capabilities," surfaced by Simon Willison on September 29, 2026.

The jump from zero to single-digit percentages marks a concrete capability threshold. Binary exploitation requires reasoning about memory layout, instruction semantics, and undefined behavior under constraints that defeat simple pattern matching. A model that can reliably chain a vulnerability to arbitrary code execution , even in only a handful of cases , demonstrates that the reasoning components necessary for automated exploit development are present and improving.

## What this means for defenders and tool builders

Offensive security tooling has long relied on fuzzers, symbolic execution, and human expertise to bridge the gap from crash to exploit. A 4 to 6 percent success rate on a curated benchmark does not replace those pipelines, but it changes the economics of the early triage phase. A model that can propose a working exploit chain for a non-trivial subset of crashes reduces the time a human spends on each candidate. That accelerates both legitimate vulnerability research and the workflow of actors who weaponize disclosed bugs before patches land.

The benchmark itself remains opaque. The tasks are drawn from an internal suite that has not been published, and the exact definition of "full control flow hijack" , whether it requires ASLR bypass, stack canary defeat, or specific mitigation evasion , is not disclosed. Without that context, the 4 and 6 percent figures cannot be compared to public benchmarks such as CyberSecEval or the NYU CTF dataset.

## What is not known

The composition of the 100-task sample, the precise success criteria for a control-flow hijack, the full list of models evaluated, the variance across task difficulty tiers, whether the benchmark has undergone third-party review, and how these results map to Anthropic's deployment thresholds for Mythos or future releases.
