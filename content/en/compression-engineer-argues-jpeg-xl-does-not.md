---
title: "Compression engineer argues JPEG XL does not belong in browsers"
summary: "An AVIF contributor claims JPEG XL's only measurable win is an 11.9% lossless size reduction over WebP on a test set deemed unrepresentative. In lossy compression, which dominates web traffic, optimized AVIF encoders now lead on perceptual metrics like CVVDP and..."
lang: en
story: compression-engineer-argues-jpeg-xl-does-not
publishedAt: 2026-09-14T13:44:23.136Z
sourceUrl: "https://giannirosato.com/blog/post/case-against-jxl/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [avif, jpegxl, compression, web]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A compression engineer who has contributed to AVIF encoding argues that JPEG XL does not earn a place in the browser stack. The core claim: the format's only measurable advantage is an 11.9% lossless size reduction over WebP on a test set (157 MP photos, 10 MP illustrations, 27 MP books) that the author calls unrepresentative of web traffic. In lossy compression, which serves the vast majority of bytes on the web, JPEG XL trails optimized AVIF encoders.

Modern AV1 encoders such as libaom and SVT-AV1 now include perceptual tuning modes derived from controlled subjective tests. Metrics including CVVDP, MS-SSIM, and SSIMULACRA2 show significant gaps against JPEG XL. The reference encoder, libjxl, has long-standing perceptual issues that remain largely unresolved.

## Missing coding tools

JPEG XL lacks several tools that AV1 uses to close rate-distortion gaps:

- No directional prediction modes.
- No deblocking loop filter (DLF). The format relies on Gaborish and an edge-preserving filter (EPF), which are not full substitutes.
- No Intra Block Copy (IntraBC). The proposed alternative, patches, requires explicit enablement in libjxl below effort 7 due to performance problems. Residual coding with patches is awkward: it demands a reference frame, header, crop, blend, dictionary entry, coordinates, and a residual frame, adding overhead compared to AV1's IntraBC.

The XYB perceptual color space is based on intuition and does not consistently translate to gains in other formats. Libjxl quantizes the B channel aggressively, leading to poor color preservation. The format also handles non-photographic images poorly.

## Specification scope

The JPEG XL specification supports up to 4096 channels, arbitrary bit depth, progressive decoding, and JPEG recompression. Many of these features have limited utility on the web. AVIF already supports progressive rendering. For HDR delivery, 10-bit depth is sufficient.

The author chose not to build on JPEG XL for their own encoder, codenamed aperture-alpha, citing the accumulated complexity and the weak lossy story.

## What is not known

- Exact version or date when the Rust JPEG XL decoder shipped in Firefox and Chrome.
- Concrete metric values for CVVDP, MS-SSIM, and SSIMULACRA2 comparing JPEG XL and optimized AVIF.
- Technical details of the aperture-alpha encoder beyond its codename.
- Precise bit overhead of JPEG XL patches versus AV1 IntraBC in typical web scenarios.
- Whether major browser vendors have formally reversed their position on JPEG XL after the Rust decoder landing.
- Decode speed and memory footprint of JPEG XL versus AVIF and WebP on 2026-era client hardware.
