;(function () {
    'use strict';

    var STORAGE_KEY = 'leafLang';

    var STRINGS = {
        pl: {
            'meta.title': 'Mateusz Sygut · Leaf Webs – aplikacje i strony',
            'nav.home': 'Start',
            'nav.about': 'O mnie',
            'nav.projects': 'Projekty',
            'nav.contact': 'Kontakt',
            'nav.langGroup': 'Język strony',
            'nav.menuAria': 'Menu nawigacji',
            'hero.h1': 'Cześć, jestem Mateusz',
            'hero.p':
                'Tworzę aplikacje i strony – m.in. ŁawAppkę, żeby łatwiej było odkrywać fajne ławki w okolicy.',
            'about.h2': 'Parę słów o mnie',
            'about.p1':
                'Programuję aplikacje mobilne i strony internetowe. Najbardziej lubię projekty z duszą – takie jak ŁawAppka, gdzie chodzi o to, żeby wyjść z domu, poszukać ładnej ławki i po prostu usiąść.',
            'about.p2':
                'Poniżej znajdziesz mój główny projekt; jeśli chcesz porozmawiać o współpracy albo po prostu napisać parę słów, na dole strony jest formularz kontaktowy.',
            'projects.h2': 'ŁawAppka',
            'projects.cardTitle': 'ŁawAppka – ławki na mapie',
            'projects.cardP1':
                'Aplikacja mobilna po to, żeby odkrywać, dodawać i oceniać ławki w okolicy. Masz mapę, punkty, odznaki i lekką rywalizację – można zbierać „rzadkie” ławki i dzielić się ulubionymi miejscami.',
            'projects.cardP2':
                'Zbudowana w React Native (Expo), TypeScript, Supabase – mapa, gamifikacja, osiągnięcia.',
            'projects.github': 'Zobacz na GitHub',
            'contact.h2': 'Napisz do mnie',
            'contact.nameLabel': 'Imię i nazwisko',
            'contact.namePh': 'Wpisz swoje imię i nazwisko',
            'contact.emailLabel': 'Adres email',
            'contact.emailPh': 'Wpisz swój adres email',
            'contact.subjectLabel': 'Temat wiadomości',
            'contact.subjectPh': 'Wpisz temat wiadomości',
            'contact.bodyLabel': 'Treść wiadomości',
            'contact.bodyPh': 'Wpisz treść wiadomości',
            'contact.submit': 'Wyślij wiadomość',
            'form.err.name': 'Imię i nazwisko jest wymagane.',
            'form.err.email': 'Adres email jest wymagany.',
            'form.err.emailInvalid': 'Adres email musi być prawidłowy.',
            'form.err.body': 'Treść wiadomości jest wymagana.',
            'form.msg.supabaseClient': 'Formularz nie jest skonfigurowany – brak klienta Supabase.',
            'form.msg.supabaseKeys': 'Formularz nie jest skonfigurowany – uzupełnij SUPABASE_URL i SUPABASE_ANON_KEY.',
            'form.msg.sending': 'Wysyłanie wiadomości...',
            'form.msg.fail': 'Nie udało się wysłać wiadomości.',
            'form.msg.ok': 'Dziękuję za wiadomość!',
            'form.msg.net': 'Błąd połączenia z Supabase.'
        },
        en: {
            'meta.title': 'Mateusz Sygut · Leaf Webs – apps and websites',
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',
            'nav.langGroup': 'Site language',
            'nav.menuAria': 'Navigation menu',
            'hero.h1': 'Hi, I’m Mateusz',
            'hero.p':
                'I build apps and websites – including Benchy, to make it easier to discover great benches nearby.',
            'about.h2': 'A few words about me',
            'about.p1':
                'I develop mobile apps and websites. I like projects with character – like ŁawAppka, where the goal is to get outside, find a nice bench, and simply sit down.',
            'about.p2':
                'Below you’ll find my main project; if you’d like to talk about collaboration or just say hello, there’s a contact form at the bottom of the page.',
            'projects.h2': 'Benchy',
            'projects.cardTitle': 'Benchy – benches on a map',
            'projects.cardP1':
                'A mobile app to discover, add, and rate benches nearby. There’s a map, points, badges, and light competition – you can collect “rare” benches and share favourite spots.',
            'projects.cardP2':
                'Built with React Native (Expo), TypeScript, Supabase – map, gamification, achievements.',
            'projects.github': 'View on GitHub',
            'contact.h2': 'Get in touch',
            'contact.nameLabel': 'Full name',
            'contact.namePh': 'Enter your full name',
            'contact.emailLabel': 'Email address',
            'contact.emailPh': 'Enter your email address',
            'contact.subjectLabel': 'Subject',
            'contact.subjectPh': 'Enter the subject',
            'contact.bodyLabel': 'Message',
            'contact.bodyPh': 'Enter your message',
            'contact.submit': 'Send message',
            'form.err.name': 'Full name is required.',
            'form.err.email': 'Email is required.',
            'form.err.emailInvalid': 'Please enter a valid email address.',
            'form.err.body': 'Message is required.',
            'form.msg.supabaseClient': 'The form is not configured – Supabase client is missing.',
            'form.msg.supabaseKeys': 'The form is not configured – set SUPABASE_URL and SUPABASE_ANON_KEY.',
            'form.msg.sending': 'Sending...',
            'form.msg.fail': 'Could not send the message.',
            'form.msg.ok': 'Thanks for your message!',
            'form.msg.net': 'Could not connect to Supabase.'
        }
    };

    function currentLang() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'pl') return stored;
        return 'pl';
    }

    function leafT(key) {
        var lang = currentLang();
        var pack = STRINGS[lang] || STRINGS.pl;
        return pack[key] != null ? pack[key] : (STRINGS.pl[key] != null ? STRINGS.pl[key] : key);
    }

    function applyTexts() {
        var lang = currentLang();
        document.documentElement.setAttribute('lang', lang);

        var title = leafT('meta.title');
        if (title) document.title = title;

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (!key) return;
            var text = leafT(key);
            if (text != null) el.textContent = text;
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (!key) return;
            var text = leafT(key);
            if (text != null) el.setAttribute('placeholder', text);
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-aria');
            if (!key) return;
            var text = leafT(key);
            if (text != null) el.setAttribute('aria-label', text);
        });
    }

    function updateLangButtons() {
        var lang = currentLang();
        var track = document.getElementById('langSwitch');
        if (track) track.setAttribute('data-lang', lang);
        var plBtn = document.getElementById('langPl');
        var enBtn = document.getElementById('langEn');
        if (plBtn) {
            plBtn.classList.toggle('text-white', lang === 'pl');
            plBtn.classList.toggle('text-zinc-400', lang !== 'pl');
        }
        if (enBtn) {
            enBtn.classList.toggle('text-white', lang === 'en');
            enBtn.classList.toggle('text-zinc-400', lang !== 'en');
        }
    }

    function setLang(lang) {
        if (lang !== 'pl' && lang !== 'en') return;
        localStorage.setItem(STORAGE_KEY, lang);
        applyTexts();
        updateLangButtons();
    }

    function bindLangSwitch() {
        var plBtn = document.getElementById('langPl');
        var enBtn = document.getElementById('langEn');
        if (plBtn) plBtn.addEventListener('click', function () { setLang('pl'); });
        if (enBtn) enBtn.addEventListener('click', function () { setLang('en'); });
    }

    window.LEAF_I18N = {
        leafT: leafT,
        currentLang: currentLang,
        setLang: setLang,
        applyTexts: applyTexts
    };

    /* Teksty od razu po parsowaniu skryptu (mniej „pustki” przy pustych data-i18n w HTML). */
    applyTexts();
    updateLangButtons();
    document.addEventListener('DOMContentLoaded', bindLangSwitch);
})();
