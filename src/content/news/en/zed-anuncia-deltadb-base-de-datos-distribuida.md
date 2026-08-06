---
title: "Zed anuncia DeltaDB, base de datos distribuida que versiona cada operación de código"
summary: "DeltaDB registra operaciones individuales entre commits, no solo los puntos de guardado. Cada cambio queda vinculado al chat del agente que lo produjo, y cualquier punto de la historia sirve como rama válida. El acceso anticipado se solicita por correo o GitHub."
lang: en
story: zed-anuncia-deltadb-base-de-datos-distribuida
publishedAt: 2026-08-06T09:26:12.534Z
sourceUrl: "https://zed.dev/deltadb"
sourceName: "Hacker News (portada)"
priority: flash
tags: [base-de-datos, control-de-versiones, zed, agentes]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Zed, la empresa detrás del editor de código colaborativo, ha anunciado DeltaDB, una base de datos distribuida que funciona como un sistema de control de versiones para el trabajo en curso. No registra commits, registra operaciones individuales entre ellos, y cada operación recibe una identidad estable. Eso significa que puedes señalar cualquier punto de la evolución del código, no solo los momentos en que alguien decidió hacer un commit.

Cada cambio queda vinculado a la conversación del agente que lo produjo. Desde una línea de código puedes saltar al mensaje de chat que lo originó, y desde un mensaje puedes saltar al código que tocó. El árbol de trabajo está virtualizado, así que crear una nueva rama de agente es efectivamente gratis, y cualquier punto de la historia es un punto de ramificación válido, incluso a mitad de ejecución.

La colaboración cambia de forma. Un compañero puede unirse mientras el trabajo está en curso, hablar con el agente que hizo el trabajo y anotar sobre la marcha, sin esperar a que haya un commit y push primero. El registro de actividad es continuo, no episódico.

## Cómo funciona

DeltaDB captura cada operación y le da una identidad estable. Eso permite referenciar el código en cualquier momento de su evolución, no solo en los puntos de guardado manual. Para quien programa, el flujo deja de depender de la disciplina de hacer commits frecuentes. La historia completa del trabajo está ahí, operación por operación.

El acceso es anticipado. Se solicita con un correo electrónico o nombre de usuario de GitHub.

## Lo que no se sabe

La fuente no especifica qué lenguajes o plataformas son compatibles. No indica si DeltaDB funciona con sistemas de control de versiones existentes como Git. No detalla el modelo de precios ni si será código abierto. No hay fecha de lanzamiento para una versión estable.
