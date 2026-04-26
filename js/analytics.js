// Google Analytics + Google Ads with deferred loading.
// Loads gtag.js after the first user interaction (scroll/click/touch) or 1.5s after window 'load'.
// Inline onclick handlers can call gtag_report_conversion() immediately — events queue in dataLayer
// and flush automatically once gtag.js arrives.
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-S3PMR30G31');
  gtag('config', 'AW-18119617331');

  window.gtag_report_conversion = function (url) {
    var callback = function () {
      if (typeof url !== 'undefined') { window.location = url; }
    };
    gtag('event', 'conversion', {
      send_to: 'AW-18119617331/vHvUCO2vwqIcELPWjcBD',
      value: 1.0,
      currency: 'USD',
      event_callback: callback
    });
    return false;
  };

  var loaded = false;
  function loadGtag() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-S3PMR30G31';
    document.head.appendChild(s);
  }

  ['scroll', 'click', 'keydown', 'touchstart', 'mousemove'].forEach(function (t) {
    window.addEventListener(t, loadGtag, { once: true, passive: true });
  });

  if (document.readyState === 'complete') {
    setTimeout(loadGtag, 1500);
  } else {
    window.addEventListener('load', function () { setTimeout(loadGtag, 1500); }, { once: true });
  }
})();
