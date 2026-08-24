---
title: "Paint y Photos marcan con un GUID invisible cada imagen generada por IA en local"
summary: "Antes de crear la imagen, Paint envía el prompt a un servidor de moderación que devuelve un identificador único de 16 bytes; una DLL lo incrusta en los píxeles aunque el proceso se anuncie como offline y sin opción para desactivarlo."
lang: es
story: paint-embeds-invisible-ai-watermark-tied-to
publishedAt: 2026-08-24T21:08:35.577Z
sourceUrl: "https://xusheng.dev/posts/reversing/mspaint_invisible_watermark/main/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [windows, paint, ia, privacidad]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Microsoft Paint y Photos insertan una marca de agua invisible en cada imagen generada con sus modelos locales de IA, aunque el proceso se venda como "offline". Antes de generar, Paint envía el *prompt* a un endpoint de moderación remoto (`apsaiservices-a0fqcjc6bzbhgdcd.b02.azurefd.net/v1/paint-cocreator/moderate-prompt`). El servidor responde con un JSON que incluye un `watermarkId`: un GUID de 16 bytes emitido por Microsoft. Ese GUID es lo que la DLL `Watermarker.dll` escribe en la imagen mediante la función `WmkWriteWatermark`, que falla si no recibe exactamente 16 bytes y convierte la generación en error.

La marca codifica 18 bytes: un byte fijo `0x4c`, los 16 bytes del GUID y un *checksum* (suma módulo 256 de los 16 bytes). El algoritmo exige una imagen de al menos 192×192 píxeles, redondea dimensiones a múltiplos de 8 y requiere al menos tres colocaciones por bit (144 bits totales). En una imagen sintética BGRA de 512×512, 193.376 de 262.144 píxeles cambiaron tras añadir la marca. El ajuste de marca de agua visible (logo de Copilot) no controla esta marca invisible. Microsoft documenta que Paint añade metadatos C2PA y limita el guardado a formatos que los preservan: PNG, JPEG, GIF y `.paint`.

## Modelos locales, claves y binarios

En los PCs Copilot+ Paint incluye cuatro modelos ONNX cifrados con extensión `.onnxe` en `C:\Program Files\WindowsApps\Microsoft.Paint_11.2605.71.0_x64__8wekyb3d8bbwe\PaintApp\`:

```
seg.onnxe 23.1 MB
inseg_enc.onnxe 28.0 MB
inseg_dec.onnxe 16.5 MB
mager.onnxe 302.4 MB
```

`seg.onnxe` se descifra con XOR usando la clave `"Microsoft_2023"`. Las otras tres usan una clave alfanumérica de 4.096 bytes almacenada en `segapi.dll`. Tras descifrar, `onnx.checker.check_model()` valida los modelos resultantes (`seg.onnx`: 1.094 nodos; `inseg_enc.onnx`: 1.014 nodos; `inseg_dec.onnx`: 1.133 nodos; `mager.onnx`: 15.284 nodos). `Watermarker.dll` pesa 1,67 MB.

## Qué no se sabe

- Si la marca invisible sobrevive a re-compresión, recorte, cambio de formato o edición posterior.
- Robustez exacta del esquema basado en SVD/bloques frente a redimensionado, capturas de pantalla o compresión *lossy*.
- Si el `watermarkId`/GUID se registra en telemetría de Microsoft y permite vincular la imagen a la cuenta, usuario o sesión.
- Si existe forma documentada u oficial para desactivar la marca invisible (la UI visible no la controla).
- Alcance geográfico de la moderación remota y emisión de GUID.
- Qué ocurre si el endpoint de moderación no está disponible (fallo de red, bloqueo *firewall*, región sin servicio).
- Si Photos usa el mismo endpoint y la misma `Watermarker.dll` que Paint.
- Detalles del formato `.paint` y su adopción fuera de Windows.
- Si los modelos `.onnxe` locales son idénticos en todas las *builds* de Windows 11 o varían por canal (Canary/Dev/Beta/Release).
