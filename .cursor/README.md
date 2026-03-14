# Configuración de Cursor

## Servidor MCP de GitHub

El proyecto incluye el servidor MCP de GitHub para que la IA pueda acceder a la API de GitHub (issues, PRs, contenido de archivos, etc.).

### Requisitos

1. **Token de GitHub**: Crea un [Personal Access Token](https://github.com/settings/tokens) con el alcance `repo` (o `public_repo` si solo usas repos públicos).

2. **Variable de entorno**: Configura `GITHUB_PERSONAL_ACCESS_TOKEN` en tu sistema:
   - **Windows (PowerShell)**: `$env:GITHUB_PERSONAL_ACCESS_TOKEN = "tu_token"`
   - **Windows (permanente)**: Panel de control → Sistema → Variables de entorno → Nueva variable de usuario.
   - **Linux/Mac**: Añade `export GITHUB_PERSONAL_ACCESS_TOKEN="tu_token"` a `~/.bashrc` o `~/.zshrc`.

3. **Reiniciar Cursor** después de configurar.
