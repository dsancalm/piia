---
title: "Linux kernel maintainer Greg Kroah-Hartman posts talk on LLM security"
summary: "The stable-branch maintainer published \"Security in the LLM Age\" on YouTube, hitting the Hacker News front page with 248 points. The talk signals that kernel maintainers are tracking how generated patches , plausible but potentially wrong or mislicensed , strain the..."
lang: en
story: linux-kernel-maintainer-greg-kroah-hartman-posts
publishedAt: 2026-10-03T12:00:00.621Z
sourceUrl: "https://www.youtube.com/watch?v=NnV_cWeoo5Q"
sourceName: "Hacker News (portada)"
priority: routine
tags: [linux, kernel, security, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Greg Kroah-Hartman, who maintains the Linux kernel stable branch, published a talk titled "Security in the LLM Age" on YouTube. The video reached the Hacker News front page, gathering 248 points and 79 comments under submission ID 49929391. The discussion shows the kernel community is actively evaluating how large language models affect the software supply chain and code review.

Kroah-Hartman sits at the center of the kernel's patch intake pipeline. His decision to speak publicly on LLM security suggests maintainers are seeing a shift in the type and volume of contributions arriving by email. The worry is not only malicious code. It is the subtle introduction of logical errors, hallucinated APIs, or licensing violations that look plausible at first glance. The project relies on human review and explicit sign-offs. Generated patches that mimic the style of valid contributions without the underlying intent or correctness create a new class of review burden.

The talk likely covers how existing kernel safeguards , the Developer Certificate of Origin, maintainer hierarchies, automated testing , interact with code no human wrote line by line. It also raises the question of attribution: if an LLM suggests a fix for a race condition, who takes responsibility when it breaks a different architecture? The kernel process assumes a human author can explain the reasoning behind a change. That assumption breaks down when the reasoning lives in a model's weights instead of a commit message.

## What is not known

The technical content of the video , specific arguments, examples, or proposed mitigations , is not known. The video duration, publication date on YouTube, and the conference or event where it was recorded are also unknown. The substance of the 79 Hacker News comments has not been analyzed.
