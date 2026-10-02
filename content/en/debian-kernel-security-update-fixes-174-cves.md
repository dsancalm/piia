---
title: "Debian kernel security update fixes 174 CVEs"
summary: "Debian published DSA-6528-1 on September 29, 2026, addressing 174 kernel vulnerabilities across all supported releases. The advisory covers use-after-free, privilege escalation, denial of service, and information disclosure flaws."
lang: en
story: debian-kernel-security-update-fixes-174-cves
publishedAt: 2026-10-02T13:03:16.959Z
sourceUrl: "https://lwn.net/Articles/1097401/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [debian, kernel, security, cve]
generatedBy: dots-studio/dots-3-note-preview:free
---
Debian published security advisory DSA-6528-1 on September 29, 2026, covering 174 CVE identifiers in the kernel package. The list spans CVE-2024-52560 through CVE-2026-90015, indicating a mix of older flaws now backported and newer issues addressed in recent upstream releases. Salvatore Bonaccorso signed the announcement on the debian-security-announce mailing list.

The advisory covers the `linux` source package, which builds kernel images for all supported Debian releases. Each CVE represents a distinct vulnerability class: use-after-free, privilege escalation, denial of service, and information disclosure across subsystems such as filesystems, networking, memory management, and drivers. The sheer volume (174) suggests this is a cumulative update bundling fixes from multiple upstream stable branches rather than a single coordinated disclosure.

Because the kernel runs in ring zero, any of these flaws can compromise the entire host. A local user can exploit a use-after-free to gain root. A remote attacker can trigger a denial of service through a crafted packet. Information leaks defeat kernel address space layout randomization, making other exploits reliable. Container hosts are not immune: a kernel exploit breaks isolation between containers and the host.

You need the updated `linux-image-*` package matching your suite. Run `apt update` followed by `apt install linux-image-$(uname -r)` or the metapackage `linux-image-amd64` (adjust for your architecture). The new package version will be listed in the advisory. A reboot is mandatory; the running kernel remains vulnerable until the new image loads.

### What is not known

- Exact kernel version numbers for each Debian suite (bookworm, trixie, sid) that resolve the 174 CVEs.
- Per-CVE technical details: affected subsystem, attack vector, CVSS score.
- Whether any of these vulnerabilities are under active exploitation.
- The precise `apt` command line for every supported architecture and flavor.
- Whether a reboot is required in all cases (it almost certainly is).
