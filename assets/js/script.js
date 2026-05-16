// Music Playlist Data
const songs = {
    'perfect': 'https://p.scdn.co/mp3-preview/a02f928e4695c02970a256a489725f75e9b81b23',
    'thousand-years': 'https://p.scdn.co/mp3-preview/3809623253b2160655c687e83463870634676168',
    'all-of-me': 'https://p.scdn.co/mp3-preview/26e382d61998f498c8e235e14316ec503d27a14e'
};

let currentPlaying = null;
let currentBtn = null;

// Music Player Function
function playMusic(songKey, btn) {
    const audio = document.getElementById('main-audio');
    
    // If clicking the same button while playing
    if (currentPlaying === songKey) {
        if (audio.paused) {
            audio.play();
            btn.innerHTML = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg><span>Pause Song</span>';
        } else {
            audio.pause();
            btn.innerHTML = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg><span>Play Song</span>';
        }
        return;
    }

    // If changing to another song
    if (currentBtn) {
        currentBtn.innerHTML = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg><span>Play Song</span>';
    }

    audio.src = songs[songKey];
    audio.play();
    btn.innerHTML = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg><span>Pause Song</span>';
    
    currentPlaying = songKey;
    currentBtn = btn;

    audio.onended = () => {
        btn.innerHTML = '<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg><span>Play Song</span>';
        currentPlaying = null;
    };
}

// Particle Explosion Function
function createExplosion(x, y) {
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'fixed z-[101] pointer-events-none text-2xl';
        particle.textContent = '❤️';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 15 + 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let opacity = 1;
        let posX = x;
        let posY = y;
        
        const anim = setInterval(() => {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            particle.style.transform = `translate(${posX - x}px, ${posY - y}px) scale(${opacity})`;
            particle.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(anim);
                particle.remove();
            }
        }, 16);
    }
}

// Falling Hearts for Overlay
function createFallingHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'absolute text-pink-300 pointer-events-none animate-float opacity-50';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-50px';
    heart.style.fontSize = Math.random() * 15 + 15 + 'px';
    heart.textContent = '❤️';
    container.appendChild(heart);

    let top = -50;
    const speed = Math.random() * 2 + 1;
    const fall = setInterval(() => {
        top += speed;
        heart.style.top = top + 'px';
        if (top > window.innerHeight) {
            clearInterval(fall);
            heart.remove();
        }
    }, 16);
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
        let count = 5;
        const fallingInterval = setInterval(() => createFallingHeart(overlay), 200);

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                countText.textContent = count;
            } else if (count === 0) {
                countText.textContent = "❤️";
                countText.classList.add('scale-[3]', 'transition-transform', 'duration-500');
            } else {
                clearInterval(timer);
                clearInterval(fallingInterval);
                
                const rect = countText.getBoundingClientRect();
                createExplosion(rect.left + rect.width/2, rect.top + rect.height/2);
                
                countText.style.display = 'none';
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                    document.body.classList.add('start-animations');
                    startAllTyping();
                }, 1000);
            }
        }, 1000);
    }

    // Stars Effect
    if (starsBg) {
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            const isTwinkle = Math.random() > 0.7;
            star.className = `absolute bg-white rounded-full ${isTwinkle ? 'animate-twinkle' : ''}`;
            const size = Math.random() * 2.5;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.opacity = Math.random() * 0.7 + 0.3;
            star.style.animationDelay = Math.random() * 5 + 's';
            starsBg.appendChild(star);
        }
    }
});
