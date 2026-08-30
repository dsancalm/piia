---
title: "Samsung muestra LPDDR5X con computación integrada y 9,6 TOPS en ocho paquetes"
summary: "Cada banco DRAM incluye un bloque MAC que opera a 614 GB/s internos, frente a 76,8 GB/s del bus externo. Ocho paquetes de 16 GB alcanzan el rendimiento del NPU de Meteor Lake, pero exigen dedicar canales enteros y bloquear hilos globales al romper la semántica estándar de..."
lang: es
story: samsung-details-lpddr5x-pim-with-614-gb
publishedAt: 2026-08-30T12:20:05.804Z
sourceUrl: "https://chipsandcheese.com/p/hot-chips-2026-samsungs-processing"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [samsung, lpddr5x, pim, hotchips]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Samsung ha mostrado en Hot Chips 2026 su LPDDR5X-PIM. Es una memoria LPDDR5X-9600 estándar de 16 bancos a la que se añade un bloque de computación por banco. Cada bloque accede a su banco DRAM adjunto sin usar el bus externo, aprovechando un ancho de banda interno agregado de 614 GB/s frente a los 76,8 GB/s que entrega el acceso convencional con dos bancos en paralelo.

El bloque PIM contiene un árbol MAC alimentado por tres archivos de registros: instrucción (1024 bits, hasta 64 instrucciones de 16 bits), origen (4 kbit, vectores de activación) y escala (2 kbit). Los pesos del modelo permanecen en el array DRAM y se entregan como segundo operando; las activaciones y los factores de escala se cargan en sus respectivos registros. El array ejecuta 4 operaciones MAC INT8/FP8 por reloj de datos (8 por ciclo sin contar DDR) por bloque; con pesos de 4 bits el rendimiento se duplica. Un paquete entrega 2,4 TOPS INT8; ocho paquetes (128 GB totales) suman 9,6 TOPS, comparable al NPU de Meteor Lake.

La interfaz respeta el protocolo LPDDR5X. Filas de dirección reservadas actúan como MMIO para alternar entre modo single-bank (acceso normal) y multi-bank (comando broadcast a los 16 bancos). Otras filas por banco activan el modo "PIM Registers Activated", que redirige accesos a los registros PIM en lugar de a celdas DRAM.

Una secuencia típica de inferencia es:

1. Cargar pesos en DRAM (single-bank).
2. Cambiar a multi-bank + PIM Registers Activated.
3. Escribir activaciones, escalas e instrucciones en registros PIM (broadcast a 16 bancos).
4. Volver a multi-bank y emitir lecturas para lanzar cómputo y acumular resultados en el VRF.
5. Escribir resultados del VRF de vuelta a bancos DRAM.
6. Restaurar single-bank para acceso normal.

Cada paquete DRAM es de 256 bits (BL=16). Llenar un registro de origen requiere 16 comandos de escritura en broadcast; hacerlo banco a banco serían 256 comandos, por lo que el modo multi-bank es esencial para el ancho de banda hostPIM. El Address Align Mode (AAM) resuelve el reordenamiento del controlador: cada instrucción infiere su índice de registro de origen a partir de la dirección de columna accedida.

El uso de PIM rompe la semántica DRAM estándar. No se pueden mezclar accesos PIM y normales simultáneamente ni entre hilos, porque ni el controlador ni el chip distinguen hilos. Samsung propone aislar una región PIM; en la práctica esto obliga a dedicar canales enteros a PIM, rompiendo el interleaving y penalizando ancho de banda y cómputo tanto para código PIM como no-PIM. La multitarea exige locks globales: en un SO multiproceso habría que bloquear todos los hilos e interrupciones durante secciones PIM. El cambio de contexto implica sacar el canal del modo PIM y guardar el estado completo (registros de instrucción, origen, escala y vectoriales de cada banco).

PIM también rompe expectativas de la jerarquía de caché: la DRAM genera valores que la caché desconoce, y las cachés pueden absorber accesos destinados a disparar operaciones PIM.

## Lo que no se sabe

- Consumo energético y área del bloque PIM por banco.
- Latencia de cambio de modo (single-bank multi-bank, entrada/salida PIM Registers Activated).
- Detalles de AAM: codificación exacta de dirección de columna a índice de registro.
- Formato exacto de instrucciones de 16 bits y operaciones soportadas.
- Soporte nativo de FP16/BF16/INT4 más allá de INT8/FP8/4-bit.
- Mecanismo de guardado/restauración de estado PIM en cambio de contexto (¿DMA?, ¿registros sombra?).
- Recomendación completa de Samsung sobre cachés (texto truncado en la fuente).
- Soporte en controladores comerciales (JEDEC, kernel Linux, firmware).
- Disponibilidad comercial, precio y roadmap.
- Comparativa detallada frente a HBM-PIM, GDDR6-PIM, CXL.mem, UPMEM, AxDIMM.
