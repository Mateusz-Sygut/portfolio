# Portfolio (Leaf Webs)

Projekt osobistego portfolio z opisem ŁawAppki i formularzem kontaktowym (HTML, Tailwind CSS, vanilla JS, Supabase jako backend-as-a-service).

## Struktura projektu

| Folder / plik | Opis |
|---------------|------|
| **`index.html`** | Główna strona portfolio (hero, sekcje, formularz kontaktowy). |
| **`css/`** | Style projektu (`main.css`). |
| **`js/`** | Logika strony (`main.js`, `tailwind-config.js`). |
| **`assets/`** | Obrazy i tła strony. |
| **`.gitignore`** | Ignorowane pliki lokalne i artefakty edytora. |

## Szybki start (Supabase + statyczny hosting)

1. **Utwórz projekt w Supabase**
   - Zaloguj się na `https://app.supabase.com` i utwórz projekt.

2. **Tabela `contact_messages`**
   - W panelu: **Database → Tables → Create table**.
   - Nazwa: `contact_messages`, RLS włączone (domyślnie).
   - Kolumny (przykład):
     - `id` – `uuid`, primary key, default `gen_random_uuid()`
     - `name` – `text`, not null
     - `email` – `text`, not null
     - `subject` – `text`, not null
     - `message` – `text`, not null
     - `created_at` – `timestamptz`, not null, default `now()`

3. **Polityka RLS (allow insert)**
   - W tabeli `contact_messages` przejdź do zakładki **RLS / Policies**.
   - Dodaj nową politykę typu **INSERT** (np. `allow_insert_from_anon`) z warunkiem:
     - `USING: true`
     - `WITH CHECK: true`
   - Dzięki temu anonimowi użytkownicy (klucz `anon`) mogą dodawać rekordy z formularza.

4. **Klucze Supabase**
   - W projekcie Supabase: **Project Settings → API**.
   - Skopiuj:
     - **Project URL** → `SUPABASE_URL`
     - **anon public** key → `SUPABASE_ANON_KEY`

5. **Konfiguracja w `index.html`**
   - W pliku `index.html`, tuż **przed** `<script src="js/main.js"></script>` dodaj:

   ```html
   <script>
     window.SUPABASE_URL = 'https://TWOJ_PROJEKT.supabase.co';
     window.SUPABASE_ANON_KEY = 'TWÓJ_ANON_PUBLIC_KEY';
   </script>
   ```

   - Kolejność skryptów na dole strony powinna być:
     - Tailwind CDN
     - `js/tailwind-config.js`
     - konfiguracja Tailwinda
     - CDN `@supabase/supabase-js@2`
     - powyższy blok z `SUPABASE_URL` i `SUPABASE_ANON_KEY`
     - `js/main.js`

6. **Hostowanie frontu**
   - Dla GitHub Pages ustaw:
     - **Source:** `Deploy from a branch`
     - **Branch:** `main`
     - **Folder:** `/(root)`

## Weryfikacja po wdrożeniu

1. Otwórz stronę i wyślij testową wiadomość z formularza.
2. W Supabase przejdź do `Database -> Table editor -> contact_messages`.
3. Sprawdź, czy pojawił się nowy rekord z `name`, `email`, `subject`, `message`.

## Typowe problemy

- **Brak zapisu w bazie:** sprawdź, czy `SUPABASE_URL` i `SUPABASE_ANON_KEY` są ustawione poprawnie.
- **Błąd uprawnień:** upewnij się, że polityka RLS dla `INSERT` na `contact_messages` istnieje i jest przypisana do roli `anon`.
- **Zły adres strony:** w GitHub Pages używaj `main + /(root)`, bo projekt jest teraz w katalogu głównym repo.