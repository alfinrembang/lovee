// Music Playlist Data (Pointing to your local files)
// Masukkan file lagu Anda ke folder assets/music/ dengan nama yang sesuai di bawah ini
const songs = {
    'sempurna': 'assets/music/sempurna.mp3',
    'somebodys-pleasure': 'assets/music/somebodys-pleasure.mp3',
    'terpukau': 'assets/music/terpukau.mp3'
};

let audioPlayer = new Audio();
let currentPlaying = null;
let currentBtn = null;

function playMusic(songKey, btn) {
    // If clicking the same song
    if (currentPlaying === songKey) {
        if (audioPlayer.paused) {
            audioPlayer.play().catch(e => {
                alert("File lagu tidak ditemukan! Pastikan Anda sudah menaruh file '" + songs[songKey] + "' di folder project.");
                console.error("Playback failed:", e);
            });
            btn.innerHTML = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg><span>Pause Song</span>';
        } else {
            audioPlayer.pause();
            btn.innerHTML = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg><span>Play Song</span>';
        }
        return;
    }

    // Changing song
    if (currentBtn) {
        currentBtn.innerHTML = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg><span>Play Song</span>';
    }

    audioPlayer.pause();
    audioPlayer.src = songs[songKey];
    audioPlayer.load();
    
    audioPlayer.play().then(() => {
        btn.innerHTML = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg><span>Pause Song</span>';
        currentPlaying = songKey;
        currentBtn = btn;
    }).catch(err => {
        alert("File lagu '" + songs[songKey] + "' belum ada atau tidak terbaca. Harap masukkan file MP3 ke folder tersebut.");
        console.error("Audio Play Error:", err);
    });

    audioPlayer.onended = () => {
        btn.innerHTML = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg><span>Play Song</span>';
        currentPlaying = null;
    };
}

// Particle Explosion Function (single rAF loop — lighter on mobile)
function createExplosion(x, y) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const particles = [];
    for (let i = 0; i < 24; i++) {
        const particle = document.createElement('div');
        particle.className = 'fixed z-[101] pointer-events-none text-2xl';
        particle.textContent = '❤️';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 15 + 5;
        particles.push({
            el: particle,
            originX: x,
            originY: y,
            posX: x,
            posY: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            opacity: 1
        });
    }

    const tick = () => {
        let alive = false;
        for (const p of particles) {
            if (p.opacity <= 0) continue;
            alive = true;
            p.posX += p.vx;
            p.posY += p.vy;
            p.opacity -= 0.02;
            p.el.style.transform = `translate(${p.posX - p.originX}px, ${p.posY - p.originY}px) scale(${p.opacity})`;
            p.el.style.opacity = String(p.opacity);
            if (p.opacity <= 0) p.el.remove();
        }
        if (alive) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

function initStars(starsBg) {
    if (!starsBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 70 : 100;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const isTwinkle = Math.random() > 0.6;
        const colorRand = Math.random();
        let color = '#ffffff';
        let shadowColor = 'rgba(255, 255, 255, 0.5)';
        if (colorRand > 0.85) {
            color = '#bae6fd';
            shadowColor = 'rgba(56, 189, 248, 0.8)';
        } else if (colorRand > 0.7) {
            color = '#a5f3fc';
            shadowColor = 'rgba(34, 211, 238, 0.8)';
        }

        star.className = `absolute rounded-full star-dot${isTwinkle ? ' animate-twinkle' : ''}`;
        const size = Math.random() * 3.2 + 0.8;
        star.style.backgroundColor = color;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = String(Math.random() * 0.8 + 0.2);
        star.style.animationDelay = Math.random() * 5 + 's';
        if (!isMobile) {
            star.style.boxShadow = `0 0 ${size * 1.5}px ${shadowColor}`;
        }
        fragment.appendChild(star);
    }

    starsBg.innerHTML = '';
    starsBg.appendChild(fragment);
}

function setupLazySections() {
    const sections = document.querySelectorAll('.lazy-section');
    if (!sections.length) return;

    if (!('IntersectionObserver' in window)) {
        sections.forEach((section) => section.classList.remove('animations-paused'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const section = entry.target;
            if (entry.isIntersecting) {
                section.classList.remove('animations-paused');
            } else {
                section.classList.add('animations-paused');
            }
        });
    }, { rootMargin: '120px 0px 200px 0px', threshold: 0 });

    sections.forEach((section) => {
        section.classList.add('animations-paused');
        observer.observe(section);
    });

    // One frame after layout: unpause sections already on screen (e.g. short viewport)
    requestAnimationFrame(() => {
        sections.forEach((section) => {
            const r = section.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            if (r.top < vh + 200 && r.bottom > -200) {
                section.classList.remove('animations-paused');
            }
        });
    });
}

// Typewriter Logic
function typeWriter(text, elementId, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    if (!element) return;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function startAllTyping() {
    typeWriter("Website Kenangan", "typewriter-h1", 100, () => {
        typeWriter("Untuk Kamu dan Dia.", "typewriter-h2", 80, () => {
            typeWriter("Tempat menyimpan cerita, foto, dan lagu favorit kalian berdua. Semua momen spesial tersimpan di sini.", "typewriter-p", 40, () => {
                const btn = document.getElementById('typewriter-btn');
                if (btn) {
                    btn.style.opacity = '1';
                    btn.style.transition = 'opacity 1s ease-in';
                }
            });
        });
    });
}

// Initialize Website Logic
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('countdown-overlay');
    const countText = document.getElementById('countdown-text');
    const starsBg = document.getElementById('stars-bg');

    if (overlay && countText) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('skip') === '1' || sessionStorage.getItem('skipCountdown') === '1') {
            overlay.style.display = 'none';
            document.body.classList.add('start-animations');
            
            // Set text directly instead of typewriting to skip the delay
            const h1 = document.getElementById('typewriter-h1');
            const h2 = document.getElementById('typewriter-h2');
            const p = document.getElementById('typewriter-p');
            const btn = document.getElementById('typewriter-btn');
            
            if (h1) h1.innerHTML = "Website Kenangan";
            if (h2) h2.innerHTML = "Untuk Kamu dan Dia.";
            if (p) p.innerHTML = "Tempat menyimpan cerita, foto, dan lagu favorit kalian berdua. Semua momen spesial tersimpan di sini.";
            if (btn) btn.style.opacity = '1';

            if (starsBg) {
                const runStars = () => initStars(starsBg);
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(runStars, { timeout: 1500 });
                } else {
                    setTimeout(runStars, 50);
                }
            }
        } else {
            sessionStorage.setItem('skipCountdown', '1');
            let count = 3;

            const timer = setInterval(() => {
                count--;
                if (count > 0) {
                    countText.textContent = count;
                } else if (count === 0) {
                    countText.textContent = "❤️";
                    countText.classList.add('scale-[3]', 'transition-transform', 'duration-500');
                } else {
                    clearInterval(timer);
                    
                    const rect = countText.getBoundingClientRect();
                    createExplosion(rect.left + rect.width/2, rect.top + rect.height/2);
                    
                    countText.style.display = 'none';
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        document.body.classList.add('start-animations');
                        startAllTyping();
                        if (starsBg) {
                            const runStars = () => initStars(starsBg);
                            if ('requestIdleCallback' in window) {
                                requestIdleCallback(runStars, { timeout: 1500 });
                            } else {
                                setTimeout(runStars, 50);
                            }
                        }
                    }, 1000);
                }
            }, 1000);
        }
    }

    setupLazySections();
});
