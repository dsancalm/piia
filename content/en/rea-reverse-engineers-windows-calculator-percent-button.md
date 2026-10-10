---
title: "REA reverse-engineers Windows Calculator percent button and Chrome dino speed"
summary: "Open-source tool REA inspects native binaries, JS apps, and runtime traces to explain program behavior. It recovered the exact assembly logic behind Calculator's percentage operator and extracted acceleration constants from the Chrome dinosaur game."
lang: en
story: rea-reverse-engineers-windows-calculator-percent-button
publishedAt: 2026-10-10T12:49:58.801Z
sourceUrl: "https://rea.tools/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [reverse-engineering, tooling, windows, javascript]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
REA is an open-source tool that lets a coding agent inspect a program and explain how it works through reverse engineering. You install it with `npx rea-agents@latest setup`, which prints a plan for approval and then requires an agent restart. REA supports three analysis modes: native binaries (executables and libraries), JavaScript and Electron apps (modules, paths, IPC, ASAR archives), and browser or runtime activity via capture and diff of executions.

The Windows Calculator demo (version 11.2508.4.0, x64) shows why the `%` button behaves the way it does. Enter `200 + 10%` and you get 220. REA pulled x64 assembly from the Calculator DLL where operator IDs `0x5c` (Multiply, IDC_MUL 92) and `0x5b` (Divide, IDC_DIV 91) jump to the same routine, while constant `0x64` (100 decimal) is used for division. The recovered logic reads:

```asm
0x180124945: MOV EAX, dword ptr [R13 + 0x18]
0x180124949: CMP EAX, 0x5c
0x18012494c: JZ 0x180124aba
0x180124952: CMP EAX, 0x5b
0x180124955: JZ 0x180124aba
0x18012495b: MOV EDX, 0x64
0x180124960: LEA RCX, [RSP + 0x160]
0x180124968: CALL 0x180122650
0x18012496e: LEA RDX, [R13 + 0x160]
0x180124975: LEA RCX, [RSP + 0x78]
0x18012497a: CALL 0x180109720
0x18012497f: MOV RSI, RAX
0x180124982: MOV qword ptr [RSP + 0x28], RAX
0x180124987: LEA RDX, [RSP + 0x160]
0x18012498f: MOV RCX, RAX
0x180124992: CALL 0x180123190
... value-copy instructions omitted ...
0x180124a14: MOV RDX, RDI
0x180124a17: LEA RCX, [RSP + 0xf8]
0x180124a1f: CALL 0x180109720
0x180124a24: LEA R8, [RSP + 0x30]
0x180124a29: MOV RDX, RAX
0x180124a2c: LEA RCX, [RSP + 0xb8]
0x180124a34: CALL 0x180123c10
```

In high-level terms: if the operation is multiply or divide, `percent = current / 100`; otherwise (add or subtract), `percent = current * previous / 100`. With `previous = 200`, the percentage becomes `200 * 10 / 100 = 20`, yielding 220.

For the Chrome dinosaur game (wayou's Chromium-derived edition), REA attached via local debug connection to `index.js` and extracted the acceleration constants:

```js
ACCELERATION: 0.001
MAX_SPEED: 13
SPEED: 6
```

The rule is `if (this.currentSpeed < this.config.MAX_SPEED) { this.currentSpeed += this.config.ACCELERATION; }`. After 4,000 updates speed reaches 10.0; after 10,000 updates it hits 13.0 (rounded to one decimal).

The project site includes a guided start with a Notes app example, FAQ, Discord, and GitHub for issues.

## What we don't know
- Supported coding agents and IDEs (VS Code, Cursor, Zed, etc.)
- License and pricing model
- Technical details of how REA attaches to the target process (debug API, instrumentation, hooks)
- Output formats returned to the agent (JSON, text, AST, disassembly)
- Support for architectures beyond x64 (ARM, ARM64, x86)
- Handling of obfuscated, packed, or anti-debugged code
- Whether any code leaves the machine
- Limitations with signed, protected, or Windows Store binaries (Calculator is UWP)
- How to supply symbols or PDBs for better analysis
- Whether REA can hot-patch binaries or is read-only
