import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('lucide-react')) return 'icons-vendor';
          if (id.includes('motion')) return 'motion-vendor';
          if (id.includes('react')) return 'react-vendor';
          return 'vendor';
        },
      },
    },
  },
});
