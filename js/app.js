document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenuMobile = document.getElementById('navMenuMobile');

    if (navToggle && navMenuMobile) {
        navToggle.addEventListener('click', () => {
            navMenuMobile.classList.toggle('hidden');
        });
        navMenuMobile.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navMenuMobile.classList.add('hidden');
            });
        });
    }

    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const sections = document.querySelectorAll('header[id], section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navOffset = 120;

    const highlightActiveSection = () => {
        const scrollPosition = window.scrollY;
        let currentSection = null;
        for (const section of sections) {
            if (section.offsetTop <= scrollPosition + navOffset) {
                currentSection = section.getAttribute('id');
            }
        }
        if (!currentSection && sections.length > 0) {
            currentSection = sections[0].getAttribute('id');
        }
        navLinks.forEach((link) => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${currentSection}`) link.classList.add('active');
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href.length <= 1 || !href.startsWith('#')) return;

            const targetElement = document.getElementById(href.slice(1));
            if (!targetElement) return;

            e.preventDefault();
            e.stopPropagation();
            this.blur();

            const navbarHeight = 64;
            const offsetPosition =
                targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            const start = window.pageYOffset;
            const distance = offsetPosition - start;
            const duration = 800;
            let startTime = null;

            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, start, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    if (history.pushState) history.pushState(null, null, href);
                    highlightActiveSection();
                }
            };
            requestAnimationFrame(animation);
        });
    });

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();

    const heroParallax = document.getElementById('heroParallax');
    if (heroParallax) {
        const movePx = 18;
        const tiltDeg = 3;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let rafId = null;

        const updateTransform = () => {
            currentX += (targetX - currentX) * 0.14;
            currentY += (targetY - currentY) * 0.14;
            const tx = currentX * movePx;
            const ty = currentY * movePx;
            const rx = -currentY * tiltDeg;
            const ry = currentX * tiltDeg;
            heroParallax.style.transform =
                `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
            const idle =
                Math.abs(targetX - currentX) < 0.002 &&
                Math.abs(targetY - currentY) < 0.002 &&
                Math.abs(targetX) < 0.02 &&
                Math.abs(targetY) < 0.02;
            rafId = idle ? null : requestAnimationFrame(updateTransform);
        };

        document.addEventListener('mousemove', (e) => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            targetX = (e.clientX - w / 2) / (w / 2);
            targetY = (e.clientY - h / 2) / (h / 2);
            if (rafId === null) rafId = requestAnimationFrame(updateTransform);
        });

        document.body.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        });
    }

    const tablist = document.querySelector('.tech-tabs');
    if (tablist) {
        const tabs = [...tablist.querySelectorAll('[data-tech-tab]')];
        const panels = document.querySelectorAll('[data-tech-panel]');

        const activateTab = (id) => {
            tabs.forEach((tab) => {
                const selected = tab.getAttribute('data-tech-tab') === id;
                tab.setAttribute('aria-selected', selected ? 'true' : 'false');
                tab.tabIndex = selected ? 0 : -1;
            });
            panels.forEach((panel) => {
                if (panel.getAttribute('data-tech-panel') === id) panel.removeAttribute('hidden');
                else panel.setAttribute('hidden', '');
            });
        };

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                activateTab(tab.getAttribute('data-tech-tab'));
            });
            tab.addEventListener('keydown', (e) => {
                const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
                if (!keys.includes(e.key)) return;
                e.preventDefault();
                const index = tabs.indexOf(tab);
                let next = index;
                if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
                if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
                if (e.key === 'Home') next = 0;
                if (e.key === 'End') next = tabs.length - 1;
                tabs[next].focus();
                activateTab(tabs[next].getAttribute('data-tech-tab'));
            });
        });

        activateTab('frontend');
    }
});

const escapeHtmlContact = (text) => {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

document.addEventListener('DOMContentLoaded', () => {
    const leafT = (key) => {
        if (window.LEAF_I18N && typeof window.LEAF_I18N.leafT === 'function') {
            return window.LEAF_I18N.leafT(key);
        }
        return key;
    };

    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    if (form && formMessage) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const temat = document.getElementById('temat').value.trim();
            const message = document.getElementById('tresc').value.trim();

            const errors = [];
            if (name === '') errors.push(leafT('form.err.name'));
            if (email === '') errors.push(leafT('form.err.email'));
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push(leafT('form.err.emailInvalid'));
            if (message === '') errors.push(leafT('form.err.body'));

            if (errors.length > 0) {
                formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-danger';
                formMessage.innerHTML = `<ul class="list-disc list-inside space-y-1">${errors
                    .map((err) => `<li>${escapeHtmlContact(err)}</li>`)
                    .join('')}</ul>`;
                return;
            }

            if (typeof window.supabase === 'undefined') {
                formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-danger';
                formMessage.textContent = leafT('form.msg.supabaseClient');
                return;
            }

            const SUPABASE_URL = window.SUPABASE_URL || '';
            const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || '';

            if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
                formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-danger';
                formMessage.textContent = leafT('form.msg.supabaseKeys');
                return;
            }

            if (!window._supabaseClient) {
                window._supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            }

            if (submitBtn) submitBtn.disabled = true;
            formMessage.className = 'rounded-xl px-4 py-3 text-sm text-zinc-300';
            formMessage.textContent = leafT('form.msg.sending');

            try {
                const { error } = await window._supabaseClient.from('contact_messages').insert({
                    name,
                    email,
                    subject: temat,
                    message,
                });

                if (error) {
                    formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-danger';
                    formMessage.textContent = leafT('form.msg.fail');
                } else {
                    formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-success';
                    formMessage.textContent = leafT('form.msg.ok');
                    form.reset();
                    const counter = document.getElementById('charCount');
                    if (counter) counter.textContent = '0/500';
                }
            } catch {
                formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-danger';
                formMessage.textContent = leafT('form.msg.net');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const checkScroll = () => {
        const sections = document.querySelectorAll('section');
        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const elementBottom = elementTop + rect.height;

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                section.classList.add('section-visible');
            }
        });
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll);

    const tresc = document.getElementById('tresc');
    const charCount = document.getElementById('charCount');
    if (tresc && charCount) {
        tresc.addEventListener('keyup', () => {
            const length = tresc.value.length;
            charCount.textContent = `${length}/500`;
            charCount.classList.toggle('over-limit', length > 500);
        });
    }
});
