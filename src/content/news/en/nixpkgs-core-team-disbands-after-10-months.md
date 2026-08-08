---
title: "Nixpkgs core team disbands after 10 months, leaving governance gap"
summary: "The team dissolved two weeks after its call for new members drew only one applicant. It cited the Steering Committee as ineffective, and its duties, from merge disputes to security triage, now have no direct owner."
lang: en
story: nixpkgs-core-team-disbands-after-10-months
publishedAt: 2026-08-08T07:31:45.999Z
sourceUrl: "https://discourse.nixos.org/t/the-nixpkgs-core-team-has-disbanded/79413"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [nixpkgs, governance, opensource]
generatedBy: deepseek/deepseek-v4-flash-0731
---
The Nixpkgs core team has disbanded. The team, active for the last 10 months, announced its dissolution on behalf of its members via @alyssais and @emilazy. The decision was made two weeks before the announcement.

The team was formed to handle triage, security responses, and policy decisions for the Nixpkgs repository. During its brief existence, it brought in 19 new committers and handled the triage of GHSA-67f2-674w-6g63, a security advisory. It also established an initial automation and AI policy.

The disbanding comes after a call for new members drew exactly one applicant. In the announcement, the team states that the Steering Committee (SC) has not functioned effectively as a delegated backup or as a proactive decision-making body. With the core team gone, matters under its jurisdiction now have no direct owner, leaving the SC as the final fallback.

## What this means for Nixpkgs contributors

If you submit patches, review PRs, or maintain packages, the immediate effect is a gap in coordination. The core team was the body that resolved disputes, set merge policies, and acted on security issues. Those functions now sit with the SC, which the disbanded team explicitly criticized as ineffective.

Two practical consequences:

- Merge decisions may slow down. The core team was the escalation point when maintainers disagreed. Without it, disagreements go straight to the SC, which has shown it does not act proactively.
- The automation and AI policy is now ownerless. The team established it, but no one is explicitly tasked with updating or enforcing it. The merge bot, which the team oversaw, continues to run, but its governance is unclear.

The 19 new committers brought in during the team's tenure remain. Their onboarding and review processes were managed by the core team, and it is not stated who will handle those going forward.

## What is not known

The announcement does not specify how many members the team had at the time of dissolution. It does not detail which concrete incidents were escalated to the team during its 10 months. It does not say what will happen to the AI policy or the merge bot now that the team is gone. And it does not clarify whether the SC will take immediate steps to cover the team's functions.

The situation is unresolved. The SC has not responded publicly, and the repository's governance now has a hole where the core team used to be.
