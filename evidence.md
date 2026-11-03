**Kratka beleška para: Nedelja 9**

# Tumačenje dokaza i preporuka izdanja

## Promena i hipoteza

- Članovi para: Goran Suvačarev (driver) i Sara Trnjakov (observer). Ko ove nedelje vodi prikaz: **još nije određeno**.
- Polazni commit: `9846aacdc54dd5d7c1469b34de69ceee0ca71430`. Završni commit korekcije izvora: `2a08000eede4d99525d4c83f8e90533c8e38b7d1`. Izveštaji: `runs/evaluate-51aac007-9200-4ae8-891f-85d7ebaaed6d`, `runs/evaluate-5d32c619-8613-4f82-baeb-89d512f913cc`, `runs/regression-0cd8cbf0-7280-4d71-860c-48b19208f967` i `runs/regression-a7929334-2175-4dd4-8689-58521ec27074`.
- Početni `refund` trag pokazuje izbor `refund-old` (revizija 1), poziv modela i odgovor `ok`. Podaci potvrđuju da je taj izvor arhiviran; odgovor je 30 dana i citat je `refund-old`, dok aktivni `refund-current` zahteva 14 dana. Hipoteza iz koda: izbor prvog dokumenta iste teme zanemaruje `state`.
- Izmenjen je samo izbor izvora u policy grani `src/app.ts`: prihvata se aktivan dokument iste teme; bez takvog dokumenta sledi `refused` pre poziva modela. Nisu menjani javni podaci, account putanja, postojeći testovi, evaluator ni konfiguracija.
- Novi `tests/source-eligibility.test.mjs` koristi sintetičku temu warranty. `test-before.txt` beleži neuspešnu tvrdnju: stari kod vraća tekst arhiviranog izvora (90 dana) umesto aktivnog (30 dana). `test-after.txt` beleži prolaz istog testa posle korekcije; provereni su i tekst i citat.

## Tumačenje, ne prepisivanje

- `refund` sada koristi `refund-current`, reviziju 2, vraća 14 dana i odgovarajući citat. `legacy` sada vraća `refused` uz `modelCalls: 0`. Poreklo rezultata potvrđuju završni izveštaj i izdvojeni tragovi.
- Poređenja istog javnog skupa prihvaćena su bez promene podataka, konfiguracije, skripti i identiteta slučajeva. Evaluacija je prešla sa 2/4 na 4/4, a regresija sa 5/7 na 7/7. `shipping`, `unsupported`, dva poznata naloga i `invalid` ostali su PASS; nijedna planirana provera nije preskočena.
- Početni `weakCheck` je prolazio jer tekst nije bio prazan, ali to ne proverava aktivnost izvora. Ilustrativna ocena 0,95 za pogrešan odgovor meri tečnost i konkretnost; označena je kao autorski sintetički primer, ne rezultat stvarnog LLM-a. Aktivni dokument, rok i citat su konkretniji dokaz za kriterijum.
- Codex-ovo objašnjenje i kod nisu nezavisna potvrda ispravnosti. Očekivanje novog testa izvedeno je iz ugovora pre izmene; test je stvarno pao na starom kodu. Zatim su provereni javni slučajevi, tragovi i kontrolisano poređenje.

## Preporuka i ograničenja

- Za **ceo servis u simuliranoj upotrebi: ne izdati**. Ciljana policy korekcija prolazi isporučeni skup, ali nepoznat nalog i dalje daje `status: "ok"` i tekst `Status naloga: active.`, uz trag `lookup: missing`. Javni regresioni skup nema slučaj nepoznatog naloga.
- Provere su mali sintetički skup sa determinističkom modelskom zamenom i strukturisanim temama. One ne dokazuju ponašanje proizvoljnog živog modela, slobodnih pitanja ili svih ulaza. Ograničena policy simulacija bila bi zasebna odluka samo ako account putanja zaista ne može da se pozove.
- Signal za takvu policy simulaciju: odgovor `ok` koji citira izvor čije je stanje u korišćenom skupu dokumenata `archived`. Uslov za reakciju je **jedan** takav slučaj. Inženjer koji vodi simulaciju proverava ID citata, stanje izvora i trag, zaustavlja policy upotrebu, pa nastavlja tek posle ispravke i ponavljanja ciljnog testa, evaluacije i regresije.

## AI pomoć i pojedinačni doprinos

- Codex je pomogao u čitanju traga i koda, napisao ograničenu izmenu i sintetički test, pa izvršio navedene provere. Prihvaćen je uslov za aktivan izvor; nezavisnu potvrdu daju sačuvani pre/posle izlazi i neizmenjeni javni skup.
- Član 1, Goran Suvačarev: Radili smo na mom računaru. Kao driver vodio sam rad u terminalu i korišćenje svog Codex-a za pomoć pri analizi, generisanju izmene i testa. Sa Sarom sam pregledao kod i lično proverio da novi test pada pre izmene, prolazi posle nje i da završna poređenja izveštaja prolaze.
- Član 2, Sara Trnjakov: Kao observer pratila sam rad, zajedno sa Goranom čitala nedeljni zadatak i pregledala predloženu izmenu. Učestvovala sam u odlukama o granici popravke i preporuci izdanja; zajedno smo proverili rezultate testova, izveštaje i tragove.

## Dopuna u sredu

- Tutorov nezavisni rezultat i eventualno obrazloženo neslaganje: **popuniti nakon provere**.
- Incident, dostupnost, kontrole i opravdana operativna reakcija: **popuniti nakon incidenta**.
- Eventualna promena preporuke i razlog: **popuniti nakon tutorove provere i incidenta**.
