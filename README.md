# ARM - GoHighLevel Custom Skin (v12.0 / v9.0)

Este repositorio contiene la personalización visual (Skin) para GoHighLevel.
**Versión 12.0 (System Design)**: Refactorización completa implementando un Sistema de Diseño con Tokens para consistencia global.

## 🎨 Sistema de Diseño (Tokens)
El nuevo CSS utiliza variables globales para facilitar el mantenimiento y asegurar la coherencia:

- **Primary Action**: `#818CF8` (Lavender)
- **Sidebar Surface**: `#424A71` (Midnight Indigo)
- **Canvas Base**: `#FAFAFD`
- **Text Body**: `#374151` (Legibilidad mejorada WCAG)

## 🚀 Instalación en GoHighLevel

Para aplicar este diseño a tu agencia o sub-cuenta, ve a:
**Settings** > **Company** (o Location) > **Custom Code**.

### 1. Head Tracking Code (CSS v12.0)
```html
<link rel="stylesheet" href="https://go-high-level-customization.vercel.app/custom.css?v=12.0">
```

### 2. Body Tracking Code (JS v9.0)
```html
<script src="https://go-high-level-customization.vercel.app/custom.js?v=9.0"></script>
```
