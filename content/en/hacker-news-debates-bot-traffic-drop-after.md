---
title: "Hacker News debates bot-traffic drop after reported Yandex datacenter strike"
summary: "A Cloudflare Radar chart for AS13238 shows a sharp decline in bot-classified traffic that the submitter links to a datacenter strike, but no screenshot, timestamp, or numeric data accompanies the post."
lang: en
story: hacker-news-debates-bot-traffic-drop-after
publishedAt: 2026-10-11T13:23:19.282Z
sourceUrl: "https://radar.cloudflare.com/bots/as13238?dateRange=7d"
sourceName: "Hacker News (portada)"
priority: routine
tags: [cloudflare, yandex, bot-traffic, security]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A Hacker News submission linking to Cloudflare Radar's seven-day bot view for AS13238 (Yandex) has collected 274 points and 106 comments. The title claims a sudden drop in bot traffic after a strike on a Yandex datacenter. The Radar page shows the trend, but the submission does not include a screenshot or a numeric summary, so the exact magnitude of the decline , whether measured in requests per second, percentage, or absolute volume , is not in the public record.

The AS13238 announcement covers a large block of Yandex infrastructure. Cloudflare's bot filter aggregates traffic that its heuristics classify as automated across that entire autonomous system. If a single facility went offline, the effect would appear only if that facility carried a disproportionate share of the bot-tagged flow. Without prefix-level breakdowns or a timestamped incident report, it is impossible to tell whether the dip reflects a physical outage, a fiber cut, an intentional mitigation, a configuration error, or a classification change on Cloudflare's side.

For teams that tune WAF rules or rate limits against Cloudflare's bot scores, a sustained shift in the baseline from a major ASN can move the threshold where legitimate traffic gets challenged. A sudden, unexplained drop may reduce false positives temporarily, but it also removes a chunk of the training signal that the model uses to distinguish abusive patterns. If the traffic returns when the facility recovers, the score distribution will swing again, and rules calibrated during the dip may over-block or under-block.

**What is not known**

- Exact size of the bot-traffic drop (percentage or absolute numbers).
- Date, location, and nature of the alleged datacenter strike.
- Whether the change spans the whole AS13238 or only specific prefixes.
- Root cause: physical damage, network partition, deliberate blocking, misconfiguration, or Cloudflare classification update.
- Substance of the 106 Hacker News comments , hypotheses, evidence, or rebuttals.
