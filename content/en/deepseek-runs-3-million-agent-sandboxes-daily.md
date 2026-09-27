---
title: "DeepSeek runs 3 million agent sandboxes daily with DSec platform"
summary: "A 31-page paper reveals DSec, a production sandbox system that sustains 380,000 concurrent environments and peaks at 5,000 creations per second on a 160-node unit."
lang: en
story: deepseek-runs-3-million-agent-sandboxes-daily
publishedAt: 2026-09-27T12:18:33.058Z
sourceUrl: "https://arxiv.org/abs/2609.22978"
sourceName: "Hacker News (portada)"
priority: flash
tags: [deepseek, sandbox, reinforcement-learning, infrastructure]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
DeepSeek has published a 31-page paper describing DSec, a production sandbox platform built to run millions of stateful agent environments per day alongside large-scale reinforcement learning. The system already serves roughly 3 million sandboxes daily, sustaining more than 380,000 concurrent instances and peaking at over 5,000 creations per second on a single production unit of about 160 nodes.

DSec exposes four backend types through a unified SDK: function-call, container, microVM, and full VM. Each sandbox is composed from independently versioned layers that are pulled on demand from 3FS, DeepSeek's cluster-wide distributed file system. The control plane handles placement, lifecycle, and resource reclamation across the cluster, using memory sharing and CPU scheduling to pack environments densely while keeping rollout state intact when GPU training jobs preempt or scale.

The platform is co-designed with the RL training loop. Instead of treating sandboxes as stateless batch jobs, DSec preserves rollout state across training iterations, reclaiming idle CPU and memory only when the trainer does not need them. This avoids the cold-start penalty that typically forces RL pipelines to either over-provision or accept long queue times. The paper also describes mitigations for agent misbehavior such as reward hacking, though the specific mechanisms are not detailed in the public text.

The paper is an expanded version of a two-page extended abstract that passed the first review round for the Operational Systems Track at ACM SIGOPS ATC 2026. It lists more than 130 authors, with Jialiang Huang as first author and Wenfeng Liang as corresponding contact. It was submitted to arXiv on 19 September 2026.

## What is not known

- Hardware specifications of the 160-node production unit (CPU, RAM, GPU, network)
- Public API surface of the unified SDK (languages, methods, examples)
- Internal architecture of 3FS (consistency model, replication factor, throughput)
- Concrete reward-hacking mitigation techniques
- Achieved memory and CPU overcommit ratios in production
- Cold-start versus warm-start latency distributions
- Scheduling and placement policies (bin-packing, spread, affinity)
- Layer format and versioning scheme (OCI or custom)
- Integration points with specific RL frameworks (Ray, Megatron, custom)
- Overhead metrics for environment setup and image distribution compared to baselines
- Source-code availability (open source versus internal only)
- Release roadmap or open-sourcing plans
