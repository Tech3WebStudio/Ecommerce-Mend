## 📝 Convención de Commits - Nina Showroom

Usamos [Conventional Commits](https://www.conventionalcommits.org/) con algunos ajustes para adaptarlo al diseño, branding y desarrollo frontend/backend del proyecto.

---

### 🎯 Tipos de Commit

| Tipo        | Uso                                                                 |
|-------------|----------------------------------------------------------------------|
| `feat`      | Nueva funcionalidad (UI, lógica o interacción)                      |
| `fix`       | Corrección de errores (código, diseño, animaciones)                 |
| `style`     | Cambios visuales (CSS, imágenes, sombras, sin lógica nueva)         |
| `refactor`  | Mejora del código sin cambiar su comportamiento                     |
| `perf`      | Optimización de rendimiento                                          |
| `docs`      | Cambios en la documentación (README, comentarios, etc.)             |
| `test`      | Agregado o modificación de tests                                     |
| `chore`     | Tareas menores (limpieza, dependencias, scripts, configuraciones)   |
| `ci`        | Cambios en integración continua o scripts de deploy                 |
| `build`     | Cambios en configuración de herramientas de build (Vite, Webpack…)  |

---

### 📦 Scopes (Áreas del Proyecto)

> Recomendado para mantener claridad y orden.

- `ui` → Cambios generales de interfaz
- `logo` → Cambios en branding, logo, animaciones del logo
- `carousel` → Componente del slider principal
- `booking` → Sistema de reservas
- `layout` → Cambios en la estructura general de las páginas
- `firebase` → Autenticación o base de datos externa
- `assets` → Imágenes, videos, íconos, fuentes
- `deps` → Instalación o actualización de paquetes

---

### ✍️ Estructura del Commit

```bash
<type>(<scope>): <mensaje breve>

# Ejemplo real:
feat(carousel): add animated video logo for homepage
