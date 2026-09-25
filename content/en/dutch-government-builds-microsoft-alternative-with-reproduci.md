---
title: "Dutch government builds Microsoft alternative with reproducible NixOS workstations"
summary: "DAWO assembles a sovereign workplace from inspectable blocks: a NixOS flake yields bit-identical machines, age-encrypted secrets decrypt at boot, and a single flake output drives fleet rollout via binary cache."
lang: en
story: dutch-government-builds-microsoft-alternative-with-reproduci
publishedAt: 2026-09-25T12:03:24.958Z
sourceUrl: "https://www.dawo.community/en/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [nixos, sovereignty, reproducibility, flakes]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
The Dutch government is building a Microsoft alternative called DAWO, an open community assembling a digitally autonomous workplace from replaceable, inspectable building blocks. The operating-system layer is DAWO-NixOS, a NixOS configuration that delivers a reproducible workstation image. Other blocks cover verifiable open AI, autonomous cloud infrastructure, and open collaboration tooling. All governance artifacts , calendar, blog, forum, member portal , are public; forum posting requires an account. Participation happens through conversations, code contributions, documentation, pilots, and events.

Why this matters for infrastructure engineers
The project treats the workstation as code. A NixOS flake defines every package, service, kernel parameter, and user setting, so the same flake produces bit-identical machines on a laptop, a CI runner, or a VM in a sovereign cloud. Rolling back a broken update is a single `nixos-rebuild switch --rollback`. Auditing the exact dependency graph of a deployed image is `nix path-info -r /run/current-system`. That reproducibility is the technical foundation for the political goal: no hidden telemetry, no forced upgrades, no vendor lock-in.

Secrets and fleet management
DAWO-NixOS does not bake secrets into the store. The pattern shown in the repository uses `agenix` or `sops-nix` to decrypt age-encrypted secrets at activation time, with keys held on hardware tokens or in a threshold-managed vault. For fleet-wide rollout, the flake outputs a `nixosConfigurations` attrset keyed by hostname or role; a small wrapper around `nix build` and `nixos-rebuild` , or a tool like `colmena` , pushes the same closure to hundreds of machines. Because the closure is self-contained, the target only needs network access to the binary cache, not to the internet at large.

Replicable pattern for your own infrastructure
```nix
{
  description = "DAWO-NixOS workstation flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    agenix.url = "github:ryantm/agenix";
    sops-nix.url = "github:Mic92/sops-nix";
  };

  outputs = { self, nixpkgs, agenix, sops-nix, ... }:
    let
      mkHost = name: nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ({ config, pkgs, ... }: {
            imports = [ ./modules/workstation.nix ./modules/secrets.nix ];
            networking.hostName = name;
            # hardware-specific overrides live in ./hosts/${name}.nix
          })
          ./hosts/${name}.nix
        ];
      };
    in {
      nixosConfigurations = {
        laptop-alice = mkHost "laptop-alice";
        vm-ci-runner = mkHost "vm-ci-runner";
      };
    };
}
```
The flake pins `nixpkgs` to a specific commit, so every builder sees identical sources. `workstation.nix` declares the desktop environment, browser, office suite, and VPN client. `secrets.nix` pulls in `agenix` rules that decrypt `/etc/secrets/vpn.secrets.age` into `/run/secrets/vpn` at boot. Host-specific files under `./hosts/` override disk layout, firmware blobs, or display scaling without forking the base profile.

What is not known
- Project start date and planned timeline
- Number of ministries or agencies already running DAWO-NixOS in production
- Target replacement percentage for Microsoft Office and Windows
- Budget allocation and funding sources
- Exact licenses for each component (GPL, MIT, EUPL, etc.)
- Supply-chain and security-update process for the NixOS binary cache
- Which collaboration stack (Nextcloud, Matrix, LibreOffice Online, etc.) has been selected
- Pilot results or usability evaluations with civil servants
- Governance model: roadmap ownership and conflict resolution
- Data-migration and end-user training plan
