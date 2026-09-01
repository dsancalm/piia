---
title: "Google releases TimesFM-3 for zero-shot multivariate forecasting"
summary: "The 330-million-parameter model was pre-trained on over one trillion time points and uses a decoder-only transformer with alternating temporal and cross-variable attention."
lang: en
story: google-releases-timesfm-3-for-zero-shot
publishedAt: 2026-09-01T12:00:44.642Z
sourceUrl: "https://research.google/blog/timesfm-3-a-zero-shot-foundation-model-for-multivariate-forecasting/"
sourceName: "Google Research"
priority: flash
tags: [google, timesfm, forecasting, transformer]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google Research has released TimesFM-3, a 330-million-parameter foundation model for time-series forecasting that operates zero-shot on multivariate data. The model was pre-trained on more than one trillion time points and introduces a native multivariate architecture that predicts multiple target series at once while ingesting both past covariates and known future covariates such as promotions, holidays, or weather forecasts.

The architecture is a decoder-only transformer that processes sequences in patches of 32 time steps. Each series is normalized independently. Layers alternate between causal temporal attention across time steps and full attention across variables, letting the model share statistical strength between series without leaking future target information. Decoding is non-autoregressive: a Contiguous Patch Masking scheme masks the target series and past covariates over the forecast horizon while leaving future covariates visible. A single forward pass produces the entire horizon, and the head outputs nine quantiles from the 10th to the 90th percentile for every target series at every step.

On the public benchmarks Gift-Eval, FEV-Bench, and Time, TimesFM-3 matches or beats reproducible foundation models in univariate mode. In multivariate mode it achieves the best average rank across both point and probabilistic metrics, outperforming Chronos-2, Toto 2.0, and the previous TimesFM-2.5.

The model weights and inference code are available on GitHub and Hugging Face. Integration with BigQuery via the `AI.FORECAST` SQL function is expected in the coming weeks.

## What is not known

- Exact numeric metrics (MAE, MSE, CRPS) on each benchmark
- Maximum context length and forecast horizon supported
- Hardware or VRAM requirements for inference
- License terms for the model weights
- Precise release date for the BigQuery integration
- Latency or throughput comparisons against TimesFM-2.5 and competing models
- Whether the pre-training corpus includes synthetic data and in what proportion
