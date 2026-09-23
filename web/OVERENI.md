# Ověření návrhu — 23. 9. 2026

- Lokální HTTP náhled odpovídá 200.
- JavaScript obou stránek prošel `node --check`.
- Všechny lokální odkazy, kotvy, importy písem a 401 fotografií mají odpovídající soubor.
- Kontrola hlavní stránky při 1440 × 1000 a 390 × 844 px: bez horizontálního přetečení, funkční mobilní navigace.
- Filtr Byty vrací 3 nabídky. Rozbalení všech nabídek zobrazuje 18 inzerátů. Řazení od nejlevnějších začíná 2 350 000 Kč a končí 13 990 000 Kč.
- Prohlédnuté detaily: chata Děkov (19 fotografií) a byt Praha Braník (15 fotografií).
- Galerie: tlačítko Další mění snímek a počitadlo; Escape zavírá dialog.
- Služby obsahují 21 položek, reference 16 původních hodnocení.
- Hlavní video má připojen lokální MP4 soubor, dialog se otevírá a zavírá.
- Poptávka z detailu Braníku správně předvyplní záměr koupě a přesný název nemovitosti.
- Formulář vytvoří správně zakódovaný mailto odkaz. Při ověření nebyl žádný e-mail odeslán ani otevřena e-mailová aplikace.
- V ověřovaném lokálním náhledu nebyly chyby JavaScriptu ani rozbité načtené obrázky. Testovací vstupy byly z prohlížeče odstraněny novým načtením úvodu.

## Hosting

Registrace soukromého projektu proběhla. Nahrání zdrojů, fotografií a dalších podkladů bylo před spuštěním odmítnuto automatickým schvalováním kvůli chybějícímu výslovnému souhlasu s přenosem na hosting. Návrh je dokončený a dostupný lokálně. Zdrojový archiv nebyl nahrán, verze nebyla publikována. Případné pokračování musí použít již uložené `project_id`, ne vytvářet nový projekt.


## Zapracování připomínek — 23. 9. 2026

- Celé jméno „Ing. Jiří Mayrich, MBA“ v obou hlavičkách a v patičce, telefon s +420.
- Manrope také v nadpisech, odstraněna kurzíva a koncové tečky nadpisů.
- Originální logo z `podklady/media/web/logobig-cac0646.png`, transparentní portrét z hero znovu použit v sekci O mně.
- Odstraněn obdélníkový překryv portrétu a průhlednost na tabletu; jmenovka používá čitelný text se zlatou linkou.
- Jednotné SVG ikony pro telefon, šipky, polohu, přehrávání a zavírání dialogů.
- Vizuálně ověřeny hlavní stránka na desktopu 1272 px, mobilu 390 px a tabletu 768 px, sekce O mně a mobilní detail nabídky.
- Mobilní menu zobrazuje telefon s předvolbou; galerie přepíná fotografie a zavírá se klávesou Escape.
- Žádné chybějící statické odkazy či použité SVG symboly, kontrola syntaxe obou JS souborů bez chyb. Na ověřených hlavních stránkách a mobilním detailu bez vodorovného posunu; konzole detailu bez chyb.
- Návrh zůstává pouze lokálně.

## Průvodce prodejem — 23. 9. 2026

- Tlačítko „Chci prodat nemovitost“ otevírá nativní modal se čtyřmi kroky: typ, lokalita, plán a kontakt.
- Ověřeno na 1272 × 810, 390 × 844 a 320 × 640. Na malém displeji je obsah posuvný bez vodorovného přetékání; zavírací tlačítko zůstává dostupné a každý další krok začíná nahoře.
- Ověřeny povinné volby, prázdná obec, neplatný telefon a e-mail. Smazaná obec při návratu k předchozímu kroku se zachytí i při pokusu dokončit poptávku z kontaktu.
- Zpět a navigace dokončenými kroky zachovávají odpovědi. Zavření a znovuotevření zachová stav do obnovení stránky. Escape i zavírací tlačítko vrací fokus na původní CTA a obnovují posouvání stránky.
- Testováno sestavení mailto zprávy se všemi údaji i průchod s prázdnými nepovinnými poli. Typ, lokalita, termín, jméno, příjmení, e-mail a telefon se správně předají, včetně české diakritiky. Testovací e-mail nebyl odeslán.
- Kontrola JavaScriptu bez syntaktických chyb, bez chyb konzole; bez duplicitních ID a chybějících souborů či SVG symbolů.
- Backend není připojen. Výsledná obrazovka jasně žádá uživatele o odeslání připraveného e-mailu a nepředstírá doručenou poptávku.


## Certifikace a lektorská role — 23. 9. 2026

- Přesné označení „Certifikovaný realitní makléř a lektor RVI“ sjednoceno u hero portrétu, v pásu zkušeností, v kontaktu, v průvodci prodejem a kontaktní kartě detailu nabídky.
- V části O mně zvýrazněno samostatným decentním blokem a rozepsáno RVI jako Realitní vzdělávací institut. Text uvádí původně doložený kurz „Technické zhodnocení budov a PENB“; odkaz na originální PDF certifikátu zachován.
- Text kariérní spolupráce navazuje na původní stránku moznosti-spoluprace.html a propojuje nabídku podpory s lektorskou praxí.
- Meta popis rozlišuje působení v realitách od roku 2008 od certifikace a lektorské role, u nichž začátek doložen není.
- Kontrola syntaxe detail.js a lokálních souborových odkazů bez chyb. Vizuální kontrola části O mně na desktopu a mobilu.

## Mobilní menu a hero — 23. 9. 2026

- Původní rozbalovací navigaci nahrazuje společné modální menu na úvodní stránce i detailu nemovitosti. Obsahuje číslované odkazy, kontakt a vstup do průvodce prodejem.
- Ověřeno zavření křížkem, Escape i kliknutím na pozadí, uzamčení posouvání stránky, cyklus Tab / Shift+Tab a návrat fokusu. Odkaz na sekci zavře menu a přesune fokus na její nadpis.
- Přechod do průvodce prodejem funguje z obou stránek bez překrytí dvou modalů; zavření průvodce vrací fokus na viditelné tlačítko v hero.
- Na šířkách do 700 px je hero portrét skrytý a výška sekce se přizpůsobuje obsahu. Desktopový portrét zůstává viditelný.
- Vizuálně ověřeno 495 × 810, 320 × 640 a desktop 1272 × 810; detail a přechod do průvodce také na 390 × 844. Bez vodorovného přetečení, malé menu lze posouvat a zavírací tlačítko zůstává dostupné. Při přechodu na desktop se menu samo zavře.
- Kontrola syntaxe JavaScriptu, unikátních ID a lokálních souborů bez chyb. Konzole při ověření bez varování a chyb. Vše zůstává lokálně.

## Mobilní hero přes první obrazovku — 23. 9. 2026

- Mobilní hero má minimální výšku `100svh` po odečtení hlavičky. Na 388 × 810 končí přesně na spodním okraji první obrazovky; na krátkých displejích se podle potřeby prodlouží a obsah se neořízne.
- Tlačítko pro prodej je přes celou dostupnou šířku, s doprovodným textem, jemným zaoblením a samostatnou šipkou. Ověřeno otevření průvodce a návrat po zavření.
- Mobilní fotografie se pomalu přibližuje a posouvá v cyklu 22 sekund. Ovladač pozastaví i obnoví pohyb. Animace je podmíněna `prefers-reduced-motion: no-preference`; mimo záběr nebo při skryté stránce se pozastaví.
- Vizuálně ověřeny rozměry 388 × 810, 320 × 640 a 1272 × 810. Bez vodorovného přetečení; desktopový portrét a původní rozměry tlačítka zachovány.
- Syntaxe hero.js, odkazy na místní soubory, SVG symboly a unikátní HTML ID ověřeny bez chyb.
