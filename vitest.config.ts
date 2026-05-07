import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/tests/unit/**/*.test.{ts,tsx}'],
    globals: false,
  },
});
