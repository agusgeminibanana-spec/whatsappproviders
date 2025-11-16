# Development Quickstart

Pasos rápidos para desarrollar localmente:

1. Instala dependencias (en la raíz):

```bash
pnpm install
```

2. Copia las variables de entorno de ejemplo:

```bash
cp .env.sample .env.local
# Edita `.env.local` y pon las credenciales reales (Firebase, etc.)
```

3. Ejecuta el backend en modo desarrollo (hot-reload):

```bash
pnpm --filter backend run dev
```

4. Ejecuta el frontend (Vite):

```bash
pnpm dev
```

Accede al frontend en `http://localhost:9002/` y al backend en `http://localhost:3001/`.

5. Para pruebas de producción locales (build):

```bash
pnpm build
pnpm --filter backend run start
```

Notas:
- El `backend` ahora usa `tsx watch` como comando de desarrollo (ESM compatible).
- Recomendado usar Node.js 20 para máxima compatibilidad con los engines del proyecto.
