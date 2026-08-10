---
title: "WebGrader entrena modelos de lenguaje para que verifiquen sus propias páginas web"
summary: "Un sistema descrito en arXiv usa el modelo para descubrir qué comprobar en una web generada, lo convierte en un contrato ejecutable y lo usa como recompensa. Alcanza un 52,01% de éxito funcional en WebGen-Bench, 7,88 puntos más que la recompensa clásica."
lang: es
story: webgrader-usa-un-navegador-en-vivo-para
publishedAt: 2026-08-10T08:19:50.495Z
sourceUrl: "https://arxiv.org/abs/2608.06474"
sourceName: "arXiv cs.AI"
priority: routine
tags: [modelos, web, evaluación, refuerzo]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Entrenar a un modelo de lenguaje para que genere una página web completa a partir de una descripción en lenguaje natural tiene un problema de fondo: ¿cómo saber si lo que ha hecho está bien? La forma habitual es comparar la salida con una imagen de referencia o ejecutar un script escrito a mano que compruebe ciertos elementos. El primer método no captura si la página funciona, y el segundo no escala.

WebGrader, un sistema descrito en un artículo de arXiv, propone otra vía: que el propio modelo descubra qué tiene que comprobar. En lugar de una recompensa fija, WebGrader deriva un flujo de interacción a partir de la petición original del usuario. Ese flujo se convierte en un contrato ejecutable, un Flow Contract, y el resultado de ejecutarlo en un navegador real es la recompensa para el entrenamiento por refuerzo.

El sistema materializa el proyecto generado en un navegador en vivo, compara las acciones objetivo contra el código fuente y el DOM, y recoge evidencia visual, de respuesta y de estado persistente a lo largo de la misma trayectoria. El veredicto de aprobado solo se emite cuando se observa la transición solicitada, por ejemplo, que un clic en un botón lleva a otra vista. Esto separa la planificación de la prueba, la fundamentación de las acciones y el juicio semántico en pasos distintos.

Hay un bucle offline que descubre habilidades verificadoras reutilizables. Ese bucle evalúa esas habilidades en páginas de validación separadas y congela el grafo de habilidades antes de entrenar la política. Así, el modelo no cambia las reglas de evaluación a mitad de partida.

Los resultados en el benchmark WebGen-Bench: una política de 8B parámetros entrenada con WebGrader alcanza un 52.01% de tasa de éxito funcional, 7.88 puntos por encima de una recompensa combinada de apariencia más script. Esa misma política supera a o4-mini y a DeepSeek-v4-flash. En el conjunto WG-core-250, la política llega a un Full Score de 44.953 y supera a Qwen3-Coder-480B.

Lo que no queda claro en el artículo es cómo se implementa exactamente el bucle de auto-supervisión residual que descubre las habilidades verificadoras. Tampoco se detalla la composición del conjunto WG-core-250 ni el coste computacional del entrenamiento. Son datos que importan si quieres reproducir el sistema o dimensionar si merece la pena aplicarlo a tu caso.
