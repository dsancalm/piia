---
title: "FTL ejecuta contenedores Linux sin kernel del host"
summary: "Cada contenedor enlaza su propio kernel en espacio de usuario, así que actualizar la pila TCP o añadir syscalls no toca el host ni pide módulos firmados. La v0.1.0 ya corre hilos, epoll y async Rust; la hoja de ruta apunta a SMP y ARM64 para enero de 2027."
lang: es
story: ftl-os-runs-linux-binaries-without-a
publishedAt: 2026-10-04T12:43:38.571Z
sourceUrl: "https://ftl-os.org/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [contenedores, kernel, linux, rust]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
FTL es un sistema operativo para la nube construido como una biblioteca de espacio de usuario. El diseño permite compilar el kernel del SO como un objeto compartido y enlazarlo directamente en cada contenedor, de forma que añadir una llamada al sistema, corregir un fallo en la pila TCP o actualizar el gestor de procesos deja de requerir un reinicio del host ni un módulo de kernel firmado.

La arquitectura separa dos piezas. El **FTL Kernel** expone una interfaz mínima , vCPU, memoria, dispositivos, parecida a la de un hipervisor ligero que se ejecuta en *user mode* sin necesidad de hardware *bare-metal*. Encima, cada contenedor levanta su propio **Userspace OS**, una implementación completa de *syscalls* de Linux (procesos, *fork/exec*, memoria, señales, VFS, TCP/IP, */proc*, */dev*, *drivers*) que corre enteramente en espacio de usuario. El servidor HTTP en Rust que sirve `ftl-os.org` es ya una aplicación Linux estándar ejecutándose sobre esta pila.

```
FTL Linux ┌────────────────────────────────┐ ┌────────────────────────────────┐
│┏━━━━━━━━━━━━━┓ ┏━━━━━━━━━━━━━┓│ │┏━━━━━━━━━━━━━┓ ┏━━━━━━━━━━━━━┓│
│┃ ┃ ┃ ┃│ │┃ ┃ ┃ ┃│
│┃ Linux ┃ ┃ Linux ┃│ │┃ Linux ┃ ┃ Linux ┃│
│┃ Process ┃ ┃ Process ┃│ │┃ Process ┃ ┃ Process ┃│
│┃ ┃ ┃ ┃│ │┃ ┃ ┃ ┃│
│┃╌╌╌╌╌ Linux system calls ╌╌╌╌╌┃│ │┗━━━━━━━━━━━━━┛ ┗━━━━━━━━━━━━━┛│
│┗━━━━━━━━━━━━━┛ ┗━━━━━━━━━━━━━┛│ │┃ ┃│ └────────────────────────────────┘
│┃ Userspace OS ┃│ ╌╌╌╌╌╌╌╌ Linux's interface ╌╌╌╌╌╌╌
│┃ (Process, VFS, TCP, ...) ┃│ ╔════════════════════════════════╗
│┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛│ ║ ║
└────────────────────────────────┘ ║ Linux Kernel ║
╌╌╌╌╌╌╌ minimal interface ╌╌╌╌╌╌╌╌ ║ ║
╔════════════════════════════════╗ ║ process, fork/exec, memory, ║
║ FTL Kernel ║ ║ signals, TCP/IP, /proc, ║
║ vCPU, memory, drivers, ... ║ ║ /dev, drivers ... ║
╚════════════════════════════════╝ ╚════════════════════════════════╝
```

La hoja de ruta publicada marca hitos trimestrales: septiembre de 2026 cerró la v0.0.1 con un servidor HTTP simple; octubre la v0.1.0 añade hilos Linux, *epoll* y soporte *async* en Rust; noviembre apunta al sistema de archivos; diciembre a Node.js y Go; enero de 2027 a SMP, imágenes de contenedor y ARM64.

## Lo que no se sabe

- Rendimiento real frente a Linux nativo, Kata Containers, gVisor o Firecracker.
- Cobertura concreta del ABI de Linux (porcentaje de *syscalls* implementadas, compatibilidad con glibc/musl).
- Licencia, gobernanza y respaldo corporativo o comunitario.
- Detalles de ciclo de vida: actualizaciones en caliente, migración, *snapshots*.
- Soporte de redes avanzadas (eBPF, XDP, DPDK, CNI) y almacenamiento (CSI).
- Disponibilidad de imágenes OCI/Docker e integración con *containerd* o CRI de Kubernetes.
- Fecha estimada de una versión 1.0 *production-ready*.
