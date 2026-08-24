---
title: "Triton brings DirectX 11 to QEMU by targeting driver interfaces, not APIs"
summary: "Triton, a Windows driver paired with Neptune, gives QEMU virtual machines full DirectX 11 support. It works by implementing the Device Driver Interface (DDI) instead of DirectX APIs, avoiding intermediate translations that cause bugs."
lang: en
story: triton-brings-directx-11-to-qemu-by
publishedAt: 2026-08-09T07:34:34.720Z
sourceUrl: "https://blog.getutm.app/2026/introducing-triton-directx-11-driver-for-qemu/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [qemu, directx, virtualization, drivers]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Triton is a Windows driver that, combined with Neptune, brings full DirectX 11 support to QEMU virtual machines. Neptune is a Direct3D protocol forwarding layer for VirtIO that serializes Direct3D API calls across the hypervisor boundary. The key insight is that the correct approach for graphics acceleration on Windows is not to implement the DirectX APIs but the DDIs (Device Driver Interface). Triton's UMD (User Mode Driver) converts DDI calls back to DirectX API calls, reusing the proven Neptune protocol.

VirtualBox has the only working open-source DirectX 11 UMD, but its code cannot be integrated due to license incompatibility (GPLv3 vs MIT/LGPLv2). Mesa has a DirectX 10 UMD that serves as a clean example for integrating Triton. VirtualBox's code was not adopted because its conversion from DDI to bytecode and then to API can cause bugs that limit game compatibility. The list of DDI prototypes implemented by VirtualBox was used as minimum requirements for a functional implementation. The DXBC signing algorithm from VirtualBox is useful because Microsoft does not publish it anywhere.

The biggest challenge for Triton is the DXBC (DirectX Byte Code) shader code, the IR emitted by Microsoft's FXC compiler.

## What this means for developers

If you work on emulators or graphics drivers, Triton demonstrates a viable path for DirectX 11 acceleration in QEMU without relying on intermediate translations, which reduces errors and improves game compatibility. The approach of targeting DDIs rather than APIs is the architectural decision that makes this possible. For anyone building on this, the Mesa DirectX 10 UMD is a cleaner reference than VirtualBox's code, despite the latter having a working DXBC signing algorithm.

## What is not known

The source does not specify which modern Windows games work with Triton beyond Crash Bandicoot Trilogy. It does not indicate concrete performance (FPS, latency) compared to other solutions. It does not detail which DirectX 11 features are implemented and which are missing. It does not mention whether Triton supports Windows versions other than Windows 11 ARM64, nor which hosts besides macOS are supported.
