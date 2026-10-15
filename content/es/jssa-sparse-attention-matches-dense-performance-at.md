---
title: "JSSA acelera la decodificación 6,4 veces sin reentrenar el modelo"
summary: "El método aprende un subespacio compartido entre queries y keys que preserva las puntuaciones de atención token a token. Se resuelve en forma cerrada con descomposición espectral y funciona como drop-in en arquitecturas GQA, híbridas y MLA."
lang: es
story: jssa-sparse-attention-matches-dense-performance-at
publishedAt: 2026-10-15T11:57:17.066Z
sourceUrl: "https://arxiv.org/abs/2610.19026"
sourceName: "arXiv cs.CL"
priority: routine
tags: [atencion, kv-cache, transformer, inferencia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Joint Subspace Sparse Attention (JSSA) propone una forma de reducir el tráfico de la KV-cache durante la decodificación de contextos largos sin reentrenar el modelo. La idea central es aprender un subespacio compartido de baja dimensión entre queries y keys que preserve las puntuaciones de atención token a token. El problema original no es convexo, pero los autores lo acotan con un objetivo marginal que se resuelve en forma cerrada mediante descomposición espectral. En los experimentos, refinar directamente el objetivo exacto no mejoró los resultados.

La implementación se apoya en un kernel de atención indexada a nivel de token que evita operaciones *gather* y permite selecciones distintas por cabeza bajo el layout estándar de Grouped-Query Attention (GQA). Esto hace que JSSA funcione como *drop-in* en arquitecturas Transformer ya entrenadas: modelos GQA estándar, híbridos con ventana deslizante y atención global, y Multi-head Latent Attention (MLA).

En una GPU NVIDIA B200 con contexto de 128K tokens, JSSA alcanza 6.43 veces el *throughput* de decodificación de la atención densa completa. En modelos de hasta 700B parámetros, la precisión de razonamiento se mantiene comparable a la atención densa nativa (DSA) sin reentrenamiento, y el *throughput* llega al 96-99% del que ofrece esa DSA nativa. El método evita la inflación de longitud de generación y los fallos dependientes de arquitectura que presentan otros enfoques de atención dispersa.

## Lo que no se sabe

- Qué modelos concretos (nombres, tamaños exactos) se evaluaron más allá de la mención genérica de 700B.
- Cuál fue el ratio de esparsidad o presupuesto de tokens seleccionados en cada experimento.
- Detalles de implementación del kernel indexado (lenguaje, librerías, si será código abierto).
- Métricas exactas de *perplexity* o benchmarks de razonamiento frente a atención completa.
- Consumo de memoria de la KV-cache y comparación cuantitativa con baselines.
- Latencia de *prefill* y *overhead* de la selección de tokens en JSSA.
- Disponibilidad pública del código y pesos, y bajo qué licencia.
