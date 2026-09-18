---
title: "HacktronAI encadena fallos en Discourse y OpenAI y toma cuentas de empleados en 72"
summary: "Un desbordamiento en libheif expuesto por la conversión de imágenes HEIC en Discourse Cloud permitió ejecución remota de código. La mala configuración del inicio de sesión único en auth.openai.com convirtió ese acceso en toma de cuentas de ChatGPT y Codex, y los atacantes..."
lang: es
story: libheif-flaw-and-sso-misconfig-let-researchers
publishedAt: 2026-09-18T11:40:30.191Z
sourceUrl: "https://www.hacktron.ai/blog/hacking-openai"
sourceName: "Hacker News (portada)"
priority: flash
tags: [discourse, openai, libheif, sso]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El equipo HacktronAI encadenó un desbordamiento de búfer en el analizador libheif que usa Discourse con una mala configuración del inicio de sesión único de OpenAI para tomar cuentas de empleados y acceder a repositorios internos el 25 de julio de 2026. La cadena completa, desde el descubrimiento hasta la apertura de un *pull request* en el monorepo privado `openai/openai`, tardó menos de 72 horas.

Discourse convierte imágenes HEIC y HEIF con el comando `magick` de ImageMagick porque FastImage no soporta ese formato. Eso expone el analizador de libheif a archivos controlados por un atacante. Las imágenes oficiales de Discourse para Docker se basan en Debian 12 (libheif 1.19.7) y Debian 13 (libheif 1.19.8), ambas vulnerables. La corrección *upstream* no se documentó como arreglo de seguridad y no recibió CVE, así que las actualizaciones de seguridad estándar no la aplicaron.

Los investigadores usaron Claude Opus 5 para desarrollar una explotación funcional en ARM64 en tres horas y la portaron después a x86-64 con jemalloc. Lograron ejecución remota de código en Discourse Cloud a través del proxy `rce.ee/ctf-forum`. Una vez dentro del foro, la configuración SSO permitía que cualquier servicio propio o de terceros que usara `auth.openai.com` derivara en toma de cuenta de ChatGPT y Codex. Como prueba de concepto, usaron el Codex de un empleado comprometido para abrir el PR #1186742 en `openai/openai` sin acceder a código sensible.

## Endurecimiento inmediato

Si mantienes una instancia de Discourse propia, reconstruye la imagen con la versión parcheada:

```bash
cd /var/discourse
./launcher rebuild app
```

El aviso de seguridad de Discourse es GHSA-vhm9-85gw-x335, publicado el 28 de julio. Debian 13 recibió la actualización el 8 de agosto de 2026; Debian 12 la tiene en *testing*.

Revisa también la superficie de conversión de imágenes. Desactiva el soporte HEIC/HEIF si no lo necesitas o asegúrate de que el analizador se ejecute en un contenedor aislado sin acceso a la red ni a secretos.

## Configuración SSO

El fallo en OpenAI permitía escalar de un servicio comprometido a credenciales de ChatGPT y Codex. Audita cada aplicación que delegue autenticación en `auth.openai.com`: limita los *scopes* OAuth al mínimo, exige MFA en la cuenta vinculada y revoca sesiones tras cualquier incidente en un servicio federado. OpenAI pagó 6.500 dólares de recompensa el 1 de septiembre y aclaró que `community.openai.com` estaba explícitamente excluido de su programa de *bug bounty*.

## Lo que no se sabe

- Detalles técnicos exactos de la mala configuración SSO (cómo la toma del foro derivó en acceso a ChatGPT/Codex).
- Qué *commit* concreto de libheif corrigió el desbordamiento *upstream*.
- Qué empleado fue comprometido y qué conectores de GitHub tenía autorizados.
- Si se accedió a datos sensibles más allá del PR de prueba.
- Técnica de bypass de ASLR usada para la explotación fiable en x86-64.
- Lista completa de servicios conectados a Codex/ChatGPT que quedaron expuestos (GitHub, Slack, correo mencionados pero no enumerados).
- Si otras organizaciones con Discourse y SSO similar están afectadas.
