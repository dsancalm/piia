---
title: "Oracle bans AI-generated code from OpenJDK contributions"
summary: "The new governance rule requires all submitted code be written by a human, citing security and IP risks. It applies to repositories, pull requests, and other channels, though LLMs can still be used privately for debugging and review."
lang: en
story: oracle-bans-ai-generated-code-from-openjdk
publishedAt: 2026-08-08T07:30:54.306Z
sourceUrl: "https://app.dealroom.co/news/feed/oracle-bans-ai-generated-code-from-openjdk-despite-ellison-s-claim-oracle-isn-t-writing-its-own-code"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [oracle, openjdk, ai, policy]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Oracle has banned AI-generated code from OpenJDK contributions. The project's governance now requires that anything you submit to repositories, pull requests, or other project channels be written by a human. You can still use LLMs privately to debug and review code, but the output cannot land in the project.

The reasoning cites security, protection, and intellectual property risks. That is the official line. The context is richer. Oracle's own executives have been publicly celebrating AI-generated code. Larry Ellison said recently that AI models now write the company's code. Co-CEO Mike Sicilia credited AI tools with letting smaller engineering teams ship faster. Oracle is also spending 70 billion dollars this year on data center expansion, and S&P just downgraded its credit rating to BBB-, one notch above junk, citing uncertain returns on that investment.

So you have a company telling the OpenJDK community that AI-generated code is too risky to accept, while its own leadership says AI writes its code. That is not a contradiction in their view. It is a distinction between internal use and external contributions. Internally, Oracle controls the model, the training data, and the review process. Externally, a contributor could paste anything from any model, and the project would have no way to verify provenance or license compliance.

The practical effect on your workflow is concrete. If you contribute to OpenJDK, you need to know where every line came from. If you use a code assistant that autocompletes whole functions, and you paste that into a patch, you have violated the policy even if the model's output was heavily edited. The policy does not require you to disclose AI use, but the ban is absolute on submitted material. That means you must either disable generative features in your editor when working on OpenJDK code, or manually rewrite whatever the model suggests.

## What is not known

The announcement does not specify how Oracle will enforce the ban. No technical mechanism is described, no review process is outlined, and there is no mention of what happens to a contribution suspected of being AI-generated. The policy also does not clarify whether it covers all contributions or only source code, whether documentation and tests fall under the same rule, or how provenance would be verified at all. There is no date for when the policy took effect, and no record of public discussion with the OpenJDK community before it was imposed. Whether this applies to other Oracle-led projects is also unspecified.
