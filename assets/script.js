(() => {
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');

  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!isOpen));
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('a[data-nav-link]').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === current) a.classList.add('active');
  });

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const form = document.querySelector('form[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const get = (name) => {
        const el = form.querySelector(`[name="${name}"]`);
        return el ? String(el.value || '').trim() : '';
      };

      const name = get('name');
      const email = get('email');
      const subject = get('subject');
      const message = get('message');

      const errors = [];
      if (!name) errors.push('Please enter your name.');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email.');
      if (!message) errors.push('Please enter a message.');

      const errorBox = document.querySelector('[data-form-errors]');
      if (errorBox) {
        errorBox.innerHTML = '';
        errorBox.style.display = 'none';
      }

      if (errors.length) {
        if (errorBox) {
          errorBox.style.display = 'block';
          errorBox.innerHTML = `<div class="card" style="border-color: rgba(236,72,153,.25); background: rgba(255,240,247,.8);">` +
            `<strong style="display:block; margin-bottom:6px;">Fix these before sending:</strong>` +
            `<ul style="margin:0; padding-left:18px; color: var(--muted);">${errors.map((x) => `<li>${x}</li>`).join('')}</ul>` +
            `</div>`;
        } else {
          alert(errors.join('\n'));
        }
        return;
      }

      const to = form.getAttribute('data-mailto') || 'hello@sweetdreamsmanchester.co.uk';
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        message,
      ].join('\n');

      const mailto = `mailto:${encodeURIComponent(to)}` +
        `?subject=${encodeURIComponent(subject || 'Website enquiry')}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
    });
  }
})();
