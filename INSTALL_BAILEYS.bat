@echo off
REM Script de instalación para integración de WhatsApp con Baileys (Windows)
REM Ejecutar: INSTALL_BAILEYS.bat

setlocal enabledelayedexpansion

echo.
echo ================================================================
echo   Instalando dependencias de WhatsApp (Baileys)
echo ================================================================
echo.

REM Verificar si npm está disponible
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo [ERROR] npm no está instalado. Por favor instala Node.js primero.
  echo Descargalo desde: https://nodejs.org/
  pause
  exit /b 1
)

echo [OK] npm encontrado
echo.

REM Instalar dependencias principales
echo [INFO] Instalando dependencias principales...
echo.

echo [1/4] Instalando @whiskeysockets/baileys...
call npm install @whiskeysockets/baileys
if %ERRORLEVEL% neq 0 goto ERROR

echo [2/4] Instalando @hapi/boom...
call npm install @hapi/boom
if %ERRORLEVEL% neq 0 goto ERROR

echo [3/4] Instalando qrcode-terminal...
call npm install qrcode-terminal
if %ERRORLEVEL% neq 0 goto ERROR

echo [4/4] Instalando pino...
call npm install pino
if %ERRORLEVEL% neq 0 goto ERROR

echo.
echo [OK] Dependencias principales instaladas.
echo.

REM Instalar dependencias opcionales
echo.
echo [PREGUNTA] Deseas instalar dependencias opcionales para procesamiento de medios? (S/N)
set /p choice="Selecciona S o N: "

if /i "%choice%"=="S" (
  echo.
  echo [INFO] Instalando dependencias opcionales...
  echo.
  
  echo [1/1] Instalando sharp...
  call npm install sharp
  if %ERRORLEVEL% neq 0 goto ERROR
  
  echo.
  echo [INFO] Para ffmpeg (procesamiento de video):
  echo   1. Descargalo desde: https://ffmpeg.org/download.html
  echo   2. Descomprime el archivo en C:\ffmpeg\
  echo   3. Añade C:\ffmpeg\bin a tu PATH del sistema
  echo.
  echo [NOTA] Puedes configurar esto manualmente o buscar "variables de entorno" en Windows.
)

REM Crear archivo .env.local
echo.
echo [INFO] Verificando archivo .env.local...

if exist ".env.local" (
  echo [OK] Archivo .env.local ya existe.
) else (
  echo [INFO] Creando archivo .env.local...
  if exist ".env.example" (
    copy .env.example .env.local
    echo [OK] Archivo .env.local creado.
    echo [ADVERTENCIA] Recuerda configurar las variables en .env.local
  ) else (
    echo [ERROR] No se encontró .env.example
  )
)

REM Crear carpeta auth
echo.
echo [INFO] Verificando carpeta de autenticación...

if not exist "auth" (
  mkdir auth
  echo [OK] Carpeta auth creada.
) else (
  echo [OK] Carpeta auth ya existe.
)

echo.
echo ================================================================
echo [OK] Instalación completada exitosamente
echo ================================================================
echo.
echo Pasos siguientes:
echo   1. Abre .env.local y configura las variables
echo   2. Ejecuta: npm run dev
echo   3. Escanea el código QR con WhatsApp
echo.
echo Para más información, consulta WHATSAPP_INTEGRATION.md
echo.

pause
exit /b 0

:ERROR
echo.
echo [ERROR] Hubo un problema durante la instalación.
pause
exit /b 1
