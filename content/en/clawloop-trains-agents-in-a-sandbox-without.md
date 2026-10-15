---
title: "ClawLoop trains agents in a sandbox without a teacher model"
summary: "The framework lets an agent generate its own training data by running real tasks in a shell environment. It cycles through task synthesis, training, and diagnosis phases to improve from its own failures."
lang: en
story: clawloop-trains-agents-in-a-sandbox-without
publishedAt: 2026-10-15T11:58:55.224Z
sourceUrl: "https://arxiv.org/abs/2610.14118"
sourceName: "arXiv cs.AI"
priority: routine
tags: [agenttraining, self-improvement, reinforcementlearning]
generatedBy: dots-studio/dots-3-note-preview:free
---
ClawLoop introduces a self-improving training loop for agents that operate inside a harness , a sandbox with a real filesystem and shell. The framework runs without an external teacher model. Instead, the agent generates its own training data by executing actual tasks in the environment, then learns from its own failures. The loop has three phases: Task Synthesis, Training (supervised fine-tuning and/or reinforcement learning), and Diagnosis & Feedback. The diagnosis step analyzes the agent's rollout behavior to produce a capability report that steers the next round of task synthesis.

The paper uses Qwen3.6-27B as the loop model. It evaluates on SkillsBench, Claw-Eval-Live, and ClawGym-Bench, reporting consistent gains across iterations. Iteratively refined tasks also transfer to smaller models , Qwen3.5-4B and Qwen3.5-9B , with improvements on all benchmarks, suggesting the generated data carries model-agnostic value. The work was submitted to arXiv on October 9, 2026 by Hansi Yang, Linji Hao, Hongyan Hao, An Wang, Han Wu, Qi Gu, and Xunliang Cai.

What is not known:
- Exact numeric metrics (accuracy, pass rate, reward) per benchmark per iteration.
- How many loop iterations were run and what stopping criterion was used.
- Details of the two complementary task-construction routines (diagnosis-conditioned difficulty growth and agent-free/agent-based validation).
- Hyperparameters for SFT and RL (learning rate, batch size, epochs, RL algorithm).
- Size and diversity of the task pool generated each iteration.
- Which environments and tool sets compose ClawGym-Bench and Claw-Eval-Live.
- Compute cost and wall-clock time per iteration.
- Whether code, data, and checkpoints will be released (the listing shows links to Hugging Face and DagsHub but does not confirm availability).
