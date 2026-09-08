---
title: "Simon Willison releases interactive map projection comparison tool"
summary: "Willison commissioned GPT-6 Astra to build a D3.js visualization that animates the shift from Mercator to Equal Earth, revealing how drastically area distortion changes the shape of continents."
lang: en
story: simon-willison-releases-interactive-map-projection-compariso
publishedAt: 2026-09-08T11:36:26.856Z
sourceUrl: "https://simonwillison.net/2026/Sep/7/equal-earth/"
sourceName: "Simon Willison"
priority: routine
tags: [cartography, visualization, ai, d3js]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison published an interactive tool called "Mercator Equal Earth" on September 7, 2026. The visualization animates the transition between the Mercator and Equal Earth map projections using a slider or play button. Willison commissioned the build from GPT-6 Astra (medium) inside ChatGPT Work after the Equal Earth projection was recently voted on at the UN, sparking his curiosity about the differences.

The tool serves as a reproducible template for browser-based geospatial visualizations. It demonstrates a practical instance of "vibe coding" where a developer delegates the implementation of a complex D3.js visualization , including the mathematical handling of two distinct projection systems and the interpolation logic for the animation , to an advanced AI model. Willison did not write the base D3 code; he directed the model to produce a working artifact that answered a specific technical question.

The Mercator projection, standard for web maps, distorts area significantly toward the poles. Equal Earth is an equal-area pseudocylindrical projection designed to represent relative country sizes accurately while maintaining a visually pleasing shape. The interactive transition makes the distortion trade-offs immediately visible: Greenland shrinks, Africa expands, and the overall silhouette shifts from a rectangle to a rounded, organic form.

What is not known:
- The direct URL to access the interactive tool.
- Technical details of the D3.js implementation, including source code and transition configuration.
- Specific context of the UN vote (which body, what decision was taken).
- The exact nature of "GPT-6 Astra (medium)" and "ChatGPT Work," which are not publicly documented products as of the knowledge cutoff.
- The precise visual or mathematical differences highlighted in this specific demo beyond the general projection characteristics.
