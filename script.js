document.addEventListener("DOMContentLoaded", () => {
    // 1. Progress Bar Animation with Intersection Observer
    const progressFill = document.querySelector('.progress-bar-fill');

    if (progressFill) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target.getAttribute('data-target');
                    entry.target.style.width = target + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(progressFill);
    }

    // 3. Dynamic Partner Logic
    const partnerLogos = [
        "partner_logos/isicsa.jpeg",
        "partner_logos/sms.jpeg",
        "partner_logos/voxa.png"
    ];
    let currentPartnerIndex = 0;
    const partnerImgElement = document.getElementById('partner-logo-target');

    if (partnerImgElement && partnerLogos.length > 0) {
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
        }, 2000); // 2 seconds between changes
    }
    
    // 4. Scroll Animations Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
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
    });

});
