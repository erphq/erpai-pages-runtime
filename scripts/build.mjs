#!/usr/bin/env node
/**
 * Build the @erpai/pages-runtime distributable.
 *
 * The runtime itself is hand-written JS (the IIFE is already a "bundle") so
 * there's no compile step for the implementation. We just copy src → dist,
 * write the type declarations, and generate the agent-facing markdown docs.
 *
 * Outputs into dist/:
 *   erpai-pages-runtime.js      — drop-in replacement for the file currently
 *                                  served at app.erpai.studio/runtime/.
 *   erpai-pages-runtime.css     — same.
 *   erpai-pages-runtime.d.ts    — TypeScript types for window.erpai (copied
 *                                  from src/types/, hand-maintained).
 *   runtime.md                   — markdown reference, for Neo's build-page
 *                                  skill to bundle into the agent prompt.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const TYPES = path.join(ROOT, 'types');
const DIST = path.join(ROOT, 'dist');

await fs.mkdir(DIST, { recursive: true });

const COPIES = [
  ['src/erpai-pages-runtime.js',   'dist/erpai-pages-runtime.js'],
  ['src/erpai-pages-runtime.css',  'dist/erpai-pages-runtime.css'],
  ['types/erpai-pages-runtime.d.ts', 'dist/erpai-pages-runtime.d.ts'],
];

for (const [from, to] of COPIES) {
  await fs.copyFile(path.join(ROOT, from), path.join(ROOT, to));
}

// Generate runtime.md — the agent's API reference.
const { generateSkillDocs } = await import('./generate-skill-docs.mjs');
const md = await generateSkillDocs(ROOT);
await fs.writeFile(path.join(DIST, 'runtime.md'), md, 'utf-8');

const sizes = await Promise.all(
  ['erpai-pages-runtime.js', 'erpai-pages-runtime.css', 'erpai-pages-runtime.d.ts', 'runtime.md']
    .map(async (f) => {
      const stat = await fs.stat(path.join(DIST, f));
      return `  ${f.padEnd(32)} ${stat.size.toLocaleString().padStart(8)} bytes`;
    })
);
console.log('build: dist/');
for (const s of sizes) console.log(s);
