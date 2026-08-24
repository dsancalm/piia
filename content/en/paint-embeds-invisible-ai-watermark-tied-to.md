---
title: "Paint embeds invisible AI watermark tied to remote moderation service"
summary: "Every AI image generated in Paint on Copilot+ PCs receives a 16-byte GUID watermark issued by a Microsoft moderation endpoint before the local model runs. The mark is written by Watermarker.dll and survives only in C2PA-preserving formats."
lang: en
story: paint-embeds-invisible-ai-watermark-tied-to
publishedAt: 2026-08-24T21:08:35.578Z
sourceUrl: "https://xusheng.dev/posts/reversing/mspaint_invisible_watermark/main/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [paint, watermark, copilot, privacy]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Microsoft Paint and the Photos app on Copilot+ PCs embed an invisible watermark in every image produced by their local AI models. The watermark carries a 16-byte GUID that originates from a remote moderation endpoint. Before the local model runs, Paint sends the prompt to `apsaiservices-a0fqcjc6bzbhgdcd.b02.azurefd.net/v1/paint-cocreator/moderate-prompt`. The service replies with a JSON payload that includes a `watermarkId` field. That GUID is then passed to `WmkWriteWatermark` inside `Watermarker.dll`. The function requires exactly 16 bytes; any other length aborts generation with an error.

The encoded message is 18 bytes: a leading `0x4c`, the 16-byte GUID, and a checksum byte equal to the modulo-256 sum of the GUID bytes. The algorithm demands a minimum image size of 192×192 pixels, rounds dimensions to multiples of eight, and requires at least three placements per bit for a total of 144 bits. In a synthetic 512×512 BGRA test, 193,376 of 262,144 pixels changed after watermarking. The visible Copilot logo toggle in the UI does not control this invisible mark. Microsoft documents that Paint adds C2PA metadata to AI-generated images and restricts saving to formats that preserve C2PA: PNG, JPEG, GIF, and the proprietary `.paint` format.

The local models ship as encrypted `.onnxe` files in `C:\Program Files\WindowsApps\Microsoft.Paint_11.2605.71.0_x64__8wekyb3d8bbwe\PaintApp\`. Their sizes are:

```
seg.onnxe 23.1 MB
inseg_enc.onnxe 28.0 MB
inseg_dec.onnxe 16.5 MB
mager.onnxe 302.4 MB
```

`seg.onnxe` decrypts with the XOR key `Microsoft_2023`. The other three use a 4,096-byte alphanumeric key stored in `segapi.dll`. After decryption, the ONNX models contain 1,094, 1,014, 1,133, and 15,284 nodes respectively. `Watermarker.dll` is 1.67 MB.

## What is not known

- Whether the invisible watermark survives re-compression, cropping, format conversion, or further editing.
- Exact robustness of the SVD/block-based scheme against common transformations such as resizing, screenshots, or lossy compression.
- Whether the `watermarkId` is logged in Microsoft telemetry and can be linked to an account, user, or session.
- Any documented or official way to disable the invisible watermark; the visible watermark setting does not affect it.
- Geographic scope: whether the remote moderation and GUID issuance occur in all regions and languages or only a subset.
- Behavior when the moderation endpoint is unreachable due to network failure, firewall rules, or regional service absence.
- Whether Photos uses the same moderation endpoint and the same `Watermarker.dll` as Paint.
- Details of the `.paint` format and its adoption outside the Windows ecosystem.
- Whether the local `.onnxe` models are identical across all Windows 11 builds or vary by channel (Canary, Dev, Beta, Release).
