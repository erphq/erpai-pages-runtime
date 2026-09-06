/**
 * ERPAI Pages Runtime — JavaScript SDK
 * Shared API layer, UI helpers, and utilities for custom HTML pages.
 * Namespace: window.erpai
 * v1.0.0
 */
(function () {
  'use strict';

  // ===== TABLER ICONS =====
  // Inline Tabler icon catalog (24x24 viewBox). Use erpai.icon(name, opts).
  var TABLER_ICONS = {
    'activity': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h4l3 8l4-16l3 8h4"/>',
    'adjustments': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-6v4m0 4v8m4-4a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-12v10m0 4v2m4-13a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-3v1m0 4v11"/>',
    'adjustments-horizontal': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0M4 6h8m4 0h4M6 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0m-2 0h2m4 0h10m-5 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0M4 18h11m4 0h1"/>',
    'alert-circle': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-4v4m0 4h.01"/>',
    'archive': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2m2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"/>',
    'arrow-down': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m6-6l-6 6m-6-6l6 6"/>',
    'arrow-left': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l6 6m-6-6l6-6"/>',
    'arrow-narrow-right': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-4 4l4-4m-4-4l4 4"/>',
    'arrow-right': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6 6l6-6m-6-6l6 6"/>',
    'arrow-up': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m6-8l-6-6m-6 6l6-6"/>',
    'arrows-maximize': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4h4v4m-6 2l6-6M8 20H4v-4m0 4l6-6m6 6h4v-4m-6-2l6 6M8 4H4v4m0-4l6 6"/>',
    'arrows-minimize': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9h4V5M3 3l6 6m-4 6h4v4m-6 2l6-6m10-6h-4V5m0 4l6-6m-2 12h-4v4m0-4l6 6"/>',
    'arrows-sort': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 9l4-4l4 4M7 5v14m14-4l-4 4l-4-4m4 4V5"/>',
    'award': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 9a6 6 0 1 0 12 0A6 6 0 1 0 6 9"/><path d="m12 15l3.4 5.89l1.598-3.233l3.598.232l-3.4-5.889M6.802 12l-3.4 5.89L7 17.657l1.598 3.232l3.4-5.889"/></g>',
    'bell': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1"/>',
    'bell-ringing': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1m6-10.273A11.05 11.05 0 0 0 18.206 3M3 6.727A11.05 11.05 0 0 1 5.792 3"/>',
    'book': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6v13m9-13v13m9-13v13"/>',
    'book-2': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 4v16H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M19 16H7a2 2 0 0 0-2 2M9 8h6"/></g>',
    'bookmark': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 7v14l-6-4l-6 4V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4"/>',
    'bookmark-filled': '<path fill="currentColor" d="M14 2a5 5 0 0 1 5 5v14a1 1 0 0 1-1.555.832L12 18.202l-5.444 3.63a1 1 0 0 1-1.55-.72L5 21V7a5 5 0 0 1 5-5z"/>',
    'books': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm4 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM5 8h4m0 8h4"/><path d="m13.803 4.56l2.184-.53c.562-.135 1.133.19 1.282.732l3.695 13.418a1.02 1.02 0 0 1-.634 1.219l-.133.041l-2.184.53c-.562.135-1.133-.19-1.282-.732L13.036 5.82a1.02 1.02 0 0 1 .634-1.219zM14 9l4-1m-2 8l3.923-.98"/></g>',
    'brand-github': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21"/>',
    'brand-google': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.945 11a9 9 0 1 1-3.284-5.997l-2.655 2.392A5.5 5.5 0 1 0 17.125 14H13v-3z"/>',
    'brush': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 21v-4a4 4 0 1 1 4 4z"/><path d="M21 3A16 16 0 0 0 8.2 13.2M21 3a16 16 0 0 1-10.2 12.8"/><path d="M10.6 9a9 9 0 0 1 4.4 4.4"/></g>',
    'building': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M9 8h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>',
    'building-bank': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M3 10h18M5 6l7-3l7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3"/>',
    'building-community': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 9l5 5v7H8v-4m0 4H3v-7l5-5m1 1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17h-8m0-14v.01M17 7v.01M17 11v.01M17 15v.01"/>',
    'bulb': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h1m8-9v1m8 8h1M5.6 5.6l.7.7m12.1-.7l-.7.7M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0-1 3a2 2 0 0 1-4 0a3.5 3.5 0 0 0-1-3m.7 1h4.6"/>',
    'calculator': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm0 6v.01m4-.01v.01m4-.01v.01M8 17v.01m4-.01v.01m4-.01v.01"/></g>',
    'calendar': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16m-9 4h1m0 0v3"/>',
    'calendar-event': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16"/><path d="M8 15h2v2H8z"/></g>',
    'calendar-month': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16M8 14v4m4-4v4m4-4v4"/>',
    'calendar-stats': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11.795 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4m-1 3v4h4"/><path d="M14 18a4 4 0 1 0 8 0a4 4 0 1 0-8 0m1-15v4M7 3v4m-4 4h16"/></g>',
    'calendar-time': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11.795 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M14 18a4 4 0 1 0 8 0a4 4 0 1 0-8 0m1-15v4M7 3v4m-4 4h16"/><path d="M18 16.496V18l1 1"/></g>',
    'camera': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 7h1a2 2 0 0 0 2-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2"/><path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/></g>',
    'certificate': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 15a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/><path d="M13 17.5V22l2-1.5l2 1.5v-4.5"/><path d="M10 19H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-1 1.73M6 9h12M6 12h3m-3 3h2"/></g>',
    'chart-arcs': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/><path d="M16.924 11.132a5 5 0 1 0-4.056 5.792"/><path d="M3 12a9 9 0 1 0 9-9"/></g>',
    'chart-bar': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm12-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 20h14"/>',
    'chart-donut': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 3.2A9 9 0 1 0 20.8 14a1 1 0 0 0-1-1H16a4.1 4.1 0 1 1-5-5V4a.9.9 0 0 0-1-.8"/><path d="M15 3.5A9 9 0 0 1 20.5 9H16a9 9 0 0 0-1-1z"/></g>',
    'chart-line': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 19h16M4 15l4-6l4 2l4-5l4 4"/>',
    'chart-pie': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 3.2A9 9 0 1 0 20.8 14a1 1 0 0 0-1-1H13a2 2 0 0 1-2-2V4a.9.9 0 0 0-1-.8"/><path d="M15 3.5A9 9 0 0 1 20.5 9H16a1 1 0 0 1-1-1z"/></g>',
    'chart-pie-2': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 3v9h9"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/></g>',
    'check': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l5 5L20 7"/>',
    'checks': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 12l5 5L22 7M2 12l5 5m5-5l5-5"/>',
    'chevron-down': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/>',
    'chevron-left': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 6l-6 6l6 6"/>',
    'chevron-right': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 6l6 6l-6 6"/>',
    'chevron-up': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 15l6-6l6 6"/>',
    'circle': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/>',
    'circle-check': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/><path d="m9 12l2 2l4-4"/></g>',
    'circle-dot': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/></g>',
    'circle-x': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m7-2l4 4m0-4l-4 4"/>',
    'clipboard': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2"/></g>',
    'clipboard-copy': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3m9-9V7a2 2 0 0 0-2-2h-2m-2 12v-1a1 1 0 0 1 1-1h1m3 0h1a1 1 0 0 1 1 1v1m0 3v1a1 1 0 0 1-1 1h-1m-3 0h-1a1 1 0 0 1-1-1v-1"/><path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2"/></g>',
    'clipboard-list': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2m0 7h.01M13 12h2m-6 4h.01M13 16h2"/></g>',
    'clipboard-text': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2m0 7h6m-6 4h6"/></g>',
    'clock': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"/><path d="M12 7v5l3 3"/></g>',
    'clock-hour-3': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9 0h3.5M12 7v5"/>',
    'cloud': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.657 18C4.085 18 2 15.993 2 13.517s2.085-4.482 4.657-4.482c.393-1.762 1.794-3.2 3.675-3.773c1.88-.572 3.956-.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486s-1.551 3.487-3.465 3.487H6.657"/>',
    'coin': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/><path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1-1.8-1M12 7v10"/></g>',
    'copy': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"/><path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1"/></g>',
    'credit-card': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm0 2h18M7 15h.01M11 15h2"/>',
    'currency-dollar': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.7 8A3 3 0 0 0 14 6h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1-2.7-2M12 3v3m0 12v3"/>',
    'dots': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/>',
    'dots-vertical': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/>',
    'download': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5l5-5m-5-7v12"/>',
    'droplet': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0s3.262-5.708 1.566-8.546l-4.89-7.26c-.42-.625-1.287-.803-1.936-.397a1.4 1.4 0 0 0-.41.397l-4.893 7.26C4.24 13.715 4.9 17.318 7.502 19.423"/>',
    'external-link': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5"/>',
    'eye': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0"/><path d="M21 12q-3.6 6-9 6t-9-6q3.6-6 9-6t9 6"/></g>',
    'eye-off': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"/><path d="M16.681 16.673A8.7 8.7 0 0 1 12 18q-5.4 0-9-6q1.908-3.18 4.32-4.674m2.86-1.146A9 9 0 0 1 12 6q5.4 0 9 6q-1 1.665-2.138 2.87M3 3l18 18"/></g>',
    'file': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2"/></g>',
    'file-text': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2M9 9h1m-1 4h6m-6 4h6"/></g>',
    'files': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 3v4a1 1 0 0 0 1 1h4"/><path d="M18 17h-7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4l5 5v7a2 2 0 0 1-2 2"/><path d="M16 17v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2"/></g>',
    'filter': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16v2.172a2 2 0 0 1-.586 1.414L15 12v7l-6 2v-8.5L4.52 7.572A2 2 0 0 1 4 6.227z"/>',
    'filter-cog': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 20l-3 1v-8.5L4.52 7.572A2 2 0 0 1 4 6.227V4h16v2.172a2 2 0 0 1-.586 1.414L15 12v1.5m2.001 5.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0m2-3.5V17m0 4v1.5m3.031-5.25l-1.299.75m-3.463 2l-1.3.75m0-3.5l1.3.75m3.463 2l1.3.75"/>',
    'flame': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10.941c2.333-3.308.167-7.823-1-8.941c0 3.395-2.235 5.299-3.667 6.706C5.903 10.114 5 12 5 14.294C5 17.998 8.134 21 12 21s7-3.002 7-6.706c0-1.712-1.232-4.403-2.333-5.588c-2.084 3.353-3.257 3.353-4.667 2.235"/>',
    'folder': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/>',
    'gift': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm9-1v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5"/></g>',
    'grid-dots': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0M4 19a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/>',
    'hash': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9h14M5 15h14M11 4L7 20M17 4l-4 16"/>',
    'heart': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"/>',
    'help': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9 5v.01"/><path d="M12 13.5a1.5 1.5 0 0 1 1-1.5a2.6 2.6 0 1 0-3-4"/></g>',
    'home': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"/></g>',
    'home-2': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M10 12h4v4h-4z"/></g>',
    'hourglass': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6.5 7h11m-11 10h11M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1"/><path d="M6 4v2a6 6 0 1 0 12 0V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1"/></g>',
    'id': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/><path d="M7 10a2 2 0 1 0 4 0a2 2 0 1 0-4 0m8-2h2m-2 4h2M7 16h10"/></g>',
    'id-badge': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 1 0-4 0m0-7h4M9 18h6"/></g>',
    'inbox': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 13h3l3 3h4l3-3h3"/></g>',
    'info-circle': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01"/><path d="M11 12h1v4h1"/></g>',
    'key': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1-4.069 0l-.301-.301l-6.558 6.558a2 2 0 0 1-1.239.578L5.172 21H4a1 1 0 0 1-.993-.883L3 20v-1.172a2 2 0 0 1 .467-1.284l.119-.13L4 17h2v-2h2v-2l2.144-2.144l-.301-.301a2.877 2.877 0 0 1 0-4.069l2.643-2.643a2.877 2.877 0 0 1 4.069 0M15 9h.01"/>',
    'language': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 6.371C9 10.789 6.761 13 4 13m0-6.629h7"/><path d="M5 9c0 2.144 2.252 3.908 6 4m1 7l4-9l4 9m-.9-2h-6.2M6.694 3l.793.582"/></g>',
    'layers-intersect': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"/><path d="M4 10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/></g>',
    'layout-dashboard': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m0 12h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1m10-4h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1m0-8h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1"/>',
    'layout-grid': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>',
    'layout-list': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>',
    'link': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11"/>',
    'list': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01"/>',
    'list-details': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5h8m-8 4h5m-5 6h8m-8 4h5M3 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>',
    'lock': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0-2 0m-3-5V7a4 4 0 1 1 8 0v4"/></g>',
    'lock-open': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M11 16a1 1 0 1 0 2 0a1 1 0 1 0-2 0m-3-5V6a4 4 0 0 1 8 0"/></g>',
    'lock-square-rounded': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9s-9-1.8-9-9s1.8-9 9-9"/><path d="M8 12a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm2-1V9a2 2 0 1 1 4 0v2"/></g>',
    'mail': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="m3 7l9 6l9-6"/></g>',
    'map': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 7l6-3l6 3l6-3v13l-6 3l-6-3l-6 3zm6-3v13m6-10v13"/>',
    'map-pin': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/><path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0"/></g>',
    'medal': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v3M8 4v6m8-6v6m-4 8.5L9 20l.5-3.5l-2-2l3-.5l1.5-3l1.5 3l3 .5l-2 2L15 20z"/>',
    'menu-2': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>',
    'message': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"/>',
    'message-circle': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 20l1.3-3.9C1.976 12.663 2.874 8.228 6.4 5.726c3.526-2.501 8.59-2.296 11.845.48c3.255 2.777 3.695 7.266 1.029 10.501S11.659 20.922 7.7 19z"/>',
    'messages': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 14l-3-3h-7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1zm-7 1v2a1 1 0 0 1-1 1H6l-3 3V11a1 1 0 0 1 1-1h2"/>',
    'microphone': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 5a3 3 0 0 1 3-3a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3a3 3 0 0 1-3-3z"/><path d="M5 10a7 7 0 0 0 14 0M8 21h8m-4-4v4"/></g>',
    'minus': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>',
    'moon': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"/>',
    'music': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0-6 0m10 0a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/><path d="M9 17V4h10v13M9 8h10"/></g>',
    'palette': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 21a9 9 0 0 1 0-18c4.97 0 9 3.582 9 8c0 1.06-.474 2.078-1.318 2.828S17.693 15 16.5 15H14a2 2 0 0 0-1 3.75A1.3 1.3 0 0 1 12 21"/><path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0m4-3a1 1 0 1 0 2 0a1 1 0 1 0-2 0m4 3a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/></g>',
    'paperclip': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3L18 10a3 3 0 0 0-6-6l-6.5 6.5a4.5 4.5 0 0 0 9 9L21 13"/>',
    'pencil': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16zm9.5-13.5l4 4"/>',
    'phone': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    'photo': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 8h.01M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/><path d="m3 16l5-5c.928-.893 2.072-.893 3 0l5 5"/><path d="m14 14l1-1c.928-.893 2.072-.893 3 0l3 3"/></g>',
    'plus': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m-7-7h14"/>',
    'receipt': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-3-2l-2 2l-2-2l-2 2l-2-2zM9 7h6m-6 4h6m-2 4h2"/>',
    'refresh': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/>',
    'reload': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19.933 13.041a8 8 0 1 1-9.925-8.788c3.899-1 7.935 1.007 9.425 4.747"/><path d="M20 4v5h-5"/></g>',
    'school': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M22 9L12 5L2 9l10 4zv6"/><path d="M6 10.6V16a6 3 0 0 0 12 0v-5.4"/></g>',
    'scissors': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7a3 3 0 1 0 6 0a3 3 0 1 0-6 0m0 10a3 3 0 1 0 6 0a3 3 0 1 0-6 0m5.6-8.4L19 19M8.6 15.4L19 5"/>',
    'search': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"/>',
    'settings': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0"/></g>',
    'share': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m12-6a3 3 0 1 0 6 0a3 3 0 1 0-6 0m0 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-6.3-7.3l6.6-3.4m-6.6 6l6.6 3.4"/>',
    'shield': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3a12 12 0 0 0 8.5 3A12 12 0 0 1 12 21A12 12 0 0 1 3.5 6A12 12 0 0 0 12 3"/>',
    'shopping-bag': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6.331 8H17.67a2 2 0 0 1 1.977 2.304l-1.255 8.152A3 3 0 0 1 15.426 21H8.574a3 3 0 0 1-2.965-2.544l-1.255-8.152A2 2 0 0 1 6.331 8"/><path d="M9 11V6a3 3 0 0 1 6 0v5"/></g>',
    'shopping-cart': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/><path d="M17 17H6V3H4"/><path d="m6 5l14 1l-1 7H6"/></g>',
    'sort-ascending': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h7m-7 6h7m-7 6h9m2-9l3-3l3 3m-3-3v12"/>',
    'sort-descending': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h9m-9 6h7m-7 6h7m4-3l3 3l3-3m-3-9v12"/>',
    'square': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    'star': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>',
    'star-filled': '<path fill="currentColor" d="m8.243 7.34l-6.38.925l-.113.023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013.11a1 1 0 0 0 1.464.944l5.706-3l5.693 3l.1.046a1 1 0 0 0 1.352-1.1l-1.091-6.355l4.624-4.5l.078-.085a1 1 0 0 0-.633-1.62l-6.38-.926l-2.852-5.78a1 1 0 0 0-1.794 0z"/>',
    'star-half': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253z"/>',
    'sun': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"/>',
    'tag': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/><path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592-5.592a2.41 2.41 0 0 0 0-3.408l-7.71-7.71A2 2 0 0 0 11.172 3H6a3 3 0 0 0-3 3"/></g>',
    'thumb-down': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1za4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2-2l-1-5a2 3 0 0 0-2-2h-7a3 3 0 0 0-3 3"/>',
    'thumb-up': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1za4 4 0 0 0 4-4V6a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1-2 2h-7a3 3 0 0 1-3-3"/>',
    'trash': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>',
    'trending-down': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m3 7l6 6l4-4l8 8"/><path d="M21 10v7h-7"/></g>',
    'trending-up': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m3 17l6-6l4 4l8-8"/><path d="M14 7h7v7"/></g>',
    'triangle': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.363 3.591L2.257 17.125a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0"/>',
    'trophy': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21h8m-4-4v4M7 4h10m0 0v8a5 5 0 0 1-10 0V4M3 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0m14 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/>',
    'unlink': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 22v-2m-8-5l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11m14 6h2M2 7h2m3-5v2"/>',
    'upload': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 9l5-5l5 5m-5-5v12"/>',
    'user': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>',
    'user-circle': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/><path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0-6 0m-2.832 8.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/></g>',
    'user-minus': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4q.523.002 1.009.128M16 19h6"/>',
    'user-plus': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0m8 12h6m-3-3v6M6 21v-2a4 4 0 0 1 4-4h4"/>',
    'user-star': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h.5m7.3 5.817l-2.172 1.138a.392.392 0 0 1-.568-.41l.415-2.411l-1.757-1.707a.389.389 0 0 1 .217-.665l2.428-.352l1.086-2.193a.392.392 0 0 1 .702 0l1.086 2.193l2.428.352a.39.39 0 0 1 .217.665l-1.757 1.707l.414 2.41a.39.39 0 0 1-.567.411z"/>',
    'user-x': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h3.5m8.5 7l-5-5m0 5l5-5"/>',
    'users': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-17.87a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85"/>',
    'users-group': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0-4 0m-2 8v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M15 5a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2 5h2a2 2 0 0 1 2 2v1M5 5a2 2 0 1 0 4 0a2 2 0 0 0-4 0m-2 8v-1a2 2 0 0 1 2-2h2"/>',
    'users-plus': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M3 21v-2a4 4 0 0 1 4-4h4c.96 0 1.84.338 2.53.901M16 3.13a4 4 0 0 1 0 7.75M16 19h6m-3-3v6"/>',
    'video': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14zM3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    'wallet': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M17 8V5a1 1 0 0 0-1-1H6a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V6"/><path d="M20 12v4h-4a2 2 0 0 1 0-4z"/></g>',
    'world': '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m.6-3h16.8M3.6 15h16.8"/><path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18"/></g>',
    'x': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/>',
    'zoom-in': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m4 0h6m-3-3v6m11 8l-6-6"/>',
    'zoom-out': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m4 0h6m8 11l-6-6"/>'
  };

  /**
   * Render a Tabler icon as inline SVG string.
   * @param {string} name - icon name (e.g. "users", "calendar-event")
   * @param {object} [opts] - { size = 16, className = "", color = "currentColor", strokeWidth }
   * @returns {string} HTML string of <svg>
   */
  function icon(name, opts) {
    opts = opts || {};
    var size = opts.size || 16;
    var cls = opts.className || "";
    var color = opts.color || "currentColor";
    var sw = opts.strokeWidth;
    var body = TABLER_ICONS[name];
    if (!body) {
      console.warn("[erpai.icon] Unknown icon:", name);
      // Render a placeholder square so layout doesn\'t break
      body = '<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>';
    }
    if (sw != null) {
      body = body.replace(/stroke-width="\d+(?:\.\d+)?"/g, 'stroke-width="' + sw + '"');
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" style="color:' + color + ';flex-shrink:0;display:inline-block;vertical-align:middle" class="erpai-icon ' + cls + '">' + body + '</svg>';
  }

  /** Returns true if a Tabler icon name exists in the catalog. */
  function hasIcon(name) { return Object.prototype.hasOwnProperty.call(TABLER_ICONS, name); }

  /** Returns the list of all available Tabler icon names. */
  function listIcons() { return Object.keys(TABLER_ICONS).sort(); }

  // ===== CONFIG =====
  const cfg = window.ERPAI || {};
  const TOKEN = cfg.token;
  const BASE_URL = cfg.baseUrl;
  const APP_ID = cfg.appId;
  const BRANCH_ID = cfg.branchId || null;
  const PAGE_SLUG = cfg.pageSlug || cfg.slug || '';
  const PAGE_ID = cfg.pageId || '';
  const ORG_NAME = cfg.orgName;
  const APP_NAME = cfg.appName;
  const APP_CURRENCY = typeof cfg.currency === 'string' ? cfg.currency.trim().toUpperCase() : '';
  const APP_ROUTE_BASE = cfg.appRouteBase || cfg.routeBase || '';
  const THEME = cfg.theme;

  var _skipRuntimeCacheUntil = 0;

  function shouldSkipRuntimeCache() {
    return Date.now() < _skipRuntimeCacheUntil;
  }

  function isRuntimeMutation(method, path) {
    var m = String(method || 'GET').toUpperCase();
    if (m === 'GET' || m === 'HEAD') return false;
    if (path.indexOf('/paged-record') !== -1) return false;
    if (path.indexOf('/record/aggregate') !== -1) return false;
    if (path.indexOf('/record/count') !== -1) return false;
    if (path.indexOf('/sql/execute') !== -1) return false;
    if (path.indexOf('/sql/export') !== -1) return false;
    return true;
  }

  function markRuntimeDataDirty() {
    _skipRuntimeCacheUntil = Date.now() + 5000;
    PREFETCHED = null;
    if (typeof _cache === 'object' && _cache) _cache = {};
  }

  // ===== THEME APPLICATION =====
  // Default is light (no class). Add .dark for dark mode.
  // Matches erpai-dev: light by default, .dark class on <html> for dark.
  if (THEME === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (THEME === 'system' || !THEME) {
    // Follow system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
    // Listen for system changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        document.documentElement.classList.toggle('dark', e.matches);
      });
    }
  }
  // 'light' → no class needed (default)

  // ===== CONFIG VALIDATION =====
  function assertConfig() {
    if (!TOKEN || !BASE_URL || !APP_ID) {
      const el = document.getElementById('app');
      if (el) el.innerHTML = '<div class="error-container"><h3>Missing Configuration</h3><p>window.ERPAI must provide token, baseUrl, and appId.</p></div>';
      throw new Error('window.ERPAI not configured — need token, baseUrl, appId');
    }
  }

  // ===== API LAYER =====

  /**
   * Thrown when the backend returns 403. Pages / runtime helpers can catch
   * this specifically to render a "no permission" placeholder instead of
   * bubbling up an opaque API error.
   */
  function ErpaiPermissionError(message, path) {
    var err = new Error(message || 'Permission denied');
    err.name = 'ErpaiPermissionError';
    err.isPermissionError = true;
    err.path = path || '';
    return err;
  }

  /** Core fetch wrapper with auth */
  async function api(method, path, body) {
    assertConfig();
    const startedAt = Date.now();
    const headers = {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    if (BRANCH_ID) headers['X-Branch-Id'] = BRANCH_ID;
    if (shouldSkipRuntimeCache()) headers['x-skip-cache'] = 'true';
    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store'
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        if (typeof recordRuntimeRequest === 'function') {
          recordRuntimeRequest(method, path, Date.now() - startedAt, false, false, res.status);
        }
        if (res.status === 403) {
          throw ErpaiPermissionError(
            `403 Forbidden — ${text ? text.slice(0, 200) : 'no access to this resource'}`,
            path,
          );
        }
        throw new Error(`API ${res.status}: ${res.statusText}${text ? ' — ' + text.slice(0, 200) : ''}`);
      }
      const json = await res.json();
      if (typeof recordRuntimeRequest === 'function') {
        recordRuntimeRequest(method, path, Date.now() - startedAt, false, false, res.status);
      }
      if (isRuntimeMutation(method, path)) markRuntimeDataDirty();
      return json;
    } catch (err) {
      if (typeof recordRuntimeRequest === 'function') {
        recordRuntimeRequest(method, path, Date.now() - startedAt, false, false, 0);
      }
      throw err;
    }
  }

  function authHeaders(extra) {
    const headers = Object.assign({
      'Authorization': `Bearer ${TOKEN}`,
      'Cache-Control': 'no-cache'
    }, extra || {});
    if (BRANCH_ID) headers['X-Branch-Id'] = BRANCH_ID;
    if (shouldSkipRuntimeCache()) headers['x-skip-cache'] = 'true';
    return headers;
  }

  async function readJsonResponse(res, label) {
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`${label} failed: ${res.status} ${res.statusText}${text ? ' — ' + text.slice(0, 200) : ''}`);
    }
    return res.json();
  }

  async function ensureOkResponse(res, label) {
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`${label} failed: ${res.status} ${res.statusText}${text ? ' — ' + text.slice(0, 200) : ''}`);
    }
    return res;
  }

  /** Execute workflows whose Custom Page Trigger action tag matches. */
  async function executeTrigger(actionTag, actionData, options) {
    assertConfig();
    const opts = options || {};
    const tag = String(actionTag || '').trim();
    if (!tag) throw new Error('executeTrigger requires action_tag');
    const payload = {
      appId: opts.appId || APP_ID,
      action_tag: tag,
      action_data: actionData === undefined ? {} : actionData,
      pageId: opts.pageId || PAGE_ID,
      pageSlug: opts.pageSlug || PAGE_SLUG
    };
    const res = await api('POST', '/v1/auto-builder/custom-page-triggers/execute', payload);
    if (!res.success) {
      const err = new Error(res.error || 'Custom page trigger execution failed');
      err.response = res;
      throw err;
    }
    return res.data || res;
  }

  function unwrapSuccessData(response, label) {
    if (response && typeof response === 'object' && Object.prototype.hasOwnProperty.call(response, 'success')) {
      if (response.success === false) throw new Error(response.error || label + ' failed');
      return response.data === undefined ? response : response.data;
    }
    return response;
  }

  function protoRunRef(options) {
    return String((options && (options.executionId || options.runRef)) || 'latest');
  }

  async function getProtoSummary(workflowId, options) {
    const id = String(workflowId || '').trim();
    if (!id) throw new Error('proto.getSummary requires workflowId');
    const res = await api('GET', `/v1/auto-builder/workflows/${encodeURIComponent(id)}/runs/${encodeURIComponent(protoRunRef(options))}/summary`);
    return unwrapSuccessData(res, 'Proto summary');
  }

  async function getProtoNodeData(workflowId, nodeId, options) {
    const id = String(workflowId || '').trim();
    const node = String(nodeId || '').trim();
    if (!id) throw new Error('proto.getNodeData requires workflowId');
    if (!node) throw new Error('proto.getNodeData requires nodeId');
    const params = new URLSearchParams();
    if (options && options.run !== undefined) params.set('run', String(options.run));
    if (options && options.branch !== undefined) params.set('branch', String(options.branch));
    if (options && options.page !== undefined) params.set('page', String(options.page));
    if (options && options.pageSize !== undefined) params.set('pageSize', String(options.pageSize));
    const qs = params.toString();
    const res = await api('GET', `/v1/auto-builder/workflows/${encodeURIComponent(id)}/runs/${encodeURIComponent(protoRunRef(options))}/nodes/${encodeURIComponent(node)}${qs ? '?' + qs : ''}`);
    return unwrapSuccessData(res, 'Proto node data');
  }

  async function listProtoExecutions(workflowId, options) {
    const id = String(workflowId || '').trim();
    if (!id) throw new Error('proto.listExecutions requires workflowId');
    const opts = options || {};
    const params = new URLSearchParams();
    if (opts.page !== undefined) params.set('page', String(opts.page));
    if (opts.pageSize !== undefined) params.set('pageSize', String(opts.pageSize));
    if (opts.limit !== undefined) params.set('limit', String(opts.limit));
    if (opts.status) params.set('status', String(opts.status));
    if (opts.appId || APP_ID) params.set('appId', String(opts.appId || APP_ID));
    const qs = params.toString();
    const res = await api('GET', `/v1/auto-builder/executions/workflow/${encodeURIComponent(id)}${qs ? '?' + qs : ''}`);
    return unwrapSuccessData(res, 'Proto execution history');
  }

  async function retryProtoExecution(executionId) {
    const id = String(executionId || '').trim();
    if (!id) throw new Error('proto.retryExecution requires executionId');
    const res = await api('POST', `/v1/auto-builder/executions/${encodeURIComponent(id)}/retry`);
    return unwrapSuccessData(res, 'Proto execution retry');
  }

  function normalizeProtoExecutionRefs(options) {
    options = options || {};
    if (Array.isArray(options.executions) && options.executions.length) {
      return options.executions
        .map(function (execution) { return Object.assign({}, execution); })
        .filter(function (execution) { return !!execution.workflowId; });
    }
    if (options.workflowId) {
      return [{
        workflowId: options.workflowId,
        workflowName: options.workflowName,
        nodeId: options.nodeId,
        executionId: options.executionId
      }];
    }
    return [];
  }

  function extractProtoExecutions(result) {
    const source = result && typeof result === 'object' && Object.prototype.hasOwnProperty.call(result, 'data')
      ? result.data
      : result;
    const executions = source && typeof source === 'object' && Object.prototype.hasOwnProperty.call(source, 'executions')
      ? source.executions
      : (Array.isArray(source) ? source : []);
    return Array.isArray(executions)
      ? executions
          .map(function (item) { return item && typeof item === 'object' ? Object.assign({}, item) : null; })
          .filter(function (item) { return !!(item && item.workflowId); })
      : [];
  }

  function protoExecutionKey(execution, index) {
    return execution.executionId || [execution.workflowId || 'workflow', execution.nodeId || 'node', index].join(':');
  }

  const PROTO_TERMINAL_STATUSES = new Set(['SUCCESS', 'ERROR', 'FAILED', 'FAILURE', 'CANCELED', 'CANCELLED', 'CRASHED', 'TIMED_OUT', 'NO_MATCH']);

  function isProtoTerminalStatus(status) {
    const value = String(status || '').trim().toUpperCase();
    return value ? PROTO_TERMINAL_STATUSES.has(value) : false;
  }

  function statusLooksBad(status) {
    const value = String(status || '').trim().toUpperCase();
    return value === 'ERROR' || value === 'FAILED' || value === 'FAILURE' || value === 'CANCELED' || value === 'CANCELLED' || value === 'CRASHED' || value === 'TIMED_OUT';
  }

  function normalizeProtoNodes(nodes, summary, options) {
    const explicit = nodes && nodes.length ? nodes : (summary.lastNodeExecuted ? [summary.lastNodeExecuted] : []);
    return explicit
      .map(function (node) { return typeof node === 'string' ? { nodeId: node } : node; })
      .filter(function (node) { return !!(node && node.nodeId); })
      .map(function (node) {
        return Object.assign({
          page: options && options.page !== undefined ? options.page : 1,
          pageSize: options && options.pageSize !== undefined ? options.pageSize : 25
        }, node);
      });
  }

  function aggregateProtoStatus(state) {
    if (state.errors.length) return 'ERROR';
    const statuses = state.executions
      .map(function (execution, index) {
        const key = protoExecutionKey(execution, index);
        return (state.summaries[key] && state.summaries[key].status) || execution.status || null;
      })
      .filter(Boolean);
    if (!statuses.length) return 'RUNNING';
    if (statuses.some(function (status) { return !isProtoTerminalStatus(status); })) return 'RUNNING';
    if (statuses.some(statusLooksBad)) return 'ERROR';
    return 'SUCCESS';
  }

  function resolveProtoTarget(target) {
    if (!target) return null;
    if (typeof target !== 'string') return target;
    return document.querySelector(target) || document.getElementById(target.replace(/^#/, ''));
  }

  function htmlEscape(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      switch (char) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        default: return '&#39;';
      }
    });
  }

  function renderProtoStatus(target, state) {
    const el = resolveProtoTarget(target);
    if (!el) return;
    const summaries = Object.entries(state.summaries);
    const nodePages = Object.values(state.nodeData);
    const firstPage = nodePages[0];
    const firstItem = firstPage && firstPage.items && firstPage.items[0] ? firstPage.items[0].json : null;
    const status = state.status || aggregateProtoStatus(state);
    const isBad = statusLooksBad(status);
    const hasExecutions = state.executions.length > 0;
    const title = !hasExecutions ? 'No matching active proto' : (isBad ? 'Proto failed' : (isProtoTerminalStatus(status) ? 'Proto complete' : 'Proto running'));
    const emptyMessage = hasExecutions ? 'Waiting for execution data...' : 'No active workflow matched this action tag.';
    const rows = summaries.map(function (entry) {
      const key = entry[0];
      const summary = entry[1];
      const execution = state.executions.find(function (candidate, index) {
        return protoExecutionKey(candidate, index) === key;
      });
      const nodeCount = summary.nodes ? Object.keys(summary.nodes).length : 0;
      return `<div style="display:flex;justify-content:space-between;gap:12px;padding:6px 0;border-top:1px solid hsl(var(--border));">
        <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${htmlEscape((execution && (execution.workflowName || execution.workflowId)) || key)}</span>
        <span style="color:hsl(var(--muted-foreground));white-space:nowrap;">${htmlEscape(summary.status || (execution && execution.status) || 'RUNNING')} · ${nodeCount} node${nodeCount === 1 ? '' : 's'}</span>
      </div>`;
    }).join('');
    const output = firstItem
      ? `<pre style="max-height:180px;overflow:auto;margin:10px 0 0;padding:10px;border-radius:8px;background:hsl(var(--muted));font-size:12px;line-height:1.45;">${htmlEscape(JSON.stringify(firstItem, null, 2))}</pre>`
      : '';
    const error = state.errors[0]
      ? `<div style="margin-top:10px;color:hsl(var(--destructive));font-size:13px;">${htmlEscape(state.errors[0].message)}</div>`
      : '';

    el.innerHTML = `<div class="erpai-proto-status" data-status="${htmlEscape(status)}" style="border:1px solid hsl(var(--border));border-radius:8px;background:hsl(var(--card));padding:12px;color:hsl(var(--foreground));box-shadow:var(--card-shadow);">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div style="font-weight:600;">${title}</div>
        <div style="font-size:12px;color:${isBad ? 'hsl(var(--destructive))' : 'hsl(var(--muted-foreground))'};">${htmlEscape(status)}</div>
      </div>
      ${rows || `<div style="padding-top:8px;color:hsl(var(--muted-foreground));font-size:13px;">${emptyMessage}</div>`}
      ${output}
      ${error}
    </div>`;
  }

  function subscribeToProto(options) {
    options = options || {};
    const executions = normalizeProtoExecutionRefs(options);
    if (!executions.length) throw new Error('proto.subscribe requires workflowId or executions');

    let timer = null;
    let closed = false;
    let inflight = false;
    let errorCount = 0;
    const id = `proto_sub_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const pollMs = Math.max(250, Number(options.pollMs || 1000));
    const maxErrors = Math.max(1, Number(options.maxErrors || 3));
    const state = {
      status: 'RUNNING',
      executions,
      summaries: {},
      nodeData: {},
      errors: [],
      updatedAt: null
    };

    const emit = function (type, data, context) {
      if (typeof options.onEvent === 'function') options.onEvent({ type, state, data, context });
    };

    const updateStatus = function () {
      const next = aggregateProtoStatus(state);
      if (state.status !== next) {
        state.status = next;
        if (typeof options.onStatus === 'function') options.onStatus(next, state);
        emit('status', next);
      }
    };

    const close = function () {
      closed = true;
      if (timer) clearTimeout(timer);
      timer = null;
    };

    const schedule = function () {
      if (closed) return;
      if (options.stopOnTerminal !== false && isProtoTerminalStatus(state.status)) {
        close();
        if (typeof options.onDone === 'function') options.onDone(state);
        emit('done', state);
        return;
      }
      timer = setTimeout(function () { refresh(); }, pollMs);
    };

    async function refresh() {
      if (closed || inflight) return;
      inflight = true;
      try {
        for (let index = 0; index < executions.length; index += 1) {
          const execution = executions[index];
          if (!execution.workflowId) continue;
          const key = protoExecutionKey(execution, index);
          const context = { execution, key };
          const summary = await getProtoSummary(execution.workflowId, {
            runRef: options.runRef,
            executionId: execution.executionId
          });
          state.summaries[key] = summary;
          state.updatedAt = new Date().toISOString();
          if (typeof options.onSummary === 'function') options.onSummary(summary, context);
          emit('summary', summary, context);

          const nodes = normalizeProtoNodes(options.nodes, summary, options);
          for (const node of nodes) {
            const page = await getProtoNodeData(execution.workflowId, node.nodeId, {
              runRef: options.runRef,
              executionId: execution.executionId,
              run: node.run,
              branch: node.branch,
              page: node.page,
              pageSize: node.pageSize
            });
            state.nodeData[`${key}:${node.nodeId}`] = page;
            if (typeof options.onNodeData === 'function') {
              options.onNodeData(page, Object.assign({}, context, { node }));
            }
            emit('nodeData', page, context);
          }
        }
        errorCount = 0;
        state.errors = [];
        updateStatus();
        renderProtoStatus(options.target, state);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        errorCount += 1;
        state.errors = state.errors.concat(error);
        state.status = errorCount >= maxErrors ? 'ERROR' : 'RUNNING';
        state.updatedAt = new Date().toISOString();
        if (typeof options.onError === 'function') options.onError(error, state);
        emit('error', error);
        renderProtoStatus(options.target, state);
        if (errorCount >= maxErrors) close();
      } finally {
        inflight = false;
        schedule();
      }
    }

    const subscription = {
      id,
      refresh,
      close,
      get closed() {
        return closed;
      },
      get state() {
        return state;
      }
    };

    renderProtoStatus(options.target, state);
    if (options.immediate !== false) refresh();
    return subscription;
  }

  function followProto(triggerResult, options) {
    options = options || {};
    const executions = extractProtoExecutions(triggerResult);
    if (!executions.length) {
      renderProtoStatus(options.target, {
        status: 'NO_MATCH',
        executions: [],
        summaries: {},
        nodeData: {},
        errors: [],
        updatedAt: new Date().toISOString()
      });
      return null;
    }
    return subscribeToProto(Object.assign({}, options, { executions }));
  }

  async function executeProtoTrigger(actionTag, actionData, options) {
    const result = await executeTrigger(actionTag, actionData, options);
    if (options && typeof options.onTriggerResult === 'function') options.onTriggerResult(result);
    const subscription = options && options.subscribe === false ? null : followProto(result, options || {});
    return { result, subscription };
  }

  const proto = {
    getSummary: getProtoSummary,
    getNodeData: getProtoNodeData,
    listExecutions: listProtoExecutions,
    retryExecution: retryProtoExecution,
    subscribe: subscribeToProto,
    follow: followProto,
    executeTrigger: executeProtoTrigger,
    runTrigger: executeProtoTrigger,
    renderStatus: renderProtoStatus,
    isTerminalStatus: isProtoTerminalStatus
  };

  function fileExtension(fileName) {
    const name = String(fileName || '');
    const idx = name.lastIndexOf('.');
    return idx > -1 && idx < name.length - 1 ? name.slice(idx + 1).toLowerCase() : undefined;
  }

  function attachmentFromUpload(file, path, options) {
    const opts = options || {};
    const title = opts.title || file.name || 'upload';
    const type = opts.type || file.type || 'application/octet-stream';
    return {
      path: path,
      url: path,
      title: title,
      type: type,
      tags: Array.isArray(opts.tags) ? opts.tags : [],
      isProtected: opts.isProtected !== false,
      fileSize: typeof file.size === 'number' ? file.size : undefined,
      extension: fileExtension(title)
    };
  }

  const FILE_URL_TTL_MS = 55 * 60 * 1000;
  const _fileUrlCache = new Map();
  const _fileUrlInflight = new Map();

  function isAbsoluteFileUrl(value) {
    return /^(https?:|blob:|data:)/i.test(String(value || ''));
  }

  function attachmentPayload(input) {
    if (input && typeof input === 'object' && input.attachment && typeof input.attachment === 'object') {
      return input.attachment;
    }
    return input;
  }

  function attachmentPath(input) {
    const item = attachmentPayload(input);
    if (typeof item === 'string') return item.trim();
    if (!item || typeof item !== 'object') return '';
    return String(item.path || item.relativePath || item.url || '').trim();
  }

  function isProtectedAttachment(input) {
    const item = attachmentPayload(input);
    if (item && typeof item === 'object' && item.isProtected === false) return false;
    return true;
  }

  /** Resolve a protected attachment path into a temporary browser-usable URL. */
  async function getFileUrl(fileOrAttachment, options) {
    const opts = options || {};
    const path = attachmentPath(fileOrAttachment);
    if (!path) return '';
    if (isAbsoluteFileUrl(path)) return path;
    if (!isProtectedAttachment(fileOrAttachment) && !opts.forceProtected) return path;
    assertConfig();

    const appId = opts.appId || APP_ID;
    const cacheKey = `${appId || ''}:${path}`;
    const ttlMs = typeof opts.ttlMs === 'number' ? opts.ttlMs : FILE_URL_TTL_MS;
    if (!opts.refresh && ttlMs > 0) {
      const cached = _fileUrlCache.get(cacheKey);
      if (cached && cached.expiresAt > Date.now()) return cached.url;
      const inflight = _fileUrlInflight.get(cacheKey);
      if (inflight) return inflight;
    }

    const params = new URLSearchParams({ file: path });
    if (appId) params.append('appId', appId);
    const promise = fetch(`${BASE_URL}/v1/attachment/file-download?${params.toString()}`, {
      method: 'GET',
      headers: authHeaders(),
      credentials: 'include',
      cache: 'no-store'
    })
      .then(function (res) { return ensureOkResponse(res, 'Attachment URL'); })
      .then(function (res) { return res.text(); })
      .then(function (url) {
        const resolved = String(url || '').trim();
        if (ttlMs > 0) _fileUrlCache.set(cacheKey, { url: resolved, expiresAt: Date.now() + ttlMs });
        return resolved;
      })
      .finally(function () { _fileUrlInflight.delete(cacheKey); });

    if (!opts.refresh && ttlMs > 0) _fileUrlInflight.set(cacheKey, promise);
    return promise;
  }

  /** Upload a file through the attachment service and return its attachment URL/path. */
  async function uploadAttachment(file, options) {
    assertConfig();
    if (!file) throw new Error('uploadAttachment requires a File or Blob');
    if (typeof FormData === 'undefined') throw new Error('FormData is not available in this browser');
    const opts = options || {};
    const appId = opts.appId || APP_ID;
    const entity = opts.entity || opts.fileEntity || 'APP_BUILDER_ATTACHMENT_RECORD';
    const fileName = opts.fileName || file.name || 'upload';
    const fileSizeBytes = typeof file.size === 'number' ? file.size : 0;

    const presignParams = new URLSearchParams();
    if (appId) presignParams.append('appId', appId);
    presignParams.append('fileName', fileName);
    presignParams.append('fileSizeBytes', String(fileSizeBytes));

    const presignBody = new FormData();
    presignBody.append('file-entity', entity);
    if (opts.referenceId) presignBody.append('referenceId', opts.referenceId);

    const presign = await readJsonResponse(await fetch(
      `${BASE_URL}/v1/attachment/file-upload/presign?${presignParams.toString()}`,
      {
        method: 'POST',
        headers: authHeaders(),
        body: presignBody,
        credentials: 'include',
        cache: 'no-store'
      }
    ), 'Attachment presign');

    if (presign.expiresAtEpochMillis && Date.now() >= presign.expiresAtEpochMillis) {
      throw new Error('Upload URL has expired. Please retry.');
    }
    if (presign.maxSinglePutBytes && fileSizeBytes > presign.maxSinglePutBytes) {
      throw new Error('File size exceeds maximum allowed upload size.');
    }

    await ensureOkResponse(await fetch(presign.uploadUrl, {
      method: presign.method || 'PUT',
      body: file,
      headers: { 'Content-Type': presign.contentType || file.type || 'application/octet-stream' },
      cache: 'no-store'
    }), 'Attachment upload');

    const verifyParams = new URLSearchParams();
    if (appId) verifyParams.append('appId', appId);

    const verifyBody = new FormData();
    verifyBody.append('file', presign.relativePath);
    verifyBody.append('file-entity', entity);
    if (opts.referenceId) verifyBody.append('referenceId', opts.referenceId);

    const verify = await readJsonResponse(await fetch(
      `${BASE_URL}/v1/attachment/file-upload/verify${verifyParams.toString() ? '?' + verifyParams.toString() : ''}`,
      {
        method: 'POST',
        headers: authHeaders(),
        body: verifyBody,
        credentials: 'include',
        cache: 'no-store'
      }
    ), 'Attachment verify');

    if (!verify.success) {
      throw new Error(`Upload verification failed: ${verify.message || verify.status || 'unknown error'}`);
    }

    const url = verify.relativePath || presign.relativePath || verify.path || verify.url;
    const attachment = attachmentFromUpload(file, url, opts);
    const resolvedUrl = opts.resolveUrl ? await getFileUrl(attachment, { appId: appId }) : undefined;
    markRuntimeDataDirty();
    return {
      url: url,
      path: url,
      relativePath: url,
      viewUrl: resolvedUrl,
      downloadUrl: resolvedUrl,
      title: attachment.title,
      type: attachment.type,
      fileSize: fileSizeBytes,
      extension: attachment.extension,
      attachment: attachment
    };
  }

  function encodeAttachments(attachments) {
    const list = Array.isArray(attachments) ? attachments : [attachments];
    return JSON.stringify(list.filter(Boolean).map(function (item) {
      return item.attachment || item;
    }));
  }

  /** Execute SQL query, returns { rows, fields, rowCount } */
  async function runSQL(query) {
    const json = await api('POST', '/v1/agent/app/sql/execute', {
      appId: APP_ID, sqlQuery: query, limit: 1000
    });
    if (!json.success) throw new Error(json.message || 'SQL query failed');
    return json.data;
  }

  /** Get all tables with columnsMetaData */
  async function getTables() {
    const res = await api('GET', `/v1/app-builder/table?appId=${APP_ID}`);
    return res.data;
  }

  /** Get single table metadata */
  async function getTable(tableId) {
    return api('GET', `/v1/app-builder/table/${tableId}`);
  }

  /** Get cheap table version hints for cache/SWR revalidation. */
  async function getTableVersions(tableIds, options) {
    options = options || {};
    var ids = uniqueStrings(tableIds);
    if (!ids.length) return { tableIds: [], versions: [] };
    return api('POST', `/v1/agent/app/custom-pages/table-versions`, {
      appId: APP_ID,
      tableIds: ids,
      tags: options.tags || undefined
    }).then(function (result) {
      return (result && (result.response || result.data)) || result;
    });
  }

  var FILTER_OPERATOR_ALIASES = {
    equal: 'eq', equals: 'eq', is: 'eq', '=': 'eq', '==': 'eq',
    not_equal: 'neq', not_equals: 'neq', is_not: 'neq', isnt: 'neq', 'is not': 'neq', '!=': 'neq', '<>': 'neq',
    contains: 'c', not_contains: 'nc', 'not contains': 'nc',
    starts_with: 'sw', 'starts with': 'sw', ends_with: 'ew', 'ends with': 'ew',
    greater_than: 'gt', 'greater than': 'gt', '>': 'gt',
    less_than: 'lt', 'less than': 'lt', '<': 'lt',
    greater_than_equal: 'gte', greater_than_or_equal: 'gte', 'greater than equal': 'gte', 'greater than or equal': 'gte', '>=': 'gte',
    less_than_equal: 'lte', less_than_or_equal: 'lte', 'less than equal': 'lte', 'less than or equal': 'lte', '<=': 'lte',
    is_empty: 'emp', 'is empty': 'emp', empty: 'emp',
    is_not_empty: 'nemp', 'is not empty': 'nemp', not_empty: 'nemp',
    not_in: 'nin', 'not in': 'nin'
  };

  function normalizeSummaryFilterCondition(condition) {
    if (!condition || typeof condition !== 'object' || Array.isArray(condition)) return [];
    var colId = condition.colId || condition.id || condition.columnId || condition.fieldId || condition.field;
    if (!colId) return [];
    var operatorKey = String(condition.opr || condition.operator || condition.operation || 'eq').trim().toLowerCase();
    var normalized = Object.assign({}, condition, {
      colId: String(colId),
      opr: FILTER_OPERATOR_ALIASES[operatorKey] || operatorKey,
      isDynamicValue: Boolean(condition.isDynamicValue),
      isExternal: Boolean(condition.isExternal)
    });
    delete normalized.id;
    delete normalized.columnId;
    delete normalized.fieldId;
    delete normalized.field;
    delete normalized.operator;
    delete normalized.operation;
    if (normalized.opr === 'between' && Array.isArray(normalized.value) && normalized.value.length >= 2) {
      return [
        Object.assign({}, normalized, { opr: 'gte', value: normalized.value[0] }),
        Object.assign({}, normalized, { opr: 'lte', value: normalized.value[1] })
      ];
    }
    return [normalized];
  }

  function normalizeSummaryFilter(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) return {};
    var source = input.filterCriteria && typeof input.filterCriteria === 'object'
      ? input.filterCriteria
      : input.filter && typeof input.filter === 'object'
        ? input.filter
        : input;
    var rawConditions = Array.isArray(source.conditions)
      ? source.conditions
      : Array.isArray(source.rules)
        ? source.rules
        : [];
    var rawGroups = Array.isArray(source.filterGroups)
      ? source.filterGroups
      : Array.isArray(source.groups)
        ? source.groups
        : [];
    var conditions = [];
    rawConditions.forEach(function (condition) {
      conditions = conditions.concat(normalizeSummaryFilterCondition(condition));
    });
    var filterGroups = rawGroups
      .map(normalizeSummaryFilter)
      .filter(function (group) { return Object.keys(group).length > 0; });
    var result = {};
    if (conditions.length) result.conditions = conditions;
    if (filterGroups.length) result.filterGroups = filterGroups;
    if (Array.isArray(source.ids)) result.ids = source.ids.map(String);
    if (source.favorite === true) result.favorite = true;
    if (conditions.length || filterGroups.length || source.logicalOperator || source.condition) {
      result.logicalOperator = String(source.logicalOperator || source.condition).toLowerCase() === 'or' ? 'or' : 'and';
    }
    return result;
  }

  function hasSummaryFilter(filter) {
    return !!(filter && (
      (Array.isArray(filter.conditions) && filter.conditions.length) ||
      (Array.isArray(filter.filterGroups) && filter.filterGroups.length) ||
      (Array.isArray(filter.ids) && filter.ids.length) ||
      filter.favorite === true
    ));
  }

  function rejectSummaryIds(filter, functionName) {
    if (!filter || typeof filter !== 'object') return;
    if (Array.isArray(filter.ids) && filter.ids.length) {
      throw new Error(functionName + ' does not support ids filters; use getRecords instead.');
    }
    (filter.filterGroups || []).forEach(function (group) { rejectSummaryIds(group, functionName); });
  }

  function hasPagedRecordFilter(filter) {
    if (!filter || typeof filter !== 'object') return false;
    if (filter.q) return true;
    var source = filter.filterCriteria && typeof filter.filterCriteria === 'object'
      ? filter.filterCriteria
      : filter.filter && typeof filter.filter === 'object'
        ? filter.filter
        : filter;
    return !!(
      (Array.isArray(source.conditions) && source.conditions.length) ||
      (Array.isArray(source.rules) && source.rules.length) ||
      (Array.isArray(source.filterGroups) && source.filterGroups.length) ||
      (Array.isArray(source.groups) && source.groups.length) ||
      (Array.isArray(source.ids) && source.ids.length) ||
      source.favorite === true
    );
  }

  /** Fetch paginated records. filter = { filterCriteria?, q? } */
  async function getRecords(tableId, pageNo, pageSize, filter) {
    if (pageNo === undefined) pageNo = 1;
    if (pageSize === undefined) pageSize = 50;
    let url = `/v1/app-builder/table/${tableId}/paged-record?appId=${APP_ID}&pageNo=${pageNo}&pageSize=${pageSize}`;
    if (filter && filter.q) url += `&q=${encodeURIComponent(filter.q)}`;
    return api('POST', url, filter && filter.filterCriteria ? { filterCriteria: filter.filterCriteria } : {});
  }

  /** Aggregate records server-side. Use erpai.query() around this call for persistent SWR caching. */
  async function aggregateRecords(tableId, options) {
    options = options || {};
    if (!Array.isArray(options.aggregations) || !options.aggregations.length) {
      throw new Error('aggregateRecords requires at least one aggregation.');
    }
    var body = { aggregations: options.aggregations };
    if (Array.isArray(options.groupBy) && options.groupBy.length) body.groupBy = options.groupBy;
    var filter = normalizeSummaryFilter(options.filter !== undefined ? options.filter : options.filterCriteria);
    rejectSummaryIds(filter, 'aggregateRecords');
    if (hasSummaryFilter(filter)) body.filter = filter;
    return api('POST', '/v1/app-builder/table/' + encodeURIComponent(tableId) + '/record/aggregate?appId=' + encodeURIComponent(APP_ID), body);
  }

  /** Count filtered records server-side. Use erpai.query() around this call for persistent SWR caching. */
  async function countRecords(tableId, filterInput) {
    var filter = normalizeSummaryFilter(filterInput);
    rejectSummaryIds(filter, 'countRecords');
    var body = hasSummaryFilter(filter) ? { filter: filter } : {};
    return api('POST', '/v1/app-builder/table/' + encodeURIComponent(tableId) + '/record/count?appId=' + encodeURIComponent(APP_ID), body);
  }

  /** Create a record. cells = { columnId: value } */
  async function createRecord(tableId, cells) {
    return api('POST', `/v1/app-builder/table/${tableId}/record?appId=${APP_ID}`, { cells });
  }

  /** Update a record. cells = { columnId: newValue } */
  async function updateRecord(tableId, recordId, cells) {
    return api('PUT', `/v1/app-builder/table/${tableId}/record/${recordId}?appId=${APP_ID}`, { cells });
  }

  /** Delete a record */
  async function deleteRecord(tableId, recordId) {
    return api('DELETE', `/v1/app-builder/table/${tableId}/record/${recordId}?appId=${APP_ID}`);
  }

  /** Get a single record by ID (fetchAllRef expands reference display values) */
  async function getRecordById(tableId, recordId) {
    var res = await api('GET', `/v1/app-builder/table/${tableId}/record/${recordId}?appId=${APP_ID}&fetchAllRef=true`);
    return Array.isArray(res) ? res[0] : res;
  }

  /** Get SQL schema (view names + columns) */
  async function getSQLSchema() {
    return api('GET', `/v1/agent/app/sql/tables?appId=${APP_ID}`);
  }

  // ===== NAVIGATION =====

  function trimTrailingSlash(path) {
    return String(path || '').replace(/\/+$/, '');
  }

  function isAbsoluteUrl(path) {
    return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(String(path || ''));
  }

  function joinRoute(base, path) {
    var b = trimTrailingSlash(base);
    var p = String(path || '').trim();
    if (!p) return b || '/';
    if (isAbsoluteUrl(p)) return p;
    if (b && (p === b || p.indexOf(b + '/') === 0 || p.indexOf(b + '?') === 0 || p.indexOf(b + '#') === 0)) return p;
    if (p[0] === '?' || p[0] === '#') return b + p;
    return b + '/' + p.replace(/^\/+/, '');
  }

  /** Build an ERPAI app route URL */
  function erpaiUrl(path) {
    if (APP_ROUTE_BASE) return joinRoute(APP_ROUTE_BASE, path);
    return `/-/${ORG_NAME}/${APP_NAME}/${APP_ID}${path}`;
  }

  /** Navigate the parent frame to an ERPAI route */
  function navigateTo(path) {
    var target = erpaiUrl(path);
    if (window.parent && window.parent !== window) {
      window.parent.location.href = target;
    } else {
      window.location.href = target;
    }
  }

  // ===== FORMATTERS =====

  /** XSS-safe text escaping */
  function esc(s) {
    if (!s) return '';
    const d = document.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  }

  /** Format currency using the host app's configured ISO-4217 code. */
  function fmt$(n) {
    var value = Number(n || 0);
    var currency = APP_CURRENCY || 'USD';
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    } catch (_) {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
  }

  /** Format percentage: 42% */
  function fmtPct(n) {
    return parseFloat(n || 0).toFixed(0) + '%';
  }

  /** Format number with optional decimals */
  function fmtNum(n, decimals) {
    if (decimals === undefined) decimals = 0;
    return Number(n || 0).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  /**
   * Compact number abbreviation: 12345 → "12.3K", 1.5e6 → "1.5M", -2.4e9 → "-2.4B".
   * Useful in Chart.js Y-axis tick callbacks and inline KPI values where full
   * digits ("1,234,567") would crowd the layout. Handles null/NaN, negatives,
   * and ranges from K up through T. Falls back to localized number under 1K.
   */
  function compactNumber(n) {
    if (n == null || isNaN(n)) return '';
    var abs = Math.abs(n);
    var sign = n < 0 ? '-' : '';
    if (abs >= 1e12) return sign + (abs / 1e12).toFixed(1).replace(/\.0$/, '') + 'T';
    if (abs >= 1e9)  return sign + (abs / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    if (abs >= 1e6)  return sign + (abs / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    if (abs >= 1e3)  return sign + (abs / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    return sign + abs.toLocaleString();
  }

  /** Format date: Jan 15, 2026 */
  function fmtDate(d, opts) {
    if (!d) return '—';
    const dt = d instanceof Date ? d : new Date(d);
    if (isNaN(dt.getTime())) return '—';
    return dt.toLocaleDateString('en-US', opts || { month: 'short', day: 'numeric', year: 'numeric' });
  }

  /** Format a cell value based on column type */
  function formatCell(value, type, column) {
    if (value == null || value === '') return '<span style="color:var(--text-muted);">—</span>';

    switch (type) {
      case 'number':
        return typeof value === 'number' ? fmtNum(value) : String(value);
      case 'currency':
        return fmt$(value);
      case 'date':
        return fmtDate(value);
      case 'checkbox':
        return Array.isArray(value) && value[0] === 1 ? '&#10003;' : '&#10007;';
      case 'rating':
        return '&#9733;'.repeat(Number(value) || 0);
      case 'select': {
        if (Array.isArray(value) && column && column.options) {
          const opt = column.options.find(function (o) { return o.id === value[0]; });
          return '<span class="badge badge-accent">' + esc(opt ? opt.name : String(value[0])) + '</span>';
        }
        return '<span class="badge badge-accent">' + esc(String(value)) + '</span>';
      }
      case 'multi_select': {
        if (Array.isArray(value) && column && column.options) {
          return value.map(function (v) {
            var opt = column.options.find(function (o) { return o.id === v; });
            return '<span class="badge badge-green" style="margin-right:4px;">' + esc(opt ? opt.name : String(v)) + '</span>';
          }).join('');
        }
        return Array.isArray(value) ? value.map(function (v) { return '<span class="badge badge-green" style="margin-right:4px;">' + esc(String(v)) + '</span>'; }).join('') : esc(String(value));
      }
      case 'ref':
      case 'reference':
        return Array.isArray(value) ? value.length + ' ref(s)' : esc(String(value));
      case 'email':
        return '<a href="mailto:' + esc(value) + '" class="erpai-link">' + esc(value) + '</a>';
      case 'url':
        return '<a href="' + esc(value) + '" target="_blank" class="erpai-link">' + esc(value) + '</a>';
      case 'phone':
        return '<a href="tel:' + esc(value) + '" class="erpai-link">' + esc(value) + '</a>';
      case 'rich_text':
        return value;
      default:
        return esc(String(value));
    }
  }

  // ===== THEME COLORS (for Chart.js) =====

  function getThemeColors() {
    var s = getComputedStyle(document.documentElement);
    return {
      text: s.getPropertyValue('--text').trim(),
      muted: s.getPropertyValue('--text-muted').trim(),
      border: s.getPropertyValue('--border').trim(),
      accent: s.getPropertyValue('--accent').trim(),
      blue: s.getPropertyValue('--blue').trim(),
      green: s.getPropertyValue('--green').trim(),
      amber: s.getPropertyValue('--amber').trim(),
      red: s.getPropertyValue('--red').trim(),
      cyan: s.getPropertyValue('--cyan').trim(),
      purple: s.getPropertyValue('--purple').trim(),
      surface: s.getPropertyValue('--surface').trim(),
      bg: s.getPropertyValue('--bg').trim()
    };
  }

  // ===== UI HELPERS =====

  /**
   * Render a uniform "no permission" placeholder into a container. Use this
   * from a page's catch block (or let the runtime's auto-catching helpers
   * like renderRecordTable do it for you).
   *
   *   erpai.renderPermissionDenied('#myChart', { message: 'No access to Deals' });
   *
   * Accepts a CSS selector or element ID. Renders a muted lock-icon block
   * that fits stat-card, chart-card, and table-wrap containers alike.
   */
  function renderPermissionDenied(target, opts) {
    opts = opts || {};
    var el = typeof target === 'string'
      ? (document.querySelector(target) || document.getElementById(target.replace(/^#/, '')))
      : target;
    if (!el) return;
    var title = opts.title || 'No permission';
    var message = opts.message
      || 'You don\'t have permission to view this data. Ask your admin to grant access.';
    el.innerHTML =
      '<div class="erpai-permission-denied" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:32px 16px;text-align:center;color:hsl(var(--muted-foreground));border:1px dashed hsl(var(--border));border-radius:8px;background:hsl(var(--muted)/0.3);min-height:120px;">' +
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.6"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
        '<div style="font-size:13px;font-weight:600;color:hsl(var(--foreground));">' + esc(title) + '</div>' +
        '<div style="font-size:12px;max-width:320px;line-height:1.45;">' + esc(message) + '</div>' +
      '</div>';
  }

  /**
   * Route an error to the right UX outcome — if it's a permission error,
   * render a "no permission" placeholder into the given container; otherwise
   * rethrow so the caller can log/display as appropriate.
   *
   *   try { await loadSection(); }
   *   catch (err) { erpai.handleError(err, '#myChart', { message: 'No access to Deals' }); }
   */
  function handleError(err, target, opts) {
    if (err && err.isPermissionError) {
      renderPermissionDenied(target, opts);
      return;
    }
    throw err;
  }

  /** Render a stat card into a container */
  function renderStatCard(containerId, opts) {
    var title = opts.title, value = opts.value, sub = opts.sub, change = opts.change, color = opts.color;
    var changeHtml = '';
    if (change !== undefined && change !== null) {
      var cls = change >= 0 ? 'stat-change-up' : 'stat-change-down';
      var arrow = change >= 0 ? '&uarr;' : '&darr;';
      changeHtml = '<div class="stat-change ' + cls + '">' + arrow + ' ' + Math.abs(change).toFixed(1) + '%</div>';
    }
    var subHtml = sub ? '<div class="stat-sub">' + esc(sub) + '</div>' : '';
    var colorStyle = color ? ' style="color:' + color + ';"' : '';
    document.getElementById(containerId).innerHTML =
      '<div class="stat-label">' + esc(title) + '</div>' +
      '<div class="stat-value"' + colorStyle + '>' + value + '</div>' +
      subHtml + changeHtml;
  }

  /** Render pagination controls */
  function renderPagination(containerId, opts) {
    var page = opts.page, total = opts.total, pageSize = opts.pageSize, onChange = opts.onChange;
    var totalPages = Math.ceil(total / pageSize);
    var el = document.getElementById(containerId);
    if (!el) return;
    if (totalPages <= 1) { el.innerHTML = ''; return; }

    var start = (page - 1) * pageSize + 1;
    var end = Math.min(page * pageSize, total);

    el.innerHTML =
      '<div class="pagination">' +
        '<span class="pagination-info">' + start + '–' + end + ' of ' + fmtNum(total) + '</span>' +
        '<div class="pagination-buttons">' +
          '<button class="btn btn-secondary btn-sm" id="' + containerId + '-first"' + (page === 1 ? ' disabled' : '') + '>&laquo;</button>' +
          '<button class="btn btn-secondary btn-sm" id="' + containerId + '-prev"' + (page === 1 ? ' disabled' : '') + '>&lsaquo;</button>' +
          '<span class="text-small" style="padding:4px 8px;">' + page + ' / ' + totalPages + '</span>' +
          '<button class="btn btn-secondary btn-sm" id="' + containerId + '-next"' + (page === totalPages ? ' disabled' : '') + '>&rsaquo;</button>' +
          '<button class="btn btn-secondary btn-sm" id="' + containerId + '-last"' + (page === totalPages ? ' disabled' : '') + '>&raquo;</button>' +
        '</div>' +
      '</div>';

    document.getElementById(containerId + '-first').onclick = function () { onChange(1); };
    document.getElementById(containerId + '-prev').onclick = function () { onChange(page - 1); };
    document.getElementById(containerId + '-next').onclick = function () { onChange(page + 1); };
    document.getElementById(containerId + '-last').onclick = function () { onChange(totalPages); };
  }

  /** Create debounced search helper */
  function createSearch(inputEl, callback, delay) {
    if (delay === undefined) delay = 300;
    var timeout;
    inputEl.addEventListener('input', function () {
      clearTimeout(timeout);
      var val = inputEl.value;
      timeout = setTimeout(function () { callback(val); }, delay);
    });
  }

  /**
   * createDropdown — custom styled dropdown replacing native <select>
   * @param {HTMLElement|string} container - Element or selector to mount into
   * @param {Object} opts
   * @param {Array<{value:string, label:string}>} opts.options - choices
   * @param {string} [opts.value] - initial selected value
   * @param {string} [opts.placeholder] - placeholder text (default "Select…")
   * @param {boolean} [opts.searchable] - show search input (default: auto if >6 options)
   * @param {function(string, string)} [opts.onChange] - callback(value, label)
   * @returns {{ getValue, setValue, setOptions, destroy }}
   */
  function dedupeOptions(arr) {
    if (!Array.isArray(arr)) return [];
    var seen = Object.create(null);
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      var o = arr[i];
      if (!o) continue;
      var key = String(o.value);
      if (seen[key]) continue;
      seen[key] = 1;
      out.push(o);
    }
    return out;
  }

  function createDropdown(container, opts) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) return null;
    opts = opts || {};
    var options = dedupeOptions(opts.options || []);
    var selectedValue = opts.value !== undefined ? opts.value : '';
    var placeholder = opts.placeholder || 'Select\u2026';
    var searchable = opts.searchable !== undefined ? opts.searchable : options.length > 6;
    var onChange = opts.onChange || function () {};

    // SVG icons
    var chevronSVG = '<svg class="dd-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
    var checkSVG = '<svg class="dd-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';

    // Build DOM
    var root = document.createElement('div');
    root.className = 'erpai-dropdown';

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'erpai-dropdown-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    var menu = document.createElement('div');
    menu.className = 'erpai-dropdown-menu';
    menu.setAttribute('role', 'listbox');

    var searchInput = null;
    if (searchable) {
      searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.className = 'erpai-dropdown-search';
      searchInput.placeholder = 'Search\u2026';
      menu.appendChild(searchInput);
    }

    var listWrap = document.createElement('div');
    listWrap.className = 'erpai-dropdown-list';
    menu.appendChild(listWrap);

    root.appendChild(trigger);
    root.appendChild(menu);
    container.innerHTML = '';
    container.appendChild(root);

    function getLabelForValue(val) {
      for (var i = 0; i < options.length; i++) {
        if (String(options[i].value) === String(val)) return options[i].label;
      }
      return '';
    }

    function renderTrigger() {
      var label = selectedValue !== '' ? getLabelForValue(selectedValue) : placeholder;
      trigger.innerHTML = '<span class="dd-label">' + esc(label || placeholder) + '</span>' + chevronSVG;
    }

    function renderItems(filter) {
      filter = (filter || '').toLowerCase();
      var html = '';
      var count = 0;
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        if (filter && opt.label.toLowerCase().indexOf(filter) === -1) continue;
        var sel = String(opt.value) === String(selectedValue) ? ' selected' : '';
        html += '<div class="erpai-dropdown-item' + sel + '" role="option" data-value="' + esc(String(opt.value)) + '">' + checkSVG + '<span>' + esc(opt.label) + '</span></div>';
        count++;
      }
      if (!count) html = '<div class="erpai-dropdown-empty">No results</div>';
      listWrap.innerHTML = html;
    }

    function open() {
      root.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      renderItems();
      if (searchInput) { searchInput.value = ''; searchInput.focus(); }
    }

    function close() {
      root.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    function toggle() {
      root.classList.contains('open') ? close() : open();
    }

    // Events
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      // Close other dropdowns
      document.querySelectorAll('.erpai-dropdown.open').forEach(function (d) {
        if (d !== root) d.classList.remove('open');
      });
      toggle();
    });

    listWrap.addEventListener('click', function (e) {
      var item = e.target.closest('.erpai-dropdown-item');
      if (!item) return;
      selectedValue = item.getAttribute('data-value');
      renderTrigger();
      close();
      onChange(selectedValue, getLabelForValue(selectedValue));
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        renderItems(searchInput.value);
      });
      searchInput.addEventListener('click', function (e) { e.stopPropagation(); });
    }

    // Keyboard nav
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); open(); }
      if (e.key === 'Escape') close();
    });
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); trigger.focus(); }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) close();
    });

    // Initial render
    renderTrigger();

    return {
      getValue: function () { return selectedValue; },
      setValue: function (val) { selectedValue = val; renderTrigger(); },
      setOptions: function (newOpts, keepValue) {
        options = dedupeOptions(newOpts || []);
        searchable = opts.searchable !== undefined ? opts.searchable : options.length > 6;
        if (!keepValue) { selectedValue = ''; }
        if (searchable && !searchInput) {
          searchInput = document.createElement('input');
          searchInput.type = 'text';
          searchInput.className = 'erpai-dropdown-search';
          searchInput.placeholder = 'Search\u2026';
          menu.insertBefore(searchInput, listWrap);
          searchInput.addEventListener('input', function () { renderItems(searchInput.value); });
          searchInput.addEventListener('click', function (e) { e.stopPropagation(); });
        }
        renderTrigger();
      },
      destroy: function () { container.innerHTML = ''; }
    };
  }

  /** Show loading state in #app */
  function showLoading(msg) {
    var el = document.getElementById('app');
    if (!el) return;
    el.innerHTML =
      '<div class="loading-container">' +
        '<div class="loading-text">' +
          '<div class="loading-title">' + esc(msg || 'Loading...') + '</div>' +
        '</div>' +
      '</div>';
  }

  /** Show error state in #app */
  function showError(msg) {
    var el = document.getElementById('app');
    if (!el) return;
    el.innerHTML =
      '<div class="error-container">' +
        '<h3>Error</h3>' +
        '<p>' + esc(msg) + '</p>' +
      '</div>';
  }

  /** Hide loading (clear #loading element if exists) */
  function hideLoading() {
    var el = document.getElementById('loading');
    if (el) el.style.display = 'none';
  }

  // ===== CHART HELPERS (require Chart.js loaded) =====

  var chart = {};

  function chartDefaults() {
    var tc = getThemeColors();
    return {
      scales: {
        x: { ticks: { color: tc.muted, font: { size: 11 } }, grid: { color: tc.border } },
        y: { ticks: { color: tc.muted, font: { size: 11 } }, grid: { color: tc.border } }
      },
      plugins: {
        legend: { labels: { color: tc.text, usePointStyle: true, boxWidth: 8, padding: 12, font: { size: 11 } } }
      }
    };
  }

  /** Bar chart. data = { labels, values, label?, colors? } */
  chart.bar = function (canvasId, data, extraOpts) {
    var tc = getThemeColors();
    var defs = chartDefaults();
    return new Chart(document.getElementById(canvasId), {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.label || '',
          data: data.values,
          backgroundColor: data.colors || tc.accent,
          borderRadius: 6
        }]
      },
      options: Object.assign({ responsive: true }, defs, extraOpts || {})
    });
  };

  /** Line chart. data = { labels, values, label?, color? } */
  chart.line = function (canvasId, data, extraOpts) {
    var tc = getThemeColors();
    var defs = chartDefaults();
    var color = data.color || tc.accent;
    return new Chart(document.getElementById(canvasId), {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.label || '',
          data: data.values,
          borderColor: color,
          backgroundColor: color + '1A',
          fill: true,
          tension: 0.3,
          pointRadius: 4
        }]
      },
      options: Object.assign({ responsive: true }, defs, extraOpts || {})
    });
  };

  /** Pie/doughnut chart. data = { labels, values, colors? }, type = 'pie'|'doughnut' */
  chart.pie = function (canvasId, data, extraOpts) {
    var tc = getThemeColors();
    var defaultColors = [tc.accent, tc.green, tc.amber, tc.red, tc.cyan, tc.purple, '#fb923c', '#f472b6'];
    return new Chart(document.getElementById(canvasId), {
      type: data.type || 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: data.colors || defaultColors.slice(0, data.labels.length),
          borderWidth: 0
        }]
      },
      options: Object.assign({
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { color: tc.text, padding: 12, usePointStyle: true, boxWidth: 8, font: { size: 11 } } }
        }
      }, extraOpts || {})
    });
  };

  chart.doughnut = function (canvasId, data, extraOpts) {
    data.type = 'doughnut';
    return chart.pie(canvasId, data, Object.assign({ cutout: '55%' }, extraOpts || {}));
  };

  // ===== EXPORT CSV =====

  function exportCSV(headers, rows, filename) {
    var csv = [headers].concat(rows).map(function (r) {
      return r.map(function (c) { return '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');
    var blob = new Blob([csv], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename || 'export.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  // ===== NEO AGENT TASKS =====
  // Custom pages can hand off prompt + file work to the ERPAI host frame. The
  // host owns auth, backend calls, progress events, and returned artifacts.

  var _agentTaskStreams = Object.create(null);
  var _agentTaskListenerReady = false;

  function createAgentTaskRequestId(prefix) {
    return String(prefix || 'agent_task') + '_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  }

  function isAgentTaskFileLike(value) {
    return !!value && typeof value === 'object' && (
      typeof value.arrayBuffer === 'function'
      || typeof value.dataBase64 === 'string'
      || typeof value.data === 'string'
      || typeof value.text === 'string'
      || typeof value.text === 'function'
    );
  }

  function agentTaskClone(value) {
    if (value === undefined || typeof value === 'function') return undefined;
    if (isAgentTaskFileLike(value)) return value;
    if (Array.isArray(value)) {
      return value.map(agentTaskClone).filter(function (item) { return item !== undefined; });
    }
    if (value && typeof value === 'object' && typeof value.length === 'number') {
      try {
        return Array.prototype.slice.call(value).map(agentTaskClone).filter(function (item) { return item !== undefined; });
      } catch (err) {}
    }
    if (value && typeof value === 'object') {
      var out = {};
      Object.keys(value).forEach(function (key) {
        var next = agentTaskClone(value[key]);
        if (next !== undefined) out[key] = next;
      });
      return out;
    }
    return value;
  }

  function mergeAgentTaskContext(base, extra) {
    var out = Object.assign({}, base || {});
    if (!extra || typeof extra !== 'object') return out;
    Object.keys(extra).forEach(function (key) {
      var next = extra[key];
      var prev = out[key];
      if (next && typeof next === 'object' && !Array.isArray(next)
        && prev && typeof prev === 'object' && !Array.isArray(prev)) {
        out[key] = Object.assign({}, prev, next);
      } else {
        out[key] = next;
      }
    });
    return out;
  }

  function getDefaultAgentContext(overrides) {
    var resolvedLocale = (navigator.languages && navigator.languages[0]) || navigator.language || 'en-US';
    var resolvedTimeZone = null;
    try {
      resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    } catch (err) {}

    var user = cfg.user || cfg.currentUser || null;
    var safeUser = null;
    if (user && typeof user === 'object') {
      safeUser = {
        id: user.id || user.userId || user._id || null,
        name: user.name || user.displayName || null
      };
    }

    return mergeAgentTaskContext({
      source: 'custom-page',
      app: {
        appId: APP_ID || null,
        appName: APP_NAME || null,
        orgName: ORG_NAME || null,
        branchId: BRANCH_ID || null,
        baseUrl: BASE_URL || null
      },
      page: {
        title: document.title || null,
        path: window.location ? window.location.pathname : null,
        url: window.location ? window.location.href : null,
        referrer: document.referrer || null,
        context: cfg.pageContext || cfg.customPageContext || null
      },
      runtime: {
        sdk: 'erpai-pages-runtime',
        theme: THEME || 'system',
        locale: resolvedLocale,
        timeZone: resolvedTimeZone,
        inIframe: isInIframe(),
        supportsRealtime: true
      },
      erpai: cfg.runtimeContext || null,
      user: safeUser
    }, overrides || {});
  }

  function buildAgentTaskPayload(opts) {
    opts = opts || {};
    var payload = {};
    Object.keys(opts).forEach(function (key) {
      if (key === 'onEvent' || key === 'onDone' || key === 'onError' || key === 'onStatus') return;
      if (key === 'includeDefaultContext') return;
      payload[key] = agentTaskClone(opts[key]);
    });

    var defaultContext = opts.includeDefaultContext === false
      ? null
      : getDefaultAgentContext(opts.defaultContext || undefined);
    if (defaultContext) {
      payload.context = mergeAgentTaskContext(defaultContext, opts.context || {});
    } else if (opts.context) {
      payload.context = agentTaskClone(opts.context);
    }
    payload.source = payload.source || 'custom-page';
    return payload;
  }

  function getParentAgentTaskBridge() {
    if (!isInIframe()) return null;
    try {
      var bridge = window.parent.__ERPAI_NEO_AGENT_TASKS__ || window.parent.__NEO_AGENT_TASKS__;
      if (bridge && typeof bridge.start === 'function') return bridge;
    } catch (err) {}
    return null;
  }

  function getAgentTaskEndpoint() {
    var configured = cfg.neoAgentTasksUrl
      || cfg.agentTasksUrl
      || (cfg.neoAgent && (cfg.neoAgent.tasksUrl || cfg.neoAgent.baseUrl))
      || null;
    if (!configured) return null;
    return new URL(configured, BASE_URL || window.location.origin).toString();
  }

  function normalizeAgentTaskHandlers(opts) {
    opts = opts || {};
    return {
      onEvent: typeof opts.onEvent === 'function' ? opts.onEvent : null,
      onDone: typeof opts.onDone === 'function' ? opts.onDone : null,
      onError: typeof opts.onError === 'function' ? opts.onError : null,
      onStatus: typeof opts.onStatus === 'function' ? opts.onStatus : null
    };
  }

  function makeAgentTaskHandle(taskId, requestId, handlers, initial) {
    var id = taskId || (initial && (initial.taskId || initial.id)) || requestId;
    return {
      id: id,
      taskId: id,
      requestId: requestId,
      initial: initial || null,
      cancel: function (reason) {
        return controlAgentTask('cancel', id, { reason: reason || 'cancelled_from_custom_page' });
      },
      approve: function (approval) {
        return controlAgentTask('approve', id, approval || {});
      },
      send: function (type, payload) {
        return controlAgentTask(type, id, payload || {});
      },
      onEvent: handlers.onEvent,
      onDone: handlers.onDone,
      onError: handlers.onError
    };
  }

  function ensureAgentTaskMessageListener() {
    if (_agentTaskListenerReady) return;
    _agentTaskListenerReady = true;
    window.addEventListener('message', function (event) {
      var msg = event.data || {};
      if (!msg || typeof msg !== 'object') return;
      if (isInIframe() && event.source !== window.parent) return;
      var type = msg.type || '';
      if (String(type).indexOf('ERPAI_NEO_AGENT_TASK_') !== 0 && String(type).indexOf('NEO_AGENT_TASK_') !== 0) return;
      var key = msg.requestId || msg.taskId || msg.id;
      var stream = key && _agentTaskStreams[key];
      if (!stream && msg.taskId) stream = _agentTaskStreams[msg.taskId];
      if (!stream) return;

      if (type === 'ERPAI_NEO_AGENT_TASK_ACK' || type === 'NEO_AGENT_TASK_ACK') {
        if (stream.ackTimer) clearTimeout(stream.ackTimer);
        var handle = makeAgentTaskHandle(msg.taskId || msg.id || stream.requestId, stream.requestId, stream.handlers, msg.task || msg);
        _agentTaskStreams[handle.taskId] = stream;
        stream.resolve(handle);
        if (stream.handlers.onStatus) stream.handlers.onStatus('started', msg);
        return;
      }

      if (type === 'ERPAI_NEO_AGENT_TASK_EVENT' || type === 'NEO_AGENT_TASK_EVENT') {
        if (stream.handlers.onEvent) stream.handlers.onEvent(msg.event || msg);
        return;
      }

      if (type === 'ERPAI_NEO_AGENT_TASK_DONE' || type === 'NEO_AGENT_TASK_DONE') {
        if (stream.handlers.onDone) stream.handlers.onDone(msg.result || msg);
        delete _agentTaskStreams[stream.requestId];
        if (msg.taskId) delete _agentTaskStreams[msg.taskId];
        return;
      }

      if (type === 'ERPAI_NEO_AGENT_TASK_ERROR' || type === 'NEO_AGENT_TASK_ERROR') {
        var err = new Error(msg.message || msg.error || 'Neo agent task failed');
        if (stream.handlers.onError) stream.handlers.onError(err, msg);
        if (!stream.acknowledged) stream.reject(err);
        delete _agentTaskStreams[stream.requestId];
        if (msg.taskId) delete _agentTaskStreams[msg.taskId];
      }
    });
  }

  function startAgentTaskViaParent(payload, handlers) {
    var directBridge = getParentAgentTaskBridge();
    if (directBridge) {
      return Promise.resolve(directBridge.start(payload, handlers)).then(function (result) {
        var requestId = result && result.requestId ? result.requestId : createAgentTaskRequestId('neo_agent_task');
        return makeAgentTaskHandle(result && (result.taskId || result.id), requestId, handlers, result);
      });
    }

    if (getAgentTaskEndpoint()) return null;
    if (!isInIframe()) return null;

    ensureAgentTaskMessageListener();
    var requestId = createAgentTaskRequestId('neo_agent_task');
    return new Promise(function (resolve, reject) {
      var stream = {
        requestId: requestId,
        handlers: handlers,
        resolve: function (handle) {
          stream.acknowledged = true;
          resolve(handle);
        },
        reject: reject,
        acknowledged: false,
        ackTimer: null
      };
      stream.ackTimer = setTimeout(function () {
        if (stream.acknowledged) return;
        delete _agentTaskStreams[requestId];
        var err = new Error('No Neo agent task bridge responded from the parent frame');
        err.code = 'NO_NEO_AGENT_BRIDGE';
        reject(err);
      }, 1800);
      _agentTaskStreams[requestId] = stream;
      window.parent.postMessage({
        type: 'ERPAI_NEO_AGENT_TASK_START',
        requestId: requestId,
        payload: payload
      }, '*');
    });
  }

  async function startAgentTaskViaHttp(payload, handlers) {
    var endpoint = getAgentTaskEndpoint();
    if (!endpoint) return null;
    assertConfig();
    var headers = {
      'Authorization': 'Bearer ' + TOKEN,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };
    if (BRANCH_ID) headers['X-Branch-Id'] = BRANCH_ID;
    var response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
      cache: 'no-store'
    });
    if (!response.ok) {
      var text = await response.text().catch(function () { return ''; });
      throw new Error('Neo agent task failed to start: ' + response.status + (text ? ' — ' + text.slice(0, 200) : ''));
    }
    var result = await response.json();
    var task = result && (result.response || result.task || result.data || result);
    if (handlers.onDone) handlers.onDone(task);
    return makeAgentTaskHandle(task && (task.taskId || task.id), task && task.requestId, handlers, task);
  }

  async function startAgentTask(opts) {
    var handlers = normalizeAgentTaskHandlers(opts);
    var payload = buildAgentTaskPayload(opts || {});
    var viaParent = startAgentTaskViaParent(payload, handlers);
    if (viaParent) return viaParent;
    var viaHttp = await startAgentTaskViaHttp(payload, handlers);
    if (viaHttp) return viaHttp;
    var err = new Error('No Neo agent task runtime is available for this custom page');
    err.code = 'NO_NEO_AGENT_RUNTIME';
    throw err;
  }

  function controlAgentTask(action, taskId, payload) {
    var directBridge = getParentAgentTaskBridge();
    if (directBridge && typeof directBridge[action] === 'function') {
      return Promise.resolve(directBridge[action](taskId, payload || {}));
    }
    if (isInIframe()) {
      window.parent.postMessage({
        type: 'ERPAI_NEO_AGENT_TASK_CONTROL',
        action: action,
        taskId: taskId,
        payload: payload || {}
      }, '*');
      return Promise.resolve({ sent: true });
    }
    return Promise.reject(new Error('No Neo agent task runtime is available for this custom page'));
  }

  function subscribeAgentTask(taskId, handlers) {
    handlers = normalizeAgentTaskHandlers(handlers || {});
    ensureAgentTaskMessageListener();
    var requestId = createAgentTaskRequestId('neo_agent_task_subscribe');
    _agentTaskStreams[requestId] = {
      requestId: requestId,
      handlers: handlers,
      resolve: function () {},
      reject: function () {},
      acknowledged: true
    };
    _agentTaskStreams[taskId] = _agentTaskStreams[requestId];
    if (isInIframe()) {
      window.parent.postMessage({
        type: 'ERPAI_NEO_AGENT_TASK_SUBSCRIBE',
        requestId: requestId,
        taskId: taskId
      }, '*');
    }
    return function unsubscribe() {
      delete _agentTaskStreams[requestId];
      delete _agentTaskStreams[taskId];
      if (isInIframe()) {
        window.parent.postMessage({
          type: 'ERPAI_NEO_AGENT_TASK_UNSUBSCRIBE',
          requestId: requestId,
          taskId: taskId
        }, '*');
      }
    };
  }

  function isAgentTaskRuntimeAvailable() {
    return !!getParentAgentTaskBridge() || !!getAgentTaskEndpoint() || isInIframe();
  }

  var agentTasks = {
    start: startAgentTask,
    cancel: function (taskId, reason) { return controlAgentTask('cancel', taskId, { reason: reason || 'cancelled_from_custom_page' }); },
    approve: function (taskId, approval) { return controlAgentTask('approve', taskId, approval || {}); },
    send: controlAgentTask,
    subscribe: subscribeAgentTask,
    getDefaultContext: getDefaultAgentContext,
    buildPayload: buildAgentTaskPayload,
    isAvailable: isAgentTaskRuntimeAvailable
  };

  function normalizeExportFormat(format) {
    var value = String(format || 'CSV').toUpperCase();
    if (value === 'EXCEL') value = 'XLSX';
    if (value === 'CSV' || value === 'XLSX' || value === 'PDF') return value;
    throw new Error('Unsupported export format: ' + format);
  }

  function getTimezoneOffsetForExport(timeZone) {
    if (timeZone) {
      var now = new Date();
      var utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
      var tzDate = new Date(now.toLocaleString('en-US', { timeZone: timeZone }));
      return Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
    }
    return new Date().getTimezoneOffset() * -1;
  }

  function exportFileName(baseName, format) {
    var ext = String(format || 'csv').toLowerCase();
    var name = String(baseName || 'export').trim() || 'export';
    if (new RegExp('\\.' + ext + '$', 'i').test(name)) return name;
    return name.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '-').toLowerCase() + '.' + ext;
  }

  async function downloadExport(resultOrUrl, filename) {
    var downloadLink = typeof resultOrUrl === 'string'
      ? resultOrUrl
      : resultOrUrl && (resultOrUrl.download_link || resultOrUrl.downloadLink);
    if (!downloadLink) {
      throw new Error('No download link returned for export');
    }

    try {
      var response = await fetch(downloadLink, { cache: 'no-store' });
      if (!response.ok) throw new Error('Download failed: ' + response.status);
      var blob = await response.blob();
      var blobUrl = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename || downloadLink.split('?')[0].split('/').pop() || 'export';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      var fallback = document.createElement('a');
      fallback.href = downloadLink;
      fallback.download = filename || '';
      fallback.target = '_blank';
      fallback.rel = 'noopener';
      document.body.appendChild(fallback);
      fallback.click();
      document.body.removeChild(fallback);
    }
  }

  function normalizeSqlExportFormat(format) {
    var value = String(format || 'CSV').toUpperCase();
    if (value === 'CSV') return value;
    throw new Error('Unsupported SQL export format: ' + format);
  }

  function sqlExportFileName(baseName, format) {
    var ext = String(format || 'csv').toLowerCase();
    var name = String(baseName || 'sql-export').trim() || 'sql-export';
    name = name.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '-').toLowerCase();
    if (new RegExp('\\.' + ext + '$', 'i').test(name)) return name;
    return name + '.' + ext;
  }

  async function createSqlExportWritable(filename) {
    if (typeof window.showSaveFilePicker !== 'function' || !window.isSecureContext) return null;
    try {
      var handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [{
          description: 'CSV file',
          accept: { 'text/csv': ['.csv'] }
        }]
      });
      var writable = await handle.createWritable();
      return { writable: writable };
    } catch (err) {
      if (err && err.name === 'AbortError') throw new Error('Export cancelled');
      return null;
    }
  }

  function createSqlExportDownloadId() {
    var bytes = new Uint8Array(18);
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      window.crypto.getRandomValues(bytes);
      return Array.from(bytes, function (byte) { return byte.toString(16).padStart(2, '0'); }).join('');
    }
    return (Date.now().toString(16) + Math.random().toString(16).slice(2)).replace(/[^a-f0-9]/gi, '').padEnd(36, '0').slice(0, 36);
  }

  function sqlExportDownloadUrl(downloadId, baseUrl) {
    return new URL('/v1/agent/public/sql/export/' + encodeURIComponent(downloadId) + '/download?wait=1', baseUrl || BASE_URL || window.location.origin).toString();
  }

  function normalizeSqlExportDownloadId(downloadId) {
    if (typeof downloadId !== 'string') return undefined;
    var trimmed = downloadId.trim();
    return /^[a-f0-9]{32,72}$/i.test(trimmed) ? trimmed.toLowerCase() : undefined;
  }

  function openSqlExportDownloadWindow(filename, downloadUrl) {
    try {
      var win = window.open(downloadUrl || '', '_blank');
      if (!win) return null;
      if (downloadUrl) return win;
      try {
        win.document.title = 'Preparing download';
        win.document.body.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        win.document.body.style.margin = '24px';
        win.document.body.textContent = 'Preparing ' + filename + '...';
      } catch (err) {}
      return win;
    } catch (err) {
      return null;
    }
  }

  function closeSqlExportDownloadWindow(win) {
    if (!win || win.closed) return;
    try { win.close(); } catch (err) {}
  }

  async function saveSqlExportResponse(response, filename, sink, downloadWindow) {
    if (sink && sink.writable) {
      if (response.body && typeof response.body.pipeTo === 'function') {
        await response.body.pipeTo(sink.writable);
        closeSqlExportDownloadWindow(downloadWindow);
        return;
      }
      var streamedBlob = await response.blob();
      await sink.writable.write(streamedBlob);
      await sink.writable.close();
      closeSqlExportDownloadWindow(downloadWindow);
      return;
    }

    var blob = await response.blob();
    var url = URL.createObjectURL(blob);
    if (downloadWindow && !downloadWindow.closed) {
      try {
        var doc = downloadWindow.document;
        doc.body.textContent = '';
        var link = doc.createElement('a');
        link.href = url;
        link.download = filename;
        link.textContent = 'Download ' + filename;
        doc.body.appendChild(doc.createTextNode('Your download is ready. '));
        doc.body.appendChild(link);
        link.click();
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 60000);
        return;
      } catch (err) {}
    }
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function readSqlExportDownloadUrl(response) {
    var payload = await response.json().catch(function () { return null; });
    var rawUrl = payload && (
      payload.downloadUrl ||
      payload.download_url ||
      (payload.data && (payload.data.downloadUrl || payload.data.download_url))
    );
    if (typeof rawUrl !== 'string' || !rawUrl.trim()) {
      throw new Error('SQL export did not return a download URL');
    }
    return rawUrl;
  }

  function startSqlExportDownload(downloadWindow, downloadUrl, filename) {
    var absoluteUrl = new URL(downloadUrl, BASE_URL || window.location.origin).toString();
    if (downloadWindow && !downloadWindow.closed) {
      try {
        var doc = downloadWindow.document;
        doc.body.textContent = '';
        var link = doc.createElement('a');
        link.href = absoluteUrl;
        link.download = filename;
        link.target = '_self';
        link.rel = 'noopener';
        link.textContent = 'Download ' + filename;
        doc.body.appendChild(doc.createTextNode('Your download should start automatically. '));
        doc.body.appendChild(doc.createTextNode('If it does not, click this link: '));
        doc.body.appendChild(link);
        link.click();
        setTimeout(function () {
          try { link.click(); } catch (err) {}
        }, 50);
        return;
      } catch (err) {}
    }
    var fallback = document.createElement('a');
    fallback.href = absoluteUrl;
    fallback.download = filename;
    fallback.target = '_blank';
    fallback.rel = 'noopener';
    document.body.appendChild(fallback);
    fallback.click();
    document.body.removeChild(fallback);
  }

  function requestParentSqlExport(opts) {
    if (!window.parent || window.parent === window) return null;
    try {
      if (typeof window.parent.__ERPAI_SQL_EXPORT__ === 'function'
        && window.parent.__ERPAI_SQL_EXPORT__.supportsDownloadUrl === true) {
        return window.parent.__ERPAI_SQL_EXPORT__({
          sqlQuery: opts.sqlQuery,
          params: opts.params,
          format: opts.format,
          filename: opts.filename,
          limit: opts.limit,
          downloadId: opts.downloadId
        });
      }
      if (typeof window.parent.__ERPAI_SQL_EXPORT__ === 'function') return null;
    } catch (directErr) {}
    var requestId = 'sql_export_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    var acknowledged = false;
    return new Promise(function (resolve, reject) {
      var fallbackTimer;
      function cleanup() {
        window.removeEventListener('message', onMessage);
        if (fallbackTimer) clearTimeout(fallbackTimer);
      }
      function onMessage(event) {
        if (event.source !== window.parent) return;
        var msg = event.data || {};
        if (!msg || msg.requestId !== requestId) return;
        if (msg.type === 'ERPAI_SQL_EXPORT_ACK') {
          acknowledged = true;
          if (fallbackTimer) clearTimeout(fallbackTimer);
          return;
        }
        if (msg.type === 'ERPAI_SQL_EXPORT_DONE') {
          cleanup();
          resolve({
            is_async: false,
            isAsync: false,
            format: msg.format || 'CSV',
            filename: msg.filename || opts.filename
          });
          return;
        }
        if (msg.type === 'ERPAI_SQL_EXPORT_ERROR') {
          cleanup();
          reject(new Error(msg.message || 'SQL export failed'));
        }
      }
      window.addEventListener('message', onMessage);
      fallbackTimer = setTimeout(function () {
        if (acknowledged) return;
        cleanup();
        var err = new Error('No parent SQL export bridge');
        err.code = 'NO_PARENT_BRIDGE';
        reject(err);
      }, 1200);
      window.parent.postMessage({
        type: 'ERPAI_SQL_EXPORT',
        requestId: requestId,
        sqlQuery: opts.sqlQuery,
        params: opts.params,
        format: opts.format,
        filename: opts.filename,
        limit: opts.limit,
        downloadId: opts.downloadId
      }, '*');
    });
  }

  /**
   * Server-backed SQL export for arbitrary app-scoped ClickHouse queries.
   * opts = { sqlQuery | sql | query, params?, filename?, format?: 'CSV', limit? }
   * Creates a short-lived server download URL and navigates a helper window to
   * the streamed CSV attachment, so large exports do not load into page memory.
   */
  async function exportSQL(opts) {
    opts = opts || {};
    var sqlQuery = opts.sqlQuery || opts.sql || opts.query;
    if (!sqlQuery || typeof sqlQuery !== 'string') throw new Error('erpai.exportSQL requires opts.sqlQuery');
    var format = normalizeSqlExportFormat(opts.format);
    var filename = sqlExportFileName(opts.filename, format);
    assertConfig();

    var downloadId = createSqlExportDownloadId();
    var pendingDownloadUrl = sqlExportDownloadUrl(downloadId, BASE_URL);
    var downloadWindow = openSqlExportDownloadWindow(filename, pendingDownloadUrl);
    var openedPendingDownload = !!downloadWindow;

    downloadId = normalizeSqlExportDownloadId(downloadId) || createSqlExportDownloadId();
    var headers = {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    };
    if (BRANCH_ID) headers['X-Branch-Id'] = BRANCH_ID;

    var response = await fetch(`${BASE_URL}/v1/agent/app/sql/export`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        appId: APP_ID,
        sqlQuery: sqlQuery,
        params: Array.isArray(opts.params) ? opts.params : [],
        format: format,
        filename: filename,
        limit: typeof opts.limit === 'number' && opts.limit > 0 ? opts.limit : undefined,
        delivery: 'download-url',
        downloadId: downloadId
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      closeSqlExportDownloadWindow(downloadWindow);
      var text = await response.text().catch(function () { return ''; });
      throw new Error('SQL export failed: ' + response.status + (text ? ' — ' + text.slice(0, 200) : ''));
    }

    if ((response.headers.get('content-type') || '').indexOf('application/json') === -1) {
      await saveSqlExportResponse(response, filename, null, downloadWindow);
      return { is_async: false, isAsync: false, format: format, filename: filename };
    }

    var downloadUrl = await readSqlExportDownloadUrl(response);
    if (!openedPendingDownload) {
      startSqlExportDownload(downloadWindow, downloadUrl, filename);
    }
    return { is_async: false, isAsync: false, format: format, filename: filename, downloadUrl: downloadUrl };
  }

  /**
   * Server-backed record export for custom pages.
   * opts = { tableId, format, ids?, filter?, q?, includeExternalTable?, timezoneOffset?, pdfConfig?, filename?, autoDownload? }
   * Returns { is_async, download_link, batch_size, total_record_count, format, tableId }.
   * Large exports are handled asynchronously by the backend; custom pages should
   * show the returned total/batch metadata instead of fetching rows client-side.
   */
  async function exportRecords(opts) {
    opts = opts || {};
    if (!opts.tableId) throw new Error('erpai.exportRecords requires opts.tableId');
    var format = normalizeExportFormat(opts.format);
    var query = '?appId=' + encodeURIComponent(APP_ID) + '&fetchAllRef=true&format=' + encodeURIComponent(format);
    if (opts.q) query += '&q=' + encodeURIComponent(opts.q);
    if (opts.includeExternalTable !== undefined) query += '&includeExternalTable=' + encodeURIComponent(String(!!opts.includeExternalTable));
    var timezoneOffset = opts.timezoneOffset;
    if (timezoneOffset === undefined || timezoneOffset === null) {
      timezoneOffset = getTimezoneOffsetForExport(cfg.timeZone);
    }
    if (timezoneOffset !== undefined && timezoneOffset !== null) query += '&timezoneOffset=' + encodeURIComponent(String(timezoneOffset));

    var body = {};
    if (Array.isArray(opts.ids) && opts.ids.length) body.ids = opts.ids;
    body.filter = opts.filter || { logicalOperator: 'and', conditions: [] };
    if (format === 'PDF' && opts.pdfConfig) body.pdfConfig = opts.pdfConfig;

    var result = await api('POST', '/v1/app-builder/table/' + encodeURIComponent(opts.tableId) + '/export' + query, body);
    result.format = format;
    result.tableId = opts.tableId;
    result.isAsync = !!result.is_async;
    result.downloadLink = result.download_link || '';

    if (opts.autoDownload !== false && result.download_link) {
      await downloadExport(result, exportFileName(opts.filename || opts.tableName, format));
    }
    return result;
  }

  function renderExportButtons(opts) {
    opts = opts || {};
    var container = opts.container || (opts.containerId ? document.getElementById(opts.containerId) : null);
    if (!container && opts.selector) container = document.querySelector(opts.selector);
    if (!container) throw new Error('erpai.renderExportButtons requires containerId, selector, or container');
    if (!opts.tableId) throw new Error('erpai.renderExportButtons requires opts.tableId');

    var formats = (opts.formats && opts.formats.length ? opts.formats : ['CSV', 'XLSX', 'PDF']).map(normalizeExportFormat);
    var status = document.createElement('div');
    status.className = 'erpai-export-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');

    var bar = document.createElement('div');
    bar.className = 'erpai-export-bar';
    formats.forEach(function (format) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'erpai-export-btn';
      button.dataset.exportFormat = format;
      var exportIcon = typeof icon === 'function'
        ? icon('download', { size: 14 })
        : '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5l5-5m-5-7v12"/></svg>';
      button.innerHTML = exportIcon + '<span>' + format + '</span>';
      button.addEventListener('click', async function () {
        var buttons = bar.querySelectorAll('button');
        buttons.forEach(function (b) { b.disabled = true; });
        status.textContent = 'Preparing ' + format + ' export...';
        try {
          var result = await exportRecords(Object.assign({}, opts, { format: format, autoDownload: opts.autoDownload !== false }));
          if (result.download_link) {
            status.textContent = format + ' export downloaded.';
          } else if (result.is_async) {
            status.textContent = 'Large export started. You will receive an email when it is ready.';
          } else {
            status.textContent = format + ' export completed.';
          }
        } catch (err) {
          status.textContent = 'Export failed: ' + (err && err.message ? err.message : String(err));
        } finally {
          buttons.forEach(function (b) { b.disabled = false; });
        }
      });
      bar.appendChild(button);
    });

    container.innerHTML = '';
    container.appendChild(bar);
    container.appendChild(status);
    return { container: container, status: status };
  }

  // ===== TABLE RENDERER =====

  /** Render a full data table from records API response.
   *  opts = { tableId, containerId, columns?, pageSize?, onRowClick? }
   */
  async function renderRecordTable(opts) {
    var tableId = opts.tableId;
    var containerId = opts.containerId;
    var pageSize = opts.pageSize || 25;
    var page = 1;

    // Get metadata. If the user lacks permission on this table, render a
    // uniform placeholder into the container instead of throwing through.
    var tableMeta;
    try {
      tableMeta = await getTable(tableId);
    } catch (err) {
      if (err && err.isPermissionError) {
        renderPermissionDenied('#' + containerId, {
          message: "You don't have permission to view this table.",
        });
        return;
      }
      throw err;
    }
    var allCols = tableMeta.columnsMetaData || [];
    var columns = opts.columns
      ? allCols.filter(function (c) { return opts.columns.includes(c.id) || opts.columns.includes(c.name); })
      : allCols.filter(function (c) { return !c.hidden && !['CTDT','UTDT','CTBY','UTBY','SFID'].includes(c.id); });

    async function render(searchQuery) {
      var res;
      try {
        res = await getRecords(tableId, page, pageSize, searchQuery ? { q: searchQuery } : undefined);
      } catch (err) {
        if (err && err.isPermissionError) {
          renderPermissionDenied('#' + containerId, {
            message: "You don't have permission to view these records.",
          });
          return;
        }
        throw err;
      }
      var container = document.getElementById(containerId);
      if (!container) return;

      var html =
        '<div class="flex-between mb-sm">' +
          '<input class="input" type="text" placeholder="Search..." style="max-width:280px;" id="' + containerId + '-search">' +
          '<span class="text-small">' + fmtNum(res.totalCount) + ' records</span>' +
        '</div>' +
        '<div class="table-wrap"><table class="data-table"><thead><tr>' +
        columns.map(function (c) {
          var cls = ['number', 'currency'].includes(c.type) ? ' class="num"' : '';
          return '<th' + cls + '>' + esc(c.name) + '</th>';
        }).join('') +
        '</tr></thead><tbody>';

      // Default: if no onRowClick provided, auto-open records
      var hasRowClick = typeof opts.onRowClick === 'function';
      var clickable = hasRowClick || opts.onRowClick !== false;

      if (!res.data || res.data.length === 0) {
        html += '<tr><td colspan="' + columns.length + '" style="text-align:center;padding:24px;color:var(--text-muted);">No records found</td></tr>';
      } else {
        res.data.forEach(function (rec) {
          html += '<tr' + (clickable ? ' style="cursor:pointer;" data-id="' + rec._id + '"' : '') + '>';
          columns.forEach(function (c) {
            var cls = ['number', 'currency'].includes(c.type) ? ' class="num"' : '';
            html += '<td' + cls + '>' + formatCell(rec.cells[c.id], c.type, c) + '</td>';
          });
          html += '</tr>';
        });
      }

      html += '</tbody></table></div><div id="' + containerId + '-pag"></div>';
      container.innerHTML = html;

      // Pagination
      renderPagination(containerId + '-pag', {
        page: page, total: res.totalCount, pageSize: pageSize,
        onChange: function (p) { page = p; render(searchQuery); }
      });

      // Search
      var searchInput = document.getElementById(containerId + '-search');
      if (searchInput) {
        createSearch(searchInput, function (val) { page = 1; render(val); });
      }

      // Row click — custom handler or default open-record behavior
      if (clickable) {
        container.querySelectorAll('tr[data-id]').forEach(function (tr) {
          tr.addEventListener('click', function () {
            if (hasRowClick) {
              opts.onRowClick(tr.dataset.id);
            } else {
              openRecord(tableId, tr.dataset.id, { onSave: function () { render(searchQuery); } });
            }
          });
        });
      }
    }

    await render();
  }

  // ===== RECORD MODAL =====

  var SYSTEM_FIELDS = ['CTDT', 'UTDT', 'CTBY', 'UTBY', 'SFID'];
  var READONLY_TYPES = ['formula', 'rollup', 'auto_seq', 'auto_fill', 'lookup'];

  /** Get display-ready columns for a table (filter hidden + system) */
  function getVisibleColumns(tableMeta) {
    return (tableMeta.columnsMetaData || []).filter(function (c) {
      return !c.hidden && SYSTEM_FIELDS.indexOf(c.id) === -1;
    });
  }

  /** Check if a column type is inherently read-only */
  function isReadOnlyType(type) {
    return READONLY_TYPES.indexOf(type) !== -1;
  }

  /** Check if a column type needs a wide (full-row) layout */
  function isWideField(type) {
    return ['long_text', 'rich_text', 'json', 'text'].indexOf(type) !== -1;
  }

  /** Convert a date value to YYYY-MM-DD for input[type=date] */
  function toDateInput(v) {
    if (!v) return '';
    var d = new Date(v);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  }

  /** Build the HTML for a single form field */
  function buildFieldHtml(col, value, readOnly) {
    var type = col.type;
    var colReadOnly = readOnly || isReadOnlyType(type) || col.editable === false;
    var wrapCls = 'record-field' + (isWideField(type) ? ' record-field-wide' : '') + (colReadOnly ? ' record-field-readonly' : '');
    var label = '<div class="record-field-label">' + esc(col.name) + '</div>';
    var fieldId = 'rf-' + col.id;

    // Read-only display
    if (colReadOnly) {
      var display = formatCell(value, type, col);
      return '<div class="' + wrapCls + '">' + label + '<div class="record-field-value">' + display + '</div></div>';
    }

    var inputHtml = '';

    switch (type) {
      case 'text':
      case 'email':
      case 'url':
      case 'phone':
      case 'barcode': {
        var inputType = type === 'email' ? 'email' : type === 'url' ? 'url' : type === 'phone' ? 'tel' : 'text';
        inputHtml = '<input class="input" type="' + inputType + '" id="' + fieldId + '" value="' + esc(value || '') + '" data-col="' + col.id + '" data-type="' + type + '">';
        break;
      }
      case 'long_text': {
        inputHtml = '<textarea class="input" id="' + fieldId + '" data-col="' + col.id + '" data-type="long_text" rows="3">' + esc(value || '') + '</textarea>';
        break;
      }
      case 'number': {
        var numVal = value != null ? value : '';
        inputHtml = '<input class="input" type="number" step="any" id="' + fieldId + '" value="' + numVal + '" data-col="' + col.id + '" data-type="number">';
        break;
      }
      case 'date': {
        inputHtml = '<input class="input" type="date" id="' + fieldId + '" value="' + toDateInput(value) + '" data-col="' + col.id + '" data-type="date">';
        break;
      }
      case 'select': {
        var selVal = Array.isArray(value) ? value[0] : value;
        var options = (col.options || []);
        inputHtml = '<select class="input" id="' + fieldId + '" data-col="' + col.id + '" data-type="select">';
        inputHtml += '<option value="">— Select —</option>';
        options.forEach(function (opt) {
          var selected = opt.id === selVal ? ' selected' : '';
          inputHtml += '<option value="' + opt.id + '"' + selected + '>' + esc(opt.name) + '</option>';
        });
        inputHtml += '</select>';
        break;
      }
      case 'multi_select': {
        var msVal = Array.isArray(value) ? value : [];
        var msOpts = (col.options || []);
        inputHtml = '<div class="multi-select-wrap" id="' + fieldId + '" data-col="' + col.id + '" data-type="multi_select">';
        msOpts.forEach(function (opt) {
          var selCls = msVal.indexOf(opt.id) !== -1 ? ' selected' : '';
          inputHtml += '<span class="multi-select-chip' + selCls + '" data-val="' + opt.id + '">' + esc(opt.name) + '</span>';
        });
        inputHtml += '</div>';
        break;
      }
      case 'checkbox': {
        var checked = Array.isArray(value) && value[0] === 1 ? ' checked' : '';
        inputHtml = '<div class="checkbox-wrap"><input type="checkbox" id="' + fieldId + '" data-col="' + col.id + '" data-type="checkbox"' + checked + '><label for="' + fieldId + '">' + esc(col.name) + '</label></div>';
        break;
      }
      case 'rating': {
        var rating = Number(value) || 0;
        var maxStars = 5;
        inputHtml = '<div class="star-rating" id="' + fieldId + '" data-col="' + col.id + '" data-type="rating" data-value="' + rating + '">';
        for (var i = 1; i <= maxStars; i++) {
          inputHtml += '<span class="star' + (i <= rating ? ' filled' : '') + '" data-star="' + i + '">&#9733;</span>';
        }
        inputHtml += '</div>';
        break;
      }
      case 'user': {
        // User fields — show display name, read-only (can't pick users from custom page)
        var userDisplay = '';
        if (Array.isArray(value)) {
          userDisplay = value.map(function (u) { return typeof u === 'object' ? esc(u.name || u.email || u._id) : esc(String(u)); }).join(', ');
        } else if (value) {
          userDisplay = esc(typeof value === 'object' ? value.name || value.email || '' : String(value));
        }
        return '<div class="' + wrapCls.replace('record-field-readonly', '') + ' record-field-readonly">' + label + '<div class="record-field-value">' + (userDisplay || '<span style="color:var(--text-muted);">—</span>') + '</div></div>';
      }
      case 'ref':
      case 'reference': {
        // References — show display value, read-only for now
        var refDisplay = '';
        if (value && value._display) {
          refDisplay = esc(value._display);
        } else if (Array.isArray(value)) {
          refDisplay = value.length + ' linked record(s)';
        } else if (value) {
          refDisplay = esc(String(value));
        }
        return '<div class="' + wrapCls.replace('record-field-readonly', '') + ' record-field-readonly">' + label + '<div class="record-field-value">' + (refDisplay || '<span style="color:var(--text-muted);">—</span>') + '</div></div>';
      }
      case 'attachment': {
        var files = Array.isArray(value) ? value : [];
        var fileHtml = files.length === 0
          ? '<span style="color:var(--text-muted);">No files</span>'
          : files.map(function (f) { return '<span class="badge badge-default">' + esc(f.name || f.filename || 'file') + '</span>'; }).join(' ');
        return '<div class="' + wrapCls.replace('record-field-readonly', '') + ' record-field-readonly">' + label + '<div class="record-field-value">' + fileHtml + '</div></div>';
      }
      default: {
        inputHtml = '<input class="input" type="text" id="' + fieldId + '" value="' + esc(value != null ? String(value) : '') + '" data-col="' + col.id + '" data-type="' + type + '">';
        break;
      }
    }

    return '<div class="' + wrapCls + '">' + label + inputHtml + '</div>';
  }

  /** Collect changed values from the record modal form */
  function collectFormValues(columns, originalCells) {
    var changes = {};
    columns.forEach(function (col) {
      if (isReadOnlyType(col.type) || col.editable === false) return;
      var type = col.type;
      var fieldId = 'rf-' + col.id;
      var el = document.getElementById(fieldId);
      if (!el) return;

      var newVal;
      switch (type) {
        case 'number': {
          var raw = el.value;
          newVal = raw === '' ? null : parseFloat(raw);
          break;
        }
        case 'date': {
          newVal = el.value ? new Date(el.value + 'T00:00:00.000Z').toISOString() : null;
          break;
        }
        case 'select': {
          var sv = el.value;
          newVal = sv ? [parseInt(sv, 10)] : [];
          break;
        }
        case 'multi_select': {
          newVal = [];
          el.querySelectorAll('.multi-select-chip.selected').forEach(function (chip) {
            newVal.push(parseInt(chip.dataset.val, 10));
          });
          break;
        }
        case 'checkbox': {
          newVal = el.checked ? [1] : [0];
          break;
        }
        case 'rating': {
          newVal = parseInt(el.dataset.value, 10) || 0;
          break;
        }
        default: {
          newVal = el.value || el.textContent || '';
          break;
        }
      }

      // Only include changed values
      var orig = originalCells[col.id];
      if (JSON.stringify(newVal) !== JSON.stringify(orig)) {
        changes[col.id] = newVal;
      }
    });
    return changes;
  }

  /** Bind interactive event handlers inside the record modal */
  function bindModalInteractions(overlay) {
    // Multi-select chip toggling
    overlay.querySelectorAll('.multi-select-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        chip.classList.toggle('selected');
      });
    });

    // Star rating
    overlay.querySelectorAll('.star-rating').forEach(function (ratingEl) {
      ratingEl.querySelectorAll('.star').forEach(function (star) {
        star.addEventListener('click', function () {
          var val = parseInt(star.dataset.star, 10);
          // Toggle: clicking same star clears rating
          var current = parseInt(ratingEl.dataset.value, 10) || 0;
          var newVal = val === current ? 0 : val;
          ratingEl.dataset.value = newVal;
          ratingEl.querySelectorAll('.star').forEach(function (s) {
            s.classList.toggle('filled', parseInt(s.dataset.star, 10) <= newVal);
          });
        });
      });
    });
  }

  // ===== postMessage Bridge =====
  // When running inside erpai-dev iframe, delegate record opening/creating
  // to the parent frame which renders the real AddRecordPopup with full
  // entry form capabilities (formulas, validation, line items, etc.)

  /** Check if we're running inside an iframe (production) vs standalone (local testing) */
  function isInIframe() {
    try { return window.parent !== window; } catch (e) { return false; }
  }

  /** Active postMessage listener — only one at a time */
  var _bridgeHandler = null;
  var _bridgeSeq = 0;

  function createBridgeRequestId() {
    _bridgeSeq += 1;
    return 'record_bridge_' + Date.now() + '_' + _bridgeSeq;
  }

  /** Register a one-time listener for parent frame responses */
  function listenForBridgeResponse(requestId, opts) {
    // Remove previous listener if any
    if (_bridgeHandler) {
      window.removeEventListener('message', _bridgeHandler);
      _bridgeHandler = null;
    }
    _bridgeHandler = function (event) {
      var msg = event.data;
      if (!msg || typeof msg !== 'object') return;
      if (requestId && msg.requestId && msg.requestId !== requestId) return;
      if (msg.type === 'ERPAI_RECORD_SAVED') {
        window.removeEventListener('message', _bridgeHandler);
        _bridgeHandler = null;
        markRuntimeDataDirty();
        if (opts.onSave) opts.onSave(msg.recordId || '', msg.record || msg);
      } else if (msg.type === 'ERPAI_RECORD_CLOSED') {
        window.removeEventListener('message', _bridgeHandler);
        _bridgeHandler = null;
        if (opts.onClose) opts.onClose();
      } else if (msg.type === 'ERPAI_RECORD_SAVE_FAILED') {
        window.removeEventListener('message', _bridgeHandler);
        _bridgeHandler = null;
        if (opts.onError) opts.onError(new Error(msg.message || 'Record save failed'), msg);
      }
    };
    window.addEventListener('message', _bridgeHandler);
  }

  /**
   * Open a record for viewing/editing.
   * In production (iframe): sends postMessage to parent, which renders the real AddRecordPopup.
   * In local testing (standalone): opens a self-contained fallback modal.
   * @param {string} tableId - Table ID
   * @param {string} recordId - Record ID
   * @param {object} [opts] - Options: { readOnly, onSave, onClose }
   */
  function openRecord(tableId, recordId, opts) {
    if (!opts) opts = {};

    if (isInIframe()) {
      var requestId = opts.requestId || createBridgeRequestId();
      // Delegate to parent frame (erpai-dev) for real AddRecordPopup
      window.parent.postMessage({
        type: 'ERPAI_OPEN_RECORD',
        requestId: requestId,
        tableId: tableId,
        recordId: recordId,
        viewOnly: opts.readOnly || false,
        mode: opts.mode || (opts.edit ? 'edit' : undefined)
      }, '*');
      listenForBridgeResponse(requestId, opts);
      return;
    }

    // Fallback: self-contained modal for local testing
    _openRecordFallback(tableId, recordId, opts);
  }

  /**
   * Open a blank create-record form.
   * In production (iframe): sends postMessage to parent for real AddRecordPopup in create mode.
   * In local testing (standalone): not supported (use the ERPAI UI directly).
   * @param {string} tableId - Table ID
   * @param {object} [opts] - Options: { initialData, onSave, onClose }
   */
  function openCreateForm(tableId, opts) {
    if (!opts) opts = {};

    if (isInIframe()) {
      var requestId = opts.requestId || createBridgeRequestId();
      window.parent.postMessage({
        type: 'ERPAI_CREATE_RECORD',
        requestId: requestId,
        tableId: tableId,
        initialData: opts.initialData || {}
      }, '*');
      listenForBridgeResponse(requestId, opts);
      return;
    }

    // Fallback: navigate to the table in ERPAI UI
    navigateTo('/table/' + tableId);
  }

  /** Active import-bridge listener — only one at a time */
  var _importBridgeHandler = null;

  /** Register a one-time listener for parent frame import responses */
  function listenForImportBridgeResponse(requestId, opts) {
    if (_importBridgeHandler) {
      window.removeEventListener('message', _importBridgeHandler);
      _importBridgeHandler = null;
    }
    _importBridgeHandler = function (event) {
      var msg = event.data;
      if (!msg || typeof msg !== 'object') return;
      if (requestId && msg.requestId && msg.requestId !== requestId) return;
      if (msg.type === 'ERPAI_IMPORT_COMPLETE') {
        markRuntimeDataDirty();
        if (opts.onComplete) opts.onComplete(msg.tableId || '', { importLogId: msg.importLogId || '' });
      } else if (msg.type === 'ERPAI_IMPORT_CLOSED') {
        window.removeEventListener('message', _importBridgeHandler);
        _importBridgeHandler = null;
        if (opts.onClose) opts.onClose();
      }
    };
    window.addEventListener('message', _importBridgeHandler);
  }

  /**
   * Open the data import wizard.
   * In production (iframe): sends postMessage to the parent, which renders the real ImportWizard
   * (CSV/Excel upload, column mapping, create-new-table, etc.).
   * In local testing (standalone): navigates to the table in the ERPAI UI.
   * @param {string} [tableId] - Target table ID. Omit to let the user pick a table or create a new one.
   * @param {object} [opts] - Options: { onComplete(tableId, { importLogId }), onClose() }
   */
  function openImport(tableId, opts) {
    if (!opts) opts = {};

    if (isInIframe()) {
      var requestId = opts.requestId || createBridgeRequestId();
      window.parent.postMessage({
        type: 'ERPAI_OPEN_IMPORT',
        requestId: requestId,
        tableId: tableId || ''
      }, '*');
      listenForImportBridgeResponse(requestId, opts);
      return;
    }

    // Fallback: navigate to the table in ERPAI UI (import isn't available standalone)
    if (tableId) navigateTo('/table/' + tableId);
  }

  // ===== Fallback Record Modal (for local testing only) =====

  /**
   * Self-contained record modal — used when page runs outside iframe (local dev/testing).
   * Simple form with basic field types. In production, the real AddRecordPopup is used instead.
   */
  async function _openRecordFallback(tableId, recordId, opts) {
    if (!opts) opts = {};
    var readOnly = opts.readOnly || false;

    // Create overlay immediately with loading state
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'erpai-record-modal';
    overlay.innerHTML =
      '<div class="record-modal">' +
        '<div class="record-modal-loading">Loading record...</div>' +
      '</div>';
    document.body.appendChild(overlay);

    // Close on overlay click (not modal click)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    // Close on Escape
    function onEsc(e) { if (e.key === 'Escape') closeModal(); }
    document.addEventListener('keydown', onEsc);

    function closeModal() {
      document.removeEventListener('keydown', onEsc);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (opts.onClose) opts.onClose();
    }

    try {
      // Fetch table metadata + record in parallel
      var results = await Promise.all([getTable(tableId), getRecordById(tableId, recordId)]);
      var tableMeta = results[0];
      var record = results[1];
      if (!record) throw new Error('Record not found');

      var columns = getVisibleColumns(tableMeta);
      var cells = record.cells || {};
      var tableName = tableMeta.name || 'Record';

      // Find the primary/title column value for the header
      var primaryCol = columns.find(function (c) { return c.isPrimary; }) || columns[0];
      var recordTitle = primaryCol ? (cells[primaryCol.id] || recordId) : recordId;
      if (typeof recordTitle === 'object') recordTitle = recordTitle._display || recordId;

      // Build form fields
      var fieldsHtml = columns.map(function (col) {
        return buildFieldHtml(col, cells[col.id], readOnly);
      }).join('');

      // Build footer
      var footerHtml = '';
      if (!readOnly) {
        footerHtml =
          '<div class="record-modal-footer">' +
            '<div class="record-save-status" id="record-save-status"></div>' +
            '<button class="btn btn-secondary" id="record-close-btn">Close</button>' +
            '<button class="btn btn-primary" id="record-save-btn">Save</button>' +
          '</div>';
      } else {
        footerHtml =
          '<div class="record-modal-footer">' +
            '<button class="btn btn-secondary" id="record-close-btn">Close</button>' +
          '</div>';
      }

      // Render the full modal
      overlay.querySelector('.record-modal').innerHTML =
        '<div class="record-modal-header">' +
          '<div>' +
            '<div class="record-title">' + esc(String(recordTitle)) + '</div>' +
            '<div class="record-subtitle">' + esc(tableName) + '</div>' +
          '</div>' +
          '<button class="modal-close" id="record-x-btn">&times;</button>' +
        '</div>' +
        '<div class="record-modal-body">' +
          '<div class="record-form">' + fieldsHtml + '</div>' +
        '</div>' +
        footerHtml;

      // Bind close buttons
      overlay.querySelector('#record-x-btn').addEventListener('click', closeModal);
      overlay.querySelector('#record-close-btn').addEventListener('click', closeModal);

      // Bind interactive elements (multi-select chips, star ratings)
      bindModalInteractions(overlay);

      // Bind save button
      if (!readOnly) {
        overlay.querySelector('#record-save-btn').addEventListener('click', async function () {
          var saveBtn = overlay.querySelector('#record-save-btn');
          var statusEl = overlay.querySelector('#record-save-status');
          var changes = collectFormValues(columns, cells);

          if (Object.keys(changes).length === 0) {
            statusEl.textContent = 'No changes to save';
            setTimeout(function () { statusEl.textContent = ''; }, 2000);
            return;
          }

          saveBtn.disabled = true;
          saveBtn.textContent = 'Saving...';
          statusEl.textContent = '';

          try {
            await updateRecord(tableId, recordId, changes);
            statusEl.textContent = '\u2713 Saved';
            saveBtn.textContent = 'Save';
            saveBtn.disabled = false;
            // Update original cells so next diff is clean
            Object.keys(changes).forEach(function (k) { cells[k] = changes[k]; });
            if (opts.onSave) opts.onSave(recordId, changes);
            // Auto-close after a brief pause
            setTimeout(closeModal, 600);
          } catch (err) {
            statusEl.style.color = 'var(--red)';
            statusEl.textContent = 'Save failed: ' + err.message;
            saveBtn.textContent = 'Save';
            saveBtn.disabled = false;
          }
        });
      }

    } catch (err) {
      // Show error in the modal
      overlay.querySelector('.record-modal').innerHTML =
        '<div class="record-modal-header">' +
          '<div><div class="record-title">Error</div></div>' +
          '<button class="modal-close" id="record-x-btn">&times;</button>' +
        '</div>' +
        '<div class="record-modal-body">' +
          '<div class="error-container" style="padding:24px 0;"><p>' + esc(err.message) + '</p></div>' +
        '</div>' +
        '<div class="record-modal-footer">' +
          '<button class="btn btn-secondary" id="record-close-btn">Close</button>' +
        '</div>';
      overlay.querySelector('#record-x-btn').addEventListener('click', closeModal);
      overlay.querySelector('#record-close-btn').addEventListener('click', closeModal);
    }
  }

  // ===== DATA CACHE =====
  // Simple in-memory cache with TTL. Avoids refetching on tab switches, back-nav, etc.

  var _cache = {};
  var DEFAULT_TTL = 60000; // 1 minute

  /**
   * Get or fetch data with caching.
   * @param {string} key - Cache key (use descriptive keys like 'stats', 'table-xyz-page-1')
   * @param {function} fetcher - Async function that returns data
   * @param {number} [ttl] - Cache TTL in ms (default 60s). Pass 0 to skip cache.
   * @returns {Promise<{data: *, fromCache: boolean}>}
   */
  async function cached(key, fetcher, ttl) {
    if (ttl === undefined) ttl = DEFAULT_TTL;
    var entry = _cache[key];
    if (entry && ttl > 0 && (Date.now() - entry.time) < ttl) {
      return { data: entry.data, fromCache: true };
    }
    var data = await fetcher();
    if (ttl > 0) {
      _cache[key] = { data: data, time: Date.now() };
    }
    return { data: data, fromCache: false };
  }

  /** Invalidate a specific cache key or all keys matching a prefix */
  function invalidateCache(keyOrPrefix) {
    if (!keyOrPrefix) {
      _cache = {};
      return;
    }
    Object.keys(_cache).forEach(function (k) {
      if (k === keyOrPrefix || k.indexOf(keyOrPrefix) === 0) {
        delete _cache[k];
      }
    });
  }

  // ===== NATIVE DATA LAYER =====
  // Additive query/mutation helpers for custom pages that need native-screen
  // behavior: request dedupe, stale-while-revalidate, targeted invalidation,
  // bounded pagination, and keyed DOM rendering.

  var DATA_CACHE_DB = 'erpai-custom-page-query-cache-v1';
  var DATA_CACHE_STORE = 'queries';
  var DATA_CACHE_VERSION = 1;
  var DEFAULT_QUERY_STALE_TTL = 30000;
  var DEFAULT_QUERY_MAX_AGE = 5 * 60 * 1000;
  var DEFAULT_RECORD_PAGE_SIZE = 50;
  var DEFAULT_FETCH_ALL_PAGE_SIZE = 500;
  var DEFAULT_FETCH_ALL_MAX_RECORDS = 5000;
  var _queryMemoryCache = {};
  var _queryInflight = {};
  var _querySubscribers = {};
  var _queryDbPromise = null;
  var _queryBroadcast = null;
  var _parentQueryBridgeSeq = 0;
  var _parentQueryBridgeBound = false;
  var _parentQueryBridgePending = {};
  var _mutationDependencies = {};
  var _pageLifecycleBusy = false;
  var _pageLifecycleReady = false;
  var _debugMetrics = {
    startedAt: Date.now(),
    requestsByPath: {},
    requestsByEndpoint: {},
    requestCount: 0,
    dedupedRequests: 0,
    cacheHits: 0,
    cacheMisses: 0,
    parentCacheHits: 0,
    parentCacheMisses: 0,
    parentCacheWrites: 0,
    parentCacheDeletes: 0,
    swrServes: 0,
    invalidations: 0,
    mutations: 0,
    renderCount: 0,
    errors: 0,
    lifecycleEvents: [],
    lastRequests: []
  };

  function postPageLifecycle(type, payload) {
    payload = payload || {};
    var at = Date.now();
    _debugMetrics.lifecycleEvents.push({ type: type, at: at });
    if (_debugMetrics.lifecycleEvents.length > 20) _debugMetrics.lifecycleEvents.shift();
    try {
      if (!window.parent || window.parent === window || typeof window.parent.postMessage !== 'function') return;
      window.parent.postMessage(Object.assign({
        type: type,
        appId: APP_ID,
        branchId: BRANCH_ID,
        pageSlug: PAGE_SLUG,
        pageId: PAGE_ID,
        at: at
      }, payload), '*');
    } catch (_) {}
  }

  function pageReady(payload) {
    _pageLifecycleBusy = false;
    _pageLifecycleReady = true;
    postPageLifecycle('ERPAI_PAGE_READY', Object.assign({ metrics: debugMetrics() }, payload || {}));
  }

  function pageBusy(payload) {
    _pageLifecycleBusy = true;
    postPageLifecycle('ERPAI_PAGE_BUSY', payload || {});
  }

  function pageMetrics(payload) {
    postPageLifecycle('ERPAI_PAGE_METRICS', Object.assign({ metrics: debugMetrics() }, payload || {}));
  }

  var lifecycle = {
    ready: pageReady,
    busy: pageBusy,
    metrics: pageMetrics,
    post: postPageLifecycle
  };

  function stableStringify(value) {
    if (value === null || value === undefined) return String(value);
    if (typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
    return '{' + Object.keys(value).sort().map(function (key) {
      return JSON.stringify(key) + ':' + stableStringify(value[key]);
    }).join(',') + '}';
  }

  function hashString(str) {
    var hash = 5381;
    for (var i = 0; i < str.length; i++) hash = ((hash << 5) + hash) + str.charCodeAt(i);
    return (hash >>> 0).toString(36);
  }

  function normalizeQueryKey(key) {
    var raw = typeof key === 'string' ? key : stableStringify(key);
    return [
      'erpai-query',
      APP_ID || '_',
      BRANCH_ID || 'main',
      PAGE_SLUG || PAGE_ID || 'page',
      hashString(raw)
    ].join(':');
  }

  function queryCacheScopeKey(key) {
    return normalizeQueryKey(key);
  }

  function endpointFromPath(path) {
    var clean = String(path || '').split('?')[0];
    return clean.replace(/\/[a-f0-9]{24}(?=\/|$)/gi, '/:id');
  }

  function recordRuntimeRequest(method, path, durationMs, fromCache, deduped, status) {
    var endpoint = endpointFromPath(path);
    _debugMetrics.requestCount += fromCache ? 0 : 1;
    _debugMetrics.requestsByPath[path] = (_debugMetrics.requestsByPath[path] || 0) + 1;
    _debugMetrics.requestsByEndpoint[endpoint] = (_debugMetrics.requestsByEndpoint[endpoint] || 0) + 1;
    if (deduped) _debugMetrics.dedupedRequests += 1;
    if (fromCache) _debugMetrics.cacheHits += 1;
    if (status === 0 || status >= 400) _debugMetrics.errors += 1;
    _debugMetrics.lastRequests.push({
      method: method,
      path: path,
      endpoint: endpoint,
      durationMs: durationMs,
      fromCache: !!fromCache,
      deduped: !!deduped,
      status: status || null,
      at: Date.now()
    });
    if (_debugMetrics.lastRequests.length > 50) _debugMetrics.lastRequests.shift();
  }

  function hasParentQueryBridge() {
    try {
      return !!(window.parent && window.parent !== window && typeof window.parent.postMessage === 'function');
    } catch (_) {
      return false;
    }
  }

  function bindParentQueryBridge() {
    if (_parentQueryBridgeBound || !hasParentQueryBridge()) return;
    _parentQueryBridgeBound = true;
    window.addEventListener('message', function (event) {
      if (event.source && window.parent && event.source !== window.parent) return;
      var msg = event.data || {};
      if (!msg || msg.type !== 'ERPAI_QUERY_CACHE_RESULT' || !msg.requestId) return;
      var pending = _parentQueryBridgePending[msg.requestId];
      if (!pending) return;
      delete _parentQueryBridgePending[msg.requestId];
      clearTimeout(pending.timer);
      pending.resolve(msg);
    });
  }

  function parentQueryCacheRequest(type, payload, timeoutMs) {
    if (!hasParentQueryBridge()) return Promise.resolve(null);
    bindParentQueryBridge();
    return new Promise(function (resolve) {
      var requestId = 'query_cache_' + Date.now() + '_' + (++_parentQueryBridgeSeq);
      var timer = setTimeout(function () {
        var pending = _parentQueryBridgePending[requestId];
        if (!pending) return;
        delete _parentQueryBridgePending[requestId];
        resolve(null);
      }, timeoutMs || 250);
      _parentQueryBridgePending[requestId] = { resolve: resolve, timer: timer };
      try {
        window.parent.postMessage(Object.assign({ type: type, requestId: requestId }, payload || {}), '*');
      } catch (_) {
        clearTimeout(timer);
        delete _parentQueryBridgePending[requestId];
        resolve(null);
      }
    });
  }

  function openQueryDB() {
    if (!('indexedDB' in window)) return Promise.resolve(null);
    if (_queryDbPromise) return _queryDbPromise;
    _queryDbPromise = new Promise(function (resolve) {
      var req = indexedDB.open(DATA_CACHE_DB, DATA_CACHE_VERSION);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(DATA_CACHE_STORE)) {
          db.createObjectStore(DATA_CACHE_STORE, { keyPath: 'key' });
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () {
        _queryDbPromise = null;
        resolve(null);
      };
    });
    return _queryDbPromise;
  }

  async function readPersistedQuery(key) {
    var parentResult = await parentQueryCacheRequest('ERPAI_QUERY_CACHE_GET', { key: key }, 180);
    if (parentResult && parentResult.ok) {
      if (parentResult.entry) {
        _debugMetrics.parentCacheHits += 1;
        return parentResult.entry;
      }
      _debugMetrics.parentCacheMisses += 1;
    }
    try {
      var db = await openQueryDB();
      if (!db) return null;
      return await new Promise(function (resolve) {
        var tx = db.transaction(DATA_CACHE_STORE, 'readonly');
        var req = tx.objectStore(DATA_CACHE_STORE).get(key);
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror = function () { resolve(null); };
      });
    } catch (_) {
      return null;
    }
  }

  async function writePersistedQuery(entry) {
    var parentWrite = parentQueryCacheRequest('ERPAI_QUERY_CACHE_PUT', { entry: entry }, 250)
      .then(function (result) {
        if (result && result.ok) _debugMetrics.parentCacheWrites += 1;
      })
      .catch(function () {});
    try {
      var db = await openQueryDB();
      if (!db) {
        await parentWrite;
        return;
      }
      await Promise.all([parentWrite, new Promise(function (resolve) {
        var tx = db.transaction(DATA_CACHE_STORE, 'readwrite');
        tx.objectStore(DATA_CACHE_STORE).put(entry);
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { resolve(); };
      })]);
    } catch (_) {
      await parentWrite;
    }
  }

  async function deletePersistedQueries(match) {
    var parentDelete = typeof match === 'function'
      ? Promise.resolve(null)
      : parentQueryCacheRequest('ERPAI_QUERY_CACHE_DELETE', { match: match }, 250)
        .then(function (result) {
          if (result && result.ok) _debugMetrics.parentCacheDeletes += 1;
        })
        .catch(function () {});
    try {
      var db = await openQueryDB();
      if (!db) {
        await parentDelete;
        return;
      }
      await Promise.all([parentDelete, new Promise(function (resolve) {
        var tx = db.transaction(DATA_CACHE_STORE, 'readwrite');
        var store = tx.objectStore(DATA_CACHE_STORE);
        var req = store.openCursor();
        req.onsuccess = function () {
          var cursor = req.result;
          if (!cursor) return;
          var value = cursor.value;
          if (!match || queryMatches(value, match)) cursor.delete();
          cursor.continue();
        };
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { resolve(); };
      })]);
    } catch (_) {
      await parentDelete;
    }
  }

  function queryMatches(entry, match) {
    if (!match) return true;
    var key = typeof entry === 'string' ? entry : entry.key;
    var meta = (entry && entry.meta) || {};
    if (typeof match === 'string') return key === match || key.indexOf(match) === 0 || stableStringify(meta).indexOf(match) !== -1;
    if (Array.isArray(match)) return match.some(function (m) { return queryMatches(entry, m); });
    if (typeof match === 'function') return !!match(entry);
    if (typeof match === 'object') {
      if (match.key && !queryMatches(entry, String(match.key))) return false;
      var tableIds = uniqueStrings([].concat(match.tableId || [], match.tableIds || [], match.tables || []));
      if (tableIds.length && !tableIds.some(function (tableId) {
        return meta.tableId === tableId || stableStringify(meta).indexOf(String(tableId)) !== -1;
      })) return false;
      if (match.prefix && key.indexOf(String(match.prefix)) !== 0) return false;
      return true;
    }
    return false;
  }

  function uniqueStrings(values) {
    var out = [];
    (Array.isArray(values) ? values : [values]).forEach(function (value) {
      if (value === undefined || value === null || value === '') return;
      var str = String(value);
      if (out.indexOf(str) === -1) out.push(str);
    });
    return out;
  }

  function collectInvalidationTables(match, out) {
    out = out || [];
    if (!match) return out;
    if (Array.isArray(match)) {
      match.forEach(function (item) { collectInvalidationTables(item, out); });
      return out;
    }
    if (typeof match === 'object') {
      uniqueStrings([].concat(match.tableId || [], match.tableIds || [], match.tables || [])).forEach(function (tableId) {
        if (out.indexOf(tableId) === -1) out.push(tableId);
      });
    }
    return out;
  }

  function expandTablesWithDependencies(tableIds) {
    var expanded = uniqueStrings(tableIds);
    for (var i = 0; i < expanded.length; i += 1) {
      var deps = _mutationDependencies[expanded[i]] || [];
      deps.forEach(function (tableId) {
        if (expanded.indexOf(tableId) === -1) expanded.push(tableId);
      });
    }
    return expanded;
  }

  function expandInvalidationMatch(match) {
    var tables = collectInvalidationTables(match);
    var expanded = expandTablesWithDependencies(tables);
    if (!expanded.length || expanded.length === tables.length) return match;
    if (Array.isArray(match)) return match.concat(expanded.map(function (tableId) { return { tableId: tableId }; }));
    if (match && typeof match === 'object') return Object.assign({}, match, { tables: expanded });
    return expanded.map(function (tableId) { return { tableId: tableId }; });
  }

  function emitQueryUpdate(key, payload) {
    var subs = _querySubscribers[key] || [];
    subs.slice().forEach(function (cb) {
      try { cb(payload); } catch (err) { console.warn('[erpai.query] subscriber failed', err); }
    });
  }

  function queryResult(key, entry, fromCache, refreshFn) {
    return {
      key: key,
      data: entry ? entry.data : undefined,
      status: entry ? 'success' : 'idle',
      fromCache: !!fromCache,
      updatedAt: entry ? entry.time : null,
      refresh: refreshFn,
      subscribe: function (cb) { return querySubscribe(key, cb); },
      invalidate: function () { return invalidateQueries({ key: key }); }
    };
  }

  async function runQueryFetch(cacheKey, keyInput, fetcher, options) {
    if (_queryInflight[cacheKey]) {
      _debugMetrics.dedupedRequests += 1;
      return _queryInflight[cacheKey];
    }
    _queryInflight[cacheKey] = Promise.resolve()
      .then(fetcher)
      .then(async function (data) {
        var entry = {
          key: cacheKey,
          data: data,
          time: Date.now(),
          meta: options && options.meta ? options.meta : { input: keyInput }
        };
        _queryMemoryCache[cacheKey] = entry;
        if (!options || options.persist !== false) await writePersistedQuery(entry);
        emitQueryUpdate(cacheKey, queryResult(cacheKey, entry, false, function () {
          return runQueryFetch(cacheKey, keyInput, fetcher, Object.assign({}, options, { fresh: true }));
        }));
        return entry;
      })
      .finally(function () {
        delete _queryInflight[cacheKey];
      });
    return _queryInflight[cacheKey];
  }

  async function query(key, fetcher, options) {
    options = options || {};
    if (typeof fetcher !== 'function') throw new Error('erpai.query requires a fetcher function');
    var cacheKey = queryCacheScopeKey(key);
    var staleTtl = options.staleTtl ?? options.staleTime ?? options.ttl ?? DEFAULT_QUERY_STALE_TTL;
    var maxAge = options.maxAge ?? DEFAULT_QUERY_MAX_AGE;
    var now = Date.now();
    var entry = !options.fresh ? _queryMemoryCache[cacheKey] : null;
    if (!entry && !options.fresh && options.persist !== false) {
      entry = await readPersistedQuery(cacheKey);
      if (entry) _queryMemoryCache[cacheKey] = entry;
    }

    if (entry && maxAge > 0 && now - entry.time < maxAge) {
      _debugMetrics.cacheHits += 1;
      var cachedResult = queryResult(cacheKey, entry, true, function () {
        return runQueryFetch(cacheKey, key, fetcher, Object.assign({}, options, { fresh: true }));
      });
      if (now - entry.time >= staleTtl && options.revalidate !== false) {
        _debugMetrics.swrServes += 1;
        runQueryFetch(cacheKey, key, fetcher, options).catch(function (err) {
          console.warn('[erpai.query] background refresh failed', err);
        });
      }
      return cachedResult;
    }

    _debugMetrics.cacheMisses += 1;
    var fetched = await runQueryFetch(cacheKey, key, fetcher, options);
    return queryResult(cacheKey, fetched, false, function () {
      return runQueryFetch(cacheKey, key, fetcher, Object.assign({}, options, { fresh: true }));
    });
  }

  function querySubscribe(key, cb) {
    var cacheKey = queryCacheScopeKey(key);
    if (!_querySubscribers[cacheKey]) _querySubscribers[cacheKey] = [];
    _querySubscribers[cacheKey].push(cb);
    return function unsubscribe() {
      _querySubscribers[cacheKey] = (_querySubscribers[cacheKey] || []).filter(function (fn) { return fn !== cb; });
    };
  }

  async function invalidateQueries(match, opts) {
    match = expandInvalidationMatch(match);
    _debugMetrics.invalidations += 1;
    Object.keys(_queryMemoryCache).forEach(function (key) {
      var entry = _queryMemoryCache[key];
      if (queryMatches(entry || key, match)) delete _queryMemoryCache[key];
    });
    await deletePersistedQueries(match);
    if (!opts || opts.broadcast !== false) broadcastInvalidation(match);
  }

  function getQueryBroadcast() {
    if (_queryBroadcast !== null) return _queryBroadcast;
    try {
      _queryBroadcast = 'BroadcastChannel' in window ? new BroadcastChannel('erpai-page-cache:' + (APP_ID || '_')) : false;
      if (_queryBroadcast) {
        _queryBroadcast.onmessage = function (event) {
          var msg = event.data || {};
          if (msg.type === 'ERPAI_QUERY_INVALIDATE') {
            invalidateQueries(msg.match, { broadcast: false }).catch(function () {});
          }
        };
      }
    } catch (_) {
      _queryBroadcast = false;
    }
    return _queryBroadcast;
  }

  function broadcastInvalidation(match) {
    var channel = getQueryBroadcast();
    if (channel) {
      try { channel.postMessage({ type: 'ERPAI_QUERY_INVALIDATE', match: match, at: Date.now() }); } catch (_) {}
    }
  }

  query.subscribe = querySubscribe;
  query.invalidate = invalidateQueries;
  query.key = queryCacheScopeKey;

  function buildRecordFilterBody(options) {
    options = options || {};
    if (options.body) return options.body;
    if (options.filterCriteria) return { filterCriteria: options.filterCriteria };
    if (options.filter) {
      if (options.filter.filterCriteria) return { filterCriteria: options.filter.filterCriteria };
      return { filterCriteria: options.filter };
    }
    return {};
  }

  function addQueryParam(parts, key, value) {
    if (value !== undefined && value !== null && value !== '') {
      parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(String(value)));
    }
  }

  function buildPagedRecordPath(tableId, options) {
    options = options || {};
    var parts = [];
    addQueryParam(parts, 'appId', APP_ID);
    addQueryParam(parts, 'pageNo', options.pageNo || 1);
    addQueryParam(parts, 'pageSize', options.pageSize || DEFAULT_RECORD_PAGE_SIZE);
    addQueryParam(parts, 'sortCol', options.sortCol);
    addQueryParam(parts, 'sortDir', options.sortDir);
    addQueryParam(parts, 'q', options.q);
    addQueryParam(parts, 'projection', options.projection);
    addQueryParam(parts, 'fetchAllRef', options.fetchAllRef === undefined ? false : !!options.fetchAllRef);
    addQueryParam(parts, 'maxFetchRefLevel', options.maxFetchRefLevel);
    addQueryParam(parts, 'excludeTotalCount', options.excludeTotalCount === undefined ? true : !!options.excludeTotalCount);
    return '/v1/app-builder/table/' + encodeURIComponent(tableId) + '/paged-record?' + parts.join('&');
  }

  async function recordsPage(tableId, options) {
    options = options || {};
    var key = ['records.page', tableId, options];
    var fetcher = function () {
      return api('POST', buildPagedRecordPath(tableId, options), buildRecordFilterBody(options));
    };
    if (options.cache === false) return fetcher();
    var result = await query(key, fetcher, {
      staleTtl: options.staleTtl,
      maxAge: options.maxAge,
      persist: options.persist,
      fresh: options.fresh,
      meta: { tableId: tableId, type: 'records.page', options: options }
    });
    return result.data;
  }

  async function recordsBulkGet(tableId, ids, options) {
    options = options || {};
    var arr = Array.isArray(ids) ? ids.filter(Boolean) : [];
    if (!arr.length) return [];
    var parts = [];
    addQueryParam(parts, 'appId', APP_ID);
    addQueryParam(parts, 'fetchAllRef', options.fetchAllRef === undefined ? true : !!options.fetchAllRef);
    addQueryParam(parts, 'maxFetchRefLevel', options.maxFetchRefLevel);
    var path = '/v1/app-builder/table/' + encodeURIComponent(tableId) + '/record-bulk-get?' + parts.join('&');
    var fetcher = function () { return api('POST', path, { arr: arr }); };
    if (options.cache === false) return fetcher();
    var result = await query(['records.bulkGet', tableId, arr, options], fetcher, {
      staleTtl: options.staleTtl,
      maxAge: options.maxAge,
      persist: options.persist,
      fresh: options.fresh,
      meta: { tableId: tableId, type: 'records.bulkGet', ids: arr }
    });
    return result.data;
  }

  async function recordsAll(tableId, options) {
    options = options || {};
    var pageSize = Math.min(Number(options.pageSize || DEFAULT_FETCH_ALL_PAGE_SIZE), DEFAULT_FETCH_ALL_PAGE_SIZE);
    var maxRecords = Number(options.maxRecords || DEFAULT_FETCH_ALL_MAX_RECORDS);
    var maxPages = Number(options.maxPages || Math.ceil(maxRecords / pageSize));
    var all = [];
    var totalCount = null;
    for (var pageNo = 1; pageNo <= maxPages; pageNo++) {
      var pageOptions = Object.assign({}, options, {
        pageNo: pageNo,
        pageSize: pageSize,
        excludeTotalCount: pageNo === 1 ? (options.excludeTotalCount === undefined ? false : options.excludeTotalCount) : true,
        cache: options.cachePages !== false,
      });
      var page = await recordsPage(tableId, pageOptions);
      var rows = Array.isArray(page && page.data) ? page.data : [];
      if (totalCount === null && page && typeof page.totalCount === 'number') totalCount = page.totalCount;
      all = all.concat(rows);
      if (typeof options.onProgress === 'function') options.onProgress({ pageNo: pageNo, rows: all.length, totalCount: totalCount });
      if (rows.length < pageSize) break;
      if (all.length >= maxRecords) {
        var err = new Error('records.all truncated at maxRecords=' + maxRecords);
        err.name = 'FetchAllTruncated';
        err.records = all.slice(0, maxRecords);
        err.totalCount = totalCount;
        err.truncated = true;
        if (options.allowTruncated) {
          return { data: err.records, totalCount: totalCount, truncated: true, pagesFetched: pageNo };
        }
        throw err;
      }
    }
    return { data: all, totalCount: totalCount === null ? all.length : totalCount, truncated: false, pagesFetched: Math.ceil(all.length / pageSize) };
  }

  async function recordsGrouped(tableId, options) {
    options = options || {};
    var groupingColId = options.groupingColId || options.groupBy;
    if (!groupingColId) throw new Error('erpai.records.grouped requires groupBy/groupingColId');
    var parts = [];
    addQueryParam(parts, 'appId', APP_ID);
    addQueryParam(parts, 'pageNo', options.pageNo || 1);
    addQueryParam(parts, 'pageSize', options.pageSize || DEFAULT_RECORD_PAGE_SIZE);
    addQueryParam(parts, 'groupingColId', groupingColId);
    addQueryParam(parts, 'sortCol', options.sortCol);
    addQueryParam(parts, 'sortDir', options.sortDir);
    addQueryParam(parts, 'q', options.q);
    addQueryParam(parts, 'projection', options.projection);
    addQueryParam(parts, 'fetchAllRef', options.fetchAllRef === undefined ? false : !!options.fetchAllRef);
    addQueryParam(parts, 'maxFetchRefLevel', options.maxFetchRefLevel);
    addQueryParam(parts, 'excludeTotalCount', options.excludeTotalCount === undefined ? true : !!options.excludeTotalCount);
    var path = '/v1/app-builder/table/' + encodeURIComponent(tableId) + '/paged-record/grouped?' + parts.join('&');
    var fetcher = function () { return api('POST', path, buildRecordFilterBody(options)); };
    if (options.cache === false) return fetcher();
    var result = await query(['records.grouped', tableId, options], fetcher, {
      staleTtl: options.staleTtl,
      maxAge: options.maxAge,
      persist: options.persist,
      fresh: options.fresh,
      meta: { tableId: tableId, type: 'records.grouped', options: options }
    });
    return result.data;
  }

  async function recordsRefMap(tableId, options) {
    options = options || {};
    var keyCol = options.keyCol || '_id';
    var res = await recordsAll(tableId, Object.assign({ maxRecords: 5000 }, options));
    var map = new Map();
    (res.data || []).forEach(function (record) {
      var key = record && (record[keyCol] !== undefined ? record[keyCol] : record._id);
      if (key !== undefined && key !== null) map.set(String(key), record);
    });
    return map;
  }

  function getCellNumber(record, col) {
    var value = record && record.cells ? record.cells[col] : record && record[col];
    var n = Number(Array.isArray(value) ? value[0] : value);
    return isFinite(n) ? n : 0;
  }

  async function aggregates(tableId, options) {
    options = options || {};
    var metrics = Array.isArray(options.metrics) ? options.metrics : [];
    var rows = (await recordsAll(tableId, options)).data || [];
    var groups = new Map();
    var groupBy = options.groupBy;
    rows.forEach(function (row) {
      var groupValue = groupBy ? (row.cells && row.cells[groupBy] !== undefined ? row.cells[groupBy] : row[groupBy]) : '__all__';
      var groupKey = Array.isArray(groupValue) ? groupValue.join(',') : String(groupValue);
      if (!groups.has(groupKey)) groups.set(groupKey, { key: groupBy ? groupKey : null, count: 0, metrics: {} });
      var group = groups.get(groupKey);
      group.count += 1;
      metrics.forEach(function (metric) {
        var name = metric.name || [metric.fn || 'sum', metric.col || metric.field].join('_');
        var fn = metric.fn || 'sum';
        var col = metric.col || metric.field;
        if (!group.metrics[name]) group.metrics[name] = { value: 0, count: 0, min: Infinity, max: -Infinity, distinct: {} };
        var bucket = group.metrics[name];
        var value = col ? getCellNumber(row, col) : 1;
        if (fn === 'count') bucket.value += 1;
        else if (fn === 'distinct') bucket.distinct[String((row.cells && row.cells[col]) || row[col] || '')] = true;
        else {
          bucket.value += value;
          bucket.count += 1;
          bucket.min = Math.min(bucket.min, value);
          bucket.max = Math.max(bucket.max, value);
        }
      });
    });
    return Array.from(groups.values()).map(function (group) {
      var out = { key: group.key, count: group.count };
      Object.keys(group.metrics).forEach(function (name) {
        var bucket = group.metrics[name];
        out[name] = bucket.distinct && Object.keys(bucket.distinct).length ? Object.keys(bucket.distinct).length : bucket.value;
      });
      return out;
    });
  }

  var records = {
    page: recordsPage,
    all: recordsAll,
    bulkGet: recordsBulkGet,
    grouped: recordsGrouped,
    refMap: recordsRefMap
  };

  function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function extractResultValue(result, key) {
    if (!result || typeof result !== 'object') return undefined;
    if (result[key] !== undefined) return result[key];
    if (result.data && typeof result.data === 'object' && result.data[key] !== undefined) return result.data[key];
    if (result.result && typeof result.result === 'object' && result.result[key] !== undefined) return result.result[key];
    return undefined;
  }

  function resultInvalidation(fallback, result) {
    var tables = uniqueStrings([].concat(
      collectInvalidationTables(fallback),
      extractResultValue(result, 'affectedTables') || [],
      extractResultValue(result, 'affectedTableIds') || []
    ));
    var records = uniqueStrings([].concat(
      fallback && typeof fallback === 'object' ? (fallback.records || fallback.recordIds || []) : [],
      extractResultValue(result, 'affectedRecordIds') || [],
      extractResultValue(result, 'recordIds') || []
    ));
    if (!tables.length && !records.length) return fallback;
    var merged = fallback && typeof fallback === 'object' && !Array.isArray(fallback) ? Object.assign({}, fallback) : {};
    if (tables.length) merged.tables = expandTablesWithDependencies(tables);
    if (records.length) merged.records = records;
    return merged;
  }

  function recordIdsFromSelectedData(selectedData) {
    if (!Array.isArray(selectedData)) return [];
    return selectedData.map(function (record) {
      if (!record || typeof record !== 'object') return null;
      return record._id || record.id || record.recordId || record.dataId || null;
    });
  }

  function decorateMutationResult(result, defaults) {
    if (!result || typeof result !== 'object' || Array.isArray(result)) return result;
    defaults = defaults || {};
    var tables = uniqueStrings(defaults.tables || defaults.tableIds || defaults.tableId || defaults.table);
    var records = uniqueStrings(defaults.records || defaults.recordIds || defaults.recordId);
    if (tables.length && extractResultValue(result, 'affectedTables') === undefined && extractResultValue(result, 'affectedTableIds') === undefined) {
      result.affectedTables = tables;
      result.affectedTableIds = tables;
    }
    if (records.length && extractResultValue(result, 'affectedRecordIds') === undefined && extractResultValue(result, 'recordIds') === undefined) {
      result.affectedRecordIds = records;
    }
    return result;
  }

  function declareMutationDependency(childTableId, parentTableIds) {
    var child = String(childTableId || '').trim();
    if (!child) throw new Error('erpai.mutate.declareDependency requires a child table id');
    var parents = uniqueStrings(parentTableIds);
    if (!parents.length) throw new Error('erpai.mutate.declareDependency requires at least one parent table id');
    if (!_mutationDependencies[child]) _mutationDependencies[child] = [];
    parents.forEach(function (parent) {
      if (_mutationDependencies[child].indexOf(parent) === -1) _mutationDependencies[child].push(parent);
    });
    return _mutationDependencies[child].slice();
  }

  function getMutationDependencies() {
    var out = {};
    Object.keys(_mutationDependencies).forEach(function (tableId) {
      out[tableId] = _mutationDependencies[tableId].slice();
    });
    return out;
  }

  function normalizeAwaitSettledOptions(awaitSettled) {
    if (!awaitSettled) return null;
    if (typeof awaitSettled === 'function') return { until: awaitSettled };
    if (awaitSettled === true) return {};
    if (typeof awaitSettled === 'object') return awaitSettled;
    return null;
  }

  async function waitForActionSettled(tableId, payload, actionResult, options) {
    var settle = normalizeAwaitSettledOptions(options && options.awaitSettled);
    if (!settle) return actionResult;
    var pollTableId = settle.tableId || tableId;
    var selectedIds = payload && Array.isArray(payload.recordIds) ? payload.recordIds : [];
    var affectedIds = extractResultValue(actionResult, 'affectedRecordIds');
    var recordIds = uniqueStrings(settle.recordIds || affectedIds || selectedIds);
    var attempts = Math.max(1, Number(settle.attempts || settle.maxAttempts || 8));
    var pollMs = Math.max(0, Number(settle.pollMs || settle.intervalMs || 750));
    var fetchRows = typeof settle.fetch === 'function'
      ? function () { return settle.fetch(actionResult); }
      : function () {
        if (!recordIds.length) return Promise.resolve([]);
        return recordsBulkGet(pollTableId, recordIds, {
          fetchAllRef: settle.fetchAllRef !== undefined ? settle.fetchAllRef : true,
          maxFetchRefLevel: settle.maxFetchRefLevel,
          cache: false
        });
      };
    var until = settle.until || settle.predicate || settle.isSettled;
    var lastRows = [];
    var lastError = null;
    for (var attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        lastRows = await Promise.resolve(fetchRows());
        var settled = typeof until === 'function' ? await until(lastRows, actionResult, { attempt: attempt, tableId: pollTableId, recordIds: recordIds }) : true;
        if (settled) {
          if (actionResult && typeof actionResult === 'object') {
            actionResult.settled = { ok: true, attempts: attempt, tableId: pollTableId, recordIds: recordIds, rows: lastRows };
          }
          return actionResult;
        }
      } catch (err) {
        lastError = err;
        if (settle.failFast) throw err;
      }
      if (attempt < attempts && pollMs > 0) await sleep(pollMs);
    }
    if (actionResult && typeof actionResult === 'object') {
      actionResult.settled = { ok: false, attempts: attempts, tableId: pollTableId, recordIds: recordIds, rows: lastRows, error: lastError ? String(lastError.message || lastError) : undefined };
    }
    if (settle.throwOnTimeout) {
      var timeout = new Error('erpai.mutate.action awaitSettled timed out');
      timeout.name = 'AwaitSettledTimeout';
      timeout.result = actionResult;
      throw timeout;
    }
    return actionResult;
  }

  async function mutate(options) {
    options = options || {};
    if (typeof options.mutation !== 'function') throw new Error('erpai.mutate requires a mutation function');
    _debugMetrics.mutations += 1;
    var rollbackData;
    try {
      if (typeof options.optimistic === 'function') rollbackData = await options.optimistic();
      var result = await options.mutation();
      var invalidation = typeof options.invalidate === 'function' ? options.invalidate(result) : options.invalidate;
      invalidation = resultInvalidation(invalidation, result);
      if (invalidation) await invalidateQueries(invalidation);
      if (typeof options.refresh === 'function') await options.refresh(result);
      return result;
    } catch (err) {
      if (typeof options.rollback === 'function') {
        try { await options.rollback(rollbackData, err); } catch (rollbackErr) { console.warn('[erpai.mutate] rollback failed', rollbackErr); }
      }
      throw err;
    }
  }

  mutate.update = function (tableId, recordId, cells, options) {
    options = options || {};
    return mutate(Object.assign({}, options, {
      mutation: function () { return updateRecord(tableId, recordId, cells); },
      invalidate: options.invalidate || { tableId: tableId }
    }));
  };

  mutate.bulkUpdate = function (tableId, updates, options) {
    options = options || {};
    return mutate(Object.assign({}, options, {
      mutation: function () {
        return api('PUT', '/v1/app-builder/table/' + encodeURIComponent(tableId) + '/record-bulk?appId=' + encodeURIComponent(APP_ID), updates);
      },
      invalidate: options.invalidate || { tableId: tableId }
    }));
  };

  mutate.bulkUpdateByFilter = function (tableId, filter, cells, options) {
    options = options || {};
    return mutate(Object.assign({}, options, {
      mutation: function () {
        return api('PUT', '/v1/app-builder/table/' + encodeURIComponent(tableId) + '/record-bulk-update-by-filter?appId=' + encodeURIComponent(APP_ID), { filter: filter, cells: cells });
      },
      invalidate: options.invalidate || { tableId: tableId }
    }));
  };

  mutate.action = function (tableId, actionName, payload, options) {
    options = options || {};
    payload = payload || {};
    var actionRecordIds = uniqueStrings([].concat(payload.recordIds || [], recordIdsFromSelectedData(payload.selectedData)));
    return mutate(Object.assign({}, options, {
      mutation: async function () {
        var selectedData = payload.selectedData;
        if (!selectedData && Array.isArray(payload.recordIds)) {
          selectedData = await recordsBulkGet(tableId, payload.recordIds, { fetchAllRef: true, cache: false });
        }
        return api('POST', '/v1/app-builder/table/' + encodeURIComponent(tableId) + '/custom-action-trigger?appId=' + encodeURIComponent(APP_ID), {
          appId: APP_ID,
          actionName: actionName,
          data: {
            selectedData: selectedData || [],
            filter: payload.filter || null,
            params: payload.params || undefined
          }
        }).then(function (result) {
          var decorated = decorateMutationResult(result, {
            tables: [tableId],
            records: uniqueStrings([].concat(actionRecordIds, recordIdsFromSelectedData(selectedData)))
          });
          return waitForActionSettled(tableId, payload, decorated, options);
        });
      },
      invalidate: options.invalidate || { tableId: tableId, recordIds: actionRecordIds }
    }));
  };

  mutate.declareDependency = declareMutationDependency;
  mutate.dependencies = getMutationDependencies;

  async function bulkUpdate(tableId, updates, options) {
    return mutate.bulkUpdate(tableId, updates, options);
  }

  async function bulkUpdateByFilter(tableId, filter, cells, options) {
    return mutate.bulkUpdateByFilter(tableId, filter, cells, options);
  }

  async function triggerTableAction(tableId, actionName, payload, options) {
    return mutate.action(tableId, actionName, payload, options);
  }

  async function invalidate(match, opts) {
    return invalidateQueries(match, opts);
  }

  function preserveFocus(fn) {
    var active = document.activeElement;
    var selectionStart = active && typeof active.selectionStart === 'number' ? active.selectionStart : null;
    var selectionEnd = active && typeof active.selectionEnd === 'number' ? active.selectionEnd : null;
    var result = fn();
    Promise.resolve(result).finally(function () {
      if (active && document.contains(active) && typeof active.focus === 'function') {
        try {
          active.focus();
          if (selectionStart !== null && typeof active.setSelectionRange === 'function') {
            active.setSelectionRange(selectionStart, selectionEnd);
          }
        } catch (_) {}
      }
    });
    return result;
  }

  function renderList(container, items, optionsOrKeyFn, createFn, updateFn) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) return;
    var opts = typeof optionsOrKeyFn === 'function'
      ? { key: optionsOrKeyFn, create: createFn, update: updateFn }
      : (optionsOrKeyFn || {});
    var keyFn = opts.key || function (item) { return item && (item.id || item._id || item.key); };
    var existing = {};
    Array.prototype.slice.call(container.children).forEach(function (child) {
      var key = child.getAttribute('data-erpai-key');
      if (key) existing[key] = child;
    });
    var frag = document.createDocumentFragment();
    (items || []).forEach(function (item, index) {
      var key = String(keyFn(item, index));
      var node = existing[key];
      if (!node) {
        node = opts.create ? opts.create(item, index) : document.createElement('div');
        node.setAttribute('data-erpai-key', key);
      }
      if (opts.update) opts.update(node, item, index);
      frag.appendChild(node);
      delete existing[key];
    });
    preserveFocus(function () {
      container.appendChild(frag);
      Object.keys(existing).forEach(function (key) {
        if (existing[key] && existing[key].parentNode) existing[key].parentNode.removeChild(existing[key]);
      });
    });
    _debugMetrics.renderCount += 1;
  }

  function renderSection(container, htmlOrRenderer, options) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) return;
    options = options || {};
    preserveFocus(function () {
      if (typeof htmlOrRenderer === 'function') {
        htmlOrRenderer(container);
      } else {
        container.innerHTML = htmlOrRenderer || '';
      }
    });
    _debugMetrics.renderCount += 1;
  }

  function section(container, options) {
    if (typeof container === 'string') container = document.querySelector(container);
    options = options || {};
    return {
      loading: function () { if (container && options.loadingHtml) container.innerHTML = options.loadingHtml; },
      loaded: function (html) { renderSection(container, html, options); },
      error: function (err) { if (container) container.innerHTML = options.errorHtml || '<div class="error-container">' + esc(err && err.message ? err.message : err) + '</div>'; },
      empty: function () { if (container) container.innerHTML = options.emptyHtml || '<div class="empty-state">No data</div>'; }
    };
  }

  function defaultCardValue(data, options) {
    if (typeof options.value === 'function') return options.value(data);
    if (options.value !== undefined) return options.value;
    if (Array.isArray(data)) {
      var row = data[0] || {};
      var metric = options.metric || options.field;
      if (metric && row[metric] !== undefined) return row[metric];
      if (row.count !== undefined) return row.count;
      return data.length;
    }
    if (data && typeof data === 'object') {
      var objectMetric = options.metric || options.field;
      if (objectMetric && data[objectMetric] !== undefined) return data[objectMetric];
      if (data.value !== undefined) return data.value;
      if (data.count !== undefined) return data.count;
      if (data.total !== undefined) return data.total;
    }
    return data;
  }

  function renderBoundCard(container, data, result, options) {
    if (!container) return;
    if (typeof options.render === 'function') {
      preserveFocus(function () { options.render(container, data, result); });
      _debugMetrics.renderCount += 1;
      return;
    }
    var value = defaultCardValue(data, options);
    var formatter = options.format || options.formatter;
    var formatted = typeof formatter === 'function' ? formatter(value, data) : (options.currency ? fmt$(value) : fmtNum(value));
    var title = options.label || options.title || container.getAttribute('data-label') || '';
    var sub = options.sub || options.subtitle || container.getAttribute('data-subtitle') || '';
    if (!container.classList.contains('stat-card')) container.classList.add('stat-card');
    container.dataset.erpaiCardUpdatedAt = String(result && result.updatedAt ? result.updatedAt : Date.now());
    var changeHtml = '';
    if (options.change !== undefined && options.change !== null) {
      var change = Number(options.change) || 0;
      var cls = change >= 0 ? 'stat-change-up' : 'stat-change-down';
      var arrow = change >= 0 ? '&uarr;' : '&darr;';
      changeHtml = '<div class="stat-change ' + cls + '">' + arrow + ' ' + Math.abs(change).toFixed(1) + '%</div>';
    }
    var subHtml = sub ? '<div class="stat-sub">' + esc(sub) + '</div>' : '';
    var colorStyle = options.color ? ' style="color:' + esc(options.color) + ';"' : '';
    container.innerHTML =
      '<div class="stat-label">' + esc(title) + '</div>' +
      '<div class="stat-value"' + colorStyle + '>' + formatted + '</div>' +
      subHtml + changeHtml;
    _debugMetrics.renderCount += 1;
  }

  function bindCard(containerOrSelector, loader, options) {
    var container = typeof containerOrSelector === 'string' ? document.querySelector(containerOrSelector) : containerOrSelector;
    options = options || {};
    if (!container) return { refresh: async function () {}, invalidate: async function () {}, destroy: function () {} };
    if (typeof loader !== 'function') throw new Error('erpai.cards.bind requires a loader function');
    var key = options.key || ['card', PAGE_SLUG || PAGE_ID || 'page', container.id || container.getAttribute('data-key') || containerOrSelector];
    var destroyed = false;
    var queryOptions = Object.assign({}, options.query || options.queryOptions || {});
    if (options.ttl !== undefined) queryOptions.ttl = options.ttl;
    if (options.staleTime !== undefined) queryOptions.staleTime = options.staleTime;
    if (options.maxAge !== undefined) queryOptions.maxAge = options.maxAge;
    if (options.persist !== undefined) queryOptions.persist = options.persist;
    queryOptions.meta = queryOptions.meta || {
      type: 'card',
      key: key,
      tableId: options.tableId || null
    };

    function setLoading(isLoading) {
      container.dataset.erpaiCardLoading = isLoading ? 'true' : 'false';
      container.classList.toggle('is-updating', !!isLoading);
    }

    function setError(err) {
      container.dataset.erpaiCardError = err && err.message ? err.message : String(err || 'Card failed to load');
      if (typeof options.onError === 'function') options.onError(err, container);
      else container.innerHTML = options.errorHtml || '<div class="stat-label">' + esc(options.label || options.title || 'Metric') + '</div><div class="stat-sub">' + esc(container.dataset.erpaiCardError) + '</div>';
    }

    async function refresh(refreshOptions) {
      if (destroyed) return null;
      setLoading(true);
      try {
        var result = await query(key, loader, Object.assign({}, queryOptions, refreshOptions || {}));
        if (destroyed) return result;
        delete container.dataset.erpaiCardError;
        renderBoundCard(container, result.data, result, options);
        return result;
      } catch (err) {
        if (!destroyed) setError(err);
        throw err;
      } finally {
        if (!destroyed) setLoading(false);
      }
    }

    var unsubscribe = query.subscribe(key, function (result) {
      if (!destroyed && result) renderBoundCard(container, result.data, result, options);
    });
    refresh().catch(function (err) {
      console.warn('[erpai.cards.bind] initial load failed', err);
    });
    return {
      key: query.key(key),
      refresh: function () { return refresh({ fresh: true }); },
      invalidate: function () { return invalidateQueries({ key: query.key(key) }); },
      destroy: function () {
        destroyed = true;
        if (typeof unsubscribe === 'function') unsubscribe();
      }
    };
  }

  var cards = {
    bind: bindCard
  };

  function debounceInput(inputOrSelector, cb, ms) {
    var input = typeof inputOrSelector === 'string' ? document.querySelector(inputOrSelector) : inputOrSelector;
    var timer = null;
    if (!input) return function () {};
    var handler = function (event) {
      clearTimeout(timer);
      timer = setTimeout(function () { cb(event.target.value, event); }, ms || 250);
    };
    input.addEventListener('input', handler);
    return function () { input.removeEventListener('input', handler); };
  }

  function selection(rootOrSelector, options) {
    var root = typeof rootOrSelector === 'string' ? document.querySelector(rootOrSelector) : rootOrSelector;
    options = options || {};
    var stateKey = options.stateKey || ('selection:' + (options.key || PAGE_SLUG || 'page'));
    var selected = new Set(getState(stateKey, []));
    function persist() { setState(stateKey, Array.from(selected)); }
    function toggle(id, checked) {
      if (!id) return;
      if (checked === undefined ? !selected.has(id) : checked) selected.add(String(id));
      else selected.delete(String(id));
      persist();
    }
    function bind() {
      if (!root) return;
      root.querySelectorAll('[data-select-id]').forEach(function (el) {
        var id = el.getAttribute('data-select-id');
        if ('checked' in el) el.checked = selected.has(id);
        el.addEventListener('change', function () { toggle(id, !!el.checked); });
      });
    }
    bind();
    return {
      selected: selected,
      values: function () { return Array.from(selected); },
      has: function (id) { return selected.has(String(id)); },
      toggle: toggle,
      clear: function () { selected.clear(); persist(); bind(); },
      bind: bind
    };
  }

  function select(selectOrSelector, options) {
    var el = typeof selectOrSelector === 'string' ? document.querySelector(selectOrSelector) : selectOrSelector;
    options = options || {};
    if (!el) return { value: function () { return undefined; }, setValue: function () {}, setOptions: function () {}, destroy: function () {} };
    if (typeof el._erpaiSelectCleanup === 'function') el._erpaiSelectCleanup();
    var stateKey = options.stateKey;
    var items = Array.isArray(options.options) ? options.options : [];
    var getOptionValue = options.valueKey
      ? function (item) { return item && typeof item === 'object' ? item[options.valueKey] : item; }
      : (options.valueFor || function (item) {
        return item && typeof item === 'object' ? (item.value ?? item.id ?? item._id ?? item.key ?? item.name ?? '') : item;
      });
    var getOptionLabel = options.labelKey
      ? function (item) { return item && typeof item === 'object' ? item[options.labelKey] : item; }
      : (options.labelFor || function (item) {
        return item && typeof item === 'object' ? (item.label ?? item.name ?? item.title ?? item.value ?? item.id ?? item._id ?? item.key ?? '') : item;
      });
    function currentValue() {
      if (options.value !== undefined) return options.value;
      if (stateKey) return getState(stateKey, el.value || '');
      return el.value || '';
    }
    function render(nextItems, nextValue) {
      if (Array.isArray(nextItems)) items = nextItems;
      var value = nextValue !== undefined ? nextValue : currentValue();
      preserveFocus(function () {
        el.innerHTML = '';
        if (options.placeholder !== undefined) {
          var placeholder = document.createElement('option');
          placeholder.value = options.placeholderValue !== undefined ? String(options.placeholderValue) : '';
          placeholder.textContent = String(options.placeholder);
          if (options.placeholderDisabled !== false) placeholder.disabled = true;
          el.appendChild(placeholder);
        }
        items.forEach(function (item) {
          var option = document.createElement('option');
          option.value = String(getOptionValue(item) ?? '');
          option.textContent = String(getOptionLabel(item) ?? '');
          if (item && typeof item === 'object' && item.disabled) option.disabled = true;
          el.appendChild(option);
        });
        el.value = value !== undefined && value !== null ? String(value) : '';
      });
    }
    var handler = function (event) {
      if (stateKey) setState(stateKey, event.target.value);
      if (typeof options.onChange === 'function') options.onChange(event.target.value, event);
    };
    render(items);
    el.addEventListener('change', handler);
    el._erpaiSelectCleanup = function () { el.removeEventListener('change', handler); };
    return {
      value: function () { return el.value; },
      setValue: function (value) {
        el.value = value !== undefined && value !== null ? String(value) : '';
        if (stateKey) setState(stateKey, el.value);
      },
      setOptions: function (nextItems, value) { render(nextItems, value); },
      destroy: function () {
        if (typeof el._erpaiSelectCleanup === 'function') el._erpaiSelectCleanup();
        el._erpaiSelectCleanup = null;
      }
    };
  }

  function debugMetrics() {
    return JSON.parse(JSON.stringify(_debugMetrics));
  }

  function debugOverlay() {
    var id = 'erpai-debug-overlay';
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement('pre');
      el.id = id;
      el.style.cssText = 'position:fixed;right:12px;bottom:12px;z-index:99999;max-width:420px;max-height:280px;overflow:auto;padding:10px;border:1px solid #ccc;background:rgba(255,255,255,.95);color:#111;font:11px/1.35 monospace;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,.18)';
      document.body.appendChild(el);
    }
    function render() {
      el.textContent = JSON.stringify(debugMetrics(), null, 2);
    }
    render();
    return setInterval(render, 1000);
  }

  // ===== PAGE STATE =====
  // Durable per-page state. Use for personal UI state that should survive
  // custom page iframe remounts, route changes, and browser refreshes.

  var PAGE_STATE_PREFIX = 'erpai:custom-page-state:v1';
  var PAGE_STATE_DB = 'erpai-custom-page-state-v1';
  var PAGE_STATE_STORE = 'entries';
  var _stateDbPromise = null;

  function encodeStateSegment(value) {
    return encodeURIComponent(String(value || '').trim() || '_');
  }

  function pageStateScope() {
    var pageKey = PAGE_SLUG || PAGE_ID || 'page';
    return [
      PAGE_STATE_PREFIX,
      encodeStateSegment(APP_ID || 'app'),
      encodeStateSegment(BRANCH_ID || 'main'),
      encodeStateSegment(pageKey)
    ].join(':');
  }

  function stateStorageKey(key) {
    return pageStateScope() + ':' + encodeStateSegment(key || 'default');
  }

  function getState(key, fallback) {
    try {
      var raw = window.localStorage.getItem(stateStorageKey(key));
      if (raw == null) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function setState(key, value) {
    try {
      if (value === undefined) {
        window.localStorage.removeItem(stateStorageKey(key));
      } else {
        window.localStorage.setItem(stateStorageKey(key), JSON.stringify(value));
      }
    } catch (err) {}
    return value;
  }

  function canUseIndexedState() {
    return !!(window.indexedDB && typeof window.indexedDB.open === 'function');
  }

  function openStateDb() {
    if (!canUseIndexedState()) return Promise.resolve(null);
    if (_stateDbPromise) return _stateDbPromise;
    _stateDbPromise = new Promise(function (resolve, reject) {
      var request = window.indexedDB.open(PAGE_STATE_DB, 1);
      request.onupgradeneeded = function () {
        var db = request.result;
        if (!db.objectStoreNames.contains(PAGE_STATE_STORE)) {
          db.createObjectStore(PAGE_STATE_STORE);
        }
      };
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error || new Error('IndexedDB unavailable')); };
      request.onblocked = function () { reject(new Error('IndexedDB upgrade blocked')); };
    }).catch(function (err) {
      _stateDbPromise = null;
      throw err;
    });
    return _stateDbPromise;
  }

  function idbRequest(request) {
    return new Promise(function (resolve, reject) {
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error || new Error('IndexedDB request failed')); };
    });
  }

  function isBlobStateValue(value) {
    return (
      (typeof Blob !== 'undefined' && value instanceof Blob) ||
      (typeof File !== 'undefined' && value instanceof File) ||
      (typeof FileList !== 'undefined' && value instanceof FileList)
    );
  }

  function containsBinaryState(value, seen) {
    if (!value || typeof value !== 'object') return false;
    if (isBlobStateValue(value)) return true;
    if (!seen && typeof WeakSet !== 'undefined') seen = new WeakSet();
    if (seen) {
      if (seen.has(value)) return false;
      seen.add(value);
    }
    if (Array.isArray(value)) {
      return value.some(function (item) { return containsBinaryState(item, seen); });
    }
    return Object.keys(value).some(function (k) { return containsBinaryState(value[k], seen); });
  }

  function normalizeStateValue(value) {
    if (typeof FileList !== 'undefined' && value instanceof FileList) {
      return Array.prototype.slice.call(value);
    }
    return value;
  }

  async function getStateAsync(key, fallback) {
    try {
      var db = await openStateDb();
      if (!db) return getState(key, fallback);
      var tx = db.transaction(PAGE_STATE_STORE, 'readonly');
      var entry = await idbRequest(tx.objectStore(PAGE_STATE_STORE).get(stateStorageKey(key)));
      if (!entry || !Object.prototype.hasOwnProperty.call(entry, 'value')) {
        return getState(key, fallback);
      }
      return entry.value;
    } catch (err) {
      return getState(key, fallback);
    }
  }

  async function setStateAsync(key, value) {
    var normalized = normalizeStateValue(value);
    if (normalized === undefined) {
      await removeStateAsync(key);
      return normalized;
    }
    try {
      var db = await openStateDb();
      if (!db) {
        setState(key, normalized);
        return normalized;
      }
      var tx = db.transaction(PAGE_STATE_STORE, 'readwrite');
      await idbRequest(tx.objectStore(PAGE_STATE_STORE).put({
        scope: pageStateScope(),
        value: normalized,
        updatedAt: Date.now()
      }, stateStorageKey(key)));
      if (containsBinaryState(normalized)) {
        try { window.localStorage.removeItem(stateStorageKey(key)); } catch (err) {}
      } else {
        setState(key, normalized);
      }
    } catch (err) {
      if (!containsBinaryState(normalized)) setState(key, normalized);
    }
    return normalized;
  }

  async function patchStateAsync(key, patch) {
    var current = await getStateAsync(key, {});
    var base = current && typeof current === 'object' && !Array.isArray(current) ? current : {};
    var patchValue = typeof patch === 'function' ? patch(current) : patch;
    var next = Object.assign({}, base, patchValue || {});
    await setStateAsync(key, next);
    return next;
  }

  async function removeStateAsync(key) {
    try { window.localStorage.removeItem(stateStorageKey(key)); } catch (err) {}
    try {
      var db = await openStateDb();
      if (!db) return;
      var tx = db.transaction(PAGE_STATE_STORE, 'readwrite');
      await idbRequest(tx.objectStore(PAGE_STATE_STORE).delete(stateStorageKey(key)));
    } catch (err) {}
  }

  function clearLocalState() {
    var prefix = pageStateScope() + ':';
    try {
      for (var i = window.localStorage.length - 1; i >= 0; i--) {
        var key = window.localStorage.key(i);
        if (key && key.indexOf(prefix) === 0) {
          window.localStorage.removeItem(key);
        }
      }
    } catch (err) {}
  }

  async function clearIndexedState() {
    var prefix = pageStateScope() + ':';
    try {
      var db = await openStateDb();
      if (!db) return;
      var tx = db.transaction(PAGE_STATE_STORE, 'readonly');
      var store = tx.objectStore(PAGE_STATE_STORE);
      var keys = await idbRequest(store.getAllKeys());
      var deleteTx = db.transaction(PAGE_STATE_STORE, 'readwrite');
      var deleteStore = deleteTx.objectStore(PAGE_STATE_STORE);
      await Promise.all(keys.filter(function (key) {
        return String(key).indexOf(prefix) === 0;
      }).map(function (key) {
        return idbRequest(deleteStore.delete(key));
      }));
    } catch (err) {}
  }

  async function clearStateAsync() {
    clearLocalState();
    await clearIndexedState();
  }

  function patchState(key, patch) {
    var current = getState(key, {});
    var base = current && typeof current === 'object' && !Array.isArray(current) ? current : {};
    var patchValue = typeof patch === 'function' ? patch(current) : patch;
    var next = Object.assign({}, base, patchValue || {});
    setState(key, next);
    return next;
  }

  function removeState(key) {
    try {
      window.localStorage.removeItem(stateStorageKey(key));
    } catch (err) {}
    removeStateAsync(key);
  }

  function clearState() {
    clearLocalState();
    clearIndexedState();
  }

  var state = {
    get: getState,
    set: setState,
    patch: patchState,
    remove: removeState,
    clear: clearState,
    getAsync: getStateAsync,
    setAsync: setStateAsync,
    patchAsync: patchStateAsync,
    removeAsync: removeStateAsync,
    clearAsync: clearStateAsync,
    key: stateStorageKey,
    scope: pageStateScope
  };

  // ===== DOM INPUT PERSISTENCE =====
  // Auto-saves custom page form controls, including File objects via IndexedDB.

  function resolvePersistRoot(root) {
    if (!root) return document;
    if (typeof root === 'string') return document.querySelector(root);
    return root;
  }

  function getAttr(el, name) {
    return el && typeof el.getAttribute === 'function' ? el.getAttribute(name) : null;
  }

  function isOptedOutOfPersistence(el) {
    if (!el) return true;
    if (getAttr(el, 'data-erpai-persist') === 'false' || getAttr(el, 'data-persist') === 'false') return true;
    if (typeof el.closest === 'function' && el.closest('[data-erpai-persist="false"],[data-persist="false"]')) return true;
    return false;
  }

  function isPersistableInput(el) {
    if (!el || isOptedOutOfPersistence(el)) return false;
    var tag = String(el.tagName || '').toLowerCase();
    if (el.isContentEditable) return true;
    if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') return false;
    var type = String(el.type || '').toLowerCase();
    return ['button', 'submit', 'reset', 'image', 'password'].indexOf(type) === -1;
  }

  function elementIndexAmongSiblings(el) {
    var index = 0;
    var cursor = el;
    while ((cursor = cursor.previousElementSibling)) {
      if (cursor.tagName === el.tagName) index++;
    }
    return index;
  }

  function elementPath(el, root) {
    var parts = [];
    var cursor = el;
    while (cursor && cursor !== root && cursor !== document && cursor !== document.body && parts.length < 6) {
      var tag = String(cursor.tagName || 'node').toLowerCase();
      parts.unshift(tag + ':' + elementIndexAmongSiblings(cursor));
      cursor = cursor.parentElement;
    }
    return parts.join('/');
  }

  function formPersistenceKey(el, root) {
    var form = el.form || (typeof el.closest === 'function' ? el.closest('form') : null);
    if (!form) return 'page';
    return (
      getAttr(form, 'data-persist-key') ||
      getAttr(form, 'data-state-key') ||
      form.id ||
      form.name ||
      elementPath(form, root)
    );
  }

  function fieldPersistenceKey(el, root) {
    var type = String(el.type || '').toLowerCase();
    if (type === 'radio' && el.name) return 'radio:' + el.name;
    return (
      getAttr(el, 'data-persist-key') ||
      getAttr(el, 'data-state-key') ||
      getAttr(el, 'data-col') ||
      el.name ||
      el.id ||
      getAttr(el, 'aria-label') ||
      el.placeholder ||
      elementPath(el, root)
    );
  }

  function inputPersistenceKey(el, opts) {
    opts = opts || {};
    var root = resolvePersistRoot(opts.root) || document;
    var prefix = opts.keyPrefix || 'dom';
    return prefix + ':' + formPersistenceKey(el, root) + ':' + fieldPersistenceKey(el, root);
  }

  function queryPersistableInputs(root) {
    root = resolvePersistRoot(root) || document;
    var selector = 'input, textarea, select, [contenteditable="true"], [contenteditable=""]';
    var nodes = [];
    if (typeof root.matches === 'function' && root.matches(selector)) nodes.push(root);
    if (typeof root.querySelectorAll === 'function') {
      nodes = nodes.concat(Array.prototype.slice.call(root.querySelectorAll(selector)));
    }
    return nodes.filter(isPersistableInput);
  }

  function serializeFile(file) {
    return {
      name: file.name || 'file',
      type: file.type || 'application/octet-stream',
      size: file.size || 0,
      lastModified: file.lastModified || Date.now(),
      file: file
    };
  }

  function readPersistedInputValue(el) {
    var tag = String(el.tagName || '').toLowerCase();
    var type = String(el.type || '').toLowerCase();
    if (el.isContentEditable) return { type: 'contenteditable', html: el.innerHTML || '' };
    if (tag === 'select' && el.multiple) {
      return Array.prototype.slice.call(el.options).filter(function (opt) { return opt.selected; }).map(function (opt) { return opt.value; });
    }
    if (type === 'checkbox') return !!el.checked;
    if (type === 'radio') return el.checked ? el.value : getState(inputPersistenceKey(el), '');
    if (type === 'file') {
      return {
        type: 'file-list',
        multiple: !!el.multiple,
        accept: el.accept || '',
        files: Array.prototype.slice.call(el.files || []).map(serializeFile)
      };
    }
    return el.value;
  }

  function fileFromPersistedRecord(record) {
    if (!record) return null;
    if (typeof File !== 'undefined' && record instanceof File) return record;
    var source = record.file || record.blob || record;
    var name = record.name || (source && source.name) || 'file';
    var type = record.type || (source && source.type) || 'application/octet-stream';
    var lastModified = record.lastModified || (source && source.lastModified) || Date.now();
    if (typeof Blob !== 'undefined' && source instanceof Blob) {
      if (typeof File !== 'undefined') return new File([source], name, { type: type, lastModified: lastModified });
      return source;
    }
    return null;
  }

  function normalizePersistedFiles(value) {
    var records = value && value.type === 'file-list' ? value.files : value;
    if (!Array.isArray(records)) records = records ? [records] : [];
    return records.map(fileFromPersistedRecord).filter(Boolean);
  }

  function setInputFiles(input, files) {
    var normalized = normalizePersistedFiles(files);
    input.__erpaiPersistedFiles = normalized;
    input.dataset.erpaiPersistedFileCount = String(normalized.length);
    if (!normalized.length) return false;
    try {
      if (typeof DataTransfer !== 'undefined') {
        var dt = new DataTransfer();
        normalized.forEach(function (file) { dt.items.add(file); });
        input.files = dt.files;
        return true;
      }
    } catch (err) {}
    return false;
  }

  function getPersistedInputFiles(inputOrSelector) {
    var input = typeof inputOrSelector === 'string' ? document.querySelector(inputOrSelector) : inputOrSelector;
    if (!input) return [];
    var liveFiles = Array.prototype.slice.call(input.files || []);
    if (liveFiles.length) return liveFiles;
    return input.__erpaiPersistedFiles || [];
  }

  function applyPersistedInputValue(el, value) {
    var tag = String(el.tagName || '').toLowerCase();
    var type = String(el.type || '').toLowerCase();
    if (value === undefined) return;
    if (el.isContentEditable) {
      el.innerHTML = value && typeof value === 'object' && 'html' in value ? value.html || '' : String(value || '');
    } else if (type === 'file') {
      setInputFiles(el, value);
    } else if (type === 'checkbox') {
      el.checked = !!value;
    } else if (type === 'radio') {
      el.checked = value != null && String(el.value) === String(value);
    } else if (tag === 'select' && el.multiple && Array.isArray(value)) {
      Array.prototype.slice.call(el.options).forEach(function (opt) {
        opt.selected = value.map(String).indexOf(String(opt.value)) !== -1;
      });
    } else {
      el.value = value == null ? '' : String(value);
    }
  }

  function dispatchPersistedInputEvents(el) {
    if (String(el.type || '').toLowerCase() === 'file') {
      try {
        el.dispatchEvent(new CustomEvent('erpai:persisted-files-restored', {
          bubbles: true,
          detail: { files: getPersistedInputFiles(el) }
        }));
      } catch (err) {
        try { el.dispatchEvent(new Event('erpai:persisted-files-restored', { bubbles: true })); } catch (err2) {}
      }
      return;
    }
    try { el.dispatchEvent(new Event('input', { bubbles: true })); } catch (err) {}
    try { el.dispatchEvent(new Event('change', { bubbles: true })); } catch (err) {}
  }

  async function restorePersistedInput(el, opts) {
    if (!isPersistableInput(el)) return;
    if (el.__erpaiPersistRestoreStarted) return;
    el.__erpaiPersistRestoreStarted = true;
    var key = inputPersistenceKey(el, opts);
    var value = await getStateAsync(key, undefined);
    if (value === undefined) return;
    applyPersistedInputValue(el, value);
    dispatchPersistedInputEvents(el);
  }

  function savePersistedInput(el, opts) {
    if (!isPersistableInput(el)) return;
    var key = inputPersistenceKey(el, opts);
    var value = readPersistedInputValue(el);
    if (String(el.type || '').toLowerCase() === 'file' || containsBinaryState(value)) {
      setStateAsync(key, value);
    } else {
      setState(key, value);
      setStateAsync(key, value);
    }
  }

  function restoreInputs(root, opts) {
    opts = opts || {};
    opts.root = root || opts.root;
    return Promise.all(queryPersistableInputs(root || opts.root).map(function (el) {
      return restorePersistedInput(el, opts);
    }));
  }

  function clearPersistedInputs(root, opts) {
    opts = opts || {};
    opts.root = root || opts.root;
    queryPersistableInputs(root || opts.root).forEach(function (el) {
      removeState(inputPersistenceKey(el, opts));
    });
  }

  function persistInputs(root, opts) {
    opts = opts || {};
    var resolvedRoot = resolvePersistRoot(root || opts.root) || document;
    opts.root = resolvedRoot;
    restoreInputs(resolvedRoot, opts);

    function handleInput(event) {
      var el = event.target;
      if (!isPersistableInput(el)) return;
      if (String(el.type || '').toLowerCase() === 'file') return;
      savePersistedInput(el, opts);
    }

    function handleChange(event) {
      var el = event.target;
      if (!isPersistableInput(el)) return;
      savePersistedInput(el, opts);
    }

    function handleReset(event) {
      if (opts.clearOnReset === false) return;
      setTimeout(function () { clearPersistedInputs(event.target, opts); }, 0);
    }

    resolvedRoot.addEventListener('input', handleInput, true);
    resolvedRoot.addEventListener('change', handleChange, true);
    resolvedRoot.addEventListener('reset', handleReset, true);

    var observer = null;
    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          Array.prototype.slice.call(mutation.addedNodes || []).forEach(function (node) {
            if (node && node.nodeType === 1) restoreInputs(node, opts);
          });
        });
      });
      var target = resolvedRoot === document ? (document.documentElement || document.body) : resolvedRoot;
      if (target) observer.observe(target, { childList: true, subtree: true });
    }

    return {
      restore: function () { return restoreInputs(resolvedRoot, opts); },
      clear: function () { return clearPersistedInputs(resolvedRoot, opts); },
      destroy: function () {
        resolvedRoot.removeEventListener('input', handleInput, true);
        resolvedRoot.removeEventListener('change', handleChange, true);
        resolvedRoot.removeEventListener('reset', handleReset, true);
        if (observer) observer.disconnect();
      }
    };
  }

  var _autoPersistController = null;
  function autoPersistPage(opts) {
    if (_autoPersistController) return _autoPersistController;
    opts = Object.assign({ keyPrefix: 'dom' }, opts || {});
    _autoPersistController = persistInputs(document, opts);
    return _autoPersistController;
  }

  function startAutoPersistPage() {
    if (cfg.autoPersist === false || window.__ERPAI_DISABLE_AUTO_PERSIST__ === true) return;
    autoPersistPage();
  }

  // ===== SECTION LOADING =====
  // Per-section loading states — avoids full-page spinner on data refresh.

  /**
   * Show a loading overlay on a specific section/container.
   * The container gets a spinner overlay while preserving existing content (no layout shift).
   * @param {string} containerId - Element ID
   */
  function sectionLoading(containerId) {
    var el = document.getElementById(containerId);
    if (el) el.classList.add('section-loading');
  }

  /** Remove loading overlay from a section */
  function sectionLoaded(containerId) {
    var el = document.getElementById(containerId);
    if (el) el.classList.remove('section-loading');
  }

  /**
   * Fade transition for content updates — dims content during fetch, restores after.
   * Prevents jarring innerHTML swaps. Usage:
   *   sectionUpdating('myTable');
   *   container.innerHTML = newHtml;
   *   sectionUpdated('myTable');
   */
  function sectionUpdating(containerId) {
    var el = document.getElementById(containerId);
    if (el) el.classList.add('section-fade', 'updating');
  }

  function sectionUpdated(containerId) {
    var el = document.getElementById(containerId);
    if (el) el.classList.remove('updating');
  }

  // ===== SKELETON GENERATORS =====
  // Generate placeholder HTML that matches the shape of real content.

  var skeleton = {};

  /** Generate N skeleton stat cards */
  skeleton.stats = function (count) {
    if (!count) count = 4;
    var html = '';
    for (var i = 0; i < count; i++) {
      html +=
        '<div class="stat-card-skeleton">' +
          '<div class="skeleton skeleton-text" style="width:60%;"></div>' +
          '<div class="skeleton skeleton-stat-value"></div>' +
          '<div class="skeleton skeleton-stat-sub"></div>' +
        '</div>';
    }
    return html;
  };

  /** Generate a skeleton table with N rows and M columns */
  skeleton.table = function (rows, cols) {
    if (!rows) rows = 5;
    if (!cols) cols = 4;
    var html = '<div class="table-wrap"><table class="data-table"><thead><tr>';
    for (var c = 0; c < cols; c++) {
      html += '<th><div class="skeleton skeleton-text" style="width:' + (60 + Math.random() * 30) + '%;margin:0;"></div></th>';
    }
    html += '</tr></thead><tbody>';
    for (var r = 0; r < rows; r++) {
      html += '<tr>';
      for (var c2 = 0; c2 < cols; c2++) {
        html += '<td><div class="skeleton skeleton-text" style="width:' + (40 + Math.random() * 50) + '%;margin:0;"></div></td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table></div>';
    return html;
  };

  /** Generate a skeleton chart area */
  skeleton.chart = function () {
    return '<div class="skeleton skeleton-chart"></div>';
  };

  // ===== TAB MANAGER =====
  // Manages tab state, lazy-loads tab content, caches loaded tabs.

  /**
   * Initialize tabs with lazy loading.
   * @param {object} opts
   * @param {string} opts.containerId - Container with .tabs and tab content divs
   * @param {Array<{id: string, label: string, render: function}>} opts.tabs - Tab definitions
   * @param {string} [opts.defaultTab] - Initial active tab ID (defaults to first)
   */
  function initTabs(opts) {
    var container = document.getElementById(opts.containerId);
    if (!container) return;

    var tabs = opts.tabs;
    var activeTab = opts.defaultTab || tabs[0].id;
    var loadedTabs = {};

    // Build tab bar
    var tabBar = container.querySelector('.tabs');
    if (!tabBar) {
      tabBar = document.createElement('div');
      tabBar.className = 'tabs';
      container.insertBefore(tabBar, container.firstChild);
    }

    tabBar.innerHTML = tabs.map(function (t) {
      return '<div class="tab' + (t.id === activeTab ? ' active' : '') + '" data-tab="' + t.id + '">' + esc(t.label) + '</div>';
    }).join('');

    // Ensure content divs exist
    tabs.forEach(function (t) {
      var div = container.querySelector('[data-tab-content="' + t.id + '"]');
      if (!div) {
        div = document.createElement('div');
        div.setAttribute('data-tab-content', t.id);
        container.appendChild(div);
      }
      div.style.display = t.id === activeTab ? '' : 'none';
    });

    // Tab click handlers
    tabBar.addEventListener('click', function (e) {
      var tabEl = e.target.closest('.tab');
      if (!tabEl) return;
      var tabId = tabEl.dataset.tab;
      if (tabId === activeTab) return;

      // Update active state
      tabBar.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
      tabEl.classList.add('active');

      // Show/hide content
      tabs.forEach(function (t) {
        var div = container.querySelector('[data-tab-content="' + t.id + '"]');
        if (div) div.style.display = t.id === tabId ? '' : 'none';
      });

      activeTab = tabId;

      // Lazy load if not yet loaded
      if (!loadedTabs[tabId]) {
        var tabDef = tabs.find(function (t) { return t.id === tabId; });
        if (tabDef && tabDef.render) {
          loadedTabs[tabId] = true;
          tabDef.render(container.querySelector('[data-tab-content="' + tabId + '"]'));
        }
      }
    });

    // Load initial tab
    var initialTab = tabs.find(function (t) { return t.id === activeTab; });
    if (initialTab && initialTab.render) {
      loadedTabs[activeTab] = true;
      initialTab.render(container.querySelector('[data-tab-content="' + activeTab + '"]'));
    }

    // Return API to programmatically switch tabs or reload
    return {
      switchTo: function (tabId) {
        var tabEl = tabBar.querySelector('[data-tab="' + tabId + '"]');
        if (tabEl) tabEl.click();
      },
      reload: function (tabId) {
        loadedTabs[tabId] = false;
        var tabDef = tabs.find(function (t) { return t.id === tabId; });
        if (tabDef && tabDef.render && tabId === activeTab) {
          loadedTabs[tabId] = true;
          tabDef.render(container.querySelector('[data-tab-content="' + tabId + '"]'));
        }
      },
      getActive: function () { return activeTab; }
    };
  }

  // ===== PARALLEL DATA LOADING =====

  /**
   * Load multiple data sources in parallel, rendering each section as it resolves.
   * Prevents the "everything loads at once" waterfall.
   * @param {Array<{id: string, fetch: function, render: function, skeleton?: string}>} sections
   */
  function loadSections(sections) {
    sections.forEach(function (section) {
      var el = document.getElementById(section.id);
      if (!el) return;

      // Show skeleton placeholder immediately
      if (section.skeleton) {
        el.innerHTML = section.skeleton;
      } else {
        sectionLoading(section.id);
      }

      // Fetch and render independently
      section.fetch().then(function (data) {
        sectionLoaded(section.id);
        section.render(el, data);
      }).catch(function (err) {
        sectionLoaded(section.id);
        el.innerHTML = '<div class="error-container" style="padding:16px;"><p>' + esc(err.message) + '</p></div>';
      });
    });
  }

  // ===== PUBLIC API =====
  // ===== PREFETCH / HYDRATION =====

  /** Pre-fetched data injected by the server (page-hydration.service.ts) */
  var PREFETCHED = window.__ERPAI_DATA__ || null;

  /**
   * Get pre-fetched data by key.
   * Returns the data payload if available, or null.
   * Use this to avoid redundant API calls when the server already fetched the data.
   */
  function getData(key) {
    if (!PREFETCHED || !PREFETCHED[key]) return null;
    if (PREFETCHED[key].error) return null;
    return PREFETCHED[key].data;
  }

  /**
   * Check if a specific prefetch key exists and loaded successfully.
   */
  function hasData(key) {
    return !!(PREFETCHED && PREFETCHED[key] && !PREFETCHED[key].error);
  }

  /**
   * Render with prefetched data immediately, then refresh in background.
   * @param {string} key - The prefetch key from <script type="erpai/data">
   * @param {Function} fetcher - Async function that fetches fresh data
   * @param {Function} renderer - Function that renders data to the DOM
   * @returns {Promise<*>} The fresh data
   */
  async function withPrefetch(key, fetcher, renderer) {
    var prefetched = getData(key);
    if (prefetched) {
      renderer(prefetched);
    }
    var fresh = await fetcher();
    if (!prefetched || JSON.stringify(fresh) !== JSON.stringify(prefetched)) {
      renderer(fresh);
    }
    return fresh;
  }

  /**
   * Prefetch-aware runSQL. Checks __ERPAI_DATA__ for matching SQL results first.
   * Falls back to the API if not found.
   */
  var _originalRunSQL = runSQL;
  runSQL = async function runSQLWithPrefetch(query) {
    if (PREFETCHED) {
      var keys = Object.keys(PREFETCHED);
      for (var i = 0; i < keys.length; i++) {
        var entry = PREFETCHED[keys[i]];
        if (entry && entry._type === 'sql' && entry._query === query && !entry.error) {
          return entry.data;
        }
      }
    }
    return _originalRunSQL(query);
  };

  /**
   * Prefetch-aware getRecords. Checks __ERPAI_DATA__ for matching table results first.
   */
  var _originalGetRecords = getRecords;
  getRecords = async function getRecordsWithPrefetch(tableId, pageNo, pageSize, filter) {
    // Only use prefetch for first page with no filters (the common dashboard case)
    if (PREFETCHED && (!pageNo || pageNo === 1) && !hasPagedRecordFilter(filter)) {
      var keys = Object.keys(PREFETCHED);
      for (var i = 0; i < keys.length; i++) {
        var entry = PREFETCHED[keys[i]];
        if (entry && entry._type === 'records' && entry._tableId === tableId && !entry.error) {
          // Hydrated data may be unwrapped array or full paginated object — normalize
          var d = entry.data;
          if (Array.isArray(d)) {
            return { totalCount: d.length, data: d, pageNo: 1, pageSize: d.length };
          }
          return d;
        }
      }
    }
    return _originalGetRecords(tableId, pageNo, pageSize, filter);
  };

  /**
   * Prefetch-aware getTable. Checks __ERPAI_DATA__ for matching table metadata first.
   */
  var _originalGetTable = getTable;
  getTable = async function getTableWithPrefetch(tableId) {
    if (PREFETCHED) {
      var keys = Object.keys(PREFETCHED);
      for (var i = 0; i < keys.length; i++) {
        var entry = PREFETCHED[keys[i]];
        if (entry && entry._type === 'table' && entry._tableId === tableId && !entry.error) {
          return entry.data;
        }
      }
    }
    return _originalGetTable(tableId);
  };

  /**
   * Invalidate the server-side page data cache for this app.
   * @param {string[]|{slugs?: string[], tableIds?: string[], tags?: string[]}} [target]
   * Specific page slugs, table dependencies, or tags to invalidate. If omitted,
   * invalidates all hydrated custom pages for the app.
   */
  async function invalidatePageCache(target) {
    var payload = { appId: APP_ID };
    if (Array.isArray(target)) {
      payload.slugs = target;
    } else if (target && typeof target === 'object') {
      if (Array.isArray(target.slugs)) payload.slugs = target.slugs;
      if (Array.isArray(target.tableIds)) payload.tableIds = target.tableIds;
      if (Array.isArray(target.tags)) payload.tags = target.tags;
    }
    return api('POST', '/v1/agent/app/custom-pages/invalidate-cache', {
      appId: payload.appId,
      slugs: payload.slugs || undefined,
      tableIds: payload.tableIds || undefined,
      tags: payload.tags || undefined
    });
  }

  /**
   * Decode a select-cell value to its option name.
   *
   * Select cells are 1-based index arrays. Records API: `[2]`. SQL view: `"[2]"`.
   * Both encode "the second option in this column's options array".
   *
   * @param {*} cellValue - The raw cell value (array, "[N]" string, or N).
   * @param {object} columnMeta - The column entry from `columnsMetaData` — must include `.options`.
   * @returns {string} The option name, or empty string if no match.
   */
  function selectName(cellValue, columnMeta) {
    if (cellValue == null || !columnMeta || !columnMeta.options) return '';
    var idx = null;
    if (Array.isArray(cellValue) && cellValue.length) {
      idx = parseInt(cellValue[0], 10);
    } else if (typeof cellValue === 'string') {
      var m = cellValue.match(/^\[(\d+)\]$/);
      if (m) idx = parseInt(m[1], 10);
      else if (/^\d+$/.test(cellValue)) idx = parseInt(cellValue, 10);
    } else if (typeof cellValue === 'number') {
      idx = cellValue;
    }
    if (!idx || idx < 1) return '';
    var opt = columnMeta.options[idx - 1];
    if (!opt) return '';
    return typeof opt === 'string' ? opt : (opt.name || opt.value || '');
  }

  /**
   * Join SQL aggregate rows to records-API records by a key.
   *
   * SQL views expose autoseq `id`, not MongoDB `_id`. Reference cells store `_id`.
   * So `JOIN parent_view ON child.parent_ref = parent_view.id` returns zero rows.
   * Workaround: aggregate in SQL grouped by the raw `_id`, then join here.
   *
   * @param {object[]} sqlRows - Output of `runSQL().rows`.
   * @param {string} sqlKey - Field on each sqlRow holding the parent _id.
   * @param {object[]} records - Output of `getRecords().data`.
   * @param {string} [recKey='_id'] - Field on each record to match against.
   * @returns {object[]} sqlRows with `.record` set to the matching record (or null).
   */
  function joinByKey(sqlRows, sqlKey, records, recKey) {
    recKey = recKey || '_id';
    if (!Array.isArray(sqlRows) || !Array.isArray(records)) return sqlRows || [];
    var map = Object.create(null);
    for (var i = 0; i < records.length; i++) {
      var r = records[i];
      if (r && r[recKey] != null) map[r[recKey]] = r;
    }
    return sqlRows.map(function (row) {
      var k = row && row[sqlKey];
      return Object.assign({}, row, { record: (k != null ? map[k] : null) || null });
    });
  }

  /**
   * renderInsights(spec, mountEl) — render the Table Insights v2 strip from an
   * InsightsSpec v1 object against window.__ERPAI_DATA__ (hydrated by the backend).
   *
   * Spec shape (v1):
   *   { version:1, layout:'cards', data:{...}, items:[
   *       { type:'stat', label, value:{ref,col}, format, delta?:{ref,col,goodWhen}, spark?:{ref,col} } ] }
   *
   * Refs resolve against window.__ERPAI_DATA__[ref].data.rows. Each card is wrapped
   * in try/catch so a single bad ref renders '—' rather than blanking the strip.
   */
  function renderInsights(spec, mountEl) {
    var el = mountEl || document.getElementById('erpai-insights');
    if (!el || !spec) return;

    // Resolve a scalar value from a ref/col (CONTRACT section 3).
    function resolveScalar(ref, col) {
      var d = window.__ERPAI_DATA__ && window.__ERPAI_DATA__[ref];
      return d && d.data && d.data.rows && d.data.rows[0] ? d.data.rows[0][col] : null;
    }

    // Resolve a series array from a ref/col (CONTRACT section 3).
    function resolveSeries(ref, col) {
      var d = window.__ERPAI_DATA__ && window.__ERPAI_DATA__[ref];
      var rows = (d && d.data && d.data.rows) ? d.data.rows : [];
      return rows.map(function (r) { return r[col]; });
    }

    // ── Theme tokens (harvested shadcn vars; resolve live in the iframe) ──────
    var CARD_BG = 'hsl(var(--card))';
    var BORDER = 'hsl(var(--border))';
    var FG = 'hsl(var(--foreground))';
    var MUTED = 'hsl(var(--muted-foreground))';
    var GREEN = 'hsl(var(--chart-2))';
    var RED = 'hsl(var(--destructive))';
    var GREEN_BG = 'hsl(var(--chart-2) / 0.14)';
    var RED_BG = 'hsl(var(--destructive) / 0.14)';
    var DOT_HUES = [
      'hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))',
      'hsl(var(--chart-4))', 'hsl(var(--chart-5))'
    ];
    // Threshold (conditional-formatting) tones → subtle background wash only.
    // No accent line/border (design feedback: the left line looked bad).
    var TONE = {
      good: { wash: 'hsl(var(--chart-2) / 0.10)' },
      warn: { wash: 'hsl(var(--chart-4) / 0.12)' },
      bad:  { wash: 'hsl(var(--destructive) / 0.10)' }
    };
    function clampScale(value, min, max) {
      var n = Number(value);
      if (!isFinite(n)) return 1;
      return Math.max(min, Math.min(max, Math.round(n * 20) / 20));
    }
    function clampContentScale(value) {
      return clampScale(value, 0.5, 2);
    }
    function clampValueScale(value) {
      return clampScale(value, 0.6, 2.5);
    }
    function scalePxString(value, scale) {
      if (!value || scale === 1) return value;
      var m = String(value).trim().match(/^(-?\d+(?:\.\d+)?)px$/);
      if (!m) return value;
      return (Math.round(Number(m[1]) * scale * 100) / 100) + 'px';
    }
    function scaleInlinePx(el, prop, scale) {
      var current = el.style && el.style[prop];
      var next = scalePxString(current, scale);
      if (next && next !== current) el.style[prop] = next;
    }
    function scaleAttr(el, attr, scale) {
      if (!el || !el.getAttribute || scale === 1) return;
      var current = el.getAttribute(attr);
      if (!current || !/^-?\d+(?:\.\d+)?$/.test(current)) return;
      el.setAttribute(attr, String(Math.round(Number(current) * scale * 100) / 100));
    }
    function applyContentScale(tile, item) {
      var scale = clampContentScale(item && item.size && item.size.scale);
      tile.setAttribute('data-erpai-insight-scale', String(scale));
      if (scale === 1) return;
      var props = [
        'fontSize', 'gap', 'rowGap', 'columnGap',
        'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
        'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
        'minHeight', 'width', 'height'
      ];
      var nodes = [tile].concat(Array.prototype.slice.call(tile.querySelectorAll('*')));
      for (var ni = 0; ni < nodes.length; ni++) {
        var n = nodes[ni];
        for (var pi = 0; pi < props.length; pi++) scaleInlinePx(n, props[pi], scale);
        scaleAttr(n, 'width', scale);
        scaleAttr(n, 'height', scale);
      }
    }
    function applyValueScale(tile, item) {
      var scale = clampValueScale(item && item.size && item.size.valueScale);
      tile.setAttribute('data-erpai-insight-value-scale', String(scale));
      if (scale === 1) return;
      var values = tile.querySelectorAll('[data-erpai-insight-value]');
      for (var i = 0; i < values.length; i++) {
        scaleInlinePx(values[i], 'fontSize', scale);
      }
    }
    function resolveTone(value, thresholds) {
      if (value == null || !thresholds || !thresholds.length) return null;
      for (var ti = 0; ti < thresholds.length; ti++) {
        var t = thresholds[ti]; var v = Number(t.value);
        if (t.op === '>=' && value >= v) return t.tone;
        if (t.op === '>'  && value >  v) return t.tone;
        if (t.op === '<=' && value <= v) return t.tone;
        if (t.op === '<'  && value <  v) return t.tone;
        if (t.op === '='  && value === v) return t.tone;
      }
      return null;
    }

    // ── Locale-aware, magnitude-aware formatting ─────────────────────────────
    // Millions of rows produce crore/million-scale values — so currency must
    // carry its own symbol + grouping (₹48.6 Cr for INR, $48.6M for USD) and
    // big numbers compact while small ones stay exact. The currency CODE rides
    // on the spec item (item.currency), set server-side by compileInsights.
    var LOCALE_BY_CCY = {
      INR: 'en-IN', USD: 'en-US', GBP: 'en-GB', EUR: 'en-IE', JPY: 'ja-JP',
      CNY: 'zh-CN', AUD: 'en-AU', CAD: 'en-CA', SGD: 'en-SG', AED: 'en-AE',
      CHF: 'de-CH', HKD: 'en-HK', ZAR: 'en-ZA', BRL: 'pt-BR', MXN: 'es-MX',
      RUB: 'ru-RU', KRW: 'ko-KR', NZD: 'en-NZ', SEK: 'sv-SE', NOK: 'nb-NO'
    };
    function localeForCcy(code) { return (code && LOCALE_BY_CCY[code]) || undefined; }
    var COMPACT_AT = 100000; // below this, currency/number stay exact

    function intlFmt(value, locale, opts) {
      return new Intl.NumberFormat(locale, opts).format(value);
    }

    // The hero value — abbreviated when large, exact when small.
    function formatHero(value, item) {
      var fmt = item.format;
      var code = item.currency;
      var loc = localeForCcy(code);
      try {
        if (fmt === 'percent') return fmtPct(value);
        if (fmt === 'duration') return fmtNum(value) + 'd';
        if (fmt === 'currency') {
          var big = Math.abs(Number(value)) >= COMPACT_AT;
          var o = code
            ? { style: 'currency', currency: code, maximumFractionDigits: big ? 2 : 0, minimumFractionDigits: 0 }
            : { maximumFractionDigits: big ? 1 : 0 };
          if (big) o.notation = 'compact';
          return intlFmt(value, loc, o);
        }
        if (fmt === 'compact') return intlFmt(value, loc, { notation: 'compact', maximumFractionDigits: 1 });
        return intlFmt(value, loc, { maximumFractionDigits: 0 }); // number → grouped
      } catch (e) {
        if (fmt === 'currency') return (code ? '' : '') + compactNumber(value);
        if (fmt === 'compact') return compactNumber(value);
        if (fmt === 'percent') return fmtPct(value);
        if (fmt === 'duration') return fmtNum(value) + 'd';
        return fmtNum(value);
      }
    }

    // The full-precision figure shown under an abbreviated hero (and as a tooltip).
    function formatExact(value, item) {
      var code = item.currency;
      var loc = localeForCcy(code);
      try {
        if (code) return intlFmt(value, loc, { style: 'currency', currency: code, maximumFractionDigits: 2, minimumFractionDigits: 0 });
        return intlFmt(value, loc, { maximumFractionDigits: 0 });
      } catch (e) { return String(value); }
    }

    // Show the exact subline only when the hero is abbreviated (would otherwise
    // hide precision a finance user wants).
    function shouldShowExact(value, item) {
      if (item.format === 'compact') return true;
      if (item.format === 'currency' && Math.abs(Number(value)) >= COMPACT_AT) return true;
      return false;
    }

    // Build a sparkline as an inline SVG polyline (62x20), min/max normalized.
    function buildSparkline(points, stroke) {
      var w = 62, h = 20, pad = 2;
      var min = Math.min.apply(null, points);
      var max = Math.max.apply(null, points);
      var range = max - min;
      var n = points.length;
      var coords = points.map(function (p, i) {
        var x = n > 1 ? (i / (n - 1)) * (w - pad * 2) + pad : pad;
        var y = range === 0
          ? h / 2
          : h - pad - ((p - min) / range) * (h - pad * 2);
        return (Math.round(x * 100) / 100) + ',' + (Math.round(y * 100) / 100);
      }).join(' ');
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', String(w));
      svg.setAttribute('height', String(h));
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      svg.style.display = 'block';
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      line.setAttribute('points', coords);
      line.setAttribute('fill', 'none');
      line.style.stroke = stroke;
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(line);
      return svg;
    }

    // Build one KPI tile: bordered card with a category dot + label, an
    // abbreviated hero value (+ exact subline), then a delta pill and sparkline.
    // Throwing is caught by the caller, which renders a '—' tile.
    function buildTile(item, idx) {
      var tile = document.createElement('div');
      tile.style.cssText = 'background:' + CARD_BG + ';border:1px solid ' + BORDER + ';border-radius:12px;'
        + 'padding:13px 15px;display:flex;flex-direction:column;gap:6px;min-width:0;box-sizing:border-box;';

      var labelRow = document.createElement('div');
      labelRow.style.cssText = 'display:flex;align-items:center;gap:7px;min-width:0;';
      var dot = document.createElement('span');
      dot.style.cssText = 'width:7px;height:7px;border-radius:2px;flex:none;background:' + DOT_HUES[idx % DOT_HUES.length] + ';';
      var labelEl = document.createElement('span');
      labelEl.textContent = item.label != null ? String(item.label) : '';
      labelEl.style.cssText = 'font-size:12px;color:' + MUTED + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      labelRow.appendChild(dot);
      labelRow.appendChild(labelEl);
      if (item.filter && item.filter.column) appendFilterHint(labelRow);

      var value = item.value ? resolveScalar(item.value.ref, item.value.col) : null;
      var heroEl = document.createElement('div');
      heroEl.setAttribute('data-erpai-insight-value', '');
      heroEl.style.cssText = 'font-size:23px;font-weight:600;line-height:1.1;letter-spacing:-0.01em;'
        + 'font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:'
        + (value == null ? MUTED : FG) + ';';
      heroEl.textContent = value == null ? '—' : formatHero(value, item);
      if (value != null) { try { heroEl.title = formatExact(value, item); } catch (e) {} }

      tile.appendChild(labelRow);
      tile.appendChild(heroEl);
      if (value == null) return tile;

      // Conditional formatting: tint the tile background by the first matching
      // threshold band. Wash only — NO accent line/border (per design feedback).
      var tone = resolveTone(value, item.thresholds);
      if (tone && TONE[tone]) {
        tile.style.background = TONE[tone].wash;
      }

      if (shouldShowExact(value, item)) {
        var sub = document.createElement('div');
        sub.style.cssText = 'font-size:11px;color:' + MUTED + ';font-variant-numeric:tabular-nums;'
          + 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
        sub.textContent = formatExact(value, item);
        tile.appendChild(sub);
      }

      var footer = document.createElement('div');
      footer.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:2px;min-height:20px;';
      var hasFooter = false;

      if (item.delta) {
        var prev = resolveScalar(item.delta.ref, item.delta.col);
        if (prev) {
          var pct = (value - prev) / prev;
          var up = pct >= 0;
          var good = up === (item.delta.goodWhen === 'up');
          var pill = document.createElement('span');
          pill.style.cssText = 'font-size:12px;font-weight:600;white-space:nowrap;padding:2px 7px;border-radius:999px;'
            + 'color:' + (good ? GREEN : RED) + ';background:' + (good ? GREEN_BG : RED_BG) + ';';
          pill.textContent = (up ? '↑ ' : '↓ ') + fmtPct(Math.abs(pct) * 100);
          footer.appendChild(pill);
          hasFooter = true;
        }
      }

      if (item.spark) {
        var points = resolveSeries(item.spark.ref, item.spark.col).filter(function (p) {
          return p != null && !isNaN(p);
        }).map(Number);
        if (points.length >= 2) {
          var first = points[0];
          var last = points[points.length - 1];
          var stroke = last > first ? GREEN : (last < first ? RED : MUTED);
          var wrap = document.createElement('div');
          wrap.style.cssText = 'margin-left:auto;display:flex;';
          wrap.appendChild(buildSparkline(points, stroke));
          footer.appendChild(wrap);
          hasFooter = true;
        }
      }

      if (hasFooter) tile.appendChild(footer);
      attachFilterDrilldown(tile, item);
      return tile;
    }

    // Build a 'progress' tile: the measure vs a user-set target, as a value +
    // progress bar + % to goal. Stat-sized (1 column). Caught by the caller.
    function buildProgressTile(item, idx) {
      var FILL = {
        good: 'hsl(var(--chart-2))', warn: 'hsl(var(--chart-4))', bad: 'hsl(var(--destructive))'
      };
      var tile = document.createElement('div');
      tile.style.cssText = 'background:' + CARD_BG + ';border:1px solid ' + BORDER + ';border-radius:12px;'
        + 'padding:13px 15px;display:flex;flex-direction:column;gap:6px;min-width:0;box-sizing:border-box;';

      var labelRow = document.createElement('div');
      labelRow.style.cssText = 'display:flex;align-items:center;gap:7px;min-width:0;';
      var dot = document.createElement('span');
      dot.style.cssText = 'width:7px;height:7px;border-radius:2px;flex:none;background:' + DOT_HUES[idx % DOT_HUES.length] + ';';
      var labelEl = document.createElement('span');
      labelEl.textContent = item.label != null ? String(item.label) : '';
      labelEl.style.cssText = 'font-size:12px;color:' + MUTED + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      labelRow.appendChild(dot); labelRow.appendChild(labelEl);
      tile.appendChild(labelRow);

      var value = item.value ? resolveScalar(item.value.ref, item.value.col) : null;
      var target = (typeof item.target === 'number' && item.target > 0) ? item.target : null;

      var topRow = document.createElement('div');
      topRow.style.cssText = 'display:flex;align-items:baseline;gap:8px;min-width:0;';
      var heroEl = document.createElement('div');
      heroEl.setAttribute('data-erpai-insight-value', '');
      heroEl.style.cssText = 'font-size:23px;font-weight:600;line-height:1.1;letter-spacing:-0.01em;'
        + 'font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:'
        + (value == null ? MUTED : FG) + ';';
      heroEl.textContent = value == null ? '—' : formatHero(value, item);
      if (value != null) { try { heroEl.title = formatExact(value, item); } catch (e) {} }
      topRow.appendChild(heroEl);

      if (value == null || target == null) {
        tile.appendChild(topRow);
        return tile;
      }

      var ratio = value / target;
      var tone = resolveTone(value, item.thresholds);
      var fill = tone && FILL[tone] ? FILL[tone] : 'hsl(var(--chart-2))';

      var pctEl = document.createElement('span');
      pctEl.style.cssText = 'margin-left:auto;font-size:13px;font-weight:600;flex:none;'
        + 'font-variant-numeric:tabular-nums;color:' + fill + ';';
      pctEl.textContent = Math.round(ratio * 100) + '%';
      topRow.appendChild(pctEl);
      tile.appendChild(topRow);

      var trackEl = document.createElement('div');
      trackEl.style.cssText = 'height:6px;border-radius:3px;background:hsl(var(--muted));overflow:hidden;margin-top:2px;';
      var fillEl = document.createElement('div');
      fillEl.style.cssText = 'height:6px;border-radius:3px;background:' + fill + ';'
        + 'width:' + Math.max(0, Math.min(1, ratio)) * 100 + '%;';
      trackEl.appendChild(fillEl);
      tile.appendChild(trackEl);

      var goalEl = document.createElement('div');
      goalEl.style.cssText = 'font-size:11px;color:' + MUTED + ';font-variant-numeric:tabular-nums;'
        + 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      goalEl.textContent = 'Goal ' + formatExact(target, item);
      tile.appendChild(goalEl);

      return tile;
    }

    // A width-filling area chart (viewBox stretched, non-scaling stroke) from a
    // numeric series. Used by the 'trend' tile.
    function buildAreaChart(points) {
      var SVGNS = 'http://www.w3.org/2000/svg';
      var W = 100, H = 40, pad = 3;
      var min = Math.min.apply(null, points), max = Math.max.apply(null, points);
      var range = (max - min) || 1;
      var n = points.length;
      var coords = points.map(function (p, i) {
        var x = n > 1 ? (i / (n - 1)) * (W - pad * 2) + pad : W / 2;
        var y = H - pad - ((p - min) / range) * (H - pad * 2);
        return [Math.round(x * 100) / 100, Math.round(y * 100) / 100];
      });
      var line = coords.map(function (c, i) { return (i === 0 ? 'M' : 'L') + c[0] + ',' + c[1]; }).join(' ');
      var area = line + ' L' + coords[n - 1][0] + ',' + H + ' L' + coords[0][0] + ',' + H + ' Z';
      var svg = document.createElementNS(SVGNS, 'svg');
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.style.cssText = 'width:100%;height:54px;display:block;margin-top:4px;overflow:visible;';
      var areaEl = document.createElementNS(SVGNS, 'path');
      areaEl.setAttribute('d', area);
      areaEl.setAttribute('fill', 'hsl(var(--chart-2) / 0.15)');
      var lineEl = document.createElementNS(SVGNS, 'path');
      lineEl.setAttribute('d', line);
      lineEl.setAttribute('fill', 'none');
      lineEl.style.stroke = 'hsl(var(--chart-2))';
      lineEl.setAttribute('stroke-width', '1.5');
      lineEl.setAttribute('vector-effect', 'non-scaling-stroke');
      lineEl.setAttribute('stroke-linejoin', 'round');
      lineEl.setAttribute('stroke-linecap', 'round');
      svg.appendChild(areaEl);
      svg.appendChild(lineEl);
      return svg;
    }

    // Build a 'trend' tile: the measure over time (monthly), as a current value
    // header + a width-filling area chart. Spans 2 columns. Caught by the caller.
    function buildTrendTile(item, idx) {
      var tile = document.createElement('div');
      tile.style.cssText = 'background:' + CARD_BG + ';border:1px solid ' + BORDER + ';border-radius:12px;'
        + 'padding:13px 15px;display:flex;flex-direction:column;gap:4px;min-width:0;box-sizing:border-box;';

      var labelRow = document.createElement('div');
      labelRow.style.cssText = 'display:flex;align-items:center;gap:7px;min-width:0;';
      var dot = document.createElement('span');
      dot.style.cssText = 'width:7px;height:7px;border-radius:2px;flex:none;background:' + DOT_HUES[idx % DOT_HUES.length] + ';';
      var labelEl = document.createElement('span');
      labelEl.textContent = item.label != null ? String(item.label) : '';
      labelEl.style.cssText = 'font-size:12px;color:' + MUTED + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      labelRow.appendChild(dot); labelRow.appendChild(labelEl);
      tile.appendChild(labelRow);

      var value = item.value ? resolveScalar(item.value.ref, item.value.col) : null;
      var heroEl = document.createElement('div');
      heroEl.setAttribute('data-erpai-insight-value', '');
      heroEl.style.cssText = 'font-size:23px;font-weight:600;line-height:1.1;letter-spacing:-0.01em;'
        + 'font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:'
        + (value == null ? MUTED : FG) + ';';
      heroEl.textContent = value == null ? '—' : formatHero(value, item);
      if (value != null) { try { heroEl.title = formatExact(value, item); } catch (e) {} }
      tile.appendChild(heroEl);

      var points = item.spark
        ? resolveSeries(item.spark.ref, item.spark.col).filter(function (p) { return p != null && !isNaN(p); }).map(Number)
        : [];
      if (points.length >= 2) {
        tile.appendChild(buildAreaChart(points));
      }
      return tile;
    }

    function markFilterTarget(el, label, onActivate) {
      var title = 'Filter table by ' + label;
      el.style.cursor = 'pointer';
      el.style.transition = (el.style.transition ? el.style.transition + ',' : '') + 'opacity .12s ease, outline-color .12s ease';
      el.title = title;
      try {
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', title);
      } catch (e) {}
      el.addEventListener('mouseenter', function () { el.style.opacity = '0.72'; });
      el.addEventListener('mouseleave', function () { el.style.opacity = '1'; });
      el.addEventListener('focus', function () {
        el.style.outline = '2px solid hsl(var(--primary))';
        el.style.outlineOffset = '2px';
      });
      el.addEventListener('blur', function () {
        el.style.outline = '';
        el.style.outlineOffset = '';
      });
      el.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          onActivate();
        }
      });
      el.addEventListener('click', onActivate);
    }

    function appendFilterHint(parent) {
      var hint = document.createElement('span');
      hint.innerHTML = icon('filter', { size: 11 });
      hint.style.cssText = 'display:inline-flex;align-items:center;color:hsl(var(--primary));opacity:0.9;flex:none;';
      parent.appendChild(hint);
    }

    // Make a breakdown segment (bar row / donut legend item) clickable to filter
    // the table by that category. No-op unless the spec item carries a dimension.
    function attachDrilldown(el, item, rawKey, name) {
      if (!item || !item.dimension || rawKey == null || rawKey === '') return;
      var label = name != null ? String(name) : String(rawKey);
      markFilterTarget(el, label, function () {
        try {
          window.parent.postMessage({
            type: 'erpai-insights-drilldown',
            dimension: item.dimension,
            value: rawKey,
            label: label
          }, '*');
        } catch (e) {}
      });
    }

    // Make a filtered scalar card clickable to apply its configured condition to
    // the host table, e.g. "Total Open Issues" filters Status = Open.
    function attachFilterDrilldown(el, item) {
      if (!item || !item.filter || !item.filter.column) return;
      var value = item.filter.value;
      if (value == null || value === '') return;
      var label = item.label != null ? String(item.label) : String(value);
      markFilterTarget(el, label, function () {
        try {
          window.parent.postMessage({
            type: 'erpai-insights-drilldown',
            dimension: item.filter.column,
            value: value,
            op: item.filter.op || '=',
            label: label
          }, '*');
        } catch (e) {}
      });
    }

    // Build a 'bar' (breakdown) tile: the measure grouped by a dimension, as a
    // top-N list of label + horizontal bar + value. Caught by the caller.
    function buildBarTile(item, idx) {
      var tile = document.createElement('div');
      tile.style.cssText = 'background:' + CARD_BG + ';border:1px solid ' + BORDER + ';border-radius:12px;'
        + 'padding:13px 15px;display:flex;flex-direction:column;gap:8px;min-width:0;box-sizing:border-box;';

      var labelRow = document.createElement('div');
      labelRow.style.cssText = 'display:flex;align-items:center;gap:7px;min-width:0;';
      var dot = document.createElement('span');
      dot.style.cssText = 'width:7px;height:7px;border-radius:2px;flex:none;background:' + DOT_HUES[idx % DOT_HUES.length] + ';';
      var labelEl = document.createElement('span');
      labelEl.textContent = item.label != null ? String(item.label) : '';
      labelEl.style.cssText = 'font-size:12px;color:' + MUTED + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      labelRow.appendChild(dot);
      labelRow.appendChild(labelEl);
      tile.appendChild(labelRow);

      var d = item.series && window.__ERPAI_DATA__ ? window.__ERPAI_DATA__[item.series.ref] : null;
      var rows = (d && d.data && d.data.rows) ? d.data.rows : [];
      if (!rows.length) {
        var empty = document.createElement('div');
        empty.style.cssText = 'font-size:23px;font-weight:600;color:' + MUTED + ';';
        empty.textContent = '—';
        tile.appendChild(empty);
        return tile;
      }

      var keyCol = item.series.keyCol, valCol = item.series.valCol;
      var max = 0;
      for (var mi = 0; mi < rows.length; mi++) { var mv = Number(rows[mi][valCol]) || 0; if (mv > max) max = mv; }
      if (max <= 0) max = 1;
      var barColor = DOT_HUES[idx % DOT_HUES.length];

      var list = document.createElement('div');
      list.style.cssText = 'display:flex;flex-direction:column;gap:6px;margin-top:2px;';
      var n = Math.min(rows.length, 6);
      for (var r = 0; r < n; r++) {
        var row = rows[r];
        var rawKey = row[keyCol];
        var name = (item.options && item.options[String(rawKey)]) || (rawKey == null || rawKey === '' ? '—' : String(rawKey));
        var v = Number(row[valCol]) || 0;

        var hdr = document.createElement('div');
        hdr.style.cssText = 'display:flex;justify-content:space-between;gap:8px;font-size:11px;color:' + MUTED + ';margin-bottom:2px;';
        var nm = document.createElement('span');
        nm.textContent = name;
        nm.style.cssText = 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
        var vl = document.createElement('span');
        vl.textContent = formatHero(v, item);
        vl.style.cssText = 'font-variant-numeric:tabular-nums;flex:none;';
        var rowMeta = document.createElement('span');
        rowMeta.style.cssText = 'display:flex;align-items:center;gap:6px;flex:none;';
        if (item.dimension && rawKey != null && rawKey !== '') appendFilterHint(rowMeta);
        rowMeta.appendChild(vl);
        hdr.appendChild(nm); hdr.appendChild(rowMeta);

        var track = document.createElement('div');
        track.style.cssText = 'height:6px;border-radius:3px;background:hsl(var(--muted));overflow:hidden;';
        var fill = document.createElement('div');
        fill.style.cssText = 'height:6px;border-radius:3px;background:' + barColor + ';width:' + Math.max(2, Math.round((v / max) * 100)) + '%;';
        track.appendChild(fill);

        var rowWrap = document.createElement('div');
        rowWrap.appendChild(hdr); rowWrap.appendChild(track);
        attachDrilldown(rowWrap, item, rawKey, name);
        list.appendChild(rowWrap);
      }
      tile.appendChild(list);
      return tile;
    }

    // Build a 'donut' (breakdown) tile: same group-by series as 'bar', drawn as
    // a donut + legend. Caught by the caller.
    function buildDonutTile(item, idx) {
      var DONUT_HUES = [
        'hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))',
        'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--primary))'
      ];
      var tile = document.createElement('div');
      tile.style.cssText = 'background:' + CARD_BG + ';border:1px solid ' + BORDER + ';border-radius:12px;'
        + 'padding:13px 15px;display:flex;flex-direction:column;gap:8px;min-width:0;box-sizing:border-box;';

      var labelRow = document.createElement('div');
      labelRow.style.cssText = 'display:flex;align-items:center;gap:7px;min-width:0;';
      var dot = document.createElement('span');
      dot.style.cssText = 'width:7px;height:7px;border-radius:2px;flex:none;background:' + DONUT_HUES[idx % DONUT_HUES.length] + ';';
      var labelEl = document.createElement('span');
      labelEl.textContent = item.label != null ? String(item.label) : '';
      labelEl.style.cssText = 'font-size:12px;color:' + MUTED + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      labelRow.appendChild(dot); labelRow.appendChild(labelEl);
      tile.appendChild(labelRow);

      var d = item.series && window.__ERPAI_DATA__ ? window.__ERPAI_DATA__[item.series.ref] : null;
      var rows = (d && d.data && d.data.rows) ? d.data.rows : [];
      if (!rows.length) {
        var empty = document.createElement('div');
        empty.style.cssText = 'font-size:23px;font-weight:600;color:' + MUTED + ';';
        empty.textContent = '—';
        tile.appendChild(empty);
        return tile;
      }
      var keyCol = item.series.keyCol, valCol = item.series.valCol;
      var slice = rows.slice(0, 6);
      var total = 0;
      for (var ti = 0; ti < slice.length; ti++) total += Number(slice[ti][valCol]) || 0;
      if (total <= 0) total = 1;

      var body = document.createElement('div');
      body.style.cssText = 'display:flex;align-items:flex-start;gap:14px;margin-top:2px;flex-wrap:wrap;';

      var SVGNS = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(SVGNS, 'svg');
      svg.setAttribute('width', '66'); svg.setAttribute('height', '66'); svg.setAttribute('viewBox', '0 0 36 36');
      svg.style.flex = 'none';
      var track = document.createElementNS(SVGNS, 'circle');
      track.setAttribute('cx', '18'); track.setAttribute('cy', '18'); track.setAttribute('r', '15.9155');
      track.setAttribute('fill', 'none'); track.style.stroke = 'hsl(var(--muted))'; track.setAttribute('stroke-width', '4');
      svg.appendChild(track);

      var legend = document.createElement('div');
      legend.style.cssText = 'display:flex;flex-direction:column;gap:3px;min-width:0;flex:1;';

      var cumulative = 0;
      for (var r = 0; r < slice.length; r++) {
        var row = slice[r];
        var rawKey = row[keyCol];
        var name = (item.options && item.options[String(rawKey)]) || (rawKey == null || rawKey === '' ? '—' : String(rawKey));
        var v = Number(row[valCol]) || 0;
        var pct = (v / total) * 100;
        var hue = DONUT_HUES[r % DONUT_HUES.length];

        var seg = document.createElementNS(SVGNS, 'circle');
        seg.setAttribute('cx', '18'); seg.setAttribute('cy', '18'); seg.setAttribute('r', '15.9155');
        seg.setAttribute('fill', 'none'); seg.style.stroke = hue; seg.setAttribute('stroke-width', '4');
        seg.setAttribute('stroke-dasharray', (Math.round(pct * 100) / 100) + ' ' + (Math.round((100 - pct) * 100) / 100));
        seg.setAttribute('stroke-dashoffset', String(-Math.round(cumulative * 100) / 100));
        seg.setAttribute('transform', 'rotate(-90 18 18)');
        attachDrilldown(seg, item, rawKey, name);
        svg.appendChild(seg);
        cumulative += pct;

        var li = document.createElement('div');
        li.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:11px;color:' + MUTED + ';min-width:0;';
        var ldot = document.createElement('span');
        ldot.style.cssText = 'width:8px;height:8px;border-radius:2px;flex:none;background:' + hue + ';';
        var lname = document.createElement('span');
        lname.textContent = name;
        lname.style.cssText = 'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
        var lval = document.createElement('span');
        lval.textContent = formatHero(v, item);
        lval.style.cssText = 'margin-left:auto;font-variant-numeric:tabular-nums;flex:none;';
        li.appendChild(ldot); li.appendChild(lname);
        if (item.dimension && rawKey != null && rawKey !== '') appendFilterHint(li);
        li.appendChild(lval);
        attachDrilldown(li, item, rawKey, name);
        legend.appendChild(li);
      }

      body.appendChild(svg);
      body.appendChild(legend);
      tile.appendChild(body);
      return tile;
    }

    function placeholderTile(item, idx) {
      var tile = document.createElement('div');
      tile.style.cssText = 'background:' + CARD_BG + ';border:1px solid ' + BORDER + ';border-radius:12px;'
        + 'padding:13px 15px;display:flex;flex-direction:column;gap:6px;min-width:0;box-sizing:border-box;';
      var lr = document.createElement('div');
      lr.style.cssText = 'display:flex;align-items:center;gap:7px;min-width:0;';
      var d = document.createElement('span');
      d.style.cssText = 'width:7px;height:7px;border-radius:2px;flex:none;background:' + DOT_HUES[idx % DOT_HUES.length] + ';';
      var l = document.createElement('span');
      l.style.cssText = 'font-size:12px;color:' + MUTED + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      l.textContent = (item && item.label != null) ? String(item.label) : '';
      lr.appendChild(d); lr.appendChild(l);
      var v = document.createElement('div');
      v.setAttribute('data-erpai-insight-value', '');
      v.style.cssText = 'font-size:23px;font-weight:600;color:' + MUTED + ';';
      v.textContent = '—';
      tile.appendChild(lr); tile.appendChild(v);
      return tile;
    }

    el.innerHTML = '';
    var items = Array.isArray(spec.items) ? spec.items : [];

    if (items.length === 0) {
      var empty = document.createElement('div');
      empty.style.cssText = 'border:1px dashed ' + BORDER + ';border-radius:12px;padding:16px;'
        + 'text-align:center;color:' + MUTED + ';font-size:13px;';
      empty.textContent = 'No insights configured';
      el.appendChild(empty);
      return;
    }

    function buildNode(item, idx) {
      try {
        var node = null;
        if (item && item.type === 'stat') node = buildTile(item, idx);
        else if (item && item.type === 'progress') node = buildProgressTile(item, idx);
        else if (item && item.type === 'trend') node = buildTrendTile(item, idx);
        else if (item && item.type === 'bar') node = buildBarTile(item, idx);
        else if (item && item.type === 'donut') node = buildDonutTile(item, idx);
        if (node) {
          applyContentScale(node, item);
          applyValueScale(node, item);
          return node;
        }
      } catch (err) { /* fall through to placeholder */ }
      var placeholder = placeholderTile(item, idx);
      applyContentScale(placeholder, item);
      applyValueScale(placeholder, item);
      return placeholder;
    }
    layoutInsights(el, items, buildNode);
  }

  // Smart masonry layout for the insights strip. ONE css grid with a fixed
  // responsive column count C (repeat(C,1fr) — NOT auto-fit, which collapsed a
  // lone tile to a single full-width track). Charts span min(2,C) so they get a
  // ~2x footprint; per-tile ROW spans are measured post-paint and quantized to
  // an 8px lattice with grid-auto-flow:row dense, so short stat tiles backfill
  // the vertical gaps beside a tall chart. Relayout on container width change +
  // per-tile async growth (sparkline/SVG). Tile internals are untouched.
  function layoutInsights(el, items, buildNode) {
    // COL_MIN/C_MAX tuned so wide monitors pack MORE, sensibly-sized columns
    // (up to 8) instead of a handful of ballooned ones.
    // NOTE: do NOT cap the strip with max-height + overflow here. The host iframe
    // auto-resizes to document.body.scrollHeight; an overflow:auto container hides
    // its true content height from that measurement, which races the resize and
    // can deadlock the iframe at a tiny height (collapsing the whole strip). A
    // height cap, if wanted, must live host-side on the iframe element instead.
    var GAP = 12, COL_MIN = 200, ROW_UNIT = 8, C_MAX = 8;

    el.innerHTML = '';
    var grid = document.createElement('div');
    el.appendChild(grid);

    var allCharts = items.length > 0 && items.every(function (it) {
      return it && (it.type === 'bar' || it.type === 'donut' || it.type === 'trend');
    });

    function isChart(t) { return t === 'bar' || t === 'donut' || t === 'trend'; }
    function colSpan(type, C) {
      if (!isChart(type)) return 1;          // stat / progress / placeholder
      if (allCharts && C === 3) return 3;    // all-charts @ C=3: avoid stranded col 3
      return Math.min(2, C);
    }
    function computeC(W) {
      return Math.max(1, Math.min(C_MAX, Math.floor((W + GAP) / (COL_MIN + GAP))));
    }

    // Build tiles ONCE in configured order; relayout only restyles them.
    var tiles = [];
    for (var i = 0; i < items.length; i++) {
      var node = buildNode(items[i], i);
      if (!node) continue;
      node.style.minWidth = '0';
      node.style.boxSizing = 'border-box';
      var manualSize = items[i] && items[i].size;
      if (manualSize && typeof manualSize.h === 'number' && isFinite(manualSize.h)) {
        node.style.height = Math.max(48, Math.min(640, Math.round(manualSize.h))) + 'px';
        node.style.overflowX = 'hidden';
        node.style.overflowY = 'auto';
      }
      grid.appendChild(node);
      tiles.push({ node: node, type: items[i] && items[i].type, item: items[i], idx: i });
    }

    var measureRaf = 0, lastC = -1;

    function measureRows() {
      for (var k = 0; k < tiles.length; k++) {
        var h = tiles[k].node.getBoundingClientRect().height;
        var span = Math.max(1, Math.ceil((h + GAP) / (ROW_UNIT + GAP)));
        tiles[k].node.style.gridRowEnd = 'span ' + span;
      }
    }

    function applySpans() {
      var W = el.clientWidth || 360;
      var C = computeC(W);
      var cChanged = C !== lastC;
      lastC = C;

      if (cChanged) {
        // Sparse cases (<=2 tiles, or a lone wide chart) read better centered.
        var loneWideChart = tiles.length === 1 && isChart(tiles[0].type) && C >= 3;
        var center = tiles.length <= 2 || loneWideChart;
        grid.style.cssText =
          'display:grid;grid-template-columns:repeat(' + C + ',1fr);' +
          'gap:' + GAP + 'px;grid-auto-rows:' + ROW_UNIT + 'px;' +
          'grid-auto-flow:row dense;align-items:start;' +
          (center ? 'justify-content:center;' : 'justify-content:start;');
      }
      // Colspans (recomputed every pass so manual sizes + a changed C both apply).
      // A card with a manual size.w is PINNED to that width (clamped to C); the
      // rest get the auto base colspan, then the per-row fill widens the LAST
      // NON-PINNED CHART in each short row to absorb trailing slack so the strip
      // reads edge-to-edge. Stat-only / all-pinned rows are left as-is.
      var spans = [], pinned = [];
      for (var s = 0; s < tiles.length; s++) {
        var msz = tiles[s].item && tiles[s].item.size;
        if (msz && typeof msz.w === 'number' && isFinite(msz.w)) {
          spans.push(Math.max(1, Math.min(C, Math.round(msz.w)))); pinned.push(true);
        } else { spans.push(colSpan(tiles[s].type, C)); pinned.push(false); }
      }
      var rowStart = 0, used = 0;
      for (var p = 0; p <= spans.length; p++) {
        if (p === spans.length || used + spans[p] > C) {
          var slack = C - used;
          if (slack > 0) {
            for (var k = p - 1; k >= rowStart; k--) {
              if (isChart(tiles[k].type) && !pinned[k]) { spans[k] = Math.min(C, spans[k] + slack); break; }
            }
          }
          if (p === spans.length) break;
          rowStart = p; used = 0;
        }
        used += spans[p];
      }
      for (var j = 0; j < tiles.length; j++) {
        tiles[j].node.style.gridColumn = 'span ' + spans[j];
      }

      // Always re-measure (a few-px width nudge can rewrap a label/bar).
      if (measureRaf) cancelAnimationFrame(measureRaf);
      measureRaf = requestAnimationFrame(function () { measureRaf = 0; measureRows(); });
    }

    applySpans(); // first paint: colspan grid is already correct; rAF tightens rows

    // Re-measure after web fonts swap (FOUT shifts wrapped-label / bar heights).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { applySpans(); });
    }

    // Relayout on width change. The iframe's own window-resize fires reliably
    // when the host container changes width (the auto-resize script depends on
    // it), so bind it always — a ResizeObserver alone can miss externally driven
    // iframe resizes. Debounced to one rAF; recompute is a pure fn of width so
    // it converges in one pass (no oscillation).
    var winRaf = 0;
    window.addEventListener('resize', function () {
      if (winRaf) cancelAnimationFrame(winRaf);
      winRaf = requestAnimationFrame(function () { winRaf = 0; applySpans(); });
    });

    if (typeof ResizeObserver !== 'undefined') {
      var roRaf = 0;
      var containerRO = new ResizeObserver(function () {
        if (roRaf) cancelAnimationFrame(roRaf);
        roRaf = requestAnimationFrame(function () { roRaf = 0; applySpans(); });
      });
      containerRO.observe(el);

      // Per-tile async growth (late SVG/data) -> re-measure only (no re-template).
      var tileRaf = 0;
      var tileRO = new ResizeObserver(function () {
        if (tileRaf) cancelAnimationFrame(tileRaf);
        tileRaf = requestAnimationFrame(function () { tileRaf = 0; measureRows(); });
      });
      for (var o = 0; o < tiles.length; o++) tileRO.observe(tiles[o].node);
    }

    // ── Drag-to-resize (edit-layout mode) ─────────────────────────────────────
    // The host posts {type:'erpai-insights-edit', on} to toggle. In edit mode each
    // tile gets right/bottom handles; dragging snaps width to grid columns and
    // height to the row lattice, then posts the new size so the host persists it.
    var ACCENT = 'hsl(var(--primary))';
    var editMode = false;
    function snapWidthFromPointer(tile, clientX) {
      var C = lastC > 0 ? lastC : computeC(el.clientWidth || 360);
      var colW = (grid.getBoundingClientRect().width + GAP) / C; // one column + its gap
      var left = tile.node.getBoundingClientRect().left;
      return Math.max(1, Math.min(C, Math.round((clientX - left + GAP) / colW)));
    }
    function snapHeightFromPointer(tile, clientY) {
      var top = tile.node.getBoundingClientRect().top;
      return Math.max(48, Math.min(640, Math.round((clientY - top) / ROW_UNIT) * ROW_UNIT));
    }
    function snapScale(value, min, max) {
      var n = Number(value);
      if (!isFinite(n)) n = 1;
      return Math.max(min, Math.min(max, Math.round(n * 20) / 20));
    }
    function contentScaleFromPointer(start, startX, startY, clientX, clientY) {
      var delta = ((clientX - startX) + (clientY - startY)) / 220;
      return snapScale(start + delta, 0.5, 2);
    }
    function valueScaleFromPointer(start, startX, clientX) {
      return snapScale(start + (clientX - startX) / 150, 0.6, 2.5);
    }
    function reMeasureSoon() {
      if (measureRaf) cancelAnimationFrame(measureRaf);
      measureRaf = requestAnimationFrame(function () { measureRaf = 0; measureRows(); });
    }
    function attachHandle(tile) {
      if (tile._widthHandle || tile._heightHandle || tile._scaleHandle || tile._valueScaleHandle) return;
      tile.node.style.position = 'relative';
      function postSize(patch) {
        var msg = { type: 'erpai-insights-resize', index: tile.idx };
        if (patch.w != null) msg.w = patch.w;
        if (patch.h != null) msg.h = patch.h;
        if (patch.scale != null) msg.scale = patch.scale;
        if (patch.valueScale != null) msg.valueScale = patch.valueScale;
        try { window.parent.postMessage(msg, '*'); } catch (err) {}
      }
      function rebuildTile() {
        layoutInsights(el, items, buildNode);
      }
      function getDragEvents(e) {
        var isMouse = e && e.type === 'mousedown';
        return {
          move: isMouse ? 'mousemove' : 'pointermove',
          up: isMouse ? 'mouseup' : 'pointerup',
          cancel: isMouse ? null : 'pointercancel'
        };
      }
      function addDragListener(type, listener) {
        document.addEventListener(type, listener, true);
        window.addEventListener(type, listener, true);
      }
      function removeDragListener(type, listener) {
        document.removeEventListener(type, listener, true);
        window.removeEventListener(type, listener, true);
      }
      function beginContentScaleDrag(e, handle, grip) {
        e.preventDefault(); e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        if (tile._activeResizeDrag) return;
        tile._activeResizeDrag = true;
        var events = getDragEvents(e);
        if (e.pointerId != null) {
          try { handle.setPointerCapture(e.pointerId); } catch (err) {}
        }
        tile.node.style.outline = '2px solid ' + ACCENT;
        var start = snapScale(tile.item && tile.item.size && tile.item.size.scale, 0.5, 2);
        var startX = e.clientX, startY = e.clientY;
        var pending = start;
        function move(ev) {
          var next = contentScaleFromPointer(start, startX, startY, ev.clientX, ev.clientY);
          if (next !== pending) {
            pending = next;
            grip.textContent = String(Math.round(next * 100));
            grip.style.fontSize = '7px';
            grip.style.color = 'hsl(var(--primary-foreground))';
          }
        }
        function up() {
          removeDragListener(events.move, move);
          removeDragListener(events.up, up);
          if (events.cancel) removeDragListener(events.cancel, up);
          tile._activeResizeDrag = false;
          if (e.pointerId != null) {
            try { handle.releasePointerCapture(e.pointerId); } catch (err) {}
          }
          if (pending !== start) {
            tile.item.size = tile.item.size || {};
            tile.item.size.scale = pending;
            postSize({ scale: pending });
            rebuildTile();
          } else {
            tile.node.style.outline = '1px dashed ' + ACCENT;
          }
        }
        addDragListener(events.move, move);
        addDragListener(events.up, up);
        if (events.cancel) addDragListener(events.cancel, up);
      }
      function beginValueScaleDrag(e, handle) {
        e.preventDefault(); e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        if (tile._activeResizeDrag) return;
        tile._activeResizeDrag = true;
        var events = getDragEvents(e);
        if (e.pointerId != null) {
          try { handle.setPointerCapture(e.pointerId); } catch (err) {}
        }
        tile.node.style.outline = '2px solid ' + ACCENT;
        var start = snapScale(tile.item && tile.item.size && tile.item.size.valueScale, 0.6, 2.5);
        var startX = e.clientX;
        var pending = start;
        function move(ev) {
          var next = valueScaleFromPointer(start, startX, ev.clientX);
          if (next !== pending) {
            pending = next;
            handle.textContent = String(Math.round(next * 100));
            handle.style.fontSize = '7px';
            handle.style.lineHeight = '15px';
            handle.style.textAlign = 'center';
            handle.style.color = 'hsl(var(--primary-foreground))';
          }
        }
        function up() {
          removeDragListener(events.move, move);
          removeDragListener(events.up, up);
          if (events.cancel) removeDragListener(events.cancel, up);
          tile._activeResizeDrag = false;
          if (e.pointerId != null) {
            try { handle.releasePointerCapture(e.pointerId); } catch (err) {}
          }
          if (pending !== start) {
            tile.item.size = tile.item.size || {};
            tile.item.size.valueScale = pending;
            postSize({ valueScale: pending });
            rebuildTile();
          } else {
            tile.node.style.outline = '1px dashed ' + ACCENT;
          }
        }
        addDragListener(events.move, move);
        addDragListener(events.up, up);
        if (events.cancel) addDragListener(events.cancel, up);
      }

      var widthHandle = document.createElement('div');
      widthHandle.setAttribute('data-erpai-resize', 'width');
      widthHandle.style.cssText = 'position:absolute;top:0;right:0;width:12px;height:100%;cursor:ew-resize;'
        + 'z-index:6;display:flex;align-items:center;justify-content:center;touch-action:none;';
      var widthGrip = document.createElement('div');
      widthGrip.style.cssText = 'width:4px;height:28px;border-radius:3px;background:' + ACCENT + ';opacity:0.5;pointer-events:none;';
      widthHandle.appendChild(widthGrip);
      widthHandle.addEventListener('pointerenter', function () { widthGrip.style.opacity = '1'; });
      widthHandle.addEventListener('pointerleave', function () { widthGrip.style.opacity = '0.5'; });
      widthHandle.addEventListener('pointerdown', function (e) {
        e.preventDefault(); e.stopPropagation();
        try { widthHandle.setPointerCapture(e.pointerId); } catch (err) {}
        tile.node.style.outline = '2px solid ' + ACCENT;
        var pending = null;
        function move(ev) {
          var span = snapWidthFromPointer(tile, ev.clientX);
          if (span !== pending) { pending = span; tile.node.style.gridColumn = 'span ' + span; reMeasureSoon(); }
        }
        function up() {
          removeDragListener('pointermove', move);
          removeDragListener('pointerup', up);
          removeDragListener('pointercancel', up);
          try { widthHandle.releasePointerCapture(e.pointerId); } catch (err) {}
          tile.node.style.outline = '1px dashed ' + ACCENT;
          if (pending != null) {
            tile.item.size = tile.item.size || {};
            tile.item.size.w = pending;
            postSize({ w: pending });
          }
        }
        addDragListener('pointermove', move);
        addDragListener('pointerup', up);
        addDragListener('pointercancel', up);
      });
      tile.node.appendChild(widthHandle);
      tile._widthHandle = widthHandle;

      var heightHandle = document.createElement('div');
      heightHandle.setAttribute('data-erpai-resize', 'height');
      heightHandle.style.cssText = 'position:absolute;left:0;right:0;bottom:0;height:12px;cursor:ns-resize;'
        + 'z-index:7;display:flex;align-items:center;justify-content:center;touch-action:none;';
      var heightGrip = document.createElement('div');
      heightGrip.style.cssText = 'width:34px;height:4px;border-radius:3px;background:' + ACCENT + ';opacity:0.5;pointer-events:none;';
      heightHandle.appendChild(heightGrip);
      heightHandle.addEventListener('pointerenter', function () { heightGrip.style.opacity = '1'; });
      heightHandle.addEventListener('pointerleave', function () { heightGrip.style.opacity = '0.5'; });
      heightHandle.addEventListener('pointerdown', function (e) {
        e.preventDefault(); e.stopPropagation();
        try { heightHandle.setPointerCapture(e.pointerId); } catch (err) {}
        tile.node.style.outline = '2px solid ' + ACCENT;
        var pending = null;
        function move(ev) {
          var px = snapHeightFromPointer(tile, ev.clientY);
          if (px !== pending) {
            pending = px;
            tile.node.style.height = px + 'px';
            tile.node.style.overflowX = 'hidden';
            tile.node.style.overflowY = 'auto';
            reMeasureSoon();
          }
        }
        function up() {
          removeDragListener('pointermove', move);
          removeDragListener('pointerup', up);
          removeDragListener('pointercancel', up);
          try { heightHandle.releasePointerCapture(e.pointerId); } catch (err) {}
          tile.node.style.outline = '1px dashed ' + ACCENT;
          if (pending != null) {
            tile.item.size = tile.item.size || {};
            tile.item.size.h = pending;
            postSize({ h: pending });
          }
        }
        addDragListener('pointermove', move);
        addDragListener('pointerup', up);
        addDragListener('pointercancel', up);
      });
      tile.node.appendChild(heightHandle);
      tile._heightHandle = heightHandle;

      var scaleHandle = document.createElement('div');
      scaleHandle.setAttribute('data-erpai-resize', 'content-scale');
      scaleHandle.title = 'Scale card content';
      scaleHandle.style.cssText = 'position:absolute;right:4px;bottom:4px;width:18px;height:18px;'
        + 'cursor:nwse-resize;z-index:9;display:flex;align-items:center;justify-content:center;touch-action:none;';
      var scaleGrip = document.createElement('div');
      scaleGrip.style.cssText = 'width:12px;height:12px;border-radius:4px;background:' + ACCENT + ';opacity:0.72;'
        + 'box-shadow:0 0 0 2px hsl(var(--background));pointer-events:none;';
      scaleHandle.appendChild(scaleGrip);
      scaleHandle.addEventListener('pointerenter', function () { scaleGrip.style.opacity = '1'; });
      scaleHandle.addEventListener('pointerleave', function () { scaleGrip.style.opacity = '0.72'; });
      scaleHandle.addEventListener('pointerdown', function (e) {
        beginContentScaleDrag(e, scaleHandle, scaleGrip);
      });
      scaleHandle.addEventListener('mousedown', function (e) {
        beginContentScaleDrag(e, scaleHandle, scaleGrip);
      });
      tile.node.appendChild(scaleHandle);
      tile._scaleHandle = scaleHandle;

      var valueEl = tile.node.querySelector('[data-erpai-insight-value]');
      if (valueEl) {
        var valueScaleHandle = document.createElement('div');
        valueScaleHandle.setAttribute('data-erpai-resize', 'value-scale');
        valueScaleHandle.title = 'Scale value text';
        valueScaleHandle.style.cssText = 'position:absolute;width:15px;height:15px;border-radius:999px;'
          + 'cursor:ew-resize;z-index:10;background:' + ACCENT + ';opacity:0.72;'
          + 'box-shadow:0 0 0 2px hsl(var(--background));touch-action:none;';
        function positionValueHandle() {
          var vr = valueEl.getBoundingClientRect();
          var tr = tile.node.getBoundingClientRect();
          var left = Math.max(4, Math.min(tile.node.clientWidth - 18, vr.right - tr.left + 5));
          var top = Math.max(4, Math.min(tile.node.clientHeight - 18, vr.top - tr.top + vr.height / 2 - 7));
          valueScaleHandle.style.left = left + 'px';
          valueScaleHandle.style.top = top + 'px';
        }
        positionValueHandle();
        requestAnimationFrame(positionValueHandle);
        valueScaleHandle.addEventListener('pointerenter', function () { valueScaleHandle.style.opacity = '1'; });
        valueScaleHandle.addEventListener('pointerleave', function () { valueScaleHandle.style.opacity = '0.72'; });
        valueScaleHandle.addEventListener('pointerdown', function (e) {
          beginValueScaleDrag(e, valueScaleHandle);
        });
        valueScaleHandle.addEventListener('mousedown', function (e) {
          beginValueScaleDrag(e, valueScaleHandle);
        });
        tile.node.appendChild(valueScaleHandle);
        tile._valueScaleHandle = valueScaleHandle;
      }
    }
    function detachHandle(tile) {
      if (tile._widthHandle) { tile._widthHandle.remove(); tile._widthHandle = null; }
      if (tile._heightHandle) { tile._heightHandle.remove(); tile._heightHandle = null; }
      if (tile._scaleHandle) { tile._scaleHandle.remove(); tile._scaleHandle = null; }
      if (tile._valueScaleHandle) { tile._valueScaleHandle.remove(); tile._valueScaleHandle = null; }
      tile.node.style.outline = '';
    }
    function setEditMode(on) {
      editMode = !!on;
      window.__erpaiInsightsEditOn = editMode;
      for (var t = 0; t < tiles.length; t++) {
        if (editMode) { tiles[t].node.style.outline = '1px dashed ' + ACCENT; attachHandle(tiles[t]); }
        else { detachHandle(tiles[t]); }
      }
    }
    // The newest-rendered strip owns the toggle (one insights iframe per table).
    window.__erpaiSetInsightsEdit = setEditMode;
    if (window.__erpaiInsightsEditOn) setEditMode(true); // survive an in-doc re-render
    if (!window.__erpaiEditMsgBound) {
      window.__erpaiEditMsgBound = true;
      window.addEventListener('message', function (e) {
        if (e && e.data && e.data.type === 'erpai-insights-edit' && typeof window.__erpaiSetInsightsEdit === 'function') {
          window.__erpaiSetInsightsEdit(!!e.data.on);
        }
      });
    }
    // Tell the host the edit listener is live so it can (re)assert edit mode after
    // an iframe reload — onLoad fires before this runs, so a blind re-post races us.
    try { window.parent.postMessage({ type: 'erpai-insights-ready' }, '*'); } catch (e) {}
  }

  window.erpai = {
    // Config
    config: cfg,
    appId: APP_ID,
    branchId: BRANCH_ID,
    pageSlug: PAGE_SLUG,
    pageId: PAGE_ID,
    baseUrl: BASE_URL,
    appRouteBase: APP_ROUTE_BASE,
    theme: THEME,
    orgName: ORG_NAME,
    appName: APP_NAME,

    // API
    api: api,
    runSQL: runSQL,
    getTables: getTables,
    getTable: getTable,
    getTableVersions: getTableVersions,
    getRecordById: getRecordById,
    getRecords: getRecords,
    aggregateRecords: aggregateRecords,
    countRecords: countRecords,
    createRecord: createRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    getSQLSchema: getSQLSchema,
    executeTrigger: executeTrigger,
    runTrigger: executeTrigger,
    triggerWorkflow: executeTrigger,
    proto: proto,
    uploadAttachment: uploadAttachment,
    uploadFile: uploadAttachment,
    getFileUrl: getFileUrl,
    resolveFileUrl: getFileUrl,
    getAttachmentUrl: getFileUrl,
    resolveAttachmentUrl: getFileUrl,
    encodeAttachments: encodeAttachments,

    // Navigation
    erpaiUrl: erpaiUrl,
    navigateTo: navigateTo,

    // Formatters
    esc: esc,
    fmt$: fmt$,
    fmtPct: fmtPct,
    fmtNum: fmtNum,
    compactNumber: compactNumber,
    fmtDate: fmtDate,
    formatCell: formatCell,

    // Cell decoders
    selectName: selectName,
    joinByKey: joinByKey,

    // Theme
    getThemeColors: getThemeColors,

    // UI helpers
    renderStatCard: renderStatCard,
    renderInsights: renderInsights,
    renderPagination: renderPagination,
    renderRecordTable: renderRecordTable,
    renderPermissionDenied: renderPermissionDenied,
    handleError: handleError,
    ErpaiPermissionError: ErpaiPermissionError,
    createSearch: createSearch,
    createDropdown: createDropdown,
    icon: icon,
    hasIcon: hasIcon,
    listIcons: listIcons,
    showLoading: showLoading,
    showError: showError,
    hideLoading: hideLoading,
    exportCSV: exportCSV,
    exportSQL: exportSQL,
    exportRecords: exportRecords,
    downloadExport: downloadExport,
    renderExportButtons: renderExportButtons,

    // State management
    cached: cached,
    invalidateCache: invalidateCache,
    query: query,
    records: records,
    fetchAllRecords: recordsAll,
    aggregates: aggregates,
    mutate: mutate,
    bulkUpdate: bulkUpdate,
    bulkUpdateByFilter: bulkUpdateByFilter,
    triggerTableAction: triggerTableAction,
    invalidate: invalidate,
    invalidateQueries: invalidateQueries,
    renderList: renderList,
    render: {
      list: renderList,
      section: renderSection
    },
    section: section,
    cards: cards,
    ui: {
      preserveFocus: preserveFocus,
      debounceInput: debounceInput,
      selection: selection,
      select: select
    },
    debug: {
      metrics: debugMetrics,
      getStats: debugMetrics,
      overlay: debugOverlay
    },
    lifecycle: lifecycle,
    state: state,
    getState: getState,
    setState: setState,
    patchState: patchState,
    removeState: removeState,
    clearState: clearState,
    getStateAsync: getStateAsync,
    setStateAsync: setStateAsync,
    patchStateAsync: patchStateAsync,
    removeStateAsync: removeStateAsync,
    clearStateAsync: clearStateAsync,
    persistInputs: persistInputs,
    restoreInputs: restoreInputs,
    clearPersistedInputs: clearPersistedInputs,
    autoPersistPage: autoPersistPage,
    getPersistedInputFiles: getPersistedInputFiles,
    setInputFiles: setInputFiles,
    sectionLoading: sectionLoading,
    sectionLoaded: sectionLoaded,
    sectionUpdating: sectionUpdating,
    sectionUpdated: sectionUpdated,
    loadSections: loadSections,

    // Skeleton generators
    skeleton: skeleton,

    // Tabs
    initTabs: initTabs,

    // Record modal (bridge to parent in iframe, fallback modal for local testing)
    openRecord: openRecord,
    openCreateForm: openCreateForm,
    openImport: openImport,

    // Custom page agent handoff
    agentTasks: agentTasks,

    // Charts
    chart: chart,

    // Prefetch / Hydration
    getData: getData,
    hasData: hasData,
    withPrefetch: withPrefetch,
    invalidatePageCache: invalidatePageCache
  };

  function startRuntimeLifecycle() {
    startAutoPersistPage();
    if (!_pageLifecycleBusy && !_pageLifecycleReady) pageReady({ auto: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startRuntimeLifecycle, { once: true });
  } else {
    setTimeout(startRuntimeLifecycle, 0);
  }
})();
