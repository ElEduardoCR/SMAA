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

    // 2. Dynamic Gallery from GitHub API
    // Repository details for the images
    const repoOwner = 'ElEduardoCR';
    const repoName = 'SMAA';
    const folderPath = 'images'; // Folder where images will be uploaded
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

    const galleryGrid = document.getElementById('gallery-grid');
    const galleryLoader = document.getElementById('gallery-loader');

    async function loadGalleryImages() {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                // If folder doesn't exist yet or rate limit
                throw new Error('La carpeta "images" en GitHub aún no existe o no tiene imágenes públicas. <br>Por favor sube imágenes a: <strong>github.com/ElEduardoCR/SMAA/tree/main/images</strong>');
            }

            const files = await response.json();
            // Filter only image files
            const imageFiles = files.filter(file => 
                file.type === 'file' && 
                file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)
            );

            galleryLoader.style.display = 'none';
            galleryGrid.innerHTML = '';

            if (imageFiles.length === 0) {
                galleryGrid.innerHTML = '<p style="grid-column: 1/-1; color: #6c757d; font-size: 1.1rem; padding: 2rem;">No hay imágenes válidas en la carpeta de GitHub aún.</p>';
            } else {
                imageFiles.forEach(file => {
                    const div = document.createElement('div');
                    div.className = 'gallery-item';
                    
                    const img = document.createElement('img');
                    img.src = file.download_url; // Direct link to raw image
                    img.alt = file.name;
                    img.loading = 'lazy';
                    
                    div.appendChild(img);
                    galleryGrid.appendChild(div);
                });
            }

            // Small delay to ensure styles apply before fading in
            setTimeout(() => {
                galleryGrid.classList.add('visible');
            }, 100);

        } catch (error) {
            galleryLoader.style.display = 'none';
            galleryGrid.innerHTML = `<p style="grid-column: 1/-1; color: var(--mex-red); font-size: 1.1rem; padding: 2rem;">${error.message}</p>`;
            galleryGrid.classList.add('visible');
        }
    }

    loadGalleryImages();
});
