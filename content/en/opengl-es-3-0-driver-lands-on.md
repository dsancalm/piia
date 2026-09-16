---
title: "OpenGL ES 3.0 driver lands on M4 and A18 Pro Macs in one month"
summary: "Developers Cody Ho and Niklas built a conformant driver using only hardware traces from a custom hypervisor, achieving 200 fps in Minecraft and working WebGL in browsers."
lang: en
story: opengl-es-3-0-driver-lands-on
publishedAt: 2026-09-16T12:08:41.195Z
sourceUrl: "https://codyho.dev/blog/gpu-driver/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [asahi, opengl, apple-silicon, reverse-engineering]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cody Ho and Niklas produced a conformant OpenGL ES 3.0 driver for the M4 Mac Mini and the A18 Pro MacBook in roughly one month. The driver runs Chrome and Firefox with working WebGL and compositing, and it pushes Minecraft to 200 frames per second. The work was done in a clean-room fashion: the only inputs were hardware traces captured through a custom hypervisor. No Apple binaries were examined.

The GPU firmware, codenamed AGX, runs on RTKit, Apple's proprietary real-time operating system. The Linux kernel communicates with that firmware through an ABI built from shared-memory structures. On the A18 Pro and M4 that ABI is 1.5 times larger in structure count and contains twice as many pointers as the M1/M2 version. The job-submission flow is also more complex, which meant the existing Asahi driver could not be reused directly.

Codex, an LLM-based agent, automated the capture and replay of GPU memory state. It iteratively reduced the number of copied pages until the driver could build the entire hardware state from code. Three hard blockers appeared. First, render work submitted before the firmware had fully started. Second, capturing compute workloads produced an initial trace of 336 megabytes. Third, partial renders occurred when the Tiled Vertex Buffer overflowed.

The compute trace was solved by booting into single-user mode, launching a minimal Metal program through an early LaunchDaemon, and capturing a clean trace that was resolved in hours. The TVB overflow required adjusting the buffer sizing logic once the new ABI layout was understood.

The code is not ready for end users. Experimental branches live in the "agx-re" repositories for verification. The next milestone is a conformant Vulkan driver.

What is not known
- Exact availability date for general users.
- Comparative performance against Apple's proprietary driver beyond the Minecraft figure.
- Current status of the Vulkan effort.
- Full details of the M5 firmware ABI, described only as "mostly" understood.
- Complete list of discovered hardware instructions or features that Apple's own driver does not use.
