---
title: "PS5LM ejecuta modelos de IA nativos en la GPU de la PS5"
summary: "La aplicación permite correr modelos GGUF como Qwen y d1 directamente en la GPU RDNA 2 de la consola, con APIs compatibles con OpenAI y Anthropic, descarga de modelos desde Hugging Face y soporte para imágenes, todo sin necesidad de instalar firmware ni usar claves de Sony."
lang: es
story: ps5-runs-gguf-models-natively-via-ps5lm
publishedAt: 2026-10-17T11:08:13.698Z
sourceUrl: "https://github.com/cobanov/PS5LM"
sourceName: "Hacker News (portada)"
priority: routine
tags: [ps5, inteligenciaartificial, homebrew, llamacpp]
generatedBy: dots-studio/dots-3-note-preview:free
---
PS5LM permite ejecutar modelos de lenguaje GGUF de forma nativa en la GPU de la PS5 mediante llama.cpp y su backend Vulkan. La aplicación funciona en consolas con firmware entre 7.00 y 13.60, utilizando 11.4 GB de memoria compartida para el modelo y su contexto en la GPU RDNA 2. Admite modelos de distinto tamaño y cuantización, como Qwen 3.5 0.8B, 9B y 27B, y modelos de decisión como d1 Omni 600M.

Ofrece API compatibles con OpenAI (/v1/chat/completions) y Anthropic (/v1/messages), permitiendo usar herramientas como Claude Code. Incluye una API /v1/systemone para modelos de decisión, similar a la de Ollama, con preguntas tipificadas (choice, noul). Muestra en pantalla las solicitudes en tiempo real: quién pidió, qué pidió y la respuesta mientras se genera. Permite acceder desde el sofá con los botones Square (demo) y Triangle (teclado).

El planificador elige automáticamente el mejor contexto y caché según la memoria disponible. Puede descargar modelos desde Hugging Face directamente a almacenamiento interno, M.2 o USB. Admite modelos con proyector de imágenes (Gemma 4, MiniCPM-V, d1) para chat y decisiones con imágenes. Requiere payloads específicos: kstuff-lite, etaHEN, ShadowMountPlus, elfldr (puerto 9021), ps5-exporter (opcional) y ftpsrv (puerto 2121).

Se instala copiando la carpeta PPSA99575 a /data/homebrew vía FTP y usando ShadowMountPlus para añadirla al menú principal. Los modelos se guardan en /data/PS5LM/models o en USB montado como PS5LM/models. El código fuente está bajo licencia GPL-3.0-or-later, mientras que llama.cpp conserva su licencia MIT. No incluye archivos del SDK de Sony, claves, firmware ni pesos de modelos. La aplicación no está afiliada con Sony Interactive Entertainment.

Soporta controles DualSense con botones L1/R1 para navegar por Home, Models, API, Console y Settings. En la sección Models, se puede buscar, cambiar de modelo, pausar o cancelar descargas. La sección Console permite ver los últimos 2 minutos o 1 hora de métricas del sistema. En Settings se pueden ver logs del-app y del-servidor, y acceder a diagnósticos.

Cifras clave: 0.5 GB para Qwen 3.5 0.8B Q4_K_M con 207 tokens por segundo; 5.3 GB para Qwen 3.5 9B Q4_K_M con 55 tokens por segundo; 9.2 GB para Qwen 3.8 27B UD-Q2_K_XL con ~20 tokens por segundo y contexto de 64k. El modelo d1 Omni 600M usa 1.1 GB y responde 3 preguntas en 0.3 s; 720p + 7 preguntas en 2.9 s. El servants HTTP del modelo escucha en el puerto 8081.

Ejemplo de uso con curl:

```bash
curl http://<console>:8081/v1/systemone \
  -H 'Content-Type: application/json' \
  -d '{
    "state": "I was charged twice this month. Refund me or I cancel.",
    "questions": {
      "intent": {
        "type": "choice",
        "instructions": "What does the customer want?",
        "criteria": {
          "refund": null,
          "information": null,
          "cancel": null
        }
      },
      "angry": {
        "type": "noul",
        "instructions": "Is the customer angry?"
      }
    }
  }'
```

Lo que no se sabe: no se especifica el rendimiento exacto en tokens por segundo para modelos distintos a los mencionados. No se detalla la latencia promedio de respuesta en red para dispositivos remotos. No se explica cómo se maneja la gestión de memoria cuando se cargan modelos grandes en memoria compartida. No se menciona si hay límite de dispositivos conectados simultáneamente a la API. No se describe el consumo de energía real en vatios durante la carga de modelos pesados. No se especifica la compatibilidad con diferentes versiones de GPU o variaciones de hardware dentro de PS5 Slim. No se detalla cómo se maneja la actualización de controladores Vulkan o patches de mesa. No se explica el tiempo de arranque o carga del modelo antes de estar listo para servir. No se menciona si hay soporte para modelos multimodales más allá de los listados (ej. LLaVA, BLIP). No se especifica la tasa de actualización de las gráficas de la página Console (ej. cada segundo).
