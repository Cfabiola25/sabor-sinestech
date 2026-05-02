import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the SaborSinestech project.
// This file defines the React plugin and integrates PostCSS with TailwindCSS and Autoprefixer.
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
});