---
title: "El método SELR permite razonar en el espacio latente para ahorrar tokens"
summary: "Este nuevo marco evita que el modelo escriba cada paso del razonamiento en texto. Al procesar la lógica internamente, reduces la latencia y el coste de computación sin perder la capacidad de explicar tus resultados cuando lo pidas."
lang: es
story: new-framework-enables-reasoning-within-latent-space
publishedAt: 2026-08-17T07:37:06.103Z
sourceUrl: "https://arxiv.org/abs/2608.13570"
sourceName: "arXiv cs.CL"
priority: urgent
tags: [inteligencia, tecnología, procesamiento]
generatedBy: google/gemma-4-26b-a4b-it:free
---
El método Chain-of-Thought (CoT) tradicional obliga a los modelos de lenguaje a escribir cada paso de su razonamiento en texto. Esto permite al usuario entender cómo se llega a una conclusión, pero consume una gran cantidad de tokens porque el modelo debe generar una cadena de palabras antes de dar la respuesta final. El nuevo marco de Razonamiento Latente Autoexplicable (SELR) propone un enfoque distinto. El modelo realiza el proceso de pensamiento en su espacio latente y solo traduce ese proceso a lenguaje cuando es necesario para explicar el resultado.

Este enfoque utiliza un objetivo de entrenamiento multitarea. El modelo optimiza simultáneamente una pérdida de respuesta (Answer Loss) y una pérdida de cadena de pensamiento (CoT Loss). El resultado es un modelo que razona de forma interna, lo que ahorra recursos de computación, pero mantiene la capacidad de explicar su lógica si se le pide. El diseño se ha validado en modelos de lenguaje (LLMs) y en modelos de lenguaje y visión (VLMs).

## Eficiencia en el espacio latente

La ventaja técnica de SELR es que elimina la necesidad de decodificadores externos o modelos auxiliares para interpretar el pensamiento. Al integrar el razonamiento en el espacio latente, el modelo no gasta tokens de salida en pasos intermedios que no aportan información directa al usuario, a menos que se solicite la explicación. Esto reduce la latencia y el coste de inferencia.

La implementación de SELR permite que el razonamiento sea parte del proceso de generación. Al entrenar al modelo con estas dos funciones de pérdida, el espacio latente aprende a codificar la lógica necesaria para resolver problemas complejos sin expandir cada paso mediante texto legible. El modelo procesa la información de forma más compacta.

No se conoce el rendimiento exacto de SELR frente a los baselines actuales en métricas comparativas ni el contenido específico de la página del proyecto.
