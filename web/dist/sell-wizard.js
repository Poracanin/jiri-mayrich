(() => {
  const dialog = document.getElementById('sell-dialog');
  const form = document.getElementById('sell-form');
  const panels = [...form.querySelectorAll('[data-sell-step]')];
  const progressButtons = [...dialog.querySelectorAll('[data-sell-goto]')];
  const back = document.getElementById('sell-back');
  const nextLabel = document.getElementById('sell-next-label');
  const error = document.getElementById('sell-error');
  const result = document.getElementById('sell-result');
  const stage = document.getElementById('sell-stage');
  let step = 0;
  let furthestStep = 0;
  let opener;

  const field = name => form.elements.namedItem(name);
  const value = name => field(name).value.trim();
  const chosen = name => form.querySelector(`input[name="${name}"]:checked`)?.value || '';

  function summary() {
    return [chosen('sell_type'), value('sell_city'), chosen('sell_timing')].filter(Boolean).join(' · ');
  }

  function showStep(index, focus = true) {
    step = index;
    furthestStep = Math.max(furthestStep, step);
    error.textContent = '';
    panels.forEach((panel, i) => {
      panel.hidden = i !== step;
      panel.disabled = i !== step;
    });
    progressButtons.forEach((button, i) => {
      button.disabled = i > furthestStep;
      button.classList.toggle('is-complete', i < step);
      if (i === step) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    document.getElementById('sell-step-count').textContent = `Krok ${step + 1} ze 4`;
    document.getElementById('sell-summary').textContent = summary();
    back.hidden = step === 0;
    nextLabel.textContent = step === 3 ? 'Připravit poptávku' : 'Pokračovat';
    if (focus) {
      panels[step].querySelector('h2').focus({ preventScroll: true });
      dialog.scrollTop = 0;
    }
  }

  function validatePanel(index, report = true) {
    const panel = panels[index];
    if (index === 0 && !chosen('sell_type')) {
      error.textContent = 'Vyberte prosím, jakou nemovitost plánujete prodat.';
      if (report) panel.querySelector('input').focus();
      return false;
    }
    if (index === 2 && !chosen('sell_timing')) {
      error.textContent = 'Vyberte prosím, kdy o prodeji uvažujete.';
      if (report) panel.querySelector('input').focus();
      return false;
    }
    for (const input of panel.querySelectorAll('input:not([type="radio"]), textarea')) {
      input.setCustomValidity('');
      if (input.required && !input.value.trim()) input.setCustomValidity('Vyplňte prosím toto pole.');
      if (input.name === 'sell_phone' && input.value.trim()) {
        const digits = input.value.replace(/\D/g, '');
        if (!/^\+?[\d\s().-]+$/.test(input.value.trim()) || digits.length < 7 || digits.length > 15) {
          input.setCustomValidity('Zadejte prosím platný telefon, například +420 721 889 434.');
        }
      }
      if (!input.checkValidity()) {
        error.textContent = 'Zkontrolujte prosím zvýrazněné pole.';
        if (report) input.reportValidity();
        return false;
      }
    }
    return true;
  }

  document.querySelectorAll('[data-sell-open]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      dialog.showModal();
      document.documentElement.classList.add('sell-open');
      if (result.hidden) showStep(step);
      else result.querySelector('h2').focus();
    });
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('sell-open');
    opener?.focus({ preventScroll: true });
  });
  back.addEventListener('click', () => showStep(step - 1));
  progressButtons.forEach((button, i) => button.addEventListener('click', () => showStep(i)));
  form.addEventListener('input', e => {
    if (typeof e.target.setCustomValidity === 'function') e.target.setCustomValidity('');
    error.textContent = '';
  });
  form.addEventListener('change', () => { error.textContent = ''; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validatePanel(step)) return;
    if (step < panels.length - 1) {
      showStep(step + 1);
      return;
    }

    // Recheck all steps, including previously visited steps opened from the progress bar.
    for (let i = 0; i < panels.length; i++) {
      panels[i].disabled = false;
      if (!validatePanel(i, false)) {
        showStep(i, false);
        validatePanel(i);
        return;
      }
      panels[i].disabled = i !== step;
    }
    const body = [
      'Dobrý den, pane Mayrichu,',
      '',
      'uvažuji o prodeji nemovitosti a rád/a bych s vámi probral/a další postup.',
      '',
      `Nemovitost: ${chosen('sell_type')}`,
      `Obec / městská část: ${value('sell_city')}`,
      value('sell_address') ? `Ulice / adresa: ${value('sell_address')}` : '',
      value('sell_area') ? `Přibližná plocha: ${value('sell_area')} m²` : '',
      `Kdy uvažuji o prodeji: ${chosen('sell_timing')}`,
      value('sell_note') ? `Doplňující informace: ${value('sell_note')}` : '',
      '',
      'Prosím, ozvěte se mi:',
      `${value('sell_first_name')} ${value('sell_last_name')}`,
      `E-mail: ${value('sell_email')}`,
      `Telefon: ${value('sell_phone')}`,
    ].join('\n').replace(/\n{3,}/g, '\n\n');
    const mailto = `mailto:jmayrich@jaros-partners.cz?subject=${encodeURIComponent(`Prodej nemovitosti — ${chosen('sell_type')}, ${value('sell_city')}`)}&body=${encodeURIComponent(body)}`;
    document.getElementById('sell-email-link').href = mailto;
    document.getElementById('sell-result-summary').textContent = summary();
    document.getElementById('sell-result-contact').textContent = `${value('sell_first_name')} ${value('sell_last_name')} · ${value('sell_phone')} · ${value('sell_email')}`;
    stage.hidden = true;
    result.hidden = false;
    result.querySelector('h2').focus();
  });
  document.getElementById('sell-edit').addEventListener('click', () => {
    result.hidden = true;
    stage.hidden = false;
    showStep(3);
  });
  showStep(0, false);
})();
