// This is only used in development, eslint wrongly detects this as a required dependency.
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    eslintPlugin(),
  ],
});
