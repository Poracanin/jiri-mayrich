# Jiří Mayrich — návrh osobního webu

Funkční responzivní návrh založený na obsahu archivovaném 23. 9. 2026. Hlavní stránka a detail 18 nemovitostí s 401 fotografiemi, galerie, filtry, řazení, původní reference a služby, video, mapa a kontaktní cesta.

## Spuštění

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Otevřít `http://127.0.0.1:4173/`. Prohlížení potřebuje HTTP server, protože data načítá přes `fetch`; samotné otevření HTML jako `file://` nestačí.

## Soubory

- `dist/index.html`, `styles.css`, `app.js`: hlavní stránka a její interakce.
- `dist/sell-wizard.css`, `sell-wizard.js`: čtyřkroková nezávazná poptávka otevřená z hero tlačítka „Chci prodat nemovitost“.
- `dist/nemovitost.html`, `detail.css`, `detail.js`: detail podle parametru `id`.
- `dist/data/`: 18 původních nabídek, 21 služeb a 16 referencí.
- `dist/assets/`: dodaný cover a portrét, původní fotografie, video, certifikát a lokálně uložená písma.

## Co návrh dělá

Filtruje nabídky podle typu a řadí je podle ceny či stáří. Každá nabídka má kompletní původní popis, parametry a galerii se šipkami i klávesnicí. Reference, další služby, hlavní video a mapa se otevírají v přístupných nativních dialozích. Mapa a YouTube se načítají až po kliknutí. Poptávka z detailu předvyplní konkrétní nemovitost.

Průvodce prodejem sbírá typ nemovitosti, lokalitu, plánovaný termín a nakonec jméno, příjmení, e-mail a telefon. Umožňuje návrat ke krokům, kontroluje povinné odpovědi i formát kontaktu a zachovává rozepsaná data při zavření do obnovení stránky. Na konci připraví kompletní e-mail s poptávkou; netvrdí, že poptávka byla odeslána. Osobní údaje se neukládají do localStorage ani na server.

Formulář validuje vstupy a připraví `mailto:` zprávu. Žádný e-mail neodesílá sám a nemá backend. Pro produkční nasazení je potřeba napojit doručování poptávek a živou nabídku. Ceny a dostupnost jsou statický snímek z podkladů; původní web zůstává beze změn. Nejsou přidána smyšlená hodnocení, počty klientů ani výkonnostní tvrzení.

Původní rastry jsou zachovány v místní nadřazené složce `podklady`, která není součástí GitHub repozitáře. Kopie ve webu jsou komprimované do WebP. Úvodní fotografie a portrét pocházejí z přiložených souborů uživatele; písmo Manrope je z Google Fonts a načítá se lokálně. Použité obrázky nemovitostí mají zachované původní značky a vizualizace jsou označeny.
