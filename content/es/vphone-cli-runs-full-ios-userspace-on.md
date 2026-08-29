---
title: "vphone-cli permite ejecutar un iPhone virtual completo en macOS Sequoia con Apple"
summary: "La herramienta usa Virtualization.framework y el SDK de iOS para levantar una VM con SSH y VNC. Requiere desactivar SIP o usar modo debug con amfidont para cargar entitlements privados. Ofrece cinco variantes de firmware con hasta 141 parches anti-detección."
lang: es
story: vphone-cli-runs-full-ios-userspace-on
publishedAt: 2026-08-29T12:55:55.260Z
sourceUrl: "https://github.com/Lakr233/vphone-cli"
sourceName: "Hacker News (portada)"
priority: routine
tags: [virtualizacion, ios, seguridad, apple-silicon]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
vphone-cli arranca un iPhone virtual completo en macOS 15 Sequoia usando el `Virtualization.framework` de Apple y la infraestructura de investigación de Private Cloud Compute. El proyecto compila un daemon invitado (`vphoned`) con el iOS SDK y lo ejecuta dentro de una máquina virtual que expone SSH en el puerto 22222 y VNC en el 5901. Todo se gestiona desde la línea de comandos y los datos quedan en `~/.vphone`, redirigible con `VPHONE_ROOT`.

El requisito imprescindible es un Mac con Apple Silicon. Además hay que relajar las protecciones del sistema: o bien desactivas SIP por completo y añades el argumento de arranque `amfi_get_out_of_my_way=1`, o bien usas el modo "debug-only" de SIP junto con la herramienta `amfidont`. Sin ese paso los entitlements privados `PV=3` que necesita el daemon no se cargan.

La herramienta ofrece cinco variantes de firmware con nivel creciente de parches. La variante `less` aplica solo 4 parches en 2 fases; `regular` sube a 42 parches en 10 fases; `dev` añade 53 parches en 12 fases; `jb` incluye 113 parches en 14 fases y deja Sileo y TrollStore instalados en el primer arranque; `exp` llega a 141 parches en 18 fases con parches anti-detección de VM pensados para investigación de seguridad. El acceso SSH usa `mobile@<ip>` (contraseña `alpine` en `jb`) o `root@<ip>` en `regular` y `dev`.

```bash
brew install python@3.13 aria2 wget gnu-tar openssl@3 ldid-procursus sshpass keystone cmake libusb ipsw zstd
brew install zqxwce/tap/vphone-cli

# O compilar desde fuente
git clone --recurse-submodules https://github.com/Lakr233/vphone-cli.git
./scripts/setup_tools.sh   # dependencias, toolchain, venv
./scripts/build.sh         # firma, bundle .app, cross-compila vphoned
cd .build/vphone-cli.app/Contents/MacOS/
vphone-cli --help
```

La gestión de máquinas virtuales cubre el ciclo completo:

```bash
vphone-cli vm create myphone -V jb
vphone-cli vm launch myphone

# Operaciones adicionales
vphone-cli vm list --json
vphone-cli vm info myphone
vphone-cli vm new myphone --cpu 8 --memory 8192
vphone-cli vm config myphone --cpu 8 --memory 8192
vphone-cli vm clone myphone myphone-2
vphone-cli vm export myphone --out myphone.tzst
vphone-cli vm import myphone.tzst --name restored
vphone-cli vm rename myphone iphone16
vphone-cli vm delete iphone16
```

También permite construcción manual paso a paso (`vm new`, `fw prepare`, `fw patch`, `vm launch --dfu`, `restore`, `cfw install`, `vm launch`) y actualización a iOS más nuevo apuntando `fw prepare` a IPSW concretos con `--iphone-source` y `--cloudos-source`.

Cada VM expone un socket de control en el host (`<bundle>/vphone.sock`) que acepta comandos programáticos: capturas de pantalla, toques, swipes, pulsaciones de tecla y portapapeles. Sobre ese socket se monta `vphone-mcp`, un servidor MCP que permite dirigir tests end-to-end desde un agente de IA.

## Lo que no se sabe

- Rendimiento real (tiempo de arranque, latencia de UI, consumo de CPU/RAM) en distintos modelos de Mac.
- Compatibilidad con apps que requieren Secure Enclave, Face ID/Touch ID, Apple Pay o DRM (Widevine/FairPlay).
- Si macOS 15.0 exacto basta o se necesita una versión puntual posterior.
- Soporte para iOS 18.x / 19.x más allá de los entornos listados en "Tested Environments".
- Documentación pública del esquema de mensajes del socket de control.
- Licencia del proyecto y permiso de uso comercial.
- Estrategia recomendada para backups y actualizaciones de la VM a largo plazo.
- Posible telemetría o conexiones de red no documentadas.
