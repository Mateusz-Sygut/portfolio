# Leaf Webs - Moje portfolio

Nowoczesne portfolio frontend developera, pokazujące projekty, styl pracy i sposób myślenia o produkcie.  
Strona łączy estetyke z praktycznym celem: szybkim przedstawieniem kompetencji oraz ułatwieniem kontaktu.

## O mnie

Jestem Junior Frontend Developerem, rozwijam sie w kierunku tworzenia czytelnych, responsywnych i dopracowanych interfejsów.  
łącze doswiadczenie techniczne z dobra organizacja pracy, komunikacją w zespole i dbałością o detale.

W codziennej pracy stawiam na:
- komponentowe podejście i reużywalność,
- przejrzystość kodu i dobra czytelność UI,
- iteracyjne usprawnianie produktu,
- odpowiedzialność za jakość i stabilność wdrożeń.

## Co pokazuje to portfolio

- sekcje prezentujace mnie i moje projekty,
- case projektu Benchy (ŁawAppka),
- interaktywny moduł 3D w sekcji kontaktu,
- formularz kontaktowy z zapisem wiadomości do Supabase,
- wersje jezykowe PL/EN.

## Projekty

### Benchy (ŁawAppka)
Aplikacja mobilna do odkrywania, oceniania i dodawania ławek na mapie.  
Projekt łączy geolokalizacje, elementy grywalizacji i budowanie zaangażowania użytkowników.

### Leaf Webs (to repozytorium)
Osobiste portfolio online z naciskiem na UX, nowoczesny wygląd i czytelna prezentacje wartości biznesowej.

## Technologie

- HTML5, CSS3, JavaScript (ES6+)
- CSS, SCSS, Tailwind CSS 
- TypeScript
- React
- React Native
- Supabase
- Narzędzia AI (Microsoft Copilot, Cursor, itp.)
- Git / GitHub / GitLab
- Jira, Confluence
- SQL
- Python
- Office 365, Google Docs
- WordPress

## Doswiadczenie i profil

Poza frontendem rozwijam umiejetności wspierające pracę projektową:
- praca zespołowa i komunikacja,
- analityczne rozwiazywanie problemów,
- dokumentacja i organizacja pracy,
- szybkie uczenie sie nowych narzędzi.

## Szybki start

1. Sklonuj repozytorium.
2. Otworz `index.html` lokalnie lub uruchom przez prosty serwer statyczny.
3. (Opcjonalnie) skonfiguruj Supabase, aby formularz zapisywal wiadomosci.

### Konfiguracja Supabase (opcjonalna)

W `index.html` ustaw:

```html
<script>
  window.SUPABASE_URL = 'https://twoj-projekt.supabase.co';
  window.SUPABASE_ANON_KEY = 'twoj_anon_public_key';
</script>
```

W bazie utwórz tabele `contact_messages` i polityke RLS pozwalającą na `INSERT` dla roli `anon`.

## Struktura projektu

- `index.html` - główna strona portfolio
- `css/` - style
- `js/` - logika UI, i18n, interakcje i modul 3D
- `assets/` - grafiki i tła

## Kontakt

Portfolio zostalo zaprojektowane tak, by kontakt byl szybki i naturalny - przez formularz, e-mail lub numer telefonu.