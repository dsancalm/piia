---
title: "Los modelos recursivos generalizan mejor aislando el contexto de cada paso"
summary: "El estudio revela que Chain-of-Thought falla fuera de distribución porque aprende atajos ligados al contexto global. La arquitectura recursiva evita ese sesgo al separar físicamente la información de cada sub-tarea, obligando al modelo a razonar sin pistas espurias."
lang: es
story: recursive-language-models-beat-chain-of-thought
publishedAt: 2026-09-21T13:21:33.401Z
sourceUrl: "https://arxiv.org/abs/2609.20831"
sourceName: "arXiv cs.CL"
priority: routine
tags: [razonamiento, generalizacion, contexto, atajos]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un nuevo trabajo en arXiv muestra que los modelos de lenguaje recursivos (RLM) generalizan mejor fuera de distribución que los que usan Chain-of-Thought (CoT) estándar. La diferencia no está en la arquitectura, sino en cómo se gestiona el contexto durante el razonamiento.

En CoT el modelo genera una traza completa y continua. Eso le permite, en distribución, imitar la regla recursiva con un coste constante frente al método recursivo puro. El problema aparece cuando cambian los tokens que rodean a la sub-tarea actual: el modelo ha aprendido atajos que dependen de ese contexto externo y falla en cuanto esos tokens dejan de ser fiables.

El enfoque recursivo aísla cada sub-tarea en su propio contexto. Al descartar la información ajena, elimina la vía por la que cuelan los atajos espurios. Los autores señalan que, aunque la clase de hipótesis de CoT contiene la regla correcta, el sesgo de simplicidad del entrenamiento prefiere el atajo porque es estadísticamente más fácil de aprender. Cubrir la regla buena no basta; hay que impedir que el modelo tome la mala.

Esto tiene implicaciones directas para quien diseña pipelines de razonamiento modular. Separar físicamente los contextos de cada paso , en llamadas distintas, en módulos independientes o en ventanas de contexto que no se comparten, fuerza al modelo a resolver cada pieza con la información estrictamente necesaria. El artículo no detalla la arquitectura concreta, los datasets OOD usados, las métricas numéricas ni el setup de entrenamiento. Tampoco se sabe si hay código público disponible ni cómo se compara este aislamiento con alternativas como scratchpads o prompting modular.

Lo que queda claro es que, para razonar de verdad y no solo memorizar patrones de entrenamiento, la estructura del contexto importa tanto como la capacidad del modelo.
