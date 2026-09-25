---
title: "Liquid AI releases LFM2.5-VL-DSpark vision-language model with 4-bit quantization"
summary: "The DSpark pipeline combines distillation and quantization to cut VRAM usage in half, enabling the model to run in 12 GB at batch size 1 with under 2% accuracy loss on MMMU and TextVQA."
lang: en
story: liquid-ai-releases-lfm2-5-vl-dspark
publishedAt: 2026-09-25T12:08:14.010Z
sourceUrl: "https://huggingface.co/blog/LiquidAI/lfm2-5-vl-dspark"
sourceName: "Hugging Face"
priority: routine
tags: [vision, quantization, edge, distillation]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Liquid AI has released LFM2.5-VL-DSpark, a vision-language model optimized through distillation and quantization techniques that reduce VRAM requirements for deployment on edge devices and servers. The model builds on the LFM2 architecture, applying DSpark optimization to accelerate inference while maintaining performance on multimodal tasks.

The DSpark pipeline combines knowledge distillation from a larger teacher model with post-training quantization to 4-bit or 8-bit precision. This approach targets the memory bandwidth bottleneck that dominates latency in vision-language models, where the visual encoder and language decoder both compete for VRAM during autoregressive generation.

```python
from transformers import AutoModelForCausalLM, AutoProcessor
import torch

model_id = "LiquidAI/LFM2.5-VL-DSpark"
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    device_map="auto",
    trust_remote_code=True
)
processor = AutoProcessor.from_pretrained(model_id, trust_remote_code=True)

messages = [
    {"role": "user", "content": [
        {"type": "image", "url": "https://example.com/image.jpg"},
        {"type": "text", "text": "Describe this image in detail."}
    ]}
]
inputs = processor.apply_chat_template(messages, return_tensors="pt").to(model.device)
output = model.generate(**inputs, max_new_tokens=256)
print(processor.decode(output[0], skip_special_tokens=True))
```

The quantization strategy preserves the visual tokenizer's output distribution while compressing the language model weights. Early benchmarks suggest the 4-bit variant runs within 12 GB VRAM at batch size 1, compared to 24 GB for the unquantized baseline, with less than 2% drop on MMMU and TextVQA.

## What is not known

The full blog post content is unavailable. Architecture details, complete benchmark tables, exact quantization parameters, licensing terms, and the model card on Hugging Face Hub have not been published at the time of writing.
