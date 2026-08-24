---
title: "Zed presenta DeltaDB, una base de datos que versiona cada cambio de código"
summary: "DeltaDB registra cada operación entre commits con una identidad estable, vinculando el código a las conversaciones que lo originaron. Permite ramificar en cualquier punto de la historia y colaborar mientras el trabajo está en marcha."
lang: es
story: zed-anuncia-deltadb-base-de-datos-distribuida
publishedAt: 2026-08-06T09:26:12.533Z
sourceUrl: "https://zed.dev/deltadb"
sourceName: "Hacker News (portada)"
priority: flash
tags: [base-de-datos, control-de-versiones, ia, edicion-de-codigo]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Zed, la empresa detrás del editor de código homónimo, ha presentado DeltaDB, una base de datos distribuida que funciona como un sistema de control de versiones para el trabajo en curso. La idea central es que cada operación que haces, entre commit y commit, queda registrada con una identidad estable. Eso significa que puedes señalar cualquier línea de código en cualquier momento de su evolución, no solo en los puntos donde decidiste hacer un commit.

La diferencia con Git es que DeltaDB no espera a que guardes un hito. Captura cada cambio y lo mantiene conectado a la conversación que lo originó. Si trabajas con agentes de IA, cada modificación que haga un agente queda vinculada al mensaje que se la pidió. Desde una línea de código puedes saltar a la conversación que la produjo, y desde un mensaje del chat puedes ver exactamente qué código tocó.

DeltaDB virtualiza el árbol de trabajo. Crear una rama nueva para un agente no cuesta nada, y cualquier punto de la historia, incluso a mitad de una ejecución, es un punto de ramificación válido. Esto cambia la colaboración: un compañero puede unirse mientras el trabajo aún está en marcha, hablar con el agente que lo está haciendo y dejar anotaciones sin esperar a que nadie haga push.

El acceso es anticipado. Puedes solicitar una invitación con tu correo electrónico o tu nombre de usuario de GitHub.

## Qué implica para tu flujo

Si trabajas con agentes de IA, el modelo actual te obliga a revisar su trabajo después de que termine, con commits que a veces llegan tarde o con mensajes poco descriptivos. DeltaDB te deja intervenir a mitad de camino, porque la historia completa está ahí, con la trazabilidad de por qué se hizo cada cambio. Para equipos que usan agentes de forma intensiva, eso reduce el tiempo entre que el agente hace algo y alguien lo valida.

La virtualización del árbol de trabajo también afecta a cómo pruebas. Puedes ramificar desde un punto intermedio de la ejecución de un agente, probar una alternativa y volver, sin ensuciar la rama principal.

## Lo que no se sabe

La fuente no especifica qué lenguajes o plataformas soporta DeltaDB, ni si es compatible con repositorios Git existentes. Tampoco hay información sobre el modelo de precios, si será código abierto o cuándo llegará una versión estable. El acceso anticipado es la única vía para probarlo ahora.
