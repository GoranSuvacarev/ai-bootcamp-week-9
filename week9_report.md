# Nedeljni izveštaj NACRT

## 1. Osnovne informacije

| Polje | Odgovor |
| --- | --- |
| Ime i prezime | Sara Trnjakov |
| Adresa e-pošte | saratrnjakov6@gmail.com |
| Discord korisničko ime | saratrnjakov |
| Nedelja | Nedelja 9 — Izgleda ispravno Da li biste ga pustili u rad |
| Par / tim | Goran Suvačarev i Sara Trnjakov |
| Moj konkretan doprinos / uloga | Kao observer pratila sam rad, zajedno sa Goranom čitala zadatak i pregledala predloženu izmenu. Učestvovala sam u odlukama o granici popravke i preporuci izdanja, a sa Goranom sam proverila testove, izveštaje i tragove. Vodim prezentaciju para. |
| Datum predaje | 2026-11-03 |
| Reference na rad i dokaze | Korekcija izbora izvora u `src/app.ts`, dodatni test `source-eligibility.test.mjs`, izlazi `test-before.txt` i `test-after.txt`, kao i sačuvani početni i završni izveštaji evaluacije i regresije. Završni commit korekcije: `2a08000`. |

## 2. Moj status

**Status:** Završeno

Završili smo ciljanu korekciju policy putanje, dodali test i proverili rezultate na javnoj evaluaciji i regresionom skupu. Dopuna nakon tutorove nezavisne provere i incidenta još nije evidentirana.

## 3. Rad ove nedelje

Ove nedelje radili smo na proveri pouzdanosti servisa korisničke podrške. Zadatak nije bio samo da aplikacija prođe osnovne testove, već da utvrdimo da li odgovor za policy temu koristi važeći izvor. Kriterijum je bio da aplikacija za traženu temu koristi aktivan dokument, navede njegov citat i vrati `refused` bez poziva modela kada aktivan izvor ne postoji.

Zajedno smo prvo pregledali početne rezultate, podatke i tragove izvršavanja. Za temu `refund` aplikacija je vraćala odgovor sa rokom od 30 dana i citatom `refund-old`. Pregledom podataka smo utvrdili da je taj dokument arhiviran, dok je aktivni dokument `refund-current` imao rok od 14 dana. Trag je pokazivao da je aplikacija zaista izabrala arhivirani izvor, pozvala model i vratila status `ok`. To nam je pokazalo razliku između tehnički uspešnog izvršavanja i poslovno prihvatljivog odgovora. Takođe smo proverili temu `legacy`, za koju postoji samo arhivirani dokument. Po ugovoru je tu trebalo vratiti `refused`, ali je početna verzija takođe vraćala odgovor.

Kao observer učestvovala sam u čitanju specifikacije, pregledu koda i odluci da se promena ograniči samo na izbor izvora u policy putanji. Prihvatili smo hipotezu da kod bira prvi dokument sa odgovarajućom temom, bez provere njegovog stanja. Zbog toga je arhivirani dokument mogao da ima prednost samo zato što se nalazi ranije u listi. Nismo menjali javne podatke, postojeće testove, evaluator, konfiguraciju niti account putanju, jer bi to promenilo uslove poređenja.

Izmena u `src/app.ts` sada zahteva da dokument odgovara temi i da ima stanje `active`. Ako takav dokument ne postoji, aplikacija vraća `refused` pre poziva modelske funkcije. Dodali smo i zaseban test za temu `warranty`, u kome se arhivirani dokument od 90 dana nalazi pre aktivnog dokumenta od 30 dana. Test je na starom kodu pao jer je korišćen arhivirani dokument, a posle izmene prolazi i proverava status, tekst odgovora i citat. Zajedno smo proverili izlaze pre i posle izmene i da novi test ne predstavlja samo ručnu popravku poznatog `refund` primera.

Javna evaluacija je prešla sa 2/4 na 4/4 uspešna slučaja, a regresiona provera sa 5/7 na 7/7. Slučajevi `refund` i `legacy` su popravljeni, dok su `shipping`, `unsupported`, poznati nalozi i neispravan zahtev ostali uspešni. Dodatno smo proverili da trenutni typecheck i sva četiri lokalna testa prolaze. Naučila sam da tečan i konkretan odgovor nije dovoljan dokaz da je odgovor ispravan: potrebno je proveriti aktivnost izvora, citat, trag i kriterijum prihvatanja.

U radu para koristili smo Codex za čitanje traga i koda, predlog ograničene izmene i dodatnog sintetičkog testa. Nismo prihvatili njegov rezultat samo na osnovu objašnjenja. Proverili smo da novi test pada na starom kodu, prolazi nakon korekcije, a zatim proverili javnu evaluaciju, regresioni skup i poređenje rezultata. Pomoć od tutora mi trenutno nije potrebna; nakon nezavisne tutorove provere biće potrebno samo da evidentiramo nalaz i eventualno revidiramo preporuku.

## 4. Sledeći korak

Trenutno nemam planiran sledeći korak pre druge sesije.

## 5. Poverljiva napomena za tutora

Nema dodatne napomene.
