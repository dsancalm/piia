---
title: "ClawLoop entrena agentes autónomos en bucle cerrado sin modelo docente"
summary: "El marco de entrenamiento elimina la necesidad de un modelo externo: el propio agente genera datos de entrenamiento ejecutando tareas reales, aprende de sus errores y usa ese diagnóstico para proponer tareas más difíciles en la siguiente iteración."
lang: es
story: clawloop-trains-agents-in-a-sandbox-without
publishedAt: 2026-10-15T11:58:55.224Z
sourceUrl: "https://arxiv.org/abs/2610.14118"
sourceName: "arXiv cs.AI"
priority: routine
tags: [agentes, aprendizaje, entrenamiento, autónomos]
generatedBy: dots-studio/dots-3-note-preview:free
---
ClawLoop propone un bucle de entrenamiento cerrado para agentes que operan dentro de un entorno con acceso a sistema de archivos y shell. El marco elimina la necesidad de un modelo docente externo: el propio agente genera los datos de entrenamiento ejecutando tareas reales, aprende de sus errores y usa ese diagnóstico para proponer tareas más difíciles en la siguiente iteración.

El bucle tiene tres fases. En la síntesis de tareas, dos rutinas complementarias construyen el currículo: una aumenta la dificultad condicionada al diagnóstico previo y la otra valida las tareas tanto sin agente como con el agente actual. En la fase de entrenamiento, el modelo , Qwen3.6-27B en los experimentos, se ajusta mediante *fine-tuning* supervisado (SFT) y/o aprendizaje por refuerzo (RL). En la fase de diagnóstico, se analizan los *rollouts* del agente para producir un informe de capacidades que retroalimenta la síntesis de la siguiente vuelta.

Los autores evalúan en SkillsBench, Claw-Eval-Live y ClawGym-Bench reportando mejoras consistentes. Además, las tareas refinadas iterativamente se transfieren a modelos más pequeños , Qwen3.5-4B y Qwen3.5-9B, con ganancias en todos los benchmarks, lo que sugiere que la calidad de los datos generados es independiente del modelo de bucle utilizado.

## Lo que no se sabe

No se publican las métricas numéricas exactas por iteración (accuracy, *pass rate*, recompensa), el número de vueltas del bucle ni el criterio de parada. Tampoco se detallan las dos rutinas de construcción de tareas, la configuración de hiperparámetros de SFT y RL (*learning rate*, *batch size*, épocas, algoritmo RL), el tamaño y diversidad del *pool* de tareas por iteración, la composición concreta de ClawGym-Bench y Claw-Eval-Live, el coste computacional por vuelta ni si el código, datos y *checkpoints* serán liberados (el listado muestra enlaces a Hugging Face y DagsHub sin confirmar disponibilidad).
