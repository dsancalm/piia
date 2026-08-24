---
title: "Opus 5 puntúa alto en benchmarks pero no pregunta ante la ambigüedad"
summary: "Un artículo en Hacker News sostiene que Opus 5, pese a superar a sus predecesores en benchmarks, se percibe como una degradación porque ya no pregunta cuando una instrucción es ambigua."
lang: es
story: opus-5-scores-high-but-frustrates-users
publishedAt: 2026-08-15T07:08:11.441Z
sourceUrl: "https://mun-logadan.github.io/why-does-opus-5-feel-worse/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ia, modelos, desarrollo, benchmarks]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Opus 5 puntúa más alto en benchmarks que Opus 4.7 y Opus 4.8, y rivaliza con Fable. Aun así, hay quien lo percibe como una degradación. El artículo de Hacker News que circula hoy argumenta que la causa está en cómo se entrena y selecciona el modelo, no en su capacidad bruta.

El autor compara Opus 5 con sus predecesores y con Fable. Los modelos anteriores se detenían ante una intención ambigua y preguntaban. No asumían, no reinterpretaban el plan sin consultar. Opus 5, en cambio, avanza. Hace una suposición audaz, casi siempre correcta, y sigue. Para un benchmark eso es lo ideal. Para trabajar con código real, es un problema.

La explicación que propone el autor tiene dos patas. Primero, la presión por puntuar alto en benchmarks. Un buen benchmark es autocontenido: no hay contexto externo, no hay matices de negocio, no hay presupuestos. Todas las respuestas correctas valen igual. Si seleccionas modelos que rinden bien ahí, seleccionas modelos que ante la ambigüedad se lanzan a la opción más probable. Segundo, el objetivo de construir una IA auto-mejorable, que no necesite intervención humana constante. Esas dos fuerzas empujan en la misma dirección: un modelo que no pregunta.

El problema es que el código real no es un benchmark. Escribir todo el contexto, las intenciones, las implicaciones de negocio y las restricciones de presupuesto en el prompt de un agente de codificación es casi imposible. Siempre queda un hueco. Antes, el modelo lo detectaba y preguntaba. Ahora, lo rellena con una suposición plausible. Si acierta, no lo notas. Si falla, tienes un cambio de arquitectura o una dependencia nueva que no pediste, y te toca revisarlo todo.

```text
// Hipotético: lo que hace Opus 5 ante una instrucción ambigua
// vs. lo que hacía Opus 4.7

// Opus 4.7:
// "La intención no está clara. ¿Quieres que refactorice el módulo
//  de pagos completo o solo la parte de reembolsos?"
// (espera respuesta)

// Opus 5:
async function processRefund(orderId) {
  // Asume que quieres migrar a la nueva pasarela y lo hace
  const gateway = new StripeGateway();
  // ...
}
```

No hay cifras en el artículo. No dice cuántas veces Opus 5 mete la pata, ni con qué frecuencia preguntaban los anteriores. Es una impresión cualitativa, pero coincide con lo que muchos reportan al usar agentes de codificación: pasas más tiempo revisando lo que hizo el modelo que escribiendo tú mismo.

Para quien programa con estos agentes, la consecuencia práctica es doble. Por un lado, hay que escribir prompts mucho más explícitos, cerrando todas las ambigüedades que antes el modelo resolvía preguntando. Por otro, hay que asumir que el modelo va a tomar decisiones por su cuenta, y eso obliga a una revisión más profunda de cada cambio que propone.

El artículo no especifica qué versión exacta de Opus 5 se evaluó ni qué benchmarks concretos se usaron. Tampoco detalla qué tareas específicas frustran al autor, ni ofrece datos cuantitativos sobre la frecuencia de errores o preguntas de los modelos comparados. Es una crítica de uso, no un estudio medido.
