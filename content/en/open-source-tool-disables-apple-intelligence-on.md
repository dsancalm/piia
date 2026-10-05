---
title: "Open-source tool disables Apple Intelligence on macOS 27 and frees 10-15 GB"
summary: "RemoveMacAI uses a configuration profile to block Apple Intelligence features and purge model files without disabling SIP or modifying /System. It rewrites download URLs to a closed local port to prevent re-fetch, and removing the profile restores the original state."
lang: en
story: open-source-tool-disables-apple-intelligence-on
publishedAt: 2026-10-05T15:13:40.029Z
sourceUrl: "https://github.com/omlahore/RemoveMacAI"
sourceName: "Hacker News (portada)"
priority: routine
tags: [macos, privacy, storage, opensource]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
RemoveMacAI is an open-source utility that disables Apple Intelligence on macOS 27 and deletes the downloaded model payloads, returning roughly 10 to 15 GB of disk space. The project exists because macOS 27 removed the single toggle that previously turned off the entire feature suite. Disabling individual features in System Settings leaves the multi-gigabyte models on the volume.

RemoveMacAI applies a configuration profile that uses Apple restriction keys to disable the features and then invokes the operating system's asset service to purge the model files. System Integrity Protection stays enabled and nothing under `/System` is modified.

The profile also rewrites the download URL for each removed model to a closed local port, preventing automatic re-fetch. Removing the profile restores the previous state; macOS will download models again the moment a feature requests them. The tool makes no network requests of its own and collects no data. Dictation continues to work because its voice models are managed separately and are not touched.

Features that stop working include Siri (including "Hey Siri" and the menu-bar icon), Writing Tools, Genmoji, Image Playground, the ChatGPT extension, summaries across Mail, Messages, Safari, Notes, and notifications, Mail smart replies, inline text predictions, Spatial Photos, Photos Clean Up, and predictive code completion in Xcode. Apps that depend on the Foundation Models framework, the "Use Model" Shortcuts action, Visual Intelligence, and natural-language Calendar editing also cease to function. The `Siri` process that remains visible in Activity Monitor belongs to the Spotlight window; several other system services stay loaded and are protected by SIP.

Requirements are Apple Silicon and macOS 27. Version 27.0 is tested; 27.0.1 requires RemoveMacAI 0.2.3 or later. macOS 26 and earlier are not supported. The one-line installer downloads the latest release, verifies its SHA-256 checksum, and runs it from a temporary directory without installing anything permanent:

```bash
curl -fsSL https://raw.githubusercontent.com/omlahore/RemoveMacAI/main/install.sh | bash
```

Each release is built from its tag via GitHub Actions and carries a build provenance attestation. You can verify the binary with:

```bash
gh attestation verify removemacai-darwin-arm64.tar.gz -R omlahore/RemoveMacAI
```

A Homebrew tap is also available:

```bash
brew install omlahore/tap/removemacai removemacai
```

After installation, `removemacai status` reports which features are active and the size of each model payload (some appear as "unknown" when the asset service cannot report a size). `removemacai off --dry-run` shows what would change without applying it. `removemacai off --keep <features>` disables everything except the listed features. macOS updates do not revert the profile or the download block. System Settings > General > Storage may still list Apple Intelligence after deletion because the OS reclaims the freed space on its own schedule.

RemoveMacAI is built on `pared`, a lower-level tool from 4evy that first mapped the asset service, model sets, and settings keys; its license is included in `THIRD-PARTY-NOTICES.md`. The project itself is MIT-licensed.

## What is not known

- Exact disk savings on a specific machine; `status` shows per-model sizes but the article provides no aggregate figure.
- How long macOS takes to physically delete files after the asset service marks them gone.
- The exhaustive list of restriction keys used by the configuration profile.
- Whether the profile applies per-user or system-wide on multi-user Macs.
- Whether any local telemetry or logs remain after running the tool (the tool itself makes no network calls).
- Compatibility with macOS 28 or later.
