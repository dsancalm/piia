---
title: "IBM releases Granite PatchTST time-series model under Apache-2.0"
summary: "The new foundation model uses a Transformer encoder on patched sequences to forecast and detect anomalies across multivariate data. Weights are on Hugging Face for one-line loading, and the Apache-2.0 license allows commercial fine-tuning or embedding without extra..."
lang: en
story: ibm-releases-granite-patchtst-time-series-model
publishedAt: 2026-09-10T11:39:26.023Z
sourceUrl: "https://huggingface.co/blog/ibm-research/ibm-releases-sota-granite-time-series"
sourceName: "Hugging Face"
priority: routine
tags: [ibm, timeseries, transformer, apache2]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
IBM has released Granite Time Series PatchTST-FM-r2, a foundation model for time-series forecasting and anomaly detection, under a license that permits commercial use. The model builds on the PatchTST architecture, which treats a time series as a sequence of patches , similar to tokens in language models , and processes them with a Transformer encoder. This approach captures both local patterns and long-range dependencies without the heavy recurrence of older RNN or LSTM designs.

The r2 designation marks an update over the initial Granite time-series release. IBM has not published the full benchmark table in the announcement, but the company states the model reaches state-of-the-art results on standard forecasting benchmarks such as M4, M5, and several UEA classification tasks. The weights are hosted on the Hugging Face Hub under the `ibm-granite` organization, making them downloadable with a single `transformers` call:

```python
from transformers import PatchTSTForPrediction

model = PatchTSTForPrediction.from_pretrained("ibm-granite/granite-timeseries-patchtst-fm-r2")
```

The model accepts multivariate input with a configurable lookback window and produces probabilistic forecasts or anomaly scores depending on the head attached. Because the license is Apache-2.0, you can fine-tune, distill, or embed the model in a product without negotiating a separate agreement.

Integration into an existing pipeline is straightforward. Preprocess your series into a `past_values` tensor of shape `(batch, num_channels, context_length)`, pass it through the model, and read `prediction_outputs` for point forecasts or `distribution_outputs` for quantiles. The same forward pass feeds an anomaly-detection head if you switch the task head at load time.

What is not known: the exact parameter count of r2, the full training corpus composition, hardware requirements for low-latency inference, side-by-side numbers against the r1 checkpoint, and any documented failure modes on irregular or sparse series.
