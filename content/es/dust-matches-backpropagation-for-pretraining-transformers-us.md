---
title: "Dust entrena transformers sin backprop y compite en eficiencia con el método estándar"
summary: "El algoritmo perturba activaciones por token con ruido gaussiano y usa la recompensa media para estimar gradientes, logrando alineación con backprop que mejora al escalar población y tamaño de modelo."
lang: es
story: dust-matches-backpropagation-for-pretraining-transformers-us
publishedAt: 2026-10-06T13:35:03.710Z
sourceUrl: "https://qlabs.sh/research/dust"
sourceName: "Hacker News (portada)"
priority: flash
tags: [entrenamiento, transformers, optimizacion, metodo-cero]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Dust es el primer método de orden cero que compite con backpropagation para preentrenar transformers de lenguaje. Perturba las activaciones de cada token de forma independiente, aplicando ruido gaussiano a la salida de cada capa lineal. Cada token actúa como miembro de una población virtual, y una sola pasada forward evalúa a todos en paralelo. La población evita materializar cada miembro, lo que ahorra espacio en pesos. Dust es órdenes de magnitud más eficiente que los métodos ES: desde 1M de tokens, es entre 1000 y 10000 veces más eficiente que EGGROLL.

Los modelos más grandes son más eficientes en población, no menos. Un modelo de 243M supera a uno 120 veces más pequeño. Las estimaciones de gradiente de Dust se alinean mejor con las de backprop a medida que la población crece, y esa alineación se mantiene hasta 1B de tokens. El promedio de los ruidos recompensados estima el error en la salida de la capa. El producto exterior del error estimado con la entrada de la capa es el gradiente de pesos. Las attention internals usan una variante del mismo esquema, con recompensas distintas por tipo de capa.

Dust opera en espacio de activaciones, no en espacio de pesos. Evita interferencia entre módulos perturbados. El paper no intenta que Dust sea compute-eficiente para reemplazar backprop hoy. El objetivo es sentar las bases de un algoritmo de asignación de crédito basado en búsqueda. La filosofía refleja la lección amarga: métodos generales que escalan con compute ganan. AlphaGo Zero es citado como ejemplo de método escalable que superó el bootstrapping.

La no diferenciabilidad puede ser una limitación en regímenes de bajo compute. Dust explora el paisaje de pérdida de manera más flexible que los métodos basados en gradiente. La alineación de gradientes sugiere que Dust puede escalar favorablemente. Los autores dejan para trabajo futuro la eficiencia computacional y nuevos tipos de redes.

No se sabe el número exacto de población virtual, el tamaño de los modelos entrenados, el dataset específico, el tiempo de entrenamiento real o el consumo de compute. No se detalla cómo se calcula la recompensa por token en capas específicas. No se analiza el comportamiento con arquitecturas no transformer. No se compara con otros métodos de orden cero más allá de EGGROLL. No se estudia el impacto de diferentes distribuciones de ruido ni la estabilidad con semillas distintas. No se proporciona código abierto en el texto.
