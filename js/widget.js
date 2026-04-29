/* ═══════════════════════════════════════════════════════════════
   LONDON SCHOOL — Floating Engagement Widget
   Self-injecting. Add to any page with: <script src="js/widget.js"></script>
   No HTML changes needed. Replaces the old .wa floating button.

   Features:
   1. Rotating teaser bubble (page-specific messages, every 7s)
   2. Expanded panel: Book Visit / WhatsApp / Call + mini callback form
   3. Exit-intent modal (desktop mouseleave + mobile rapid scroll-up)
   4. GA4 + Vercel events: widget_open, whatsapp_click, phone_click, book_spot_click, generate_lead

   Suppressed on:  enroll.html (own form), 404.html
   Minimal on:     thank-you.html (post-submit)
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ── CONFIG ── */
  var WA_NUMBER   = '923010499777';                          // Pakistan WhatsApp (production)
  var CALL_NUMBER = '+923010499777';
  var CALL_LABEL  = '0301-0499777';                          // displayed text
  var ENDPOINT    = 'https://script.google.com/macros/s/AKfycbyEMq2spkrKlbWtMdbbwELf3f0sAw5QILIz_RSxTmIbQmMcOtMxDPgsvYdTYCcDahlb/exec';
  var ROTATION_MS = 5000;
  var FIRST_SHOW_MS = 1200;
  var LOGO_SRC    = 'img/logo-icon.webp';
  /* Master kill-switch and auto-surface toggles.
     WIDGET_ENABLED=false removes the entire floating chat widget.
     AUTO_TEASER / AUTO_EXIT_INTENT control the two auto-appearing surfaces
     independently — the bubble + click-to-open panel + form still work. */
  var WIDGET_ENABLED    = true;
  var AUTO_TEASER       = true;
  var AUTO_EXIT_INTENT  = false;
  /* Auto-open the full panel on mobile home page first visit (data-backed:
     WhatsApp converts ~6× higher than form; widget panel was under-opened). */
  var AUTO_OPEN_MOBILE_HOME = true;
  var AUTO_OPEN_DELAY_MS    = 4000;
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
    home:      ['Cambridge Pathway · AI & Robotics', 'Limited seats — reserve your spot', 'AI and Robotics from age three'],
    about:     ['Built on the Prof. Waris Mir legacy', 'Small classes. Cambridge curriculum.', 'A warm welcome — say hello'],
    academics: ['Cambridge Pathway, AI-integrated', 'Two US coding certs at Kindergarten', 'A leading international school'],
    ask:       ['Rather speak to a real person?', 'Ask anything about admissions', 'We\'re here to help'],
    tour:      ['Come and see for yourself', 'Reserve a campus visit', 'We\'ll answer every question'],
    campus:    ['See our Robotics Lab in person', 'Purpose-built for AI learning', 'Reserve a visit — bring your child'],
    faculty:   ['Cambridge-trained teachers', 'Every teacher knows every child', 'Small classes, bigger futures'],
    news:      ['Admissions Open for 2026–27', 'Cambridge Pathway · AI & Robotics', 'Reserve a campus visit'],
    thankyou:  ['Thank you for reaching out', 'Have a peek at our campus while you wait', 'Or WhatsApp us anytime']
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
  /* trackAll() fires GA4 + Vercel Analytics events for any widget interaction. */
  function trackAll(name, props){
    var p = props || {};
    try { if (typeof window.gtag === 'function') window.gtag('event', name, p); } catch(e){}
    try { if (typeof window.va === 'function') window.va('event', Object.assign({ name: name }, p)); } catch(e){}
  }
  function esc(s){ return String(s || '').replace(/[<>&"']/g, function(c){
    return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'}[c];
  }); }
  function waLink(text, tag){
    /* Prefix every prefilled message with a [Web · <tag>] marker so admissions
       can see at a glance which website surface drove the message. Mirrors the
       convention used on enroll.html ("[Web · Hero Form]"). */
    var msg = tag ? ('[Web · ' + tag + '] ' + text) : text;
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  /* ── INLINE SVG ICONS (no emoji, brand-consistent) ──
     Each returns a self-contained <svg> string sized 18×18 by default. */
  var ICON = {
    chat:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    wa:     '<svg viewBox="0 0 24 24" fill="#25D366" width="18" height="18" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.504 3.934 1.393 5.608L0 24l6.574-1.346A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.86 0-3.632-.494-5.188-1.42l-.372-.22-3.856.79.82-3.756-.242-.385A9.686 9.686 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>',
    form:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>',
    grad:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    book:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    school: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>',
    coin:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 9h4.5a2 2 0 0 1 0 4H10v3"/></svg>',
    bubble: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    pin:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    star:   '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    cal:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    map:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>'
  };
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
    '<button class="ls-w__teaser" id="ls-w-teaser" title="Open chat with Prof Mir">',
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
        '<button type="button" class="ls-w__h-back" id="ls-w-h-back" aria-label="Back to options" hidden>',
          ICON.arrowL,
        '</button>',
        '<img src="', LOGO_SRC, '" alt="" class="ls-w__h-logo">',
        '<div class="ls-w__h-text">',
          '<div class="ls-w__h-title">London School</div>',
          '<div class="ls-w__h-sub"><span class="ls-w__h-live"></span> Admissions team online</div>',
        '</div>',
      '</div>',
      '<div class="ls-w__body">',
        /* Entry route picker (always visible at top of panel until user picks) */
        '<div class="ls-w__entry" id="ls-w-entry">',
          '<div class="ls-w__greet">',
            '<strong>Assalamu Alaikum.</strong><br>',
            'A leading international school following the <strong>Cambridge Pathway with AI and Robotics</strong>.<br>',
            '<span class="ls-w__greet-loc">', ICON.pin, ' Township, Lahore &middot; opposite Ideal Park</span>',
            '<span class="ls-w__greet-urg">', ICON.star, ' Limited seats — reserve your spot.</span>',
          '</div>',
          '<div class="ls-w__greet-cta">How can we help your family today?</div>',
          '<div class="ls-w__entry-grid">',
            '<button type="button" class="ls-w__entry-btn ls-w__entry-btn--chat" data-entry="chat">',
              '<span class="ls-w__entry-ico">', ICON.chat, '</span>',
              '<span class="ls-w__entry-label">Chat with us</span>',
              '<span class="ls-w__entry-sub">Ask a few quick questions</span>',
            '</button>',
            '<button type="button" class="ls-w__entry-btn ls-w__entry-btn--wa" data-entry="wa">',
              '<span class="ls-w__entry-ico">',
                '<svg viewBox="0 0 24 24" fill="#25D366" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.504 3.934 1.393 5.608L0 24l6.574-1.346A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.86 0-3.632-.494-5.188-1.42l-.372-.22-3.856.79.82-3.756-.242-.385A9.686 9.686 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>',
              '</span>',
              '<span class="ls-w__entry-label">Message us on WhatsApp</span>',
              '<span class="ls-w__entry-sub">Easiest way to ask anything</span>',
            '</button>',
            '<button type="button" class="ls-w__entry-btn ls-w__entry-btn--form" data-entry="form">',
              '<span class="ls-w__entry-ico">', ICON.form, '</span>',
              '<span class="ls-w__entry-label">Ask us to call you</span>',
              '<span class="ls-w__entry-sub">Leave your number and our team will reach out</span>',
            '</button>',
          '</div>',
        '</div>',

        /* Chat tree (revealed when "Chat with us" picked) */
        '<div class="ls-w__chat" id="ls-w-chat" hidden>',
          '<div class="ls-w__chat-stream" id="ls-w-chat-stream"></div>',
          '<button type="button" class="ls-w__chat-back" id="ls-w-chat-back" hidden>← Back to topics</button>',
        '</div>',

        /* Legacy options block — kept for the "Drop your number" entry route
           (the form lives below) and as a fallback if chat is exited. */
        '<div class="ls-w__legacy" id="ls-w-legacy" hidden>',
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

        '<a href="', waLink('Assalamu Alaikum, I had a question about admissions at London School.', 'Widget'), '" ',
           'target="_blank" rel="noopener" ',
           'class="ls-w__opt ls-w__opt--wa" data-w-cta="whatsapp" data-wa-cta="widget-wa" data-wa-source="', esc(pageKey), '-widget">',
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
        '</div>', /* /ls-w__legacy */

        /* Form route — revealed when "Drop your number" entry picked, or when chat hits fee deflection */
        '<div class="ls-w__form-wrap" id="ls-w-form-wrap" hidden>',
        '<div class="ls-w__form-prompt" id="ls-w-form-prompt">Leave your number and our admissions team will call you back. We\'d love to hear about your child.</div>',

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
          '<p class="ls-w__note">A real person from admissions will call you back. No spam, ever.</p>',
        '</form>',

        '<div class="ls-w__success" id="ls-w-success" hidden>',
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="36" height="36"><polyline points="20 6 9 17 4 12"/></svg>',
          '<h4>Thank you</h4>',
          '<p>We have your number. Our admissions team will reach out to you soon.</p>',
          '<a href="', waLink('Assalamu Alaikum, I just left my number on your website. Happy to chat here too.', 'Widget Success'), '" target="_blank" rel="noopener" class="ls-w__success-wa" data-wa-cta="widget-success" data-wa-source="', esc(pageKey), '-widget-success">Or say hello on WhatsApp →</a>',
        '</div>',
        '</div>', /* /ls-w__form-wrap */
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

  /* Track WA clicks from the success state (after the user submits the
     mini-form they sometimes also tap "Or say hello on WhatsApp"). Mirrors
     the goToWA tracking shape so funnel reports tally consistently. */
  if (success) {
    var successWa = success.querySelector('.ls-w__success-wa');
    if (successWa) {
      successWa.addEventListener('click', function(){
        trackAll('whatsapp_click', {
          source: 'widget-success-' + pageKey,
          cta: 'widget-success',
          page: path
        });
        try { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); } catch(e){}
      });
    }
  }

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
  /* Mobile only: lock body scroll while the panel is open so the page
     behind doesn't scroll under the user's thumb. Restored on close. */
  var bodyScrollY = 0;
  function lockBodyScroll(){
    if (window.innerWidth > 768) return;
    bodyScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = (-bodyScrollY) + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }
  function unlockBodyScroll(){
    if (!document.body.style.position) return;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, bodyScrollY);
  }
  function openPanel(autoSource){
    wrapper.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    panelOpenedAt = Date.now();
    hideTeaser();
    lockBodyScroll();
    trackPanelOpen(autoSource);
  }
  function closePanel(){
    wrapper.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
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

  /* ═══════════════════════════════════════════════════════════════
     CHATBOT — entry router + option-tree Q&A + fee deflection
     ═══════════════════════════════════════════════════════════════ */
  var entryEl    = document.getElementById('ls-w-entry');
  var chatEl     = document.getElementById('ls-w-chat');
  var chatStream = document.getElementById('ls-w-chat-stream');
  var chatBack   = document.getElementById('ls-w-chat-back');
  var legacyEl   = document.getElementById('ls-w-legacy');
  var formWrap   = document.getElementById('ls-w-form-wrap');
  var formPrompt = document.getElementById('ls-w-form-prompt');

  /* Q&A bank — soft, warm, parent-friendly tone. Buttons-only.
     Adding to this object auto-renders new questions. Topic IDs are kept
     stable so analytics stay comparable across releases. */
  var QA = {
    admissions: {
      label: 'Admissions for my child',
      ico: ICON.grad,
      qs: [
        { id: 'classes-accepted', q: 'Which classes do you teach?',
          a: 'We welcome children from <strong>Pre-Nursery through Class 7</strong> right now. Class 8 will be added from 2026–27 onwards.' },
        { id: 'admissions-open', q: 'Are admissions open?',
          a: 'Yes — admissions for <strong>2026–27</strong> are open. Seats are limited each year as we keep classes small, so it\'s worth getting in touch early.' },
        { id: 'admission-process', q: 'How does the admission process work?',
          a: 'It\'s simple and personal — no surprises:<br>1. Visit the campus and meet the team.<br>2. Bring your child along for a gentle meet-and-greet.<br>3. Share a few documents.<br>4. We\'ll guide you through every step from there.' },
        { id: 'documents', q: 'What documents will I need?',
          a: 'Just the basics — birth certificate copy, the child\'s most recent school report (if applicable), a recent photograph, and parent CNICs. We\'ll share the full checklist on WhatsApp so nothing is missed.' },
        { id: 'book-tour', q: 'Can I visit the campus first?',
          a: 'Of course. We\'d love to show you around. Pick whichever feels easier:', cta: 'book-or-wa' },
      ]
    },
    curriculum: {
      label: 'What and how kids learn',
      ico: ICON.book,
      qs: [
        { id: 'cambridge', q: 'Do you follow the Cambridge curriculum?',
          a: 'Yes — we follow the <strong>Cambridge International Pathway</strong> from Pre-Nursery all the way through Class 7, with O-Level on the way. AI and Robotics are woven into the curriculum, not an after-school add-on.' },
        { id: 'robotics-ai', q: 'Tell me about Robotics and AI',
          a: 'It\'s one of our proudest things:<br>• <strong>Pakistan\'s most advanced early Robotics programme</strong><br>• <strong>Two US Coding Certifications</strong> starting at Kindergarten<br>• Coding, sensors, and AI from age three<br>• A dedicated, purpose-built Robotics Lab on campus' },
        { id: 'class-size', q: 'How big are the classes?',
          a: 'Small — by design. Every child is known by name, and every teacher has the time to actually listen. That\'s a promise we keep.' },
        { id: 'sports', q: 'What about sports and activities?',
          a: '<strong>Twenty-five plus sports and activities</strong> — cricket, football, athletics, and more. PE every week, plenty of space to run around, and lots of celebration of effort over outcome.' },
        { id: 'ai-bot', q: 'What is "Ask Prof Mir"?',
          a: 'A gentle AI helper inspired by Prof. Waris Mir himself. Children can ask homework or curious questions and get an age-appropriate, safe answer — like having a kind teacher available any time.' },
      ]
    },
    school: {
      label: 'About our school',
      ico: ICON.school,
      qs: [
        { id: 'founded', q: 'How did the school start?',
          a: 'We opened our doors in 2025 in honour of <strong>Prof. Waris Mir</strong> (1938–1987) — a beloved academic, journalist, and father of journalist <strong>Hamid Mir</strong>. His values of curiosity, integrity, and care for every child shape everything we do.' },
        { id: 'leadership', q: 'Who runs the school?',
          a: 'A small, hands-on team. Naveela Choudhary leads as CEO. Huma and Zoya Mir (Prof. Waris Mir\'s family) are our Directors. Mehr un Nisa Masood is our Principal — and the kids adore her.' },
        { id: 'location', q: 'Where is the campus?',
          a: 'We\'re on Ali Road, Township — opposite Ideal Park. Easy to find, plenty of parking, and a quiet pocket of the city. Want directions?', cta: 'maps' },
        { id: 'hours', q: 'What are school hours?',
          a: 'Our admissions office is open Mon–Sat, 8 AM to 4 PM. Class timings vary by age group — we\'ll walk you through the full schedule when you visit.' },
        { id: 'why-us', q: 'What makes London School different?',
          a: 'A few things parents tell us they love:<br>• Cambridge Pathway, with AI and Robotics built in<br>• Two US Coding Certs by Kindergarten — unique in Pakistan<br>• The Prof. Waris Mir legacy of care and curiosity<br>• Small classes, real attention<br>• A campus designed for how children actually learn' },
      ]
    }
  };

  /* The scrolling element is .ls-w__body (the panel's overflow container).
     chatStream itself doesn't scroll — it just contains the messages.
     Schedule on rAF so the new bubble is laid out before we scroll, and
     give the smooth animation time to finish. */
  function scrollChatToBottom(){
    var body = panel.querySelector('.ls-w__body');
    if (!body) return;
    requestAnimationFrame(function(){
      body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
    });
  }
  function clearStream(){ chatStream.innerHTML = ''; chatBack.hidden = true; }
  function botSay(html, opts){
    var bubble = document.createElement('div');
    bubble.className = 'ls-w__msg ls-w__msg--bot';
    bubble.innerHTML = html;
    chatStream.appendChild(bubble);
    scrollChatToBottom();
    return bubble;
  }
  function userSay(text){
    var bubble = document.createElement('div');
    bubble.className = 'ls-w__msg ls-w__msg--user';
    bubble.textContent = text;
    chatStream.appendChild(bubble);
    scrollChatToBottom();
  }
  function renderOptions(items, onClick){
    var wrap = document.createElement('div');
    wrap.className = 'ls-w__chips';
    items.forEach(function(it){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ls-w__chip-btn';
      b.innerHTML = (it.ico ? '<span class="ls-w__chip-ico">' + it.ico + '</span>' : '') + esc(it.label);
      b.addEventListener('click', function(){ onClick(it, b); });
      wrap.appendChild(b);
    });
    chatStream.appendChild(wrap);
    scrollChatToBottom();
    return wrap;
  }

  function showTopicMenu(){
    clearStream();
    botSay('Lovely. What would you like to know first?');
    var topics = Object.keys(QA).map(function(k){ return { key: k, label: QA[k].label, ico: QA[k].ico }; });
    topics.push({ key: 'fees', label: 'Fees and what to expect', ico: ICON.coin });
    topics.push({ key: 'other', label: 'Something else on my mind', ico: ICON.bubble });
    renderOptions(topics, function(t){
      userSay(t.label);
      trackAll('concierge_topic', { topic: t.key, page: path });
      if (t.key === 'fees') return showFeeDeflect();
      if (t.key === 'other') return showOther();
      showQuestionList(t.key);
    });
  }

  function showQuestionList(topicKey){
    chatBack.hidden = false;
    var topic = QA[topicKey];
    var items = topic.qs.map(function(q){ return { key: q.id, label: q.q, _q: q }; });
    items.push({ key: '__more', label: 'I\'d rather chat with someone' });
    renderOptions(items, function(it){
      if (it.key === '__more') return goToWA('Hi, I have a question about ' + topic.label.toLowerCase() + '.', topicKey);
      userSay(it.label);
      trackAll('concierge_question', { topic: topicKey, q: it.key, page: path });
      botSay(it._q.a);
      /* Per-answer CTA */
      if (it._q.cta === 'book-or-wa') {
        renderOptions([
          { key: 'tour', label: 'Reserve a campus visit', ico: ICON.cal },
          { key: 'wa',   label: 'Chat on WhatsApp',       ico: ICON.wa },
        ], function(o){
          if (o.key === 'tour') { trackAll('book_spot_click', { source: 'chatbot', page: path }); window.location.href = 'enroll.html'; }
          else goToWA('Assalamu Alaikum, I\'d love to come and visit the campus.', 'book-tour');
        });
      } else if (it._q.cta === 'maps') {
        renderOptions([
          { key: 'maps', label: 'Show me on the map', ico: ICON.map },
          { key: 'wa',   label: 'Chat on WhatsApp',   ico: ICON.wa },
        ], function(o){
          if (o.key === 'maps') { window.open('https://maps.google.com/?q=London+School+Prof+Waris+Mir+Campus+Lahore', '_blank'); trackAll('maps_click', { source: 'chatbot', page: path }); }
          else goToWA('Assalamu Alaikum, could you share directions to the campus please?', 'location');
        });
      } else {
        /* Default follow-up: ask another or escalate */
        renderOptions([
          { key: 'ask-more', label: 'Ask another question' },
          { key: 'wa',       label: 'Speak to someone on WhatsApp', ico: ICON.wa },
        ], function(o){
          if (o.key === 'ask-more') { showQuestionList(topicKey); }
          else goToWA('Assalamu Alaikum, I had a few more questions about ' + topic.label.toLowerCase() + '.', topicKey + '-more');
        });
      }
    });
  }

  function showFeeDeflect(){
    chatBack.hidden = false;
    botSay('We share fee details one family at a time — it lets us match the right plan to your child\'s age and answer everything properly.<br><br>Whichever feels easier:');
    renderOptions([
      { key: 'wa', label: '🟢 Get the fee plan on WhatsApp' },
      { key: 'form', label: '📋 Leave your number for a call' },
    ], function(o){
      if (o.key === 'wa') goToWA('Assalamu Alaikum, please could you share the fee plan for my child?', 'fee-deflect');
      else { trackAll('concierge_fee_deflect', { route: 'form', page: path }); openFormRoute('Leave your number and we\'ll share the fee plan personally.'); }
    });
    trackAll('concierge_fee_deflect', { route: 'shown', page: path });
  }
  function showOther(){
    chatBack.hidden = false;
    botSay('Of course. The quickest way is a short chat with our admissions team — they\'ll listen and help.');
    renderOptions([
      { key: 'wa', label: '🟢 WhatsApp admissions' },
      { key: 'form', label: '📋 Ask us to call you' },
      { key: 'back', label: '← Back to topics' },
    ], function(o){
      if (o.key === 'wa') goToWA('Assalamu Alaikum, I had a question about London School.', 'other');
      else if (o.key === 'form') openFormRoute('Leave your number and our admissions team will get in touch.');
      else showTopicMenu();
    });
  }

  function goToWA(message, label){
    var url = waLink(message, label || 'Chatbot');
    /* Fire GA4 + Vercel + Google Ads conversion in lockstep. The
       gtag_report_conversion helper (defined in <head>) pushes the
       AW conversion event AND navigates — but since we're opening a new
       tab we just need it to fire the conversion, not navigate. Some
       implementations of gtag_report_conversion accept a URL and navigate
       only if no event is already in flight; calling without url avoids
       the redirect. */
    trackAll('whatsapp_click', {
      source: 'widget-chatbot-' + pageKey,
      cta: 'chatbot-' + (label || 'unknown'),
      page: path
    });
    try { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); } catch(e){}
    window.open(url, '_blank');
  }

  var headerBack = document.getElementById('ls-w-h-back');

  function showEntry(){
    entryEl.hidden = false;
    chatEl.hidden = true;
    legacyEl.hidden = true;
    formWrap.hidden = true;
    headerBack.hidden = true;
    panel.classList.remove('is-chat');
    /* Reset chat state so re-entry starts fresh next time */
    panel.dataset.tracked = '';
  }
  function openChatRoute(){
    entryEl.hidden = true;
    chatEl.hidden = false;
    legacyEl.hidden = true;
    formWrap.hidden = true;
    headerBack.hidden = false;
    panel.classList.add('is-chat');
    showTopicMenu();
    trackAll('concierge_route', { route: 'chat', page: path });
  }
  function openWARoute(){
    trackAll('concierge_route', { route: 'whatsapp', page: path });
    goToWA('Assalamu Alaikum, I had a few questions about admissions at London School.', 'entry-direct');
  }
  function openFormRoute(promptText){
    entryEl.hidden = true;
    chatEl.hidden = true;
    formWrap.hidden = false;
    headerBack.hidden = false;
    if (promptText) formPrompt.textContent = promptText;
    trackAll('concierge_route', { route: 'form', page: path });
  }

  /* Header back button — returns to the entry screen from any route. */
  headerBack.addEventListener('click', function(){
    showEntry();
    trackAll('concierge_back', { from: chatEl.hidden ? 'form' : 'chat', page: path });
  });

  /* Wire entry buttons */
  entryEl.querySelectorAll('[data-entry]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var route = btn.getAttribute('data-entry');
      if (route === 'chat') openChatRoute();
      else if (route === 'wa')  openWARoute();
      else if (route === 'form') openFormRoute();
    });
  });

  chatBack.addEventListener('click', function(){ showTopicMenu(); });

  /* Track when the widget panel opens (engagement signal) */
  function trackPanelOpen(autoSource){
    if (panel.dataset.tracked === '1') return;
    panel.dataset.tracked = '1';
    trackAll('widget_open', { page: path, source: autoSource || pageKey });
  }

  /* ── NUDGE: pull eye to the bubble at key moments ── */
  /* Triggers a one-shot wiggle + glow at:
       - 25s after page load (curiosity window closing)
       - First scroll past 30% (engaged but not yet clicked)
       - 60s of inactivity (lost attention, gentle reminder)
     Each trigger fires only once per page load. Re-shows the teaser
     bubble too if it was dismissed earlier so the message lands. */
  function nudgeBubble(reason){
    if (wrapper.classList.contains('is-open')) return;
    bubble.classList.remove('is-wiggle');
    /* force reflow so the animation can replay */
    void bubble.offsetWidth;
    bubble.classList.add('is-wiggle');
    bubble.classList.add('is-glow');
    setTimeout(function(){ bubble.classList.remove('is-glow'); }, 2200);
    /* Bring the teaser back if it was dismissed */
    teaserHidden = false;
    showTeaser();
    trackAll('widget_nudge', { reason: reason, page: path });
  }
  /* 25s timed nudge */
  var nudge25 = setTimeout(function(){ nudgeBubble('time-25s'); }, 25000);
  /* 30% scroll nudge (one-shot) */
  var scrollNudgeFired = false;
  window.addEventListener('scroll', function(){
    if (scrollNudgeFired) return;
    var scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    if (scrolled > 0.3) {
      scrollNudgeFired = true;
      nudgeBubble('scroll-30');
    }
  }, { passive: true });
  /* 60s idle nudge (resets on any user activity) */
  var idleTimer;
  function resetIdle(){
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function(){ nudgeBubble('idle-60s'); }, 60000);
  }
  ['mousemove','scroll','keydown','touchstart','click'].forEach(function(ev){
    window.addEventListener(ev, resetIdle, { passive: true });
  });
  resetIdle();

  /* ── AUTO-OPEN — once per device, 7-day cooldown, kill on dismissal ──
     Behaviour:
       1. Fires only once site-wide per device (any page).
       2. If user dismisses (closes panel), records that and NEVER auto-opens
          again for 7 days, regardless of which page they visit.
       3. After 7 days the timer resets so a returning parent gets one more
          chance.
       4. Skipped on enroll / thankyou / editor / 404 already (early return
          at top of file).
     Storage:
       - localStorage 'ls-w-auto-opened-at': timestamp of the last auto-open.
       - localStorage 'ls-w-auto-dismissed':  '1' once user closes the
         auto-opened panel manually. */
  var AUTO_OPEN_KEY      = 'ls-w-auto-opened-at';
  var AUTO_DISMISS_KEY   = 'ls-w-auto-dismissed';
  var AUTO_OPEN_THROTTLE = 7 * 24 * 60 * 60 * 1000; /* 7 days */
  function shouldAutoOpen(){
    if (!AUTO_OPEN_MOBILE_HOME) return false;
    try {
      if (localStorage.getItem(AUTO_DISMISS_KEY) === '1') return false;
      var last = parseInt(localStorage.getItem(AUTO_OPEN_KEY) || '0', 10);
      if (last && (Date.now() - last) < AUTO_OPEN_THROTTLE) return false;
    } catch(_){}
    return true;
  }
  var autoOpenedThisLoad = false;
  if (shouldAutoOpen()) {
    setTimeout(function(){
      if (wrapper.classList.contains('is-open')) return;
      autoOpenedThisLoad = true;
      openPanel('auto-once');
      try { localStorage.setItem(AUTO_OPEN_KEY, String(Date.now())); } catch(_){}
    }, AUTO_OPEN_DELAY_MS);
  }
  /* Mark as dismissed when user closes the panel that we auto-opened.
     Hooks into the existing closePanel via a wrapper observer rather than
     mutating the function — keeps the original close path untouched. */
  var origClose = closePanel;
  closePanel = function(){
    var wasAutoOpened = autoOpenedThisLoad;
    origClose();
    if (wasAutoOpened) {
      autoOpenedThisLoad = false;
      try { localStorage.setItem(AUTO_DISMISS_KEY, '1'); } catch(_){}
      trackAll('auto_open_dismissed', { page: path });
    }
  };

  /* ── MINI FORM TRACKING ──
     form_start fires once per session when user first interacts with any
     widget form field. Mirrors the enroll.html form_start so both surfaces
     feed the same Key Event in GA4. */
  var formStartFired = false;
  function fireFormStart(){
    if (formStartFired) return;
    formStartFired = true;
    trackAll('form_start', {
      form_id: 'widget',
      source: 'widget-' + pageKey,
      page: path
    });
  }
  /* Phone digit-only filter + first-input form_start trigger. */
  phoneInput.addEventListener('input', function(){
    this.value = this.value.replace(/[^\d+\s\-]/g, '');
    fireFormStart();
  });
  if (nameInput) nameInput.addEventListener('input', fireFormStart);
  /* Also fire when the user tabs/clicks into either field (engagement signal). */
  phoneInput.addEventListener('focus', fireFormStart, { once: true });
  if (nameInput) nameInput.addEventListener('focus', fireFormStart, { once: true });

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

    /* Fire the canonical generate_lead event (GA4 Key Event + Vercel custom)
       with monetary value so Smart Bidding can use it, and the AW conversion
       so Google Ads imports it. Single event per submit — no duplicates. */
    trackAll('generate_lead', {
      form_id: 'widget',
      grade: '',
      source: 'widget-' + pageKey,
      page: path,
      value: 18000,
      currency: 'PKR'
    });
    try { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); } catch(e){}

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
    trackAll('exit_intent_shown', { trigger: trigger, page: path });
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

    trackAll('generate_lead', {
      form_id: 'exit_intent',
      source: 'exit_intent-' + pageKey,
      page: path,
      value: 18000,
      currency: 'PKR'
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
