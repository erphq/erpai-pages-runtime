# Changelog

All notable changes to `@erpai/pages-runtime`. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning: [SemVer](https://semver.org/).

## [2.3.0] — 2026-06-25

### Added
- `erpai.openImport(tableId?, { onComplete?, onClose? })` — opens the real ERPAI ImportWizard (CSV/Excel upload, column mapping, type detection, create-new-table) via the parent-frame bridge. Omit `tableId` to let the user pick a table or create a new one. `onComplete(tableId, { importLogId })` fires after a successful import; `onClose()` on dismiss. Falls back to navigating to the table in standalone/local-preview mode. Pairs with the `ERPAI_OPEN_IMPORT` → `ERPAI_IMPORT_COMPLETE`/`ERPAI_IMPORT_CLOSED` host handler in erpai-ui.

## [2.2.0] — 2026-05-04

First standalone release. Code extracted from `erpai-ui/public/runtime/` into a dedicated repo with types, generated docs, and an API-surface CI check.

### Added
- `erpai.compactNumber(n)` — K/M/B/T abbreviation for Chart.js axis ticks and inline KPI values.
- `erpai.branchId` exported on `window.erpai` (was previously read-only inside the IIFE).
- `X-Branch-Id` header automatically attached to every `erpai.api()` call when `window.ERPAI.branchId` is set.
- `--blue` exposed in `erpai.getThemeColors()` alongside the other semantic palette colours.
- `dedupeOptions()` defensive guard inside `createDropdown` — drops items with duplicate `value` so SQL views with bad `GROUP BY` don't render the same option twice.
- Full custom-dropdown CSS (`.erpai-dropdown`, `.erpai-dropdown-trigger`, `.dd-chevron`, `.dd-check`, etc.) — pages using the dropdown markup were rendering ~190px chevron SVGs because the CSS hadn't been deployed.
- Tabler icon catalog (~250 icons) via `erpai.icon(name)`, `hasIcon`, `listIcons`.
- 403-aware `api()` wrapper: `ErpaiPermissionError` thrown on 403, `renderPermissionDenied` UI helper.
- TypeScript declarations (`dist/erpai-pages-runtime.d.ts`).
- Auto-generated agent docs (`dist/runtime.md`).
- API surface test (`tests/api-surface.test.mjs`) covering 60 exports and 19 smoke tests.

### Changed
- Theme tokens (`--destructive`, `--border`, `--input`, `--ring`, `--background-secondary`) re-aligned with the actual `tokens-light.css` / `tokens-dark.css` values used by the erpai-ui app shell.
- Card padding/shadow now read from `--card-padding` / `--card-shadow` CSS vars instead of hardcoded values.

### Migrated from
- `erpai-ui/public/runtime/erpai-pages-runtime.{js,css}` (still served from there as a build artifact of this package).
- `neo/src/lib/skills/builtin/build-page/stage/runtime/erpai-pages-runtime.{js,css}` (now installed via `@erpai/pages-runtime`).
- Phantom canonical at `erpai-v2/runtime/` and `.claude/skills copy/` — both deleted as part of the migration.

[2.2.0]: https://github.com/erphq/erpai-pages-runtime/releases/tag/v2.2.0
