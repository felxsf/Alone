# Guía de uso para desarrolladores

## Filosofía
- Accesibilidad nativa, contraste adecuado, foco visible y roles ARIA correctos.
- Consistencia mediante tokens: colores, tipografía, espaciado, radios y sombras.
- Componentes simples, composables y con estados claros (hover, active, disabled, focus, valid/invalid).

## Estructura del proyecto
- assets/css/base.css: tokens, layout, tipografía y utilidades.
- assets/css/components.css: estilos de componentes.
- assets/js/ui.js: interacciones y validación accesible.
- index.html: documentación y prototipo navegable.
- design-tokens.json: tokens para integración cross-plataforma.

## Tokens
- Paleta: primary, secondary, success, danger, warning, info y escala neutral.
- Tipografía: Inter; base 16px; escalas display, h1–h3, body, caption.
- Espaciado: space-1 a space-7.
- Bordes: radius-sm/md/lg.
- Sombras: shadow-sm/md/lg.

## Grid y responsividad
- Utiliza clases .grid y modificadores .cols-N, .cols-md-N, .cols-sm-N.
- Puntos de corte: 1024px y 768px; contenedor fluido con padding.

## Botones
- Base .btn y variantes .btn--primary, .btn--secondary, .btn--tertiary, .btn--success, .btn--danger, .btn--warning, .btn--info.
- Tamaños: .btn--sm, .btn--md, .btn--lg.
- Estados: hover/active/disabled; foco con outline accesible.

## Formularios
- Inputs .input, selects .select, checkboxes .checkbox, radios .radio.
- Validación visual: .is-valid, .is-invalid y .error-text; aria-invalid.
- Ejemplo: ver formulario en index.html (sección Formularios).

## Modales
- Estructura .modal con .modal__overlay y .modal__content.
- Atributos: role="dialog" o "alertdialog", aria-modal, aria-labelledby, aria-describedby.
- Interacciones: apertura con [data-open-modal], cierre con [data-close-modal], Escape, overlay y trampa de foco.

## Tarjetas
- Base .card; variante .card--product con imagen; .chip para estados.
- Acciones dentro de .card__actions usando .btn.

## Accesibilidad
- Colores con contraste AA mínimo sobre fondo blanco.
- Foco visible en controles y enlaces.
- Navegación por teclado en modales.
- aria-invalid en campos con error y mensajes asociados.

## Integración
- Importa assets/css/base.css y assets/css/components.css.
- Usa clases del sistema de diseño. Evita estilos inline.
- Extiende mediante variables CSS si necesitas theming.

## Figma/Sketch/XD
- Usa design-tokens.json para crear estilos en tu herramienta.
- Crea estilos de color, texto y efectos basados en los tokens.
- Construye componentes con variantes siguiendo las clases definidas.

## Versionado y extensiones
- Añade nuevos tokens y componentes manteniendo nomenclatura y estados.
- Valida accesibilidad con herramientas automáticas y revisión manual.
