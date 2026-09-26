---
title: "Excel permitirá guardar listas y arrays dentro de una sola celda"
summary: "La hoja de cálculo rompe su regla de un valor por celda y acerca su comportamiento a estructuras tipo Python o NumPy. El cambio simplifica modelos financieros, ETL ligero y prototipado sin salir del entorno de fórmulas."
lang: es
story: excel-cells-can-now-hold-arrays-like
publishedAt: 2026-09-26T11:42:42.652Z
sourceUrl: "https://techcommunity.microsoft.com/blog/microsoft365insiderblog/put-multiple-values-in-one-cell-with-lists-and-arrays-in-excel/4559395"
sourceName: "Hacker News (portada)"
priority: routine
tags: [excel, microsoft, datos, hojas-de-calculo]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Microsoft ha anunciado que Excel permitirá almacenar múltiples valores dentro de una sola celda mediante listas y arrays nativos. El cambio rompe el modelo tradicional donde cada celda contiene un único valor atómico y acerca el comportamiento de la hoja de cálculo al de estructuras tipo lista de Python o array de NumPy. La noticia se publicó en el blog Microsoft 365 Insider y alcanzó la portada de Hacker News con 196 puntos y 144 comentarios.

Hasta ahora, representar una colección de valores exigía expandirlos en celdas adyacentes, usar rangos con nombre o recurrir a Power Query y VBA para manipular arrays en memoria. Con la nueva capacidad, una fórmula puede devolver directamente un array que permanece encapsulado en una celda, y otras fórmulas pueden operar sobre ese contenedor sin necesidad de derramar los resultados en la cuadrícula. Esto habilita fórmulas vectorizadas completas , filtros, transformaciones, agregaciones, escritas enteramente en el lenguaje de fórmulas de Excel, sin salir del entorno ni escribir código imperativo.

El impacto es inmediato en tres frentes. En modelado financiero, permite mantener escenarios completos (precios, volúmenes, tasas) dentro de celdas individuales y referenciarlos como unidades, reduciendo la fragilidad de modelos que dependen de rangos extensos y referencias relativas rotas al insertar filas. En ETL ligero, un analista puede parsear JSON, dividir cadenas o consultar APIs y mantener el resultado intermedio como array en una celda, encadenando pasos de limpieza sin volcar datos a hojas auxiliares. En prototipado de datos, acerca a Excel a un REPL tabular: se prueba una transformación, se inspecciona el array resultante en la celda y se itera sin la sobrecarga de montar un pipeline externo.

## Qué no se sabe

- Fecha de disponibilidad general para usuarios finales.
- Qué versiones de Excel la soportarán (Web, Desktop, Mobile).
- Sintaxis exacta para crear listas o arrays dentro de una celda.
- Límites máximos de elementos por celda.
- Compatibilidad con fórmulas clásicas como BUSCARV, INDICE/COINCIDIR o DESREF.
- Rendimiento con arrays de decenas o cientos de miles de elementos.
- Si exigirá un plan concreto de Microsoft 365 o estará en ediciones perpetuas.
