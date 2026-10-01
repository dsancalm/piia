---
title: "Google presenta Gemini 4 Argon con ventana de contexto de 1 millón de tokens"
summary: "El modelo migra 800.000 líneas de C++ a Rust en el kernel Zircon y libera 300 TiB de memoria. Lidera benchmarks de ingeniería, vídeo y ciberseguridad, donde detecta fallos críticos que otros modelos no ven."
lang: es
story: google-reveals-gemini-4-argon-with-1m
publishedAt: 2026-10-01T13:41:40.501Z
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [google, gemini, ia, ciberseguridad]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google ha presentado Gemini 4 Argon, su nuevo modelo frontera orientado a tareas profesionales complejas y de largo horizonte. La característica técnica más destacada es una ventana de contexto de 1 millón de tokens, tanto de entrada como de salida, que permite razonamiento profundo en problemas de múltiples pasos sin fragmentar la información.

El modelo está demostrando capacidades concretas en ingeniería de software y ciberseguridad. Internamente, miles de empleados de Google lo usan para migración de código C/C++ a Rust: 800.000 líneas en el kernel Zircon de Fuchsia, 32.000 líneas de código SIMD en libgav1 reemplazadas por un decodificador seguro en memoria que resulta 2,7 veces más rápido que la versión Rust anterior, y optimizaciones que ya han liberado 300 TiB de memoria con una proyección de 500 TiB a 1 PiB totales. En investigación cuántica, Argon mejora un 40 % los *baselines* publicados en optimización algorítmica, resolviendo problemas en minutos.

En benchmarks públicos, fija nuevos récords: 77,9 % en DeepSWE v1.1 (ingeniería de software), 51,3 % en AutomationBench (automatización de tareas), 91,7 % en LVBench (comprensión de video largo) y 68 % en CWE-bench v1 (vulnerabilidades), empatando en primera posición. El índice Vals, que mide impacto económico en finanzas, código, legal y fiscal, lo sitúa en cabeza.

En ciberseguridad, Argon encuentra, valida y parchea vulnerabilidades críticas de forma autónoma. Wiz lo emplea en su iniciativa Scan for Good y ha descubierto un fallo crítico en software sanitario que otros modelos frontera no detectaron. Supera a 3.8 Flash Cyber en pruebas de penetración *black-box* de Wiz y lidera en robustez ante inyección de prompt indirecta según el benchmark de Gray Swan.

El acceso actual es restrictivo: se despliega a defensores de confianza mediante el programa Fairwind y a través del proceso voluntario del gobierno de EE. UU. Google prioriza pruebas de seguridad rigurosas antes de una apertura pública. Cuatro áreas de salvaguarda se refuerzan: defensa contra uso indebido, inyección de prompt, monitorización de desalineamiento y *safety testing*.

Para quien evalúe migración o uso en producción, los precios introductorios son 2 $ por millón de tokens de entrada y 10 $ por millón de tokens de salida, con un 95 % de descuento en tokens de entrada en caché. El modelo cubre 20 lenguajes de programación en su benchmark interno de vulnerabilidades.

Lo que no se sabe: fecha exacta de disponibilidad pública, detalles de los *guardrails* finales, lista completa de *red teams* externos, cronograma de expansión más allá de Fairwind, arquitectura detrás del millón de tokens, *pricing* definitivo para consumidores, hoja de ruta de integración en productos de Google y resultados detallados de *red teaming* en curso.
