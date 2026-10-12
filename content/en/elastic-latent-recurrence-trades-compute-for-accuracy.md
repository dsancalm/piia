---
title: "Elastic Latent Recurrence trades compute for accuracy without slowing single-pass"
summary: "A single ELR checkpoint matches feed-forward speed at one loop and gains up to 7.25 accuracy points at four loops. The method mixes loop counts during training, conditions on depth, and reuses MoE routing to cut overhead."
lang: en
story: elastic-latent-recurrence-trades-compute-for-accuracy
publishedAt: 2026-10-12T15:56:31.329Z
sourceUrl: "https://arxiv.org/abs/2610.12582"
sourceName: "arXiv cs.CL"
priority: routine
tags: [recurrence, efficiency, language-models, inference]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A single recurrent checkpoint can now trade inference compute for accuracy without slowing down the fast path. Elastic Latent Recurrence (ELR) trains a latent recurrent language model that avoids the "one-loop tax" , the overhead that usually makes a recurrent model slower than a feed-forward equivalent at a single pass. At one loop, an ELR model costs the same to serve as a non-recurrent model of the same size and reaches comparable accuracy when trained on the same data. At four loops, the same checkpoint gains 7.25 points on a 10-task average for a 4B dense model and 4.75 points for a 30B-A3B MoE hybrid.

Three design choices make this work. First, the recurrent state update uses a gated mechanism with a learned step size instead of a simple residual add. Second, the optimizer sees a mixture of loop counts within each update rather than a fixed depth. Third, every forward pass is conditioned on its loop index and the total loop budget, so the model knows where it is in the computation. You can introduce the depth mixture late in pre-training to limit added training cost. With zero-initialized conditioning at the switch, this late schedule reaches lower loss than training with depth mixing from scratch.

On the MoE variant, reusing the expert routing decisions from the first loop in subsequent loops cuts mixed-depth update time by 11.7 percent with no measurable accuracy change. During inference, keeping only the attention KV cache from the final loop holds KV memory at the single-loop level while retaining most of the multi-loop quality gain.

The recipe applied to post-training produced Koi-4B, a single checkpoint that scores roughly 18 on the Artificial Analysis Intelligence Index at one loop , matching Qwen2.5-4B , and roughly 29 at four loops.

### What is not known
- The shared recurrent block architecture: layer count, hidden dimensions, attention heads.
- Pre-training hyperparameters: learning rate, batch size, context length, tokenizer, data mix, total steps.
- The exact step or percentage when late depth mixing is introduced.
- Koi-4B post-training details: instruction data, RLHF/RLAIF configuration, final context length.
- Training hardware and framework: GPUs, TPUs, Megatron, NeMo, PyTorch FSDP, etc.
- Measured inference latency and throughput (tokens/s, KV memory in GB) for 1 and 4 loops.
- Training code, inference code, checkpoints, and release licenses.
