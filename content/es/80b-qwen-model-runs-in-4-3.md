---
title: "Swiftlet ejecuta un modelo de 80B en 4.3 GB de RAM y llega a portada de Hacker News"
summary: "El proyecto Swiftlet promete ejecutar un modelo de 80 mil millones de parámetros en solo 4.3 GB de RAM en un Mac y un modelo de 35B en un iPhone. La comunidad lo examina con escepticismo porque no detalla el método de compresión ni las velocidades reales."
lang: es
story: 80b-qwen-model-runs-in-4-3
publishedAt: 2026-08-04T11:34:28.314Z
sourceUrl: "https://github.com/leonickson1/Swiftlet"
sourceName: "Hacker News (portada)"
priority: flash
tags: [ia, swiftlet, cuantizacion, local]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Un proyecto llamado Swiftlet ha llegado a la portada de Hacker News con una promesa que, de ser cierta, cambia varias reglas del juego: ejecutar un modelo de 80 mil millones de parámetros en solo 4.3 GB de RAM en un Mac, y un modelo de 35B en un iPhone. Lleva 204 puntos y 90 comentarios, lo que indica que la comunidad lo está examinando con lupa.

La cifra llama la atención porque rompe una barrera mental. Un modelo de 80B en 4.3 GB significa que no necesitas un servidor con 80 GB de VRAM ni siquiera un Mac Studio con mucha memoria unificada. Cualquier portátil con 8 GB de RAM podría cargar el modelo y dejarte espacio para el sistema. Para el iPhone, la cifra de 35B es igual de llamativa: implica que un teléfono actual puede mover un modelo que hasta hace poco se consideraba exclusivo de estaciones de trabajo.

¿Cómo lo consiguen? El repositorio en GitHub (https://github.com/leonickson1/Swiftlet) no detalla el método de cuantización o compresión. Esa es la primera incógnita seria. Si están usando cuantización de 2 bits o menos, la calidad de las respuestas puede degradarse notablemente. Si usan algún tipo de destilación o poda, la precisión también cambia. Sin esos detalles, el titular es una promesa sin verificar.

Para ti, que programas, la relevancia es doble. Primero, el despliegue local: si puedes ejecutar un modelo de 80B en un Mac de gama media, desaparece la necesidad de depender de APIs externas para muchas tareas. Segundo, el móvil: un modelo de 35B en iPhone abre la puerta a aplicaciones offline de procesamiento de lenguaje natural serias, sin conexión y sin enviar datos a ningún servidor.

Pero antes de planificar tu próxima app, hay datos que faltan y son esenciales. No se especifica qué versión exacta de Qwen se usa, si es Qwen2.5 o Qwen3, y eso importa porque las capacidades y los requisitos varían. Tampoco se indica qué modelo de Mac o iPhone es necesario. Ejecutar un 35B en un iPhone 15 Pro Max no es lo mismo que en un iPhone SE de segunda generación. Y la pregunta que todos hacen en los comentarios: ¿a qué velocidad? Sin tokens por segundo, no sabes si el modelo es usable en tiempo real o si tarda dos minutos en responder una pregunta simple.

El proyecto existe, el titular es concreto, pero la documentación no acompaña. Prueba a clonar el repositorio y a medir por ti mismo antes de cambiar tu arquitectura.
