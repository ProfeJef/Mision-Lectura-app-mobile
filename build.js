const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const esbuild = require('esbuild');

const ROOT = __dirname;
const SRC_HTML = path.join(ROOT, 'src', 'index.html');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_HTML = path.join(PUBLIC_DIR, 'index.html');
const OUT_JS = path.join(PUBLIC_DIR, 'app.js');
const OUT_CSS = path.join(PUBLIC_DIR, 'styles.css');
const TEMP_CSS = path.join(ROOT, 'src', 'tailwind-input.css');

let html = fs.readFileSync(SRC_HTML, 'utf8');

// 1. Extraer y precompilar el bloque <script type="text/babel">...</script> con esbuild
const babelMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!babelMatch) {
  throw new Error('No se encontró <script type="text/babel"> en src/index.html');
}

const jsxCode = babelMatch[1];
const result = esbuild.transformSync(jsxCode, {
  loader: 'jsx',
  target: 'es2018',
  minify: true,
});
fs.writeFileSync(OUT_JS, result.code, 'utf8');

// 2. Generar CSS estático precompilado con Tailwind CLI v3
fs.writeFileSync(TEMP_CSS, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n', 'utf8');
execSync(
  `npx.cmd tailwindcss -i "${TEMP_CSS}" -o "${OUT_CSS}" --content "${SRC_HTML}" --minify`,
  { stdio: 'inherit', cwd: ROOT }
);
fs.unlinkSync(TEMP_CSS);

// 3. Reemplazar dependencias runtime (Tailwind Play CDN y Babel Standalone) por archivos precompilados
html = html.replace(
  /<!-- Tailwind CSS \(Local[^>]*-->\s*<script[^>]*tailwindcss\.js[^>]*><\/script>/,
  '<!-- Tailwind CSS Precompilado (0 ms JIT en WebView) -->\n  <link rel="stylesheet" href="./styles.css" />'
);
html = html.replace(
  /<script src="\.\/vendor\/babel\.min\.js"[^>]*><\/script>\s*/,
  ''
);
html = html.replace(
  /<script type="text\/babel">[\s\S]*?<\/script>/,
  '<script src="./app.js" defer></script>'
);

// 4. Endurecer CSP eliminando 'unsafe-eval' y 'unsafe-inline' de script-src (ya no se usa Babel runtime)
html = html.replace(
  /<meta http-equiv="Content-Security-Policy" content="[^"]*"\s*\/>/,
  '<meta http-equiv="Content-Security-Policy" content="default-src \'self\' https://fonts.googleapis.com https://fonts.gstatic.com; script-src \'self\' https://unpkg.com; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com; font-src \'self\' https://fonts.gstatic.com data:; img-src \'self\' data: blob:; connect-src \'self\';" />'
);

fs.writeFileSync(OUT_HTML, html, 'utf8');

// 5. Eliminar babel.min.js y tailwindcss.js de public/vendor/ para reducir peso del APK
for (const unused of ['babel.min.js', 'tailwindcss.js']) {
  const p = path.join(PUBLIC_DIR, 'vendor', unused);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

console.log('✅ Precompilación completada: public/app.js, public/styles.css y public/index.html');
