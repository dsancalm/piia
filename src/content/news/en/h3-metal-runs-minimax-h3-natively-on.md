---
title: "h3-metal runs MiniMax-H3 natively on Apple Silicon"
summary: "h3-metal is a native Metal implementation of MiniMax-H3 inference for Apple Silicon. It compiles to a single binary that validates model design without mapping all weights, and offers independent controls for denoising steps, layer count, and reuse."
lang: en
story: h3-metal-runs-minimax-h3-natively-on
publishedAt: 2026-08-11T07:48:10.173Z
sourceUrl: "https://github.com/antirez/h3.c"
sourceName: "Hacker News (portada)"
priority: flash
tags: [minimax-h3, apple-silicon, inference, metal]
generatedBy: deepseek/deepseek-v4-flash-0731
---
# H3-metal: MiniMax-H3 nativo para Apple Silicon

h3-metal es una implementación nativa de inferencia de MiniMax-H3 para Apple Silicon. Se construye como una secuencia de rebanadas verticales de trabajo: primero metadatos deterministas del host y del modelo, luego paridad de bloques Metal portátil, codificación de prompts, prompt-to-video/audio, y condicionamiento de primer y último fotograma.

El proyecto compila como un único binario que comprueba el diseño del modelo sin mapear todos los pesos:

```bash
make -j8
mkdir -p outputs
./h3 --info -d ./MiniMax-H3
```

Sin el flag `-p`, el mismo binario inicia una sesión interactiva estilo Iris. La sesión mantiene el condicionamiento de prompt BF16 exacto, el DiT preparado y el decodificador de video en memoria, así que repetir un prompt con otra semilla evita cargarlos y codificarlos de nuevo.

## Rendimiento y control fino

El preset equilibrado validado genera 22 fotogramas a 24 fps (unos 0.92 segundos). Los valores por defecto son `--steps 20 --layers 50 --reuse 1`, pero la utilidad está en los controles independientes:

- `--steps N` significa siempre exactamente N pases de denoising. Cuatro a siete pases usan el mismo horario que ganó la comparación de bajo presupuesto; aumentar de 4 a 7 mejora progresivamente el detalle y el movimiento.
- `--reuse 2` calcula 11 velocidades frescas de denoiser en lugar de 20 y extrapola las transiciones omitidas.
- `--layers 45` ejecuta 45 de los 50 bloques de transformadores, reduciendo tiempo y uso de memoria unificada.

La combinación de `--layers 40` y `--reuse 3` produce un zorro de 22 fotogramas limpio y reconocible en validación, pero pierde detalles finos y puede cambiar el encuadre. No añadas `--token-reduction` a ambos: esa combinación probada produjo anillos de color, contornos y extremidades fantasma.

Los números en M5 Max: el denoise de cuatro pases tarda unos 3.5 segundos frente a 26.4 segundos de la referencia, con 0.556 SSIM de video completo contra una referencia de 29 pases en la prueba del zorro, y 0.547 en una prueba independiente de surfista.

## Limitaciones

La fuente no especifica el tamaño exacto del modelo MiniMax-H3 en parámetros, ni el consumo de memoria total en diferentes configuraciones. No hay datos de rendimiento en otros chips Apple Silicon distintos de M3 Max y M5 Max, ni se menciona el tiempo de carga inicial del modelo. Tampoco se indica la licencia del proyecto.
