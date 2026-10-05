---
title: "RemoveMacAI elimina Apple Intelligence y recupera hasta 15 GB en macOS 27"
summary: "La herramienta de código abierto aplica un perfil de configuración que desactiva las funciones y borra los modelos mediante el servicio de activos de Apple sin tocar archivos de sistema ni desactivar SIP. El dictado por voz sigue operativo porque usa modelos separados."
lang: es
story: open-source-tool-disables-apple-intelligence-on
publishedAt: 2026-10-05T15:13:40.028Z
sourceUrl: "https://github.com/omlahore/RemoveMacAI"
sourceName: "Hacker News (portada)"
priority: routine
tags: [macos, privacidad, almacenamiento, opensource]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
RemoveMacAI es una herramienta de código abierto que desactiva Apple Intelligence en macOS 27 y elimina los modelos descargados, recuperando entre 10 y 15 GB de disco. En esta versión del sistema ya no existe un único interruptor global: al desactivar las funciones desde Ajustes, los modelos permanecen en el almacenamiento. La utilidad aplica un perfil de configuración que usa claves de restricción de Apple y fuerza ajustes sin clave de restricción. Los modelos se borran mediante el servicio de activos de Apple; SIP sigue activado y no se tocan archivos bajo `/System`. Además, el perfil redirige la descarga de cada modelo eliminado a un puerto local cerrado para impedir reinstalaciones futuras.

El instalador de una línea descarga la última versión, verifica su checksum SHA-256 y la ejecuta desde un directorio temporal sin instalar nada permanente:

```bash
curl -fsSL https://raw.githubusercontent.com/omlahore/RemoveMacAI/main/install.sh | bash
```

También está disponible vía Homebrew:

```bash
brew install omlahore/tap/removemacai
removemacai
```

Cada release se construye desde su etiqueta mediante GitHub Actions y lleva una atestación de procedencia. Puedes verificarla con:

```bash
gh attestation verify removemacai-darwin-arm64.tar.gz -R omlahore/RemoveMacAI
```

La herramienta no realiza peticiones de red ni recopila datos. Eliminar el perfil restaura los ajustes anteriores; macOS vuelve a descargar los modelos cuando una función los necesita. El dictado sigue funcionando porque es un ajuste separado y sus modelos de voz no se eliminan. Las actualizaciones de macOS no revierten los cambios; el perfil y el bloqueo de descarga persisten.

## Qué deja de funcionar

Al ejecutar `removemacai off` (o `removemacai off --dry-run` para simular) se desactivan: Siri (incluyendo "Oye Siri" e icono en la barra de menús), Writing Tools, Genmoji, Image Playground, extensión ChatGPT, resúmenes en Mail, Messages, Safari, Notes y notificaciones, respuestas inteligentes de Mail, predicciones de texto en línea, Fotos Espaciales, Limpieza de Fotos y completado predictivo de código en Xcode. También dejan de funcionar apps que usen el framework Foundation Models, la acción "Use Model" en Atajos, Inteligencia Visual y edición en lenguaje natural en Calendario.

El proceso `Siri` que sigue apareciendo en el Monitor de Actividad corresponde a la ventana de Spotlight; algunos servicios del sistema permanecen cargados protegidos por SIP. Ajustes > General > Almacenamiento sigue mostrando Apple Intelligence tras borrar los modelos porque macOS libera los archivos en su propia agenda. El comando `removemacai status` muestra los tamaños reportados por el servicio de activos; los que no puede reportar aparecen como "unknown".

## Requisitos y base técnica

Requisitos: Apple Silicon y macOS 27 (probado en 27.0; en 27.0.1 se requiere versión 0.2.3 o posterior). macOS 26 y anteriores no son compatibles. RemoveMacAI está construido sobre `pared`, una herramienta de 4evy que mapeó primero el servicio de activos, los conjuntos de modelos y varias claves de ajustes; su licencia está en `THIRD-PARTY-NOTICES.md`. Licencia: MIT.

---

### Lo que no se sabe

- Cuánto espacio en disco liberan exactamente los modelos en una máquina concreta (el comando `status` muestra tamaños, pero no da cifras absolutas agregadas).
- Cuánto tarda macOS en borrar físicamente los archivos tras la eliminación lógica del servicio de activos ("en su propia agenda").
- Lista exhaustiva de claves de restricción usadas por el perfil de configuración.
- Qué ocurre si el usuario tiene varias cuentas en el Mac: si el perfil se aplica por usuario o globalmente.
- Si queda alguna telemetría o registro local tras ejecutar la herramienta (no hace peticiones de red ni recopila datos, pero no se mencionan logs locales).
- Compatibilidad futura con macOS 28+.
