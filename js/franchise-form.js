/* ------------------------------------------------------------------
   FRANCHISE ENQUIRY FORM  (franchise.html)
   ------------------------------------------------------------------
   Deliberately NOT handled by the #leadForm block in main.js. Three
   reasons that matter:

     1. main.js fires `generate_lead` with a hardcoded PKR 18,000 value,
        which is a tuition figure. `generate_lead` is our one canonical
        admissions lead event and Google Ads imports it as a conversion.
        A franchise investor enquiry is a completely different funnel —
        letting it through would inflate admissions conversions and
        corrupt the CPL maths the ad account is optimised against.
     2. main.js hardcodes `source: 'enroll'` on form_start.
     3. Editing main.js would drift it from main.min.js, which only
        index.html loads. Separate file, loaded only where needed.

   So this fires its own `franchise_enquiry` event and never calls
   gtag_report_conversion().
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var WA_NUMBER = '923010499777';

  /* ================================================================
     FULL APPLICATION → WHATSAPP
     ================================================================
     Replaces "print the PDF, fill it in, email it back" with a form
     that composes the whole application into a formatted WhatsApp
     message. Pakistan is a WhatsApp-first market and the admissions
     team already works there, so this removes the biggest drop-off
     point in the funnel.

     It ALSO records to the same Apps Script sheet, via sendBeacon
     rather than fetch: we navigate to WhatsApp immediately after, and
     a normal fetch would be cancelled by that navigation. sendBeacon
     is built to survive page unload.

     Fields are self-describing — each input carries data-wa-label, and
     each fieldset carries data-wa-group — so adding a question to the
     markup needs no change here.
     ================================================================ */
  var appForm = document.getElementById('franchiseApplication');
  if (appForm) {
    var appBtn = appForm.querySelector('.lead-form__submit');

    function buildMessage() {
      var lines = ['*FRANCHISE APPLICATION*', 'London International School', ''];

      Array.prototype.forEach.call(
        appForm.querySelectorAll('[data-wa-group]'),
        function (group) {
          var rows = [];

          Array.prototype.forEach.call(
            group.querySelectorAll('[data-wa-label]'),
            function (el) {
              var label = el.getAttribute('data-wa-label');
              var val = '';

              if (el.type === 'checkbox') {
                /* Checkbox sets collapse into one comma-joined row. */
                if (!el.checked) return;
                val = el.value || label;
                var existing = rows.filter(function (r) { return r.label === label; })[0];
                if (existing) { existing.value += ', ' + val; return; }
                rows.push({ label: label, value: val });
                return;
              }

              val = (el.value || '').trim();
              if (!val) return;
              rows.push({ label: label, value: val });
            }
          );

          if (!rows.length) return;
          lines.push('*' + group.getAttribute('data-wa-group') + '*');
          rows.forEach(function (r) { lines.push(r.label + ': ' + r.value); });
          lines.push('');
        }
      );

      return lines.join('\n').trim();
    }

    appForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!appForm.checkValidity()) {
        appForm.reportValidity();
        return;
      }
      if (appForm.botcheck && appForm.botcheck.checked) return;

      var msg = buildMessage();
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);

      /* wa.me tolerates long messages, but a runaway URL fails silently
         on some Android clients. Fall back to the summary plus a note
         that the full detail follows in the sheet. */
      if (url.length > 7000) {
        msg = '*FRANCHISE APPLICATION*\nLondon International School\n\n' +
              'My full application has been submitted through your website. ' +
              'Please open the franchise enquiries sheet for the complete detail.\n\n' +
              'Name: ' + ((appForm.querySelector('#a_name') || {}).value || '') + '\n' +
              'City: ' + ((appForm.querySelector('#a_city') || {}).value || '');
        url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
      }

      emit('franchise_application', {
        form_id: 'franchiseApplication',
        interest: (appForm.querySelector('#a_interest') || {}).value || 'unspecified',
        campus_type: (appForm.querySelector('#a_campus') || {}).value || 'unspecified',
        city: (appForm.querySelector('#a_city') || {}).value || 'unspecified',
        channel: 'whatsapp',
        page: location.pathname
      });

      /* Keep a server-side copy. sendBeacon survives the navigation
         below; fetch would not. */
      try {
        var endpoint = appForm.getAttribute('data-endpoint');
        if (endpoint && navigator.sendBeacon) {
          var fd = new FormData(appForm);
          fd.append('submitted_at', new Date().toISOString());
          fd.append('channel', 'whatsapp');
          fd.append('whatsapp_message', msg);
          navigator.sendBeacon(endpoint, fd);
        }
      } catch (err) { /* never block the WhatsApp handoff */ }

      if (appBtn) {
        appBtn.disabled = true;
        appBtn.innerHTML = 'Opening WhatsApp…';
      }
      window.location.href = url;
    });
  }

  /* ================================================================
     SHORT HERO ENQUIRY FORM
     ================================================================ */
  var form = document.getElementById('franchiseForm');
  if (!form) return;
  var submitBtn = form.querySelector('.lead-form__submit');
  var originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

  /* ── Attribution capture ── */
  try {
    var qs = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']
      .forEach(function (k) {
        var el = document.getElementById(k);
        if (el) el.value = qs.get(k) || '';
      });
    var ref = document.getElementById('referrer');
    if (ref) ref.value = document.referrer || 'direct';
    var lp = document.getElementById('landing_page');
    if (lp) lp.value = window.location.pathname + window.location.search;
  } catch (e) { /* silent */ }

  function emit(name, props) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, props || {}));
    } catch (e) { /* silent */ }
    try {
      if (typeof window.va === 'function') {
        window.va('event', Object.assign({ name: name }, props || {}));
      }
    } catch (e) { /* silent */ }
  }

  /* ── form_start, once ── */
  var started = false;
  function fireStart() {
    if (started) return;
    started = true;
    emit('form_start', {
      form_id: 'franchiseForm',
      source: 'franchise',
      page: location.pathname
    });
  }
  Array.prototype.forEach.call(
    form.querySelectorAll('input, select, textarea'),
    function (el) {
      el.addEventListener('focus', fireStart, { once: true });
      el.addEventListener('input', fireStart);
    }
  );

  /* Pakistan phone cleanup: digits, spaces, dashes and a leading + only */
  var phone = form.querySelector('#f_phone');
  if (phone) {
    phone.addEventListener('input', function () {
      this.value = this.value.replace(/[^\d+\s\-]/g, '');
    });
  }

  function showError(msg) {
    var err = form.querySelector('.lead-form__error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'lead-form__error';
      form.appendChild(err);
    }
    err.textContent = msg;
    err.classList.add('show');
  }

  /* If the endpoint is unreachable we would otherwise lose a
     high-value enquiry, so hand the applicant to WhatsApp with their
     details already written out. */
  function fallbackToWhatsApp() {
    var name = (form.querySelector('#f_name') || {}).value || '';
    var city = (form.querySelector('#f_city') || {}).value || '';
    var type = (form.querySelector('#f_interest') || {}).value || '';
    var msg = 'Assalamu Alaikum, I tried the franchise enquiry form on your ' +
              'website but it did not go through. My name is ' + name.trim() +
              (city.trim() ? ', from ' + city.trim() : '') +
              (type ? '. I am interested in: ' + type : '') +
              '. Please get in touch about the London International School franchise.';
    window.location.href = 'https://wa.me/' + WA_NUMBER +
                           '?text=' + encodeURIComponent(msg);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    /* Honeypot: bots fill the hidden field. Pretend success and bail. */
    if (form.botcheck && form.botcheck.checked) {
      window.location.href = form.getAttribute('data-redirect') || '/thank-you';
      return;
    }

    /* Distinct from `generate_lead` on purpose — see the header note. */
    emit('franchise_enquiry', {
      form_id: 'franchiseForm',
      interest: (form.querySelector('#f_interest') || {}).value || 'unspecified',
      campus_type: (form.querySelector('#f_campus') || {}).value || 'unspecified',
      city: (form.querySelector('#f_city') || {}).value || 'unspecified',
      page: location.pathname
    });

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting…';
    }

    var endpoint = form.getAttribute('data-endpoint');
    var redirectTo = form.getAttribute('data-redirect') || '/thank-you';
    var fd = new FormData(form);
    fd.append('submitted_at', new Date().toISOString());
    fd.append('user_agent', navigator.userAgent);

    /* Apps Script 302-redirects to googleusercontent.com, which trips
       CORS on read. no-cors still delivers the POST; an opaque response
       means it left the browser, which is all we need. */
    var isAppsScript = /script\.google\.com/.test(endpoint);
    var opts = { method: 'POST', body: fd };
    if (isAppsScript) opts.mode = 'no-cors';

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      window.location.href = redirectTo;
    }
    var safety = setTimeout(finish, 10000);

    fetch(endpoint, opts)
      .then(function (res) {
        if (res.type === 'opaque' || res.ok) {
          clearTimeout(safety);
          finish();
          return;
        }
        throw new Error('HTTP ' + res.status);
      })
      .catch(function (err) {
        clearTimeout(safety);
        console.error('Franchise form submit failed:', err);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
        showError('Something went wrong. Taking you to WhatsApp instead…');
        setTimeout(fallbackToWhatsApp, 1200);
      });
  });
})();
