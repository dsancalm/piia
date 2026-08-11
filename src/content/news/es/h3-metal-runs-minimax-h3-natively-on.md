---
title: "H3 Metal ya genera video y audio en Apple Silicon con optimización específica"
summary: "El proyecto h3-metal de MiniMax-H3 funciona de extremo a extremo en M3 Max y M5 Max. Su autor valida presets de bajo coste que generan 22 fotogramas en unos 3,5 segundos con calidad comparable a referencias de 29 pases."
lang: es
story: h3-metal-runs-minimax-h3-natively-on
publishedAt: 2026-08-11T07:48:10.173Z
sourceUrl: "https://github.com/antirez/h3.c"
sourceName: "Hacker News (portada)"
priority: flash
tags: [inferencia, metal, video, optimizacion]
generatedBy: deepseek/deepseek-v4-flash-0731
---
h3-metal es un proyecto de inferencia nativa de MiniMax-H3 para Apple Silicon. Su autor lo construye como una secuencia de rebanadas verticales de trabajo. Primero los metadatos deterministas del host y del modelo, luego la paridad de bloques Metal portátil, después la codificación de prompts. Ya funcionan de extremo a extremo el prompt-to-video/audio, el condicionamiento de primer y último fotograma y las referencias ordenadas Ref2VA de imagen, video y audio.

El trabajo actual es optimización incremental de rendimiento y memoria Metal específica de H3 en M3 Max y M5 Max. El binario se compila y se prueba con comandos directos:

```bash
make -j8
mkdir -p outputs
./h3 --info -d ./MiniMax-H3
```

Ese primer comando comprueba el diseño del modelo e imprime el dispositivo Metal seleccionado sin mapear todos los pesos ni generar medios. Sin `-p`, el mismo binario inicia una sesión interactiva estilo Iris. La sesión mantiene el condicionamiento de prompt BF16 exacto, el DiT preparado y el decodificador de video en memoria. Repetir un prompt con otra semilla evita cargarlos y codificarlos de nuevo.

```bash
./h3 -d ./MiniMax-H3 --width 512 --height 512 --steps 6
```

El preset equilibrado validado genera 22 fotogramas a 24 fps, aproximadamente 0.92 segundos. `--steps 20` realiza los 20 pases de denoising por defecto. `--reuse 2` calcula 11 velocidades frescas de denoiser en lugar de las 20 y extrapola las transiciones omitidas. `--layers 45` ejecuta 45 de los 50 bloques de transformadores, reduciendo tiempo y uso de memoria unificada.

`--show` es opcional y soporta protocolos gráficos Kitty/Ghostty e iTerm2/WezTerm/Konsole. Añade tiempo de decodificación de vista previa y aproximadamente 10 GiB de residencia temporal del modelo. El primer proceso también paga costos de carga del modelo y caché del sistema de archivos. El trabajo es sensible a la limitación térmica.

`--steps N` siempre significa exactamente N pases de denoising. Cuatro a siete pases usan el mismo horario que ganó la comparación de bajo presupuesto. Aumentar de 4 a 7 mejora progresivamente el detalle y el movimiento. Se evaluaron varios horarios de cola pesada porque la mayor parte de la limpieza visible ocurre tarde en una ejecución larga. El modo retenido usa la cuadrícula base lineal liberada con un punto terminal.

En la prueba de zorro de 512 cuadrados y 22 fotogramas, el resultado seleccionado de cuatro pases tuvo 0.556 SSIM de video completo contra una referencia de 29 pases. Una prueba independiente de surfista midió 0.547. El denoise de cuatro pases tomó aproximadamente 3.5 segundos en M5 Max, versus 26.4 segundos para la referencia.

Los valores por defecto son `--steps 20 --layers 50 --reuse 1`. La identidad de píxeles numérica con MLX no se espera porque los motores de números aleatorios y ejecución difieren. El contenido y el movimiento representados deberían coincidir.

Los controles son independientes a menos que se indique lo contrario. `--reuse` y `--core-reuse` son mutuamente excluyentes. El adelgazamiento de capas se puede combinar con cualquiera de ellos. En la forma validada de 512 cuadrados, la reducción de tokens recortó el perfil de denoise de 45 capas + reuse 2 de 16.69 a 12.60 segundos en el IT M5 Max.

Los renders independientes de zorro y surfista se mantuvieron coherentes, pero la composición puede divergir más del camino cercano. La combinación de `--layers 40` y `--reuse 3` produjo un zorro de 22 fotogramas limpio y reconocible en validación, pero pierde detalles finos y puede cambiar el encuadre. No agregue `--token-reduction` a ambos `--layers 40` y `--reuse 3`: esa combinación probada produjo anillos de color, contornos y extremidades fantasma. Use `--core-reuse 6` solo como vista previa agresiva. Los valores superiores a 6 no se exponen porque la validación perdió fidelidad del sujeto.

La sesión interactiva también permite condicionar con imágenes de referencia:

```
h3> !ref-image person.png
h3> Make the person shown in Picture 1 wave to the camera.
```

## Lo que no se sabe

La fuente no especifica el tamaño exacto del modelo MiniMax-H3 en parámetros, ni el consumo de memoria total en diferentes configuraciones. No hay datos de rendimiento en otros chips Apple Silicon distintos de M3 Max y M5 Max. Tampoco se menciona el tiempo de carga inicial del modelo, el formato de salida más allá de `.mp4`, si el proyecto soporta otros sistemas operativos, ni la licencia.
