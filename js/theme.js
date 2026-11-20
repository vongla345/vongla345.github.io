/* Sciencefolio — theme.js
   Load in <head> (no defer) so the right look paints on the first frame. */
(function () {

  /* ---- TYPE PACK: the one setting to change --------------------------------
     'grotesk' = Archivo + IBM Plex Mono  (lab voice: STEM)
     'serif'   = Fraunces + Archivo caps  (seminar voice: social science, humanities) */
  var PACK = 'grotesk';

  var root = document.documentElement;

  /* Try the other pack without editing: add ?pack=serif (or ?pack=grotesk) to
     any page address. It lasts for the browser tab only. */
  try {
    var q = new URLSearchParams(location.search).get('pack');
    if (q === 'serif' || q === 'grotesk') sessionStorage.setItem('sf-pack', q);
    PACK = sessionStorage.getItem('sf-pack') || PACK;
  } catch (e) {}
  if (PACK === 'serif') root.dataset.pack = 'serif';

  /* ---- TEMPORARY accent preview: add ?accent=cobalt|forest|rust|violet|none
     to the address. Lasts for the browser tab only. Remove once the accent is chosen. */
  try {
    var AC = { none: ['#201e1d', '#f3f2f2'], cobalt: ['#2545d3', '#8aa2ff'], forest: ['#1e6f50', '#6fd1a8'], rust: ['#b4552d', '#f0a07c'], violet: ['#6d28d9', '#b99bff'] };
    var a = new URLSearchParams(location.search).get('accent');
    if (a && AC[a]) sessionStorage.setItem('sf-accent', a);
    a = sessionStorage.getItem('sf-accent');
    if (a && AC[a]) { root.style.setProperty('--accent-light', AC[a][0]); root.style.setProperty('--accent-dark', AC[a][1]); }
  } catch (e) {}

  /* ---- DARK / LIGHT: follows the visitor's system until they use the toggle */
  var saved = null;
  try { saved = localStorage.getItem('sf-theme'); } catch (e) {}
  root.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    var label = btn.querySelector('[data-theme-label]') || btn;
    function paint() {
      var dark = root.dataset.theme === 'dark';
      label.textContent = dark ? 'Light' : 'Dark';
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    }
    paint();
    btn.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('sf-theme', root.dataset.theme); } catch (e) {}
      paint();
    });
  });
})();
