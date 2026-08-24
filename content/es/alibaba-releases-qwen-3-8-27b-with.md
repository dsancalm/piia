---
title: "Alibaba lanza Qwen 3.8 27B con capacidades de visión"
summary: "Este modelo de 27.000 millones de parámetros permite procesar imágenes mediante coordenadas JSON. Si lo usas en tu propio hardware, deberás ajustar el parámetro de razonamiento para evitar que el proceso de pensamiento agote tu memoria o tarde hasta 21 minutos."
lang: es
story: alibaba-releases-qwen-3-8-27b-with
publishedAt: 2026-08-17T07:44:35.426Z
sourceUrl: "https://simonwillison.net/2026/Aug/16/qwen-38-27b/"
sourceName: "Simon Willison"
priority: routine
tags: [alibaba, inteligenciaartificial, tecnología]
generatedBy: google/gemma-4-26b-a4b-it:free
---
Alibaba ha lanzado Qwen 3.8 27B, un modelo de lenguaje con capacidades de visión bajo la licencia Apache 2. Este modelo tiene 27.000 millones de parámetros y un archivo de 17GB. Su arquitectura admite un contexto máximo de 262.144 tokens, aunque el límite de salida o razonamiento puede ocupar gran parte de esa ventana. El usuario puede controlar el esfuerzo de razonamiento mediante el parámetro `reasoning_effort`, usando valores como `xhigh`, `medium` o `low`.

Quienes despliegan estos modelos en hardware local enfrentan un problema: el那個izamiento profundo viene activado por defecto. Esto hace que el modelo genere una cantidad enorme de tokens de pensamiento antes de dar la respuesta final. En pruebas de ejecución, un modelo puede dedicar más de 22.000 tokens solo a razonar. Este proceso al cependanta los tiempos de generación y agota la memoria de la GPU o la RAM.

## El impacto en la ejecución local

El modelo tiene una capacidad notable en tareas de visión. Puede devolver cajas delimitadoras (bounding boxes) en una escala de 0 a 1000 para identificar objetos en una imagen. Por ejemplo, al procesar una fotografía de pelícanos con este comando:

```bash
llm -a https://static.inaturalist.org/photos/714731804/large.jpg \ -m lmstudio/qwen/qwen3.8-27b \ 'eturn JSON bounding boxes for the pelicans in this photo, 0-1000 scale for each dimension '
```

El resultado es un JSON estructurado:

```json
[ { "bbox_2d" : [ 195, 290, 370, 780 ], "label" : " pelicans " }, { "bbox_2d" : [ 445, 320, 675, 850 ], "label" : " pelicans " } ]
```

El modelo también genera código para visualizar esos datos, como un archivo SVG o una página HTML que procese dicho JSON.

El exceso deWMNDA de razonamiento aumenta el tiempo de espera. Una tarea sencilla puede tardar 137 segundos o hasta 21 minutos si el modelo entra en un bucle de pensamiento excesivo. Un desarrollador que busque respuestas rápidas en su propia máquina debe configurar manualmente el parámetro de esfuerzo. Así evitará que el modelo gaste todos los recursos en procesos internos que no siempre mejoran la calidad del resultado final.

 cependant no se sabe qué dicen los benchmarks independientes sobre el rendimiento real del modelo ni qué tan grave es el sobrepensamiento en otros casos de uso distintos a la visión.

Fuente: Simon Willentar
