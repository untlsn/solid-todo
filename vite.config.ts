import solidPlugin from 'vite-plugin-solid';
import WindiCSS from 'vite-plugin-windicss';
import { UserConfig } from 'vite';
import { resolve } from 'path';

export default {
  plugins: [
    solidPlugin({ ssr: true }),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      '~': resolve('./src'),
      '~icons': resolve('./src/components/icons/_'),
    },
  },
  build: {
    polyfillDynamicImport: false,
  },
} as UserConfig;
