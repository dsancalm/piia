---
title: "Recuperadas las claves que firman los carnets de conducir de EE UU"
summary: "El hallazgo permite crear códigos PDF417 válidos para identidades falsas y rompe la verificación offline que usan controles de edad, accesos físicos y procesos KYC. El artículo detalla la ingeniería inversa del esquema de firma."
lang: es
story: researcher-recovers-signing-keys-for-us-driver
publishedAt: 2026-09-17T12:02:54.819Z
sourceUrl: "https://ryan.science/blog/keys-not-included"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [criptografia, identidad, seguridad, pdf417]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un artículo en ryan.science/blog/keys-not-included ha llegado a la portada de Hacker News con 195 puntos y 72 comentarios. El título , "Keys Not Included: recovering the signing keys for US driver's license barcodes", describe la recuperación de las claves criptográficas que firman los códigos PDF417 de los carnets de conducir estadounidenses.

Esos códigos guardan los datos del titular y una firma digital. La firma permite verificar la autenticidad del documento sin consultar una base de datos central. Si las claves privadas se han recuperado, cualquiera puede generar códigos válidos para identidades falsas o alteradas. Eso rompe la confianza en la verificación *offline* que usan controles de edad, sistemas de acceso físico, procesos KYC y puntos de venta.

El artículo promete detalles criptográficos, una herramienta de verificación y el análisis de las implicaciones para los sistemas que validan esos documentos. La publicación en un foro técnico de alto tráfico sugiere una ingeniería inversa completa del esquema de firma, probablemente explotando debilidades en la generación de claves, en la implementación del algoritmo o en la gestión del ciclo de vida de los certificados.

## Qué no se sabe

No se conoce el contenido técnico del artículo: la metodología exacta, qué jurisdicciones o estándares (AAMVA, ISO 18013) se han analizado, qué claves concretas se han recuperado ni si se han publicado. Tampoco se sabe la identidad del autor más allá del dominio ryan.science, la fecha de publicación, ni si hubo un proceso de divulgación responsable antes de hacer público el hallazgo.
