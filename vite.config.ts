import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            film: path.resolve(__dirname, 'film/index.html'),
          },
        },
      },
      plugins: [
        react(),
        {
          name: 'film-route',
          configureServer(server) {
            server.middlewares.use((req, _res, next) => {
              if (req.url === '/film' || req.url?.startsWith('/film?')) {
                req.url = '/film/index.html';
              }
              next();
            });
          },
          configurePreviewServer(server) {
            server.middlewares.use((req, _res, next) => {
              if (req.url === '/film' || req.url?.startsWith('/film?')) {
                req.url = '/film/index.html';
              }
              next();
            });
            server.middlewares.stack.unshift({ route: '', handle: history({ index: '/index.html' }) });
          },
        },
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
