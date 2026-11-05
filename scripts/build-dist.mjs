import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function run(cmd, env = {}) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });
}

// 1. Ensure permissions for shims on POSIX platforms
if (process.platform !== 'win32') {
  try {
    fs.chmodSync(path.join(rootDir, 'scripts/bin/wine'), 0o755);
    fs.chmodSync(path.join(rootDir, 'scripts/wine-uninstaller-shim.cjs'), 0o755);
  } catch (err) {
    // Ignore if not present or unsupported
  }
}

// 2. Generate icons
run('node scripts/generate-icon.mjs');

// 3. Build React Vite frontend
run('npx vite build');

// 4. Run electron-builder for Windows x64 targets
const extraPath = path.join(rootDir, 'scripts/bin');
const pathEnv = process.platform !== 'win32'
  ? { PATH: `${extraPath}:${process.env.PATH || ''}` }
  : {};

run('npx electron-builder --win --x64', pathEnv);

// 5. Sync release artifacts between dist/ and release/
run('node scripts/sync-releases.mjs');

console.log('\n[Build Complete] Windows .exe installer and portable binary generated in dist/ and release/!\n');
