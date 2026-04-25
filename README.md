# Booksfera — Instrukcja obsługi

## Jak dodać, edytować lub usunąć książkę

Otwórz plik `booksfera-generator.html` w przeglądarce (Chrome lub Edge).

### Dodanie nowej książki

1. Wypełnij formularz — tytuł, autor, treść sekcji, FAQ
2. Wybierz **Kategorię na Półce** (żeby książka pojawiła się w polka.html)
3. Kliknij **Zapisz do projektu**
4. Przy pierwszym zapisie przeglądarka zapyta o folder — wybierz folder projektu `booksfera`
5. Gotowe — plik `.html` został zapisany w folderze

### Edycja istniejącej książki

1. Kliknij **Edytuj istniejącą** w lewym panelu
2. Wybierz plik książki (np. `pantadeusz.html`)
3. Formularz wypełni się automatycznie
4. Wprowadź zmiany
5. Kliknij **Zapisz do projektu** — plik zostanie nadpisany

### Usunięcie książki

1. Kliknij **Usuń książkę** w lewym panelu
2. Przy pierwszym użyciu wybierz folder projektu
3. Wybierz książkę z listy
4. Kliknij **Usuń na stałe** i potwierdź
5. Plik zostaje usunięty i wpis znika z polka.html

---

## Jak wgrać zmiany na stronę

Po każdym zapisie lub usunięciu książki zmiany są tylko lokalnie na Twoim komputerze.
Żeby pojawiły się na żywej stronie, trzeba je wgrać na GitHub.

### Opcja A — Ręcznie (publish.bat)

Kliknij dwukrotnie plik **`publish.bat`**.

Skrypt zrobi wszystko sam:
- zapisze zmiany w git (`git add`)
- stworzy commit (`git commit`)
- wgra na GitHub (`git push`)

Cloudflare Pages automatycznie zbuduje stronę — zmiany będą widoczne po około 1 minucie.

### Opcja B — Automatycznie (autoPublish.bat)

1. Kliknij dwukrotnie **`autoPublish.bat`** na początku pracy
2. Zostaw okno terminala otwarte w tle
3. Od tej chwili każdy zapis lub usunięcie w generatorze **automatycznie** trafia na GitHub
4. Zamknij okno gdy skończysz pracę

Możesz też ustawić VS Code żeby startował auto-publish sam przy otwarciu projektu — patrz sekcja poniżej.

---

## Jednorazowa konfiguracja VS Code (opcjonalnie)

Jeśli używasz VS Code i chcesz żeby auto-publish startował sam przy otwarciu projektu:

1. Otwórz projekt w VS Code
2. Na dole pojawi się powiadomienie: *"This folder has tasks configured to run automatically"*
3. Kliknij **Allow and run**
4. Gotowe — od teraz auto-publish startuje automatycznie przy każdym otwarciu projektu

---

## Jednorazowa konfiguracja strony (Cloudflare Pages)

Żeby strona była dostępna w internecie, raz trzeba podłączyć GitHub do Cloudflare Pages.

1. Wejdź na **dash.cloudflare.com**
2. Przejdź do **Workers & Pages → Create → Pages → Connect to Git**
3. Zaloguj się przez GitHub i wybierz repozytorium **booksfera**
4. Ustaw:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Kliknij **Save and Deploy**

Po tym każdy push na GitHub automatycznie buduje i aktualizuje stronę.

---

## Codzienna praca — skrót

```
1. Otwórz booksfera-generator.html w Chrome
2. Zrób zmiany (dodaj / edytuj / usuń książkę)
3. Kliknij "Zapisz do projektu"
4. Kliknij dwukrotnie publish.bat
   → strona zaktualizowana w ~1 minutę
```
