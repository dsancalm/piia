---
title: "FTL OS runs Linux binaries without a Linux kernel inside containers"
summary: "FTL links a userspace OS library into each container, providing Linux ABI compatibility through a minimal hypervisor-like interface. The project has hit monthly milestones since September 2026 and targets Node.js and Go runtimes by December."
lang: en
story: ftl-os-runs-linux-binaries-without-a
publishedAt: 2026-10-04T12:43:38.572Z
sourceUrl: "https://ftl-os.org/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [os, containers, linux, cloud]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
FTL is a new operating system for cloud environments built on a "userspace OS" architecture. Instead of a monolithic kernel, the OS runs as a shared library linked into each container. The FTL kernel provides a minimal hypervisor-like interface , vCPU, memory, and device access , using lightweight hardware isolation in user mode. On top of that, each container runs a full userspace OS that implements Linux processes, VFS, TCP/IP, signals, /proc, /dev, and drivers entirely in user space. The result is Linux binary compatibility without a Linux kernel inside the container. The HTTP server hosting ftl-os.org is a standard Linux binary running on FTL today.

The design tries to combine microkernel flexibility with monolithic performance. Because the OS is a library, you can add prints, apply security patches, or extend kernel semantics , fork/exec, memory management, networking , without writing kernel modules or eBPF programs. Updates apply like application deployments. No bare metal is required; FTL runs on standard cloud VMs.

The roadmap is public and date-driven. September 2026 delivered v0.0.1 with a simple Linux HTTP server. October 2026 shipped v0.1.0 with Rust async support, Linux threads, and epoll. November targets filesystem support. December aims for Node.js and Go runtimes. January 2027 plans SMP, container images, and 64-bit Arm.

```text
FTL Linux ┌────────────────────────────────┐ ┌────────────────────────────────┐
│┏━━━━━━━━━━━━━┓ ┏━━━━━━━━━━━━━┓│ │┏━━━━━━━━━━━━━┓ ┏━━━━━━━━━━━━━┓│
│┃ ┃ ┃ ┃│ │┃ ┃ ┃ ┃│
│┃ Linux ┃ ┃ Linux ┃│ │┃ Linux ┃ ┃ Linux ┃│
│┃ Process ┃ ┃ Process ┃│ │┃ Process ┃ ┃ Process ┃│
│┃ ┃ ┃ ┃│ │┃ ┃ ┃ ┃│
│┃╌╌╌╌╌ Linux system calls ╌╌╌╌╌┃│ │┗━━━━━━━━━━━━━┛ ┗━━━━━━━━━━━━━┛│
│┗━━━━━━━━━━━━━┛ ┗━━━━━━━━━━━━━┛│ │┃ ┃│ └────────────────────────────────┘
│┃ Userspace OS ┃│ ╌╌╌╌╌╌╌╌ Linux's interface ╌╌╌╌╌╌╌
│┃ (Process, VFS, TCP, ...) ┃│ ╔════════════════════════════════╗
│┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛│ ║ ║
└────────────────────────────────┘ ║ Linux Kernel ║
╌╌╌╌╌╌╌ minimal interface ╌╌╌╌╌╌╌╌ ║ ║
╔════════════════════════════════╗ ║ process, fork/exec, memory, ║
║ FTL Kernel ║ ║ signals, TCP/IP, /proc, ║
║ vCPU, memory, drivers, ... ║ ║ /dev, drivers ... ║
╚════════════════════════════════╝ ╚════════════════════════════════╝
```

What is not known: concrete benchmarks against native Linux, Kata Containers, gVisor, or Firecracker; the actual implementation status of VFS, TCP/IP, signals, /proc, /dev, and drivers beyond the checked milestones; the license and governance model; specific hardware requirements beyond user-mode execution and future 64-bit Arm; how userspace OS lifecycle works , hot updates, migration, snapshots; real Linux ABI compatibility , syscall coverage percentage, glibc/musl support; advanced networking (eBPF, XDP, DPDK, CNI) and storage (CSI) integration; OCI/Docker image availability and tooling (containerd, Kubernetes CRI); community size, contributors, or corporate backing; and any target date for a 1.0 or production-ready release.
