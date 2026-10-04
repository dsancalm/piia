---
title: "Nolan Lawson explica por qué los desarrolladores seguimos evitando las APIs nativas"
summary: "Lawson desmenuza cuatro fricciones reales: una década de APIs tardías o rotas que forjaron el hábito de npm, la hegemonía cultural de React que hace más atractivo un paquete que `<dialog>`, el apego psicológico al código propio y la ignorancia técnica en CSS moderno."
lang: es
story: nolan-lawson-asks-why-developers-still-skip
publishedAt: 2026-10-04T12:47:14.083Z
sourceUrl: "https://nolanlawson.com/2026/10/03/why-dont-more-developers-use-the-platform/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [javascript, navegador, npm, css]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Nolan Lawson publicó el 3 de octubre de 2026 un artículo en su blog donde desmenuza por qué los desarrolladores seguimos evitando las APIs nativas del navegador aunque la retórica "use the platform" lleve años sonando. El texto no es una queja moral: es un inventario de fricciones reales que explican por qué `npm install` sigue ganando a `document.querySelector`.

La primera razón es histórica. Durante más de una década las APIs nativas llegaron tarde, rotas o incompletas. jQuery, Lodash o Moment existían porque el navegador no daba la talla. Había que esperar a que Internet Explorer 6 muriera y, incluso después, a que Safari actualizara , hoy lo hace unas siete veces al año, para poder usar algo sin polyfill. Esa memoria colectiva sigue pesando: el instinto es buscar en npm antes que comprobar si `position: sticky` ya funciona en todas partes.

La segunda es cultural. El ecosistema React/npm se ha convertido en el lenguaje común. Un desarrollador que lleva años componiendo interfaces con componentes de terceros busca allí un modal, un date picker o una lista virtual antes de plantearse `<dialog>` o `IntersectionObserver`. La documentación de la plataforma estuvo dispersa entre blogs, Stack Overflow y CSS Tricks hasta que MDN y web.dev se consolidaron como referencias únicas, pero la experiencia de usuario de esos sitios sigue por detrás de la de una librería bien empaquetada: la página de Dragula resulta más atractiva que la entrada de MDN sobre Drag and Drop.

La tercera es psicológica. Construir un modal a mano con `position: absolute`, `z-index`, focus trap y manejo de la tecla Esc es divertido y educativo. El "efecto IKEA" genera apego al código propio y motiva su publicación en npm. Lawson lo admite: él mismo escribió PouchDB, un polyfill masivo para IndexedDB y WebSQL, y esa lucha le llevó a participar en los estándares W3C. Muchos defensores actuales de la plataforma nativa vienen de haber construido las herramientas que ahora dicen que no hacen falta.

La cuarta es ignorancia técnica, especialmente en CSS. Años de `clearfix`, floats, `min-width: 0` y ausencia de line clamping nativo, resize de textarea u ocultación de scrollbars empujaron a resolver maquetación con JavaScript. Cuando el lenguaje de estilos maduró, el músculo mental ya estaba entrenado en otra dirección.

Lawson ilustra el fenómeno fuera de la web con ClickHouse. Él y un compañero diseñaron compresión previa y un key-value store separado sin saber que el motor ya comprime automáticamente y su almacenamiento columnar optimiza esas consultas. Leer la documentación y hacer benchmarks reveló que la solución nativa era más rápida y simple. El estereotipo del ingeniero senior , quien reemplaza miles de líneas por una sola gracias a su conocimiento profundo de la plataforma, encaja aquí.

Sobre el impacto de la IA, Lawson esboza una visión optimista: los LLM tienen conocimiento enciclopédico de las APIs nativas y, tras testear y benchmarkear, tienden a elegirlas. El texto se corta antes de desarrollar la visión pesimista.

## Lo que no se sabe

- La argumentación pesimista de Lawson sobre la IA y "use the platform".
- Datos de adopción real de `<dialog>` u otras APIs frente a sus equivalentes en npm.
- Benchmarks comparativos de rendimiento entre soluciones caseras y nativas en los ejemplos citados.
- Qué proporción de desarrolladores evita la plataforma por diversión, por pereza o por desconocimiento.
- Detalles técnicos del caso ClickHouse: volumen de datos, ratios de compresión, tiempo invertido en las soluciones descartadas.
