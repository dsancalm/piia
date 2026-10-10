---
title: "Cloudflare compra Deno y detendrá su desarrollo en un año"
summary: "El equipo del runtime se integra en Cloudflare para impulsar el autoalojamiento de workerd con celld. Deno recibirá solo correcciones y parches de seguridad durante doce meses antes de cesar su desarrollo oficial, aunque el código seguirá abierto."
lang: es
story: cloudflare-acquires-deno-and-will-end-its
publishedAt: 2026-10-10T12:53:30.052Z
sourceUrl: "https://simonwillison.net/2026/Oct/9/deno-is-joining-cloudflare/"
sourceName: "Simon Willison"
priority: urgent
tags: [cloudflare, deno, workerd, runtime]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloudflare ha anunciado la compra de Deno. El acuerdo, publicado el 9 de octubre de 2026, establece que el equipo del runtime se une a Cloudflare para trabajar en el *workerd self-hosting*, usando *celld* como base técnica. *celld* es una implementación open source del patrón Durable Objects que el equipo de Deno lanzó en agosto de 2026. El objetivo es convertir el autoalojamiento de *workerd* en una vía soportada de primera clase para construir y ejecutar aplicaciones con el modelo de programación de Workers.

El mantenimiento del runtime de Deno continuará un año más con releases mensuales de correcciones y actualizaciones de seguridad. Tras ese periodo, Cloudflare detendrá su desarrollo. Deno seguirá siendo open source y se invita a la comunidad a proseguir con el proyecto. Ryan Dahl, creador de Deno y Node.js, confirmó en Hacker News que la decisión es conjunta y que está de acuerdo: ya no considera que Deno sea el lugar donde pueda realizar el trabajo más importante.

Dahl argumenta que Deno ha quedado atrapado en lo que llama el "pozo de gravedad de la compatibilidad con Node". La presión para comportarse exactamente como Node ha obligado a reimplementar sus APIs, algo que ya no ve con sentido porque Node funciona y las ventajas marginales de rendimiento, experiencia de usuario o seguridad no compensan el esfuerzo. Su característica favorita de Deno sigue siendo el sistema de permisos, que permite allow-listing granular de archivos, directorios y hosts de red específicos. Node.js introdujo un modelo de permisos similar en la versión 20.0.0 (abril de 2023) y lo declaró estable en la 22.13.0 (enero de 2025), aunque todavía no soporta allow-listing de hosts de red concretos: la red se activa o desactiva globalmente.

Sobre *celld*, Dahl señala que ha funcionado notablemente bien dependiendo únicamente de object storage para coordinación y persistencia, y lo define como un modelo totalmente nuevo para desarrollo de servidores, no solo una API distinta.

## Qué no se sabe

No hay detalles financieros de la adquisición. Tampoco se conoce la composición exacta del equipo que se incorpora a Cloudflare ni el roadmap concreto de *workerd self-hosting* basado en *celld*. No hay fecha precisa para el fin de soporte dentro del año anunciado, ni definición de qué implica "first-class supported way" en términos de SLA, documentación o tooling. Queda en el aire el futuro del registro de paquetes (JSR, deno.land/x) y el impacto en proyectos que dependen de Deno hoy, como Fresh o Deno Deploy. Tampoco se sabe si surgirá un fork comunitario activo tras el cese del soporte oficial.
