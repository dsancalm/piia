---
title: "Japan's JIS standard contains ghost characters no one can explain"
summary: "Buried in the 1978 JIS X 0208 encoding are kanji with no known meaning or source, mostly transcription errors. Unicode absorbed them, so they pass validation and render as tofu. The 1997 investigation traced most to mistakes, but 彁 defies explanation."
lang: en
story: japan-s-jis-standard-contains-ghost-characters
publishedAt: 2026-08-16T07:09:42.586Z
sourceUrl: "https://www.dampfkraft.com/ghost-characters.html"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [unicode, kanji, jis, encoding]
generatedBy: deepseek/deepseek-v4-flash-0731
---
In 1978, Japan's Ministry of Economy, Trade and Industry set the encoding standard that became JIS X 0208. Buried inside it are characters that no one can explain. They have no known meaning, no known pronunciation, and in some cases no identifiable source. They are called ghost characters, and they are now part of Unicode.

The standard was built from large printed lists of Japanese place names and administrative divisions. The "Overview of National Administrative Districts" was one of the main sources: seven volumes, roughly nine hundred pages each. Cataloguers worked through these lists by hand, transcribing kanji into the new encoding. Errors crept in. Some characters were corrupted during transcription, like 妛, which was a failed attempt to encode the character for "mountain over woman." The original, 𡚴, was not added to JIS or Unicode until much later.

In 1997, a formal investigation was launched to trace where these characters came from. It found that most ghost characters were simple mistakes: misread handwriting, wrong radicals, misaligned components. One character, 彁, stood out. It had no source document and no historical precedent. The investigation concluded it was probably a misreading of 彊, but even that is uncertain.

When Unicode adopted the JIS standards during CJK unification, it absorbed the ghosts along with everything else. Unicode also has its own set of ghost characters, introduced separately during that same unification process.

For a programmer, this is not trivia. These characters are valid code points. They will pass validation, survive round-trips through databases, and render as tofu boxes or fallback glyphs depending on the font. If you process Japanese text, or any CJK text, you can encounter characters that have no dictionary entry, no semantic content, and no way to look them up. A string that looks like a name might contain a character that means nothing to anyone. Search, sorting, and normalization all have to handle them anyway.

There is no practical workaround that distinguishes a ghost character from a rare but legitimate one. The Unicode standard does not flag them. A validation library cannot tell you that 彁 is meaningless, because it is a defined code point with a canonical decomposition. It is just a character that should not exist.

What is not known: the total count of ghost characters in JIS X 0208, the exact split between transcription errors and other causes, and whether the 1997 investigation found every origin or only some. Unicode's own ghost characters are not enumerated in the source either. The list of what is unexplained remains open.
