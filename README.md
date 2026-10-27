# Leaf Webs

Portfolio Mateusza Sygut. Aplikacje mobilne i strony internetowe — od interfejsu po kontakt.

Strona jest statyczna: jeden plik HTML, style i kilka skryptów. Działa po polsku i po angielsku.

## O mnie

Jestem frontend developerem. Programuję aplikacje mobilne i strony, z naciskiem na czytelny interfejs, spokojny kod i projekty, które da się pokazać.

W pracy liczy się dla mnie:

- komponenty, które da się użyć ponownie,
- przejrzysty kod i czytelny UI,
- dopracowanie produktu w kolejnych iteracjach,
- jakość i stabilność wdrożenia.

## Strona

- **Start** — wprowadzenie i główny projekt
- **O mnie**
- **Stack** — frontend, backend, narzędzia i współpraca
- **Projekty** — ŁawAppka
- **Kontakt** — laptop 3D (Three.js) i formularz zapisujący wiadomości w Supabase

## ŁawAppka

Aplikacja mobilna do odkrywania, dodawania i oceniania ławek w okolicy. Mapa, punkty, odznaki i lekka rywalizacja.

React Native (Expo), TypeScript, Supabase.

Repozytorium: [mateusz-sygut/benchy](https://github.com/mateusz-sygut/benchy)

## Technologie

**Frontend** — HTML, CSS / Sass, JavaScript, TypeScript, React, React Native (Expo), Tailwind CSS, WordPress

**Backend i dane** — Supabase, PostgreSQL / SQL, REST API, Python, FastAPI, Docker Compose

**Narzędzia** — Git, Node.js, Vite, Webpack, Metro, Chrome DevTools, narzędzia AI

**Współpraca** — Jira, Confluence, Figma, Office 365, Google Docs

## Uruchomienie

```bash
python -m http.server 8765
```

Potem otwórz [http://127.0.0.1:8765/](http://127.0.0.1:8765/).

Laptop w sekcji kontaktu ładuje się jako moduł ES, więc podgląd przez serwer statyczny jest pewniejszy niż otwarcie pliku z dysku.

### Formularz i Supabase

W `index.html` ustaw `window.SUPABASE_URL` i `window.SUPABASE_ANON_KEY`.

Tabela `contact_messages` ma kolumny `name`, `email`, `subject` i `message`. Włącz RLS. Rola `anon` może tylko dodawać wiersze. Klucz `service_role` zostaje poza stroną.

```sql
alter table public.contact_messages enable row level security;

create policy "anon insert only"
on public.contact_messages
for insert
to anon
with check (true);
```

## Struktura

- `index.html` — strona
- `css/app.css` — hero, nawigacja, stack, formularz, tło projektów
- `js/theme.js` — kolory i konfiguracja Tailwind
- `js/locale.js` — teksty PL/EN
- `js/app.js` — nawigacja, zakładki stacku, formularz
- `js/3d-contact.js` — laptop w sekcji kontaktu
- `assets/` — grafiki

## Kontakt

Wiadomość idzie przez formularz na dole strony. Imię i email służą tylko do odpowiedzi.
