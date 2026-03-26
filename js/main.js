document.addEventListener('DOMContentLoaded', function () {
    var navToggle = document.getElementById('navToggle');
    var navMenuMobile = document.getElementById('navMenuMobile');

    if (navToggle && navMenuMobile) {
        navToggle.addEventListener('click', function () {
            navMenuMobile.classList.toggle('hidden');
        });
        navMenuMobile.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenuMobile.classList.add('hidden');
            });
        });
    }

    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href && href !== '#' && href.length > 1 && href.indexOf('#') === 0) {
                var targetId = href.substring(1);
                var targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.blur();
                    var navbarHeight = 64;
                    var elementPosition = targetElement.getBoundingClientRect().top;
                    var offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    var start = window.pageYOffset;
                    var distance = offsetPosition - start;
                    var duration = 800;
                    var startTime = null;
                    function animation(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        var timeElapsed = currentTime - startTime;
                        var run = easeInOutQuad(timeElapsed, start, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                        else {
                            if (history.pushState) history.pushState(null, null, href);
                            highlightActiveSection();
                        }
                    }
                    function easeInOutQuad(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    }
                    requestAnimationFrame(animation);
                }
            }
        });
    });

    var sections = document.querySelectorAll('header[id], section[id]');
    var navLinks = document.querySelectorAll('.nav-link');
    var navOffset = 120;

    function highlightActiveSection() {
        var scrollPosition = window.scrollY;
        var currentSection = null;
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop <= scrollPosition + navOffset) {
                currentSection = sections[i].getAttribute('id');
            }
        }
        if (!currentSection && sections.length > 0) {
            currentSection = sections[0].getAttribute('id');
        }
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            var linkHref = link.getAttribute('href');
            if (linkHref && linkHref === '#' + currentSection) link.classList.add('active');
        });
    }
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();

    var heroParallax = document.getElementById('heroParallax');
    if (heroParallax) {
        var movePx = 18;
        var tiltDeg = 3;
        var currentX = 0;
        var currentY = 0;
        var targetX = 0;
        var targetY = 0;
        var rafId = null;

        function updateTransform() {
            currentX += (targetX - currentX) * 0.14;
            currentY += (targetY - currentY) * 0.14;
            var tx = currentX * movePx;
            var ty = currentY * movePx;
            var rx = -currentY * tiltDeg;
            var ry = currentX * tiltDeg;
            heroParallax.style.transform = 'translate3d(' + tx + 'px, ' + ty + 'px, 0) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
            var idle = Math.abs(targetX - currentX) < 0.002 && Math.abs(targetY - currentY) < 0.002 && Math.abs(targetX) < 0.02 && Math.abs(targetY) < 0.02;
            if (!idle) rafId = requestAnimationFrame(updateTransform);
            else rafId = null;
        }

        document.addEventListener('mousemove', function (e) {
            var w = window.innerWidth;
            var h = window.innerHeight;
            targetX = (e.clientX - w / 2) / (w / 2);
            targetY = (e.clientY - h / 2) / (h / 2);
            if (rafId === null) rafId = requestAnimationFrame(updateTransform);
        });

        document.body.addEventListener('mouseleave', function () {
            targetX = 0;
            targetY = 0;
        });
    }
});

function escapeHtmlContact(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    var formMessage = document.getElementById('formMessage');
    var submitBtn = form ? form.querySelector('button[type="submit"]') : null;
    if (form && formMessage) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var temat = document.getElementById('temat').value.trim();
            var message = document.getElementById('tresc').value.trim();
            
            var errors = [];
            if (name === '') errors.push('Imię i nazwisko jest wymagane.');
            if (email === '') errors.push('Adres email jest wymagany.');
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Adres email musi być prawidłowy.');
            if (message === '') errors.push('Treść wiadomości jest wymagana.');
            
            if (errors.length > 0) {
                formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-danger';
                formMessage.innerHTML = '<ul class="list-disc list-inside space-y-1">' + errors.map(function (e) { return '<li>' + escapeHtmlContact(e) + '</li>'; }).join('') + '</ul>';
                return;
            }

            if (typeof window.supabase === 'undefined') {
                formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-danger';
                formMessage.textContent = 'Formularz nie jest skonfigurowany – brak klienta Supabase.';
                return;
            }

            var SUPABASE_URL = window.SUPABASE_URL || '';
            var SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || '';

            if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
                formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-danger';
                formMessage.textContent = 'Formularz nie jest skonfigurowany – uzupełnij SUPABASE_URL i SUPABASE_ANON_KEY.';
                return;
            }

            if (!window._supabaseClient) {
                window._supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            }

            if (submitBtn) submitBtn.disabled = true;
            formMessage.className = 'rounded-xl px-4 py-3 text-sm text-zinc-300';
            formMessage.textContent = 'Wysyłanie wiadomości...';

            window._supabaseClient
                .from('contact_messages')
                .insert({
                    name: name,
                    email: email,
                    subject: temat,
                    message: message
                })
                .then(function (result) {
                    if (result.error) {
                        formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-danger';
                        formMessage.textContent = 'Nie udało się wysłać wiadomości.';
                    } else {
                        formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-success';
                        formMessage.textContent = 'Dziękuję za wiadomość!';
                        form.reset();
                        var counter = document.getElementById('charCount');
                        if (counter) counter.textContent = '0/500';
                    }
                })
                .catch(function () {
                    formMessage.className = 'rounded-xl px-4 py-3 text-sm alert-danger';
                    formMessage.textContent = 'Błąd połączenia z Supabase.';
                })
                .finally(function () {
                    if (submitBtn) submitBtn.disabled = false;
                });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    function checkScroll() {
        var sections = document.querySelectorAll('section');
        var viewportTop = window.scrollY;
        var viewportBottom = viewportTop + window.innerHeight;

        sections.forEach(function (section) {
            var rect = section.getBoundingClientRect();
            var elementTop = rect.top + window.scrollY;
            var elementBottom = elementTop + rect.height;

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                section.classList.add('section-visible');
            }
        });
    }

    checkScroll();
    window.addEventListener('scroll', checkScroll);

    var tresc = document.getElementById('tresc');
    var charCount = document.getElementById('charCount');
    if (tresc && charCount) {
        tresc.addEventListener('keyup', function () {
            var length = tresc.value.length;
            charCount.textContent = length + '/500';
            if (length > 500) {
                charCount.classList.add('over-limit');
            } else {
                charCount.classList.remove('over-limit');
            }
        });
    }
});
