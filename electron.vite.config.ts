import { defineConfig } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';


export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        external: ['electron']
      },
      lib: {
        entry: join(__dirname, 'src/main/index.ts')
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        external: ['electron']
      },
      lib: {
        entry: join(__dirname, 'src/preload/index.ts')
      }
    }
  },
  renderer: {
    root: join(__dirname, 'src/renderer'),
    build: {
      rollupOptions: {
        input: join(__dirname, 'src/renderer/index.html')
      }
    },
    plugins: [vue()]
  }
});