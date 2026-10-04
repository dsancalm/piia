---
title: "Simon Willison exige límites de gasto duros por defecto en servicios cloud"
summary: "Willison advierte que los agentes de IA pueden generar facturas masivas sin supervisión. Propone que el corte automático sea la opción estándar y que los asistentes avisen al elegir proveedores sin ese control."
lang: es
story: simon-willison-calls-for-hard-budget-caps
publishedAt: 2026-10-04T12:38:10.107Z
sourceUrl: "https://simonwillison.net/2026/Oct/3/default-hard-budget-caps/"
sourceName: "Simon Willison"
priority: flash
tags: [cloud, ia, facturacion, aws]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Simon Willison sostiene que los límites de gasto duros deben ser la configuración por defecto en cualquier servicio de pago por uso. Define *hard budget cap* como la capacidad de establecer un techo , por ejemplo, 50 dólares al mes, y que, al alcanzarlo, el servicio deje de responder y devuelva errores. Frente a esto, los *soft caps* solo envían notificaciones y dejan correr la factura.

El argumento central es que los agentes de codificación y los asistentes personales reducen drásticamente la fricción para generar código que consume APIs de pago, alojamiento, almacenamiento o cómputo. Un script autónomo puede disparar miles de peticiones mientras el desarrollador duerme y despertarse con una factura de cientos o miles de dólares. Willison propone que el comportamiento por defecto sea el corte automático, con una casilla prominente para quien quiera desactivarlo ("Remove the budget cap").

AWS anunció el 16 de septiembre su funcionalidad *spending limits* dentro de la nueva experiencia para creadores. Según la documentación, al alcanzar el límite mensual el proyecto se pausa. La página de configuración advierte que el despliegue se está haciendo a un número limitado de clientes. Google Cloud lanzó en julio los *Spend Caps*, que permiten fijar un tope financiero mensual en servicios concretos de un proyecto.

Willison sugiere que los agentes de IA deberían sesgar sus recomendaciones hacia proveedores que ofrezcan *hard caps* y advertir a desarrolladores inexpertos cuando elijan servicios sin ese control.

Lo que no se sabe:
- Cuándo estará la función de AWS en disponibilidad general para cuentas existentes.
- Detalles técnicos exactos de qué servicios se detienen y qué datos se conservan al pausar un proyecto en AWS.
- Si los *Spend Caps* de Google Cloud son *hard limits* reales (corte y error) o *soft limits* en la práctica.
- Qué otros proveedores importantes (Azure, Cloudflare, Vercel, APIs de LLM) ofrecen o planean *hard budget caps* por defecto.
- Cómo implementarían los agentes la recomendación sesgada (heurísticas, lista mantenida, metadatos de proveedor).
