# Sabor Sinestech

Sabor Sinestech es una aplicación web que celebra la riqueza gastronómica de México y Colombia mediante un proyecto académico de aprendizaje colaborativo. Combina recursos de **React**, **TypeScript** y **Vite** con utilidades modernas como **Tailwind CSS**, **Framer Motion**, **lucide‑react** y componentes de estilo inspirados en *shadcn/ui* para ofrecer una experiencia de usuario fluida y atractiva.

## 🚀 Funcionalidades principales

- **Hero interactivo:** sección de apertura con imagen de fondo, superposiciones y animaciones para introducir el proyecto.
- **Galería de platillos:** cartas filtrables que muestran platillos representativos de México y Colombia. La sección permite buscar por nombre, filtrar por país y sabor dominante, y usa chips de color para identificar la procedencia y etiquetas para textura y sabor.
- **Motor de maridaje:** selecciona un platillo y descubre la bebida o platillo complementario recomendado, junto con su tipo de maridaje y justificación sensorial.
- **Comparador cultural:** compara dos platillos lado a lado para analizar diferencias en sabores, texturas, intensidad y procedencia.
- **Experiencia sensorial:** tarjetas que invitan a reflexionar sobre los distintos sentidos involucrados en la gastronomía (sabor, aroma, textura, sonido y vista).
- **Quiz interactivo:** breve cuestionario de opción múltiple para evaluar tus conocimientos sobre maridajes interculturales.
 - **Sección COIL:** una sección explicativa que contextualiza el proyecto dentro del programa COIL. Presenta pilares como aprendizaje global, narrativa digital y colaboración académica mediante tarjetas ilustradas.
 - **Miembros del proyecto:** galería de miembros con imágenes en escala de grises que se iluminan al pasar el cursor, roles, instituciones y categorías temáticas. Incluye animaciones sutiles y un botón para invitar a colaborar.

## 📂 Estructura del proyecto

El código fuente se encuentra en la carpeta `src/` y está organizado de la siguiente manera:

```text
src/
  assets/          ── Imágenes utilizadas en la interfaz (héroe y placeholder)
  components/
    layout/        ── Cabecera, barra institucional y pie de página
    sections/      ── Secciones de la página (Hero, CoilSection, DishesSection, PairingEngine, Comparator, SensoryExperience, QuizSection, MembersSection)
  data/            ── Datos generados a partir del archivo Excel (platillos, maridajes y preguntas del quiz)
  pages/
    Home.tsx       ── Página principal que compone todas las secciones
  App.tsx          ── Componente raíz
  main.tsx         ── Punto de entrada y montaje en el DOM

tailwind.config.ts ── Configuración de Tailwind CSS
vite.config.ts     ── Configuración de Vite y PostCSS
tsconfig.json      ── Opciones de compilación de TypeScript
```

## 📦 Instalación y uso

1. **Requisitos previos:** Asegúrate de tener [Node.js](https://nodejs.org/) instalado (versión 16 o superior). Este proyecto utiliza Vite como herramienta de bundling.
2. **Instalación de dependencias:**

   ```bash
   cd sabor-sinestech
   npm install
   ```

3. **Modo de desarrollo:**

   ```bash
   npm run dev
   ```

   Esto lanzará un servidor de desarrollo (generalmente en `http://localhost:5173`) y recargará los cambios automáticamente cuando edites los archivos.

4. **Generar versión de producción:**

   ```bash
   npm run build
   ```

   Los archivos optimizados se guardarán en la carpeta `dist/`.

5. **Previsualizar la compilación:**

   ```bash
   npm run preview
   ```

   Esto inicia un servidor estático que sirve el contenido de `dist/` para comprobar la build final.

## ☁️ Despliegue

### Vercel

Para desplegar en [Vercel](https://vercel.com/), sigue estos pasos:

1. Crea un repositorio en GitHub, GitLab o Bitbucket y sube el contenido del proyecto.
2. Inicia sesión en Vercel y selecciona **New Project**.
3. Elige el repositorio y, en la configuración de proyecto, indica:
   - **Framework preset:** *Vite*
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Haz clic en **Deploy**. Vercel instalará las dependencias, construirá la aplicación y la servirá en un dominio generado automáticamente. Puedes configurar un dominio personalizado en la sección de dominios de Vercel.

### Netlify

Para desplegar en [Netlify](https://netlify.com/), realiza los pasos siguientes:

1. Crea un repositorio y sube el código del proyecto (igual que en Vercel).
2. Inicia sesión en Netlify y selecciona **Add new site** → **Import an existing project**.
3. Elige tu repositorio y define la configuración de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Haz clic en **Deploy site**. Netlify gestionará la instalación y construcción. Una vez desplegada, tendrás una URL pública que puedes personalizar.

## 📊 Datos

Los archivos `dishes.ts`, `pairings.ts` y `quiz.ts` ubicados en `src/data/` se generan automáticamente a partir del archivo Excel proporcionado. Si deseas actualizar estos datos:

1. Asegúrate de que el archivo Excel se llama `Matriz_SaborSinestech.xlsx` y se encuentre en la raíz del proyecto.
2. Ejecuta el script utilizado en este entorno o adapta la lógica de conversión a tus necesidades. El proceso limpia la fila duplicada del encabezado, normaliza los campos y construye interfaces tipadas de TypeScript.

## 💡 Notas

- Este proyecto está diseñado como un prototipo funcional y base para futuros trabajos. Puedes ampliar funcionalidades, mejorar el diseño o integrar nuevas fuentes de datos según tus necesidades.
- No se utiliza ningún backend ni base de datos externa: todos los datos provienen de archivos locales.
- Las animaciones se implementan con **Framer Motion**. Si deseas ajustar las transiciones o agregar más efectos, consulta la [documentación oficial](https://www.framer.com/motion/).

¡Disfruta explorando la sinestesia culinaria entre México y Colombia!