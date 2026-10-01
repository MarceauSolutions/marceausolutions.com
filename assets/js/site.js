/*
 * Marceau Solutions — shared site script.
 *  1. Remembers where a visitor came from (?ref=, ?utm_*) for 14 days.
 *  2. Tags Calendly booking links with it, so a booking shows its source.
 *  3. Submits every lead form to the lead backend (Apps Script + Sheet).
 *
 * A form must never look successful when nothing was saved, so an unconfigured
 * endpoint or a failed request shows a call/text/email fallback instead.
 */
(function () {
  'use strict';

  // Replaced with the Apps Script /exec URL when the lead backend is deployed.
  var LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzHd1Tvg9_HeodryARcAS_A8UcJBxeIfV2MiftFLdly954jNazmlgRf1MO-iuCwdjiY/exec';
  var PHONE = '(239) 398-5676';
  var EMAIL = 'wmarceau@marceausolutions.com';

  // ── 1. Attribution ────────────────────────────────────────────────────────
  var KEYS = ['ref', 'utm_source', 'utm_medium', 'utm_campaign'];
  var attr = {};
  try { attr = JSON.parse(localStorage.getItem('ms_attr') || '{}'); } catch (e) { attr = {}; }
  if (attr.t && Date.now() - attr.t > 14 * 86400000) attr = {};

  var params = new URLSearchParams(window.location.search);
  var seen = false;
  KEYS.forEach(function (k) {
    var v = params.get(k);
    if (v) { attr[k] = v.slice(0, 80); seen = true; }
  });
  if (seen) {
    attr.t = Date.now();
    try { localStorage.setItem('ms_attr', JSON.stringify(attr)); } catch (e) { /* private mode */ }
  }
  var source = attr.utm_source || attr.ref || '';

  // ── 2. Tag Calendly links ─────────────────────────────────────────────────
  if (source) {
    document.querySelectorAll('a[href*="calendly.com"]').forEach(function (a) {
      try {
        var u = new URL(a.href);
        u.searchParams.set('utm_source', source);
        u.searchParams.set('utm_medium', attr.utm_medium || 'referral');
        u.searchParams.set('utm_campaign', attr.utm_campaign || 'website');
        a.href = u.toString();
      } catch (e) { /* leave the link as it was */ }
    });
  }

  // ── 3. Lead forms ─────────────────────────────────────────────────────────
  function status(form, message) {
    var el = form.querySelector('.form-status');
    if (!el) {
      el = document.createElement('div');
      el.className = 'form-status';
      el.setAttribute('role', 'alert');
      el.style.cssText = 'margin-top:0.75rem;font-size:0.9rem;line-height:1.5;color:var(--primary-light,#D4AF37);';
      form.appendChild(el);
    }
    el.innerHTML = message;
  }

  function fallback(form) {
    var u = 'color:inherit;text-decoration:underline';
    status(form, 'Sorry, that did not go through. The fastest way to reach me: ' +
      '<a href="https://calendly.com/wmarceau/ai-services-discovery-call" target="_blank" rel="noopener" style="' + u + '">book a free call</a>, ' +
      'or call or text <a href="tel:+12393985676" style="' + u + '">' + PHONE + '</a>, ' +
      'or email <a href="mailto:' + EMAIL + '" style="' + u + '">' + EMAIL + '</a>.');
  }

  document.querySelectorAll('form[data-lead-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var label = btn.textContent;

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.website_url = data.website_url || data.company_url || '';   // honeypots
      delete data.company_url;
      data.ref = source;
      data.utm_medium = attr.utm_medium || '';
      data.utm_campaign = attr.utm_campaign || '';
      data.page = window.location.pathname;

      if (LEAD_ENDPOINT.indexOf('__') === 0) { fallback(form); return; }

      btn.textContent = 'Sending...';
      btn.disabled = true;
      var prev = form.querySelector('.form-status');
      if (prev) prev.innerHTML = '';

      // text/plain keeps this a "simple" request; Apps Script cannot answer a CORS preflight.
      fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (result) {
          // Apps Script sometimes answers with an HTML wrapper even though the row saved,
          // so only an explicit {ok:false} counts as a failure.
          if (res.ok && result.ok !== false) {
            form.reset();
            try { localStorage.setItem('formSubmitted', 'true'); } catch (e) { /* ignore */ }
            var modal = document.getElementById('successModal');
            if (modal) modal.classList.add('active');
          } else if (result && result.status === 'INVALID') {
            status(form, 'Please add your name and either an email or a phone number.');
          } else {
            fallback(form);
          }
        });
      }).catch(function () {
        fallback(form);
      }).then(function () {
        btn.textContent = label;
        btn.disabled = false;
      });
    });
  });
})();
