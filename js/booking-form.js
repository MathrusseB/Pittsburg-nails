// booking-form.js — build an SMS link from the booking form and navigate to it.
// No fetch, no API, no backend. Native sms: handler on iOS and Android.
(function () {
  'use strict';

  var form = document.getElementById('booking-form');
  if (!form) return;

  var SALON_NUMBER = '+16207150115';

  function val(name) {
    var el = form.elements.namedItem(name);
    if (!el) return '';
    return (el.value || '').trim();
  }

  function formatDate(iso) {
    if (!iso) return '';
    // Parse YYYY-MM-DD as a local date to avoid timezone drift
    var parts = iso.split('-');
    if (parts.length !== 3) return iso;
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    });
  }

  function buildBody() {
    var name    = val('name');
    var phone   = val('phone');
    var service = val('service');
    var date    = formatDate(val('date'));
    var window_ = val('window');
    var party   = val('party') || '1';
    var tech    = val('tech');
    var notes   = val('notes');

    var whenParts = [];
    if (date) whenParts.push(date);
    if (window_ && window_ !== 'Flexible') whenParts.push(window_.toLowerCase());
    else if (window_ === 'Flexible') whenParts.push('flexible time');
    var when = whenParts.length ? whenParts.join(', ') : 'flexible';

    var lines = [
      'Hi! Booking request from your website:',
      '',
      'Name: ' + name,
      'Phone: ' + phone,
      'Service: ' + (service || 'Not sure yet'),
      'When: ' + when,
      'Party: ' + party + (party === '1' ? ' person' : ' people')
    ];
    if (tech)  lines.push('Technician: ' + tech);
    if (notes) lines.push('Notes: ' + notes);
    lines.push('');
    lines.push('Please confirm when you can. Thanks!');
    return lines.join('\n');
  }

  function validate() {
    var name  = val('name');
    var phone = val('phone');
    var missing = [];
    if (!name)  missing.push('name');
    if (!phone) missing.push('phone');

    // Clear prior states
    ['bf-name', 'bf-phone'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.setAttribute('aria-invalid', 'false');
    });

    if (missing.length) {
      if (!name)  document.getElementById('bf-name').setAttribute('aria-invalid', 'true');
      if (!phone) document.getElementById('bf-phone').setAttribute('aria-invalid', 'true');
      var first = missing[0] === 'name' ? 'bf-name' : 'bf-phone';
      document.getElementById(first).focus();
      return false;
    }
    return true;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    var body = buildBody();
    // iOS uses "&" separator, Android uses "?"; "?&" is the widely-compatible form.
    var href = 'sms:' + SALON_NUMBER + '?&body=' + encodeURIComponent(body);
    window.location.href = href;
  });
})();
