---
title: "Rust crate maintainers targeted in video call supply chain campaign"
summary: "Attackers use fake job offers and collaboration pitches over video calls to trick maintainers into installing malware or running clipboard commands. The tactic already compromised the array-ref crate last month."
lang: en
story: rust-crate-maintainers-targeted-in-video-call
publishedAt: 2026-09-18T11:49:26.124Z
sourceUrl: "https://simonwillison.net/2026/Sep/17/targeted-attacks-on-rustaceans/"
sourceName: "Simon Willison"
priority: routine
tags: [rust, supply-chain, social-engineering, crates-io]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Adam Harvey and the crates.io security team have warned of an active campaign targeting rust-lang team members and maintainers of popular crates. The attack vector relies on social engineering through video calls. Attackers invent positive pretexts , job offers, project collaborations, contract work , to persuade the victim to install software, such as a supposed audio codec, or to execute a command that has been silently placed on their clipboard. Last month this method succeeded in a supply-chain compromise of the `array-ref` crate, among others. Because nearly all software depends on open source, every person with publish permissions on a dependency network is a potential vector.

The recommended defense is dependency cooldowns: wait several days before updating to new package versions so the community has time to detect malicious publishes. Maintainers should also enforce two-factor authentication on their crates.io accounts, adopt trusted publishing via GitHub Actions or similar CI/CD identity providers, and keep separate keys for publishing versus local development. Do not install software or run commands that arrive through unscheduled video calls. Treat any unexpected request to execute code as a compromise attempt.

What is not known: the total number of crates or maintainers compromised; the full list of affected crates beyond `array-ref`; the identity or attribution of the attackers; technical details of the published malware or the fake audio codec; concrete steps crates.io is taking beyond the cooldown recommendation; and whether indicators of compromise have been published for maintainers to scan their systems.
