---
title: "vphone-cli runs full iOS userspace on Apple Silicon Macs"
summary: "The open-source tool wraps Apple's Virtualization.framework and Private Cloud Compute infrastructure to boot iOS inside a standard macOS VM. It requires macOS 15 Sequoia, Xcode, and the iOS SDK, plus relaxed integrity protections via SIP disable or debug mode."
lang: en
story: vphone-cli-runs-full-ios-userspace-on
publishedAt: 2026-08-29T12:55:55.261Z
sourceUrl: "https://github.com/Lakr233/vphone-cli"
sourceName: "Hacker News (portada)"
priority: routine
tags: [virtualization, ios, apple-silicon, security-research]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Apple has released the virtualization primitives required to run a full iOS userspace on Apple Silicon, and `vphone-cli` assembles them into a usable virtual iPhone. The tool wraps Apple's `Virtualization.framework` together with the Private Cloud Compute research VM infrastructure to boot iOS inside a standard macOS VM. You need a Mac with an Apple Silicon chip running macOS 15 Sequoia or later, Xcode, and the iOS SDK to cross-compile the guest daemon (`vphoned`).

Because the guest requires private entitlements (PV=3) and unsigned binaries, you must relax system integrity protections. Two supported paths exist: disable SIP entirely and add the boot argument `amfi_get_out_of_my_way=1`, or enable SIP debug-only mode and run the `amfidont` utility. The project documents tested environment matrices covering specific Mac models, iOS versions, and CloudOS builds.

Five firmware variants ship with increasing levels of patching. The `less` variant applies four patches in two phases. `regular` applies 42 patches in ten phases. `dev` adds debugger support with 53 patches in twelve phases. The `jb` variant delivers a full jailbreak , 113 patches across fourteen phases , and auto-installs Sileo and TrollStore on first boot. The `exp` variant pushes further to 141 patches in eighteen phases, adding anti-VM detection patches for security research.

VM lifecycle commands mirror container tooling: `create`, `list`, `info`, `new`, `config`, `clone`, `export`, `import`, `rename`, `delete`. A manual build flow lets you step through `vm new`, `fw prepare`, `fw patch`, `vm launch --dfu`, `restore`, `cfw install`, and a final `vm launch`. You can target newer IPSW files via `fw prepare --iphone-source` and `--cloudos-source`. Resource allocation is explicit; `vm config myphone --cpu 8 --memory 8192` sets eight vCPUs and 8 GB of RAM.

Network access defaults to SSH on port 22222. The `jb` variant logs in as `mobile` with the default password `alpine`; `regular` and `dev` expose `root`. VNC is available at `vnc://<vm-ip>:5901`. All persistent data lives under `~/.vphone` or `$VPHONE_ROOT`.

Each VM exposes a control socket at `<bundle>/vphone.sock` for programmatic interaction: screenshots, touch injection, swipes, keystrokes, and clipboard access. A separate `vphone-mcp` package wraps this socket as an MCP server for AI-driven end-to-end testing.

Installation pulls a Homebrew bundle of dependencies including `python@3.13`, `aria2`, `wget`, `gnu-tar`, `openssl@3`, `ldid-procursus`, `sshpass`, `keystone`, `cmake`, `libusb`, `ipsw`, and `zstd`. The build process cross-compiles the toolchain submodules and signs the resulting `.app` bundle.

```
brew install python@3.13 aria2 wget gnu-tar openssl@3 ldid-procursus sshpass keystone cmake libusb ipsw zstd
brew install zqxwce/tap/vphone-cli
```

Or build from source:

```
git clone --recurse-submodules https://github.com/Lakr233/vphone-cli.git
./scripts/setup_tools.sh
./scripts/build.sh
cd .build/vphone-cli.app/Contents/MacOS/
vphone-cli --help
```

Create and launch a jailbroken VM:

```
vphone-cli vm create myphone -V jb
vphone-cli vm launch myphone
```

### What is not known

Real-world performance metrics , boot time, UI latency, memory pressure , across different Mac models are undocumented. Compatibility with features requiring the Secure Enclave (Face ID, Touch ID, Apple Pay) or DRM systems (Widevine, FairPlay) is untested. The exact minimum macOS 15 point release is not specified. Support for iOS 18.x and 19.x beyond the listed test matrix is unclear. The control socket protocol lacks public API documentation or a message schema. The project license and commercial-use permissions are not stated. Long-term VM backup and update strategies are undefined. Undocumented telemetry or network connections have not been audited.
