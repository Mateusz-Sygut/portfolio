(() => {
    const STORAGE_KEY = 'leafLang';

    const STRINGS = {
			pl: {
				'meta.title': 'Mateusz Sygut · Leaf Webs – aplikacje i strony',
				'nav.home': 'Start',
				'nav.about': 'O mnie',
				'nav.stack': 'Stack',
				'nav.projects': 'Projekty',
				'nav.contact': 'Kontakt',
				'nav.langGroup': 'Język strony',
				'nav.menuAria': 'Menu nawigacji',
				'hero.h1': 'Cześć, jestem Mateusz',
				'hero.p':
					'Tworzę aplikacje i strony – między innymi <span class="text-accent">ŁawAppkę</span>, żeby łatwiej było odkrywać ławki w okolicy.',
				'about.h2': 'Parę słów o mnie',
				'about.p1':
					'Programuję aplikacje mobilne i strony internetowe. Najbardziej lubię projekty z duszą – takie jak ŁawAppka, gdzie chodzi o to, żeby wyjść z domu, poszukać ładnej ławki, usiąść i napisać parę słów.',
				'about.p2':
					'Poniżej znajdziesz mój stack technologiczny i główny projekt; jeśli chcesz porozmawiać o współpracy albo po prostu napisać parę słów, na dole strony jest formularz kontaktowy.',
				'stack.h2': 'Stack technologiczny',
				'stack.p':
					'Narzędzia i technologie, z którymi pracuję na co dzień – od frontendu i mobilki po backend, narzędzia i współpracę w zespole.',
				'stack.tabsAria': 'Kategorie technologii',
				'stack.tab.frontend': 'Frontend',
				'stack.tab.backend': 'Backend',
				'stack.tab.tools': 'Narzędzia',
				'stack.tab.collab': 'Współpraca',
				'stack.col.tech': 'Technologia',
				'stack.col.desc': 'Opis',
				'stack.note.html': 'Living Standard – semantyczny markup',
				'stack.note.css': 'style, layout, responsywność',
				'stack.note.ts': 'typowanie w web i React Native',
				'stack.note.react': 'komponentowe UI w przeglądarce',
				'stack.note.rn': 'iOS, Android i web – jedna baza (Expo SDK 54)',
				'stack.note.tailwind': 'szybkie, spójne utility classes',
				'stack.note.navigation': 'nawigacja ekranów w ŁawAppce',
				'stack.note.maps': 'mapa i markery ławek',
				'stack.note.location': 'uprawnienia i GPS / proximity',
				'stack.note.three': 'render 3D postaci na wybranych ekranach',
				'stack.note.i18n': 'tłumaczenia PL / EN',
				'stack.note.supabase': 'Auth, PostgreSQL i API w ŁawAppce',
				'stack.note.sql': 'migracje i zapytania (PostgreSQL)',
				'stack.note.rest': 'integracje REST API',
				'stack.note.rls': 'polityki, triggery i logika po stronie bazy',
				'stack.note.python': 'skrypty i backend',
				'stack.note.fastapi': 'lekkie API w Pythonie',
				'stack.note.docker': 'lokalne środowiska i usługi',
				'stack.note.async': 'lokalne preferencje (np. motyw)',
				'stack.note.node': 'instalacje i skrypty developerskie',
				'stack.note.vite': 'nowoczesny bundler webowy',
				'stack.note.webpack': 'bundling w projektach web',
				'stack.note.metro': 'bundler Expo / React Native',
				'stack.note.devtools': 'debugowanie i performance',
				'stack.note.eas': 'buildy sklepowe (opcjonalnie)',
				'stack.note.tsc': 'statyczna kontrola typów w CI',
				'stack.note.jira': 'zadania i sprinty',
				'stack.note.confluence': 'dokumentacja zespołowa',
				'stack.note.figma': 'design i handoff UI',
				'stack.note.office': 'dokumenty i organizacja pracy',
				'stack.note.gdocs': 'współdzielone notatki i briefy',
				'stack.name.testing': 'Testy',
				'stack.note.testing': 'testy manualne i automatyczne · ISTQB',
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
				'contact.subjectLabel': 'Temat',
				'contact.subjectPh': 'Wpisz temat wiadomości',
				'contact.bodyLabel': 'Treść wiadomości',
				'contact.bodyPh': 'Wpisz treść wiadomości',
				'contact.submit': 'Wyślij wiadomość',
				'form.err.name': 'Imię i nazwisko jest wymagane.',
				'form.err.email': 'Adres email jest wymagany.',
				'form.err.emailInvalid': 'Adres email musi być prawidłowy.',
				'form.err.body': 'Treść wiadomości jest wymagana.',
				'form.msg.supabaseClient':
					'Formularz nie jest skonfigurowany – brak klienta Supabase.',
				'form.msg.supabaseKeys':
					'Formularz nie jest skonfigurowany – uzupełnij SUPABASE_URL i SUPABASE_ANON_KEY.',
				'form.msg.sending': 'Wysyłanie wiadomości...',
				'form.msg.fail': 'Nie udało się wysłać wiadomości.',
				'form.msg.ok': 'Dziękuję za wiadomość!',
				'form.msg.net': 'Błąd połączenia z Supabase.',
			},
			en: {
				'meta.title': 'Mateusz Sygut · Leaf Webs – apps and websites',
				'nav.home': 'Home',
				'nav.about': 'About',
				'nav.stack': 'Stack',
				'nav.projects': 'Projects',
				'nav.contact': 'Contact',
				'nav.langGroup': 'Site language',
				'nav.menuAria': 'Navigation menu',
				'hero.h1': 'Hi, I’m Mateusz',
				'hero.p':
					'I build apps and websites – including <span class="text-accent">Benchy</span>, to make it easier to discover great benches nearby.',
				'about.h2': 'A few words about me',
				'about.p1':
					'I develop mobile apps and websites. I like projects with character – like Benchy, where the goal is to get outside, find a nice bench, and simply sit down.',
				'about.p2':
					'Below you’ll find my tech stack and main project; if you’d like to talk about collaboration or just say hello, there’s a contact form at the bottom of the page.',
				'stack.h2': 'Tech stack',
				'stack.p':
					'Tools and technologies I work with day to day – from frontend and mobile to backend, tooling, and team collaboration.',
				'stack.tabsAria': 'Technology categories',
				'stack.tab.frontend': 'Frontend',
				'stack.tab.backend': 'Backend',
				'stack.tab.tools': 'Tools',
				'stack.tab.collab': 'Collaboration',
				'stack.col.tech': 'Technology',
				'stack.col.desc': 'Description',
				'stack.note.html': 'Living Standard – semantic markup',
				'stack.note.css': 'styling, layout, responsiveness',
				'stack.note.ts': 'typing for web and React Native',
				'stack.note.react': 'component–driven UI in the browser',
				'stack.note.rn': 'iOS, Android & web – one codebase (Expo SDK 54)',
				'stack.note.tailwind': 'fast, consistent utility classes',
				'stack.note.navigation': 'screen stack navigation in Benchy',
				'stack.note.maps': 'map and bench markers',
				'stack.note.location': 'permissions and GPS / proximity',
				'stack.note.three': '3D character rendering on selected screens',
				'stack.note.i18n': 'EN / PL internationalization',
				'stack.note.supabase': 'Auth, PostgreSQL and API in Benchy',
				'stack.note.sql': 'migrations and queries (PostgreSQL)',
				'stack.note.rest': 'REST API integrations',
				'stack.note.rls': 'policies, triggers and DB-side logic',
				'stack.note.python': 'scripts and backend work',
				'stack.note.fastapi': 'lightweight Python APIs',
				'stack.note.docker': 'local environments and services',
				'stack.note.async': 'local preferences (e.g. theme)',
				'stack.note.node': 'installs and developer scripts',
				'stack.note.vite': 'modern web bundler',
				'stack.note.webpack': 'bundling in web projects',
				'stack.note.metro': 'Expo / React Native bundler',
				'stack.note.devtools': 'debugging and performance',
				'stack.note.eas': 'store builds (optional)',
				'stack.note.tsc': 'static type checks in CI',
				'stack.note.jira': 'tasks and sprints',
				'stack.note.confluence': 'team documentation',
				'stack.note.figma': 'UI design and handoff',
				'stack.note.office': 'docs and project organisation',
				'stack.note.gdocs': 'shared notes and briefs',
				'stack.name.testing': 'Testing',
				'stack.note.testing': 'manual & automated testing · ISTQB',
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
				'form.msg.supabaseClient':
					'The form is not configured – Supabase client is missing.',
				'form.msg.supabaseKeys':
					'The form is not configured – set SUPABASE_URL and SUPABASE_ANON_KEY.',
				'form.msg.sending': 'Sending...',
				'form.msg.fail': 'Could not send the message.',
				'form.msg.ok': 'Thanks for your message!',
				'form.msg.net': 'Could not connect to Supabase.',
			},
		};

    const LANG_SWITCHES = [
        { track: 'langSwitch', pl: 'langPl', en: 'langEn' },
        { track: 'langSwitchMobile', pl: 'langPlMobile', en: 'langEnMobile' },
    ];

    const currentLang = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === 'en' || stored === 'pl' ? stored : 'pl';
    };

    const resolveText = (key) => {
        const pack = STRINGS[currentLang()] || STRINGS.pl;
        return pack[key] ?? STRINGS.pl[key] ?? null;
    };

    const leafT = (key) => resolveText(key) ?? key;

    const applyAttr = (selector, attr) => {
        document.querySelectorAll(selector).forEach((el) => {
            const key = el.getAttribute(
                attr === 'text' ? 'data-i18n' : attr === 'html' ? 'data-i18n-html' : attr
            );
            if (!key) return;
            const text = resolveText(key);
            if (text == null) return;
            if (attr === 'text') el.textContent = text;
            else if (attr === 'html') el.innerHTML = text;
            else if (attr === 'data-i18n-placeholder') el.setAttribute('placeholder', text);
            else if (attr === 'data-i18n-aria') el.setAttribute('aria-label', text);
        });
    };

    const applyTexts = () => {
        document.documentElement.setAttribute('lang', currentLang());
        const title = resolveText('meta.title');
        if (title) document.title = title;
        applyAttr('[data-i18n]', 'text');
        applyAttr('[data-i18n-html]', 'html');
        applyAttr('[data-i18n-placeholder]', 'data-i18n-placeholder');
        applyAttr('[data-i18n-aria]', 'data-i18n-aria');
    };

    const updateLangButtons = () => {
        const lang = currentLang();
        for (const { track, pl, en } of LANG_SWITCHES) {
            document.getElementById(track)?.setAttribute('data-lang', lang);
            const plBtn = document.getElementById(pl);
            const enBtn = document.getElementById(en);
            plBtn?.classList.toggle('text-white', lang === 'pl');
            plBtn?.classList.toggle('text-zinc-400', lang !== 'pl');
            enBtn?.classList.toggle('text-white', lang === 'en');
            enBtn?.classList.toggle('text-zinc-400', lang !== 'en');
        }
    };

    const setLang = (lang) => {
        if (lang !== 'pl' && lang !== 'en') return;
        localStorage.setItem(STORAGE_KEY, lang);
        applyTexts();
        updateLangButtons();
    };

    const bindLangSwitch = () => {
        for (const { pl, en } of LANG_SWITCHES) {
            document.getElementById(pl)?.addEventListener('click', () => setLang('pl'));
            document.getElementById(en)?.addEventListener('click', () => setLang('en'));
        }
    };

    window.LEAF_I18N = { leafT, currentLang, setLang, applyTexts };

    applyTexts();
    updateLangButtons();
    document.addEventListener('DOMContentLoaded', bindLangSwitch);
})();
