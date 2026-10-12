---
title: "Un método hace que los modelos juzguen su propio código para depurar mejor"
summary: "Behavioral Self-Rewarding usa la propia política para comparar trayectorias con igual resultado binario y premiar las que depuran con más calidad, sin rollouts extra ni modelos externos."
lang: es
story: behavioral-self-rewarding-improves-rlvr-for-software
publishedAt: 2026-10-12T15:58:14.469Z
sourceUrl: "https://arxiv.org/abs/2610.12598"
sourceName: "arXiv cs.AI"
priority: routine
tags: [refuerzo, software, automejora, benchmarks]
generatedBy: dots-studio/dots-3-note-preview:free
---
El aprendizaje por refuerzo con recompensas verificables (RLVR) ha permitido entrenar agentes de ingeniería de software que resuelven issues reales, pero choca con un techo: la señal de recompensa es binaria. Una trayectoria que pasa los tests recibe un 1; otra que falla, un 0. Da igual si la primera arregló el bug con una línea quirúrgica o con un parche frágil que rompe tres cosas más. El modelo no aprende a distinguir calidad de debugging, solo a buscar cualquier camino que active el verificador.

Behavioral Self-Rewarding (BSR) ataca ese problema sin pedir más interacciones con el entorno ni un reward model aparte. La idea es reutilizar la política actual como juez comparativo. Dadas varias trayectorias para la misma tarea que comparten el mismo resultado binario (todas pasan o todas fallan), la política las empareja y decide cuál muestra un comportamiento de depuración superior. Esas preferencias por pares se agregan en puntuaciones locales por tarea y se convierten en recompensas auxiliares acotadas. El orden global de aprobado/suspendido que impone el verificador se respeta; BSR solo añade contraste dentro de cada cubeta.

Los experimentos corren sobre SWE-bench Verified y SWE-bench-Live con Qwen3-14B y Qwen3-32B. En ambas configuraciones se observan mejoras consistentes frente al RLVR base, lo que sugiere que la propia política ya contiene criterio útil para ordenar sus trayectorias aunque no haya sido entrenada explícitamente para ello. El método opera sobre datos ya recopilados: no hay rollouts extra, no hay llamadas a API de un modelo mayor, no hay etiquetado humano.

Lo que no se sabe

- Magnitud exacta de las mejoras en pass rate o resolución de issues por modelo y benchmark.
- Detalles del algoritmo de agregación de preferencias (función de scoring, hiperparámetros, temperatura si la hay).
- Overhead computacional de la fase de auto-evaluación respecto al entrenamiento base.
- Si BSR se aplica offline sobre un buffer fijo u online intercalado con pasos de policy gradient.
- Arquitectura completa del pipeline RLVR base (optimizador, schedule de KL, tamaño de batch, etc.).
- Resultados de ablation ni comparativa con reward models entrenados externamente.
- Versión concreta de SWE-bench-Live usada (fecha de corte de los issues).
