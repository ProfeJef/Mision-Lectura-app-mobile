const express = require('express');
const path = require('path');
const compression = require('compression');
const os = require('os');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const APK_PATH = path.join(__dirname, 'Mision-Lectura.apk');

// Compresión Gzip para acelerar la carga en redes escolares
app.use(compression());

// Cabeceras de seguridad compatibles con CDN y WebView
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

// Ruta directa para descargar el APK de Android desde la interfaz web
app.get('/Mision-Lectura.apk', (req, res) => {
  if (fs.existsSync(APK_PATH)) {
    res.download(APK_PATH, 'Mision-Lectura.apk');
  } else {
    res.status(404).send('El archivo APK aún no ha sido generado.');
  }
});

// Servir archivos estáticos desde la carpeta /public
app.use(
  express.static(PUBLIC_DIR, {
    extensions: ['html', 'htm'],
    maxAge: '1h',
  })
);

// Endpoint de salud del servidor
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', app: 'Misión Lectura' });
});

// Fallback SPA: cualquier ruta devuelve index.html manteniendo el estado en cliente
app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
  const localIP = getLocalIP();
  console.log('============================================================');
  console.log('🦉 Misión Lectura: El Archivo de los Mundos Perdidos');
  console.log(`🚀 Servidor local activo en:   http://localhost:${PORT}`);
  console.log(`📱 Acceso en red local (LAN):  http://${localIP}:${PORT}`);
  console.log(`📥 Descarga directa de APK:    http://${localIP}:${PORT}/Mision-Lectura.apk`);
  console.log('============================================================');
});
