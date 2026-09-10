---
title: "Osprey entrena un drafter target-agnóstico para speculative decoding"
summary: "Osprey propone un preentrenamiento target-agnóstico para los drafters usados en speculative decoding. Hoy, cada drafter se entrena contra la distribución de un único modelo target; si cambias el modelo o la carga de trabajo, la tasa de aceptación se desploma."
lang: es
story: osprey-draft-model-cuts-retraining-for-speculative
publishedAt: 2026-09-10T11:38:31.686Z
sourceUrl: "https://arxiv.org/abs/2609.09338"
sourceName: "arXiv cs.CL"
priority: routine
tags: [speculativedecoding, drafters, target-agnostic, pretraining]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Osprey propone un preentrenamiento target-agnóstico para los drafters que se usan en speculative decoding. Hoy, cada drafter se entrena contra la distribución de un único modelo target; si cambias el modelo o la carga de trabajo, la tasa de aceptación se desploma. Osprey rompe esa dependencia: parte de pequeños LMs preentrenados off-the-shelf, los poda a un backbone shallow que cabe en el presupuesto de latencia, restaura su capacidad de language modeling con un preentrenamiento next-token amplio y target-agnóstico, y luego adapta ese único backbone a cada target mediante tres pasos ligeros: alineación de vocabulario, expansión QKV zero-inicializada para ingerir hidden states del target y destilación de la distribución de salida del target.

El mismo backbone Osprey preentrenado transfiere entre targets de tamaños y arquitecturas distintas. En los experimentos del paper, mejora la longitud media de aceptación un 16.1 % sobre Qwen3-8B, un 21.2 % sobre Llama-3.3-70B-Instruct y un 22.7 % sobre MiniMax-M2.5 de 229B, con un 17.5 % más de tokens por segundo en este último. Las ganancias más grandes aparecen en datos out-of-domain y multilingües, que es donde los drafters especializados suelen fallar.

El método resuelve dos cuellos de botella a la vez. Primero, los pequeños LMs disponibles son demasiado profundos para un drafter limitado por latencia; la poda agresiva a un backbone shallow arregla eso pero destruye la capacidad de modelado. Segundo, la computación preentrenada debe sobrevivir intacta mientras el drafter aprende a consumir hidden states ajenos y emitir en un vocabulario ajeno. Osprey restaura el language modeling con el preentrenamiento target-agnóstico y luego usa la expansión QKV zero-inicializada para que el backbone empiece a leer los hidden states del target sin romper lo aprendido, seguido de la destilación para alinear la distribución de salida.

El paper fue aceptado en EMNLP 2026, tiene 21 páginas, 4 figuras y 10 autores (Fengxiang Bie, Yuqing Jian, Yifan Yu, Zhongzhu Zhou, Zelei Shao, Ben Athiwaratkun, Shuaiwen Leon Song, Chenfeng Xu, Xiaoxia Wu, Tianyi Zhang). Código disponible en la URL del paper (arXiv:2609.09338v1).

## Lo que no se sabe

- Arquitectura exacta del backbone Osprey tras la poda: número de capas, hidden size y parámetros totales.
- Qué pequeños LMs preentrenados se usaron como punto de partida (nombres y tamaños).
- Detalles del preentrenamiento next-token target-agnóstico: dataset, compute, pasos y learning rate.
- Detalles de la adaptación por target: cómo se hace el mapeo de vocabulario, dimensiones de la expansión QKV, loss de destilación, temperatura, pasos y datos empleados.
- Latencia del drafter en ms/token y hardware usado para medir tokens/segundo.
- Métricas de acceptance rate (no solo mean acceptance length) y speedup wall-clock end-to-end por target.
- Resultados en benchmarks estándar (MT-Bench, AlpacaEval, MMLU, etc.) para calidad de generación.
- Si el código liberado incluye checkpoints del backbone preentrenado y scripts de adaptación.
- Comparación con baselines fuertes (Medusa, Eagle, Lookahead, SpecInfer, etc.) en mismos targets y hardware.
- Ablaciones que aíslen la contribución de poda, preentrenamiento next-token, QKV zero-init, vocab alignment y destilación.
