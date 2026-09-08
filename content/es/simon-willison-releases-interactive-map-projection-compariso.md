---
title: "Simon Willison crea una demo interactiva para comparar las proyecciones Mercator y"
summary: "La herramienta anima la transición entre ambos mapas y nació tras la adopción de Equal Earth como estándar en la ONU. Willison delegó todo el código D3.js en un modelo de IA que generó la aplicación completa."
lang: es
story: simon-willison-releases-interactive-map-projection-compariso
publishedAt: 2026-09-08T11:36:26.855Z
sourceUrl: "https://simonwillison.net/2026/Sep/7/equal-earth/"
sourceName: "Simon Willison"
priority: routine
tags: [cartografía, visualización, ia, d3js]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison publicó el 7 de septiembre de 2026 una herramienta interactiva llamada *Mercator Equal Earth*. Permite ver la transición animada entre ambas proyecciones cartográficas. La idea surgió tras la reciente votación en la ONU que adoptó Equal Earth como estándar, lo que llevó a Willison a querer compararla directamente con la ubicua Mercator.

En lugar de escribir el código D3.js necesario para renderizar las geometrías, calcular las rutas de interpolación entre proyecciones y gestionar la interfaz de deslizador y reproducción, Willison encargó la construcción completa a GPT-6 Astra (medium) dentro de ChatGPT Work. El modelo generó una aplicación funcional que sirve como plantilla reproducible para visualizaciones geoespaciales en el navegador, resolviendo la duda técnica sin que su autor tuviera que escribir el código base.

La demo permite alternar entre las dos visiones del mundo: la conformal Mercator, que preserva ángulos pero distorsiona áreas hacia los polos, y la igualárea Equal Earth, que mantiene las proporciones relativas de los continentes con una estética similar a la Robinson. La transición animada muestra de forma inmediata cómo cambia la forma y el tamaño de las masas terrestres al pasar de un sistema matemático a otro.

Lo que no se sabe: la URL directa para acceder a la herramienta, el código fuente D3.js concreto que genera la interpolación, los detalles exactos de la votación en la ONU (qué órgano y qué resolución), ni las especificaciones técnicas de GPT-6 Astra y ChatGPT Work, productos que no existen públicamente a fecha de corte de conocimiento. Tampoco se conocen las diferencias matemáticas específicas implementadas en esta demo concreta más allá de la definición general de cada proyección.
