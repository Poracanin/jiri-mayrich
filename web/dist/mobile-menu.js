(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  let afterClose = null;
  const closeMenu = (action = null) => {
    afterClose = action;
    menu.close();
  };
  toggle.addEventListener('click', () => {
    if (menu.open) return;
    afterClose = null;
    menu.showModal();
    menu.scrollTop = 0;
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('menu-open');
  });
  menu.querySelector('.menu-close').addEventListener('click', () => closeMenu());
  menu.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...menu.querySelectorAll('button, a[href]')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  menu.addEventListener('click', event => {
    if (event.target !== menu) return;
    const rect = menu.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeMenu();
  });
  menu.addEventListener('close', () => {
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('menu-open');
    const action = afterClose;
    afterClose = null;
    action?.();
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const sellerButton = document.querySelector('[data-sell-open]');
    if (link.hasAttribute('data-menu-sell') && sellerButton) {
      event.preventDefault();
      // Let the menu finish closing before moving focus into the next dialog.
      closeMenu(() => sellerButton.click());
      return;
    }
    const href = link.getAttribute('href');
    const section = href.startsWith('#') ? document.querySelector(href) : null;
    closeMenu(section ? () => {
      const heading = section.querySelector('h2');
      if (!heading) return;
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    } : null);
  }));

  // The compact menu must never remain open over the desktop navigation.
  window.matchMedia('(min-width: 1051px)').addEventListener('change', event => {
    if (event.matches && menu.open) closeMenu();
  });

  // Property detail pages link to the same seller flow on the homepage.
  const url = new URL(window.location.href);
  if (url.searchParams.get('prodej') === '1' && document.getElementById('sell-dialog')) {
    url.searchParams.delete('prodej');
    window.history.replaceState(window.history.state, '', url);
    document.querySelector('[data-sell-open]')?.click();
  }
})();
