import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';

function serveWindowsReleasesPlugin(): Plugin {
  const resolveArtifactPath = (fileName: string): string | null => {
    const candidates = [
      path.resolve(__dirname, 'dist', fileName),
      path.resolve(__dirname, 'release', fileName),
    ];
    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile() && fs.statSync(candidate).size > 0) {
        return candidate;
      }
    }
    return null;
  };

  return {
    name: 'serve-windows-releases',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const cleanUrl = req.url.split('?')[0];

        if (cleanUrl === '/api/releases') {
          const setupPath = resolveArtifactPath('Vijay-Portfolio-Setup.exe');
          const portablePath = resolveArtifactPath('Vijay-Portfolio-Portable.exe');
          const setupStat = setupPath ? fs.statSync(setupPath) : null;
          const portableStat = portablePath ? fs.statSync(portablePath) : null;

          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              version: '1.0.0',
              appId: 'com.vijay.portfolio',
              productName: 'Vijay Portfolio',
              arch: 'x64',
              setupExe: setupStat
                ? {
                    fileName: 'Vijay-Portfolio-Setup.exe',
                    sizeBytes: setupStat.size,
                    sizeFormatted: `${(setupStat.size / (1024 * 1024)).toFixed(1)} MB`,
                    downloadUrl: '/releases/Vijay-Portfolio-Setup.exe',
                    ready: true,
                  }
                : { fileName: 'Vijay-Portfolio-Setup.exe', ready: false },
              portableExe: portableStat
                ? {
                    fileName: 'Vijay-Portfolio-Portable.exe',
                    sizeBytes: portableStat.size,
                    sizeFormatted: `${(portableStat.size / (1024 * 1024)).toFixed(1)} MB`,
                    downloadUrl: '/releases/Vijay-Portfolio-Portable.exe',
                    ready: true,
                  }
                : { fileName: 'Vijay-Portfolio-Portable.exe', ready: false },
            })
          );
          return;
        }

        const matchedExe =
          cleanUrl.endsWith('/Vijay-Portfolio-Setup.exe')
            ? 'Vijay-Portfolio-Setup.exe'
            : cleanUrl.endsWith('/Vijay-Portfolio-Portable.exe')
              ? 'Vijay-Portfolio-Portable.exe'
              : null;

        if (matchedExe) {
          const filePath = resolveArtifactPath(matchedExe);
          if (!filePath) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: `Release artifact ${matchedExe} not found on disk. Run "npm run dist" to generate it.`,
              })
            );
            return;
          }

          const stat = fs.statSync(filePath);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/octet-stream');
          res.setHeader(
            'Content-Disposition',
            `attachment; filename="${matchedExe}"`
          );
          res.setHeader('Content-Length', String(stat.size));
          res.setHeader('Cache-Control', 'no-cache');

          if (req.method === 'HEAD') {
            res.end();
            return;
          }

          const stream = fs.createReadStream(filePath);
          stream.on('error', () => {
            if (!res.headersSent) {
              res.statusCode = 500;
            }
            res.end();
          });
          stream.pipe(res);
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [serveWindowsReleasesPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      emptyOutDir: false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            icons: ['lucide-react'],
            zip: ['jszip'],
          },
        },
      },
    },
  };
});
