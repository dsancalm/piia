---
title: "Anthropic lidera el primer EEBench y Grok 4.6 le pisa los talones"
summary: "El nuevo banco obliga a cumplir simulaciones SPICE, reglas eléctricas y tolerancias reales, no solo sintaxis. Opus 5 logra un 61,6 %, Grok 4.6 llega al 57,1 % y GPT-5.5 se queda en el 42,3 %. xAI ya usa el arnés como entorno de refuerzo y anuncia Grok 4.7 para semanas."
lang: es
story: eebench-grades-ai-circuit-designs-with-spice
publishedAt: 2026-09-05T11:02:21.482Z
sourceUrl: "https://eebench.org/blog/can-ai-design-circuit-boards-yet/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [eebench, anthropic, grok, openai]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
EEBench ha publicado la primera versión de su referencia pública y los resultados dibujan un mapa claro: los modelos de Anthropic lideran con diferencia, Grok 4.6 se acerca y los modelos de OpenAI probados hasta ahora quedan por debajo del 43 %. La prueba no pide que el modelo dibuje pistas en un editor gráfico; le entrega una descripción declarativa en atopile y exige que el diseño cumpla simulaciones SPICE deterministas, comprobaciones de reglas eléctricas y restricciones de coste y tolerancias reales.

El banco consta de 13 tareas que cubren analógica y digital. Una de ellas, un medidor de energía residencial, obliga a que el rail protegido aguante por encima de 3,0 V durante 20 ms tras perder la alimentación de 5 V. Una entrega con un condensador nominal de 22 µF X5R 0805 ofrecía solo 11,4 µF efectivos a 4,7 V de polarización, muy lejos de los 545 µF que exige la especificación; el rail caía por debajo de 3 V a los 0,85 ms. El fallo no es sintáctico: la simulación expone la deriva por polarización, la tolerancia del 20 % y la respuesta transitoria real.

```atopile
.ELEC : @STD :: Import { .project &= "electronics" .org &= "atopile" }
.Submission : @type {
  .vin : ELEC :: ElectricPower
  .vhold : ELEC :: ElectricPower
  .vhold.lv ~ .vin.lv
  .c_bank : ELEC :: Capacitor {
    .capacitance &= 22uF +/- 20%
    .max_voltage &= 10V .. 25V
    .temperature_coefficient &= "X5R"
    .package &= "0805"
  }
  .vhold.hv ~> .c_bank ~> .vhold.lv
}
```

Claude Opus 5 marca 61,6 %, Grok 4.6 alcanza 57,1 % (60,0 % con razonamiento *xhigh* según la ficha de xAI) y GPT-5.5 se queda en 42,3 %. GPT-6 Astra, mostrado por OpenAI trabajando en KiCad, aún no ha pasado por el banco. xAI ya usa el arnés de simulación de EEBench como entorno de aprendizaje por refuerzo: cada ejecución fallida devuelve señales de recompensa basadas en límites de tensión, esquinas de operación y eficiencia de coste. Musk ha anunciado Grok 4.7 para dentro de semanas tras entrenar con un gran corpus de datos de SpaceX.

La versión 1 no evalúa layout, fabricabilidad ni puesta en marcha de producto completo. Eso queda para futuras ampliaciones.

### Lo que no se sabe
- Puntuación de GPT-6 Astra en EEBench (no evaluado todavía).
- Si Grok 4.7 saldrá en el plazo anunciado y qué nota obtendrá.
- Detalles completos de las suites de evaluación mayores y los entornos de entrenamiento con simulación que EEBench ofrece a laboratorios punteros.
- Especificaciones exactas de las tareas analógicas más difíciles (p. ej., síntesis de filtro paso-bajo realimentado múltiple).
- Valores de referencia de coste del BOM usados en la calificación.
- Calendario para que EEBench cubra layout, fabricación y bring-up.
