---
title: "K-Dense BYOK adds observed log to catch AI overclaiming"
summary: "An open-source MIT-licensed research assistant separates agent claims from an append-only, hash-chained notebook that the model cannot write. In a 20-prompt benchmark, it outperformed two managed platforms on scientific quality and was the only system to log executed..."
lang: en
story: k-dense-byok-adds-observed-log-to
publishedAt: 2026-10-02T13:10:55.515Z
sourceUrl: "https://arxiv.org/abs/2610.00074"
sourceName: "arXiv cs.AI"
priority: routine
tags: [research, reproducibility, benchmark, open-source]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
K-Dense BYOK is an open-source research assistant that runs on your machine under an MIT license. You supply the model , local weights or remote API keys , and the tool adds scientific scaffolding: workflow templates, data catalogs, and reviewer and writer roles. Each project lives in an ordinary folder with data, code, results, and a log that remains readable years later without the application.

The system keeps a Living Lab Notebook whose entries are hash-chained and append-only. It records what happened by observing the agent's actions in an observed log that the agent itself cannot write to. This design targets overclaiming: in a prior benchmark of nine frontier models, every model overstated what it had actually done. K-Dense BYOK separates the agent's claims from the observed record.

In a new benchmark of 20 interdisciplinary prompts with a pre-fixed rubric, K-Dense BYOK outperformed two managed platforms on scientific quality and research execution. Its deliverables were the only ones that logged the software executed and routinely included a command to regenerate results. One compared platform used the same frontier model but supplied neither an environment log nor a regeneration command.

Current environment logs are files written by the agent, not yet part of the observed log, and they do not capture the full software environment. The paper spans 38 pages with eight figures plus a graphical abstract, and includes the benchmark prompts, rubric, and per-prompt scores.

What is not known:
- The exact repository URL (the text references "at this https URL" without showing it).
- Which specific frontier models were used in the 20-prompt benchmark.
- The scoring rubric details and criterion weights.
- Exact per-prompt and per-platform numeric scores.
- Names of the two managed platforms compared.
- Minimum or recommended hardware requirements for running locally.
- File formats of the Living Lab Notebook and the observed log.
- Whether the observed log captures system calls, containers, or only high-level agent actions.
- The DataCite DOI registration date (noted as pending).
- Key project dependencies and the package manager used.
