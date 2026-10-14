---
title: "Anthropic replaces Git with custom Scion system to handle AI agent scale"
summary: "Git could not serve Anthropic's traffic economically as daily merges jumped from 2,500 to over 30,000. Scion streams only needed files and moves merge computation to the server, cutting network traffic by orders of magnitude."
lang: en
story: anthropic-replaces-git-with-custom-scion-system
publishedAt: 2026-10-14T12:21:07.173Z
sourceUrl: "https://simonwillison.net/2026/Oct/13/redesigning-source-control-at-anthropic/"
sourceName: "Simon Willison"
priority: routine
tags: [anthropic, git, version-control, ai-agents]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Anthropic replaced Git with a custom centralized system called Scion and a companion code review tool called Antique. The migration took five months and a team of seven engineers. The move was driven by traffic volumes that Git could not serve economically. The main branch history approaches 100 GB. A compressed working copy exceeds 25 GB. CI alone performs roughly 25 million checkouts per day. A naive Git fetch at that scale would push more than 600 petabytes of traffic daily.

Scion operates like a modern Subversion. There is no local history and no offline mode. Nick G, one of the Scion engineers, said offline support was not a priority because the heaviest user , Claude , is necessarily online. The architecture is cloud-native. Clients stream only the files they need, and the server handles merge computation. That design cut network traffic by orders of magnitude compared with full-history clones.

The throughput numbers illustrate why the old model broke. In May 2026 Anthropic merged about 2,500 changes per day. By September that figure passed 30,000. The acceleration comes from AI agents that write, test, and submit code continuously. A distributed VCS forces every agent to download the entire history before it can contribute. Scion lets an agent check out a 25 GB working set in seconds and push a diff back without ever touching the 100 GB history.

Antique sits on top of Scion and codifies Anthropic's adversarial review process. Multiple model instances critique each other's patches before a human sees them. The system can be myopic; engineers still need to steer models away from over-engineering. Antique also integrates with CI so that a change cannot land until the full test suite passes against the latest mainline snapshot.

The migration itself was treated as a product rollout. The team ran both systems in parallel, routed a fraction of traffic to Scion, measured latency and error rates, then flipped the switch. No major outage occurred.

What is not known: the exact protocol and storage format Scion uses, whether it will be open-sourced, detailed benchmarks comparing Scion and Git on Anthropic's workload, how large binary assets are handled, and the precise adversarial review workflow including which model versions participate.
