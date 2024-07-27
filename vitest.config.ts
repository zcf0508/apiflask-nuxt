import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/*.spec.ts'],
    globals: true,
    environment: 'happy-dom',
    coverage: {
      include: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,vue}'],
      provider: 'istanbul',
      reporter: ['text', 'html'],
    },
  },
});
