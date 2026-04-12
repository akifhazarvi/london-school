/* London School — Shared content loader
   Loads saved edits and applies them to the page.
   Works on both static hosting (GitHub Pages) and local dev server.
   Used by index.html (view) and editor.html (edit). */
(function () {
  'use strict';

  var API = '/api/content';
  var STATIC_FILE = 'content.json';

  var SELECTORS = [
    'h1', 'h2', 'h3', 'h4',
    '.hero__sub', '.hero__badge', '.hero__trust-label',
    '.sec-label', '.sec-desc',
    '.prog__title', '.prog__desc', '.prog__pill',
    '.about p.sec-desc', '.about__val h4', '.about__val p',
    '.demo__feat strong', '.demo__feat span',
    '.demo p',
    '.tile__cap strong', '.tile__cap small',
    '.tcard__txt', '.tcard__name', '.tcard__role',
    '.fee__age', '.fee__price', '.fee__per', '.fee__li', '.fee__badge',
    '.cta-card > h2', '.cta-card > p',
    '.ct-card h4', '.ct-card p',
    '.ft__about > p', '.ft__h',
    '.ft__links a', '.ft__bot p',
    '.proof__num', '.proof__lbl',
    '.hero__float-txt', '.hero__float-txt small',
    '.btn'
  ].join(',');

  /* Build a stable key for an element based on its DOM position */
  function stableKey(el) {
    var section = el.closest('section,footer,nav,.mob-menu');
    var prefix = section ? (section.id || section.tagName.toLowerCase()) : 'root';
    var tag = el.tagName.toLowerCase();
    var cls = el.className
      ? '.' + el.className.split(' ').filter(function (c) {
          return c && !c.startsWith('ed-') && c !== 'on' && c !== 'rv';
        }).join('.')
      : '';
    var parent = el.parentElement;
    var idx = 0;
    if (parent) {
      for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i] === el) break;
        if (parent.children[i].tagName === el.tagName) idx++;
      }
    }
    return prefix + '|' + tag + cls + '|' + idx;
  }

  /* Tag all editable elements */
  function tagAll() {
    var els = document.querySelectorAll(SELECTORS);
    els.forEach(function (el) {
      if (el.closest('#editorBar')) return;
      if (!el.getAttribute('data-editable')) {
        el.setAttribute('data-editable', stableKey(el));
      }
    });
  }

  /* Apply saved data to tagged elements */
  function applyData(data) {
    if (!data || typeof data !== 'object') return;
    document.querySelectorAll('[data-editable]').forEach(function (el) {
      var key = el.getAttribute('data-editable');
      if (data[key] !== undefined) {
        el.innerHTML = data[key];
      }
    });
  }

  /* Try to load content — attempts in order:
     1. Dev server API (/api/content)
     2. Static file (content.json)
     3. localStorage fallback */
  function loadEdits() {
    fetch(API)
      .then(function (r) {
        if (!r.ok) throw new Error('not api');
        return r.json();
      })
      .then(function (data) {
        if (data && Object.keys(data).length > 0) applyData(data);
        window.__lseServerMode = true;
      })
      .catch(function () {
        // No dev server — try static content.json
        fetch(STATIC_FILE)
          .then(function (r) {
            if (!r.ok) throw new Error('no file');
            return r.json();
          })
          .then(function (data) {
            if (data && Object.keys(data).length > 0) applyData(data);
          })
          .catch(function () {
            // Last resort: localStorage
            var raw = localStorage.getItem('lse_edits');
            if (raw) {
              try { applyData(JSON.parse(raw)); } catch (e) {}
            }
          });
      });
  }

  tagAll();
  loadEdits();

  // Expose for editor.js
  window.__lseContentLoader = {
    API: API,
    SELECTORS: SELECTORS,
    stableKey: stableKey,
    tagAll: tagAll,
    applyData: applyData
  };
})();
