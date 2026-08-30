---
title: "Los equipos no ven los bugs que los usuarios sufren a diario"
summary: "El autor define \"ceguera a los bugs\" como la incapacidad sistemática de los desarrolladores para detectar fallos obvios para cualquiera fuera del equipo. Los tests solo cubren lo que alguien escribió; lo imprevisto sigue invisible."
lang: es
story: bug-blindness-hides-broken-features-from-teams
publishedAt: 2026-08-30T12:27:23.205Z
sourceUrl: "https://danluu.com/bug-blind/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [testing, calidad, ux, sesgo]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
La mayoría de los equipos cree que su software funciona porque los tests pasan. La realidad es que los tests solo comprueban lo que alguien se molestó en escribir. Los fallos que nadie anticipó , los que los usuarios encuentran a diario, siguen invisibles para quien construye el producto. Eso es lo que el autor llama "ceguera a los bugs": la incapacidad sistemática de ver errores que son obvios para cualquiera fuera del equipo.

La clasificación que usa el autor tiene tres niveles. "Mild" son molestias menores. "Moderate" impide completar una tarea sin rodeos. "Severe" significa que un usuario normal no puede usar el producto en absoluto. Cuando probó Google, Bing y Kagi con una consulta de pronóstico estacional, los tres devolvieron resultados dominados por spam SEO. Lo calificó como "moderate": se puede buscar, pero la respuesta útil no aparece. Usuarios de Kagi enviaron sus propios filtros y resultados fijados (pinned). En todos los casos el autor siguió sin ver un buen resultado para esa consulta, salvo cuando fijaba GitHub, lo cual solo sirve para descargas en ese repositorio.

El patrón se repite fuera de la web. Los datos de fiabilidad sitúan a Volvo en niveles mediocres o malos, pero los foros de fans insisten en que son de los coches más fiables. Blackboard, el LMS, acumuló un 93 % de respuestas "hate" en la encuesta Amplicate de diciembre de 2011 según Fast Company, y Wikipedia lo resume como "una de las empresas más odiadas , incluso detestadas, en educación". Un empleado de Blackboard aseguraba sinceramente que el software era muy querido. En Discourse, el equipo pensaba que tenía un gran rendimiento web; el código incluía trucos que inflaban métricas como LCP mientras la carga real se ralentizaba, perjudicando al usuario.

El autor detecta estos fallos observando cientos o miles de bugs por semana. Ha comprobado que, al señalarlos a otras personas, quienes tienen la inclinación empiezan a verlos también en unas semanas. Ahora usa LLMs para simular usuarios normales y verificar que los fallos se reproducen en muchos escenarios.

Lo que no se sabe

- Qué porcentaje de usuarios reales tropieza con bugs "severe" frente a los que los evitan con workarounds no intuitivos.
- Si existen métricas objetivas de "ceguera a los bugs" en equipos de producto o estudios controlados sobre cuántos bugs pasan desapercibidos.
- Cuál es la tasa de falsos positivos y negativos al usar LLMs como simuladores de usuarios normales.
- Qué consultas exactas y metodología usó el autor en la comparativa de buscadores.
- Cómo evolucionó la fiabilidad de Volvo en los últimos años según fuentes independientes como Consumer Reports.
- Qué cambios hizo Discourse tras la acusación de hacer trampa en LCP y qué impacto tuvieron en métricas reales de usuario.
