document.addEventListener('DOMContentLoaded', function() {
    const image = document.querySelector('.blog-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    // Check if there's a stored scroll position
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition));
    }

    // Save scroll position before page refresh
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('scrollPosition', window.pageYOffset);
    });

    // Open lightbox
    image.addEventListener('click', function() {
        lightbox.style.display = 'flex';
        lightboxImg.src = this.src;
        // Update URL with image state
        history.pushState({lightboxOpen: true}, '', '#image');
    });

    // Close lightbox
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        history.pushState({lightboxOpen: false}, '', window.location.pathname);
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            history.pushState({lightboxOpen: false}, '', window.location.pathname);
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.lightboxOpen) {
            lightbox.style.display = 'flex';
        } else {
            lightbox.style.display = 'none';
        }
    });

    // Check if URL has #image hash on load
    if (window.location.hash === '#image') {
        lightbox.style.display = 'flex';
        lightboxImg.src = image.src;
    }

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            history.pushState({lightboxOpen: false}, '', window.location.pathname);
        }
    });
});
