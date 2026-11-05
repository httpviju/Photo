import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const releaseDir = path.join(rootDir, 'release');
const distDir = path.join(rootDir, 'dist');

fs.mkdirSync(releaseDir, { recursive: true });
fs.mkdirSync(distDir, { recursive: true });

const artifacts = [
  'Vijay-Portfolio-Setup.exe',
  'Vijay-Portfolio-Portable.exe',
  'Vijay-Portfolio-Setup.exe.blockmap',
  'latest.yml',
];

for (const name of artifacts) {
  const distFile = path.join(distDir, name);
  const releaseFile = path.join(releaseDir, name);

  if (fs.existsSync(distFile) && fs.statSync(distFile).size > 0) {
    // Backup from dist/ to release/ if newer or missing in release/
    const distStat = fs.statSync(distFile);
    const relExists = fs.existsSync(releaseFile);
    if (!relExists || distStat.mtimeMs > fs.statSync(releaseFile).mtimeMs || distStat.size !== fs.statSync(releaseFile).size) {
      fs.copyFileSync(distFile, releaseFile);
      console.log(`[Release Sync] Backed up dist/${name} -> release/${name} (${(distStat.size / (1024 * 1024)).toFixed(2)} MB)`);
    }
  } else if (fs.existsSync(releaseFile) && fs.statSync(releaseFile).size > 0) {
    // Restore from release/ to dist/ if vite build cleaned dist/
    const relStat = fs.statSync(releaseFile);
    fs.copyFileSync(releaseFile, distFile);
    console.log(`[Release Sync] Restored release/${name} -> dist/${name} (${(relStat.size / (1024 * 1024)).toFixed(2)} MB)`);
  }
}
