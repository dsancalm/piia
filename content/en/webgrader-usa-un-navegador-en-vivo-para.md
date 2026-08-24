---
title: "WebGrader usa un navegador en vivo para recompensar a los modelos que generan webs"
summary: "WebGrader, descrito en un preprint de arXiv, deriva un flujo de interacción ejecutable de la propia solicitud del sitio y lo usa como recompensa de reinforcement learning."
lang: en
story: webgrader-usa-un-navegador-en-vivo-para
publishedAt: 2026-08-10T08:19:50.496Z
sourceUrl: "https://arxiv.org/abs/2608.06474"
sourceName: "arXiv cs.AI"
priority: routine
tags: [reinforcement-learning, webgeneration, arxiv, benchmark]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Entrenar un modelo para que genere una página web no es lo mismo que entrenarlo para que genere código. El código se puede ejecutar y comparar contra tests. Una web, en cambio, se juzga por cómo se ve, cómo responde y si el usuario puede hacer lo que pide. Ese juicio es caro de automatizar, y por eso la mayoría de intentos recurren a recompensas de apariencia o a scripts escritos a mano, que no generalizan.

WebGrader, un sistema descrito en un nuevo preprint en arXiv, ataca el problema desde otro lado. En lugar de definir una recompensa fija, deriva un flujo de interacción a partir de la propia solicitud del sitio web. Ese flujo se representa como un "Flow Contract" ejecutable, y el resultado de ejecutarlo en un navegador en vivo se usa directamente como recompensa de reinforcement learning.

La clave está en cómo se construye ese contrato. WebGrader no se limita a comparar capturas de pantalla. Materializa el proyecto generado en un navegador real, fundamenta las acciones objetivo contra el código fuente y el DOM en vivo, y recoge evidencia visual, de respuesta y de estado persistente a lo largo de la misma trayectoria del navegador. Solo emite un veredicto Pass cuando observa la transición solicitada, separando la planificación de pruebas, la fundamentación de acciones, la recolección de evidencia y el juicio semántico en pasos distintos.

El sistema también tiene un bucle offline residual que descubre habilidades verificadoras reutilizables. Las evalúa en páginas de validación separadas y congela el grafo de habilidades promovido antes del entrenamiento de políticas. Eso significa que el calificador mejora con el tiempo sin necesidad de reescribir scripts a mano para cada nueva tarea.

Los resultados, en el benchmark WebGen-Bench, son concretos. Una política de 8B entrenada con WebGrader alcanza un 52.01% de tasa de éxito funcional, 7.88 puntos por encima de una recompensa combinada de apariencia más script. Esa misma política supera a o4-mini y a DeepSeek-v4-flash. En el conjunto WG-core-250, la política llega a un Full Score de 44.953 y supera a Qwen3-Coder-480B, un modelo mucho más grande.

## Lo que no se sabe

El preprint no especifica cómo se implementa el bucle de auto-supervisión residual para descubrir habilidades verificadoras. No detalla el tamaño ni la composición exacta de WG-core-250. Tampoco indica el coste computacional del entrenamiento ni el tiempo requerido para que WebGrader converja. Sin esos datos, es difícil saber si la ventaja se mantiene fuera del benchmark o si el coste de ejecutar un navegador en vivo durante el entrenamiento la hace inviable a escala.
