---
title: "Compression is prediction, and it explains how LLMs work"
summary: "Annie Sexton's ngrok blog post argues that compression and prediction are the same process, linking data encoding to how language models handle context. The piece points to a companion guide on quantization, the practical technique for shrinking model weights, and suggests..."
lang: en
story: compression-is-prediction-and-it-explains-how
publishedAt: 2026-08-12T08:07:44.725Z
sourceUrl: "https://ngrok.com/blog/compression-is-prediction"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [compression, prediction, quantization, llms]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Annie Sexton published "Compression is prediction" on the ngrok blog on August 11, 2026. The piece runs 3,739 words and sits on the front page of Hacker News. Its title states a thesis: compression works by predicting what comes next, and that principle connects data encoding to how language models process context.

The article points to a companion piece, "Quantization from the ground up," described as a full guide on what quantization is, how it works, and how it compresses large language models. That link matters because quantization is the practical edge where compression theory meets model deployment. If you have ever shipped a model to a phone or a serverless function, you have used quantization to shrink weights from 32-bit floats to 8-bit integers, trading precision for memory.

The core idea is older than AI. A compressor like gzip predicts repeated patterns in a file and stores only the differences. The better the prediction, the smaller the output. That is why HTTP responses use `Accept-Encoding: gzip, br` and why a text file compresses far better than a random binary blob. The same logic applies to neural networks: a model that predicts the next token well is effectively compressing the training data into its weights.

For programmers, the practical takeaway is about context optimization. When you stuff a prompt with redundant instructions or verbose logs, you are feeding the model data it could have predicted, which wastes tokens and slows inference. The code in the article makes the point concretely:

```javascript
// Sum every number in the list
function sumNumbers(numbers) {
  let total = 0;
  for (const number of numbers) {
    total += number;
  }
  return total;
}
```

That version and its unformatted twin both compress to nearly the same size because whitespace is cheap to predict. The interesting compression happens in structure, not spacing. The article also mentions `count / total_symbols`, a formula for measuring how predictable a sequence is, which is the same ratio used in entropy calculations.

The link between compression and prediction is not new, but framing it through model quantization gives you a lens for debugging. If a model performs poorly on a task, ask what it failed to predict. If a prompt is too long, ask what you can cut without losing information. The theory does not tell you exactly how to optimize, but it tells you what optimization is for.

What the article does not cover: it does not explain the concrete mechanism connecting compression to prediction in language models, beyond the general principle. It does not detail the quantization guide's contents beyond the summary. It does not say whether the piece includes practical examples or stays theoretical. Those gaps are worth knowing before you click through expecting a tutorial.
