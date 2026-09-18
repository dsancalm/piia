---
title: "Atacan a mantenedores de Rust con ingeniería social y comprometen un crate"
summary: "Adam Harvey y el equipo de crates.io confirman una campaña que engaña a desarrolladores en videollamadas para instalar malware o ejecutar comandos. El mes pasado lograron publicar una versión maliciosa de `array ref`."
lang: es
story: rust-crate-maintainers-targeted-in-video-call
publishedAt: 2026-09-18T11:49:26.123Z
sourceUrl: "https://simonwillison.net/2026/Sep/17/targeted-attacks-on-rustaceans/"
sourceName: "Simon Willison"
priority: routine
tags: [rust, seguridad, cadena-suministro, ingenieria-social]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Adam Harvey y el equipo de seguridad de crates.io han confirmado una campaña activa contra miembros de rust-lang y mantenedores de crates populares. El vector no explota una vulnerabilidad técnica en el registro, sino la confianza: los atacantes contactan a la víctima mediante videollamadas con pretextos positivos , ofertas de trabajo, propuestas de colaboración o contratos, y logran que instale software, como un supuesto codec de audio, o que ejecute un comando que han colocado en el portapapeles. El mes pasado esta técnica consiguió comprometer el crate `array ref` y publicar una versión maliciosa, demostrando que la cadena de suministro de Rust es vulnerable a ingeniería social dirigida.

Casi todo el software moderno depende de código abierto y cada persona con permisos de publicación en crates.io es un vector potencial. La defensa principal que recomienda el equipo de seguridad es aplicar "dependency cooldowns": esperar varios días antes de actualizar a nuevas versiones de paquetes para dar tiempo a que la comunidad detecte posibles ataques. La medida no impide la publicación, pero reduce la ventana de exposición para los consumidores.

## Medidas de protección para mantenedores

Quienes publican crates deben reforzar su cuenta y su flujo de trabajo:

- Activar autenticación de dos factores (2FA) en crates.io y en el proveedor de Git asociado.
- Usar "trusted publishing" (OIDC) desde CI/CD para evitar manejar tokens de larga duración en la máquina local.
- Separar credenciales: una clave para publicar en crates.io, otra distinta para firmar commits o acceder a la infraestructura de CI.
- No instalar nada ni ejecutar comandos que lleguen por videollamadas, correos o chats inesperados, por legítimos que parezcan.
- Revisar el historial de publicaciones propias y de los crates de los que se depende ante cualquier anomalía.

## Lo que no se sabe

- Cuántos crates o mantenedores han sido comprometidos en total.
- Qué crates exactos, además de `array ref`, fueron afectados el mes pasado.
- La identidad o atribución de los atacantes.
- Detalles técnicos del malware publicado o del supuesto codec de audio.
- Qué medidas concretas está tomando crates.io más allá de la recomendación de cooldowns.
- Si hay indicadores de compromiso (IOCs) publicados para que los mantenedores revisen sus sistemas.
