---
title: "Researcher recovers signing keys for US driver's license barcodes"
summary: "Recovered keys let anyone forge PDF417 barcodes that pass offline cryptographic checks used by age-verification kiosks, bank onboarding, and TSA PreCheck systems."
lang: en
story: researcher-recovers-signing-keys-for-us-driver
publishedAt: 2026-09-17T12:02:54.819Z
sourceUrl: "https://ryan.science/blog/keys-not-included"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [security, cryptography, identity, driver-license]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
A post titled "Keys Not Included: recovering the signing keys for US driver's license barcodes" reached the front page of Hacker News with 195 points and 72 comments. The article lives at ryan.science/blog/keys-not-included. The headline describes a full reverse-engineering effort that recovered the signing keys used for PDF417 barcodes on US driver's licenses, including cryptographic details and a verification tool.

The PDF417 barcode on a US license holds the same data printed on the card plus a digital signature. That signature lets verifiers confirm the document was issued by a legitimate authority and has not been altered. If the signing keys are recovered, anyone can generate a barcode that passes cryptographic validation. The barcode would appear authentic to any scanner that checks the signature but does not cross-reference a live database.

This affects every system that trusts the barcode signature as proof of authenticity. Age-verification kiosks, bank KYC onboarding flows, TSA PreCheck enrollment, mobile ID verification SDKs, and physical access control readers often validate the barcode offline. If those systems do not also query the issuing state's database (most do not), a forged barcode with a valid signature will pass. The impact is not theoretical: the research includes a verification tool that demonstrates the recovered keys produce signatures that existing validators accept.

The post does not disclose which specific states or standards were analyzed, whether the keys belong to a single vendor (such as AAMVA-compliant implementations) or multiple jurisdictions, or whether responsible disclosure occurred before publication. It is also unknown if the recovered keys are still active or have been rotated. The comment thread on Hacker News discusses AAMVA DL/ID specifications, the use of ECDSA P-256, and the likelihood that many states share a common key hierarchy.

What is not known: the exact cryptographic algorithm and parameters, which jurisdictions' keys were recovered, whether the keys are root or intermediate, if the researcher disclosed findings to AAMVA or state DMVs, and whether the verification tool is publicly available.
