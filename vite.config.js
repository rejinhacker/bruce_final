// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@supabase/supabase-js': './node_modules/@supabase/supabase-js/dist/index.mjs'
    }
  },
  build: {
    rollupOptions: {
      external: ['@supabase/supabase-js']
    }
  }
});
