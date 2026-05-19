document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.book-page-slide');
    const prevBtn = document.getElementById('book-prev');
    const nextBtn = document.getElementById('book-next');
    const dots = document.querySelectorAll('.book-dot');
    let current = 0;

    function showPage(index) {
        if (index < 0 || index >= slides.length) return;
        current = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === current);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
            dot.setAttribute('aria-current', i === current ? 'true' : 'false');
        });

        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current === slides.length - 1;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => showPage(current - 1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => showPage(current + 1));
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showPage(i));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') showPage(current - 1);
        if (e.key === 'ArrowRight') showPage(current + 1);
    });

    let touchStartX = 0;
    const wrapper = document.querySelector('.book-wrapper');
    if (wrapper) {
        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        wrapper.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) < 50) return;
            if (diff > 0) showPage(current - 1);
            else showPage(current + 1);
        }, { passive: true });
    }

    showPage(0);
});
