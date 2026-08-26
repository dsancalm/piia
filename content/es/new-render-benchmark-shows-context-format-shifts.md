---
title: "El formato de la memoria cambia el rendimiento de los modelos hasta 72 puntos"
summary: "Un benchmark aísla el envoltorio de la memoria , diálogo crudo, resumen, registro tipado o plantilla tipo ChatGPT, manteniendo fijos contenido y preguntas."
lang: es
story: new-render-benchmark-shows-context-format-shifts
publishedAt: 2026-08-26T07:33:11.357Z
sourceUrl: "https://arxiv.org/abs/2608.23568"
sourceName: "arXiv cs.AI"
priority: routine
tags: [benchmark, memoria, formato, evaluación]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
RENDER es un benchmark de control que aísla una variable que suele ignorarse: el formato en que el modelo lector recibe la memoria. Los autores fijan la conversación y las preguntas, y solo cambian el artefacto que ve el modelo: diálogo crudo, resumen estilo LangChain, registro tipado al estilo MemGPT o plantilla desplegada tipo ChatGPT. La idea es medir cuánto mueve la aguja el envoltorio, no el contenido.

La evaluación usa 500 preguntas de LongMemEval sobre nueve modelos. La estructura experimental combina una escalera de cinco niveles de paquetes , que controla cuándo aparece la información relevante en la entrada, con plantillas deterministas que replican formatos reales. Cuando se iguala el presupuesto de tokens entre formatos, los paquetes resueltos superan al diálogo crudo truncado por recencia entre 42,4 y 72,6 puntos. En plantillas desplegadas, la brecha entre el mejor y el peor formato para un mismo modelo oscila entre 24,6 y 48,8 puntos.

Bajo el *primary scorer*, las entradas estilo ChatGPT ganan al diálogo crudo en siete de los nueve modelos. El *judge rescoring* confirma el efecto agregado, aunque la significancia por modelo se vuelve mixta. El hallazgo más llamativo: tres modelos que sacan 0 % con paquetes de libro mayor formal responden los mismos hechos desde lenguaje natural al 45,4, 53,4 %. El efecto aguanta cuando se inyecta ruido de recuperación y se transfiere a HotpotQA.

Lo que no se sabe
- Nombres, tamaños y familias de los nueve modelos evaluados.
- Definición exacta de cada nivel de la escalera de cinco paquetes.
- Fórmula del *primary scorer* y del *judge rescoring*.
- Qué presupuesto de tokens o contexto define la condición *matched-budget*.
- Longitud, esquema y ejemplos completos de las plantillas deterministas.
- Tabla de resultados por modelo individual.
- Configuración del ruido de recuperación en el experimento de robustez.
- Métricas y deltas exactos en HotpotQA.
- Disponibilidad de código, datos, splits y licencia.
- Coste computacional y tiempo total de evaluación.
