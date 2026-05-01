/* Vercel Web Analytics — custom event tracking
   Mirrors the GA4 events already wired in main.js so we get a clean
   second-source funnel view in Vercel dashboard.

   Vercel exposes window.va('event', { name, ...props }) once
   /_vercel/insights/script.js loads. We guard every call so this
   is a no-op on localhost or if the script is blocked. */
(function(){
  'use strict';

  function track(name, props){
    /* Send to Vercel Analytics */
    try {
      if (typeof window.va === 'function') {
        window.va('event', Object.assign({ name: name }, props || {}));
      }
    } catch(e) { /* silent */ }
    /* Push to dataLayer so GTM (container GTM-5MJGPGFQ) can route the event
       to GA4 + Meta Pixel + Google Ads via tags. Replaced direct gtag() call
       on 2026-05-01 when inline gtag was removed in favour of GTM. */
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, props || {}));
    } catch(e) { /* silent */ }
  }

  var path = window.location.pathname;

  /* ── WhatsApp clicks (any wa.me link, delegated) ──
     Fires GA4 + Vercel + Google Ads conversion. Existing inline onclicks on
     individual CTAs already call gtag_report_conversion, so the extra call
     here is a safety net for any link without an inline handler. */
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a[href*="wa.me"]');
    if (!a) return;
    track('whatsapp_click', {
      source: a.getAttribute('data-wa-source') || 'unspecified',
      cta: a.getAttribute('data-wa-cta') || 'unspecified',
      page: path
    });
    /* Skip duplicate AW conversion if the inline onclick already fires it. */
    if (!a.hasAttribute('data-conv-fired')) {
      try { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); } catch(e){}
    }
  }, true);

  /* ── Phone clicks (tel: links) ──
     A call is a strong intent signal — fire the AW conversion so Google Ads
     counts it, same as WA clicks and form submits. */
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a[href^="tel:"]');
    if (!a) return;
    track('phone_click', {
      number: (a.getAttribute('href') || '').replace('tel:', ''),
      source: a.getAttribute('data-phone-source') || 'unspecified',
      page: path
    });
    try { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); } catch(e){}
  }, true);

  /* ── Email clicks ── */
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a[href^="mailto:"]');
    if (!a) return;
    track('email_click', {
      address: (a.getAttribute('href') || '').replace('mailto:', '').split('?')[0],
      page: path
    });
  }, true);

  /* ── Enroll CTA clicks (any internal link to enroll.html) ── */
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a[href*="enroll.html"]');
    if (!a) return;
    if (path.indexOf('enroll.html') !== -1) return; /* already on enroll, skip */
    track('enroll_cta_click', {
      label: (a.textContent || '').trim().slice(0, 60),
      page: path
    });
  }, true);

  /* ── Book-a-spot clicks (in-page anchors to #leadForm on enroll.html) ──
     These are the "Reserve Spot" / "Book Free Tour" / "Get My Fee Plan" buttons
     that scroll to the form. We treat the click as primary lead intent. */
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a[href="#leadForm"]');
    if (!a) return;
    track('book_spot_click', {
      label: (a.textContent || '').trim().slice(0, 60),
      page: path
    });
  }, true);

  /* Lead form: generate_lead is now fired by main.js's submit handler with
     both gtag() and va() side-by-side. No listener here — having two
     handlers caused the duplicate counts that confused the audit funnel. */

  /* ── Ask Prof Mir chatbot first message ── */
  var chatGo = document.getElementById('chatGo');
  if (chatGo) {
    var chatStarted = false;
    chatGo.addEventListener('click', function(){
      if (chatStarted) return;
      chatStarted = true;
      track('chatbot_start', { page: path });
    });
  }

  /* ── Scroll depth (75%) — engagement signal ── */
  var scrolled75 = false;
  window.addEventListener('scroll', function(){
    if (scrolled75) return;
    var d = document.documentElement;
    var pct = (window.scrollY + window.innerHeight) / d.scrollHeight;
    if (pct >= 0.75) {
      scrolled75 = true;
      track('scroll_75', { page: path });
    }
  }, { passive: true });

})();
