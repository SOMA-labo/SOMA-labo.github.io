/* Light / dark switch.
 *
 * The site follows the visitor's system setting on its own. This file only
 * handles the case where someone wants to override that, and remembers the
 * choice for next time.
 *
 * The <head> of every page carries a two-line inline script that reads the
 * stored choice before the first paint — without it the page would flash the
 * wrong theme. That snippet has to stay inline; this file does the rest.
 */
(function () {
  'use strict';

  var KEY  = 'soma-theme';
  var root = document.documentElement;
  var btn  = document.querySelector('.theme-toggle');
  if (!btn) return;

  // The control exists in the markup but starts hidden, so that with JavaScript
  // off nobody is offered a switch that cannot work.
  btn.hidden = false;

  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    return root.dataset.theme || (mq.matches ? 'dark' : 'light');
  }

  function describe() {
    var dark = current() === 'dark';
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.setAttribute('aria-label', dark ? 'Switch to the light theme'
                                        : 'Switch to the dark theme');
    btn.title = dark ? 'Light' : 'Dark';
  }

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch (e) { /* private mode */ }
    describe();
  });

  // Keep following the system while no explicit choice has been made.
  function onSystemChange() { if (!root.dataset.theme) describe(); }
  if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
  else if (mq.addListener) mq.addListener(onSystemChange);

  describe();
})();
