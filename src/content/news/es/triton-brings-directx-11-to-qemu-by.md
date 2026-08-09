---
title: "Triton lleva DirectX 11 a las máquinas virtuales QEMU en Windows"
summary: "Un nuevo driver de Windows, Triton, aporta soporte completo de DirectX 11 a QEMU con ayuda de Neptune. Su enfoque trabaja con los DDIs en vez de traducir bytecode intermedio, un diseño que evita los fallos de otros proyectos y reutiliza el protocolo probado."
lang: es
story: triton-brings-directx-11-to-qemu-by
publishedAt: 2026-08-09T07:34:34.720Z
sourceUrl: "https://blog.getutm.app/2026/introducing-triton-directx-11-driver-for-qemu/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [qemu, directx, virtualización, triton]
generatedBy: deepseek/deepseek-v4-flash-0731
---
Triton es un driver de Windows que, junto con Neptune, aporta soporte completo de DirectX 11 a máquinas virtuales QEMU. Neptune es una capa de reenvío de protocolo Direct3D para VirtIO que serializa llamadas de API Direct3D a través del límite del hipervisor. La novedad no está en implementar las APIs de DirectX, sino en trabajar con los DDIs (Device Driver Interface), que es el enfoque correcto para aceleración gráfica en Windows.

El driver UMD de Triton transforma llamadas DDI de vuelta a llamadas de API DirectX, reutilizando el protocolo Neptune ya probado. Ese diseño evita el problema de traducir bytecode intermedio, que es donde otros proyectos fallan.

## De dónde sale el código

VirtualBox tiene el único UMD de DirectX 11 de código abierto que funciona, pero su código no puede integrarse por incompatibilidad de licencia (GPLv3 frente a MIT/LGPLv2). Además, su conversión DDI a bytecode y luego a API puede causar bugs que limitan la compatibilidad con juegos, así que no se adoptó. Mesa tiene un UMD de DirectX 10 que sirve como ejemplo limpio para integrar Triton.

De VirtualBox sí se aprovecharon dos cosas: la lista de prototipos DDI implementados se usó como requisitos mínimos para una implementación funcional, y su algoritmo de firma DXBC es útil porque Microsoft no lo publica en ninguna parte.

El mayor desafío de Triton es el código de shader DXBC (DirectX Byte Code), el IR que emite el compilador FXC de Microsoft. El proyecto usa componentes de bajo nivel de macOS para manejar recursos compartidos entre procesos:

```objc
MTLSharedTextureHandle
MTLSharedTextureHandle
newBufferWithBytesNoCopy:length:options:deallocator:
MTLSharedEventHandle
```

Y en el lado de DirectX 11, la interfaz de contexto limpia vistas de acceso desordenado:

```cpp
ID3D11DeviceContext::ClearUnorderedAccessViewUint
```

## Lo que no se sabe

La fuente no especifica qué juegos modernos de Windows funcionan con Triton más allá de Crash Bandicoot Trilogy. No se indica el rendimiento concreto (FPS, latencia) frente a otras soluciones. No se detalla qué características de DirectX 11 están implementadas y cuáles faltan. No se menciona si Triton soporta versiones de Windows distintas a Windows 11 ARM64, ni qué hardware o hosts (además de macOS) son compatibles.
