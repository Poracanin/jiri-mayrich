let listings = [];
let currentFilter = 'vse';
let expanded = false;
const featured = ['123376','123641','123056','122757','123890','124067'];
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function propertyTitle(d) {
  if(d.type==='byty') return `Byt ${d.params.Subtyp?.replace('bytu ','') || ''} · ${d.params['Plocha užitná'] || ''}`;
  if(d.type==='pozemky') return `Stavební pozemek · ${d.params['Celková plocha'] || '8 827 m²'}`;
  return `${d.type==='chaty'?'Chata':'Rodinný dům'} · ${d.params['Plocha užitná'] || ''}`;
}
function renderProperties() {
  let visible = listings.filter(d => currentFilter==='vse' || d.type===currentFilter);
  const sort = document.querySelector('#sort').value;
  if(sort==='low') visible.sort((a,b)=>a.price-b.price);
  else if(sort==='high') visible.sort((a,b)=>b.price-a.price);
  else if(sort==='newest') visible.sort((a,b)=>Number(b.id)-Number(a.id));
  else visible.sort((a,b)=>(featured.includes(a.id)?featured.indexOf(a.id):99)-(featured.includes(b.id)?featured.indexOf(b.id):99));
  const shown = expanded ? visible : visible.slice(0,6);
  document.querySelector('#property-grid').innerHTML = shown.map(d => `<a class="property-card" href="nemovitost.html?id=${d.id}" aria-label="${escapeHTML(d.nazev)} — ${escapeHTML(d.cena_text)}"><div class="property-image"><img src="${d.cover}" alt="${escapeHTML(d.nazev)}" width="640" height="440" loading="lazy"><span class="property-tag">NA PRODEJ</span>${['123376','111961'].includes(d.id)?'<span class="visualization-badge">VIZUALIZACE</span>':''}<span class="property-arrow" aria-hidden="true"><svg class="icon" aria-hidden="true" focusable="false"><use href="assets/icons.svg#arrow-right"></use></svg></span></div><div class="property-info"><p class="property-location">${escapeHTML(d.city)}${d.params.Ulice?' · '+escapeHTML(d.params.Ulice):''}</p><h3>${escapeHTML(propertyTitle(d))}</h3><p class="property-specs"><span>${escapeHTML(d.params['Stav nemovitosti'] || 'Prodej')}</span><i></i><span>${d.photos.length} fotografií</span>${d.videa.length?'<i></i><span>Videoprohlídka</span>':''}</p><p class="property-price">${escapeHTML(d.cena_text)}</p></div></a>`).join('');
  document.querySelector('#visible-count').textContent=`Zobrazeno ${shown.length} z ${visible.length} nemovitostí`;
  document.querySelector('#results-count').textContent=`V nabídce ${visible.length} nemovitostí.`;
  document.querySelector('#show-more').hidden=shown.length===visible.length;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{currentFilter=button.dataset.filter;expanded=false;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderProperties();}));
document.querySelector('#sort').addEventListener('change',renderProperties);
document.querySelector('#show-more').addEventListener('click',()=>{expanded=true;renderProperties();});
fetch('data/nemovitosti.json').then(r=>{if(!r.ok)throw Error('Nepodařilo se načíst nabídku.');return r.json();}).then(data=>{listings=data;renderProperties();const requested=new URLSearchParams(location.search).get('nemovitost');const chosen=data.find(d=>d.id===requested);if(chosen)document.querySelector('[name="message"]').value=`Mám zájem o prohlídku nemovitosti: ${chosen.nazev}. Prosím o domluvení termínu.`;}).catch(()=>{document.querySelector('#property-grid').innerHTML='<p>Nabídku se nepodařilo načíst. <a href="https://www.jiri-mayrich.cz/nemovitosti.html">Prohlédnout původní nabídku</a></p>';});

document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{
  const dialog=document.getElementById(button.dataset.dialog);
  const iframe=dialog.querySelector('iframe[data-src]');if(iframe&&!iframe.src)iframe.src=iframe.dataset.src;
  dialog.showModal();
}));
document.querySelectorAll('dialog:not(#mobile-menu)').forEach(dialog=>{
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{dialog.querySelector('video')?.pause();});
});
fetch('data/sluzby.json').then(r=>r.json()).then(data=>{document.getElementById('all-services-content').innerHTML=data.map(d=>`<details class="service-detail"><summary>${escapeHTML(d.nazev)}</summary><p>${escapeHTML(d.popis)}</p></details>`).join('');}).catch(()=>{document.getElementById('all-services-content').innerHTML='<p>Služby se nepodařilo načíst. Zavolejte mi prosím na <a href="tel:+420721889434">+420 721 889 434</a>.</p>';});
fetch('data/reference.json').then(r=>r.json()).then(data=>{document.getElementById('all-reviews-content').innerHTML=data.map(d=>`<article class="full-review"><blockquote>${escapeHTML(d.quote)}</blockquote><p>${escapeHTML(d.author)}</p></article>`).join('');}).catch(()=>{document.getElementById('all-reviews-content').textContent='Další reference se nepodařilo načíst.';});
document.querySelectorAll('[data-intent]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('contact-intent').value=a.dataset.intent;}));
document.getElementById('contact-form').addEventListener('submit',e=>{
  e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
  const d=new FormData(form);const intent=form.querySelector('[name="intent"] option:checked').textContent;
  const body=`Dobrý den, pane Mayrichu,\n\n${d.get('message')}\n\n${d.get('name')}\nE-mail: ${d.get('email')}\n${d.get('phone')?'Telefon: '+d.get('phone'):''}`;
  const a=document.createElement('a');a.href=`mailto:jmayrich@jaros-partners.cz?subject=${encodeURIComponent(intent)}&body=${encodeURIComponent(body)}`;a.textContent='Otevřít připravenou zprávu v e-mailu';
  const out=document.getElementById('form-result');out.replaceChildren(document.createTextNode('Zpráva je připravená. '),a);a.focus();
});
const intentParam=new URLSearchParams(location.search).get('intent');if(intentParam){const select=document.getElementById('contact-intent');if([...select.options].some(o=>o.value===intentParam))select.value=intentParam;}
