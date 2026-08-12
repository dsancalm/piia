---
title: "Nvidia lanza un modelo de IA que es 4 veces más rápido que sus rivales"
summary: "La compañía ha presentado Nemotron 3.5 Lightning, un modelo de 30.000 millones de parámetros que usa mezcla de expertos para activar solo una parte de su capacidad en cada tarea."
lang: es
story: nvidia-lanza-un-modelo-moe-mas-rapido
publishedAt: 2026-08-12T08:06:01.939Z
sourceUrl: "https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/"
sourceName: "Hacker News (portada)"
priority: flash
tags: [nvidia, ia, códigoabierto, modelosdelenguaje]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Nvidia ha lanzado Nemotron 3.5 Lightning, un modelo de lenguaje de 30 mil millones de parámetros con arquitectura de mezcla de expertos. La compañía también ha publicado NeMo Switchyard, una biblioteca de código abierto para enrutar peticiones entre distintos modelos.

## Qué ha pasado

Nemotron 3.5 Lightning acelera la salida de tokens hasta 4 veces más que modelos comparables, y completa tareas de agentes un 30% más rápido. Es un modelo de mezcla de expertos: no todos los parámetros se activan en cada inferencia, lo que permite ofrecer mucha capacidad con un coste computacional contenido.

El lanzamiento se completa con NeMo Switchyard, una biblioteca que permite a los desarrolladores definir reglas de enrutamiento para que un orquestador decida qué modelo de IA debe responder a cada petición según el dominio o la tarea. La biblioteca ya está disponible en GitHub.

Nvidia publica los datos y técnicas de entrenamiento del modelo bajo licencias que permiten trazabilidad y auditoría. También ha lanzado Nemotron-RL-Agentic-Terminal-Pivot, un conjunto de datos de aprendizaje por refuerzo para entrenar capacidades de agente de codificación.

## Por qué importa

Hasta ahora, al construir un agente de IA solías elegir un modelo y usarlo para todo. Si tu agente necesitaba escribir código, resumir documentos y clasificar incidencias, usabas el mismo modelo para todo. Con NeMo Switchyard puedes indicar que las peticiones de escritura de código vayan a un modelo pequeño y rápido, las de resumen a uno mediano, y solo las consultas complejas a un modelo frontera.

Los casos de uso que muestra Nvidia son contundentes. LangChain ha logrado una reducción de costes del 74% enrutando solo el 7% de las peticiones a un modelo frontera, con una pérdida de precisión del 6%. Ramp ha reducido sus costes un 58% y el tiempo de ejecución un 33%. Boomi ha alcanzado un 100% de precisión de enrutamiento por dominio.

Para quien programa agentes, esto cambia la arquitectura de decisión. En lugar de fijar un modelo, se diseña un sistema de enrutamiento que decide qué modelo ejecuta cada paso, y se puede cambiar sin reescribir la aplicación.

## Lo que no se sabe

No se ha detallado el rendimiento exacto de Nemotron 3.5 Lightning en benchmarks estándar como PinchBench en comparación con
