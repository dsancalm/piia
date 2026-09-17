---
title: "Datasette 1.0a40 adds background tasks and upgrades to httpx 2.x"
summary: "Plugin authors can now offload long-running work with add_background_task(), returning a task object that can be polled or awaited. The internal HTTP client moves to httpx 2.x, bringing connection pooling, timeouts, and HTTP/2 support to tests and automation scripts."
lang: en
story: datasette-1-0a40-adds-background-tasks-and
publishedAt: 2026-09-17T12:09:23.537Z
sourceUrl: "https://simonwillison.net/2026/Sep/16/datasette/"
sourceName: "Simon Willison"
priority: routine
tags: [datasette, plugin, httpx, alpha]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Datasette 1.0a40 arrived on 16 September 2026. It carries the same security patch that landed in 0.65.5 and a batch of fixes driven by the push toward a stable 1.0.

The headline addition for plugin authors is `datasette.add_background_task()`, contributed by Alex Garcia. It lets a plugin hand off long-running work , imports, transformations, report generation , without tying up the HTTP request that triggered it. The method returns a task object you can poll or await, so the response goes back to the client immediately while the job continues on the server.

The release also switches the internal HTTP stack to httpx 2.x. That upgrade unlocks `datasette.client.get()` and the rest of the async client API for tests and automation scripts. Any plugin or test suite that exercises Datasette endpoints through the internal client now runs on httpx 2's connection pooling, timeout handling, and HTTP/2 support without extra wiring.

```python
datasette.client.get()
```

Beyond those two changes, the changelog lists numerous bug fixes traced to the recent issue triage effort. The security fix details mirror whatever 0.65.5 addressed; the project has not published a separate breakdown for this alpha.

## What remains unclear

The exact security vulnerability patched in 0.65.5 has not been itemized for this alpha. The full list of resolved bugs is not enumerated in the release notes. Which httpx 2 features are actually exercised beyond the internal client is undocumented. No target date for a stable 1.0 has been announced, and the notes do not call out breaking changes relative to earlier alphas.
