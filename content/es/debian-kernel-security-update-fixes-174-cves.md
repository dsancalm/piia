---
title: "Debian publica aviso con 174 vulnerabilidades del kernel Linux"
summary: "El boletín DSA-6528-1 agrupa fallos desde 2024 hasta 2026 que permiten escalada de privilegios y fuga de datos. No detalla qué ramas de Debian reciben el parche ni los números de versión exactos."
lang: es
story: debian-kernel-security-update-fixes-174-cves
publishedAt: 2026-10-02T13:03:16.959Z
sourceUrl: "https://lwn.net/Articles/1097401/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [debian, kernel, seguridad, cve]
generatedBy: dots-studio/dots-3-note-preview:free
---
Debian ha publicado el aviso de seguridad DSA-6528-1 para el paquete `linux`, con fecha 29 de septiembre de 2026 y firma de Salvatore Bonaccorso. El boletín agrupa 174 identificadores CVE, que cubren un rango desde CVE-2024-52560 hasta CVE-2026-90015. Todas las vulnerabilidades afectan a las versiones del kernel Linux empaquetadas por la distribución.

El volumen de identificadores en un solo aviso es inusual y refleja una acumulación de correcciones que llegan al árbol principal y se retroportan a las ramas estables mantenidas por el proyecto. Entre los fallos corregidos hay condiciones de carrera, desreferencias de puntero nulo, desbordamientos de búfer y problemas de validación de entrada en subsistemas como el sistema de archivos, la pila de red, los controladores de hardware y la gestión de memoria. Varios de ellos permiten escalada de privilegios local, denegación de servicio remoto o fuga de información del kernel, lo que obliga a tratar la actualización como prioritaria en cualquier máquina expuesta a red o con usuarios no confiables.

El aviso no detalla qué ramas de Debian (bookworm, trixie, sid) reciben la corrección ni los números de versión exactos del paquete `linux` que la incluyen. Tampoco especifica si alguno de los 174 CVE tiene explotación conocida en entornos reales, ni proporciona la orden `apt` concreta para aplicar la actualización. La necesidad de reinicio tras la instalación del nuevo kernel no se menciona en el texto del boletín, aunque es la norma cuando se actualiza el paquete del núcleo.

## Qué no se sabe

- Qué versiones de Debian y qué números de versión del paquete `linux` resuelven el conjunto de vulnerabilidades.
- Detalles técnicos de cada CVE: componente afectado, vector de ataque y puntuación CVSS.
- Existencia de explotación activa (*in-the-wild*) para alguno de los fallos.
- Comandos exactos de actualización para el usuario final.
- Confirmación oficial de si el reinicio es obligatorio tras aplicar el parche.
