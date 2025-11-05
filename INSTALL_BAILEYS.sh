#!/bin/bash

# Script de instalación para integración de WhatsApp con Baileys
# Ejecutar: bash INSTALL_BAILEYS.sh

echo "════════════════════════════════════════════════════════════"
echo "  Instalando dependencias de WhatsApp (Baileys)"
echo "════════════════════════════════════════════════════════════"
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para verificar si npm está disponible
check_npm() {
  if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado. Por favor instala Node.js primero.${NC}"
    exit 1
  fi
  echo -e "${GREEN}✓ npm encontrado${NC}"
}

# Función para instalar dependencia
install_package() {
  echo ""
  echo -e "${YELLOW}📦 Instalando $1...${NC}"
  npm install "$1"
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ $1 instalado correctamente${NC}"
  else
    echo -e "${RED}❌ Error al instalar $1${NC}"
    exit 1
  fi
}

# Verificar npm
check_npm

# Instalar dependencias principales
echo ""
echo -e "${YELLOW}Instalando dependencias principales...${NC}"
install_package "@whiskeysockets/baileys"
install_package "@hapi/boom"
install_package "qrcode-terminal"
install_package "pino"

# Instalar dependencias opcionales
echo ""
echo -e "${YELLOW}¿Deseas instalar dependencias opcionales para procesamiento de medios? (s/n)${NC}"
read -r response
if [[ "$response" == "s" || "$response" == "S" || "$response" == "yes" ]]; then
  echo ""
  echo -e "${YELLOW}Instalando dependencias opcionales...${NC}"
  install_package "sharp"
  echo ""
  echo -e "${YELLOW}⚠️  Para ffmpeg (procesamiento de video):${NC}"
  echo -e "   macOS: brew install ffmpeg"
  echo -e "   Ubuntu: sudo apt-get install ffmpeg"
  echo -e "   Windows: Descargar desde https://ffmpeg.org/download.html"
fi

# Crear archivo .env.local si no existe
if [ ! -f ".env.local" ]; then
  echo ""
  echo -e "${YELLOW}Creando archivo .env.local...${NC}"
  cp .env.example .env.local
  echo -e "${GREEN}✓ Archivo .env.local creado${NC}"
  echo -e "${YELLOW}⚠️  Recuerda configurar las variables en .env.local${NC}"
else
  echo ""
  echo -e "${GREEN}✓ Archivo .env.local ya existe${NC}"
fi

# Crear carpeta auth si no existe
if [ ! -d "auth" ]; then
  echo ""
  echo -e "${YELLOW}Creando carpeta de autenticación...${NC}"
  mkdir -p auth
  echo -e "${GREEN}✓ Carpeta auth creada${NC}"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Instalación completada exitosamente${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Configura las variables en .env.local"
echo "   2. Ejecuta: npm run dev"
echo "   3. Escanea el código QR con WhatsApp"
echo ""
echo "📚 Para más información, consulta WHATSAPP_INTEGRATION.md"
echo ""
