import solidPlugin from 'vite-plugin-solid';
import ssr from 'vite-plugin-ssr/plugin';
import WindiCSS from 'vite-plugin-windicss';
import { UserConfig } from 'vite';
import { resolve } from 'path';

export default {
  plugins: [
    solidPlugin({ ssr: true }),
    ssr(),
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
