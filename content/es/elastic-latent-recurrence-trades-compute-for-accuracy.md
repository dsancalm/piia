---
title: "Elastic Latent Recurrence permite variar la profundidad de inferencia con un solo"
summary: "Un único modelo recurrente iguala el coste de servir uno no recurrente a un bucle y mejora su precisión añadiendo bucles. La técnica mezcla profundidades tarde en el preentrenamiento, reutiliza rutas de expertos en MoE y mantiene la caché KV del último bucle para ahorrar..."
lang: es
story: elastic-latent-recurrence-trades-compute-for-accuracy
publishedAt: 2026-10-12T15:56:31.328Z
sourceUrl: "https://arxiv.org/abs/2610.12582"
sourceName: "arXiv cs.CL"
priority: routine
tags: [arquitectura, inferencia, moe, checkpoint]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Elastic Latent Recurrence (ELR) propone un único checkpoint recurrente que intercambia compute por calidad variando el número de bucles de inferencia. El artículo demuestra que, a un solo bucle, un modelo ELR cuesta lo mismo servir que un modelo no recurrente del mismo tamaño y alcanza precisión comparable entrenado con los mismos datos. La arquitectura introduce tres decisiones de diseño: una actualización de estado con compuerta y tamaño de paso aprendido, la mezcla de conteos de bucles dentro de cada actualización del optimizador, y el condicionamiento de cada pasada a su índice de bucle y presupuesto total.

La mezcla de profundidades puede introducirse tarde en el preentrenamiento para limitar el coste añadido. Con condicionamiento inicializado a cero en el cambio, este calendario tardío alcanza menor pérdida que entrenar con mezcla de profundidades desde el inicio. En modelos de mezcla de expertos (MoE), reutilizar las rutas de expertos del primer bucle en los bucles posteriores reduce el tiempo de actualización de profundidad mixta en un 11.7 % sin cambio medible en precisión. En inferencia, mantener solo la caché KV de atención del último bucle mantiene la memoria KV en su nivel de un bucle mientras retiene la mayor parte de la ganancia de bucles adicionales.

La receta llevada a post-entrenamiento produce Koi-4B, un único checkpoint que obtiene ~18 en el Artificial Analysis Intelligence Index a un bucle (empata a Qwen3.5-4B) y ~29 a cuatro bucles. Los modelos evaluados son un denso de 4B y un híbrido MoE 30B-A3B. A un bucle, ELR queda 0.52 puntos por debajo (4B denso) y 1.04 puntos por encima (30B-A3B MoE) de su baseline emparejado en media de 10 tareas. Cuatro bucles añaden 7.25 puntos (4B denso) y 4.75 puntos (30B-A3B MoE) sobre el resultado a un bucle.

## Lo que no se sabe

No se publican detalles de la arquitectura del bloque recurrente compartido (número de capas, dimensiones, cabezas de atención), hiperparámetros de preentrenamiento (learning rate, batch size, longitud de contexto, tokenizer, mezcla de datos, pasos totales), ni el paso exacto donde se introduce la mezcla de profundidades "tarde". Tampoco se detalla la configuración de post-entrenamiento para Koi-4B (datos de instrucción, RLHF/RLAIF, longitud de contexto final), el hardware y marco de entrenamiento, latencia y throughput reales en inferencia (tokens/s, memoria KV en GB) para 1 y 4 bucles, ni el código de entrenamiento, inferencia, checkpoints y licencias de liberación.
