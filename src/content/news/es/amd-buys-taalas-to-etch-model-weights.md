---
title: "AMD compra Taalas para grabar los pesos de los modelos en el silicio"
summary: "AMD adquiere la canadiense Taalas, que fija los pesos de los modelos en el chip durante la fabricación. Su tecnología ofrece inferencia a 16.960 tokens por segundo con Llama 3.1 8B, pero impide actualizar el modelo sin rehacer el chip."
lang: es
story: amd-buys-taalas-to-etch-model-weights
publishedAt: 2026-08-07T07:53:51.152Z
sourceUrl: "https://www.theregister.com/systems/2026/08/06/amd-acquires-ai-chip-startup-taalas-to-boost-inference-performance-by-etching-models-into-silicon/5284344"
sourceName: "Hacker News (portada)"
priority: flash
tags: [amd, taalas, inferencia, silicio]
generatedBy: deepseek/deepseek-v4-flash-0731
---
AMD ha comprado Taalas, la empresa canadiense que graba los pesos de los modelos directamente en el silicio. El anuncio lo ha hecho la propia AMD, que espera cerrar la operación en el cuarto trimestre pendiente de aprobación regulatoria. El plan es integrar la tecnología de Taalas en sus racks Helios, que ya montan aceleradores Instinct, para ofrecer inferencia de modelos concretos a velocidades que hasta ahora no se veían en hardware comercial.

El chip de prueba de Taalas, el HC1, fabricado en el proceso de 6nm de TSMC, sirve el modelo Llama 3.1 8B de Meta a 16.960 tokens por segundo. Cuando se anunció en febrero, eso era 48 veces más rápido que las GPUs de Nvidia y 8,5 veces más rápido que los aceleradores de Cerebras. La segunda generación, HC2, apunta a 20.000 millones de parámetros por chip. Para que te hagas una idea de la escala, Taalas decía que hacen falta 50 de sus aceleradores para servir un modelo de un billón de parámetros, mientras que con Groq necesitarías 2.000 LPUs.

La arquitectura de Taalas combina dos tipos de memoria: una tela de recall de ROM de máscara y otra de SRAM. La primera es donde quedan fijados los pesos, y ahí está el truco y el precio. Un chip con los pesos grabados enmascara el modelo en la fábrica. No se puede actualizar el modelo sin volver a fabricar el chip. Para un despliegue estable, eso puede ser aceptable. Para un equipo que itera cada semana con un fine-tuning nuevo, no tanto.

El coste de ese re-spin no está cuantificado. Tampoco se han revelado los términos económicos de la adquisición, ni los modelos concretos que AMD planea montar sobre esta tecnología. La propia AMD no ha dicho qué clientes tendrán acceso a estos aceleradores ni en qué formato se ofrecerán.

La ventaja de grabar pesos en silicio es doble. Por un lado, la latencia baja porque el modelo no se carga desde memoria externa. Por otro, el coste por token cae: Taalas calculaba que servir un modelo de frontera con su hardware cuesta 100 veces menos que entrenarlo. Eso cambia la ecuación para el test-time scaling, donde el modelo "piensa" más tiempo antes de responder y el coste de inferencia se dispara. Si la inferencia es barata y rápida, puedes permitirte que el modelo genere decenas de miles de tokens de razonamiento antes de dar la respuesta final.

Para quien despliega modelos, la pregunta es si la ganancia de rendimiento compensa la rigidez. Un chip con pesos fijos es un hardware hecho a medida de un modelo concreto. Si el modelo cambia, el chip se queda obsoleto. Eso puede tener sentido para modelos estables que se actualizan poco, pero choca con la práctica habitual de ajustar modelos con frecuencia.

Lo que no se sabe es casi todo lo importante. No se han dado los términos de la compra. No se conocen los detalles completos de cómo funcionan los chips de Taalas más allá de la descripción de sus dos telas de memoria. No se ha especificado qué modelos se desplegarán en los aceleradores basados en esta tecnología. No se sabe cuánto cuesta ni cuánto tarda un re-spin del chip cuando hay que actualizar los pesos. Y el rendimiento real del HC2, con sus 20.000 millones de parámetros, todavía no se ha medido.
