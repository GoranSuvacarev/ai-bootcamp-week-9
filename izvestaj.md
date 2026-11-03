# Izveštaj — Nedelja 9

**Članovi para:** Goran Suvačarev i Sara Trnjakov  
**Prezentaciju vodi:** Sara Trnjakov

## Cilj zadatka

- Proveriti da li servis korisničke podrške daje odgovore zasnovane na važećim policy dokumentima.
- Ne proverava se samo da li se aplikacija pokreće, već i da li odgovor zadovoljava poslovna pravila.

## Uočeni problem

- Za temu `refund` aplikacija je birala prvi dokument za tu temu: `refund-old`.
- Taj dokument je arhiviran i navodi rok od 30 dana.
- Aktivni dokument, `refund-current`, navodi ispravan rok od 14 dana.
- Za temu `legacy`, gde postoji samo arhivirani dokument, aplikacija je takođe nepravilno davala odgovor umesto da odbije zahtev.

## Uzrok

- Izvor se birao samo prema temi, bez provere statusa dokumenta.
- Zbog toga je redosled dokumenata mogao da dovede do izbora arhiviranog izvora.

## Izmena

- U `src/app.ts` promenjen je izbor izvora.
- Sada dokument mora istovremeno da ima odgovarajuću temu i stanje `active`.
- Ako aktivni izvor ne postoji, aplikacija vraća `refused` i ne poziva model.
- Nisu menjani javni podaci, postojeći testovi, evaluator, konfiguracija ni account putanja.

## Dodatni test

- Dodat je test `tests/source-eligibility.test.mjs` sa sintetičkom temom `warranty`.
- Test ima arhivirani dokument od 90 dana postavljen pre aktivnog dokumenta od 30 dana.
- Na starom kodu test je pao, jer je izabran arhivirani izvor.
- Posle izmene test prolazi i potvrđuje ispravan tekst, status i citat aktivnog dokumenta.

## Rezultati

| Provera | Pre izmene | Posle izmene |
| --- | ---: | ---: |
| Javna evaluacija | 2/4 | 4/4 |
| Regresiona provera | 5/7 | 7/7 |
| Lokalni testovi | 3 osnovna | 4 uspešna, uključujući novi test |

- Popravljeni su slučajevi `refund` i `legacy`.
- Ispravni slučajevi `shipping`, `unsupported`, poznati nalozi i neispravan zahtev ostali su uspešni.

## Zaključak

- Tečan i konkretan odgovor nije dovoljan dokaz da je odgovor tačan.
- Potrebno je proveriti izvor, njegov status, citat i trag izvršavanja.
- Policy deo aplikacije je popravljen i potvrđen testovima.
- Ceo servis se još ne preporučuje za neograničeno izdavanje, jer account putanja za nepoznat nalog i dalje može pogrešno vratiti status `active`.
