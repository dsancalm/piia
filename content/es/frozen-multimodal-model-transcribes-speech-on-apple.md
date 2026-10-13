---
title: "Google transcribe una hora de audio en 12,6 segundos en un MacBook Air M3 base"
summary: "Embedding Gemma Transcribe reutiliza el codificador de audio congelado de EmbeddingGemma 2 y un reader minúsculo entrenado en dos horas para buscar palabras en un vocabulario compartido."
lang: es
story: frozen-multimodal-model-transcribes-speech-on-apple
publishedAt: 2026-10-13T14:35:37.786Z
sourceUrl: "https://eg2.haku.sh/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [google, transcripcion, apple-silicon, on-device]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Google ha publicado Embedding Gemma Transcribe, una aplicación nativa para macOS 14 o posterior que transcribe una hora de audio en 12,6 segundos usando solo el Neural Engine de un MacBook Air M3 base con 8 GB de memoria. El logro no viene de un modelo de reconocimiento de voz convencional, sino de reutilizar EmbeddingGemma 2, un modelo de embeddings multimodal (texto, imagen, audio, vídeo) cuyo codificador de audio permanece congelado.

La arquitectura añade un "reader" diminuto que proyecta ventanas cortas de audio al espacio de texto compartido por el modelo base. Para cada ventana, el sistema busca la palabra más cercana entre las ~229 000 del vocabulario inglés y la emite. Un segundo modelo minúsculo inserta después puntuación y mayúsculas. Solo el reader se entrenó: menos de dos horas sobre 8 GPUs H100 con datos de voz inglesa de licencia abierta. El codificador original nunca vio una tarea de speech-to-text.

La aplicación pesa 715 MB de pesos, que se descargan en la primera ejecución. La interfaz permite arrastrar un archivo o mantener pulsada la tecla Right Option para dictar directamente en cualquier campo de texto del sistema. El audio nunca abandona la máquina.

En la misma máquina de referencia (MacBook Air M3 base 8 GB), IBM Granite Speech 5.0 TurboCTC bajo MLX tarda 25,7 segundos (150× tiempo real). Modelos como NVIDIA Parakeet TDT 0.6B v3 alcanzan 156× en M4 Pro y 335× en M5 Pro; su fine-tune Phonon-2 llega a 480× en M5 Pro, pero requieren GPU o backends distintos. La propuesta de Google compite en velocidad pura de inferencia on-device sin hardware discreto.

El Word Error Rate actual ronda el 5 %, frente al 2, 3 % de los modelos punteros de servidor. Los autores atribuyen la brecha a la calidad del reader y prevén cerrarla con más datos y mejor arquitectura, sin tocar el encoder base.

## Lo que no se sabe

- Latencia de la primera inferencia en frío (carga del modelo en el Neural Engine).
- Consumo de RAM y batería en transcripciones sostenidas.
- Soporte para idiomas distintos del inglés ni hoja de ruta multilingüe.
- Licencia exacta de los pesos del reader y del modelo completo.
- Calidad en audio ruidoso, acentos fuertes, habla superpuesta o dominios técnicos.
- Capacidad de exportar SRT, VTT o JSON con marcas de tiempo por palabra o segmento.
- Requisitos mínimos precisos de macOS y compatibilidad con Macs Intel.
- Planes concretos para reducir el WER: más datos, cambios en el reader o fine-tuning del encoder.
