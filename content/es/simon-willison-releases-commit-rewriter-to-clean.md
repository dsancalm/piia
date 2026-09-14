---
title: "Simon Willison lanza commit-rewriter para reescribir mensajes de commit en lote"
summary: "La herramienta abre una interfaz web donde editas los mensajes y crea una rama de respaldo automática antes de reescribir el historial desde el primer commit modificado."
lang: es
story: simon-willison-releases-commit-rewriter-to-clean
publishedAt: 2026-09-14T13:53:54.868Z
sourceUrl: "https://simonwillison.net/2026/Sep/14/commit-rewriter/"
sourceName: "Simon Willison"
priority: routine
tags: [git, python, herramientas, simon-willison]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison ha publicado commit-rewriter 0.1, una aplicación web en Python para reescribir mensajes de commit en lote. La herramienta surgió de una necesidad concreta: limpiar el historial de seguridad de Datasette antes de publicarlo, eliminando referencias a issues privados y residuos que dejan los agentes de código durante el desarrollo asistido.

El funcionamiento es directo. Ejecutas `uvx commit-rewriter path/to/repo` y se abre una interfaz web con la lista de commits. Editas los mensajes que necesiten cambios y, al enviar el formulario, la herramienta crea automáticamente una rama de respaldo con timestamp que captura el estado actual del repositorio. Después reescribe todos los commits desde el primero modificado hasta el más reciente.

```bash
uvx commit-rewriter path/to/repo
```

La rama de respaldo es el detalle que hace viable el flujo en repos reales: si el resultado no convence, tienes un punto de retorno inmediato sin tener que buscar el hash anterior en el reflog.

La herramienta se ejecuta con uvx, lo que sugiere distribución a través de PyPI o GitHub, aunque la fuente no especifica la ubicación exacta del código ni las opciones de configuración adicionales. Tampoco aclara si hay requisitos concretos sobre la estructura del repositorio Git más allá de ser un repositorio estándar.

Lo que no se sabe: dónde está el código fuente o repositorio de commit-rewriter; si la herramienta está publicada en PyPI o solo se ejecuta via uvx desde GitHub; qué significa exactamente "coding agent cruft" en este contexto; si la reescritura modifica hashes de commits (implícitamente sí, pero no se dice explícitamente); qué opciones de configuración o flags acepta la herramienta además de la ruta del repo; si funciona con cualquier repo Git o tiene requisitos específicos.
