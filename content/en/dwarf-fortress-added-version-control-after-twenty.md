---
title: "Dwarf Fortress added version control after twenty years of zip files"
summary: "Tarn Adams avoided Git for two decades, calling commits a black box with no payoff. The 700,000-line simulation ran on manual backups until the Steam launch forced a switch. The exact system, date, and migration method remain unknown."
lang: en
story: dwarf-fortress-added-version-control-after-twenty
publishedAt: 2026-10-11T13:20:52.428Z
sourceUrl: "https://simonwillison.net/2026/Oct/11/dwarf-fortress/"
sourceName: "Simon Willison"
priority: routine
tags: [dwarffortress, versioncontrol, gamedev, history]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Tarn Adams spent twenty years building Dwarf Fortress without version control. In a 2013 Reddit AMA he said he disliked the feeling of committing code to a "black box" with no immediate payoff. Three years later he repeated the stance after fifteen years of solo development. Then, in a March 2023 interview around the Steam launch that made the project commercially successful, he mentioned they now had "version control stuff to use."

The gap between 2016 and 2023 is where the migration happened, but the details are missing. We do not know which system they adopted , Git, Mercurial, or something else. We do not know whether the full history was reconstructed or if they started a fresh repository. We do not know what triggered the switch: the Steam port, the addition of collaborators, branching needs, or simple fatigue with manual backups. Before 2023 the project relied on zip files, external drives, and the kind of discipline that only works when one person holds the entire model in their head.

What we do know is that a codebase of roughly 700,000 lines, simulating geology, hydraulics, personality traits, and procedural history, functioned for two decades without a commit graph. That is not an argument against version control. It is a reminder that tooling follows constraints. When the constraints shift , commercial release, multiple platforms, a team , the tooling shifts with them.

What is not known
- Which VCS they chose.
- Exact month of adoption.
- Whether historical snapshots were imported.
- The direct catalyst for the change.
