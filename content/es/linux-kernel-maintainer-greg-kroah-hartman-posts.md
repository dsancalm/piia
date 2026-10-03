---
title: "Greg Kroah-Hartman advierte del riesgo de parches generados por IA en el kernel de"
summary: "El mantenedor estable explica que la IA genera código que pasa pruebas pero rompe invariantes del kernel. Ahora exigen que el autor demuestre entender el subsistema, explique el porqué en el commit y garantice trazabilidad legal."
lang: es
story: linux-kernel-maintainer-greg-kroah-hartman-posts
publishedAt: 2026-10-03T12:00:00.620Z
sourceUrl: "https://www.youtube.com/watch?v=NnV_cWeoo5Q"
sourceName: "Hacker News (portada)"
priority: routine
tags: [kernel, seguridad, ia, mantenimiento]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Greg Kroah-Hartman, mantenedor estable del kernel de Linux, ha publicado en YouTube el vídeo "Security in the LLM Age". La charla llegó a la portada de Hacker News con 248 puntos y 79 comentarios (entrada 49929391), lo que muestra el interés de la comunidad por su visión sobre cómo los modelos de lenguaje afectan a la cadena de suministro y a la revisión de código.

Su intervención no es teórica. Gestiona la integración de miles de parches al mes y ve cómo la IA generativa empieza a aparecer en los envíos. La preocupación central es la superficie de ataque que se abre cuando un contribuyente , o un bot, entrega código que nadie ha escrito línea a línea. Un modelo puede introducir patrones sutiles que pasan las pruebas automáticas pero rompen invariantes del kernel, desde condiciones de carrera hasta fugas de memoria en rutas de error poco frecuentes.

Para quien revisa parches, la regla práctica cambia. Ya no basta con comprobar que el diff compila y pasa el CI. Hay que validar que el autor , humano o no, entiende el subsistema que toca, que el mensaje de commit explica el "porqué" y no solo el "qué", y que no hay dependencias ocultas a bibliotecas o fragmentos copiados de fuentes con licencias incompatibles. Greg insiste en que la atribución y la trazabilidad son ahora parte de la seguridad: si no puedes rastrear el origen lógico de un cambio, no entra.

El vídeo no incluye diapositivas ni transcripción en la fuente enlazada, así que los detalles técnicos , ejemplos concretos de ataques, herramientas propuestas o cambios en el flujo de trabajo del kernel, quedan pendientes de ver la grabación completa. Tampoco se sabe la fecha exacta de la charla ni en qué evento se grabó.
