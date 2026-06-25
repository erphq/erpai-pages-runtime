/**
 * @erpai/pages-runtime — TypeScript declarations for window.erpai.
 *
 * Loaded into the iframe of every ERPAI custom page. The agent (Neo's
 * build-page skill) generates pages targeting these exact APIs, so this
 * file is the source of truth: any rename, removal, or signature change
 * is a contract change.
 */

declare global {
  interface Window {
    /** Bootstrapped by the iframe parent before runtime loads. */
    ERPAI: ErpaiBootConfig;
    /** The runtime — populated when erpai-pages-runtime.js executes. */
    erpai: ErpaiRuntime;
    /** Server-prefetched data — { [queryName]: SQLResult | RecordsResult }. */
    __ERPAI_DATA__?: Record<string, unknown>;
  }
}

// ── Boot config (set by the iframe host before the runtime loads) ──
export interface ErpaiBootConfig {
  token: string;
  baseUrl: string;
  appId: string;
  branchId?: string;
  orgName?: string;
  appName?: string;
  theme?: 'light' | 'dark' | 'system';
}

// ── API response shapes ──
export interface SQLResult {
  rows: Record<string, unknown>[];
  fields: { name: string; type?: string }[];
  rowCount: number;
}

export interface RecordsResult<T = Record<string, unknown>> {
  data: T[];
  totalCount: number;
}

export interface TableMeta {
  _id: string;
  name: string;
  columnsMetaData: ColumnMeta[];
}

export interface ColumnMeta {
  id: string;
  name: string;
  type: string;
  hidden?: boolean;
  options?: (string | { name: string; value?: string })[];
  [k: string]: unknown;
}

// ── UI helper option shapes ──
export interface DropdownOption { value: string | number; label: string; }
export interface DropdownOpts {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  searchable?: boolean;
  onChange?: (value: string, label: string) => void;
}
export interface DropdownHandle {
  getValue(): string;
  setValue(val: string): void;
  setOptions(opts: DropdownOption[], keepValue?: boolean): void;
  destroy(): void;
}

export interface StatCardOpts {
  title: string;
  value: string | number;
  sub?: string;
  change?: number;
  color?: string;
}

export interface PaginationOpts {
  page: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export interface RecordTableOpts {
  tableId: string;
  containerId: string;
  columns?: string[];
  pageSize?: number;
  onRowClick?: (record: Record<string, unknown>) => void;
}

export interface RecordModalOpts {
  onSave?: (id: string) => void;
  onClose?: () => void;
  viewOnly?: boolean;
  initialData?: Record<string, unknown>;
}

export interface ImportWizardOpts {
  /** Fires after a successful import. */
  onComplete?: (tableId: string, info: { importLogId: string }) => void;
  /** Fires when the wizard is dismissed without importing. */
  onClose?: () => void;
}

export interface PermissionDeniedOpts {
  message?: string;
  resource?: string;
}

export interface ThemeColors {
  text: string;
  muted: string;
  border: string;
  accent: string;
  blue: string;
  green: string;
  amber: string;
  red: string;
  cyan: string;
  purple: string;
  surface: string;
  bg: string;
}

// ── Errors ──
export interface ErpaiPermissionErrorInstance extends Error {
  name: 'ErpaiPermissionError';
  isPermissionError: true;
  path: string;
}

// ── The runtime itself ──
export interface ErpaiRuntime {
  // Config (read-only, comes from window.ERPAI)
  readonly config: ErpaiBootConfig;
  readonly appId: string;
  readonly branchId: string | null;
  readonly baseUrl: string;
  readonly theme: 'light' | 'dark' | 'system' | undefined;
  readonly orgName: string | undefined;
  readonly appName: string | undefined;

  // ── API layer ─────────────────────────────────────────────────────────
  /** Low-level fetch wrapper. Sends Authorization + (if set) X-Branch-Id. */
  api<T = unknown>(method: string, path: string, body?: unknown): Promise<T>;

  /** Execute a SQL query against the app's ClickHouse views. */
  runSQL(query: string): Promise<SQLResult>;

  getTables(): Promise<TableMeta[]>;
  getTable(tableId: string): Promise<TableMeta>;
  getRecordById<T = Record<string, unknown>>(tableId: string, recordId: string): Promise<T>;
  getRecords<T = Record<string, unknown>>(
    tableId: string,
    pageNo?: number,
    pageSize?: number,
    filter?: { q?: string; [k: string]: unknown },
  ): Promise<RecordsResult<T>>;
  createRecord(tableId: string, cells: Record<string, unknown>): Promise<{ id: string; success: boolean }>;
  updateRecord(tableId: string, recordId: string, cells: Record<string, unknown>): Promise<{ success: boolean }>;
  deleteRecord(tableId: string, recordId: string): Promise<{ success: boolean }>;
  getSQLSchema(): Promise<unknown>;

  // ── Navigation ────────────────────────────────────────────────────────
  /** Build an absolute URL into the ERPAI app shell. */
  erpaiUrl(path: string): string;
  /** Top-frame navigation (works inside the iframe). */
  navigateTo(path: string): void;

  // ── Formatters ────────────────────────────────────────────────────────
  /** HTML-escape a string. Returns '' for null/undefined. */
  esc(s: unknown): string;
  /** Currency: 1234 → "$1,234". */
  fmt$(n: number | null | undefined): string;
  /** Percentage: 42 → "42%". */
  fmtPct(n: number | null | undefined): string;
  /** Number with optional decimals: 1234567 → "1,234,567". */
  fmtNum(n: number | null | undefined, decimals?: number): string;
  /**
   * Compact number abbreviation: 12345 → "12.3K", 1.5e6 → "1.5M".
   * For Chart.js Y-axis tick callbacks and inline KPI values.
   */
  compactNumber(n: number | null | undefined): string;
  /** Date: Date|string → "Jan 15, 2026". Returns "—" on invalid. */
  fmtDate(d: Date | string | number | null | undefined, opts?: Intl.DateTimeFormatOptions): string;
  /** Format a cell value based on its column type. */
  formatCell(value: unknown, type: string, column?: ColumnMeta): string;

  // ── Cell decoders ────────────────────────────────────────────────────
  /** Decode a select cell (1-based index array) to its option name. */
  selectName(cellValue: unknown, columnMeta: ColumnMeta): string;
  /** Join SQL aggregate rows to records-API records by key. */
  joinByKey<S extends Record<string, unknown>, R extends Record<string, unknown>>(
    sqlRows: S[],
    sqlKey: keyof S & string,
    records: R[],
    recKey?: keyof R & string,
  ): (S & { record: R | null })[];

  // ── Theme ────────────────────────────────────────────────────────────
  /** Read theme CSS variables (--text, --blue, --green, etc.) for charts. */
  getThemeColors(): ThemeColors;

  // ── UI helpers ───────────────────────────────────────────────────────
  renderStatCard(containerId: string, opts: StatCardOpts): void;
  renderPagination(containerId: string, opts: PaginationOpts): void;
  renderRecordTable(opts: RecordTableOpts): Promise<void>;
  renderPermissionDenied(target: string | HTMLElement, opts?: PermissionDeniedOpts): void;
  /** Catch an API error and render the appropriate UI (permission vs generic). */
  handleError(err: unknown, target: string | HTMLElement, opts?: { message?: string }): void;
  ErpaiPermissionError(message?: string, path?: string): ErpaiPermissionErrorInstance;

  /** Debounce-wrap an input element to a callback. */
  createSearch(inputEl: HTMLInputElement, callback: (value: string) => void, delay?: number): void;

  /** Custom styled dropdown replacing native <select>. Auto-dedupes by value. */
  createDropdown(container: HTMLElement | string, opts: DropdownOpts): DropdownHandle | null;

  /** Render a Tabler icon by name. Returns the SVG string. */
  icon(name: string, opts?: { size?: number; class?: string }): string;
  hasIcon(name: string): boolean;
  listIcons(): string[];

  showLoading(msg?: string): void;
  showError(msg: string): void;
  hideLoading(): void;

  /** Download data as CSV. */
  exportCSV(headers: string[], rows: unknown[][], filename?: string): void;

  // ── State management ─────────────────────────────────────────────────
  /** Client-side memo with TTL. */
  cached<T>(key: string, fetcher: () => Promise<T>, ttl?: number): Promise<T>;
  invalidateCache(keyOrPrefix: string): void;
  sectionLoading(containerId: string): void;
  sectionLoaded(containerId: string): void;
  sectionUpdating(containerId: string): void;
  sectionUpdated(containerId: string): void;
  /** Render multiple sections in parallel, each with its own loading state. */
  loadSections(sections: Record<string, () => Promise<void>>): Promise<void>;

  // ── Skeletons / tabs / record modal ──────────────────────────────────
  skeleton: {
    text(opts?: { lines?: number }): string;
    statCard(): string;
    tableRow(opts?: { cells?: number }): string;
    chart(): string;
  };
  initTabs(opts: { containerId: string; tabs: { id: string; label: string }[]; onChange?: (id: string) => void }): void;
  /** Open the record-edit modal in the parent app shell. */
  openRecord(tableId: string, recordId: string, opts?: RecordModalOpts): void;
  /** Open the record-create modal in the parent app shell. */
  openCreateForm(tableId: string, opts?: RecordModalOpts): void;
  /** Open the data import wizard (CSV/Excel) in the parent app shell. Omit tableId to let the user pick or create a table. */
  openImport(tableId?: string, opts?: ImportWizardOpts): void;

  // ── Charts (helpers; bring your own Chart.js) ────────────────────────
  chart: {
    /** Build a Chart.js options object with theme-aware defaults. */
    defaults(opts?: Record<string, unknown>): Record<string, unknown>;
  };

  // ── Prefetch / Hydration ─────────────────────────────────────────────
  /** Read server-prefetched data injected via window.__ERPAI_DATA__. */
  getData<T = unknown>(key: string): T | undefined;
  hasData(key: string): boolean;
  /** Prefer prefetched data; fall back to fetching if not present. */
  withPrefetch<T>(key: string, fetcher: () => Promise<T>, renderer: (data: T) => void): Promise<void>;
  /** Tell the page-cache layer to invalidate cached snapshots. */
  invalidatePageCache(slugs?: string[]): Promise<unknown>;
}

export {};
