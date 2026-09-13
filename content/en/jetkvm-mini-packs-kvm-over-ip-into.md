---
title: "JetKVM Mini packs KVM-over-IP into a 42 mm cube for $39"
summary: "The wired model uses an ESP32-P4X with hardware H.264 to stream 1080p at 30 fps over Ethernet, while the $42 Mini W adds Wi-Fi 6 via an ESP32-C5. Both expose composite USB HID and virtual media to the target, boot from a TF card, and run fully open-source firmware with..."
lang: en
story: jetkvm-mini-packs-kvm-over-ip-into
publishedAt: 2026-09-13T12:34:32.060Z
sourceUrl: "https://jetkvm.com/blog/introducing-jetkvm-mini"
sourceName: "Hacker News (portada)"
priority: routine
tags: [kvm, esp32, homelab, open-source]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
JetKVM Mini shrinks a full KVM-over-IP appliance into a 42 × 42 × 23 mm aluminium block. The wired Ethernet model costs $39; the wireless Mini W costs $42. The wired version uses an ESP32-P4X microcontroller with a hardware H.264 encoder to capture 1080p at 30 fps or 720p at 60 fps. The wireless model adds an ESP32-C5 for Wi‑Fi 6 and Bluetooth LE, which handles the initial network join from a phone or laptop browser.

Both units expose a USB 2.0 High Speed port (480 Mbps) that presents a composite keyboard, mouse, and virtual media device to the target machine, plus a second USB 2.0 Full Speed port (12 Mbps) for general use. A side-mounted TF card slot stores the ISO or disk image served as virtual media.

The firmware is open-source from day one and reuses the original JetKVM protocol stack. The same web console, cloud service, extension system, and OTA update pipeline work without modification. Secure boot is enforced by a pre‑installed public key digest burned into eFuse. An onboard OLED shows the current IP address, USB link state, and video status. JetKVM OS Services, a paid add‑on slated for a later release, will unlock 4K capture, shared clipboard, guest terminal, and file transfer.

## What this changes for homelab and edge deployments

Proprietary BMCs such as iDRAC or iLO typically lock remote console, power control, and virtual media behind expensive licenses and vendor‑specific firmware. JetKVM Mini delivers the same capabilities , BIOS/UEFI access, headless OS install, remote reboot , on commodity hardware that can be mounted with double‑sided tape or a 3D‑printed bracket. At roughly one tenth the price of a used enterprise KVM dongle, it becomes practical to equip every node in a rack, every mini‑PC at a remote site, or every workstation in a lab. The open‑source firmware also means you can audit the code path that handles keystrokes and video frames, or extend it with custom extensions for power switching, serial console bridging, or DC‑input monitoring.

## What is not known

Exact latency and throughput figures under sustained load have not been published. The list of authorized resellers and geographic availability is still pending. Maximum TF card capacity, power draw of the wireless model, and the release schedule for OS Services and the promised ATX, DC power, and serial extensions remain unspecified.
