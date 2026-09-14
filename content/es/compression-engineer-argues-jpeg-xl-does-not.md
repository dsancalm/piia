---
title: "Ingeniero de AVIF rechaza JPEG XL por resolver problemas inexistentes en la web"
summary: "Un codificador de compresión explica que JPEG XL no compite en pérdida, donde reside casi todo el tráfico web. AVIF supera en perceptualidad y el formato solo gana en sin pérdida, un caso negligible. Además, le faltan herramientas clave como IntraBC y DLF."
lang: es
story: compression-engineer-argues-jpeg-xl-does-not
publishedAt: 2026-09-14T13:44:23.136Z
sourceUrl: "https://giannirosato.com/blog/post/case-against-jxl/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [jpegxl, avif, compresion, webp]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un ingeniero de compresión que ha contribuido al desarrollo de AVIF explica por qué no piensa añadir soporte para JPEG XL a su codificador. El argumento principal: el formato resuelve problemas que apenas existen en la web y deja de lado el caso mayoritario, que es la compresión con pérdida.

Por volumen de tráfico, casi todo lo que se sirve en la web es *lossy*. En ese régimen, JPEG XL no es competitivo. Métricas perceptuales como CVVDP, MS-SSIM y SSIMULACRA2 muestran diferencias claras frente a codificadores AVIF modernos (libaom, SVT-AV1) que ya incorporan *tuning* perceptual basado en ensayos subjetivos controlados. El codificador de referencia, libjxl, arrastra problemas perceptuales sin resolver y cuantiza agresivamente el canal B de su espacio XYB, lo que degrada la fidelidad del color.

La única ventaja medida está en *lossless*: alrededor de un 11,9 % menos bytes que WebP en un corpus de 157 MP de fotos, 10 MP de ilustraciones y 27 MP de libros. El autor califica ese corpus de irreal para la web y señala que el ahorro afecta a una fracción mínima del tráfico real.

A nivel de herramientas de codificación, JPEG XL carece de predicción direccional, filtrado de desbloqueo en bucle (DLF) e *Intra Block Copy* (IntraBC). Sus sustitutos , gaborish, EPF y *patches*, no son equivalentes completos. El esquema de *patches* exige habilitarse explícitamente por debajo de *effort* 7 por rendimiento y añade *overhead* de cabecera, *crop*, *blend*, entrada en diccionario, coordenadas y frame residual, frente a la integración nativa de IntraBC en AV1.

La especificación soporta hasta 4096 canales, profundidad arbitraria, decodificación progresiva y recompresión JPEG. La mayoría de esas características no tienen demanda amplia en navegadores; AVIF ya cubre renderizado progresivo y HDR con 10 bit.

```rust
aperture-alpha
```

El fragmento anterior es el nombre en clave del codificador del autor; no hay código público asociado en la fuente.

Lo que no se sabe: fecha exacta de llegada del decodificador Rust a Firefox y Chrome; cifras numéricas concretas de CVVDP, MS-SSIM y SSIMULACRA2 para JPEG XL frente a AVIF optimizado; detalles técnicos de *aperture-alpha* más allá del nombre; *overhead* exacto en bits de *patches* versus IntraBC en casos web típicos; si Google, Mozilla o Apple han revertido su postura oficial tras el decodificador Rust; rendimiento de decodificación (velocidad, memoria) de JPEG XL versus AVIF/WebP en hardware de cliente 2026.
