/* London School — Meta Pixel 1118606360174593
   Loads lazily on first user interaction (matches GA4 pattern).
   Conversion events are queued from the moment the script loads so the
   very first WhatsApp tap / phone call / form submit is always captured,
   even if it also triggered the pixel to load.

   Events fired:
     PageView  — every page, on init
     Lead      — enroll form, widget mini-form, exit-intent form submits
     Contact   — WhatsApp clicks, phone call clicks, email clicks
   Re-added 2026-05-01 with Pixel ID 1118606360174593. */
(function(){
  'use strict';
  var PIXEL_ID = '1118606360174593';
  var pixelLoaded = false;

  /* ── QUEUE ──
     Conversion events detected BEFORE the fbevents.js script has finished
     loading are pushed into this queue. Once the pixel initialises it drains
     the queue, so we never miss the event that triggered the load. */
  var pendingEvents = [];
  function fireOrQueue(eventName, params){
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, params || {});
    } else {
      pendingEvents.push([eventName, params || {}]);
    }
  }
  function drainQueue(){
    while (pendingEvents.length) {
      var ev = pendingEvents.shift();
      window.fbq('track', ev[0], ev[1]);
    }
  }

  /* ── LOAD PIXEL ── */
  function loadPixel(){
    if (pixelLoaded) return;
    pixelLoaded = true;
    /* Meta Pixel base code */
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
    drainQueue();
  }

  /* Load on first user interaction */
  ['scroll','click','keydown','touchstart','mousemove'].forEach(function(t){
    window.addEventListener(t, loadPixel, { once: true, passive: true });
  });
  /* Fallback: 1.5s after page load */
  if (document.readyState === 'complete') {
    setTimeout(loadPixel, 1500);
  } else {
    window.addEventListener('load', function(){ setTimeout(loadPixel, 1500); }, { once: true });
  }

  /* ── CONVERSION EVENT LISTENERS ──
     Attached immediately (not inside loadPixel) so every click is caught
     from the first interaction, including the click that loads the pixel.
     Uses capture phase so it fires before inline onclick handlers navigate away. */

  /* Lead — form submits */
  document.addEventListener('submit', function(e){
    var form = e.target;
    if (!form) return;
    var id = form.id || '';
    if (id === 'enrollForm' || id === 'ls-w-form' || id === 'ls-ei-form') {
      loadPixel(); /* ensure pixel is loaded before firing */
      fireOrQueue('Lead', { content_name: id, currency: 'PKR', value: 18000 });
    }
  }, true);

  /* Contact — WhatsApp / phone / email */
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('wa.me') > -1) {
      loadPixel();
      fireOrQueue('Contact', { content_name: 'whatsapp' });
    } else if (href.indexOf('tel:') === 0) {
      loadPixel();
      fireOrQueue('Contact', { content_name: 'phone' });
    } else if (href.indexOf('mailto:') === 0) {
      loadPixel();
      fireOrQueue('Contact', { content_name: 'email' });
    }
  }, true);

})();
