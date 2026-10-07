---
title: "OpenAI releases Lean formalizations of IMO problems"
summary: "The repository shifts evaluation from multiple-choice benchmarks to machine-checked proofs in Lean, giving developers a verifiable corpus of high-difficulty competition problems across algebra, combinatorics, geometry, and number theory."
lang: en
story: openai-releases-lean-formalizations-of-imo-problems
publishedAt: 2026-10-07T13:45:22.386Z
sourceUrl: "https://openai.com/index/sharing-ai-progress-in-mathematics/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [lean, theorem-proving, imo, openai]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
OpenAI published a blog post titled "Sharing AI progress in mathematics" and accompanied it with a GitHub repository at github.com/openai/math. The repository contains a `preprints` directory with associated papers. The submission reached the front page of Hacker News, gathering 1,042 points and 1,050 comments.

The release is notable because it shifts evaluation from saturated multiple-choice benchmarks to formalized mathematics in Lean. The problems cited come from the International Mathematical Olympiad and the IMO Shortlist. These problems require multi-step reasoning that current large language models still struggle to solve reliably. By providing formal statements and proofs in a proof assistant, OpenAI gives developers a verifiable artifact: a theorem statement that either compiles or it does not. There is no ambiguity about whether the model "understood" the problem; the kernel checks the proof.

For programmers building tooling around formal verification, this repository is a new corpus of high-difficulty statements with machine-checked proofs. The Lean formalizations can be imported directly into a local environment, used to test tactic automation, or serve as training data for models that target theorem proving. Because the statements originate from competition mathematics, they cover algebra, combinatorics, geometry, and number theory in a distribution that differs from the undergraduate libraries typically found in mathlib.

The repository structure is minimal. The `preprints` folder holds PDFs. There is no `lean-toolchain` file or `lakefile.toml` visible at the root, so the exact Lean version and dependency graph are not declared in the top level. Developers who want to compile the files will need to inspect individual `.lean` files for `import` statements and infer the required mathlib version.

## What is not known

The blog post date is not specified in the source. The specific theorems formalized, the models used to generate the proofs, and the success rates on the IMO Shortlist are not described. The license covering the Lean code, the preprints, and any model weights has not been published. It is unclear whether the repository will accept contributions or remain a static snapshot.
