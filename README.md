# Portfolio (Leaf Webs)

Projekt osobistego portfolio z opisem ŁawAppki i formularzem kontaktowym (HTML, Tailwind CSS, vanilla JS, Supabase jako backend-as-a-service).

## Struktura projektu

| Folder / plik | Opis |
|---------------|------|
| **`app/`** | Cały kod aplikacji: HTML, CSS, JS. Tu znajduje się działająca strona (portfolio + kontakt). |
| **`docs/`** | Dokumentacja: instrukcje wgrywania, rekomendacje, plan, raport spójności. |
| **`.gitignore`** | Ignorowane pliki pomocnicze (np. `docs/`). |

## Szybki start

1. **Supabase** – w swoim projekcie Supabase utwórz tabelę `contact_messages` (np. kolumny: `id`, `name`, `email`, `subject`, `message`, `created_at`).
2. **Klucze Supabase** – przed załadowaniem skryptu `js/main.js` ustaw globalne zmienne JS `SUPABASE_URL` i `SUPABASE_ANON_KEY` (np. w osobnym `<script>` w `index.html`). Formularz kontaktowy użyje ich do zapisu w tabeli `contact_messages`.
3. **Front** – opublikuj zawartość folderu `app/` jako statyczną stronę (np. GitHub Pages, Netlify, Vercel).

## Zawartość `docs/`

- **Instrukcja.txt** – historyczne dane logowania FTP i bazy
- **QUICK_START.md** – stare instrukcje wgrywania na serwer PHP
- **REKOMENDACJE_POPRAWEK.md** – rekomendacje i wdrożone poprawki
- **RAPORT_SPOJNOSCI.md** – spójność struktury i API
- **PLAN.md** – plan projektu (historycznie: wersja z blogiem)
- **INSTRUKCJA_SERWER.md** – instrukcja wgrywania na student.app.rvcz.online
