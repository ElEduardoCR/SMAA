document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Each project can be inspected at rest, with buttons, keyboard or touch.
    document.querySelectorAll('.service-gallery').forEach(gallery => {
        const track = gallery.querySelector('.gallery-track');
        const images = Array.from(track.querySelectorAll('img'));
        const controls = gallery.querySelector('.gallery-controls');
        const previous = controls.querySelector('.gallery-prev');
        const next = controls.querySelector('.gallery-next');
        const count = controls.querySelector('.gallery-count');
        let current = 0;
        let pendingFrame = 0;

        function update() {
            pendingFrame = 0;
            current = Math.min(images.length - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth)));
            count.textContent = `${current + 1} / ${images.length}`;
            previous.disabled = current === 0;
            next.disabled = current === images.length - 1;
        }
        function goTo(index, instant = false) {
            const target = Math.min(images.length - 1, Math.max(0, index));
            track.scrollTo({ left: target * track.clientWidth, behavior: instant || reduceMotion ? 'instant' : 'smooth' });
        }
        previous.addEventListener('click', () => goTo(current - 1));
        next.addEventListener('click', () => goTo(current + 1));
        track.addEventListener('scroll', () => {
            if (!pendingFrame) pendingFrame = requestAnimationFrame(update);
        }, { passive: true });
        track.addEventListener('keydown', event => {
            const destinations = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: images.length - 1 };
            if (event.key in destinations) {
                event.preventDefault();
                goTo(destinations[event.key]);
            }
        });
        new ResizeObserver(() => goTo(current, true)).observe(track);
        controls.hidden = false;
        update();
    });

    // Dynamic Partner Logic
    const partnerLogos = [
        "partner_logos/isicsa.png",
        "partner_logos/sms.png",
        "partner_logos/voxa.png"
    ];
    let currentPartnerIndex = 0;
    const partnerImgElement = document.getElementById('partner-logo-target');

    if (partnerImgElement && partnerLogos.length > 0 && !reduceMotion) {
        setInterval(() => {
            // Fade out
            partnerImgElement.classList.remove('active');

            setTimeout(() => {
                // Change source
                currentPartnerIndex = (currentPartnerIndex + 1) % partnerLogos.length;
                partnerImgElement.src = partnerLogos[currentPartnerIndex];

                // Fade back in once loaded
                partnerImgElement.onload = () => {
                    partnerImgElement.classList.add('active');
                };
            }, 500); // Wait for fade out transition (0.5s)
        }, 3500);
    }
    
    // Scroll Animations Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0 && !reduceMotion) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // scrollObserver.unobserve(entry.target); // Animates every time or unobserve if one-off
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    } else {
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // Floating Navigation Indicator Logic
    const navItems = document.querySelectorAll('.nav-item');
    const navIndicator = document.getElementById('nav-indicator');
    const pageSections = document.querySelectorAll('section[id], footer[id]');

    function updateIndicator(activeItem) {
        if (!activeItem || !navIndicator) return;
        navIndicator.style.width = `${activeItem.offsetWidth}px`;
        navIndicator.style.left = `${activeItem.offsetLeft}px`;
    }

    // Set initial active indicator
    const initialActive = document.querySelector('.nav-item.active');
    if (initialActive) {
        setTimeout(() => updateIndicator(initialActive), 100);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) updateIndicator(activeItem);
    });

    // Scroll Spy Behavior
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        pageSections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSectionId}`) {
                    item.classList.add('active');
                    updateIndicator(item);
                }
            });
        }
    }, { passive: true });

});
