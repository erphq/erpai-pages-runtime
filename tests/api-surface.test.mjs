#!/usr/bin/env node
/**
 * API surface check for src/erpai-pages-runtime.js.
 *
 * The deployed runtime is the contract between the agent (Neo + build-page
 * skill) and the pages it generates. Any time someone removes an export or
 * renames a function, agent-built pages crash in production.
 *
 * What it does:
 *   1. Loads the runtime in a stubbed browser environment.
 *   2. Asserts every entry in EXPECTED_API is present on window.erpai with
 *      the right type.
 *   3. Smoke-tests the pure formatters (compactNumber, fmtNum, fmt$, fmtPct,
 *      fmtDate, esc, selectName, joinByKey).
 *
 * Run: `npm test` — exits 0 on pass, 1 with a clear diff on fail.
 *
 * Editing protocol: when you add/remove a public API in the runtime, update
 * EXPECTED_API in the same commit AND bump the package.json version. The
 * test refusing to pass without an intentional change is the point.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RUNTIME_PATH = path.resolve(__dirname, '../src/erpai-pages-runtime.js');

// ── Frozen API contract ──────────────────────────────────────────────────────
// Add to this list when adding a new public helper. Remove only with care —
// agent-built pages may already depend on it. Sorted for diff stability.
const EXPECTED_API = [
  // Config
  ['config',          'object'],
  ['appId',           'undefined'],   // not set in stub env
  ['branchId',        'object'],      // null when unset (typeof null === 'object')
  ['baseUrl',         'undefined'],
  ['theme',           'undefined'],
  ['orgName',         'undefined'],
  ['appName',         'undefined'],

  // API
  ['api',             'function'],
  ['runSQL',          'function'],
  ['getTables',       'function'],
  ['getTable',        'function'],
  ['getRecordById',   'function'],
  ['getRecords',      'function'],
  ['createRecord',    'function'],
  ['updateRecord',    'function'],
  ['deleteRecord',    'function'],
  ['getSQLSchema',    'function'],

  // Navigation
  ['erpaiUrl',        'function'],
  ['navigateTo',      'function'],

  // Formatters
  ['esc',             'function'],
  ['fmt$',            'function'],
  ['fmtPct',          'function'],
  ['fmtNum',          'function'],
  ['compactNumber',   'function'],
  ['fmtDate',         'function'],
  ['formatCell',      'function'],

  // Cell decoders
  ['selectName',      'function'],
  ['joinByKey',       'function'],

  // Theme
  ['getThemeColors',  'function'],

  // UI helpers
  ['renderStatCard',         'function'],
  ['renderPagination',       'function'],
  ['renderRecordTable',      'function'],
  ['renderPermissionDenied', 'function'],
  ['handleError',            'function'],
  ['ErpaiPermissionError',   'function'],
  ['createSearch',           'function'],
  ['createDropdown',         'function'],
  ['icon',                   'function'],
  ['hasIcon',                'function'],
  ['listIcons',              'function'],
  ['showLoading',            'function'],
  ['showError',              'function'],
  ['hideLoading',            'function'],
  ['exportCSV',              'function'],

  // State management
  ['cached',           'function'],
  ['invalidateCache',  'function'],
  ['sectionLoading',   'function'],
  ['sectionLoaded',    'function'],
  ['sectionUpdating',  'function'],
  ['sectionUpdated',   'function'],
  ['loadSections',     'function'],

  // Skeletons / tabs / record modal
  ['skeleton',         'object'],     // exposed as namespace object
  ['initTabs',         'function'],
  ['openRecord',       'function'],
  ['openCreateForm',   'function'],

  // Charts / prefetch
  ['chart',            'object'],
  ['getData',          'function'],
  ['hasData',          'function'],
  ['withPrefetch',     'function'],
  ['invalidatePageCache', 'function'],
];

// ── Browser stub good enough to evaluate the IIFE ────────────────────────────
function makeSandbox() {
  const stylesByVar = {
    '--text': '#111', '--text-muted': '#666', '--border': '#ccc',
    '--accent': '#000', '--blue': '#3b82f6', '--green': '#16a34a',
    '--amber': '#d97706', '--red': '#dc2626', '--cyan': '#0891b2',
    '--purple': '#9333ea', '--surface': '#fff', '--bg': '#fff',
  };

  const docEl = {
    classList: { add: () => {}, toggle: () => {}, remove: () => {} },
    style: {},
  };
  const document = {
    documentElement: docEl,
    body: { innerHTML: '', appendChild: () => {} },
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => {
      const el = {
        _innerHTML: '',
        style: {}, classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
        setAttribute: () => {}, getAttribute: () => null,
        addEventListener: () => {}, appendChild: () => {}, insertBefore: () => {},
        focus: () => {}, click: () => {}, querySelector: () => null,
      };
      // textContent → innerHTML: emulate the browser's HTML-entity escaping
      // (used by esc()). Just covers &, <, >, ", '.
      Object.defineProperty(el, 'textContent', {
        set(v) {
          this._innerHTML = String(v).replace(/[&<>"']/g, (c) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
          })[c]);
        },
        get() { return this._innerHTML; },
      });
      Object.defineProperty(el, 'innerHTML', {
        set(v) { this._innerHTML = v; },
        get() { return this._innerHTML; },
      });
      return el;
    },
    addEventListener: () => {},
  };

  const win = {
    ERPAI: {},                      // unconfigured on purpose; assertConfig only fires inside api()
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    location: { origin: 'http://localhost', pathname: '/' },
    fetch: () => Promise.resolve({ ok: true, json: async () => ({}), text: async () => '' }),
    document,
    getComputedStyle: () => ({
      getPropertyValue: (k) => stylesByVar[k] ?? '',
    }),
    URL: { createObjectURL: () => '', revokeObjectURL: () => {} },
    Blob: function Blob() {},
    setTimeout, clearTimeout, setInterval, clearInterval,
    console,
  };
  win.window = win;
  win.globalThis = win;
  return win;
}

// ── Run ──────────────────────────────────────────────────────────────────────
const src = fs.readFileSync(RUNTIME_PATH, 'utf-8');
const sandbox = makeSandbox();
vm.createContext(sandbox);

try {
  vm.runInContext(src, sandbox, { filename: 'erpai-pages-runtime.js' });
} catch (err) {
  console.error('runtime threw while loading:');
  console.error(err.stack || err);
  process.exit(1);
}

const erpai = sandbox.erpai;
if (!erpai || typeof erpai !== 'object') {
  console.error('FAIL: window.erpai not set after loading runtime');
  process.exit(1);
}

const failures = [];

// 1. API surface
for (const [name, expectedType] of EXPECTED_API) {
  const actualType = typeof erpai[name];
  if (!(name in erpai)) {
    failures.push(`MISSING: erpai.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.${name} is ${actualType}, expected ${expectedType}`);
  }
}

// 2. Smoke-test the pure formatters — these are the helpers agent pages rely
//    on the most, and their behaviour is part of the contract. Each smoke
//    test runs in its own try/catch so a missing function reports as a
//    clean failure, not an unhandled throw.
let smokeChecks = 0;
function check(label, fn, expected) {
  smokeChecks++;
  let actual;
  try {
    actual = fn();
  } catch (err) {
    failures.push(`SMOKE THREW ${label}: ${err.message}`);
    return;
  }
  if (actual !== expected) {
    failures.push(`SMOKE FAIL ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
  }
}

check('compactNumber(12345)',       () => erpai.compactNumber(12345),       '12.3K');
check('compactNumber(1500000)',     () => erpai.compactNumber(1500000),     '1.5M');
check('compactNumber(2400000000)',  () => erpai.compactNumber(2400000000),  '2.4B');
check('compactNumber(-5000)',       () => erpai.compactNumber(-5000),       '-5K');
check('compactNumber(500)',         () => erpai.compactNumber(500),         '500');
check('compactNumber(null)',        () => erpai.compactNumber(null),        '');
check('compactNumber(NaN)',         () => erpai.compactNumber(NaN),         '');

check('fmt$(1234)',                 () => erpai.fmt$(1234),                 '$1,234');
check('fmtPct(42)',                 () => erpai.fmtPct(42),                 '42%');
check('fmtNum(1234567)',            () => erpai.fmtNum(1234567),            '1,234,567');
check('esc("<a>&")',                () => erpai.esc('<a>&'),                '&lt;a&gt;&amp;');

// selectName: 1-based index into options
check('selectName([2], opts)',
  () => erpai.selectName([2], { options: ['A', 'B', 'C'] }),
  'B');
check('selectName("[3]", opts)',
  () => erpai.selectName('[3]', { options: ['A', 'B', 'C'] }),
  'C');
check('selectName(null, opts)',
  () => erpai.selectName(null, { options: ['A'] }),
  '');

// joinByKey: round-trips records onto sql rows by key
check('joinByKey count',
  () => erpai.joinByKey([{ id: 1 }], 'id', [{ _id: 1, name: 'one' }]).length,
  1);
check('joinByKey record attached',
  () => erpai.joinByKey([{ id: 1 }], 'id', [{ _id: 1, name: 'one' }])[0].record?.name,
  'one');

// Tabler icon catalog: at least the common ones exist (covers TABLER_ICONS regression)
check('hasIcon("check")',          () => erpai.hasIcon('check'),          true);
check('hasIcon("chevron-down")',   () => erpai.hasIcon('chevron-down'),   true);
check('icon("check") returns svg', () => erpai.icon('check').includes('<svg'), true);

if (failures.length) {
  console.error(`\n✗ runtime API surface check failed (${failures.length} issue${failures.length > 1 ? 's' : ''}):\n`);
  for (const f of failures) console.error(`  ${f}`);
  console.error('\nIf these changes were intentional, update EXPECTED_API and the smoke checks in scripts/check-runtime-api.mjs.\n');
  process.exit(1);
}

console.log(`✓ runtime API surface check passed`);
console.log(`  ${EXPECTED_API.length} APIs verified, ${smokeChecks} smoke tests passed`);
