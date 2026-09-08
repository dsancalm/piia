---
title: "Factorizadas dos raíces RSA de 512 bits de Netscape 4.51 en un PC doméstico"
summary: "Matthew McPherrin ha recuperado las claves privadas de dos certificados raíz que Netscape distribuyó en 1999; el cálculo tardó 32 y 29 horas en un Ryzen 9 5950X. Steve Weis rompió una tercera clave de VeriSign incluida en IE 3.02 en una hora con GPUs."
lang: es
story: researcher-factors-1999-netscape-root-keys-on
publishedAt: 2026-09-08T11:32:44.204Z
sourceUrl: "https://mcpherrin.ca/2026/09/07/rsa.html"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [rsa, factorizacion, netscape, criptografia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Matthew McPherrin ha factorizado dos claves RSA de 512 bits pertenecientes a la autoridad de certificación canadiense E-Certify. Netscape las distribuyó con la versión 4.51 en marzo de 1999. Las claves corresponden a los certificados raíz "E-Certify RSA 512 Gold Server (SSL)" y "E-Certify RSA 512 Gold Client (S/MIME)". El cálculo se realizó con CADO-NFS en un Ryzen 9 5950X de escritorio: 32 horas para la clave de servidor y 29 para la de cliente. Steve Weis factorizó además una tercera clave de 512 bits, la "Test VeriSign Commercial Software Publisher CA" que venía en Internet Explorer 3.02, en aproximadamente una hora usando un clúster de GPU.

Ambas raíces de E-Certify fueron eliminadas por Netscape en 2002 y expiraron el 16 de octubre de 2003. Internet Explorer nunca incluyó raíces de 512 bits para SSL. McPherrin ha publicado las claves privadas reconstruidas y las herramientas en https://github.com/mcpherrinm/ancientroots, y mantiene un servidor TLS de prueba en e-certify.fly.dev que solo funciona con Netscape 4.51. SSL Labs califica el sitio con buena nota dentro de sus limitaciones históricas.

El experimento confirma que el tamaño de clave considerado seguro en los noventa cae en horas con hardware actual. El estándar mínimo del PKI web actual exige 2048 bits para RSA. RSA-155 (512 bits) se factorizó por primera vez en 1999; hace días se anunció la factorización de RSA-260 (862 bits).

## Qué no se sabe

- Parámetros exactos de CADO-NFS usados (hilos, selección de polinomio, etc.).
- Cuántas más raíces de prueba de 512 bits hay en el repositorio ancientroots más allá de las tres mostradas.
- Si otros navegadores aparte de Netscape 4.51 e IE 3.02 distribuyeron raíces de 512 bits.
- Detalles del servidor TLS personalizado en Go construido para compatibilidad con Netscape 4.51.
- Exactitud completa de la página web ancient-roots generada con Claude (el autor no la ha verificado).
