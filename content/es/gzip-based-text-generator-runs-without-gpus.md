---
title: "Un compresor gzip genera texto shakespeariano sin redes neuronales"
summary: "La herramienta gzipt usa zlib y búsqueda de haz para predecir el siguiente byte midiendo cuánto crece el archivo comprimido. Sin GPU ni parámetros aprendidos, produce diálogos con sintaxis y puntuación teatrales, demostrando que la compresión encapsula probabilidades del..."
lang: es
story: gzip-based-text-generator-runs-without-gpus
publishedAt: 2026-09-22T12:18:51.178Z
sourceUrl: "https://nathan.rs/posts/gzip-lm/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [compresion, modelado, gzip, shakespeare]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
La compresión de datos no solo reduce el tamaño; también predice. Un algoritmo como gzip, que no aprende parámetros ni usa redes neuronales, puede actuar como modelo de lenguaje si se le permite "elegir" qué continuación hace que el archivo resultante sea más pequeño. Esa idea, ya teorizada en el artículo *Language Modeling is Compression*, se acaba de demostrar en la práctica con una herramienta llamada gzipt.

gzipt es un único archivo Python que usa solo la biblioteca estándar zlib. Primero precomprime un corpus, como el pequeño Shakespeare, y luego, dado un prompt, genera texto byte a byte. Cada candidato a siguiente byte se evalúa midiendo cuánto aumenta el tamaño del archivo al añadirlo al contexto. Menor tamaño significa mayor probabilidad implícita. Para evitar que el modelo se repita literalmente, el contexto de puntuación no es todo el historial, sino solo la última ventana de 32 KiB del corpus más la cola reciente del texto ya generado.

La clave del salto de calidad respecto a intentos anteriores está en la búsqueda de haz. En lugar de escoger siempre el mejor byte, mantiene varias opciones simultáneas (beam) y explora horizontes de bytes futuros (horizon). Esto evita que decisiones locales óptimas conduzcan a resultados globales ruidosos, algo que ocurría cuando se usaban longitudes enteras como puntuación directa.

Para probarlo, se ejecuta:

```bash
gzipt --corpus data/tinyshakespeare.txt --prompt $'MENENIUS:\n' --length 200
```

La salida obtenida es:

```
MENENIUS: 'Though all at once canq MARCIUS: Pray now, nocamest thou to a morsel . LARTIUS: Hence, and I' the end admire, where G again; and after it ag .
```

Aunque no alcanza coherencia semántica perfecta, muestra estructura sintáctica, puntuación y repeticiones temáticas propias del teatro shakespeariano. El modelo no entiende el significado, pero la ventana deslizante de DEFLATE captura patrones locales tan fuertes que la búsqueda de haz logra simular fluidez.

Este enfoque sirve para establecer baselines sin GPU, en dispositivos edge o para enseñar que la compresión es una forma de modelado de probabilidad. No sustituye a un transformer, pero revela que la información estadística del lenguaje ya está encapsulada en algoritmos de compresión estándar.

Lo que no se sabe: los valores exactos de beam_width y horizon usados, si hay métricas formales de calidad como perplexity o BLEU, el tiempo de inferencia por token, si se probó con otros corpus o idiomas, y cómo afecta la temperatura al muestreo. Tampoco se ha evaluado si este método escala a lenguaje natural moderno más diverso que el Shakespeare.
