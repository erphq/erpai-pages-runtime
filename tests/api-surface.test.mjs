#!/usr/bin/env node
/**
 * API surface check for src/erpai-pages-runtime.js.
 *
 * The deployed runtime is the contract between the agent (Neo + build-page
 * skill) and the pages it generates. Any time someone removes an export or
 * renames a function, agent-built pages crash in production. We've burned
 * three deploys on missing helpers (compactNumber, dropdown CSS, dedup) —
 * this script makes the next one show up at PR time, not user time.
 *
 * What it does:
 *   1. Loads the runtime in a stubbed browser environment.
 *   2. Asserts every entry in EXPECTED_API is present on window.erpai with
 *      the right type.
 *   3. Smoke-tests the pure formatters (compactNumber, fmtNum, fmt$, fmtPct,
 *      fmtDate, esc, selectName, joinByKey).
 *
 * Run: `npm run check:runtime` — exits 0 on pass, 1 with a clear diff on fail.
 *
 * Editing protocol: when you add/remove a public API in the runtime, update
 * EXPECTED_API in the same commit. The test refusing to pass without an
 * intentional change is the point.
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
  ['config', 'object'],
  ['appId', 'undefined'], // not set in stub env
  ['branchId', 'object'], // null when unset (typeof null === 'object')
  ['pageSlug', 'string'],
  ['pageId', 'string'],
  ['baseUrl', 'undefined'],
  ['appRouteBase', 'string'],
  ['theme', 'undefined'],
  ['orgName', 'undefined'],
  ['appName', 'undefined'],

  // API
  ['api', 'function'],
  ['runSQL', 'function'],
  ['getTables', 'function'],
  ['getTable', 'function'],
  ['getTableVersions', 'function'],
  ['getRecordById', 'function'],
  ['getRecords', 'function'],
  ['aggregateRecords', 'function'],
  ['countRecords', 'function'],
  ['createRecord', 'function'],
  ['updateRecord', 'function'],
  ['deleteRecord', 'function'],
  ['getSQLSchema', 'function'],
  ['executeTrigger', 'function'],
  ['runTrigger', 'function'],
  ['triggerWorkflow', 'function'],
  ['proto', 'object'],
  ['uploadAttachment', 'function'],
  ['uploadFile', 'function'],
  ['getFileUrl', 'function'],
  ['resolveFileUrl', 'function'],
  ['getAttachmentUrl', 'function'],
  ['resolveAttachmentUrl', 'function'],
  ['encodeAttachments', 'function'],

  // Navigation
  ['erpaiUrl', 'function'],
  ['navigateTo', 'function'],

  // Formatters
  ['esc', 'function'],
  ['fmt$', 'function'],
  ['fmtPct', 'function'],
  ['fmtNum', 'function'],
  ['compactNumber', 'function'],
  ['fmtDate', 'function'],
  ['formatCell', 'function'],

  // Cell decoders
  ['selectName', 'function'],
  ['joinByKey', 'function'],

  // Theme
  ['getThemeColors', 'function'],

  // UI helpers
  ['renderStatCard', 'function'],
  ['renderInsights', 'function'],
  ['renderPagination', 'function'],
  ['renderRecordTable', 'function'],
  ['renderPermissionDenied', 'function'],
  ['handleError', 'function'],
  ['ErpaiPermissionError', 'function'],
  ['createSearch', 'function'],
  ['createDropdown', 'function'],
  ['icon', 'function'],
  ['hasIcon', 'function'],
  ['listIcons', 'function'],
  ['showLoading', 'function'],
  ['showError', 'function'],
  ['hideLoading', 'function'],
  ['exportCSV', 'function'],
  ['exportSQL', 'function'],
  ['exportRecords', 'function'],
  ['downloadExport', 'function'],
  ['renderExportButtons', 'function'],

  // State management
  ['cached', 'function'],
  ['invalidateCache', 'function'],
  ['query', 'function'],
  ['records', 'object'],
  ['fetchAllRecords', 'function'],
  ['aggregates', 'function'],
  ['mutate', 'function'],
  ['bulkUpdate', 'function'],
  ['bulkUpdateByFilter', 'function'],
  ['triggerTableAction', 'function'],
  ['invalidate', 'function'],
  ['invalidateQueries', 'function'],
  ['renderList', 'function'],
  ['render', 'object'],
  ['section', 'function'],
  ['cards', 'object'],
  ['ui', 'object'],
  ['debug', 'object'],
  ['lifecycle', 'object'],
  ['state', 'object'],
  ['getState', 'function'],
  ['setState', 'function'],
  ['patchState', 'function'],
  ['removeState', 'function'],
  ['clearState', 'function'],
  ['getStateAsync', 'function'],
  ['setStateAsync', 'function'],
  ['patchStateAsync', 'function'],
  ['removeStateAsync', 'function'],
  ['clearStateAsync', 'function'],
  ['persistInputs', 'function'],
  ['restoreInputs', 'function'],
  ['clearPersistedInputs', 'function'],
  ['autoPersistPage', 'function'],
  ['getPersistedInputFiles', 'function'],
  ['setInputFiles', 'function'],
  ['sectionLoading', 'function'],
  ['sectionLoaded', 'function'],
  ['sectionUpdating', 'function'],
  ['sectionUpdated', 'function'],
  ['loadSections', 'function'],

  // Skeletons / tabs / record modal
  ['skeleton', 'object'], // exposed as namespace object
  ['initTabs', 'function'],
  ['openRecord', 'function'],
  ['openCreateForm', 'function'],
  ['openImport', 'function'],
  ['agentTasks', 'object'],

  // Charts / prefetch
  ['chart', 'object'],
  ['getData', 'function'],
  ['hasData', 'function'],
  ['withPrefetch', 'function'],
  ['invalidatePageCache', 'function'],
];

// ── Browser stub good enough to evaluate the IIFE ────────────────────────────
function makeSandbox() {
  const listeners = {};
  const stylesByVar = {
    '--text': '#111',
    '--text-muted': '#666',
    '--border': '#ccc',
    '--accent': '#000',
    '--blue': '#3b82f6',
    '--green': '#16a34a',
    '--amber': '#d97706',
    '--red': '#dc2626',
    '--cyan': '#0891b2',
    '--purple': '#9333ea',
    '--surface': '#fff',
    '--bg': '#fff',
  };

  const docEl = {
    classList: { add: () => {}, toggle: () => {}, remove: () => {} },
    style: {},
  };
  const document = {
    readyState: 'complete',
    documentElement: docEl,
    body: { innerHTML: '', appendChild: () => {} },
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    contains: () => true,
    createDocumentFragment: () => {
      const frag = {
        children: [],
        appendChild: (child) => {
          frag.children.push(child);
          child.parentNode = frag;
          return child;
        },
      };
      return frag;
    },
    createElement: () => {
      const el = {
        _innerHTML: '',
        children: [],
        style: {},
        classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
        setAttribute: () => {},
        getAttribute: () => null,
        addEventListener: () => {},
        appendChild: (child) => {
          el.children.push(child);
          child.parentNode = el;
          return child;
        },
        insertBefore: (child) => {
          el.children.push(child);
          child.parentNode = el;
          return child;
        },
        removeChild: (child) => {
          el.children = el.children.filter((c) => c !== child);
          child.parentNode = null;
          return child;
        },
        focus: () => {},
        click: () => {},
        querySelector: () => null,
      };
      // textContent → innerHTML: emulate the browser's HTML-entity escaping
      // (used by esc()). Just covers &, <, >, ", '.
      Object.defineProperty(el, 'textContent', {
        set(v) {
          this._innerHTML = String(v).replace(
            /[&<>"']/g,
            (c) =>
              ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
              })[c],
          );
        },
        get() {
          return this._innerHTML;
        },
      });
      Object.defineProperty(el, 'innerHTML', {
        set(v) {
          this._innerHTML = v;
        },
        get() {
          return this._innerHTML;
        },
      });
      return el;
    },
    addEventListener: (type, fn) => {
      listeners[type] ||= new Set();
      listeners[type].add(fn);
    },
  };

  const win = {
    ERPAI: {}, // unconfigured on purpose; assertConfig only fires inside api()
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    location: { origin: 'http://localhost', pathname: '/' },
    fetch: () => Promise.resolve({ ok: true, json: async () => ({}), text: async () => '' }),
    document,
    getComputedStyle: () => ({
      getPropertyValue: (k) => stylesByVar[k] ?? '',
    }),
    URL: { createObjectURL: () => '', revokeObjectURL: () => {} },
    Blob: function Blob() {},
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    addEventListener: (type, fn) => {
      listeners[type] ||= new Set();
      listeners[type].add(fn);
    },
    removeEventListener: (type, fn) => {
      listeners[type]?.delete(fn);
    },
    __ERPAI_DISABLE_AUTO_PERSIST__: true,
    __dispatchMessage: (data) => {
      for (const fn of listeners.message || []) {
        fn({ data });
      }
    },
    console,
  };
  win.window = win;
  win.globalThis = win;
  return win;
}

// ── Run ──────────────────────────────────────────────────────────────────────
const src = fs.readFileSync(RUNTIME_PATH, 'utf-8');
const sandbox = makeSandbox();
sandbox.ERPAI.currency = 'USD';
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
const expectedApiNames = new Set(EXPECTED_API.map(([name]) => name));
for (const [name, expectedType] of EXPECTED_API) {
  const actualType = typeof erpai[name];
  if (!(name in erpai)) {
    failures.push(`MISSING: erpai.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.${name} is ${actualType}, expected ${expectedType}`);
  }
}
for (const name of Object.keys(erpai).sort()) {
  if (!expectedApiNames.has(name)) {
    failures.push(`UNTRACKED EXPORT: erpai.${name} exists but is not listed in EXPECTED_API`);
  }
}

const EXPECTED_PROTO_API = [
  ['executeTrigger', 'function'],
  ['follow', 'function'],
  ['getNodeData', 'function'],
  ['getSummary', 'function'],
  ['isTerminalStatus', 'function'],
  ['listExecutions', 'function'],
  ['renderStatus', 'function'],
  ['retryExecution', 'function'],
  ['runTrigger', 'function'],
  ['subscribe', 'function'],
];
for (const [name, expectedType] of EXPECTED_PROTO_API) {
  const actualType = typeof erpai.proto?.[name];
  if (!erpai.proto || !(name in erpai.proto)) {
    failures.push(`MISSING: erpai.proto.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.proto.${name} is ${actualType}, expected ${expectedType}`);
  }
}

const EXPECTED_STATE_API = [
  ['clear', 'function'],
  ['clearAsync', 'function'],
  ['get', 'function'],
  ['getAsync', 'function'],
  ['key', 'function'],
  ['patch', 'function'],
  ['patchAsync', 'function'],
  ['remove', 'function'],
  ['removeAsync', 'function'],
  ['scope', 'function'],
  ['set', 'function'],
  ['setAsync', 'function'],
];
for (const [name, expectedType] of EXPECTED_STATE_API) {
  const actualType = typeof erpai.state?.[name];
  if (!erpai.state || !(name in erpai.state)) {
    failures.push(`MISSING: erpai.state.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.state.${name} is ${actualType}, expected ${expectedType}`);
  }
}

const EXPECTED_QUERY_API = [
  ['invalidate', 'function'],
  ['key', 'function'],
  ['subscribe', 'function'],
];
for (const [name, expectedType] of EXPECTED_QUERY_API) {
  const actualType = typeof erpai.query?.[name];
  if (!erpai.query || !(name in erpai.query)) {
    failures.push(`MISSING: erpai.query.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.query.${name} is ${actualType}, expected ${expectedType}`);
  }
}

const EXPECTED_RECORDS_API = [
  ['all', 'function'],
  ['bulkGet', 'function'],
  ['grouped', 'function'],
  ['page', 'function'],
  ['refMap', 'function'],
];
for (const [name, expectedType] of EXPECTED_RECORDS_API) {
  const actualType = typeof erpai.records?.[name];
  if (!erpai.records || !(name in erpai.records)) {
    failures.push(`MISSING: erpai.records.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.records.${name} is ${actualType}, expected ${expectedType}`);
  }
}

const EXPECTED_MUTATE_API = [
  ['action', 'function'],
  ['bulkUpdate', 'function'],
  ['bulkUpdateByFilter', 'function'],
  ['declareDependency', 'function'],
  ['dependencies', 'function'],
  ['update', 'function'],
];
for (const [name, expectedType] of EXPECTED_MUTATE_API) {
  const actualType = typeof erpai.mutate?.[name];
  if (!erpai.mutate || !(name in erpai.mutate)) {
    failures.push(`MISSING: erpai.mutate.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.mutate.${name} is ${actualType}, expected ${expectedType}`);
  }
}

const EXPECTED_RENDER_API = [
  ['list', 'function'],
  ['section', 'function'],
];
for (const [name, expectedType] of EXPECTED_RENDER_API) {
  const actualType = typeof erpai.render?.[name];
  if (!erpai.render || !(name in erpai.render)) {
    failures.push(`MISSING: erpai.render.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.render.${name} is ${actualType}, expected ${expectedType}`);
  }
}

const EXPECTED_UI_API = [
  ['debounceInput', 'function'],
  ['preserveFocus', 'function'],
  ['select', 'function'],
  ['selection', 'function'],
];
for (const [name, expectedType] of EXPECTED_UI_API) {
  const actualType = typeof erpai.ui?.[name];
  if (!erpai.ui || !(name in erpai.ui)) {
    failures.push(`MISSING: erpai.ui.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.ui.${name} is ${actualType}, expected ${expectedType}`);
  }
}

const EXPECTED_CARDS_API = [['bind', 'function']];
for (const [name, expectedType] of EXPECTED_CARDS_API) {
  const actualType = typeof erpai.cards?.[name];
  if (!erpai.cards || !(name in erpai.cards)) {
    failures.push(`MISSING: erpai.cards.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.cards.${name} is ${actualType}, expected ${expectedType}`);
  }
}

const EXPECTED_DEBUG_API = [
  ['getStats', 'function'],
  ['metrics', 'function'],
  ['overlay', 'function'],
];
for (const [name, expectedType] of EXPECTED_DEBUG_API) {
  const actualType = typeof erpai.debug?.[name];
  if (!erpai.debug || !(name in erpai.debug)) {
    failures.push(`MISSING: erpai.debug.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.debug.${name} is ${actualType}, expected ${expectedType}`);
  }
}

const EXPECTED_LIFECYCLE_API = [
  ['busy', 'function'],
  ['metrics', 'function'],
  ['post', 'function'],
  ['ready', 'function'],
];
for (const [name, expectedType] of EXPECTED_LIFECYCLE_API) {
  const actualType = typeof erpai.lifecycle?.[name];
  if (!erpai.lifecycle || !(name in erpai.lifecycle)) {
    failures.push(`MISSING: erpai.lifecycle.${name} (expected ${expectedType})`);
  } else if (actualType !== expectedType) {
    failures.push(`WRONG TYPE: erpai.lifecycle.${name} is ${actualType}, expected ${expectedType}`);
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
    failures.push(
      `SMOKE FAIL ${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`,
    );
  }
}

check('compactNumber(12345)', () => erpai.compactNumber(12345), '12.3K');
check('compactNumber(1500000)', () => erpai.compactNumber(1500000), '1.5M');
check('compactNumber(2400000000)', () => erpai.compactNumber(2400000000), '2.4B');
check('compactNumber(-5000)', () => erpai.compactNumber(-5000), '-5K');
check('compactNumber(500)', () => erpai.compactNumber(500), '500');
check('compactNumber(null)', () => erpai.compactNumber(null), '');
check('compactNumber(NaN)', () => erpai.compactNumber(NaN), '');

check('fmt$(1234)', () => erpai.fmt$(1234), '$1,234');
check('fmtPct(42)', () => erpai.fmtPct(42), '42%');
check('fmtNum(1234567)', () => erpai.fmtNum(1234567), '1,234,567');

const inrSandbox = makeSandbox();
inrSandbox.ERPAI.currency = 'INR';
vm.createContext(inrSandbox);
vm.runInContext(src, inrSandbox);
check(
  'fmt$(1234) uses the configured app currency',
  () => inrSandbox.erpai.fmt$(1234),
  '₹1,234',
);

const euroSandbox = makeSandbox();
euroSandbox.ERPAI.currency = 'eur';
vm.createContext(euroSandbox);
vm.runInContext(src, euroSandbox);
check(
  'fmt$ normalizes lowercase currency codes',
  () => euroSandbox.erpai.fmt$(1234),
  '€1,234',
);

const fallbackCurrencySandbox = makeSandbox();
fallbackCurrencySandbox.ERPAI.currency = 'invalid';
vm.createContext(fallbackCurrencySandbox);
vm.runInContext(src, fallbackCurrencySandbox);
check(
  'fmt$ falls back safely for invalid currency codes',
  () => fallbackCurrencySandbox.erpai.fmt$(1234),
  '$1,234',
);

const legacyCurrencySandbox = makeSandbox();
vm.createContext(legacyCurrencySandbox);
vm.runInContext(src, legacyCurrencySandbox);
check(
  'fmt$ preserves USD for hosts that do not inject currency yet',
  () => legacyCurrencySandbox.erpai.fmt$(-1234),
  '-$1,234',
);
check('esc("<a>&")', () => erpai.esc('<a>&'), '&lt;a&gt;&amp;');

// selectName: 1-based index into options
check('selectName([2], opts)', () => erpai.selectName([2], { options: ['A', 'B', 'C'] }), 'B');
check('selectName("[3]", opts)', () => erpai.selectName('[3]', { options: ['A', 'B', 'C'] }), 'C');
check('selectName(null, opts)', () => erpai.selectName(null, { options: ['A'] }), '');

// joinByKey: round-trips records onto sql rows by key
check(
  'joinByKey count',
  () => erpai.joinByKey([{ id: 1 }], 'id', [{ _id: 1, name: 'one' }]).length,
  1,
);
check(
  'joinByKey record attached',
  () => erpai.joinByKey([{ id: 1 }], 'id', [{ _id: 1, name: 'one' }])[0].record?.name,
  'one',
);

// Tabler icon catalog: at least the common ones exist (covers TABLER_ICONS regression)
check('hasIcon("check")', () => erpai.hasIcon('check'), true);
check('hasIcon("chevron-down")', () => erpai.hasIcon('chevron-down'), true);
check('icon("check") returns svg', () => erpai.icon('check').includes('<svg'), true);

check(
  'query key scoped',
  () => erpai.query.key(['records.page', 'table_1']).startsWith('erpai-query:'),
  true,
);
check('records.page exported', () => typeof erpai.records.page, 'function');
check('mutate.action exported', () => typeof erpai.mutate.action, 'function');
check('mutate.declareDependency exported', () => typeof erpai.mutate.declareDependency, 'function');
check(
  'mutate dependency registered',
  () => {
    erpai.mutate.declareDependency('child_table', 'parent_table');
    return erpai.mutate.dependencies().child_table?.[0];
  },
  'parent_table',
);
check('invalidate alias exported', () => typeof erpai.invalidate, 'function');
check('render.list exported', () => erpai.render.list === erpai.renderList, true);
check('cards.bind exported', () => typeof erpai.cards.bind, 'function');
check('ui.select exported', () => typeof erpai.ui.select, 'function');
const selectEl = sandbox.document.createElement('select');
erpai.ui.select(selectEl, {
  options: [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta' },
  ],
  value: 'b',
});
check('ui.select sets current value', () => selectEl.value, 'b');
check('ui.select renders options', () => selectEl.children.length, 2);
check('ui.preserveFocus exported', () => erpai.ui.preserveFocus === erpai.ui.preserveFocus, true);
check('debug metrics shape', () => typeof erpai.debug.metrics().requestsByEndpoint, 'object');
check('lifecycle ready exported', () => typeof erpai.lifecycle.ready, 'function');

// Parent-owned query cache bridge: route switches can destroy the iframe, so
// persisted query data must be recoverable from the parent shell before a page
// falls back to browser-local IDB or network fetchers.
const parentCacheSandbox = makeSandbox();
parentCacheSandbox.ERPAI = {
  appId: '024ccf04e129e1476d3df2de',
  baseUrl: 'https://api.test',
  token: 'test-token',
};
let parentCacheFetches = 0;
parentCacheSandbox.parent = {
  postMessage: (message) => {
    if (message.type === 'ERPAI_QUERY_CACHE_GET') {
      parentCacheSandbox.__dispatchMessage({
        type: 'ERPAI_QUERY_CACHE_RESULT',
        requestId: message.requestId,
        ok: true,
        entry: {
          key: message.key,
          data: { cached: true },
          time: Date.now(),
          meta: { tableId: 'table_1' },
        },
      });
    }
  },
};
vm.createContext(parentCacheSandbox);
try {
  vm.runInContext(src, parentCacheSandbox, { filename: 'erpai-pages-runtime.js' });
  const result = await parentCacheSandbox.erpai.query(
    ['bridge-cache', 'table_1'],
    async () => {
      parentCacheFetches++;
      return { cached: false };
    },
    { meta: { tableId: 'table_1' } },
  );
  check('parent query cache serves cached data', () => result.data.cached, true);
  check('parent query cache skips fetcher', () => parentCacheFetches, 0);
  check(
    'parent query cache hit metric',
    () => parentCacheSandbox.erpai.debug.metrics().parentCacheHits,
    1,
  );
} catch (err) {
  failures.push(`SMOKE THREW parent query cache bridge: ${err.message}`);
}

// Server hydration invalidation can now target declared table/tag
// dependencies instead of only explicit slugs or the whole app.
const invalidateSandbox = makeSandbox();
invalidateSandbox.ERPAI = {
  appId: '024ccf04e129e1476d3df2de',
  baseUrl: 'https://api.test',
  token: 'test-token',
};
let invalidateBody = null;
invalidateSandbox.fetch = async (_url, options) => {
  invalidateBody = JSON.parse(options.body);
  return {
    ok: true,
    status: 200,
    json: async () => ({ success: true, data: { invalidated: 1 } }),
    text: async () => '',
  };
};
vm.createContext(invalidateSandbox);
try {
  vm.runInContext(src, invalidateSandbox, { filename: 'erpai-pages-runtime.js' });
  await invalidateSandbox.erpai.invalidatePageCache({
    tableIds: ['table_1'],
    tags: ['dashboard'],
  });
  check('invalidatePageCache tableIds payload', () => invalidateBody.tableIds[0], 'table_1');
  check('invalidatePageCache tags payload', () => invalidateBody.tags[0], 'dashboard');
} catch (err) {
  failures.push(`SMOKE THREW invalidatePageCache dependency payload: ${err.message}`);
}

// Table-version hints give custom pages a cheap SWR revalidation primitive
// without fetching whole tables after every route restore.
const versionSandbox = makeSandbox();
versionSandbox.ERPAI = {
  appId: '024ccf04e129e1476d3df2de',
  baseUrl: 'https://api.test',
  token: 'test-token',
};
let versionUrl = '';
let versionBody = null;
versionSandbox.fetch = async (url, options) => {
  versionUrl = url;
  versionBody = JSON.parse(options.body);
  return {
    ok: true,
    status: 200,
    json: async () => ({
      success: true,
      response: { versions: [{ tableId: 'table_1', version: '123' }] },
    }),
    text: async () => '',
  };
};
vm.createContext(versionSandbox);
try {
  vm.runInContext(src, versionSandbox, { filename: 'erpai-pages-runtime.js' });
  const versionResult = await versionSandbox.erpai.getTableVersions([
    'table_1',
    'table_1',
    'table_2',
  ]);
  check(
    'getTableVersions endpoint',
    () => new URL(versionUrl).pathname,
    '/v1/agent/app/custom-pages/table-versions',
  );
  check(
    'getTableVersions unique tableIds',
    () => versionBody.tableIds.join(','),
    'table_1,table_2',
  );
  check('getTableVersions unwraps agent response', () => versionResult.versions[0].version, '123');
} catch (err) {
  failures.push(`SMOKE THREW getTableVersions: ${err.message}`);
}

// Server-side summaries must stay additive: normalize only their own filter
// inputs, preserve raw api() bodies, and remain classified as reads.
const summarySandbox = makeSandbox();
summarySandbox.ERPAI = {
  appId: 'app_1',
  baseUrl: 'https://api.test',
  token: 'test-token',
  branchId: 'branch_1',
};
const summaryCalls = [];
summarySandbox.fetch = async (url, options) => {
  summaryCalls.push({ url, options, body: options.body ? JSON.parse(options.body) : undefined });
  const isCount = String(url).includes('/record/count');
  return {
    ok: true,
    status: 200,
    json: async () => (isCount ? { count: 7 } : { rows: [{ values: { total: 7 } }] }),
    text: async () => '',
  };
};
vm.createContext(summarySandbox);
try {
  vm.runInContext(src, summarySandbox, { filename: 'erpai-pages-runtime.js' });
  const aggregateResult = await summarySandbox.erpai.aggregateRecords('table/1', {
    aggregations: [{ op: 'count', alias: 'total' }],
    groupBy: ['status'],
    filter: {
      condition: 'or',
      rules: [
        { field: 'status', operator: 'equals', value: 'open' },
        { columnId: 'amount', operation: 'between', value: [10, 20] },
      ],
    },
  });
  const countResult = await summarySandbox.erpai.countRecords('table/1', { favorite: true });
  await summarySandbox.erpai.api('POST', '/v1/app-builder/table/table_1/paged-record', {
    untouched: true,
    customOption: { keep: 'exactly' },
  });

  const aggregateCall = summaryCalls[0];
  const countCall = summaryCalls[1];
  const rawCall = summaryCalls[2];
  check(
    'aggregateRecords endpoint',
    () => new URL(aggregateCall.url).pathname,
    '/v1/app-builder/table/table%2F1/record/aggregate',
  );
  check(
    'aggregateRecords branch header',
    () => aggregateCall.options.headers['X-Branch-Id'],
    'branch_1',
  );
  check('aggregateRecords count response', () => aggregateResult.rows[0].values.total, 7);
  check('aggregateRecords groupBy', () => aggregateCall.body.groupBy[0], 'status');
  check('aggregateRecords logical operator', () => aggregateCall.body.filter.logicalOperator, 'or');
  check('aggregateRecords aliases equals', () => aggregateCall.body.filter.conditions[0].opr, 'eq');
  check(
    'aggregateRecords expands between lower bound',
    () => aggregateCall.body.filter.conditions[1].opr,
    'gte',
  );
  check(
    'aggregateRecords expands between upper bound',
    () => aggregateCall.body.filter.conditions[2].opr,
    'lte',
  );
  check(
    'countRecords endpoint',
    () => new URL(countCall.url).pathname,
    '/v1/app-builder/table/table%2F1/record/count',
  );
  check('countRecords favorite filter', () => countCall.body.filter.favorite, true);
  check('countRecords response', () => countResult.count, 7);
  check(
    'summary reads do not enable skip-cache',
    () => countCall.options.headers['x-skip-cache'],
    undefined,
  );
  check(
    'raw api body remains untouched',
    () => JSON.stringify(rawCall.body),
    '{"untouched":true,"customOption":{"keep":"exactly"}}',
  );

  let idsError = '';
  try {
    await summarySandbox.erpai.countRecords('table_1', { ids: ['record_1'] });
  } catch (err) {
    idsError = err.message;
  }
  check(
    'countRecords rejects ids filters',
    () => idsError.includes('does not support ids filters'),
    true,
  );
  check('ids rejection avoids network request', () => summaryCalls.length, 3);
} catch (err) {
  failures.push(`SMOKE THREW server-side summaries: ${err.message}`);
}

// A filtered first-page read must never reuse an unfiltered hydrated payload.
const prefetchSandbox = makeSandbox();
prefetchSandbox.ERPAI = {
  appId: 'app_1',
  baseUrl: 'https://api.test',
  token: 'test-token',
};
prefetchSandbox.__ERPAI_DATA__ = {
  initialRecords: {
    _type: 'records',
    _tableId: 'table_1',
    data: [{ _id: 'prefetched' }],
  },
};
let filteredRecordFetches = 0;
prefetchSandbox.fetch = async () => {
  filteredRecordFetches += 1;
  return {
    ok: true,
    status: 200,
    json: async () => ({ data: [{ _id: 'network' }], totalCount: 1 }),
    text: async () => '',
  };
};
vm.createContext(prefetchSandbox);
try {
  vm.runInContext(src, prefetchSandbox, { filename: 'erpai-pages-runtime.js' });
  const hydrated = await prefetchSandbox.erpai.getRecords('table_1', 1, 50);
  const filtered = await prefetchSandbox.erpai.getRecords('table_1', 1, 50, {
    filterCriteria: { conditions: [{ colId: 'status', opr: 'eq', value: 'open' }] },
  });
  check('unfiltered first page uses prefetch', () => hydrated.data[0]._id, 'prefetched');
  check('filtered first page uses network', () => filtered.data[0]._id, 'network');
  check('filtered first page bypasses prefetch once', () => filteredRecordFetches, 1);
} catch (err) {
  failures.push(`SMOKE THREW filtered prefetch guard: ${err.message}`);
}

// Navigation: custom pages are rendered in an iframe while the parent app may
// be mounted below a base path (Azure uses /apps/apps/<app-slug>). The runtime
// must resolve app-relative routes against the injected parent route base
// instead of the old legacy /-/org/app/id URL shape.
const navSandbox = makeSandbox();
navSandbox.ERPAI = {
  appId: '024ccf04e129e1476d3df2de',
  baseUrl: 'https://api.new.erp.ai',
  appRouteBase: '/apps/apps/solar-project-management-024ccf04e129e1476d3df2de',
};
navSandbox.parent = { location: { href: '' } };
vm.createContext(navSandbox);
try {
  vm.runInContext(src, navSandbox, { filename: 'erpai-pages-runtime.js' });
} catch (err) {
  failures.push(`SMOKE THREW navigation runtime load: ${err.message}`);
}
const navErpai = navSandbox.erpai;
check(
  'erpaiUrl app-relative route',
  () => navErpai.erpaiUrl('/table/tasks'),
  '/apps/apps/solar-project-management-024ccf04e129e1476d3df2de/table/tasks',
);
check(
  'erpaiUrl bare route',
  () => navErpai.erpaiUrl('custom-page/home'),
  '/apps/apps/solar-project-management-024ccf04e129e1476d3df2de/custom-page/home',
);
check(
  'erpaiUrl query route',
  () => navErpai.erpaiUrl('?tab=timeline'),
  '/apps/apps/solar-project-management-024ccf04e129e1476d3df2de?tab=timeline',
);
check(
  'erpaiUrl does not double-prefix',
  () =>
    navErpai.erpaiUrl('/apps/apps/solar-project-management-024ccf04e129e1476d3df2de/table/tasks'),
  '/apps/apps/solar-project-management-024ccf04e129e1476d3df2de/table/tasks',
);
navErpai.navigateTo('/custom-page/home');
check(
  'navigateTo updates parent location',
  () => navSandbox.parent.location.href,
  '/apps/apps/solar-project-management-024ccf04e129e1476d3df2de/custom-page/home',
);

// Iframe record bridge: generated pages rely on save/cancel callbacks from the
// parent RecordFormDialog. Keep this smoke narrow so callback regressions fail
// with the runtime API check.
let bridgePost = null;
sandbox.parent = {
  postMessage: (message) => {
    bridgePost = message;
  },
};

let bridgeSaved = null;
erpai.openRecord('table_1', 'record_1', {
  onSave: (recordId, payload) => {
    bridgeSaved = { recordId, payload };
  },
});
check('openRecord posts bridge request', () => bridgePost?.type, 'ERPAI_OPEN_RECORD');
check('openRecord requestId present', () => typeof bridgePost?.requestId, 'string');
sandbox.__dispatchMessage({
  type: 'ERPAI_RECORD_SAVED',
  requestId: bridgePost.requestId,
  recordId: 'record_1',
  record: { _id: 'record_1', cells: { name: 'Updated' } },
});
check('openRecord onSave recordId', () => bridgeSaved?.recordId, 'record_1');
check('openRecord onSave payload', () => bridgeSaved?.payload?.cells?.name, 'Updated');

let bridgeClosed = false;
erpai.openCreateForm('table_1', {
  initialData: { name: 'Draft' },
  onClose: () => {
    bridgeClosed = true;
  },
});
check('openCreateForm posts bridge request', () => bridgePost?.type, 'ERPAI_CREATE_RECORD');
sandbox.__dispatchMessage({ type: 'ERPAI_RECORD_CLOSED', requestId: bridgePost.requestId });
check('openCreateForm onClose callback', () => bridgeClosed, true);

// Mutation action settlement: custom pages should be able to call table
// actions and poll affected rows with a bounded predicate instead of sleeping
// and reloading everything.
const settleSandbox = makeSandbox();
let settleBulkCalls = 0;
let settleActionCalls = 0;
settleSandbox.ERPAI = {
  appId: '024ccf04e129e1476d3df2de',
  baseUrl: 'https://api.test',
  token: 'test-token',
};
settleSandbox.fetch = async (url) => {
  const pathname = new URL(url).pathname;
  if (pathname.includes('/custom-action-trigger')) {
    settleActionCalls++;
    return {
      ok: true,
      status: 200,
      json: async () => ({ ok: true, message: 'queued' }),
      text: async () => '',
    };
  }
  if (pathname.includes('/record-bulk-get')) {
    settleBulkCalls++;
    return {
      ok: true,
      status: 200,
      json: async () => [{ _id: 'row_1', cells: { done: settleBulkCalls >= 2 } }],
      text: async () => '',
    };
  }
  return { ok: true, status: 200, json: async () => ({}), text: async () => '' };
};
vm.createContext(settleSandbox);
try {
  vm.runInContext(src, settleSandbox, { filename: 'erpai-pages-runtime.js' });
  const result = await settleSandbox.erpai.mutate.action(
    'child_table',
    'Generate',
    { recordIds: ['row_1'], selectedData: [{ _id: 'row_1' }] },
    {
      awaitSettled: {
        pollMs: 0,
        attempts: 3,
        until: (rows) => rows.every((row) => row.cells?.done === true),
      },
      invalidate: { tableId: 'child_table' },
    },
  );
  check('mutate.action calls custom action once', () => settleActionCalls, 1);
  check('mutate.action awaitSettled polls until predicate', () => settleBulkCalls, 2);
  check('mutate.action awaitSettled result flag', () => result.settled?.ok, true);
  check(
    'mutate.action infers affected table metadata',
    () => result.affectedTables?.[0],
    'child_table',
  );
  check(
    'mutate.action infers affected table ids metadata',
    () => result.affectedTableIds?.[0],
    'child_table',
  );
  check(
    'mutate.action infers affected record metadata',
    () => result.affectedRecordIds?.[0],
    'row_1',
  );
} catch (err) {
  failures.push(`SMOKE THREW mutate.action awaitSettled: ${err.message}`);
}

if (failures.length) {
  console.error(
    `\n✗ runtime API surface check failed (${failures.length} issue${failures.length > 1 ? 's' : ''}):\n`,
  );
  for (const f of failures) console.error(`  ${f}`);
  console.error(
    '\nIf these changes were intentional, update EXPECTED_API and the smoke checks in scripts/check-runtime-api.mjs.\n',
  );
  process.exit(1);
}

console.log(`✓ runtime API surface check passed`);
console.log(`  ${EXPECTED_API.length} APIs verified, ${smokeChecks} smoke tests passed`);
