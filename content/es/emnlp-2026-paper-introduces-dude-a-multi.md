---
title: "Un sistema multi-agente detecta errores entre papers y su código con un 22,8 % más"
summary: "Dude alinea la granularidad del texto y el código antes de compararlos y filtra coincidencias triviales, reduciendo falsos positivos. El trabajo, aceptado en EMNLP 2026, no revela datasets, modelos base ni coste computacional."
lang: es
story: emnlp-2026-paper-introduces-dude-a-multi
publishedAt: 2026-09-05T11:13:26.221Z
sourceUrl: "https://arxiv.org/abs/2609.03416"
sourceName: "arXiv cs.AI"
priority: routine
tags: [multiagente, reproducibilidad, emnlp, codigo]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Un sistema multi-agente llamado Dude detecta discrepancias entre artículos científicos y su código asociado. Logra mejoras de hasta un 22,8 % en *recall* y *precision* y un 18,7 % en F1 frente a líneas base previas. El trabajo, firmado por Weijie Liu, Running Zhao, Wenhao Yuan, Jinfeng Xu, Zhanfeng Xu, Xiaoxi Zhang y Edith Cheuk-Han Ngai, ha sido aceptado en la conferencia principal de EMNLP 2026.

La dificultad central no es comparar texto con código, sino que ambos operan a granularidades distintas. El paper describe una arquitectura en frases amplias; el código la implementa en funciones, bucles y tensores concretos. Los sistemas multi-agente tradicionales tienden a sobre-interpretar el texto o a sobre-reportar coincidencias superficiales, generando falsos positivos. Dude ataca ese desajuste con dos mecanismos.

Primero, una negociación alineada por granularidad: los agentes acuerdan el nivel de detalle antes de confrontar paper y código, de modo que una frase como "usamos *dropout*" se empareja con la llamada concreta a `nn.Dropout(p=0.1)` y no con cualquier mención a regularización.

Segundo, un filtrado de saliencia en dos etapas que descarta coincidencias triviales , nombres de variables, *boilerplate* de entrenamiento, y retiene solo las que afectan a resultados, hiperparámetros o decisiones de arquitectura.

Los experimentos se ejecutan sobre datasets reales de discrepancias paper-código, aunque el preprint no especifica cuáles ni su tamaño. Tampoco detalla los métodos baseline exactos, los LLMs empleados, los prompts ni los roles de cada agente. No hay cifras de latencia ni coste computacional, ni desglose por tipo de discrepancia (lógica, hiperparámetros, arquitectura, etc.). El repositorio del sistema no aparece referenciado en el texto disponible.

## Lo que no se sabe
- Qué datasets concretos se usaron y su tamaño.
- Cuáles son los métodos baseline exactos.
- Detalles de arquitectura de los agentes (LLMs, prompts, roles).
- Cómo se define y mide la "granularidad" y la "saliencia".
- Si el código y los datos de Dude están publicados.
- Latencia y coste computacional del sistema.
- Resultados desagregados por tipo de discrepancia.
