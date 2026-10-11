---
title: "Constrained decoding turns Qwen3-1.7B into a calibrated multiple-choice classifier"
summary: "Masking the vocabulary to only answer tokens A, E yields 59.4% accuracy on CommonsenseQA; brief fine-tuning lifts it to 62.4%. The model is severely overconfident, 98.6% predicted confidence matches just 70.1% accuracy, but temperature scaling with T=3.80 brings..."
lang: en
story: constrained-decoding-turns-qwen3-1-7b-into
publishedAt: 2026-10-11T13:19:15.778Z
sourceUrl: "https://nishtahir.com/build-your-own-decision-model/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [llm, calibration, constrained-decoding, commonsenseqa]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A practical guide walks through turning a small language model into a calibrated multiple-choice classifier. The author constrains Qwen3-1.7B so it can only emit the tokens that correspond to answer choices A through E, then measures accuracy, fine-tunes briefly, and fixes the model's extreme overconfidence with temperature scaling.

The constrained decoding works by masking the vocabulary at generation time. Only the token IDs for the valid option labels are allowed, so the model cannot hallucinate free-form text. The input format is a JSON object with the question and five options; the output is a probability distribution over those options.

```json
// input { "question": "What color is the sky?", "A": "Red", "B": "Blue", "C": "Green", "D": "Purple", "E": "I don't know" }
// output prediction: B A: 0.0000 Red B: 0.9988 Blue C: 0.0000 Green D: 0.0000 Purple E: 0.0012 I don't know
```

On a holdout slice of CommonsenseQA (1,221 examples) the base model reaches 59.38% accuracy (725 correct) and a macro F1 of 0.5844. Per-class metrics show the spread:

```
precision recall f1 support A 0.5733 0.7197 0.6382 239 B 0.5506 0.7686 0.6416 255 C 0.5372 0.6598 0.5922 241 D 0.7206 0.3904 0.5065 251 E 0.7519 0.4255 0.5435 235 accuracy: 725/1221 = 0.5938 macro f1: 0.5844
```

A quick fine-tuning pass lifts accuracy to 62.41% (762 correct) and macro F1 to 0.6234:

```
precision recall f1 support A 0.6475 0.6611 0.6542 239 B 0.6113 0.6784 0.6431 255 C 0.6234 0.5975 0.6102 241 D 0.6700 0.5418 0.5991 251 E 0.5808 0.6426 0.6101 235 accuracy: 762/1221 = 0.6241 macro f1: 0.6234
```

The model, however, is wildly overconfident. In the 0.9, 1.0 confidence bin (809 samples) the predicted confidence averages 0.9855 but actual accuracy is only 70.09%. In the 0.8, 0.9 bin (121 samples) confidence averages 0.8555 against 47.11% accuracy.

```
bin count confidence accuracy (0.00, 0.10] 0 0.0000 0.0000 (0.10, 0.20] 0 0.0000 0.0000 (0.20, 0.30] 3 0.2834 0.0000 (0.30, 0.40] 26 0.3761 0.2692 (0.40, 0.50] 41 0.4538 0.2683 (0.50, 0.60] 70 0.5490 0.3286 (0.60, 0.70] 74 0.6476 0.3649 (0.70, 0.80] 77 0.7495 0.4286 (0.80, 0.90] 121 0.8555 0.4711 (0.90, 1.00] 809 0.9855 0.7009
```

Applying temperature scaling with T = 3.797280788421631 recalibrates the outputs. After scaling, the 0.9, 1.0 bin (now 109 samples) shows 95.41% accuracy and the 0.8, 0.9 bin (169 samples) shows 79.88% accuracy, making the probabilities usable as reliable confidence scores in production.

The GitHub repository contains scripts for dataset construction, evaluation, fine-tuning, and calibration.

## What is not known

The fine-tuning hyperparameters (learning rate, epochs, batch size, hardware, training time) are not disclosed. The exact composition and splits of the fine-tuning data are unclear. The method used to select the temperature value (validation metric, optimization procedure) is not described. Results on larger Qwen variants (7B, 14B, 72B) are suggested but not reported. No comparison with Platt scaling, isotonic regression, or ensemble calibration is provided. Latency and throughput figures for constrained versus unconstrained decoding are absent. It is not confirmed whether the published repository includes the full evaluation datasets.
