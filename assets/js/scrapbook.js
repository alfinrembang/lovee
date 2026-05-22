/**
 * Interactive 3D Scrapbook — page-flip with CSS 3D transforms
 */
(function () {
    const TOTAL_PAGES = 5;

    function initScrapbook() {
        const modal = document.getElementById('scrapbook-modal');
        const openBtn = document.getElementById('scrapbook-open-btn');
        const closeBtn = document.getElementById('scrapbook-close');
        const prevBtn = document.getElementById('scrapbook-prev');
        const nextBtn = document.getElementById('scrapbook-next');
        const indicator = document.getElementById('scrapbook-page-num');
        const book = document.getElementById('scrapbook-book');

        if (!modal || !book) return;

        const sheets = Array.from(book.querySelectorAll('.scrapbook-sheet'));
        let currentIndex = 0;
        let isAnimating = false;

        function updateUI() {
            if (indicator) {
                indicator.textContent = `${currentIndex + 1} / ${TOTAL_PAGES}`;
            }
            if (prevBtn) prevBtn.disabled = currentIndex === 0 || isAnimating;
            if (nextBtn) nextBtn.disabled = currentIndex >= TOTAL_PAGES - 1 || isAnimating;
        }

        function applySheetStates() {
            sheets.forEach((sheet, i) => {
                sheet.classList.remove('is-current', 'is-turned');
                if (i < currentIndex) {
                    sheet.classList.add('is-turned');
                } else if (i === currentIndex) {
                    sheet.classList.add('is-current');
                }
            });
            updateUI();
        }

        function goToPage(index) {
            if (isAnimating || index < 0 || index >= TOTAL_PAGES || index === currentIndex) return;
            isAnimating = true;
            currentIndex = index;
            applySheetStates();
            setTimeout(() => {
                isAnimating = false;
                updateUI();
            }, 850);
        }

        function nextPage() {
            if (currentIndex < TOTAL_PAGES - 1) goToPage(currentIndex + 1);
        }

        function prevPage() {
            if (currentIndex > 0) goToPage(currentIndex - 1);
        }

        function openModal() {
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('scrapbook-modal-open');
            currentIndex = 0;
            sheets.forEach((s) => s.classList.remove('is-turned', 'is-current'));
            if (sheets[0]) sheets[0].classList.add('is-current');
            updateUI();
        }

        function closeModal() {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('scrapbook-modal-open');
        }

        if (openBtn) openBtn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (prevBtn) prevBtn.addEventListener('click', prevPage);
        if (nextBtn) nextBtn.addEventListener('click', nextPage);

        modal.querySelector('.scrapbook-modal-backdrop')?.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('is-open')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextPage();
            if (e.key === 'ArrowLeft') prevPage();
        });

        let touchX = 0;
        book.addEventListener('touchstart', (e) => {
            touchX = e.changedTouches[0].screenX;
        }, { passive: true });

        book.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].screenX - touchX;
            if (Math.abs(diff) < 50) return;
            if (diff < 0) nextPage();
            else prevPage();
        }, { passive: true });

        applySheetStates();
    }

    window.initScrapbook = initScrapbook;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrapbook);
    } else {
        initScrapbook();
    }
})();
