import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  //base: '/api-valorant-italo/',
  plugins: [react(), viteCompression()],
});
