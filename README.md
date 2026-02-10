# ARM - GoHighLevel Custom Skin (v2.0)

Este repositorio contiene la personalización visual (Skin) para GoHighLevel, reconstruida desde cero para ser limpia, rápida y fácil de mantener.

## 🎨 Paleta de Colores (Marca)

El diseño utiliza variables CSS para facilitar cambios futuros.

| Variable | Color | Uso Principal |
|---|---|---|
| `--arm-color-4` | **#181a8d** | Color Primario (Headers, Hover) |
| `--arm-color-1` | `#4551d8` | Acentos, Botones |
| `--arm-color-2` | `#373ebe` | Estados Activos |
| `--arm-color-3` | `#292ca5` | Secundario |
| `--arm-color-5` | `#000675` | Fondos Oscuros, Sidebar |

## 🚀 Instalación en GoHighLevel

Para aplicar este diseño a tu agencia o sub-cuenta, ve a:
**Settings** > **Company** (o Location) > **Custom Code**.

### 1. Head Tracking Code (CSS)
Pega esto para aplicar los estilos visuales:

```html
<link rel="stylesheet" href="https://go-high-level-customization.vercel.app/custom.css?v=2.0">
```

### 2. Body Tracking Code (JS)
Pega esto para aplicar la lógica (favicon, etc.):

```html
<script src="https://go-high-level-customization.vercel.app/custom.js?v=2.0"></script>
```

> **Nota:** El parámetro `?v=2.0` ayuda a refrescar la caché si haces cambios. Cámbialo a `2.1`, `2.2`, etc., cuando actualices.

## 📁 Archivos del Proyecto

- **`custom.css`**: Contiene todos los estilos. Usa variables CSS y sobrescribe los estilos nativos de GHL (Sidebar, Topbar, Botones) para que coincidan con tu marca.
- **`custom.js`**: Lógica ligera para tareas que CSS no puede hacer (como cambiar el Favicon).
- **`README.md`**: Esta documentación.

## 🔄 Cómo Actualizar

1. Edita los archivos `custom.css` o `custom.js` en tu carpeta local.
2. Haz un **Push** a GitHub.
   ```bash
   git add .
   git commit -m "Descripción del cambio"
   git push origin main
   ```
3. Vercel detectará el cambio y actualizará los archivos automáticamente en ~1 minuto.
4. Si no ves los cambios en GHL, actualiza el número de versión (`?v=...`) en el código de insertado.
