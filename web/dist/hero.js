(() => {
  const hero = document.querySelector('.hero');
  const toggle = hero?.querySelector('.hero-motion-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const paused = hero.toggleAttribute('data-motion-paused');
    const label = paused ? 'Spustit pohyb pozadí' : 'Pozastavit pohyb pozadí';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    toggle.querySelector('use').setAttribute('href', `assets/icons.svg#${paused ? 'play' : 'pause'}`);
  });

  let inView = true;
  const updateMotion = () => hero.toggleAttribute('data-motion-idle', !inView || document.hidden);
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updateMotion();
  });
  observer.observe(hero);
  document.addEventListener('visibilitychange', updateMotion);
  updateMotion();
})();
