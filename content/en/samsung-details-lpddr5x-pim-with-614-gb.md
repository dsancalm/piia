---
title: "Samsung details LPDDR5X-PIM with 614 GB/s internal bandwidth"
summary: "Samsung presented an LPDDR5X-9600 die at Hot Chips 2026 that adds a MAC array to each of 16 banks, delivering 614 GB/s internal bandwidth against a 76.8 GB/s external bus."
lang: en
story: samsung-details-lpddr5x-pim-with-614-gb
publishedAt: 2026-08-30T12:20:05.805Z
sourceUrl: "https://chipsandcheese.com/p/hot-chips-2026-samsungs-processing"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [samsung, lpddr5x, pim, hotchips]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Samsung showed LPDDR5X-PIM at Hot Chips 2026. The device is a standard LPDDR5X-9600 die with a MAC array bolted onto each of its 16 banks. The array talks to its local bank through the internal DRAM bus, so the aggregate internal bandwidth seen by compute is 614 GB/s. The external bus, limited to two banks in parallel, delivers 76.8 GB/s. That gap is the whole point: keep weights inside DRAM, stream activations in, and never push the partial sums back over the narrow channel.

Each PIM block owns three register files. An instruction register file holds 1024 bits, enough for 64 instructions at 16 bits each. A source register file holds 4 kbits of activation vectors. A scale register file holds 2 kbits of scaling factors. Weights stay in the DRAM array and feed the MAC array as the second operand. The MAC tree executes four INT8 or FP8 multiply-accumulates per data clock (eight per cycle before double-data-rate) per bank. With 4-bit weights the throughput doubles. One package hits 2.4 TOPS INT8; eight packages (128 GB total) reach 9.6 TOPS, roughly the NPU in Intel Meteor Lake.

The interface stays inside the LPDDR5X protocol. Reserved address rows act as MMIO to flip between single-bank mode (normal DRAM) and multi-bank mode (broadcast command to all 16 banks). Per-bank rows enable "PIM Registers Activated" so that subsequent column accesses hit the PIM register files instead of the DRAM array. A typical ML sequence: load weights in single-bank mode; switch to multi-bank plus PIM Registers Activated; broadcast activations, scales, and instructions to all 16 banks with 16 write commands per source register (256 commands if done bank-by-bank); return to multi-bank and issue reads to launch compute, accumulating results in the vector register file; write VRF results back to DRAM banks; return to single-bank for normal access.

Address Align Mode (AAM) solves the memory controller's address remapping. Each instruction infers its source register index from the column address it sees, so the controller can interleave normally without breaking PIM register targeting.

PIM breaks standard DRAM semantics. Normal accesses and PIM accesses cannot coexist, not even across threads, because neither the controller nor the chip tracks thread identity. The practical fix is to reserve entire channels for PIM, sacrificing interleaving and hurting bandwidth for both PIM and non-PIM code. Multitasking requires locks that serialize all threads and interrupts during PIM sections. A context switch means taking the channel out of PIM mode and saving the full state of every register file in every bank.

PIM also breaks cache hierarchy expectations. DRAM produces values the cache never saw, and caches can absorb the reads that were meant to trigger PIM operations. Samsung recommends...

---

### What is not known

- Power and area overhead of the per-bank PIM block.
- Latency of mode switches (single-bank multi-bank, PIM Registers Activated entry/exit).
- Exact AAM encoding from column address to source register index.
- Full 16-bit instruction format and supported operations.
- Native FP16, BF16, or INT4 support beyond INT8/FP8/4-bit.
- Mechanism for saving/restoring PIM state on context switch (DMA? shadow registers?).
- Samsung's complete cache recommendation (source text truncated).
- Support in commercial memory controllers, JEDEC specs, Linux kernel, or firmware.
- Commercial availability, pricing, and product roadmap.
- Detailed comparison with HBM-PIM, GDDR6-PIM, CXL.mem, UPMEM, or AxDIMM.
