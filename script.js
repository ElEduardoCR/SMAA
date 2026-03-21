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
});
