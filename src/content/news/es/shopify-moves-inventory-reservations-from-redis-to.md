---
title: "Shopify sustituye Redis por MySQL y aguanta el Black Friday con 5,1 millones por"
summary: "Shopify ha reemplazado Redis por MySQL en su sistema de reservas de inventario para evitar la sobreventa. El nuevo diseño usa una fila por unidad vendible con SKIP LOCKED y logró procesar 5,1 millones de dólares por minuto en Black Friday, un 11% más que el año anterior."
lang: es
story: shopify-moves-inventory-reservations-from-redis-to
publishedAt: 2026-08-09T07:32:55.282Z
sourceUrl: "https://shopify.engineering/scaling-inventory-reservations"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [shopify, mysql, redis, inventario]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Shopify publicó cómo sustituyó Redis por MySQL en el sistema de reservas de inventario. El caso tiene cifras concretas: en el pico de Black Friday 2025 procesaron 5,1 millones de dólares en ventas por minuto, un 11% más que el año anterior. El sistema protege contra la sobreventa durante el checkout y sostiene más del 14% del comercio electrónico de EE. UU.

El diseño anterior usaba Redis con claves de cantidad y operaciones DECR/INCR. El nuevo usa una fila por unidad vendible, con un pool limitado a 1.000 filas por combinación de artículo y ubicación. Si un artículo tiene 50.000 unidades y 10 ubicaciones, la tabla de unidades de reserva llega a 500.000 filas en el peor caso. Con el pool, la consulta solo toca un subconjunto.

La pieza central es el uso de `SKIP LOCKED` de MySQL 8 para evitar contención en las filas:

```sql
SELECT id
FROM reservation_units
WHERE shop_id = ?
  AND inventory_item_id = ?
  AND inventory_group_id = ?
  AND status = 'AVAILABLE'
ORDER BY id
LIMIT ?
FOR UPDATE SKIP LOCKED
```

La clave primaria cambió a compuesta `(shop_id, inventory_item_id, inventory_group_id, id)` para reducir el bloqueo a una fila por reserva. El nivel de aislamiento pasó de `REPEATABLE READ` a `READ COMMITTED` para evitar gap locks. También estandarizaron el orden de bloqueo contra deadlocks: primero `DELETE` en `reservation_units`, luego `INSERT` en `reserved_quantities`. Y usan consultas batch con `UNION ALL` para reducir los viajes de ida y vuelta a la base de datos.

El dato que contradice la intuición: el cuello de botella real en producción no era CPU ni latencia de consultas, sino las conexiones a la base de datos. Da igual lo rápido que sea cada query si no puedes abrir suficientes conexiones simultáneas.

Shopify diagnosticó los problemas con `SHOW ENGINE INNODB STATUS`, que muestra bloqueos y deadlocks en curso, y ajustó el diseño a lo que veían en producción, no a lo que predecía un benchmark.

## Lo que no se sabe

El texto no da el número exacto de reservas por segundo que maneja el sistema, ni el costo operativo del clúster de Redis que se eliminó. Tampoco especifica la latencia P90 que consideraban aceptable, ni cómo se mantiene la consistencia entre el pool y el libro mayor de inventario durante el reabastecimiento. El tamaño final de la tabla de unidades de reserva en producción tampoco aparece.
