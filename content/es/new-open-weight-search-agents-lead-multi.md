---
title: "Publicados los pesos y la receta de Iris, agentes de búsqueda MoE que baten récords"
summary: "Dos modelos abiertos, Iris-mini y Iris-pro, logran resultados de vanguardia en benchmarks multi-hop usando solo un agente ReAct. El avance viene de un pipeline de datos que convierte hipervínculos web en trayectorias de razonamiento y filtra preguntas que un modelo falla..."
lang: es
story: new-open-weight-search-agents-lead-multi
publishedAt: 2026-09-07T12:58:15.466Z
sourceUrl: "https://arxiv.org/abs/2609.04304"
sourceName: "arXiv cs.AI"
priority: urgent
tags: [ia, busqueda, moe, open-source]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Dos equipos de investigación acaban de publicar los pesos y la receta completa de Iris, una familia de agentes de búsqueda que alcanza resultados de vanguardia en *benchmarks* multi-hop sin usar sub-agentes, verificación en *test-time* ni ensambles. Los modelos son Iris-mini (35B totales, 3B activos) e Iris-pro (397B totales, 17B activos), ambos basados en arquitectura MoE. Con la gestión de contexto activada en inferencia, Iris-mini marca 82.2 en BrowseComp, 84.8 en BrowseComp-ZH, 86.9 en DeepSearchQA y 52.3 en HLE. Iris-pro sube a 88.6, 85.1, 92.9 y 56.4 respectivamente.

El motor del avance no es la arquitectura sino el *pipeline* de datos. Parten de un corpus web y explotan su estructura de hipervínculos para generar trayectorias de navegación reales. Cada salto entre páginas se convierte en un paso de razonamiento. Para evitar que el modelo aprenda a hacer coincidencia de cadenas en lugar de razonar, reescriben las entidades que no son la respuesta final como referencias descriptivas. Solo conservan preguntas que un modelo de referencia falla en libro cerrado pero resuelve cuando se le da la evidencia de apoyo. Eso filtra el ruido y fuerza al agente a usar la herramienta de búsqueda.

El entrenamiento alterna dos fases en un bucle al que llaman SFT-RL climbing. Primero, filtran trayectorias completas y turnos individuales con un juez de recompensa y un resumidor de observaciones que corren dentro del propio clúster de entrenamiento. Esa limpieza produce datos de SFT de alta calidad. Segundo, lanzan RL contra búsqueda en vivo. Los *rollouts* que se alargan demasiado se interrumpen a nivel de petición y se reanudan desde su prefijo comprometido en el siguiente paso de entrenamiento, evitando desperdicio de cómputo. La evaluación final usa un único agente ReAct con herramientas, límite de contexto y juez fijos, midiendo cada *benchmark* con y sin gestión de contexto.

## Lo que no se sabe

- Arquitectura MoE concreta: número de capas, cabezas, dimensión oculta o criterio de enrutamiento más allá de la notación total-activos.
- Detalles del corpus semilla y criterios exactos de filtrado de entidades e hipervínculos.
- Identidad del modelo de referencia usado para el filtro *closed-book* vs. con evidencia.
- Hiperparámetros de SFT (*learning rate*, *batch size*, *epochs*, longitud de contexto) y de RL (algoritmo, *kl-coef*, *reward shaping*, pasos).
- Umbral de interrupción de *rollouts* largos y mecanismo exacto de reanudación del prefijo comprometido.
- Implementación de la gestión de contexto en inferencia: política de poda, resumen o ventana deslizante.
- División *train/val/test* y posible contaminación con los *benchmarks* reportados.
- Fecha y licencia de la liberación prometida de pesos, datos y código.
