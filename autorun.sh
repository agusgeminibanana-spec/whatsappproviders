#!/bin/bash

# Este script instala las dependencias y ejecuta el entorno de desarrollo.

# 1. Instalar dependencias con pnpm
echo "📦 Instalando dependencias con pnpm..."
pnpm install

# 2. Iniciar el servidor de desarrollo
echo "🚀 Iniciando el servidor de desarrollo en http://localhost:8080"
pnpm dev
