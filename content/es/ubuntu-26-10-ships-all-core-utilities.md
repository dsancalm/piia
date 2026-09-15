---
title: "Ubuntu 26.10 sustituye los coreutils GNU por la versión en Rust"
summary: "Canonical completa la migración a uutils en la versión interina: cp, mv y rm se unen a ls, cat, chmod y du tras corregir fallos TOCTOU detectados en una auditoría. La beta llega en septiembre de 2026 y la estable el 15 de octubre."
lang: es
story: ubuntu-26-10-ships-all-core-utilities
publishedAt: 2026-09-15T12:13:53.900Z
sourceUrl: "https://www.omgubuntu.co.uk/2026/09/ubuntu-2610-rust-coreutils-complete"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [ubuntu, rust, coreutils, seguridad]
generatedBy: dots-studio/dots-3-note-preview:free
---
Ubuntu 26.10 "Stonking Stingray" termina de sustituir las utilidades básicas del sistema por sus equivalentes escritos en Rust. El cambio afecta a comandos que se ejecutan en cada script de construcción, cada contenedor y cada pipeline de CI: `ls`, `cat`, `chmod`, `du` y, por fin, `cp`, `mv` y `rm`. Estos tres se quedaron en la versión GNU durante Ubuntu 26.04 LTS porque una auditoría encargada por Canonical detectó condiciones de carrera TOCTOU (time-of-check to time-of-use) en la implementación de uutils. Esos fallos se han corregido *upstream* y la versión 26.10 ya no incluye código C en ninguno de los comandos del paquete `coreutils`.

La iniciativa de "oxidar" la distribución empezó en 2025. Ubuntu 25.10 fue la primera en incluir utilidades Rust y en hacer `sudo-rs` el `sudo` predeterminado. Canonical financia el trabajo con 40.000 € anuales a la Trifecta Tech Foundation, que mantiene uutils y está reescribiendo también el cliente NTP; el plan es que ese cliente en Rust sea el predeterminado en Ubuntu 27.10. El objetivo de uutils es compatibilidad *drop-in* con GNU coreutils: cualquier desviación se trata como un bug.

Para quien construye imágenes de contenedor, el impacto es directo. La superficie de ataque de memoria en la capa base desaparece para este conjunto de herramientas: no hay *use-after-free*, no hay desbordes de búfer en `cp`, `mv`, `rm`, `ls` o `cat`. Los scripts existentes no cambian; la interfaz de línea de órdenes es idéntica. La beta de 26.10 llegará a finales de septiembre de 2026 y la versión estable el 15 de octubre de 2026.

## Qué no se sabe

- Qué CVE o identificadores concretos corresponden a los problemas TOCTOU resueltos.
- Detalles completos de la auditoría de seguridad de uutils encargada por Canonical.
- Lista exhaustiva de utilidades migradas en 26.10 frente a las ya presentes en 25.10.
- Datos comparativos de rendimiento (velocidad, memoria) entre uutils y GNU coreutils en cargas reales.
- Día exacto de la beta de septiembre de 2026.
- Si habrá *backport* de estas utilidades a Ubuntu 26.04 LTS o 24.04 LTS.
- Nombre, estado y licencia del nuevo cliente NTP en Rust que prepara la Trifecta Tech Foundation.
