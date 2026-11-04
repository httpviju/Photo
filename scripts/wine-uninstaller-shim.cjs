#!/usr/bin/env node
/**
 * Linux Cross-Compilation Helper for electron-builder NSIS Target:
 * When building Windows NSIS installers on a Linux container without Wine installed,
 * electron-builder invokes `wine <installerPath>` solely to extract `<installerPath>__uninstaller.exe`.
 * This script delegates directly to electron-builder's built-in pure-Node PE/NSIS parser
 * (`UninstallerReader.exec` from `app-builder-lib/out/targets/nsis/nsisUtil.js`), which is the
 * same mechanism electron-builder uses natively on macOS Catalina+.
 */
const path = require('node:path');

async function main() {
  const targetExe = process.argv[2];
  if (!targetExe) {
    process.exit(0);
  }

  const resolvedInstaller = path.resolve(targetExe);
  const outDir = path.dirname(resolvedInstaller);
  const uninstallerPath = path.join(
    outDir,
    `${path.basename(resolvedInstaller, 'exe')}__uninstaller.exe`
  );

  const nsisUtilPath = path.resolve(
    __dirname,
    '..',
    'node_modules',
    'app-builder-lib',
    'out',
    'targets',
    'nsis',
    'nsisUtil.js'
  );

  const { UninstallerReader } = require(nsisUtilPath);
  await UninstallerReader.exec(resolvedInstaller, uninstallerPath);
}

main().catch((err) => {
  console.error('[wine-uninstaller-shim] Failed to extract NSIS uninstaller:', err);
  process.exit(1);
});
