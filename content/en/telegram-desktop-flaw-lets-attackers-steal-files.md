---
title: "Telegram Desktop flaw lets attackers steal files and hijack accounts with one click"
summary: "A high-severity vulnerability in Telegram Desktop through version 7.2.8 allows remote file theft and account takeover via a malicious tg:// link. The bug exploits an unescaped semicolon in the single-instance IPC mechanism to inject commands that trigger an internal..."
lang: en
story: telegram-desktop-flaw-lets-attackers-steal-files
publishedAt: 2026-10-10T12:47:57.498Z
sourceUrl: "https://beaksec.github.io/posts/telegram-desktop-one-click-account-takeover/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [telegram, vulnerability, ipc, exploit]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A critical vulnerability in Telegram Desktop lets an attacker steal arbitrary local files and hijack a user's account with a single click. Tracked as CVE-2026-107181 and fixed in version 7.2.9, the flaw rates 8.1 High on the CVSS 3.1 scale. It affects every version through 7.2.8 and has been confirmed on Windows 6.9.3.

The root cause sits in the single-instance inter-process communication mechanism. When you click a `tg://` link while Telegram is already running, the new process hands the URL to the existing instance through a local socket. The protocol uses an unescaped semicolon as a command separator. A crafted link injects a second command during deserialization in the running instance.

```cpp
// sandbox.cpp:295-297
for ( const auto & url : cRefStartUrls ()) {
    commands += u"OPEN:" _q + url . toString ( QUrl :: FullyEncoded ) + ';' ;
}
```

The injected `OPEN:` command reaches the internal `interpret:` URI scheme. That scheme was built for automated release publishing via a local script (`Telegram/build/updates.py`). It reads a file named in an instruction file and sends the contents to a chat without any authorization checks or user confirmation.

```cpp
// sandbox.cpp:453-463 (abbreviated)
for ( int32 to = cmds . indexOf ( QChar ( ';' ), from ); to >= from ; ...) {
    auto cmd = base :: StringViewMid ( cmds , from , to - from );
    ...
} else if ( cmd . startsWith ( u"OPEN:" _q )) {
    startUrls . append ( cmds . mid ( from + 5 , to - from - 5 ). mid ( 0 , 8192 ));
}
```

The exploit chain works like this. An attacker sends an instruction file as a chat attachment in a group. Telegram Desktop automatically downloads files up to 8 MiB to a predictable path: `C:\Users\<user>\Downloads\Telegram Desktop\<file name>`. The attacker then sends a malicious link such as:

```
tg://x?a=1;OPEN:tg://x?a=1;CMD:quit;
```

Clicking the link triggers the IPC injection. The running instance parses the injected `OPEN:` command, invokes the `interpret:` handler, reads the instruction file from the known download path, and exfiltrates the specified file , for example, a session file , to an attacker-controlled chat.

The fix lands in commit `db3405699f` and version 7.2.9. Update immediately.

## What is not known

- Whether Linux and macOS versions are equally vulnerable (only Windows confirmed in text).
- Exact default download folder paths on Linux and macOS for the instruction file.
- Whether the `from:` field in the instruction file is mandatory for the exploit to work (text says check only runs if line is present).
- If the victim must be a member of the target channel or supergroup specified in `channel:` for exfiltration to succeed.
- Whether Telegram Desktop 7.2.9 fully mitigates the IPC injection or only the `interpret:` scheme exposure.
- Timeline of disclosure and patch deployment beyond the posted dates (Oct 3/7, 2026).
