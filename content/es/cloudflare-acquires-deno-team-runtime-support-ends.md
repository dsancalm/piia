---
title: "Cloudflare compra Deno y frena su desarrollo para volcar el trabajo en Workers"
summary: "El runtime entra en mantenimiento un año y Deno Deploy cierra en seis meses. El equipo se integra en workerd y aparece celld para apps distribuidas, sin fechas ni detalles de migración claros."
lang: es
story: cloudflare-acquires-deno-team-runtime-support-ends
publishedAt: 2026-10-10T12:51:55.998Z
sourceUrl: "https://deno.com/blog/cloudflare"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [cloudflare, deno, workers, runtime]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloudflare ha comprado Deno. El anuncio, fechado el 9 de octubre de 2026, confirma que el equipo completo pasa a formar parte de la compañía. El movimiento no busca mantener dos runtimes paralelos: el objetivo declarado es volcar el trabajo en `workerd`, el motor que impulsa Cloudflare Workers, y en la plataforma compartida con Durable Objects. Deno como runtime independiente entra en modo mantenimiento.

Tienes un año de soporte garantizado. Durante doce meses saldrán releases mensuales solo con correcciones y parches de seguridad; no habrá nuevas características. Pasado ese plazo, el desarrollo se detiene. Si tienes cargas de producción en Deno, la ventana para migrar a Node, Bun, Workers u otra alternativa es esa. Deno Deploy tiene menos margen: seguirá operativo seis meses y luego se apagará. Cloudflare ofrece ayuda de migración a Workers para clientes de pago, pero no se conocen los detalles de las herramientas, los SLA ni los posibles costes.

JSR sigue vivo. El registro de paquetes continuará funcionando y su infraestructura pasará a Cloudflare. No hay información sobre cómo afectará la migración a los paquetes y versiones ya publicados. `rusty_v8`, el binding de V8 en Rust que usa Deno, se mantendrá y el equipo trabajará en integrarlo en `workerd`. Tampoco hay cronograma público para esa integración.

Aparece `celld`, un proyecto nuevo construido sobre el modelo de programación de Workers que permite crear aplicaciones distribuidas con escalado integrado en el propio modelo. No se sabe si está en alpha, beta o GA, ni cuándo estará disponible. Ryan Dahl ha dejado su correo (ry@cloudflare.com) para quienes construyan agentes a escala y quieran ejecutarlos en su propia infraestructura, lo que apunta a la intención de ofrecer `workerd` como opción de self-hosting real.

Lo que no se sabe:
- Fecha exacta de inicio del período de un año de soporte para Deno runtime (¿desde el anuncio o desde la última release?).
- Fecha concreta de cierre de Deno Deploy.
- Detalles del plan de migración para clientes de Deno Deploy (herramientas, SLA, costes).
- Qué pasará con la gobernanza y marca de Deno tras el fin del desarrollo oficial.
- Roadmap y fecha de disponibilidad de `celld` (¿está en alpha, beta, GA?).
- Cómo afecta esto a los paquetes y versiones ya publicadas en JSR durante la migración de infraestructura.
- Cronograma de integración de `rusty_v8` en `workerd`.
- Si habrá soporte comercial (SLA, enterprise) para Deno runtime durante el año de mantenimiento.
