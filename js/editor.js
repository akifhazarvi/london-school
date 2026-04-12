/* London School — Visual Content Editor (uses content-loader.js) */
(function () {
  'use strict';

  var loader = window.__lseContentLoader;
  var API = loader.API;
  var editMode = false;

  /* ── Toolbar ── */
  var bar = document.createElement('div');
  bar.id = 'editorBar';
  bar.innerHTML =
    '<div class="ed-bar">' +
      '<div class="ed-bar__left">' +
        '<span class="ed-bar__logo">Content Editor</span>' +
        '<span class="ed-bar__status" id="edStatus">Preview Mode</span>' +
      '</div>' +
      '<div class="ed-bar__right">' +
        '<button id="edToggle" class="ed-btn ed-btn--primary">Edit Content</button>' +
        '<button id="edReset" class="ed-btn ed-btn--ghost" title="Reset all changes">Reset</button>' +
      '</div>' +
    '</div>';
  document.body.prepend(bar);

  /* ── Styles ── */
  var css = document.createElement('style');
  css.textContent =
    '#editorBar{position:fixed;top:0;left:0;right:0;z-index:100000;font-family:Inter,system-ui,sans-serif}' +
    '.ed-bar{display:flex;align-items:center;justify-content:space-between;padding:8px 20px;background:#1e1e2e;color:#cdd6f4;font-size:13px;box-shadow:0 2px 12px rgba(0,0,0,.3)}' +
    '.ed-bar__left{display:flex;align-items:center;gap:12px}' +
    '.ed-bar__logo{font-weight:700;font-size:14px;color:#cba6f7}' +
    '.ed-bar__status{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;background:#313244;color:#a6adc8}' +
    '.ed-bar__status.active{background:#a6e3a1;color:#1e1e2e}' +
    '.ed-bar__right{display:flex;gap:8px}' +
    '.ed-btn{border:none;padding:6px 16px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s}' +
    '.ed-btn--primary{background:#89b4fa;color:#1e1e2e}.ed-btn--primary:hover{background:#74c7ec}' +
    '.ed-btn--primary.editing{background:#f38ba8;color:#1e1e2e}' +
    '.ed-btn--primary.editing:hover{background:#eba0ac}' +
    '.ed-btn--ghost{background:transparent;color:#a6adc8;border:1px solid #45475a}.ed-btn--ghost:hover{background:#313244;color:#cdd6f4}' +

    'body.ed-active{padding-top:48px !important}' +
    'body.ed-active .nav{top:48px !important}' +

    '[data-editable].ed-on{outline:2px dashed rgba(137,180,250,.4);outline-offset:2px;cursor:text;border-radius:4px;transition:outline .15s}' +
    '[data-editable].ed-on:hover{outline-color:rgba(137,180,250,.8);background:rgba(137,180,250,.05)}' +
    '[data-editable].ed-on:focus{outline:2px solid #89b4fa;background:rgba(137,180,250,.08)}' +

    '.ed-toast{position:fixed;bottom:24px;right:24px;padding:10px 20px;background:#1e1e2e;color:#a6e3a1;border-radius:8px;font-size:13px;font-weight:600;z-index:100001;opacity:0;transform:translateY(10px);transition:all .3s;pointer-events:none;font-family:Inter,system-ui,sans-serif}' +
    '.ed-toast.show{opacity:1;transform:translateY(0)}' +
    '.ed-toast.error{color:#f38ba8}' +

    '@media(max-width:600px){.ed-bar{flex-direction:column;gap:8px;padding:8px 12px}.ed-bar__right{flex-wrap:wrap;justify-content:center}}';
  document.head.appendChild(css);

  /* ── Toast ── */
  var toast = document.createElement('div');
  toast.className = 'ed-toast';
  document.body.appendChild(toast);
  function showToast(msg, isError) {
    toast.textContent = msg;
    toast.classList.toggle('error', !!isError);
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2500);
  }

  /* ── Save to server (content.json on disk) ── */
  function saveEdits() {
    var data = {};
    document.querySelectorAll('[data-editable]').forEach(function (el) {
      if (el.closest('#editorBar')) return;
      data[el.getAttribute('data-editable')] = el.innerHTML;
    });

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (r) {
        if (r.ok) showToast('Saved — changes are live on the main site');
        else showToast('Save failed (server error)', true);
      })
      .catch(function () {
        // Fallback: save to localStorage
        localStorage.setItem('lse_edits', JSON.stringify(data));
        showToast('Saved locally (server unavailable)', true);
      });
  }

  /* ── Toggle edit mode ── */
  var toggleBtn = document.getElementById('edToggle');
  var statusEl = document.getElementById('edStatus');

  function enterEditMode() {
    editMode = true;
    document.body.classList.add('ed-active');
    toggleBtn.textContent = 'Done Editing';
    toggleBtn.classList.add('editing');
    statusEl.textContent = 'Editing';
    statusEl.classList.add('active');
    document.querySelectorAll('[data-editable]').forEach(function (el) {
      if (el.closest('#editorBar')) return;
      el.contentEditable = 'true';
      el.classList.add('ed-on');
    });
    document.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', preventNav);
    });
  }

  function exitEditMode() {
    editMode = false;
    toggleBtn.textContent = 'Edit Content';
    toggleBtn.classList.remove('editing');
    statusEl.textContent = 'Preview Mode';
    statusEl.classList.remove('active');
    document.querySelectorAll('[data-editable]').forEach(function (el) {
      el.contentEditable = 'false';
      el.classList.remove('ed-on');
    });
    document.querySelectorAll('a').forEach(function (a) {
      a.removeEventListener('click', preventNav);
    });
    saveEdits();
  }

  function preventNav(e) {
    if (editMode) e.preventDefault();
  }

  toggleBtn.addEventListener('click', function () {
    if (editMode) exitEditMode();
    else enterEditMode();
  });

  /* ── Auto-save on typing (debounced) ── */
  var saveTimer;
  document.addEventListener('input', function (e) {
    if (e.target.hasAttribute && e.target.hasAttribute('data-editable')) {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(saveEdits, 1500);
    }
  });

  /* ── Reset ── */
  document.getElementById('edReset').addEventListener('click', function () {
    if (!confirm('Reset all content? This reverts to the original on both editor and main site.')) return;
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
      .then(function () {
        localStorage.removeItem('lse_edits');
        location.reload();
      })
      .catch(function () {
        localStorage.removeItem('lse_edits');
        location.reload();
      });
  });

  /* ── Ctrl+S ── */
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (editMode) saveEdits();
    }
  });

  /* ── Init ── */
  document.body.classList.add('ed-active');

})();
