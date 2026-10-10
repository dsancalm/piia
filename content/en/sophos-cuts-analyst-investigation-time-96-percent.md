---
title: "Sophos cuts analyst investigation time 96 percent with OpenAI Daybreak"
summary: "The security vendor says 52 percent of its MDR cases are now handled automatically by an AI reasoning layer that triages alerts and produces dispositions with evidence."
lang: en
story: sophos-cuts-analyst-investigation-time-96-percent
publishedAt: 2026-10-10T12:55:07.263Z
sourceUrl: "https://openai.com/index/sophos"
sourceName: "OpenAI"
priority: routine
tags: [security, ai, sophos, openai]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Sophos has cut the time its analysts spend investigating cyber threats by 96 percent using OpenAI's Daybreak. The security vendor also reports that 52 percent of its Managed Detection and Response (MDR) cases are now handled automatically, with human analysts remaining in the loop for review and escalation.

The integration targets the triage bottleneck that plagues security operations centers. Analysts typically drown in alerts, spending the bulk of their shift determining which signals are benign and which warrant a deeper look. By offloading that initial investigation to a large language model, Sophos compresses the mean time to respond and frees senior staff for threat hunting and complex incident response.

Daybreak appears to function as an autonomous reasoning layer that ingests alert data, correlates it with threat intelligence and environmental context, and produces a disposition with supporting evidence. The 52 percent automation rate suggests the system handles the high-volume, lower-complexity tier , commodity malware, phishing lures, known exploit attempts , while kicking ambiguous or novel attacks to human operators.

Sophos has not disclosed which specific OpenAI model powers Daybreak, whether it is a fine-tuned variant of GPT-4o or a newer reasoning model such as o1. The company also has not shared the absolute investigation times before and after deployment, the false positive or false negative rates of the automated tier, the volume or types of telemetry transmitted to OpenAI, or the commercial terms of the arrangement. It is unclear whether this capability is generally available to all Sophos MDR customers or remains in a limited pilot phase.

What is not known:
- The exact nature of Daybreak (product, model, or feature)
- The technical architecture of the integration
- The specific OpenAI model used (GPT-4, GPT-4o, o1, etc.)
- Absolute investigation times before and after (hours or minutes)
- How an "MDR case" is defined and measured for the 52% figure
- False positive and false negative rates for automated dispositions
- Implementation timeline
- What Sophos telemetry is sent to OpenAI
- Economic cost of the solution
- General availability versus pilot status
