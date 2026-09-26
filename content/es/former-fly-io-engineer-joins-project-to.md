---
title: "Dejo Fly.io para construir un teléfono que ejecute software generado por el usuario"
summary: "El autor argumenta que los sistemas operativos móviles actuales asumen que el código viene de fuera y no es de fiar, pero la IA permite que el usuario escriba su propio software en segundos."
lang: es
story: former-fly-io-engineer-joins-project-to
publishedAt: 2026-09-26T11:41:30.759Z
sourceUrl: "https://sockpuppet.org/blog/2026/09/25/what-even-is-an-os-now/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [ia, sistemas-operativos, hardware, flyio]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Dejo Fly.io para trabajar con Kurt en un nuevo proyecto: construir un teléfono. La decisión no es anecdótica. Después de meses escribiendo aplicaciones nativas de macOS con ayuda de IA, he comprobado que las fronteras entre backend y frontend, entre web y nativo, y entre código de sistema y código de aplicación se han vuelto porosas. El resultado práctico es que el sistema operativo deja de ser el contenedor necesario para aislar software de procedencia desconocida y pasa a ser una capa de fricción cuando la mayor parte del código que se ejecuta en el dispositivo lo ha escrito el propio usuario.

El argumento central es que los teléfonos que saldrán al mercado en 2026 fueron planificados en 2023. En ese momento, la premisa de diseño era ejecutar aplicaciones deterministas de función fija, creadas por programadores profesionales y distribuidas a través de tiendas. El modelo de seguridad, el sandboxing, los permisos y la propia arquitectura del SO giran en torno a esa suposición: el software viene de fuera y no se fía de él. Si el software viene de dentro , porque el usuario lo ha descrito en lenguaje natural y el dispositivo lo ha construido en segundos, la arquitectura se invierte. El aislamiento deja de ser el objetivo principal y la comunicación fluida entre componentes generados ad-hoc se vuelve la prioridad.

Estimo que habrá miles de veces más aplicaciones personales que las que hoy extraen una séptima parte de las tripas de un procesador de textos. Cada una de esas micro-apps nace, hace una cosa concreta y muere. No hay ciclo de compilación, firma, revisión de tienda ni instalación. El runtime que soporta ese flujo no se parece a iOS ni a Android: se parece más a un hipervisor ligero que arranca instancias efímeras, expone capacidades del hardware como primitivas componibles y gestiona la identidad del usuario como único límite de confianza.

Lo que no se sabe: el nombre, las especificaciones técnicas, la arquitectura de software ni la fecha de lanzamiento del teléfono. Tampoco se conoce la identidad completa de Kurt ni los detalles del proyecto o empresa. Queda por definir qué bloques de construcción o primitivas aportarán terceros en lugar de aplicaciones completas, cómo se resuelven seguridad, sandboxing, permisos y distribución en un modelo de creación ad-hoc, y cuál es el modelo de negocio, la financiación o la hoja de ruta pública.
