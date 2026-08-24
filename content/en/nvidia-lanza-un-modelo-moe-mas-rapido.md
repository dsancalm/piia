---
title: "Nvidia lanza un modelo MoE más rápido y un enrutador que recorta costes de IA"
summary: "Nemotron 3.5 Lightning multiplica por 4 la velocidad de salida y NeMo Switchyard decide qué modelo responde cada petición. Socios como LangChain y Ramp reportan ahorros del 74% y 58% en costes, aunque Nvidia no detalla métricas clave de entrenamiento."
lang: en
story: nvidia-lanza-un-modelo-moe-mas-rapido
publishedAt: 2026-08-12T08:06:01.940Z
sourceUrl: "https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [nvidia, modelos, enrutamiento, agentes]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Nvidia ha publicado dos piezas de software que se complementan: el modelo de lenguaje Nemotron 3.5 Lightning y la biblioteca de enrutamiento NeMo Switchyard. El primero es un modelo de 30 mil millones de parámetros con arquitectura de mezcla de expertos (MoE). El segundo es un marco de código abierto para decidir qué modelo de IA recibe cada petición en un agente o pipeline.

Nemotron 3.5 Lightning ofrece hasta 4 veces más velocidad de salida y un 30% más de rapidez en la finalización de tareas agénticas en comparación con otros modelos de su clase, según Nvidia. Se ejecuta localmente en sistemas como RTX PCs, DGX Spark y Jetson.

NeMo Switchyard es la pieza más relevante. Es una biblioteca de enrutamiento inteligente que se acopla a herramientas de agentes existentes. En lugar de que un solo modelo maneje todas las solicitudes, Switchyard puede enviar cada petición a un modelo diferente según la carga, el coste o la especialización. Los casos de uso publicados por Nvidia incluyen a Boomi, que logró un 100% de precisión de enrutamiento por dominio y envió el 59% del tráfico a un modelo afinado 5 veces más rápido, y a LangChain, que redujo costes un 74% enrutando solo el 7% de las llamadas a un modelo frontera.

### Lo que cambia para quien programa agentes

Hasta ahora, orquestar agentes significaba elegir un modelo y asumir su coste y latencia para todas las tareas. Switchyard permite un patrón de "juez" que decide dinámicamente si la siguiente petición la responde un modelo pequeño y rápido, uno especializado, o uno grande. Los datos de los socios de Nvidia muestran ahorros consistentes: Ramp reporta un 58% de reducción de costes y un 33% menos de tiempo de ejecución; Classmethod, un 27% de reducción de costes.

El modelo se lanza junto a Nemotron-RL-Agentic-Terminal-Pivot, un dataset de aprendizaje por refuerzo para post-entrenar el modelo en tareas de codificación agéntica. Tanto el modelo como la biblioteca están disponibles bajo licencia abierta en GitHub y próximamente en plataformas de socios.

### Lo que no se sabe

No se especifica el tamaño del dataset de entrenamiento, el número de parámetros activos por token en la mezcla de expertos, ni el rendimiento en benchmarks como PinchBench frente a modelos equivalentes. Tampoco se detalla el coste computacional del entrenamiento ni qué algoritmos de enrutamiento concretos incluye la primera versión de Switchyard.
