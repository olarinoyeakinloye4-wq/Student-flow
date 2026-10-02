import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Keep production assets working when the app is served from a subdirectory
  // or opened directly from the generated dist folder.
  base: './',
});
