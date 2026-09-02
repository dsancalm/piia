---
title: "Paint.NET reimplementa Direct2D con IA para funcionar en Linux mediante Wine"
summary: "Rick Brewster ha escrito 180.000 líneas de código con Claude para sustituir la dependencia nativa de Direct2D. La DLL gestionada permite renderizar la interfaz y los efectos en Linux sin traducir llamadas a Vulkan, aunque requirió correcciones manuales constantes en la..."
lang: es
story: paint-net-adds-ai-written-direct2d-layer
publishedAt: 2026-09-02T11:42:18.172Z
sourceUrl: "https://simonwillison.net/2026/Sep/2/rick-brewster/"
sourceName: "Simon Willison"
priority: flash
tags: [paintnet, wine, direct2d, ia]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Paint.NET ha cerrado una de las brechas más difíciles para ejecutarse en Linux mediante Wine: la dependencia de Direct2D. En lugar de esperar a que la capa de traducción implemente la API completa, Rick Brewster ha escrito una reimplementación *clean-room* de Direct2D que se activa pasando el parámetro `/wine` al lanzar la aplicación. El código vive en `PaintDotNet.Windows.Direct2D1.Managed.dll` y suma unas 180.000 líneas, frente a las 700.000 líneas que componen el resto del editor tras más de veinte años de desarrollo.

La particularidad es que esas 180.000 líneas las generó Claude, el asistente de Anthropic, en lo que Brewster describe como *vibe coding*: código producido a gran velocidad sin revisión exhaustiva línea a línea. El modelo llegó a deducir por ingeniería inversa las fórmulas matemáticas de la biblioteca de efectos integrados de Direct2D, algo que la documentación pública no detalla. Pero la salida bruta no era usable tal cual. Brewster tuvo que intervenir constantemente para corregir la gestión de referencias COM , faltaban llamadas a `AddRef()` y `Release()` que provocaban fugas o accesos a memoria liberada, y para enderezar decisiones de arquitectura que el modelo tomaba por defecto.

El resultado es una DLL que permite a Paint.NET renderizar su interfaz y efectos en Linux sin traducir llamadas Direct2D a Vulkan o Metal en tiempo de ejecución, sino ejecutando una implementación gestionada nativa de la API. El enfoque evita la penalización de traducir cada primitiva gráfica y delega en el motor de renderizado por software de Direct2D, que a su vez usa WARP o el *backend* D3D11 de Wine.

Queda por ver en qué versión concreta aterrizará este código, qué porcentaje de la superficie de Direct2D cubre realmente y cómo rinde frente al Direct2D nativo de Windows. Tampoco se sabe si la DLL se distribuirá solo en compilaciones etiquetadas para Wine o también en los instaladores estándar de Windows, ni bajo qué licencia se publica el código generado. Lo que sí queda claro es que un único mantenedor ha podido abordar una reescritura de esta magnitud delegando el grueso mecánico en IA, a cambio de asumir una labor de auditoría de bajo nivel , contadores de referencias, *lifetimes* de objetos, sincronización, que el modelo no resuelve solo.
