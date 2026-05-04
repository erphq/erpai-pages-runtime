#!/usr/bin/env node
/**
 * Generate runtime.md — the agent-facing API reference for window.erpai.
 *
 * This file is what Neo's build-page skill bundles into the agent prompt.
 * The agent reads it to know what window.erpai.* helpers it can call when
 * generating custom-page HTML/JS.
 *
 * Source: parses JSDoc blocks above each export in window.erpai = { ... }
 * in src/erpai-pages-runtime.js. Out: a single self-contained markdown
 * document with sections grouped by the // ===== SECTION ===== banners
 * already in the source.
 *
 * Generated content. Do not hand-edit dist/runtime.md — edit JSDoc in the
 * source instead.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function generateSkillDocs(rootDir) {
  const ROOT = rootDir || path.resolve(__dirname, '..');
  const src = await fs.readFile(path.join(ROOT, 'src/erpai-pages-runtime.js'), 'utf-8');
  const pkg = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf-8'));

  // Find the export object: window.erpai = { ... };
  const exportMatch = src.match(/window\.erpai\s*=\s*\{([\s\S]*?)\n\s*\};/);
  if (!exportMatch) throw new Error('could not find window.erpai = {} block');
  const exportBlock = exportMatch[1];

  // Parse the export object: lines like "    foo: foo,"  optionally with a leading "// section comment"
  const sections = [{ title: 'Public API', items: [] }];
  for (const line of exportBlock.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // Section header e.g. "// API"
    const sec = trimmed.match(/^\/\/\s*(.+?)$/);
    if (sec) {
      sections.push({ title: sec[1].trim(), items: [] });
      continue;
    }
    // Export entry e.g. "compactNumber: compactNumber,"
    const entry = trimmed.match(/^(\w+):\s*(\w+),?$/);
    if (entry) {
      sections[sections.length - 1].items.push(entry[1]);
    }
  }

  // ── JSDoc extraction ─────────────────────────────────────────────────
  // Find the function declaration first, then walk backwards (line by line)
  // looking for the nearest `*/` that closes a JSDoc block. This avoids the
  // greedy-regex trap where one JSDoc block "wins" all subsequent functions.

  const lines_ = src.split('\n');
  function getJsDocFor(name) {
    const fnRe = new RegExp(`^\\s*(?:async\\s+)?function\\s+${name}\\s*\\(`);
    const fnLineIdx = lines_.findIndex((l) => fnRe.test(l));
    if (fnLineIdx === -1) return null;

    // Walk back to find a `*/` on the line immediately above (skipping blank lines).
    let i = fnLineIdx - 1;
    while (i >= 0 && lines_[i].trim() === '') i--;
    if (i < 0 || !lines_[i].trim().endsWith('*/')) return null;

    // Now walk back to the opening `/**`.
    const endIdx = i;
    let startIdx = endIdx;
    while (startIdx >= 0 && !lines_[startIdx].trim().startsWith('/**')) startIdx--;
    if (startIdx < 0) return null;

    const block = lines_.slice(startIdx, endIdx + 1).join('\n');
    // Strip the `/** ... */` wrapping and per-line ` * ` prefixes.
    const body = block
      .replace(/^\s*\/\*\*\s*/, '')
      .replace(/\s*\*\/\s*$/, '')
      .split('\n')
      .map((l) => l.replace(/^\s*\*\s?/, '').trimEnd())
      .filter((l) => !l.startsWith('@'))     // drop annotations for prose flow
      .join('\n')
      .trim();
    return body || null;
  }

  function getSignatureFor(name) {
    const re = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(([^)]*)\\)`);
    for (const line of lines_) {
      const m = line.match(re);
      if (m) return `${name}(${m[1].trim()})`;
    }
    return null;     // not a function — caller will treat as property
  }

  const lines = [];
  lines.push(`# \`window.erpai\` Runtime SDK`);
  lines.push('');
  lines.push(`**Version:** ${pkg.version}`);
  lines.push('');
  lines.push(`Loaded automatically into every ERPAI custom page iframe. Pages target the APIs documented below — additions are safe, removals are breaking.`);
  lines.push('');
  lines.push(`> **For agents (Neo / build-page skill):** these are the only \`window.erpai.*\` calls you can make. If you need something not listed here, do without it — do not invent helpers.`);
  lines.push('');

  for (const section of sections) {
    if (section.items.length === 0) continue;
    lines.push(`## ${section.title}`);
    lines.push('');
    for (const name of section.items) {
      const sig = getSignatureFor(name);
      const doc = getJsDocFor(name);
      if (sig === null) {
        // Property, not a function (e.g., config, appId, skeleton, chart).
        lines.push(`### \`erpai.${name}\``);
      } else {
        lines.push(`### \`erpai.${sig}\``);
      }
      lines.push('');
      if (doc) {
        lines.push(doc);
        lines.push('');
      }
    }
  }

  lines.push('---');
  lines.push('');
  lines.push(`Generated from \`src/erpai-pages-runtime.js\` by \`scripts/generate-skill-docs.mjs\`. Do not hand-edit.`);
  lines.push('');

  return lines.join('\n');
}

// Run as CLI when invoked directly.
if (import.meta.url === `file://${process.argv[1]}`) {
  const ROOT = path.resolve(__dirname, '..');
  const md = await generateSkillDocs(ROOT);
  await fs.mkdir(path.join(ROOT, 'dist'), { recursive: true });
  await fs.writeFile(path.join(ROOT, 'dist/runtime.md'), md, 'utf-8');
  console.log(`generate-skill-docs: wrote dist/runtime.md (${md.length} bytes)`);
}
