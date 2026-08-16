---
title: "Genera etiquetas nuevas con IA y busca las reales por embeddings"
summary: "Doug Turnbull propone que un modelo invente etiquetas que no existen y luego las compare por embeddings con las tuyas. Así evitas reentrenar un clasificador y solo necesitas un modelo de embeddings y una búsqueda de similitud."
lang: es
story: llm-generated-tags-replace-fixed-categories-on
publishedAt: 2026-08-16T07:10:24.956Z
sourceUrl: "https://simonwillison.net/2026/Aug/14/dont-classify-hallucinate/"
sourceName: "Simon Willison"
priority: urgent
tags: [embeddings, etiquetas, clasificación, ia]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Tienes 1.856 etiquetas en el blog y un montón de artículos antiguos que nunca llegaste a etiquetar. La opción clásica es entrenar un clasificador con las etiquetas que ya tienes y esperar que acierte con las nuevas. Doug Turnbull propone lo contrario en su último post: que el modelo invente etiquetas nuevas y luego busques las existentes que se parezcan más por embeddings.

La idea es sencilla. En lugar de forzar al modelo a elegir entre una lista cerrada de categorías, le pides que genere una etiqueta que no haya visto nunca. Después conviertes esa etiqueta imaginada en un vector y buscas las etiquetas reales de tu blog que tengan el embedding más cercano. Así no necesitas reentrenar nada: solo un modelo de embeddings y una búsqueda de similitud.

El prompt que usa Turnbull para su ejemplo de ecommerce es este:

```
Your task is to create novel, never seen before, furniture, home goods, or hardware classification that best fit a search query.
Product classifications might look like:
Furniture / Living Room Furniture / Coffee Tables & End Tables / Coffee Tables
Décor & Pillows / Decorative Pillows & Blankets / Throw Pillows
Furniture / Bedroom Furniture / Dressers & Chests
Kitchen & Tabletop / Kitchen Organization / Food Storage & Canisters
```

El modelo genera una jerarquía de categorías que no existe en tu sistema. Luego el embedding de esa jerarquía se compara con los embeddings de las 1.856 etiquetas que ya tienes, y te quedas con la más cercana. Si ninguna se acerca lo bastante, la etiqueta generada se queda como candidata nueva.

A Simon Willison le sirve para su caso concreto: tiene años de contenido sin etiquetar y una taxonomía que ha ido creciendo sin plan. Con este método no necesita decidir de antemano qué etiquetas son válidas, el modelo propone y el embedding decide.

Para ti que programas, la ventaja es que no montas un pipeline de clasificación con datos de entrenamiento etiquetados a mano. Solo necesitas un modelo de embeddings que ya tengas o puedas llamar por API, y una búsqueda de similitud vectorial, que en SQLite se resuelve con una extensión como sqlite-vec.

Lo que no se sabe

La fuente no especifica qué modelo de embeddings usa Turnbull ni cómo implementa la búsqueda de similitud. Tampoco indica el umbral de similitud para dar por buena una coincidencia con una etiqueta existente. Y no detalla el proceso para generar las etiquetas imaginadas, por ejemplo si usa una temperatura concreta o un prompt fijo. Son decisiones que tendrás que tomar tú si pruebas la técnica.
