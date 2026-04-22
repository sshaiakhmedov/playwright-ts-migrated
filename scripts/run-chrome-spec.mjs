#!/usr/bin/env node
/**
 * Resolves a short spec name to a file path and runs Playwright (chrome project, headless by default).
 *
 * Usage: npm run spec -- aboutCompany
 *        npm run spec -- aboutCompany.spec.ts
 *        npm run spec -- tests/ui/sputnik8com/aboutCompany.spec.ts
 *        npm run spec -- aboutCompany --headed
 * Extra args are forwarded: npm run spec -- aboutCompany -- --grep "foo"
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const argsAfterScript = process.argv.slice(2);
if (argsAfterScript[0] === '--') {
  argsAfterScript.shift();
}
const [first, ...rest] = argsAfterScript;

if (!first) {
  console.error('Usage: npm run spec -- <specNameOrPath> [extra playwright args]\n  Example: npm run spec -- aboutCompany   (add --headed for a visible browser)');
  process.exit(1);
}

const testsRoot = path.join(process.cwd(), 'tests');
const fileName = (() => {
  if (/^.*\.spec\.ts$/i.test(first)) {
    return path.basename(first);
  }
  return first.replace(/\.ts$/i, '') + '.spec.ts';
})();

/**
 * @param {string} dir
 * @param {string} target
 * @returns {string | null}
 */
function findFile(dir, target) {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    return null;
  }
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') {
      continue;
    }
    const p = path.join(dir, name);
    let s;
    try {
      s = statSync(p);
    } catch {
      continue;
    }
    if (s.isDirectory()) {
      const found = findFile(p, target);
      if (found) {
        return found;
      }
    } else if (name === target) {
      return p;
    }
  }
  return null;
}

let testPath;

if (path.isAbsolute(first) && existsSync(first)) {
  testPath = first;
} else if (first.includes(path.sep) || first.startsWith('.')) {
  const resolved = path.resolve(process.cwd(), first);
  testPath = existsSync(resolved) ? resolved : first;
} else {
  const found = findFile(testsRoot, fileName);
  if (!found) {
    console.error(`No spec file "${fileName}" found under ${testsRoot}`);
    process.exit(1);
  }
  testPath = found;
}

const args = ['playwright', 'test', '--project=chrome', testPath, ...rest];
const child = spawn('npx', args, { stdio: 'inherit', shell: process.platform === 'win32' });

child.on('exit', (code) => process.exit(code ?? 0));
