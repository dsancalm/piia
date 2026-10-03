---
title: "Una IA rompe el récord de Stratego con 16 GPUs y una semana de entrenamiento"
summary: "Ataraxos gana al mejor humano de la historia y al campeón mundial usando un modelo de creencias que infiere piezas ocultas, lo que permite búsqueda anticipada."
lang: es
story: ataraxos-beats-world-s-best-stratego-player
publishedAt: 2026-10-03T11:57:27.020Z
sourceUrl: "https://arstechnica.com/science/2026/10/ai-finally-beat-the-best-stratego-player-in-history-and-did-it-on-a-budget/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [ia, stratego, nature, investigacion]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un equipo de investigadores de Carnegie Mellon, MIT, NYU y Stanford ha publicado en Nature una IA llamada Ataraxos que ha roto el techo de Stratego. En 20 partidas contra Pim Niemeijer, considerado el mejor jugador humano de la historia, el sistema ganó 15, perdió 1 y empató 4. En el Campeonato Mundial de 2025 ganó 38 de 40 partidas contra humanos. La misma arquitectura, sin cambios, ha vencido a tres campeones mundiales en Barrage Stratego (variante de 8 piezas), domina el juego cooperativo Hanabi y supera a los mejores bots en dou dizhu.

Stratego presenta dos obstáculos que han frenado a la IA durante décadas: un espacio de configuraciones iniciales superior a 10^33 (un decillón) y partidas de unos 2.000 movimientos, cincuenta veces más largas que una de ajedrez. DeepNash, el anterior hito de DeepMind (2022), necesitó 1.024 chips especializados de Google durante dos o tres meses, con un coste estimado de 3 a 4,5 millones de dólares a precios de 2025. Ataraxos se entrenó con 16 GPUs durante una semana más 4 GPUs adicionales durante cuatro días para el modelo de creencias, a un coste de "unos pocos miles de dólares". Jugó 163 millones de partidas en auto-juego, unas 34 veces menos que DeepNash, y alcanzó un nivel superior.

La diferencia arquitectónica es una segunda red neuronal: un modelo de creencias que infiere las piezas ocultas del rival a partir de sus movimientos. Esa inferencia permite hacer búsqueda anticipada (search) antes de cada jugada, algo que en juegos de información perfecta es estándar pero que en Stratego era inabordable sin una estimación fiable del estado oculto. El paper describe el simulador GPU que alcanza "millones de movimientos por segundo" y un schedule de entrenamiento con "big bold changes early / small careful later", pero no detalla arquitectura de redes, hiperparámetros, modelo exacto de GPUs ni horas totales de cómputo.

No se sabe por qué Niemeijer ganó esa única partida (bug, suerte o exploit real), ni se publican métricas de exploitability o NashConv en Stratego estándar y Barrage. Tampoco hay código, pesos ni repositorio público anunciado. El DOI del artículo es 10.1038/s41586-026-11036-y.

Lo que no se sabe: modelo exacto de GPUs y horas totales; coste total preciso en dólares; arquitectura detallada de las dos redes (tamaño, capas, tipo de atención); hiperparámetros clave (learning rate, batch size, schedule); detalles del simulador GPU; disponibilidad de código o pesos; causa de la derrota contra Niemeijer; métricas de exploitability / NashConv; planes concretos de explicabilidad más allá de la intención declarada.
