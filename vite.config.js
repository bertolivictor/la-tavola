import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANTE: troque 'la-tavola' pelo nome EXATO do seu repositorio no GitHub.
// Ex.: repo "minha-pizzaria" -> base: '/minha-pizzaria/'
// Se for um repo de usuario (usuario.github.io) ou dominio proprio, use base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/la-tavola/',
});
