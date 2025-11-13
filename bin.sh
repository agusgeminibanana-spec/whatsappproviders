#!/bin/bash

echo "🚀 AUTORUN: Inicializando Prototyping para Firebase Studio..."

# Activar prototyper (MCP)
cat > mcp.json << 'EOF'
{
  "mcpServers": {
    "firebase": {
      "command": "npx",
      "args": [
        "-y",
        "firebase-tools@latest",
        "experimental:mcp",
        "--only",
        "auth,firestore,functions,hosting"
      ]
    }
  }
}
EOF

echo "📌 mcp.json configurado."

# Crear o reparar firebase.json
cat > firebase.json << 'EOF'
{
  "functions": {
    "source": "functions"
  },
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "/.", "/node_modules/*"]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
EOF

echo "📌 firebase.json creado."

# Crear funciones si no existen
mkdir -p functions

# Crear package.json en funciones
cat > functions/package.json << 'EOF'
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "engines": {
    "node": "20"
  },
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0"
  }
}
EOF

echo "📌 Backend creado."

# Instalar backend automáticamente
cd functions
npm install --silent
cd ..

echo "🔥 Backend instalado"

# Crear reglas de Firestore
cat > firestore.rules << 'EOF'
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=} {
      allow read, write: if request.auth != null;
    }
  }
}
EOF

echo "📌 Firestore rules listas."

echo ""
echo "✅ Todo listo para usar Prototyper sin configuraciones adicionales."
echo "⚡ Ahora puedes abrir el Prototyper y agregar flows, APIs, Baileys, etc."
