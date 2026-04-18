/* ═══════════════════════════════════════════════════════════════
   LONDON SCHOOL — Floating Engagement Widget
   Self-injecting. Add to any page with: <script src="js/widget.js"></script>
   No HTML changes needed. Replaces the old .wa floating button.

   Features:
   1. Rotating teaser bubble (page-specific messages, every 7s)
   2. Expanded panel: Book Visit / WhatsApp / Call + mini callback form
   3. Exit-intent modal (desktop mouseleave + mobile rapid scroll-up)
   4. Pixel events: InitiateCheckout, Contact, Lead — with source tags

   Suppressed on:  enroll.html (own form), editor.html, 404.html
   Minimal on:     thank-you.html (post-submit)
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ── CONFIG ── */
  var WA_NUMBER   = '17208397813';                           // TEST — swap to 923010499777 for prod
  var CALL_NUMBER = '+17208397813';
  var CALL_LABEL  = '0301-0499777';                          // displayed text
  var ENDPOINT    = 'https://script.google.com/macros/s/AKfycbyEMq2spkrKlbWtMdbbwELf3f0sAw5QILIz_RSxTmIbQmMcOtMxDPgsvYdTYCcDahlb/exec';
  var ROTATION_MS = 5000;
  var FIRST_SHOW_MS = 1200;
  var LOGO_SRC    = 'img/logo-icon.png';
  /* Master kill-switch and auto-surface toggles.
     WIDGET_ENABLED=false removes the entire floating chat widget.
     AUTO_TEASER / AUTO_EXIT_INTENT control the two auto-appearing surfaces
     independently — the bubble + click-to-open panel + form still work. */
  var WIDGET_ENABLED    = true;
  var AUTO_TEASER       = true;
  var AUTO_EXIT_INTENT  = true;
  if (!WIDGET_ENABLED) return;

  /* ── PAGE DETECTION ── */
  var path = window.location.pathname.toLowerCase();
  var pageKey = (function(){
    if (/\/(|index\.html)$/.test(path) || path === '/' || path.endsWith('/')) return 'home';
    if (path.indexOf('about')        > -1) return 'about';
    if (path.indexOf('academics')    > -1) return 'academics';
    if (path.indexOf('ask-prof')     > -1) return 'ask';
    if (path.indexOf('yearbook')     > -1) return 'tour';
    if (path.indexOf('campus')       > -1) return 'campus';
    if (path.indexOf('faculty')      > -1) return 'faculty';
    if (path.indexOf('news')         > -1) return 'news';
    if (path.indexOf('thank-you')    > -1) return 'thankyou';
    if (path.indexOf('enroll')       > -1) return 'enroll';
    if (path.indexOf('editor')       > -1) return 'editor';
    if (path.indexOf('404')          > -1) return 'error';
    return 'home';
  })();

  /* Pages where widget is fully suppressed */
  if (pageKey === 'enroll' || pageKey === 'editor' || pageKey === 'error') return;

  /* ── PAGE-SPECIFIC TEASER MESSAGES ── */
  /* Soft, parent-trusted tone. No emojis in copy — the bubble itself is
     the visual hook. Messages rotate: differentiator, proof, soft CTA. */
  var TEASERS = {
    home:      ['AI and Robotics from age three', 'Two US coding certs at Kindergarten', '47 Early Bird spots left for 2025–26'],
    about:     ['Built on the Prof. Waris Mir legacy', 'Small classes. Cambridge curriculum.', 'Ask about our admissions process'],
    academics: ['Cambridge Pathway, AI-integrated', 'Two US coding certs at Kindergarten', 'Three foreign languages from Grade 1'],
    ask:       ['Rather talk to a real person?', 'Ask about our AI programme', 'We reply within a few minutes'],
    tour:      ['Like what you see?', 'Book a 45-minute campus visit', 'We\'ll answer every question'],
    campus:    ['See our Robotics Lab in person', 'Purpose-built for AI learning', 'Come visit — free 45-min tour'],
    faculty:   ['Cambridge-trained teachers', 'Every teacher knows every child', 'Small classes, bigger futures'],
    news:      ['Admissions Open for 2025–26', 'Early Bird rate — 47 spots left', 'Book a free campus visit'],
    thankyou:  ['Thanks for reaching out', 'Take a virtual tour while you wait', 'Or WhatsApp us directly']
  };
  var teasers = TEASERS[pageKey] || TEASERS.home;

  /* Exit-intent suppressed on thank-you (they already converted) and
     globally gated behind AUTO_EXIT_INTENT so the team can kill it fast
     without touching DOM / handlers below. */
  var EXIT_INTENT_ENABLED = AUTO_EXIT_INTENT && pageKey !== 'thankyou';

  /* Don't run twice */
  if (document.getElementById('ls-widget')) return;

  /* ── INJECT STYLESHEET ── */
  /* Critical inline CSS first so the panel/teaser/modal are guaranteed
     hidden before the external stylesheet arrives. Without this the
     panel briefly flashes open on load ("chat tries to open and close")
     while widget.css is still in-flight. */
  if (!document.getElementById('ls-w-critical')) {
    var critical = document.createElement('style');
    critical.id = 'ls-w-critical';
    critical.textContent =
      '#ls-widget .ls-w__panel,#ls-widget .ls-w__teaser{opacity:0;pointer-events:none;visibility:hidden}' +
      '#ls-widget.is-open .ls-w__panel{opacity:1;pointer-events:auto;visibility:visible}' +
      '#ls-widget .ls-w__teaser.is-visible{opacity:1;pointer-events:auto;visibility:visible}' +
      '#ls-ei{display:none}#ls-ei.is-visible{display:block}';
    document.head.appendChild(critical);
  }
  if (!document.querySelector('link[href*="widget.css"]')) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'css/widget.css';
    document.head.appendChild(css);
  }

  /* ── REMOVE OLD STATIC WHATSAPP BUTTON (if present) ── */
  var oldWa = document.querySelector('a.wa');
  if (oldWa) oldWa.remove();

  /* ── HELPERS ── */
  function fire(event, params) {
    try { if (typeof fbq === 'function') fbq('track', event, params || {}); }
    catch(e){ /* silent */ }
  }
  function fireCustom(event, params) {
    try { if (typeof fbq === 'function') fbq('trackCustom', event, params || {}); }
    catch(e){ /* silent */ }
  }
  function esc(s){ return String(s || '').replace(/[<>&"']/g, function(c){
    return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'}[c];
  }); }
  function waLink(text){
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }
  function getUTMs(){
    var p = new URLSearchParams(window.location.search);
    return {
      utm_source:   p.get('utm_source')   || '',
      utm_medium:   p.get('utm_medium')   || '',
      utm_campaign: p.get('utm_campaign') || '',
      utm_content:  p.get('utm_content')  || '',
      utm_term:     p.get('utm_term')     || '',
      fbclid:       p.get('fbclid')       || ''
    };
  }

  /* ── BUILD DOM ── */
  var wrapper = document.createElement('div');
  wrapper.id = 'ls-widget';
  wrapper.className = 'ls-w';
  wrapper.setAttribute('data-page', pageKey);
  wrapper.innerHTML = [
    /* Rotating teaser bubble */
    '<button class="ls-w__teaser" id="ls-w-teaser" aria-label="Open chat">',
      '<span class="ls-w__teaser-text" id="ls-w-teaser-text">', esc(teasers[0]), '</span>',
      '<span class="ls-w__teaser-close" id="ls-w-teaser-close" aria-label="Dismiss">&times;</span>',
    '</button>',

    /* Main button */
    '<button class="ls-w__bubble" id="ls-w-bubble" aria-label="Contact London School">',
      '<img src="', LOGO_SRC, '" alt="" class="ls-w__logo">',
      '<span class="ls-w__dot" aria-hidden="true"></span>',
      '<svg class="ls-w__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    '</button>',

    /* Expanded panel */
    '<div class="ls-w__panel" id="ls-w-panel" role="dialog" aria-label="Contact London School" aria-hidden="true">',
      '<div class="ls-w__header">',
        '<img src="', LOGO_SRC, '" alt="" class="ls-w__h-logo">',
        '<div class="ls-w__h-text">',
          '<div class="ls-w__h-title">London School</div>',
          '<div class="ls-w__h-sub"><span class="ls-w__h-live"></span> Typically replies in minutes</div>',
        '</div>',
      '</div>',
      '<div class="ls-w__body">',
        '<div class="ls-w__greet">',
          '👋 <strong>Assalamu Alaikum!</strong><br>How can we help you today?',
        '</div>',

        '<a href="enroll.html" class="ls-w__opt ls-w__opt--primary" data-w-cta="book-visit">',
          '<span class="ls-w__opt-ico" style="background:rgba(193,53,61,.1);color:var(--red)">',
            '<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>',
          '</span>',
          '<span class="ls-w__opt-body">',
            '<span class="ls-w__opt-title">Book a Free Campus Visit</span>',
            '<span class="ls-w__opt-sub">45-min tour · see classrooms & labs</span>',
          '</span>',
          '<span class="ls-w__opt-arrow">→</span>',
        '</a>',

        '<a href="', waLink("Hi, I have a question about admissions at London School."), '" ',
           'target="_blank" rel="noopener" ',
           'class="ls-w__opt ls-w__opt--wa" data-w-cta="whatsapp" data-wa-cta="widget-wa">',
          '<span class="ls-w__opt-ico" style="background:rgba(37,211,102,.12);color:#0c5635">',
            '<svg viewBox="0 0 24 24" fill="#25D366" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.504 3.934 1.393 5.608L0 24l6.574-1.346A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.86 0-3.632-.494-5.188-1.42l-.372-.22-3.856.79.82-3.756-.242-.385A9.686 9.686 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>',
          '</span>',
          '<span class="ls-w__opt-body">',
            '<span class="ls-w__opt-title">WhatsApp Us</span>',
            '<span class="ls-w__opt-sub">Instant reply · send a question</span>',
          '</span>',
          '<span class="ls-w__opt-arrow">→</span>',
        '</a>',

        '<a href="tel:', CALL_NUMBER, '" class="ls-w__opt ls-w__opt--call" data-w-cta="call">',
          '<span class="ls-w__opt-ico" style="background:rgba(47,85,129,.1);color:var(--navy)">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015 12.84a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
          '</span>',
          '<span class="ls-w__opt-body">',
            '<span class="ls-w__opt-title">Call ', CALL_LABEL, '</span>',
            '<span class="ls-w__opt-sub">Mon–Sat · 8 AM – 4 PM</span>',
          '</span>',
          '<span class="ls-w__opt-arrow">→</span>',
        '</a>',

        '<div class="ls-w__divider"><span>or drop your number</span></div>',

        '<form class="ls-w__form" id="ls-w-form" novalidate>',
          '<input type="text" name="parent_name" id="ls-w-name" placeholder="Your name (optional)" autocomplete="name">',
          '<div class="ls-w__form-row">',
            '<input type="tel" name="phone" id="ls-w-phone" placeholder="03XX XXXXXXX" required autocomplete="tel" inputmode="tel">',
            '<button type="submit" class="ls-w__form-btn" id="ls-w-form-btn">',
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
            '</button>',
          '</div>',
          '<input type="hidden" name="landing_page" value="', esc(path), '#widget">',
          '<input type="hidden" name="form_source" value="widget">',
          '<input type="hidden" name="subject" value="\ud83d\udcac Widget callback — London School">',
          '<input type="checkbox" name="botcheck" class="ls-w__honey" tabindex="-1" autocomplete="off">',
          '<p class="ls-w__note">We\'ll call within <strong>10 minutes</strong> during office hours. No spam.</p>',
        '</form>',

        '<div class="ls-w__success" id="ls-w-success" hidden>',
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="36" height="36"><polyline points="20 6 9 17 4 12"/></svg>',
          '<h4>Got it!</h4>',
          '<p>We\'ll call you within 10 minutes. Keep an eye on your phone.</p>',
          '<a href="', waLink("Hi, I just requested a callback via the website widget."), '" target="_blank" rel="noopener" class="ls-w__success-wa" data-wa-cta="widget-success">Or message us on WhatsApp now →</a>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');

  /* ── EXIT INTENT MODAL ── */
  if (EXIT_INTENT_ENABLED) {
    var ei = document.createElement('div');
    ei.id = 'ls-ei';
    ei.className = 'ls-ei';
    ei.setAttribute('aria-hidden', 'true');
    ei.innerHTML = [
      '<div class="ls-ei__overlay" id="ls-ei-overlay"></div>',
      '<div class="ls-ei__card" role="dialog" aria-label="Before you go">',
        '<button class="ls-ei__close" id="ls-ei-close" aria-label="Close">&times;</button>',
        '<div class="ls-ei__emoji" aria-hidden="true">🎁</div>',
        '<h3>Wait — before you go!</h3>',
        '<p>Leave your number and we\'ll WhatsApp you the full <strong>London School brochure</strong> + answer any questions your family has.</p>',
        '<form class="ls-ei__form" id="ls-ei-form" novalidate>',
          '<input type="tel" name="phone" placeholder="Your WhatsApp number (03XX…)" required autocomplete="tel" inputmode="tel">',
          '<button type="submit">Send me the brochure</button>',
          '<input type="hidden" name="parent_name" value="">',
          '<input type="hidden" name="landing_page" value="' + path + '#exit_intent">',
          '<input type="hidden" name="form_source" value="exit_intent">',
          '<input type="hidden" name="subject" value="🚪 Exit-intent lead — London School">',
          '<input type="checkbox" name="botcheck" class="ls-w__honey" tabindex="-1" autocomplete="off">',
        '</form>',
        '<p class="ls-ei__fine">🔒 We\'ll only message once. No spam, promise.</p>',
      '</div>'
    ].join('');
    document.body.appendChild(ei);
  }

  document.body.appendChild(wrapper);

  /* ── ELEMENT REFS ── */
  var bubble       = document.getElementById('ls-w-bubble');
  var panel        = document.getElementById('ls-w-panel');
  var teaser       = document.getElementById('ls-w-teaser');
  var teaserText   = document.getElementById('ls-w-teaser-text');
  var teaserClose  = document.getElementById('ls-w-teaser-close');
  var form         = document.getElementById('ls-w-form');
  var formBtn      = document.getElementById('ls-w-form-btn');
  var nameInput    = document.getElementById('ls-w-name');
  var phoneInput   = document.getElementById('ls-w-phone');
  var success      = document.getElementById('ls-w-success');

  /* ── TEASER ROTATION ── */
  var teaserIndex = 0;
  var teaserHidden = false;
  var teaserTimer;

  function showTeaser(){
    if (teaserHidden || wrapper.classList.contains('is-open')) return;
    teaser.classList.add('is-visible');
  }
  function hideTeaser(){
    teaser.classList.remove('is-visible');
  }
  function rotateTeaser(){
    if (teaserHidden || wrapper.classList.contains('is-open')) return;
    teaserIndex = (teaserIndex + 1) % teasers.length;
    /* fade out → swap → fade in */
    teaserText.style.opacity = '0';
    setTimeout(function(){
      teaserText.textContent = teasers[teaserIndex];
      teaserText.style.opacity = '1';
    }, 250);
  }

  /* Suppress auto-show after the first appearance of the session so the
     teaser doesn't pop out on every page load / refresh. The bubble icon
     still invites a click; the speech bubble just isn't pushed again. */
  var TEASER_SHOWN_KEY = 'ls-w-teaser-shown';
  var TEASER_DISMISS_KEY = 'ls-w-teaser-dismissed';
  try {
    if (sessionStorage.getItem(TEASER_DISMISS_KEY) || sessionStorage.getItem(TEASER_SHOWN_KEY)) {
      teaserHidden = true;
    }
  } catch(_){}

  /* Start rotation — only if auto-teaser is enabled and not already
     shown/dismissed this session */
  if (AUTO_TEASER && !teaserHidden) {
    setTimeout(function(){
      showTeaser();
      try { sessionStorage.setItem(TEASER_SHOWN_KEY, '1'); } catch(_){}
    }, FIRST_SHOW_MS);
    teaserTimer = setInterval(rotateTeaser, ROTATION_MS);
  } else {
    teaserHidden = true; /* keep it suppressed even on hover/rotation */
  }

  teaserClose.addEventListener('click', function(e){
    e.stopPropagation();
    teaserHidden = true;
    hideTeaser();
    try { sessionStorage.setItem(TEASER_DISMISS_KEY, '1'); } catch(_){}
  });

  /* Click teaser body = open panel */
  teaser.addEventListener('click', function(){ openPanel(); });

  /* ── PANEL OPEN/CLOSE ── */
  var panelOpenedAt = 0;
  function openPanel(){
    wrapper.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    panelOpenedAt = Date.now();
    hideTeaser();
    fire('InitiateCheckout', { source: 'widget', page: pageKey });
    fireCustom('WidgetOpen', { page: pageKey });
  }
  function closePanel(){
    wrapper.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
  }
  bubble.addEventListener('click', function(e){
    e.stopPropagation(); /* prevent click from bubbling to document's outside-click handler */
    if (wrapper.classList.contains('is-open')) {
      if (Date.now() - panelOpenedAt < 300) return; /* anti-flicker guard */
      closePanel();
    } else {
      openPanel();
    }
  });
  /* Stop clicks inside the panel from closing it */
  panel.addEventListener('click', function(e){ e.stopPropagation(); });

  /* Click outside = close — but only after 300ms grace so opening doesn't double-fire */
  document.addEventListener('click', function(e){
    if (!wrapper.classList.contains('is-open')) return;
    if (Date.now() - panelOpenedAt < 300) return;
    if (wrapper.contains(e.target)) return;
    closePanel();
  });

  /* ESC = close */
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && wrapper.classList.contains('is-open')) closePanel();
  });

  /* Track option clicks */
  panel.querySelectorAll('[data-w-cta]').forEach(function(a){
    a.addEventListener('click', function(){
      var cta = a.getAttribute('data-w-cta');
      fireCustom('WidgetCTA', { cta: cta, page: pageKey });
      if (cta === 'whatsapp') fire('Contact', { source: 'widget-wa', page: pageKey });
      if (cta === 'call')     fire('Contact', { source: 'widget-call', page: pageKey });
    });
  });

  /* ── MINI FORM SUBMIT ── */
  phoneInput.addEventListener('input', function(){
    this.value = this.value.replace(/[^\d+\s\-]/g, '');
  });

  function postForm(formEl, sourceTag, onSuccess, onError) {
    var fd = new FormData(formEl);
    /* inject UTMs + metadata */
    var utms = getUTMs();
    Object.keys(utms).forEach(function(k){ fd.append(k, utms[k]); });
    fd.append('submitted_at', new Date().toISOString());
    fd.append('referrer', document.referrer || '(direct)');
    fd.append('user_agent', navigator.userAgent);

    var safety = setTimeout(function(){ onSuccess(true); }, 8000);

    fetch(ENDPOINT, { method: 'POST', body: fd, mode: 'no-cors' })
      .then(function(){ clearTimeout(safety); onSuccess(false); })
      .catch(function(err){
        clearTimeout(safety);
        if (onError) onError(err);
      });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!form.checkValidity()){ form.reportValidity(); return; }
    if (form.botcheck.checked){ return; } /* honeypot */

    formBtn.disabled = true;
    formBtn.innerHTML = '<span class="ls-w__spin"></span>';

    /* Fire Pixel Lead */
    fire('Lead', {
      content_name: 'Widget Callback',
      content_category: 'Widget',
      source: 'widget',
      value: 18000, currency: 'PKR'
    });
    fireCustom('WidgetFormSubmit', { page: pageKey });

    postForm(form, 'widget', function(){
      form.hidden = true;
      success.hidden = false;
    }, function(){
      /* Fallback: redirect to WhatsApp with what they filled */
      var name = encodeURIComponent(nameInput.value || '');
      var phone = encodeURIComponent(phoneInput.value || '');
      window.open(waLink('Hi, I tried the website callback form but it didn\'t go through. Name: ' + name + ' Phone: ' + phone), '_blank');
      formBtn.disabled = false;
      formBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
    });
  });

  /* ═══════════════════════════════════════════════════════════════
     EXIT INTENT MODAL
     ═══════════════════════════════════════════════════════════════ */
  if (!EXIT_INTENT_ENABLED) return;

  var eiRoot     = document.getElementById('ls-ei');
  var eiOverlay  = document.getElementById('ls-ei-overlay');
  var eiClose    = document.getElementById('ls-ei-close');
  var eiForm     = document.getElementById('ls-ei-form');

  /* Throttled with two layers so refresh-happy users don't see the modal
     on every page load:
       - sessionStorage: hard block for the rest of this browser session
         once the modal has been shown (survives refresh, resets on tab close)
       - localStorage:   7-day cross-session throttle (can silently fail
         in incognito / strict-privacy modes, hence the session fallback) */
  var EI_KEY = 'ls-ei-shown-at';
  var EI_SESSION_KEY = 'ls-ei-shown-session';
  var EI_THROTTLE_MS = 7 * 24 * 60 * 60 * 1000;
  var eiShown = false;
  try {
    if (sessionStorage.getItem(EI_SESSION_KEY)) eiShown = true;
  } catch(_){}
  try {
    var last = parseInt(localStorage.getItem(EI_KEY) || '0', 10);
    if (last && (Date.now() - last) < EI_THROTTLE_MS) eiShown = true;
  } catch(_){}
  var eiLockUntil = Date.now() + 20000; /* don't fire in first 20s */

  var eiOpenedAt = 0;
  function showExitIntent(trigger){
    if (eiShown || Date.now() < eiLockUntil) return;
    if (wrapper.classList.contains('is-open')) return;
    eiShown = true;
    eiOpenedAt = Date.now();
    try { localStorage.setItem(EI_KEY, String(Date.now())); } catch(_){}
    try { sessionStorage.setItem(EI_SESSION_KEY, '1'); } catch(_){}
    eiRoot.classList.add('is-visible');
    eiRoot.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    fireCustom('ExitIntentShown', { trigger: trigger, page: pageKey });
  }
  function hideExitIntent(){
    eiRoot.classList.remove('is-visible');
    eiRoot.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* Desktop: mouse leaves viewport from the top */
  document.addEventListener('mouseleave', function(e){
    if (e.clientY <= 0) showExitIntent('desktop-mouseleave');
  });

  /* Mobile: rapid upward scroll near top of page
     (detects the "pulling down to reveal URL bar" exit gesture) */
  var lastY = window.scrollY;
  var lastT = Date.now();
  window.addEventListener('scroll', function(){
    var now = Date.now();
    var y = window.scrollY;
    var dy = lastY - y;      /* positive = scrolling up */
    var dt = now - lastT;
    if (y < 120 && dy > 40 && dt < 300 && dt > 0) {
      showExitIntent('mobile-scrollup');
    }
    lastY = y;
    lastT = now;
  }, { passive: true });

  /* Close triggers — with 500ms fade-in grace so the trigger that OPENED the
     modal can't accidentally close it during its fade animation */
  eiClose.addEventListener('click', function(e){
    e.stopPropagation();
    hideExitIntent();
  });
  eiOverlay.addEventListener('click', function(e){
    e.stopPropagation();
    if (Date.now() - eiOpenedAt < 500) return;
    hideExitIntent();
  });
  /* Prevent card clicks from bubbling up to overlay */
  eiRoot.querySelector('.ls-ei__card').addEventListener('click', function(e){
    e.stopPropagation();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && eiRoot.classList.contains('is-visible') && Date.now() - eiOpenedAt > 500) {
      hideExitIntent();
    }
  });

  /* Exit-intent submit */
  eiForm.addEventListener('submit', function(e){
    e.preventDefault();
    if (!eiForm.checkValidity()){ eiForm.reportValidity(); return; }
    if (eiForm.botcheck.checked){ return; }

    var btn = eiForm.querySelector('button[type="submit"]');
    var origBtn = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Sending…';

    fire('Lead', {
      content_name: 'Exit Intent',
      content_category: 'ExitIntent',
      source: 'exit_intent',
      value: 18000, currency: 'PKR'
    });

    postForm(eiForm, 'exit_intent', function(){
      /* Redirect to WhatsApp so the brochure conversation starts */
      var phone = eiForm.phone.value;
      var msg = 'Hi, I\'m interested in London School. Please send me the full brochure. My number: ' + phone;
      window.location.href = waLink(msg);
    }, function(){
      btn.disabled = false;
      btn.innerHTML = origBtn;
      var phone = eiForm.phone.value;
      window.location.href = waLink('Hi, please send me the London School brochure. My number: ' + phone);
    });
  });

})();
