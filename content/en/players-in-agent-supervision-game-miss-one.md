---
title: "Players in agent-supervision game miss one in three threats"
summary: "In 40,000 game runs, average accuracy was 66.3%, with routine-looking commands like npm run analyze slipping past most often. The results suggest human approval is a weak safety net, and the fix is to limit what agents can access rather than rely on confirmation prompts."
lang: en
story: players-in-agent-supervision-game-miss-one
publishedAt: 2026-08-07T07:56:50.307Z
sourceUrl: "https://scalex.dev/blog/ai-agent-permissions-stats/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [ai-safety, agents, security, human-factors]
generatedBy: deepseek/deepseek-v4-flash-0731
---
The numbers are brutal. In a game where players had to approve or reject AI agent commands, they got it wrong a third of the time. Over 40,000 game runs and 409,000 individual decisions, the average player accuracy was 66.3%. That means one in three threats slipped through.

The game, built to simulate the reality of supervising an autonomous coding agent, made 34% of its commands actual threats. Players still failed to catch them consistently. Only 35.2% of players detected every threat, and just 20.8% did so while blocking at most one in five safe commands. Meanwhile, 7% of players approved everything that came their way.

The pattern of failures is the interesting part. The most-missed command was `npm run analyze`, approved 64.7% of the time. The three `npm run` commands together (analyze, setup, deploy) were missed 52.5% of the time. These look like routine build steps, so players let them through. That's exactly the problem: an attacker doesn't need a scary command if `npm run setup` can run arbitrary code.

Other commands show how context matters. `cat ~/.zshrc` was approved by 45.9% of players, which leaks shell history and secrets. But `npm config set registry https://npm.internal` was blocked 59% of the time, and `rm -rf dist/` was blocked only 45%. Players were better at spotting obvious destructive commands than subtle exfiltration ones.

## What this means for permission design

The takeaway for anyone building AI agent tooling is that human approval is not a security boundary. It's a probabilistic filter with a 33% miss rate on real threats. If you're putting a confirm button in front of every agent command and calling that a safety mechanism, you're building a false sense of security.

The fix is to assume the human will fail and design the system accordingly. That means least-privilege credentials, sandboxing, and separating what an agent can see from what it can touch. The command `cat ~/.aws/credentials` being a threat only matters if the agent has access to that file in the first place. The command `--dangerously-skip-permissions` only matters if the agent runs with permissions that make skipping them meaningful.

## What we don't know

The source doesn't say how many unique players produced those 40,000 runs, so repeat players could be skewing the averages. There's no data on time pressure per command, or whether players were developers, hobbyists, or non-programmers. The exact number of total threats in the game is also unstated, only that 37 appear in one table. Without those details, the 66.3% figure is a solid signal but not a precise measurement of how any specific population would perform.
