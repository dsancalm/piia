---
title: "AI agents find two room-temperature spintronic candidates"
summary: "Opus 5.5 agents identified YBaMnFeO5 and KV[Cr(CN)6] as Luttinger compensated semiconductors with band gaps above 2 eV and large spin windows. The oxide risks disordering during high-temperature synthesis, while the cyanide framework shows magnetic order up to 376 K but..."
lang: en
story: ai-agents-find-two-room-temperature-spintronic
publishedAt: 2026-10-06T13:38:11.509Z
sourceUrl: "https://www.vals.ai/blogs/room-temperature-magnetic-semiconductors"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [spintronics, materials, antiferromagnets, ai]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
AI agents built on Opus 5.5 have identified two candidate materials that function as Luttinger compensated semiconductors at or above room temperature. Luttinger compensated materials are antiferromagnets with zero net magnetic moment but inequivalent atomic sites that sort electron spins by energy at the band edges. This combination , band gap, spin sorting, no stray field , is the target for spintronic memory that writes and reads without magnetic crosstalk.

The agents designed the first candidate, YBaMnFeO₅, as a checkerboard double perovskite. HSE06 calculations give it a 2.35 eV band gap with spin windows of 1.0 eV for holes and 1.4 eV for electrons. The raw magnetic ordering temperature comes out around 420 K; a calibration against known compounds pushes it to roughly 490 K. The problem is structural. The checkerboard ordering of Mn and Fe collapses near 950 K, but typical oxide synthesis runs at 900, 1300 °C. If the material disorders during synthesis, the Luttinger compensation vanishes.

The second candidate, KV[Cr(CN)₆], was first reported in 1999. It is a cyanide-bridged framework where chromium binds carbon and vanadium binds nitrogen, a bonding pattern that locks the structure against atomic scrambling. HSE06 predicts a 2.1 eV gap with larger spin windows than the oxide: 2.6 eV for holes and 1.6 eV for electrons. The 1999 powder sample retained magnetic order up to 376 K (103 °C) and, after a heating cycle, 365 K. It also showed a residual moment of 0.125 Bohr magnetons per formula unit, signaling imperfect compensation. That sample contained water in its pores. HSE06 on the hydrated structure says spin sorting survives; the cheaper PBE+U method says it degrades significantly. Neither the gap nor the spin sorting has been measured experimentally.

What is not known
- Whether YBaMnFeO₅ can be synthesized without destroying the checkerboard order.
- How water in KV[Cr(CN)₆] pores actually affects spin sorting, given the disagreement between methods.
- Whether KV[Cr(CN)₆]'s predicted gap and spin windows can be confirmed in the lab.
- How either material behaves in a real device stack over time.
- Whether better Luttinger compensated semiconductors exist beyond these two.
