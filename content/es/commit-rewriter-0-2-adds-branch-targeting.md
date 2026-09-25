---
title: "commit-rewriter 0.2 permite reescribir commits en cualquier rama sin cambiar a main"
summary: "La nueva versión añade la opción --branch para actuar directo sobre ramas de feature o hotfix, evitando checkouts y rebases manuales antes de un pull request."
lang: es
story: commit-rewriter-0-2-adds-branch-targeting
publishedAt: 2026-09-25T12:04:53.569Z
sourceUrl: "https://simonwillison.net/2026/Sep/24/commit-rewriter/"
sourceName: "Simon Willison"
priority: urgent
tags: [git, python, herramientas, commits]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison ha publicado la versión 0.2 de commit-rewriter, una aplicación web en Python para reescribir mensajes de commit. La novedad principal es el soporte para ramas distintas a la rama por defecto del repositorio, algo que la versión anterior no contemplaba. El cambio responde al issue #3 y permite actuar directamente sobre ramas de feature, hotfix o cualquier otra sin necesidad de cambiar a main o master.

Para usar la herramienta en una rama concreta basta con ejecutar:

```bash
uvx commit-rewriter --branch other
```

El comando arranca la aplicación apuntando a la rama indicada (en el ejemplo, "other") y expone una interfaz web para editar los mensajes. Al tratarse de un paquete ejecutable con uvx, no requiere instalación permanente ni configuración previa: se descarga, se ejecuta en un entorno aislado y desaparece al terminar.

La utilidad es práctica cuando quieres limpiar el historial de una rama antes de abrir un pull request, corregir autores o eliminar referencias a secretos que se colaron en los commits. Hasta ahora, hacerlo en una rama distinta a la principal obligaba a hacer checkout, usar git filter-branch o rebase interactivo manual. commit-rewriter 0.2 elimina esos pasos intermedios.

Lo que no se sabe
- Qué cambios incluía exactamente la versión 0.1 anterior.
- Cómo funciona internamente la reescritura de mensajes (si usa un LLM, reglas deterministas u otro mecanismo).
- Si la herramienta modifica solo el historial local, el remoto o ambos.
- Qué ocurre si hay conflictos al reescribir commits en una rama compartida.
- Si requiere configuración adicional más allá del argumento `--branch`.
- Licencia del proyecto y ubicación del repositorio o código fuente.
