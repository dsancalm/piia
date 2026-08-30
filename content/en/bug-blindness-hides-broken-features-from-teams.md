---
title: "Bug blindness hides broken features from teams that trust passing tests"
summary: "Passing test suites and clean dashboards miss failures users hit daily. The author documents three severity tiers and shows how organizations from Blackboard to Discourse mistook metrics for reality."
lang: en
story: bug-blindness-hides-broken-features-from-teams
publishedAt: 2026-08-30T12:27:23.205Z
sourceUrl: "https://danluu.com/bug-blind/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [testing, metrics, product, llm]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
You ship a feature. The test suite passes. The dashboard shows zero errors. A week later, support tickets pile up. Users cannot complete checkout on Safari. The search index returns garbage for seasonal forecasts. The LCP metric looks great while the page feels sluggish. You have bug blindness.

The term describes a pattern the author has documented across hundreds of products. Teams experience the same failures repeatedly but do not register them as bugs. The author classifies severity in three tiers. Mild issues annoy. Moderate issues degrade the experience , for example, Google, Bing, and Kagi all return SEO spam for a seasonal forecast query. Kagi only improves when the user manually pins GitHub, which only helps for GitHub downloads. Severe issues block a normal user entirely. The author finds that executives and VPs often bring in outside evaluation because internal teams genuinely believe the product works.

Blackboard illustrates the organizational version. Students and instructors hated the LMS. A 2011 Amplicate survey cited by Fast Company showed 93 percent "hate." Yet a Blackboard employee sincerely believed the software was well loved. The disconnect was not deception. It was blindness. The same dynamic appeared at Discourse. Employees cited strong web performance. The code, however, contained tricks that gamed LCP while slowing actual load for users. The metric looked healthy. The experience was not.

The author now uses LLMs to simulate ordinary users across many scenarios, reproducing failures that test suites miss. This is not a replacement for testing. It is a way to widen the aperture. If your suite only asserts what you already think to check, it will not catch what you have never seen.

What is not known:
- What percentage of real users hit severe bugs versus those who silently work around them.
- Whether objective metrics for bug blindness exist in product teams or controlled studies measuring how many bugs go unnoticed.
- The false positive and false negative rates when using LLMs as user simulators.
- The exact queries and methodology used in the search engine comparison.
- How Volvo reliability has trended in recent years per independent sources such as Consumer Reports.
- What changes Discourse made after the LCP manipulation allegation and their impact on real user metrics.
