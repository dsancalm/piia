---
title: "Libheif flaw and SSO misconfig let researchers hijack OpenAI employee accounts"
summary: "A heap overflow in Debian's libheif gave remote code execution on OpenAI's Discourse forum. Attackers then abused a shared SSO trust boundary to mint valid ChatGPT and Codex sessions, opening a pull request in the internal monorepo as proof of compromise."
lang: en
story: libheif-flaw-and-sso-misconfig-let-researchers
publishedAt: 2026-09-18T11:40:30.193Z
sourceUrl: "https://www.hacktron.ai/blog/hacking-openai"
sourceName: "Hacker News (portada)"
priority: flash
tags: [libheif, discourse, sso, openai]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A heap buffer overflow in libheif, combined with an OpenAI SSO misconfiguration, gave researchers from HacktronAI full compromise of OpenAI employee ChatGPT and Codex accounts on July 25, 2026. The chain started on community.openai.com, a Discourse instance running in Docker on Debian. Discourse uses ImageMagick's `magick` command to convert HEIC and HEIF uploads because FastImage lacks HEIF support. That code path hands attacker-controlled files to libheif. The version in Debian 12 (1.19.7) and Debian 13 (1.19.8) contained an unfixed heap overflow. The upstream patch landed without a security label and no CVE, so it missed the usual backport radar.

The team used Claude Opus 5 to write a working ARM64 exploit in three hours, then ported it to x86-64 with jemalloc. They achieved remote code execution on Discourse Cloud via the rce.ee/ctf-forum proxy. From there they pivoted through the SSO misconfiguration: any compromised first- or third-party service using OpenAI SSO could mint sessions for ChatGPT and Codex. With a hijacked employee Codex session they opened pull request #1186742 in the openai/openai internal monorepo. No sensitive code was accessed, per the proof of concept.

OpenAI confirmed the fix roughly 14 hours after the Bugcrowd submission at 22:49 UTC on July 25. Discourse replied Sunday, had a patch ready Monday, and published advisory GHSA-vhm9-85gw-x335 on July 28. The bounty of $6,500 was paid on September 1. OpenAI also clarified that testing against community.openai.com was explicitly excluded from their bug bounty program.

## Hardening steps for runner and CI operators

If you run Discourse or any Rails app that processes HEIC, HEIF, or AVIF uploads through ImageMagick, you are exposed until libheif is patched. Rebuild the container:

```bash
cd /var/discourse
./launcher rebuild app
```

Pin the base image to a Debian release that has the August 8, 2026 security update for libheif, or compile libheif from source after the upstream fix. Disable HEIC/HEIF support in ImageMagick policy.xml if you do not need it:

```xml
<policymap>
  <policy domain="coder" rights="none" pattern="HEIC" />
  <policy domain="coder" rights="none" pattern="HEIF" />
</policymap>
```

Audit every service that trusts your identity provider. The SSO misconfiguration turned a forum compromise into a source-code compromise because the forum, ChatGPT, and Codex shared a single trust boundary. Map your SSO graph. Enforce step-up authentication or device trust for any service that can write to repositories or deploy infrastructure. Treat every internal tool that authenticates via the same IdP as a potential pivot point.

## What is not known

The exact mechanics of the SSO misconfiguration , how a forum session became a ChatGPT/Codex session , have not been published. The specific libheif commit that fixed the overflow upstream is not identified. The ASLR bypass technique for reliable x86-64 exploitation is undisclosed. The full list of connectors attached to the compromised Codex session (GitHub, Slack, email, others) is not enumerated. OpenAI states no sensitive data was accessed beyond the proof-of-concept PR, but independent verification has not been released. Other organizations running Discourse with similar SSO topologies may be affected; no scan or advisory covers that surface.
