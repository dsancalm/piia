---
title: "LLM-generated tags replace fixed categories on Simon Willison's blog"
summary: "Willison's 1,856-tag system was too rigid, so Doug Turnbull suggested letting an LLM invent tags and using vector embeddings to match them to existing ones. This removes the need for a fixed taxonomy or retraining, and works for any text collection."
lang: en
story: llm-generated-tags-replace-fixed-categories-on
publishedAt: 2026-08-16T07:10:24.956Z
sourceUrl: "https://simonwillison.net/2026/Aug/14/dont-classify-hallucinate/"
sourceName: "Simon Willison"
priority: urgent
tags: [tagging, llm, embeddings, taxonomy]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Simon Willison has 1,856 tags on his blog. That is the number he hit when he realized the old tagging system, a fixed list of categories, was failing him. His older posts never got tagged, and the list had grown so unwieldy that adding new tags felt like a maintenance burden. So he asked Doug Turnbull, who proposed something counterintuitive: stop classifying, and let the LLM hallucinate instead.

The idea is simple. Instead of running a classifier against a fixed set of labels, you ask a language model to invent tags from scratch. Then you use vector embeddings to match those invented tags against the tags you already have. The model does not need to know your taxonomy. It just needs to produce plausible labels, and the embeddings bridge the gap between what the model dreams up and what actually exists.

Turnbull's prompt is the core of the technique. It does not ask for a category from a list. It asks for a novel classification:

```
Your task is to create novel, never seen before, furniture, home goods, or hardware classification that best fit a search query.
Product classifications might look like:
Furniture / Living Room Furniture / Coffee Tables & End Tables / Coffee Tables
Décor & Pillows / Decorative Pillows & Blankets / Throw Pillows
Furniture / Bedroom Furniture / Dressers & Chests
Kitchen & Tabletop / Kitchen Organization / Food Storage & Canisters
```

The model returns an imagined path, something like "Furniture / Living Room Furniture / TV Stands & Media Consoles". Then you embed that string, compare it against embeddings of your existing 1,856 tags, and pick the nearest one. If nothing is close enough, you create a new tag. The prompt never constrains the output to a known set, so the model can suggest labels you never thought of.

For a programmer, this changes how you approach tagging and content organization. You no longer need to maintain a list of categories or retrain a classifier when the list changes. The LLM generates candidates, embeddings do the matching, and your database stays consistent without manual curation. It works for blog posts, product catalogs, support tickets, anything with a text field you want to organize.

Simon's blog is the test case. He has 1,856 tags and untagged legacy content. The technique lets him process that backlog without manually assigning each post a label. The model invents, the embeddings align, and the result is a tag set that grows organically.

## What is not known

The source does not specify which embedding model is used, nor how the similarity search is implemented. There is no mention of a similarity threshold for deciding when an invented tag matches an existing one. The exact prompt settings, such as temperature, are not detailed either. You would need to experiment with those parameters yourself.
