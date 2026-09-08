---
title: "Researcher factors 1999 Netscape root keys on a desktop in hours"
summary: "Matthew McPherrin broke two 512-bit RSA roots from E-Certify that shipped with Netscape 4.51, taking 32 and 29 hours on a single Ryzen 9 5950X. Steve Weis factored a third VeriSign test key in about an hour on a GPU cluster."
lang: en
story: researcher-factors-1999-netscape-root-keys-on
publishedAt: 2026-09-08T11:32:44.205Z
sourceUrl: "https://mcpherrin.ca/2026/09/07/rsa.html"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [rsa, factoring, tls, history]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Matthew McPherrin factored two 512-bit RSA keys belonging to E-Certify, a Canadian certificate authority that shipped in Netscape 4.51 in March 1999. The roots , E-Certify RSA 512 Gold Server for SSL and E-Certify RSA 512 Gold Client for S/MIME , were removed by Netscape in 2002 and expired on October 16, 2003. Using CADO-NFS on a single Ryzen 9 5950X desktop, the server key took 32 hours and the client key took 29 hours. A third key, a 512-bit test code-signing CA from VeriSign that shipped with Internet Explorer 3.02, was factored by Steve Weis in roughly one hour on a GPU cluster. All three private keys and the associated tooling are published at https://github.com/mcpherrinm/ancientroots.

The work demonstrates how far the cost of factoring 512-bit RSA has fallen. When these roots were issued, the RSA-155 challenge (also 512 bits) required months of distributed computing and was not solved until August 1999. Today a mid‑range desktop cracks an equivalent key in a day and a half. The current Web PKI baseline mandates 2048-bit RSA or stronger, a margin that reflects this trajectory. McPherrin also hosts a test TLS server at e-certify.fly.dev that presents the reconstructed certificates. It only negotiates with Netscape 4.51 because the cipher suites and protocol versions required by that browser have long since been dropped by modern TLS stacks.

## What is not known

The exact CADO-NFS parameters , polynomial selection, thread count, sieve settings , have not been published. The author has not verified the accuracy of the Claude-generated project webpage. The repository may contain additional 512-bit test roots beyond the three documented. No other browsers are known to have shipped 512-bit roots for SSL, but a systematic survey has not been done. The custom Go TLS server built for Netscape 4.51 compatibility has not been described in detail. Practical impact today is effectively zero; the author notes that zero people use Netscape 4.51.
