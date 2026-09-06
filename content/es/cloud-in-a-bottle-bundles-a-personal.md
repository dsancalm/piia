---
title: "Cloud in a Bottle lanza su nube personal de código abierto para autoalojar apps con"
summary: "El proyecto permite ejecutar aplicaciones contenedorizadas en un servidor propio con autenticación unificada y control de acceso entre apps, sin telemetría ni dependencia de un proveedor."
lang: es
story: cloud-in-a-bottle-bundles-a-personal
publishedAt: 2026-09-06T11:17:07.161Z
sourceUrl: "https://cloudinabottle.org/blog/launch-post"
sourceName: "Hacker News (portada)"
priority: routine
tags: [autohospedaje, contenedores, privacidad, sso]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloud in a Bottle es una plataforma de nube personal de código abierto que te permite autoalojar aplicaciones contenedorizadas con autenticación unificada y una experiencia de usuario cuidada. El proyecto nace de la frustración por el desalineamiento de incentivos del software en la nube actual: publicidad, rastreo y venta de datos. La arquitectura se apoya en una máquina Ubuntu que ejecuta un servidor web; este aloja un panel de control y enruta peticiones HTTP y HTTPS a aplicaciones que corren en contenedores rootless y endurecidos.

La propuesta incluye características de plataforma opcionales. El inicio de sesión único (SSO) funciona automáticamente en todas las aplicaciones integradas. También hay una interfaz para conceder acceso permisado a datos y capacidades entre aplicaciones, un modelo análogo a los permisos de Android o iOS. El código es abierto, autoalojable, no incluye telemetría y busca ser simple, sin "magia" oculta. Imbue, la empresa del autor, ofrece una versión gestionada con un modelo de negocio transparente, pero el camino open-source y self-hosted ejecuta el mismo código y tiene la misma prioridad.

El desarrollo y las pruebas privadas llevan más de seis meses. El autor ha migrado su vida digital a su propia instancia. Existe un catálogo de aplicaciones curado, pequeño por ahora y en crecimiento semanal, con un requisito alto de experiencia de usuario. Hay tres vías de uso: una instancia gestionada gratuita con 10 dólares de crédito, autoalojar en un VPS, o instalar en hardware propio, ya sea máquina virtual o bare metal. El código está en GitHub y la comunidad se coordina en Matrix.

## Lo que no se sabe

- Licencia exacta del código (MIT, AGPL, Apache-2.0 u otra).
- Requisitos mínimos de hardware (CPU, RAM, almacenamiento) para autoalojar.
- Distribuciones Linux soportadas oficialmente más allá de la base Ubuntu.
- Detalles técnicos del mecanismo de SSO (OIDC, SAML, proxy auth, cookies compartidas).
- Cómo se gestiona la exposición HTTPS (ACME/Let's Encrypt integrado, Traefik, Caddy, certificados manuales).
- Modelo de permisos entre apps: granularidad, revocación, auditoría.
- Política de actualizaciones: rolling, semver, canales stable/beta, migraciones de datos.
- Soporte de arquitectura: solo amd64 o también arm64 (Raspberry Pi, etc.).
- Qué incluye exactamente la versión gestionada de Imbue (backups, monitoring, SLA, precio tras el crédito).
- Número actual de apps en el catálogo curado y criterios formales de inclusión.
- Existencia de CLI o API para automatización (Terraform, Ansible, GitOps).
- Soporte de bases de datos gestionadas (PostgreSQL, MariaDB, Redis) como servicios de plataforma.
- Mecanismo de backup/restore de la instancia completa y de apps individuales.
- Fecha exacta de lanzamiento público (el texto menciona "5 Sep 2026" pero no confirma si es hoy).
