---
title: Kollana
year: 2026
category: Aplicación móvil / Marketplace de servicios
track: systems
experienceId: independent
role: Diseño y desarrollo integral
status: Prelanzamiento
description: Aplicación móvil que conecta personas que necesitan un servicio en el hogar con profesionales técnicos cercanos.
summary: Producto móvil construido de extremo a extremo para solicitar servicios, recibir ofertas de visita y elegir al profesional adecuado.
participation: "Diseñé y desarrollé el producto completo: aplicaciones para Android e iOS, panel administrativo, backend, pagos, lógica geoespacial e infraestructura."
technologies:
  - vue
  - capacitor
  - supabase
  - postgresql
responsibilities:
  - Aplicación híbrida con Vue y Capacitor
  - Panel administrativo construido desde cero
  - Backend en Supabase y lógica en Edge Functions
  - Búsqueda de profesionales cercanos con PostGIS
  - Arquitectura orientada a eventos
  - Flujo de solicitudes y ofertas de visita
  - Integración de pagos con Mercado Pago
challenges:
  - Coordinar solicitudes, ubicación, disponibilidad y ofertas entre dos tipos de usuario.
  - Diseñar un flujo móvil completo que pudiera llegar a tiendas y operar con un backend ligero.
solution:
  - Construí una experiencia donde el cliente publica una necesidad y compara ofertas de profesionales cercanos antes de aceptar una visita.
  - Concentré la lógica del producto en Supabase y Edge Functions para acelerar la implementación sin perder control sobre los eventos.
  - Utilicé PostGIS para resolver proximidad y cobertura geográfica.
results:
  - Aplicación Android publicada y versión iOS en proceso de verificación al momento de documentar el caso.
  - Producto completo preparado para iniciar operaciones y medir uso después del lanzamiento.
gallery:
  - src: /images/projects/kollana/01-inicio.webp
    label: Inicio
    alt: Pantalla de inicio de Kollana con accesos a solicitudes, profesionales, historial y categorías de servicios.
    orientation: portrait
  - src: /images/projects/kollana/04-solicitar-servicio.webp
    label: Solicitar servicio
    alt: Formulario para describir, ubicar y programar una solicitud de instalación eléctrica.
    orientation: portrait
  - src: /images/projects/kollana/06-espera-ofertas.webp
    label: Espera de ofertas
    alt: Mapa de búsqueda de profesionales cercanos mientras una solicitud espera ofertas.
    orientation: portrait
  - src: /images/projects/kollana/10-detalle-oferta.webp
    label: Detalle de oferta
    alt: Detalle de la propuesta de un profesional con tarifa, fecha y opciones para aceptar o rechazar.
    orientation: portrait
  - src: /images/projects/kollana/15-visita-curso-cliente.webp
    label: Visita en curso · cliente
    alt: Estado de una visita en curso visto por el cliente con los datos del profesional.
    orientation: portrait
  - src: /images/projects/kollana/20-calificar-profesional.webp
    label: Calificar al profesional
    alt: Pantalla para que el cliente califique la atención del profesional.
    orientation: portrait
featured: true
featuredOrder: 4
published: true
caseStudyReady: true
---
