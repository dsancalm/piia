---
title: "DeepSeek publica el diseño de DSec, su plataforma para sandboxes de agentes a escala"
summary: "El sistema gestiona 160 nodos, sirve tres millones de sandboxes diarios y soporta picos de 380.000 concurrentes. Desacopla el entrenamiento GPU de los rollouts stateful para reclamar recursos ociosos sin perder continuidad."
lang: es
story: deepseek-runs-3-million-agent-sandboxes-daily
publishedAt: 2026-09-27T12:18:33.057Z
sourceUrl: "https://arxiv.org/abs/2609.22978"
sourceName: "Hacker News (portada)"
priority: flash
tags: [deepseek, dssec, sandbox, rl]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
DeepSeek ha publicado el paper técnico de DSec, su plataforma interna para ejecutar sandboxes de agentes LLM a escala de producción. El sistema gestiona unos 160 nodos por unidad, sirve más de tres millones de sandboxes al día y sostiene picos de 380.000 concurrentes con una tasa de creación superior a 5.000 por segundo. El documento, de 31 páginas y 130 autores, es la versión extendida de un abstract aceptado en la primera ronda de revisión para el track de sistemas operativos de ATC 2026.

La arquitectura expone cuatro backends de ejecución , llamada de función, contenedor, microVM y VM completa, detrás de un SDK unificado. Cada sandbox se compone a partir de capas versionadas de forma independiente: código, dependencias, datos y configuración. 3FS, el sistema de archivos distribuido de clúster desarrollado por DeepSeek, sirve esas capas bajo demanda sin necesidad de precargar imágenes completas. El planificador combina compartición de memoria, reclamación de páginas y colocación CPU para alcanzar densidades que un Kubernetes vanilla con containerd no entrega sin tuning extensivo.

Lo que distingue a DSec de una pila estándar de orquestación es la coordinación nativa con el bucle de refuerzo. El entrenamiento GPU es preemptible y costoso; los rollouts de los agentes son stateful y de latencia variable. DSec desacopla ambas fases: preserva el estado del rollout mientras reclama los recursos GPU ociosos, y vuelve a inyectar el sandbox en el siguiente paso de entrenamiento sin perder continuidad. El paper describe también mecanismos de mitigación de reward hacking integrados en el ciclo de vida del sandbox, aunque no detalla las heurísticas concretas.

La unidad de producción reportada (~160 nodos) no especifica configuración de hardware: ni modelo de GPU, ni cantidad de VRAM, ni topología de red. Tampoco se publican la API del SDK, el formato de las capas de entorno, las políticas de scheduling ni las latencias de cold-start frente a warm-start. El overcommit ratio real de memoria y CPU queda sin cuantificar. El código fuente no está disponible y no hay roadmap público de open-sourcing.

Lo que no se sabe: especificaciones de hardware de los nodos, API y lenguajes del SDK, arquitectura de consistencia y replicación de 3FS, algoritmos exactos de mitigación de reward hacking, ratios de overcommit en producción, latencias de arranque, políticas de placement y affinity, formato de capas, integración con frameworks RL concretos, overhead medido frente a baselines, disponibilidad del código y planes de liberación.
