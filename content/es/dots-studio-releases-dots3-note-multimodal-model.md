---
title: "Dots Studio lanza la versión preview de dots3-note"
summary: "Este modelo multimodal de 280B de parámetros utiliza una arquitectura MoE para procesar texto, audio y video con eficiencia. Puedes cargar repositorios enteros gracias a su ventana de 512K tokens y su método de aprendizaje TEMPO."
lang: es
story: dots-studio-releases-dots3-note-multimodal-model
publishedAt: 2026-08-16T20:45:03.925Z
sourceUrl: "https://aideveloper44.com/product/dots3-note-preview-6a806fb73c2f7b5714d6c181"
sourceName: "Reddit r/AIDeveloperNews"
priority: flash
tags: [inteligencia, software, tecnología]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Dots Studio presentó la versión preview de dots3-note, un modelo multimodal con arquitectura Mixture of Experts (MoE). El modelo tiene 280B de parámetros totales, pero solo utiliza 16B de parámetros activos durante la inferencia. Esta estructura procesa texto, visión, audio, imágenes y video. El modelo incluye una ventana de contexto de 512K tokens y opera bajo la licencia Apache 2.0.

El entrenamiento emplea un método de aprendizaje por refuerzo llamado TEMPO. Este enfoque utiliza autocrítica recursiva para evaluar el razonamiento y actualizar la memoria del sistema.

La combinación de una ventana de contexto de 512K y una arquitectura MoE de 16B de parámetros activos tiene implicaciones directas en el desarrollo de software. Es posible cargar repositorios enteros o bases de código completas en el contexto para realizar tareas de razonamiento complejo sin que el coste de computación en la inferencia sea prohibitivo. Al ejecutar solo una fracción de los parámetros totales en cada paso, el modelo ofrece una eficiencia que facilita su uso en flujos de trabajo de agentes de IA y tareas de programación avanzadas.

Lo que no se sabe:
No se conocen los detalles sobre el hardware necesario para el despliegue local, las métricas de rendimiento comparativas con otros modelos ni la fecha exacta de lanzamiento de la versión final.
