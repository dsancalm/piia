---
title: "Ataraxos beats world's best Stratego player with a fraction of DeepNash's compute"
summary: "Carnegie Mellon, MIT, NYU and Stanford researchers built Ataraxos, an AI that defeated top human Pim Niemeijer 15, 1 with four draws in Stratego. It trained on 16 GPUs for one week plus four GPUs for four days, costing a few thousand dollars, and played 163 million..."
lang: en
story: ataraxos-beats-world-s-best-stratego-player
publishedAt: 2026-10-03T11:57:27.021Z
sourceUrl: "https://arstechnica.com/science/2026/10/ai-finally-beat-the-best-stratego-player-in-history-and-did-it-on-a-budget/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [stratego, ai, imperfect-information, compute-efficiency]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A team from Carnegie Mellon, MIT, NYU and Stanford has built an AI called Ataraxos that beat Pim Niemeijer, widely regarded as the greatest Stratego player in history, 15, 1 with four draws in a 20‑game match. The same system went 38, 2 against humans at the 2025 World Stratego Championship, won against three world champions in the eight‑piece Barrage variant, dominated the cooperative game Hanabi and beat the best bots in dou dizhu. The work appears in Nature (DOI 10.1038/s41586-026-11036-y).

Stratego hides almost everything. Each side arranges 40 pieces in one of more than a decillion (10^33) initial configurations, and a typical game lasts roughly 2,000 moves, compared with about 40 in chess. DeepMind's DeepNash (2022) reached expert level by running 1,024 Google TPUs for two to three months, an estimated $3, 4.5 million at 2025 prices, and playing billions of self‑play games. Ataraxos needed 16 GPUs for one week plus four GPUs for four more days to train its belief model, a cost described as "a few thousand dollars," and played 163 million self‑play games , about 34 times fewer than DeepNash , while achieving a higher rating.

The architectural difference is a second neural network that infers the opponent's hidden pieces from their observed moves. This belief model feeds a search procedure that runs before every move, letting the agent reason over the imperfect information instead of relying solely on a policy network trained by regret minimization. The authors call the schedule "big bold changes early, small careful changes later," but they do not publish the learning rate, batch size, exact GPU models (H100, A100, RTX 4090, etc.), total GPU‑hours, or the network dimensions and attention details. The GPU simulator that delivers "millions of moves per second" is also undocumented. No source code, weights or public repository are mentioned.

The single loss to Niemeijer remains unexplained. It could be a bug, a statistical fluke or a genuine exploit. Exploitability metrics such as NashConv for standard and Barrage Stratego are not reported. The paper states an intention to make the system explainable, but no concrete roadmap is provided.

What is not known:
- Exact GPU models and total GPU‑hours.
- Precise dollar cost of the full training run.
- Detailed architecture of both neural networks (size, layers, attention type).
- Key hyperparameters: learning rate, batch size, annealing schedule.
- Internals of the high‑throughput GPU simulator.
- Availability of source code, weights or a public repo.
- Root cause of the one loss to Niemeijer.
- Exploitability / NashConv numbers for either Stratego variant.
- Concrete plans for explainability beyond the stated goal.
