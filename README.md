# Portfolio (Leaf Webs)

Projekt osobistego portfolio z opisem ŁawAppki i formularzem kontaktowym (HTML, Tailwind CSS, vanilla JS, Supabase jako backend-as-a-service).

## Struktura projektu

| Folder / plik | Opis |
|---------------|------|
| **`app/`** | Cały kod aplikacji: HTML, CSS, JS. Tu znajduje się działająca strona (portfolio + kontakt). |
| **`docs/`** | Dokumentacja: instrukcje wgrywania, rekomendacje, plan, raport spójności. |
| **`.gitignore`** | Ignorowane pliki pomocnicze (np. `docs/`). |

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
   - W pliku `app/index.html`, tuż **przed** `<script src="js/main.js"></script>` dodaj:

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
   - Opublikuj **zawartość** folderu `app/` (nie sam folder) jako statyczną stronę, np.:
     - GitHub Pages
     - Netlify
     - Vercel