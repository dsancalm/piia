---
title: "Reflection.ai publica Beam, un modelo MoE de 501B con 23B activos"
summary: "Reflection.ai detalla Beam, un modelo de mezcla de expertos disperso con 501 000 millones de parámetros y 23 000 millones activos por paso. Promete liberar pesos, model card y artefactos en octubre de 2026. Acceso anticipado por registro."
lang: es
story: reflection-ai-releases-beam-a-501b-sparse
publishedAt: 2026-10-06T13:33:01.138Z
sourceUrl: "https://reflection.ai/blog/introducing-beam"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ia, modelos, mixture-of-experts, reflectionai]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Reflection.ai ha publicado los detalles técnicos de Beam, un modelo Mixture-of-Experts disperso con 501 000 millones de parámetros totales y 23 000 millones activos. El anuncio incluye un informe técnico y la promesa de liberar los pesos, la model card y los artefactos de desarrollo durante octubre de 2026. El acceso anticipado ya está abierto mediante registro.

La arquitectura MoE permite que solo una fracción de los parámetros participe en cada *forward pass*. En la práctica, esto sitúa la huella de inferencia de Beam en el rango de un modelo denso de 23 B, con el consiguiente ahorro de VRAM y coste por token. Según los datos de Reflection, Beam consume entre 3 y 4 veces menos cómputo de inferencia que GLM‑5.2, y la ventaja se amplía frente a modelos de 2 billones de parámetros como Qwen 3.8‑Max.

El *pretraining* procesó 23,8 billones de tokens procedentes de la web y de datasets propietarios licenciados. La fase de refuerzo (RL) duró cuatro semanas sobre 10 500 GPUs NVIDIA GB300 y generó más de 100 millones de *rollouts*. Para entrenar y evaluar al modelo se emplearon aproximadamente 1 300 millones de *sandboxes* y 1 millón de entornos de coding, tareas agenticas y STEM de alta calidad. El contexto máximo durante RL alcanzó 256 000 tokens.

El entrenamiento de RL utilizó *policy gradients* asíncronos. Los autores describen algoritmos propios para mantener la estabilidad con *staleness* de hasta un día, lo que equivale a 107 versiones de pesos conviviendo en el clúster. La penalización de longitud se ajustó dinámicamente: al principio se redujo la longitud media de respuesta y mejoró el rendimiento; después se permitió que creciera para cubrir tareas más exigentes.

En benchmarks de coding y agentes, Beam alcanza 80,9 en SWEBench Verified, 77,2 en SWE Bench Pro v2‑Hard, 80,1 en Terminal Bench v2.1 y 78,0 en SWEBench Multilingual. En razonamiento puro obtiene 97,8 en AIME 2026, 90,5 en GPQA Diamond y 49,7 en SciCode. En uso de herramientas y búsqueda destaca con 78,7 en MCP Atlas, 77,4 en BrowseComp (con gestión de contexto) y 80,1 en DeepSearchQA. Los autores señalan que el modelo generalizó a navegación web y uso de APIs de OCR sin haber visto tareas de *browsing* durante la mezcla de RL.

Reflection posiciona a Beam como competitivo con GLM 5.2 y cercano a Qwen 3.8‑Max en capacidades agenticas y de código, mientras que Kimi K3 mantiene ventaja en capacidad bruta. La eficiencia de inferencia es el argumento principal para quien quiera autoalojar un modelo *frontier* sin depender de APIs cerradas.

## Qué no se sabe

- Licencia exacta del modelo (open‑weight no implica necesariamente open‑source).
- Requisitos de hardware concretos para inferencia práctica: VRAM mínima, cuantizaciones soportadas, *backends* validados (vLLM, SGLang, Ollama, Hugging Face).
- Coste de API gestionada, si la hubiera, y coste real de *self‑hosting*.
- Detalles de la arquitectura MoE: número de expertos, *top‑k*, expertos compartidos.
- Tokenizador, vocabulario y corte temporal de los datos de *pretraining*.
- Hiperparámetros de RL: *learning rate*, *batch size*, algoritmo exacto (PPO, GRPO, otro).
- Resultados en benchmarks de seguridad y *alignment* (red‑teaming en curso).
- Soporte oficial para *fine‑tuning*, LoRA o *continued pretraining*.
- Política de uso comercial y restricciones de redistribución.
- Métricas de latencia y *throughput* reales en serving, más allá de estimaciones de FLOPs.
- Fecha exacta de liberación de los pesos y artefactos (solo «later this month»).
