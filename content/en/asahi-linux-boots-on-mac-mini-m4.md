---
title: "Asahi Linux boots on Mac mini M4 after year of SPTM hurdles"
summary: "Secure Page Table Monitor broke the standard bring-up path, forcing developers to patch m1n1, map MMIO space early, and replace WFI with NOP to work around a silicon bug that clobbers registers. A working shell arrived in April 2026."
lang: en
story: asahi-linux-boots-on-mac-mini-m4
publishedAt: 2026-10-03T12:05:59.069Z
sourceUrl: "https://yuka.dev/blog-2026-10-02-linux-m4.html"
sourceName: "Hacker News (portada)"
priority: routine
tags: [asahi, m4, linux, apple]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
You bought a Mac mini M4 in November 2024 expecting Asahi Linux support to arrive quickly. The M4 is the first Apple Silicon generation that requires SPTM, the Secure Page Table Monitor that hardens the XNU kernel. SPTM forced major changes in m1n1, the minimal boot monitor Asahi uses, because the usual MMIO tracing method relies on running macOS under the m1n1 hypervisor. With SPTM active, that path broke.

You disabled strict boot security, installed m1n1 as a custom boot object from macOS Recovery, and got a serial console. On M4, m1n1 would only start in BRINGUP mode. The GXF initialization failed because GXF is disabled or locked during raw boot, so the code was made conditional and skipped. Writing to RVBAR, the Reset Vector Base Address Register, crashed the chip, but the register already held the correct value, so the write was dropped.

By December 1, 2024, a working USB proxy appeared:
```
2024-12-01 17:37 <yuka> can confirm this state gives a working usb proxy, as in a "Generic m1n1 uartproxy v1.4.17-61-ga24ff77" turns up in lsusb, and I can open a shell :)
```

Progress stalled until the Chaos Communication Congress in late 2025. A minimal Linux kernel booted with earlycon but produced no output after "Vectoring to next stage." Adapting m1n1's `debug_putc` to print a single character let you bisect the failure to MMU initialization in `arch/arm64/kernel/head.S`. Enabling the MMU broke MMIO access to the UART because Linux does not create a 1:1 mapping of the MMIO space the way m1n1 does. Adding that mapping to the early page tables let the boot continue.

A new crash appeared when writing to `SYS_IMP_APL_VM_TMR_FIQ_ENA_EL2` during interrupt controller initialization. Commenting out the write allowed the kernel to reach a shell. That register was later unlocked in newer iBoot versions, so the workaround is no longer needed.

On January 23, 2026, adding `earlycon=s5l,0x3ad200000` to the boot arguments produced useful pre-crash output. The device tree was missing `stdout-path = "serial0"`; adding it yielded register dumps and stack traces for early crashes.

Secondary cores would not start because `smp_start_offset` was missing. Using the offset from M1, M3 brought them online.

### The WFI problem

On M1, M3, a "chicken bit" (`ARM64_REG_CYC_OVRD_ok2pwrdn_force_mask`) causes WFI to clobber registers x0, x31. XNU saves and restores them; m1n1 disables the bit, and the Asahi kernel re-enables it for deep sleep states and frequency boost. On M4 that bit appears locked or removed, and the default behavior violates the ARM64 specification: WFI must not lose architectural state.

In April 2026, Linux booted with all cores by replacing WFI and WFIT with NOP in the kernel. The kernel errata framework was considered but rejected because it is difficult to detect when to NOP WFI , for example, a VM under the macOS hypervisor traps WFI for scheduling. Will Deacon proposed a boot argument to disable WFI idle; m1n1 now adds it conditionally on bare metal when WFI is broken. Meanwhile, the downstream `cpuidle-apple` driver manages sleep states, and Sven's PSCI EFI conduit work aims at a future upstream solution.

The mechanism to avoid WFI/WFIT crashes has already been merged in mainline Linux and in m1n1, enabling native multi-core boot on M4 Macs. The same workarounds work on M4 Pro, M4 Max, and M5 chips.

### What is not known

- The exact iBoot version that unlocks `SYS_IMP_APL_VM_TMR_FIQ_ENA_EL2`.
- The final name and values of the boot argument to disable WFI idle.
- Current status and timeline of Sven's PSCI EFI conduit work for upstream cpuidle.
- Progress and schedule for reverse engineering the camera, display controller, and GPU.
- Whether the WFI/NOP workaround affects power consumption or performance on M4 Pro, M4 Max, or M5.
- Release dates for the mainline Linux and m1n1 versions that include the WFI fix.
