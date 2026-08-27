---
title: "InfluxData CTO says AI wrote one million lines of production code"
summary: "Paul Dix claims an AI system generated and refined a million lines of code over months, producing software now running on millions of machines. The milestone shifts the bottleneck from writing code to building verification systems that can define correctness for the model..."
lang: en
story: influxdata-cto-says-ai-wrote-one-million
publishedAt: 2026-08-27T17:54:58.389Z
sourceUrl: "https://simonwillison.net/2026/Aug/26/paul-dix/"
sourceName: "Simon Willison"
priority: routine
tags: [ai, influxdata, software, verification]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Paul Dix, cofounder and CTO of InfluxData, announced on August 26 that an AI system had written one million lines of code and refined it over several months to produce reliable software now running on millions of developer machines. The statement came as a follow-up to his earlier article, "The end of programming." Dix emphasized that even with an oracle, a reference implementation or specification to verify against, the result remains significant. He argued that with a proper verification system and clear direction, AI can generate highly complex, sophisticated software and continuously refine it until it works.

The scale of the achievement is substantial. One million lines of code is comparable to the size of the Linux kernel in its early versions or a mature database engine. The fact that the output runs on millions of machines suggests it has met real-world reliability standards, not just passed benchmark tests. The refinement period of "a couple of months" points to an iterative process in which the AI generated, tested, and corrected code repeatedly, guided by automated verification rather than constant human line-by-line review.

Dix did not disclose the name of the AI system, the specific verification framework, or the software product involved. InfluxData’s IOx project, a Rust rewrite of the InfluxDB storage engine, matches the description of a large, complex system deployed widely, but the post does not confirm the connection. The "oracle" could be the existing InfluxDB implementation, a formal specification, or a test suite, each implying a different level of autonomy. The post also leaves unclear whether the million lines accumulated across multiple projects or came from a single codebase, as well as the size and role of the human team overseeing the process.

This development shows that the bottleneck has shifted from code generation to verification infrastructure. If correctness can be defined precisely enough for a machine to check, the model can search the solution space at a scale and speed no human team can match. The remaining work involves designing those verification systems, setting architectural direction, and handling the parts of the problem that resist formal specification.

What remains unknown: the identity of the AI model, the exact verification methodology, the name of the deployed software, whether the 1M LOC is cumulative or from one project, the team composition, and the full context of the earlier "end of programming" post.
