# 🦉 Misión Lectura: El Archivo de los Mundos Perdidos
**💡 Idea Original y Diseño Pedagógico: Equipo "Eduquémonos con Tics"**  
*Institución Educativa San José de Marinilla, Antioquia — Grado 5.°*

---

## 🚀 Acceso Rápido

* 🌐 **Usar Aplicación Web (Online):** Abre directamente [`public/index.html`](./public/index.html) (o a través de GitHub Pages).
* 📲 **Descargar Aplicación para Android (.APK):** [**Haz clic aquí para descargar `Mision-Lectura.apk`**](./Mision-Lectura.apk) *(Funciona 100% Offline)*.

---

## 🎓 Cumplimiento de Criterios de Calificación y Diseño Instruccional

1. **Alineación Instruccional Completa:** Articula el problema de comprensión lectora de 5.° grado con 4 Resultados de Aprendizaje (Literal, Inferencial, Intención/Significado y Crítico-Integrador) y una secuencia didáctica explícita en 4 fases (*1. Exploración, 2. Aprendizaje Guiado, 3. Práctica Activa con Evidencia, 4. Reflexión y Autorregulación*).
2. **App Autoexplicativa, Funcional e Intuitiva (UX):** Incluye tutorial interactivo de bienvenida (*"¿Cómo jugar?"*), guía docente integrada (*"📋 Guía Docente / Diseño"*), controles de tamaño de letra (`A-` / `A+`) y síntesis de voz en español (`🔊 Escuchar lectura`).
3. **Aprendizaje Activo y Autónomo:** Exige doble validación cognitiva (respuesta de comprensión + selección de cita textual de evidencia), glosario interactivo por lectura y andamiaje formativo específico ante errores.
4. **Evaluación, Monitoreo y Autorregulación:** Bitácora formativa con nivel de logro por competencia (*Por iniciar, En proceso, Logrado*), tasa de precisión lectora, conteo de aciertos al primer intento y registro metacognitivo de estrategias de lectura al finalizar cada mundo.
5. **Innovación Tecnológica y Competencia Digital Docente:** Despliegue híbrido Web + Servidor Local LAN (Node.js/Express) + APK Nativo Android (Capacitor) con funcionamiento 100% Offline y persistencia en `localStorage`.

---

## 💻 Ejecutar Servidor Local (Node.js + Express)

```bash
npm install
npm start
```

## 📱 Compilar APK para Android (Capacitor)

```bash
npx cap sync android
cd android
./gradlew assembleDebug
```
