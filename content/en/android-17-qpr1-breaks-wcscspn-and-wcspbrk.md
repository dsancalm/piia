---
title: "Android 17 QPR1 breaks wcscspn and wcspbrk on wide characters above U+0100"
summary: "A regression in bionic's wcscspn() and wcspbrk() stops scanning at the first wide character ≥ U+0100 when the reject set contains only ASCII characters. The bug shipped in September 2026 on Pixel 7 and 8a devices (build CP3A.260905.009) and broke Visual Pinball and..."
lang: en
story: android-17-qpr1-breaks-wcscspn-and-wcspbrk
publishedAt: 2026-10-14T12:25:38.536Z
sourceUrl: "https://github.com/android/ndk/issues/2260"
sourceName: "Hacker News (portada)"
priority: routine
tags: [android, bionic, regression, libc]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Android 17 QPR1, released to Pixel 7 and Pixel 8a devices as build CP3A.260905.009 in September 2026, ships a regression in bionic's `wcscspn()` and `wcspbrk()`. Both functions stop scanning at the first wide character ≥ U+0100 when the reject set contains two or more characters all below U+0100. The public `android-17.0.0_r1` sources from June 2026 build these functions from `external/llvm-libc` and are correct. The bug was introduced between the June and September releases.

The shipped `libc.so` uses a 256‑byte boolean table for reject sets where every character is < 0x100. The optimization incorrectly treats any haystack character ≥ 0x100 as a match, terminating the scan early. A sweep of code points U+0001 to U+10FFFF shows 1,111,808 code points (U+0100 through U+10FFFF) return 0 instead of 1 for `wcscspn(L"<cp>\n", L"x\n")`. Functions `wcsspn()`, `wcschr()`, `wcsrchr()`, `wmemchr()`, and `wcsstr()` are unaffected.

```c
#include <stdio.h>
#include <wchar.h>
int main ( void ) {
    wchar_t s [] = { 'a' , 0x1F680 , 0x100 , 'b' , 'x' , '\n' , 0 };
    printf ( "wcscspn(s, L\"x\\n\") = %zu (expected 4)\n" , wcscspn ( s , L"x\n" ));
    printf ( "wcspbrk(s, L\"x\\n\") = index %ld (expected 4)\n" , ( long )( wcspbrk ( s , L"x\n" ) - s ));
    printf ( "wcsspn(s, L\"a\\U0001F680\") = %zu (expected 2)\n" , wcsspn ( s , L"a\U0001F680" ));
    return 0 ;
}
```

On a Pixel 8a running CP3A.260905.009 this prints:

```
wcscspn(s, L"x\n") = 1 (expected 4)
wcspbrk(s, L"x\n") = index 1 (expected 4)
wcsspn(s, L"a\U0001F680") = 2 (expected 2)
```

The regression broke Visual Pinball on Android (`libwinevbs`) loading VBScript tables with emoji in comments, and caused `FileSystem.MoveFolder` to treat paths containing characters ≥ U+0100 as wildcard patterns. The downstream workaround replaces `wcspbrk` calls with plain loops (vpinball/libwinevbs#41, shipped in vpinball/vpinball@e7837322f4).

Google collaborator enh‑google confirmed the bug exists at tip‑of‑tree, acknowledged missing and incorrect tests, and plans to add tests and backport fixes. The existing bionic test `TEST(wchar, wcspbrk)` only uses ASCII input. The `wcscspn` test is also wrong: it expects 2 for `wcscspn(L"he\ufffelo", L"lo")` but gets 3.

## Source availability blocks the fix

Developers cannot see the regression in public sources because the `android-latest-release` branch is too old to contain the April changes, and Android 17 QPR1 source , running on Pixel devices for over a month , is not publicly available. NDK maintainers resorted to disassembling `/apex/com.android.runtime/lib64/bionic/libc.so` to locate the faulty logic. The official AOSP changes communication is documented at source.android.com/docs/whatsnew/site-updates?year=2026#aosp-changes.

## What is not known

- Exact date when the regression was introduced between June and September 2026 releases
- Whether the fix has been backported to affected devices or when it will be
- Full list of affected devices beyond Pixel 7, Pixel 8a, and Nothing Phone 2
- Whether other wide‑string functions in bionic have similar optimization bugs
- Timeline for public release of Android 17 QPR1 sources
- How Google plans to manage AOSP source transparency going forward
