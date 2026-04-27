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
    /* Mirror to GA4 so the same event shows in both platforms */
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, props || {});
      }
    } catch(e) { /* silent */ }
  }

  var path = window.location.pathname;

  /* ── WhatsApp clicks (any wa.me link, delegated) ── */
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a[href*="wa.me"]');
    if (!a) return;
    track('whatsapp_click', {
      source: a.getAttribute('data-wa-source') || 'unspecified',
      cta: a.getAttribute('data-wa-cta') || 'unspecified',
      page: path
    });
  }, true);

  /* ── Phone clicks (tel: links) ── */
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a[href^="tel:"]');
    if (!a) return;
    track('phone_click', {
      number: (a.getAttribute('href') || '').replace('tel:', ''),
      page: path
    });
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

  /* ── Lead form submit (mirrors GA generate_lead) ── */
  var form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function(){
      if (!form.checkValidity()) return;
      if (form.botcheck && form.botcheck.checked) return;
      track('lead_submit', {
        grade: form.grade ? form.grade.value : 'unspecified',
        form_id: form.id || 'leadForm'
      });
    });
  }

  /* ── Thank-you page view = confirmed lead ── */
  if (path.indexOf('thank-you') !== -1) {
    track('lead_confirmed', { page: path });
  }

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
