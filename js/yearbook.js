/* London School — Virtual Tour JS */
(function () {
  'use strict';

  /* ── Nav scroll ── */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Mobile menu ── */
  var ham = document.getElementById('ham'), mob = document.getElementById('mob');
  ham.addEventListener('click', function () {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });
  window.closeM = function () {
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ── Reveal on scroll ── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('on'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.rv').forEach(function (el) { revealObs.observe(el); });

  /* ── Tour progress — scroll-spy + click ── */
  var tabs = document.querySelectorAll('.vt-tab');
  var stops = document.querySelectorAll('.vt-stop');
  var progress = document.getElementById('vtProgress');

  // Click: scroll to target stop
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = document.getElementById(tab.dataset.target);
      if (!target) return;
      var navH = nav ? nav.offsetHeight : 60;
      var progH = progress ? progress.offsetHeight : 56;
      var y = target.getBoundingClientRect().top + window.scrollY - navH - progH - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Scroll-spy: find which stop's top is closest above the trigger line
  function updateActiveTab() {
    var triggerY = window.scrollY + (nav ? nav.offsetHeight : 60) + (progress ? progress.offsetHeight : 56) + 40;
    var current = '';
    stops.forEach(function (stop) {
      if (stop.getBoundingClientRect().top + window.scrollY <= triggerY) {
        current = stop.id;
      }
    });
    if (!current) return;
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.dataset.target === current);
    });
    // Keep active tab scrolled into view inside the progress bar
    var activeTab = progress && progress.querySelector('.vt-tab.active');
    if (activeTab) {
      var inner = progress.querySelector('.vt-progress__inner');
      if (inner) {
        inner.scrollTo({ left: activeTab.offsetLeft - inner.offsetWidth / 2 + activeTab.offsetWidth / 2, behavior: 'smooth' });
      }
    }
  }

  window.addEventListener('scroll', updateActiveTab, { passive: true });
  updateActiveTab();

  /* ── Smooth scroll for cover CTA ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        var navH = nav ? nav.offsetHeight : 60;
        var progH = progress ? progress.offsetHeight : 56;
        var y = el.getBoundingClientRect().top + window.scrollY - navH - progH - 8;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* ── Lightbox ── */
  var lb = document.getElementById('vtLb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbCount = document.getElementById('lbCount');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var gallery = [];
  var currentIdx = 0;

  function buildGallery() {
    gallery = [];
    // Collect all clickable images in page order
    var selectors = '.vt-cinema img, .vt-card img, .vt-split__img img, .vt-offset__img img, .vt-founder__img img';
    document.querySelectorAll(selectors).forEach(function (img) {
      var caption = '';
      // Look for caption in nearby elements
      var cinema = img.closest('.vt-cinema');
      var card = img.closest('.vt-card');
      var founderImg = img.closest('.vt-founder__img');

      if (cinema) {
        var cap = cinema.querySelector('.vt-cinema__caption');
        caption = cap ? cap.textContent.trim() : (cinema.dataset.caption || '');
      } else if (card) {
        var cap = card.querySelector('.vt-card__caption');
        caption = cap ? cap.textContent.trim() : '';
      } else if (founderImg) {
        caption = img.alt || '';
      } else {
        var wrap = img.closest('[data-caption]');
        caption = wrap ? wrap.dataset.caption : img.alt;
      }

      gallery.push({ src: img.src, alt: img.alt, caption: caption });
    });
  }

  function openLb(idx) {
    buildGallery();
    currentIdx = Math.max(0, Math.min(idx, gallery.length - 1));
    renderLb();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderLb() {
    var item = gallery[currentIdx];
    if (!item) return;
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    lbCap.textContent = item.caption;
    lbCount.textContent = (currentIdx + 1) + ' of ' + gallery.length;
    lbPrev.style.visibility = currentIdx > 0 ? 'visible' : 'hidden';
    lbNext.style.visibility = currentIdx < gallery.length - 1 ? 'visible' : 'hidden';
  }

  // Attach click to all lightbox-able images
  function attachClicks() {
    var selectors = '.vt-cinema img, .vt-card img, .vt-split__img img, .vt-offset__img img, .vt-founder__img img';
    buildGallery();
    document.querySelectorAll(selectors).forEach(function (img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function () {
        buildGallery();
        var thisSrc = img.src;
        var idx = gallery.findIndex(function (g) { return g.src === thisSrc; });
        openLb(idx >= 0 ? idx : 0);
      });
    });
  }
  attachClicks();

  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  lbPrev.addEventListener('click', function () { if (currentIdx > 0) { currentIdx--; renderLb(); } });
  lbNext.addEventListener('click', function () { if (currentIdx < gallery.length - 1) { currentIdx++; renderLb(); } });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft' && currentIdx > 0) { currentIdx--; renderLb(); }
    if (e.key === 'ArrowRight' && currentIdx < gallery.length - 1) { currentIdx++; renderLb(); }
  });

  // Touch/swipe for lightbox
  var touchStartX = 0;
  lb.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0 && currentIdx < gallery.length - 1) { currentIdx++; renderLb(); }
    if (dx > 0 && currentIdx > 0) { currentIdx--; renderLb(); }
  });

})();

/* ═══════════════════════════════════════════
   YouTube cinematic background
   Must be global — called by YouTube IFrame API
════════════════════════════════════════════ */
var ytWrap     = document.getElementById('ytWrap');
var ytFallback = document.getElementById('coverFallback');
var ytPlayer;

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('ytPlayer', {
    videoId: 'tlUBKNx7u_0',
    playerVars: {
      autoplay:        1,
      mute:            1,
      loop:            1,
      playlist:        'tlUBKNx7u_0', // required for loop
      controls:        0,
      disablekb:       1,
      fs:              0,
      rel:             0,
      iv_load_policy:  3,
      modestbranding:  1,
      showinfo:        0,
      playsinline:     1,
      enablejsapi:     1,
      origin:          window.location.origin
    },
    events: {
      onReady: function (e) {
        e.target.mute();
        e.target.playVideo();
      },
      onStateChange: function (e) {
        // YT.PlayerState.PLAYING === 1
        if (e.data === 1) {
          // Video is playing — reveal it, fade out the fallback photo
          if (ytWrap)     ytWrap.classList.add('playing');
          if (ytFallback) ytFallback.classList.add('hidden');
        }
      },
      onError: function () {
        // Keep fallback visible if video fails
        if (ytWrap) ytWrap.style.display = 'none';
      }
    }
  });
}
