---
title: "systemd-journald writes 49KB to disk for one log line, user reports"
summary: "A bug report shows journald version 257.9 generating 49KB of disk writes per log line on ext4 and over 110KB on btrfs, with 50 IOPS while logging just 2 lines per second on XFS."
lang: en
story: systemd-journald-writes-49kb-to-disk-for
publishedAt: 2026-08-14T08:01:56.656Z
sourceUrl: "https://github.com/systemd/systemd/issues/40262"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [systemd, journald, performance, storage]
generatedBy: deepseek/deepseek-v4-flash-0731
---
A bug report on the systemd issue tracker describes systemd-journald version 257.9 writing 49KB to disk for a single log line on ext4, and over 110KB on btrfs. The reporter reproduces it on Debian 13 with kernel 6.12.57+deb13-amd64, on XFS, and observes the VM doing roughly 50 IOPS while writing only 2 log lines per second.

The report links to issue #15292, which was closed years ago without a clear resolution. The author says the journal files balloon to many times the size of the content written into them, and they have seen journal corruption after unclean reboots.

Here is the full context:

```
systemd-journald 257.9
kernel 6.12.57+deb13-amd64
Debian 13
XFS filesystem
50 IOPS at 2 log lines per second
```

The practical consequence is that journald can be the dominant source of disk load in a quiet VM, which increases SSD wear and degrades performance for everything else on the same disk. This is a performance bug, not a data loss bug. The corruption detail is separate and possibly more serious, but the report does not give enough detail to diagnose it.

What is not known: the exact size of the journal files compared to their logical content, the mechanism inside journald that produces so much IO, and whether the problem reproduces on other filesystems (the report only tested XFS). There is no workaround in the report beyond running journald with different storage settings, which is a configuration change, not a fix. The issue is still open.
