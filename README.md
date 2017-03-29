Aplikacja ma za zadanie przechowywac ulubione filmy uzytkownika w ramach strony. (TYMCZASOWO obslugujemy filmy z youtube i vimeo - możliwość dodania innych api - wykorzystanie odpowiednich wzorców projektowych).

Uzytkownik moze dodac film na strone poprzez input dostepny na stronie glownej i wklejenie:
. paska adresu filmu, czyli np.:

https://www.youtube.com/watch?v=4JOAqRS_lms lub
https://youtu.be/vJ3a_AuEW18 lub https://vimeo.com/138882294

. identyfikatora filmu, czyli np.: vJ3a_AuEW18

Filmy powinny byc wylistowane z danymi takimi jak:

. ilosc odtworzen
. ilosc polubien
. nazwe filmu
. miniaturka filmu (po kliknieciu otwiera film w modalu)
. date dodania do biblioteki

i akcjami takimi jak:

. odtwórz (po kliknieciu otwiera film w modalu)
. usun
. dodaj do ulubionych

Lista filmow powinna:
. posiadac paginacje (z mozliwoscia wyboru liczby elementow na stronie
- 5 / 10 / 20 / 50 / 100)
. posiadac mozliwosc wyboru rodzaju displayu (kafelki albo lista)
. posiadac mozliwosc wyczyszczenia wszystkich filmow
. filtr "tylko ulubione" - pokazujacy tylko ulubione filmy
. sortowanie po najstarsze / ostatnio dodane

Filmy powinny byc dostepne rowniez po zamknieciu i ponownym otworzeniu przegladarki.
