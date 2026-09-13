---
title: "JetKVM Mini lanza un KVM sobre IP por 39 dólares que cabe en una caja de cerillas"
summary: "El dispositivo usa un ESP32-P4X con codificador H.264 por hardware para capturar 1080p a 30 fps y gestionar BIOS o reinicios duros sin tarjetas propietarias."
lang: es
story: jetkvm-mini-packs-kvm-over-ip-into
publishedAt: 2026-09-13T12:34:32.059Z
sourceUrl: "https://jetkvm.com/blog/introducing-jetkvm-mini"
sourceName: "Hacker News (portada)"
priority: routine
tags: [kvm, hardware, servidores, esp32]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
JetKVM Mini es un KVM sobre IP del tamaño de una caja de cerillas. La versión cableada cuesta 39 dólares y la inalámbrica 42. Llegará en octubre de 2026 y permite gestionar BIOS, UEFI y reinicios duros de cualquier servidor u ordenador sin necesitar iDRAC, iLO ni tarjetas propietarias que suelen costar diez veces más.

El hardware usa un ESP32-P4X con codificador H.264 por hardware. Captura vídeo a 1080p y 30 fps, o 720p a 60 fps, y expone dos puertos USB: uno High Speed a 480 Mbps para el equipo objetivo y otro Full Speed a 12 Mbps de uso general. La versión W añade un ESP32-C5 para Wi-Fi 6 y Bluetooth LE, empleado solo en la configuración inicial desde el navegador del móvil. La carcasa de aluminio mide 42 × 42 × 23 mm e incluye una ranura TF para medios virtuales y una pequeña pantalla que muestra IP, estado de USB y vídeo.

El firmware es abierto desde el primer día y comparte protocolos, interfaz web, sistema de actualizaciones y extensiones con el JetKVM original. El arranque seguro se apoya en un digest de clave pública grabado en eFuse. JetKVM OS Services, que llegará después, añadirá captura 4K, portapapeles compartido, terminal de invitado y transferencia de archivos.

Lo que no se sabe
- Rendimiento real bajo carga y latencia frente al JetKVM original.
- Distribuidores autorizados y geografías de venta.
- Detalles de futuras extensiones más allá de ATX, alimentación DC y serie.
- Consumo y autonomía del modelo inalámbrico.
- Límite de capacidad de la tarjeta TF.
- Fecha concreta de OS Services y de las nuevas extensiones anunciadas como "lanzamiento posterior".
