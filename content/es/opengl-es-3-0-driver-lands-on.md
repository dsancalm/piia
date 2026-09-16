---
title: "Publicado controlador OpenGL ES 3.0 para GPU Apple M4 y A18 Pro tras un mes de"
summary: "Cody Ho y Niklas logran ejecutar Chrome, Firefox y Minecraft a 200 fps usando solo trazas de hardware capturadas con hipervisor propio, sin tocar binarios de Apple. La ABI del firmware RTKit duplica estructuras y punteros respecto a chips anteriores."
lang: es
story: opengl-es-3-0-driver-lands-on
publishedAt: 2026-09-16T12:08:41.194Z
sourceUrl: "https://codyho.dev/blog/gpu-driver/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [linux, gpu, apple, ingenieria-inversa]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cody Ho y Niklas han publicado un controlador GPU OpenGL ES 3.0 conforme para el M4 Mac Mini y el MacBook Neo (A18 Pro). El desarrollo ha llevado aproximadamente un mes. El código permite ejecutar Chrome y Firefox con WebGL y composición funcional, y alcanza 200 fps en Minecraft. El trabajo se ha hecho en "clean room": la ingeniería inversa parte exclusivamente de trazas de hardware capturadas con un hipervisor propio, sin examinar binarios de Apple.

La GPU (AGX) ejecuta su firmware sobre RTKit, un RTOS personalizado, y el kernel Linux se comunica con él mediante una ABI de estructuras compartidas en memoria. La ABI del A18 Pro/M4 es 1,5 veces mayor en número de estructuras y duplica los punteros respecto a la del M1/M2; además, el proceso de envío de trabajo es más complejo. Codex, un modelo de lenguaje, automatizó la captura y reproducción del estado de memoria del GPU, reduciendo las páginas copiadas hasta poder construir todo desde código.

Hubo tres bloqueos principales. El primero: trabajo de render que quedaba pendiente tras el inicio del firmware. El segundo: la captura de cargas compute, cuya traza inicial pesaba 336 MB. La solución fue arrancar en single-user mode, lanzar un LaunchDaemon temprano, ejecutar un programa Metal mínimo y obtener una traza limpia que se resolvió en horas o días. El tercer bloqueo: renders parciales causados por desbordamiento del Tiled Vertex Buffer (TVB).

El código no está listo para usuarios finales; los autores publican experimentos en los repositorios "agx-re" para verificación. El objetivo próximo es un controlador Vulkan conforme.

## Qué no se sabe

- Fecha exacta de disponibilidad para usuarios finales.
- Rendimiento comparativo frente al controlador propietario de Apple más allá de la cifra de Minecraft.
- Estado actual del controlador Vulkan.
- Detalles completos de la ABI de firmware del M5, mencionada solo como "mostly".
- Lista completa de instrucciones o funciones de hardware descubiertas que no usa el driver de Apple.
