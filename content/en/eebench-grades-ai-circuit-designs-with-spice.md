---
title: "EEBench grades AI circuit designs with SPICE pass-fail scores"
summary: "Claude Opus 5 leads at 61.6 percent on 13 analog and digital tasks. Grok 4.6 follows at 57.1 percent. The benchmark runs deterministic simulations that reject schematics missing voltage and timing specs, exposing gaps like a hold-up capacitor that collapsed at 0.85 ms..."
lang: en
story: eebench-grades-ai-circuit-designs-with-spice
publishedAt: 2026-09-05T11:02:21.483Z
sourceUrl: "https://eebench.org/blog/can-ai-design-circuit-boards-yet/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [benchmark, circuit, spice, ai]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
EEBench is the first benchmark that grades AI circuit design the way a hardware engineer grades a prototype. It runs a deterministic SPICE simulation, checks every voltage and timing corner, and rejects anything that does not meet spec. The framework ships 13 tasks covering analog and digital blocks. Each task is expressed in atopile, a declarative hardware language that lets a model place components, define nets, and attach constraints without opening a schematic editor. A harness then simulates the netlist, measures gain, ripple, transient response, and tolerance corners, and returns a pass-or-fail score.

The numbers are concrete. Claude Opus 5 leads at 61.6 percent. Grok 4.6 follows at 57.1 percent, rising to 60.0 percent with xhigh reasoning effort. GPT-5.5 and GPT-5.6 Sol sit at 42.3 and 39.4 percent. GPT-6 Astra, shown in an OpenAI launch post driving KiCad, has not been evaluated. xAI lists EEBench in the Grok 4.6 model card under "engineering acceleration" and says Grok 4.7 will arrive within weeks after additional training on a large SpaceX data collection.

A single task illustrates the gap between plausible schematics and working hardware. The residential energy meter must keep a protected rail above 3.0 V for 20 ms after the 5 V supply disappears. One submission used a 22 µF ±20 % X5R 0805 capacitor rated 10 V to 25 V. At the 4.7 V bias the effective capacitance dropped to 11.4 µF. The simulation demanded 545 µF. The rail collapsed at 0.85 ms.

```atopile
.ELEC : @STD :: Import { . project &= "electronics" . org &= "atopile" }
.Submission : @type {
  . vin : ELEC :: ElectricPower
  . vhold : ELEC :: ElectricPower
  . vhold.lv ~ . vin.lv
  . c_bank : ELEC :: Capacitor {
    . capacitance &= 22uF +/- 20%
    . max_voltage &= 10V .. 25V
    . temperature_coefficient &= "X5R"
    . package &= "0805"
  }
  . vhold.hv ~> . c_bank ~> . vhold.lv
}
```

The same simulation harness doubles as an RL environment. Failed runs emit reward signals from voltage limits, operating corners, and cost-efficiency targets, letting labs post-train models on real electrical feedback rather than syntactic plausibility.

What is not known: GPT-6 Astra's score, whether Grok 4.7 ships on schedule or improves on 4.6, the exact BOM cost references used in grading, the full specification of the harder analog tasks such as multiple-feedback filter synthesis, and when EEBench will expand to cover layout, manufacturing, and bring-up.
