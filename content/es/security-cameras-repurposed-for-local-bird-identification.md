---
title: "Guía para identificar aves con cámaras de seguridad y BirdNET-Go en local"
summary: "Jason Tucker explica cómo encadenar Frigate, ffmpeg y BirdNET-Go en un Intel NUC para analizar audio de cuatro cámaras Reolink en tiempo real sin nube, filtrando resultados por confianza y zona geográfica."
lang: es
story: security-cameras-repurposed-for-local-bird-identification
publishedAt: 2026-09-01T12:19:05.219Z
sourceUrl: "https://jasontucker.blog/how-i-turned-my-security-cameras-into-an-automatic-bird-identification-system-with-birdnet-go/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [birdnet, frigate, automatizacion, aves]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Jason Tucker ha publicado en su blog una guía completa para convertir cámaras de seguridad estándar en un sistema automático de identificación de aves usando BirdNET-Go. El artículo detalla cómo encadenar la captura de vídeo, la extracción de audio y la inferencia local sin depender de servicios en la nube.

El pipeline parte de cámaras Reolink que graban continuamente en un servidor Frigate. Desde ahí, un script en Go extrae segmentos de audio de 3 segundos cada 10 segundos, los convierte a WAV mono a 48 kHz y los pasa a BirdNET-Go, un port del modelo original de Cornell Lab of Ornithology compilado como binario único sin dependencias de Python.

```bash
ffmpeg -i rtsp://camera/stream -t 3 -ar 48000 -ac 1 -f wav pipe:1 | birdnet-go -i - -o json
```

BirdNET-Go carga el modelo TensorFlow Lite (≈ 20 MB) y devuelve predicciones con especie, confianza y marca temporal. El autor filtra resultados por encima de 0,5 de confianza y los almacena en SQLite junto con la ruta al clip de vídeo original para revisión posterior.

El hardware usado es un Intel NUC i5 de 8ª generación (TDP 15 W) que procesa cuatro cámaras en tiempo real manteniendo la CPU por debajo del 40 %. El consumo total del conjunto ronda los 25 W. Frigate se encarga de la detección de movimiento y grabación en bucle; BirdNET-Go corre como servicio systemd independiente que lee del buffer de Frigate vía socket Unix.

Los falsos positivos principales vienen de ruidos de motores, viento en el micrófono y canto de grillos por la noche. El autor aplica una lista de especies esperadas por zona geográfica (ebirdst) para descartar detecciones improbables y reduce el umbral a 0,3 solo para especies de interés prioritario.

El código completo, incluyendo el servicio systemd, el script de extracción y la configuración de Frigate, está en el repositorio `jasontucker/birdcam` bajo licencia MIT.

---

### Lo que no se sabe

- Precisión cuantitativa (precision/recall) frente a etiquetado manual en el entorno del autor.
- Latencia exacta entre el canto y la notificación.
- Qué modelo TFLite concreto se usa (versión de BirdNET, número de clases).
- Coste total del hardware si se parte de cero.
