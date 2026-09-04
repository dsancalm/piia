---
title: "IFM publica K2 Horizon, seis modelos abiertos de 0,9 B a 375 B parámetros"
summary: "La familia comparte arquitectura, vocabulario y metodología, e incluye el ciclo de vida completo de entrenamiento. El modelo de 36 B estrena atención dispersa MoVA y el mayor, 375B‑A23B, usa mezcla de expertos con 23 B activos. Licencia Apache 2.0 para pesos y código."
lang: es
story: ifm-releases-k2-horizon-fleet-of-six
publishedAt: 2026-09-04T11:52:12.475Z
sourceUrl: "https://ifm.ai/blog/k2/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [modelos, abiertos, ifm, moe]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
IFM ha publicado K2 Horizon, una familia de seis modelos abiertos que cubren desde 0,9 B hasta 375 B parámetros totales. Los tres más pequeños , 0,9 B, 3,7 B y 7 B, marcan un nuevo estado del arte en sus respectivas escalas. El modelo de 36 B introduce Mixture‑of‑Value‑Attention (MoVA), un mecanismo de atención dispersa que activa unos 4 B parámetros por token. El mayor, 375B‑A23B, es una mezcla de expertos dispersa con 375 B totales y 23 B activos por token. Todos comparten arquitectura base, vocabulario (salvo el 0,9 B, que usa uno reducido), metodología de entrenamiento, interfaces, evaluación y tooling de despliegue. La licencia es Apache 2.0 para pesos y código; los datasets se distribuyen bajo sus licencias originales (por ejemplo ODC‑BY) y se publican las recetas de construcción cuando no es posible redistribuir los datos.

La liberación incluye el ciclo de vida completo: datos o recetas, código de entrenamiento, configuraciones, checkpoints intermedios, logs detallados, resultados de evaluación y pesos finales. Es la primera familia abierta que expone el proceso entero de post‑entrenamiento agente con ese nivel de granularidad. Los seis modelos admiten cuantización y están pensados para desplegarse desde edge (el 0,9 B cabe en relojes y gafas) hasta entornos enterprise (el 375B‑A23B).

La flota se presenta como una arquitectura de referencia para sistemas multi‑modelo en producción: un enrutador decide dinámicamente qué tamaño atiende cada petición según latencia, coste y calidad requerida. En la fuente aparecen dos utilidades de línea de comandos que forman parte del tooling:

```bash
harbor analyze
reward_hacking
```

`harbor analyze` inspecciona métricas de inferencia y salud del clúster; `reward_hacking` detecta y mitiga explotación de la función de recompensa durante el entrenamiento por refuerzo.

## Lo que no se sabe

- Puntajes exactos en SWE‑bench, BrowseComp, SWE‑Atlas‑QnA, WildClawBench, Apex‑Agents, GDPVal‑AA y TerminalBench para cada modelo.
- Detalles completos de la arquitectura MoVA más allá de «atención dispersa + MoE feed‑forward».
- Composición exacta de las mezclas de datos de preentrenamiento y post‑entrenamiento.
- Hardware, FLOPs, GPU‑hours y coste energético del entrenamiento.
- Recetas concretas de construcción de datos cuando no se pueden redistribuir.
- Configuraciones de cuantización soportadas (bits, formatos, calibración).
- Tooling de despliegue incluido (formatos, runtimes, orquestación).
- Algoritmo exacto de enrutamiento dinámico entre tamaños en la flota conectada.
- Disponibilidad real de checkpoints intermedios y logs en repositorios (Hugging Face, GitHub, etc.).
- Comparativa numérica frente a modelos cerrados de referencia (GPT‑5, Claude, etc.).
