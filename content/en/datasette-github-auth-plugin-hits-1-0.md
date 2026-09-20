---
title: "Datasette GitHub auth plugin hits 1.0 with session fix"
summary: "Simon Willison released datasette-auth-github 1.0, adding the missing Max-Age attribute to authentication cookies so sessions survive browser restarts, especially on Mobile Safari where they previously expired aggressively."
lang: en
story: datasette-github-auth-plugin-hits-1-0
publishedAt: 2026-09-20T11:49:50.927Z
sourceUrl: "https://simonwillison.net/2026/Sep/19/datasette-auth-github/"
sourceName: "Simon Willison"
priority: routine
tags: [datasette, github, authentication, cookies]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison has released datasette-auth-github 1.0, a plugin that authenticates Datasette users against GitHub. The release fixes a session persistence bug: authenticated cookies were missing the `Max-Age` attribute, so they expired whenever the browser session ended. On Mobile Safari that happens aggressively, forcing users to sign in again every time they reopen the browser.

The fix landed in issue #80. The plugin is tested against Datasette 0.65.x and the 1.0ax preview line, and it powers the authentication on the demo site agent.datasette.io. Willison is using this release to signal stability, promoting plugins he considers production-ready to a 1.0 version number.

If you maintain a Datasette instance that uses GitHub authentication, upgrading to 1.0 restores persistent sessions across browser restarts, particularly on iOS.

## What is not known

- The exact `Max-Age` value set by the fix.
- Which previous version this updates from.
- What other changes, if any, are included in 1.0 beyond the cookie fix.
- Current adoption numbers for the plugin.
- Whether "1.0ax" denotes an alpha, preview, or other pre-release channel for Datasette 1.0.
