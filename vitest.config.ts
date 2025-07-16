import { mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import baseConfig from './vite.config';

export default mergeConfig(baseConfig, {
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
      ],
      thresholds: {
        global: {
          lines: 50,
          functions: 50,
          branches: 50,
          statements: 80,
        },
      },
    },
  },
});
