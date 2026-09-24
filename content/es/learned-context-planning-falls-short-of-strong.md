---
title: "La planificación aprendida no mejora la recuperación fuerte en preguntas de contexto"
summary: "Un estudio en EMNLP Insights 2026 muestra que un planificador entrenado con solo 140 ejemplos no supera a la recuperación híbrida anclada ni a BM25 en LongBench‑v2. En preguntas no vistas la brecha se amplía: 42 % frente al 37 % del planificador."
lang: es
story: learned-context-planning-falls-short-of-strong
publishedAt: 2026-09-24T12:10:05.657Z
sourceUrl: "https://arxiv.org/abs/2609.26976"
sourceName: "arXiv cs.CL"
priority: routine
tags: [rag, planificacion, recuperacion, emnlp]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un artículo aceptado en el taller Insights 2026 de EMNLP analiza si la planificación aprendida aporta algo en preguntas de respuesta múltiple con contexto largo cuando ya existe un *retrieval* fuerte. Los autores, Yingrui Li y Han Chen, evalúan 503 cuestiones de LongBench‑v2 con Qwen2.5‑7B‑Instruct. El planificador se entrena con *fine‑tuning* supervisado sobre 140 ejemplos de entrenamiento y 28 de desarrollo seleccionados por resultado; por tanto, la evaluación principal es parcialmente transductiva.

Con un presupuesto de 18 000 caracteres, la recuperación híbrida anclada alcanza un 36,18 % de acierto y BM25 un 35,98 %. El mejor método guiado directamente por el planificador se queda en el 34,19 %. En el *split* de 152 preguntas que el modelo no ha visto durante el entrenamiento, la recuperación anclada sube al 42,11 % frente al 36,84 % del planificador. Los *routers* a prueba de fugas no logran cerrar la brecha con el oráculo.

Bajo presupuestos ajustados la ventaja del planificador es mínima: 0,40 puntos a 6 k caracteres y pierde a 9 k. El *reranking* guiado por el planificador muestra una estimación de +1,79 puntos a 6 k, pero el intervalo pareado cruza el cero y empata con el control a 9 k. Los análisis de orden de empaquetado y planitud de puntuaciones no revelan un mecanismo estable.

La conclusión es que la planificación aprendida actúa como una señal de relevancia débil, no como sustituto de una recuperación robusta. Para quien construya sistemas RAG, el mensaje es claro: invertir en *retrieval* y *reranking* fuertes rinde más que añadir un módulo de planificación entrenado con pocos ejemplos.

---

**Lo que no se sabe**
- Arquitectura exacta e hiperparámetros del Qwen2.5‑7B‑Instruct utilizado.
- Detalles de los algoritmos de recuperación más allá de BM25 e híbrido anclado.
- Composición concreta de los controles de *routing*, *budgeted‑selector* y *reranking*.
- Cómo se generan y validan las trazas seleccionadas por resultado.
- Definición e implementación de los *routers* a prueba de fugas.
- Procedimiento de SFT y función de pérdida del planificador.
- Pruebas de significación estadística de las diferencias de *accuracy*.
- Coste computacional y latencia de cada método.
- Forma exacta de medir y hacer cumplir el presupuesto de caracteres.
- Por qué los análisis de orden de empaquetado y planitud de puntuaciones no hallaron mecanismo estable.
- Disponibilidad de código o instrucciones de reproducibilidad.
