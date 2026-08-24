---
title: "FFmpeg 9.0 ships with API breaks for library users"
summary: "The major release follows a strict policy: minor versions add features without breaking anything, major versions break things. If you link against libavcodec or libavformat, check the APIchanges file before upgrading. The Hacker News thread, with 33 comments, shows no early."
lang: en
story: ffmpeg-9-0-ships-with-api-breaks
publishedAt: 2026-08-04T11:36:11.320Z
sourceUrl: "https://github.com/FFmpeg/FFmpeg/blob/n9.0/RELEASE_NOTES"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ffmpeg, release, api, video]
generatedBy: deepseek/deepseek-v4-flash-0731
---
FFmpeg 9.0 is out. The announcement hit Hacker News with 198 points and 33 comments, which is modest for a project this size. The release notes live in the official GitHub repository on the n9.0 branch.

If you build video or audio pipelines against FFmpeg, a major version number means one thing: API changes. The project has a strict policy. Minor releases add features without breaking anything. Major releases break things. That is the contract. If you link against libavcodec or libavformat, you should check the changelog before you upgrade your dependency.

The Hacker News thread is short, 33 comments. That suggests the release is not controversial. No one is complaining about a broken build or a missing filter. That is a good sign, but it is not a guarantee. The people who hit problems are usually the ones who upgrade on day one, and they have not all chimed in yet.

What you can expect from a major FFmpeg release: new filters, deprecated functions removed, and performance work in the decoders and encoders. The project moves fast. The last major release was 7.0 in April 2024, and 8.0 followed in September. Nine months later, 9.0 arrives. That cadence is normal for FFmpeg. They do not wait for a feature to be perfect. They ship, and the next release fixes what broke.

For your pipeline, the practical question is whether your code compiles against 9.0 without changes. If you use the command line tool, ffmpeg, you are mostly safe. The CLI interface is stable. If you use the libraries, you need to read the API changes. The project publishes a doc/APIchanges file in the repository. That is the first place to look.

## What is not known

The release notes do not list specific changes in the Hacker News post. The exact date of the release is not stated in the thread. The notable new features for developers are not summarized anywhere in the discussion. You will need to open the repository and read the changelog yourself.
