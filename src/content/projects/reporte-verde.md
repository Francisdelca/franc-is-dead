---
title: Reporte Verde
category: Riesgo ambiental / Geoespacial / IA aplicada
track: systems
experienceId: ludik
role: Desarrollo geoespacial, frontend y backend
status: Entregado
description: Sistema para automatizar la evaluación ambiental y territorial utilizada en procesos de crédito para actividades productivas en la Amazonía.
summary: Un flujo que transforma fotografías con coordenadas en una evaluación geoespacial basada en datos públicos, capas vectoriales y rásteres.
participation: Dentro del equipo de Ludik desarrollé la parte geoespacial, el frontend y parte del backend del sistema.
collaborationNote: Proyecto desarrollado en equipo para Conservación Internacional y posteriormente entregado al Ministerio del Ambiente.
technologies:
  - python
  - aws
responsibilities:
  - Servicio de validación geoespacial
  - Procesamiento de capas vectoriales y rásteres
  - Extracción de coordenadas impresas en fotografías mediante IA
  - Evaluación de deforestación, uso agrícola y zonas protegidas
  - Frontend y parte del backend
  - Implementación con AWS Lambda y EC2
challenges:
  - La validación dependía de visitas presenciales, fotografías y revisión posterior por una persona especialista en GIS.
  - La evaluación debía combinar múltiples fuentes públicas y criterios territoriales.
solution:
  - Automatizamos la extracción de coordenadas desde las fotografías cargadas por el equipo de campo.
  - Construí un servicio que consulta capas y rásteres para evaluar antecedentes de deforestación, aptitud agrícola, áreas naturales protegidas y zonas hidrográficas.
  - El sistema devuelve una evaluación utilizable sin que cada caso tenga que pasar primero por un flujo GIS manual.
results:
  - Un análisis que antes requería coordinación manual puede obtenerse en cuestión de minutos.
  - El equipo de campo puede iniciar la evaluación cargando directamente sus fotografías.
featured: false
published: false
caseStudyReady: false
---
