---
title: "Excel cells can now hold arrays like Python lists"
summary: "Microsoft 365 Insiders can store sequences such as {10, 20, 30} in a single cell and run vectorized formulas without spilling. The change removes helper columns for lightweight ETL and lets financial models keep sensitivity arrays in one place."
lang: en
story: excel-cells-can-now-hold-arrays-like
publishedAt: 2026-09-26T11:42:42.653Z
sourceUrl: "https://techcommunity.microsoft.com/blog/microsoft365insiderblog/put-multiple-values-in-one-cell-with-lists-and-arrays-in-excel/4559395"
sourceName: "Hacker News (portada)"
priority: routine
tags: [excel, arrays, microsoft365, formulas]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Microsoft has added native support for multiple values inside a single Excel cell, turning a cell into a container that behaves like a Python list or a NumPy array. The change was announced on the Microsoft 365 Insider blog and quickly reached the front page of Hacker News, collecting 196 points and 144 comments.

For decades the spreadsheet model has been strictly scalar: one cell, one value. Formulas that needed to operate on a collection of items required helper columns, Power Query, or VBA. With arrays as first‑class cell contents you can now write vectorized formulas directly on the grid. A single cell can hold a sequence such as `{10, 20, 30}` and functions like `SUM`, `FILTER`, or `MAP` can consume it without spilling into neighboring cells. This removes the friction of reshaping data before analysis and makes lightweight ETL , parsing a JSON response, splitting a delimited string, normalizing a column , practical inside the workbook itself.

Financial models benefit immediately. Instead of maintaining parallel rows for scenario assumptions, you can store an entire sensitivity array in one cell and reference it from downstream calculations. Prototyping data pipelines becomes faster because the intermediate transformations stay visible and editable in the grid, not hidden in a query editor or a macro module.

## What is not known

- When the feature will roll out to production tenants.
- Which Excel endpoints (Web, Windows, Mac, Mobile) will support it.
- The exact syntax for creating and addressing inline arrays.
- Hard limits on the number of elements a single cell can hold.
- How legacy lookup functions such as `VLOOKUP` or `INDEX/MATCH` interact with multi‑value cells.
- Performance characteristics with large arrays.
- Whether a specific Microsoft 365 subscription tier is required.
