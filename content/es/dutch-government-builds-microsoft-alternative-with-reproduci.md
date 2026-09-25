---
title: "Países Bajos construye un puesto de trabajo digital sin depender de Microsoft"
summary: "El proyecto DAWO desarrolla capas abiertas , sistema operativo, IA, nube y colaboración, para que cada ministerio migre por fases sin quedar atrapado en un nuevo proveedor único."
lang: es
story: dutch-government-builds-microsoft-alternative-with-reproduci
publishedAt: 2026-09-25T12:03:24.958Z
sourceUrl: "https://www.dawo.community/en/"
sourceName: "Hacker News (portada)"
priority: urgent
tags: [soberania, nixos, gobierno, softwarelibre]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
El gobierno neerlandés está construyendo un puesto de trabajo digitalmente autónomo llamado DAWO (Digitale Autonome Werkplek Overheid). La iniciativa reúne a administración, industria y sociedad civil con un objetivo explícito: reducir la dependencia de Microsoft y recuperar control sobre la infraestructura que usan los funcionarios a diario. No se trata de cambiar una licencia por otra, sino de reemplazar la pila completa por bloques reemplazables, inspeccionables y gobernados en abierto.

El bloque de sistema operativo se llama DAWO-NixOS. La elección de NixOS no es casual: su gestión declarativa de la configuración permite que cada puesto de trabajo sea reproducible bit a bit, que los cambios se revisen como código y que un despliegue pueda revertirse al instante si una actualización rompe algo. Eso elimina la deriva de configuración que obliga a los equipos de TI a mantener imágenes "golden" frágiles y a aplicar parches a mano en cientos de máquinas distintas.

La arquitectura se organiza en cuatro capas públicas. Además del sistema operativo, hay bloques para inteligencia artificial abierta y verificable, infraestructura cloud autónoma y soluciones de colaboración abiertas. Cada capa se desarrolla en repositorios accesibles, con calendario, foro y blog donde se discuten decisiones técnicas y se coordinan pilotos. Cualquiera puede leer; contribuir al foro requiere cuenta, pero el código y la documentación están abiertos a aportaciones externas.

Lo que distingue a DAWO de otros proyectos de "soberanía digital" es que no entrega un producto cerrado. Entrega bloques de construcción. Un ministerio puede adoptar DAWO-NixOS hoy para sus portátiles, mantener su proveedor de nube actual y sustituir la suite ofimática cuando el bloque de colaboración madure. Esa modularidad reduce el riesgo de bloqueo con un nuevo proveedor y permite migraciones por fases, algo crítico en entornos con miles de usuarios y requisitos legales de accesibilidad y archivo.

La gestión de secretos y credenciales dentro de NixOS sigue siendo un punto de atención. La comunidad usa herramientas como sops-nix o agenix para descifrar secretos en tiempo de activación, pero la integración con los sistemas de identidad existentes del gobierno (DigiD, eHerkenning) y la rotación automática de claves en entornos clasificados no está documentada en el material público. Tampoco se ha publicado el modelo de gobernanza que decide qué paquetes entran en la imagen base, cómo se resuelven conflictos entre ministerios con necesidades distintas ni el plan de formación para funcionarios acostumbrados a Windows y Office.

Lo que no se sabe:
- Fecha de inicio del proyecto y cronograma previsto.
- Número de ministerios u organismos ya usando DAWO-NixOS en producción.
- Porcentaje de sustitución de Microsoft Office / Windows objetivo.
- Presupuesto asignado y fuentes de financiación.
- Licencias concretas de los componentes (GPL, MIT, EUPL, etc.).
- Cómo se gestiona la cadena de suministro y actualizaciones de seguridad en NixOS a escala gubernamental.
- Qué soluciones de colaboración (Nextcloud, Matrix, LibreOffice Online, etc.) se han elegido finalmente.
- Resultados de pilotos o evaluaciones de usabilidad con funcionarios.
- Modelo de gobernanza: quién decide la hoja de ruta y cómo se resuelven conflictos.
- Plan de migración de datos y formación de usuarios finales.
