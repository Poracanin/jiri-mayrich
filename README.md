# Jiří Mayrich — osobní realitní web

Responzivní návrh webu Ing. Jiřího Mayricha, MBA, certifikovaného realitního makléře a lektora RVI. Tmavě modrá a zlatá, moderní písmo Manrope, osobní portrét a skutečný obsah původního webu.

## Lokální spuštění

Ze složky repozitáře spusťte:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory web/dist
```

Potom otevřete [lokální náhled](http://127.0.0.1:4173/). Není potřeba instalace balíčků ani sestavování. Web potřebuje HTTP server kvůli načítání JSON dat; přímé otevření HTML ze souboru nestačí.

## Obsah

- Osobní představení, služby, reference a kontakt.
- 18 nabídek nemovitostí a 401 fotografií v původním pořadí.
- Filtrování, řazení, samostatné detaily a fotogalerie.
- Čtyřkrokový průvodce prodejem s validací a souhrnem poptávky.
- Video, certifikát a lokálně načítaná písma.

## Struktura

| Cesta | Obsah |
|---|---|
| `web/dist/` | Kompletní statický web, připravený pro hosting |
| `web/dist/assets/` | Fotografie, portrét, logo, video, certifikát a písma |
| `web/dist/data/` | Nabídky, služby a reference |
| [web/README.md](web/README.md) | Technické poznámky a omezení návrhu |
| [web/DESIGN.md](web/DESIGN.md) | Vizuální směr a zadání |
| [web/OVERENI.md](web/OVERENI.md) | Provedené kontroly a zapracované úpravy |

## Stav projektu

Jde o funkční návrh. Formuláře připravují e-mailovou zprávu, kterou návštěvník sám odešle ve své e-mailové aplikaci. Automatické doručování poptávek ani živý zdroj nabídek nejsou napojené.

Nabídky a ceny odpovídají podkladům archivovaným 23. září 2026. Mapa a externí videoprohlídky se načítají až po kliknutí návštěvníka. Nahrání do tohoto repozitáře samo o sobě web nepublikuje a nepřepisuje původní web.

Duplicitní zdrojový archiv `podklady/` a místní konfigurace hostingu se do repozitáře nezahrnují. Všechny soubory potřebné ke spuštění návrhu jsou v `web/dist/`.

## Zveřejnění náhledu na GitHub Pages

Workflow `.github/workflows/pages.yml` publikuje pouze složku `web/dist/`. `index.html` je tedy přímo v kořeni veřejného webu. Build ani instalace závislostí nejsou potřeba.

V nastavení repozitáře **Settings → Pages → Source** musí být vybráno **GitHub Actions**. Publikování se spustí po každém pushi do `main` nebo ručně přes **Actions → Publish website to GitHub Pages → Run workflow**.

Adresa náhledu po úspěšném nasazení: [poracanin.github.io/jiri-mayrich/](https://poracanin.github.io/jiri-mayrich/). Původní doména `jiri-mayrich.cz` se tím nemění. Stav nasazení a případné chyby jsou v záložce Actions.
