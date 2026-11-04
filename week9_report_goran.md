# Nedeljni izveštaj

## 1. Osnovne informacije

| Polje | Odgovor |
| --- | --- |
| Ime i prezime | Goran Suvačarev |
| Adresa e-pošte | goran.suvacarev@gmail.com |
| Discord korisničko ime | thescriptum |
| Nedelja | Nedelja 9 — Izgleda ispravno. Da li biste ga pustili u rad? |
| Par / tim | Goran Suvačarev i Sara Trnjakov |
| Moj konkretan doprinos / uloga | Bio sam driver. Radili smo na mom računaru, uz moj Codex. Vodio sam rad u terminalu, pregledao predloženi kod i sa Sarom proverio testove, izveštaje i tragove. |
| Datum predaje | 2026-11-04 |
| Reference na rad i dokaze | Korekcija u `src/app.ts` (commit `2a08000`), test `tests/source-eligibility.test.mjs`, izlazi `test-before.txt` i `test-after.txt`, početni i završni izveštaji evaluacije i regresije sa tragovima. |

## 2. Moj status

**Status:** Završeno

Završili smo ciljanu korekciju policy putanje i njenu proveru prema javnom skupu. Tutorova nezavisna provera i dopuna beleške nakon incidenta tek slede.

## 3. Rad ove nedelje

Sa Sarom sam radio na proveri malog servisa korisničke podrške. Zadatak je bio da istražimo jedan propust, napravimo ograničenu izmenu i uporedimo ponašanje pre i posle nje. Za policy zahteve prihvatljiv odgovor mora da koristi aktivan dokument odgovarajuće teme i da navede njegov ID. Ako takvog dokumenta nema, aplikacija treba da vrati `refused` bez poziva modelske funkcije.

Početna tri testa su prolazila, ali su javna evaluacija i regresioni skup pokazali probleme sa `refund` i `legacy`. Zajedno smo pregledali početni izveštaj, trag i dokumente. Za `refund` je aplikacija izabrala arhivirani `refund-old`, odgovorila da je rok 30 dana i citirala taj izvor. Aktivni `refund-current` navodi 14 dana. Kod je birao prvi dokument iste teme, bez provere njegovog stanja. Za `legacy` postoji samo arhivirani izvor, a stara verzija je ipak pozivala model i vraćala odgovor.

Bio sam driver: rad se odvijao na mom računaru, vodio sam komande u terminalu i koristio svoj Codex za analizu koda i traga, kao i za generisanje ciljane izmene i testa. Sara je kao observer sa mnom čitala zadatak, pregledala predlog i učestvovala u odlukama o granici izmene i preporuci izdanja. Prihvatili smo izmenu izbora izvora u `src/app.ts`: dokument mora da odgovara temi i da ima stanje `active`. Javne podatke, evaluator, postojeće testove i account putanju nismo menjali.

Pre izmene aplikacije dodali smo test sa sintetičkom temom `warranty`. Arhivirani dokument od 90 dana stoji pre aktivnog dokumenta od 30 dana. Sačuvani `test-before.txt` pokazuje da je test na starom kodu pao jer je vraćen tekst arhiviranog izvora. Posle korekcije isti test prolazi; proverava status, tekst i citat. Lično sam proverio izlaze testa pre i posle izmene, a sa Sarom sam pregledao javne izveštaje i tragove. Provera tipova i četiri lokalna testa prolaze. Javna evaluacija je prešla sa 2/4 na 4/4, a regresioni skup sa 5/7 na 7/7. Završni `refund` trag navodi `refund-current`, a `legacy` ima `refused` bez modelskog poziva. Poređenja istih javnih skupova pokazala su da ranije uspešni slučajevi nisu pali.

Codex-ov predlog nismo uzeli kao samostalan dokaz: dodatni test je prvo morao da pokaže stvarni propust, a zatim smo proverili neizmenjene javne slučajeve. Preporuka za ceo servis ostaje „ne izdati“, jer account putanja za nepoznat nalog i dalje može pogrešno da vrati status `active`; javni regresioni skup nema taj slučaj. Ovi rezultati se odnose na mali sintetički skup i kontrolisanu modelsku funkciju.

Naučio sam kako se pravilno evaluiraju AI sistemi. Pomoć tutora mi trenutno nije potrebna.

## 4. Sledeći korak

Predaću zadatak sa izmenjenim izvorom, dodatnim testom, sačuvanim dokazima pre i posle izmene i kratkom beleškom para. Taj korak će biti završen kada materijale pošaljem potvrđenim kanalom predaje.

## 5. Poverljiva napomena za tutora

Nema dodatne napomene.
