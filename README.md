# 🦉 Misión Lectura: El Archivo de los Mundos Perdidos

Aplicación educativa gamificada de comprensión lectora (Literal, Inferencial y Crítica) alineada al diseño instruccional de **5.° Grado — Institución Educativa San José de Marinilla, Antioquia**.

---

## 🚀 Acceso Rápido

* 🌐 **Usar Aplicación Web (Online):** Abre directamente [`public/index.html`](./public/index.html) (o a través de GitHub Pages).
* 📲 **Descargar Aplicación para Android (.APK):** [**Haz clic aquí para descargar `Mision-Lectura.apk`**](./Mision-Lectura.apk) *(7.3 MB — Funciona 100% Offline)*.

---

## 💻 Ejecutar Servidor Local (Node.js + Express)

```bash
npm install
npm start
```
El servidor quedará disponible en `http://localhost:3000` y en tu red local Wi-Fi (LAN).

---

## 📱 Compilar APK para Android (Capacitor)

```bash
npx cap sync android
cd android
./gradlew assembleDebug
```
El ejecutable se genera en `android/app/build/outputs/apk/debug/app-debug.apk`.
