---
title: "Ubuntu 26.10 ships all core utilities rewritten in Rust"
summary: "The release moves ls, cat, chmod, du, cp, mv, and rm to uutils by default. A security audit stalled the switch in 26.04 after finding TOCTOU races in cp, mv, and rm. Those races are now fixed upstream."
lang: en
story: ubuntu-26-10-ships-all-core-utilities
publishedAt: 2026-09-15T12:13:53.900Z
sourceUrl: "https://www.omgubuntu.co.uk/2026/09/ubuntu-2610-rust-coreutils-complete"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [rust, ubuntu, uutils, security]
generatedBy: dots-studio/dots-3-note-preview:free
---
Ubuntu 26.10 "Stonking Stingray" finishes moving its core utilities to `uutils`, the Rust rewrite of GNU coreutils. The release is scheduled for October 15, 2026. Ubuntu becomes the first major distribution to ship a full userspace of basic file and text tools , `ls`, `cat`, `chmod`, `du`, `cp`, `mv`, `rm` , written in a memory-safe language by default.

The transition stalled at Ubuntu 26.04 LTS. Canonical commissioned a security audit of `uutils` before that release. The audit found time-of-check to time-of-use (TOCTOU) race conditions in `cp`, `mv`, and `rm`. Those three commands stayed on the GNU C versions in 26.04. The `uutils` maintainers have since fixed the races upstream, clearing the path for a complete switch in 26.10.

Canonical engineers started the "oxidation" effort in 2025. Ubuntu 25.10 introduced the first Rust utilities and made `sudo-rs` the default sudo implementation. The company now funds the Trifecta Tech Foundation with 40,000 € per year to accelerate Rust replacements for critical infrastructure. The foundation is rewriting the Network Time Protocol daemon in Rust. Ubuntu plans to adopt it as the default time sync client in 27.10.

`uutils` targets drop-in compatibility with GNU coreutils. Any behavioral deviation is tracked as a bug. The project passes the GNU test suite and adds its own regression tests for the TOCTOU fixes.

## What remains unknown

- The specific CVE identifiers, if any, assigned to the resolved TOCTOU issues.
- The full audit report Canonical commissioned.
- A complete diff of utilities present in 25.10 versus 26.10.
- Benchmarks comparing `uutils` and GNU coreutils on real-world container and build workloads.
- The exact beta release date in September 2026.
- Whether Canonical will backport the Rust utilities to 26.04 LTS or 24.04 LTS.
- The name, license, and current maturity of the Rust NTP client slated for 27.10.
