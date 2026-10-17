---
title: "FLUX 3 Image Klein: 5.6B open diffusion model outperforms larger rivals"
summary: "A 5.6B-parameter open model for text-to-image, editing, and multi-reference synthesis. It delivers 4K output, runs on 8GB VRAM, and beats Qwen-Image 2.1 and Krea 2 in benchmarks. Available now in ComfyUI, Diffusers, and TensorRT-LLM."
lang: en
story: flux-3-image-klein-5-6b-open
publishedAt: 2026-10-17T11:06:31.305Z
sourceUrl: "https://bfl.ai/blog/flux-3-image-klein"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [diffusionmodel, text-to-image, opensource, aiimagegeneration]
generatedBy: dots-studio/dots-3-note-preview:free
---
FLUX 3 Image Klein is a 5.6B-parameter open diffusion model for text-to-image generation, image editing, and multi-reference synthesis, supporting up to 10 reference images. It shares capabilities with FLUX 3 Image: native 4K output, pixel-perfect editing, and bounding-box control. It leverages cross-modal learning from FLUX 3’s image, video, and audio training to improve realism. The release includes a base model for fine-tuning and a distilled variant for low-latency inference. It runs in FP8, INT8, and NVFP4, with NVIDIA support.

It outperforms larger open and closed models in internal evaluations: 91 Elo gain in text-to-image and 70 in editing over FLUX.2 [klein] 9B, with 38% fewer parameters. It beats Qwen-Image 2.1 (7B) and Krea 2 (12.9B) in head-to-head benchmarks. On consumer GPUs, it runs in INT8 with just 8GB VRAM. The distilled model generates a 1MP image in ~4 seconds on RTX 5090 and under 9 seconds on RTX 4070. On GB300 with NVFP4, it drops below 0.6 seconds. Generator weights are 11.2 GB in BF16, 5.6 GB in FP8. Adding LoRA adds ~5% generation time.

It is available day-one in ComfyUI, Hugging Face Diffusers, TensorRT-LLM, SGLang Diffusion, and vLLM-Omni. Trained on NVIDIA GB200 NVL72 and optimized for TensorRT LLM and vLLM-Omni. The base model supports LoRA fine-tuning from day one via Diffusers and Ostris AI Toolkit. It is also available via BFL API (flux-3-image-klein) at $0.009 per 1K images, with prompt upsampling and pixel-perfect restoration. Also on Playground and Hugging Face.

It includes safeguards: dataset filters and fine-tuning to suppress harmful behaviors. Internally red-teamed and evaluated by Cinder, showing fewer vulnerabilities than other open models. This is the second open release in the FLUX 3 family, after FLUX 3 Action. The FLUX Kommunity License allows free commercial use for individuals and companies with <$5M annual revenue, plus non-commercial research. Larger organizations can deploy via self-hosted licenses or API.

```bibtex
@misc{bfl2026flux3imageklein, author = {{Black Forest Labs}}, title = {{FLUX} 3 Image Klein}, year = {2026}, url = {https://bfl.ai/blog/flux-3-image-klein}, }
```

What is not known: exact performance on GPUs other than RTX 5090, 4070, and GB300; generation time for the base model on other hardware; the exact benchmark methodology and normalization for latency and Elo measurements; output quality under low lighting, complex textures, or extreme scenes; impact of LoRA on image quality (only time is reported); maximum image size; whether it supports mask-based or semantic segmentation conditioning; exact dataset size; and availability of checkpoints in ONNX or TensorRT formats.
