---
title: "Thibaud Colas programa un mes con GLM 5.3 Flash y cambia de modelo por saturación"
summary: "El mantenedor de Wagtail consumió 2.000 millones de tokens en septiembre; la primera quincena costó 68 dólares y 4 kWh, pero un prototipo MCP disparó el gasto a 35 kWh totales. La falta de capacidad en los proveedores de GLM forzó el cambio a DeepSeek y Qwen a mitad de mes."
lang: es
story: wagtail-core-developer-runs-month-long-coding
publishedAt: 2026-10-03T11:54:01.453Z
sourceUrl: "https://wagtail.org/blog/one-month-on-glm-53-flash/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [wagtail, glm, ia, energia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Thibaud Colas, mantenedor principal de Wagtail, se propuso programar todo septiembre usando exclusivamente GLM 5.3 Flash. El experimento duró un mes, generó 2.000 millones de tokens y terminó a medias: la primera quincena se completó con el modelo elegido, pero la segunda obligó a cambiar a DeepSeek V4.1 Flash y Qwen 3.8 Flash por problemas de capacidad en los proveedores.

GLM 5.3 Flash ofrece ventana de contexto de un millón de tokens, soporte de visión y alojamiento en centros de datos europeos. En la primera mitad el consumo fue de 1.000 millones de tokens, 68 dólares, unos 4 kWh y 365 gramos de CO₂. El objetivo era mantenerse cerca de 10 kWh totales; la realidad cerró en 35 kWh. La diferencia la explica un prototipo de servidor MCP para Wagtail construido por "vibe coding": 450 millones de tokens, 150 dólares y 5 kWh en una sola noche. El autor estima que con más ingeniería de prompts y menos iteraciones ciegas el mismo resultado habría costado cinco veces menos.

La infraestructura es el cuello de botella real. Los proveedores que alojan GLM 5.3 Flash son populares y no tienen la capacidad de reserva de los grandes laboratorios. Cuando la demanda sube, la latencia se dispara o el servicio devuelve errores, y no hay failover automático configurado. Eso forzó el cambio de modelo a mitad de mes y distorsionó las métricas de coste y energía.

Para octubre el plan incluye medición local continua, presupuestos duros para experimentación, mejores patrones multi-agente y foco en modelos flash-tier eficientes. El autor distingue ya entre uso en producción diaria e I+D, y quiere contabilizarlos por separado.

---

### Lo que no se sabe

- Desglose exacto de tokens por modelo en la segunda mitad (DeepSeek V4.1 Flash, Qwen 3.8 Flash, otros).
- Detalles del benchmark interno de Wagtail mencionado (métricas, modelos comparados, resultados).
- Qué *agent skills* y prototipo CLI se están desarrollando y su estado actual.
- Coste y energía de los modelos alternativos usados tras el cambio.
- Definición precisa de "day-to-day production" frente a "R&D" en la contabilidad de tokens.
- Fecha y formato exacto de Wagtail Space 2026.
