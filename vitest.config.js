import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.js'],
      exclude: ['src/**/*.test.js', 'src/**/index.js']
    },
    globals: true,
    include: ['tests/**/*.test.js'],
    exclude: ['node_modules', 'dist', '.idea', '.git']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}); 