const leafT = (key) =>
    window.LEAF_I18N?.leafT?.(key) ?? key;

const escapeHtml = (text) => {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

const setFormMessage = (el, type, content, asHtml = false) => {
    el.className = `rounded-xl px-4 py-3 text-sm ${type}`;
    if (asHtml) el.innerHTML = content;
    else el.textContent = content;
};

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenuMobile = document.getElementById('navMenuMobile');
    if (navToggle && navMenuMobile) {
        navToggle.addEventListener('click', () => navMenuMobile.classList.toggle('hidden'));
        navMenuMobile.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => navMenuMobile.classList.add('hidden'));
        });
    }

    const sections = document.querySelectorAll('header[id], section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navOffset = 120;

    const highlightActiveSection = () => {
        const y = window.scrollY;
        let current = sections[0]?.id ?? null;
        for (const section of sections) {
            if (section.offsetTop <= y + navOffset) current = section.id;
        }
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };

    const revealSections = () => {
        const top = window.scrollY;
        const bottom = top + window.innerHeight;
        document.querySelectorAll('section').forEach((section) => {
            const rect = section.getBoundingClientRect();
            const elTop = rect.top + window.scrollY;
            if (elTop + rect.height > top && elTop < bottom) {
                section.classList.add('section-visible');
            }
        });
    };

    let scrollRaf = null;
    const onScroll = () => {
        if (scrollRaf != null) return;
        scrollRaf = requestAnimationFrame(() => {
            scrollRaf = null;
            highlightActiveSection();
            revealSections();
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || !href.startsWith('#') || href.length < 2) return;
            const target = document.getElementById(href.slice(1));
            if (!target) return;
            e.preventDefault();
            link.blur();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState?.(null, '', href);
            highlightActiveSection();
        });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    highlightActiveSection();
    revealSections();

    const heroParallax = document.getElementById('heroParallax');
    if (heroParallax && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
            heroParallax.style.transform =
                `translate3d(${currentX * movePx}px, ${currentY * movePx}px, 0) ` +
                `rotateX(${-currentY * tiltDeg}deg) rotateY(${currentX * tiltDeg}deg)`;
            const idle =
                Math.abs(targetX - currentX) < 0.002 &&
                Math.abs(targetY - currentY) < 0.002 &&
                Math.abs(targetX) < 0.02 &&
                Math.abs(targetY) < 0.02;
            rafId = idle ? null : requestAnimationFrame(updateTransform);
        };

        document.addEventListener('mousemove', (e) => {
            targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
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
                tab.setAttribute('aria-selected', String(selected));
                tab.tabIndex = selected ? 0 : -1;
            });
            panels.forEach((panel) => {
                panel.toggleAttribute('hidden', panel.getAttribute('data-tech-panel') !== id);
            });
        };

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => activateTab(tab.getAttribute('data-tech-tab')));
            tab.addEventListener('keydown', (e) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
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

    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form?.querySelector('button[type="submit"]') ?? null;
    const tresc = document.getElementById('tresc');
    const charCount = document.getElementById('charCount');

    if (tresc && charCount) {
        tresc.addEventListener('input', () => {
            const length = tresc.value.length;
            charCount.textContent = `${length}/500`;
            charCount.classList.toggle('over-limit', length > 500);
        });
    }

    if (form && formMessage) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const temat = document.getElementById('temat').value.trim();
            const message = document.getElementById('tresc').value.trim();

            const errors = [];
            if (!name) errors.push(leafT('form.err.name'));
            if (!email) errors.push(leafT('form.err.email'));
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push(leafT('form.err.emailInvalid'));
            if (!message) errors.push(leafT('form.err.body'));

            if (errors.length) {
                setFormMessage(
                    formMessage,
                    'alert-danger',
                    `<ul class="list-disc list-inside space-y-1">${errors
                        .map((err) => `<li>${escapeHtml(err)}</li>`)
                        .join('')}</ul>`,
                    true
                );
                return;
            }

            if (typeof window.supabase === 'undefined') {
                setFormMessage(formMessage, 'alert-danger', leafT('form.msg.supabaseClient'));
                return;
            }

            const url = window.SUPABASE_URL || '';
            const key = window.SUPABASE_ANON_KEY || '';
            if (!url || !key) {
                setFormMessage(formMessage, 'alert-danger', leafT('form.msg.supabaseKeys'));
                return;
            }

            window._supabaseClient ??= window.supabase.createClient(url, key);

            if (submitBtn) submitBtn.disabled = true;
            setFormMessage(formMessage, 'text-zinc-300', leafT('form.msg.sending'));

            try {
                const { error } = await window._supabaseClient.from('contact_messages').insert({
                    name,
                    email,
                    subject: temat,
                    message,
                });
                if (error) {
                    setFormMessage(formMessage, 'alert-danger', leafT('form.msg.fail'));
                } else {
                    setFormMessage(formMessage, 'alert-success', leafT('form.msg.ok'));
                    form.reset();
                    if (charCount) {
                        charCount.textContent = '0/500';
                        charCount.classList.remove('over-limit');
                    }
                }
            } catch {
                setFormMessage(formMessage, 'alert-danger', leafT('form.msg.net'));
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }
});
