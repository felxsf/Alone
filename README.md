# Alone - UI/UX Design System

**Alone** es un sistema de diseño moderno y futurista con una estética **Cyberpunk / Sci-Fi**, diseñado para crear interfaces web inmersivas y altamente interactivas. Este proyecto sirve como una base sólida de componentes UI reutilizables, accesibles y visualmente impactantes.

## 🚀 Características Principales

*   **Estética Cyberpunk:** Tema oscuro profundo (`#02020A`) con acentos de neón (Cyan, Purple, Green) y efectos de glassmorphism.
*   **Interactividad Avanzada:**
    *   Fondo de partículas y red tecnológica animada en HTML5 Canvas.
    *   Efectos de escritura ("Typing effect") en encabezados.
    *   Header reactivo al scroll con transiciones fluidas.
    *   Terminal de comandos interactiva simulada.
    *   Efectos "Glitch" y hover animados en tarjetas y botones.
*   **Componentes Completos:**
    *   **Navegación:** Tabs, Acordeones, Breadcrumbs, Paginación, ScrollSpy.
    *   **Feedback:** Notificaciones Toast animadas, Barras de Progreso, Modales accesibles.
    *   **Formularios:** Inputs estilizados, Switches (toggles), validación visual.
    *   **Botones:** Variantes primaria, secundaria, ghost y danger con estados hover tecnológicos.
*   **Responsive & Accesible:** Construido con Grid y Flexbox, totalmente responsive y con soporte ARIA para lectores de pantalla.
*   **Arquitectura Modular:** Separación clara de tokens de diseño (`base.css`), componentes (`components.css`) y lógica (`ui.js`).

## 📂 Estructura del Proyecto

```
Alone/
├── assets/
│   ├── css/
│   │   ├── base.css        # Variables (Tokens), Reset, Grid, Tipografía, Layout base
│   │   └── components.css  # Estilos específicos de cada componente (Botones, Cards, etc.)
│   └── js/
│       ├── bg-effect.js    # Lógica del fondo interactivo (Canvas)
│       └── ui.js           # Lógica de componentes (Tabs, Modales, Terminal, etc.)
├── docs/
│   └── GUIDE.md            # Guía de desarrollo (opcional)
├── design-tokens.json      # Definición de tokens de diseño (referencia)
├── index.html              # Página principal / Catálogo de componentes
└── README.md               # Documentación del proyecto
```

## 🛠️ Instalación y Uso

1.  **Clonar o Descargar:** Descarga los archivos del proyecto en tu máquina local.
2.  **Ejecutar:** No requiere instalación de dependencias (Node.js, NPM, etc.). Es "Vanilla" web stack.
    *   Simplemente abre el archivo `index.html` en tu navegador web preferido.
    *   Para una mejor experiencia (especialmente con módulos JS si se expande), se recomienda usar una extensión como "Live Server" en VS Code.

## 🎨 Personalización

El sistema está basado en **CSS Custom Properties (Variables)**, lo que facilita el cambio de tema.

Ve a `assets/css/base.css` para modificar la paleta de colores principal:

```css
:root {
  --color-primary: #00F0FF; /* Cambiar color principal */
  --color-secondary: #BC13FE;
  /* ... */
}
```

## 💻 Tecnologías

*   **HTML5:** Semántico y accesible.
*   **CSS3:** Variables CSS, Flexbox, Grid, Keyframe Animations, Backdrop Filter.
*   **JavaScript (ES6+):** Sin frameworks, lógica pura para máximo rendimiento.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.
