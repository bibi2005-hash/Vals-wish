/**
 * Valentine's Day Website - Main Script
 * Enhanced with better performance, error handling, and animations
 */

class ValentineWebsite {
    constructor() {
        this.config = CONFIG;
        this.currentNoClick = 0;
        this.isMusicPlaying = false;
        this.audio = null;
        this.slideshowInterval = null;
        this.currentSlide = 0;
        this.isSlideshowPlaying = true;
        this.isVideoPlaying = false;
        this.isLoading = true;
        
        this.init();
    }

    // Initialize everything
    async init() {
        this.cacheDOM();
        this.setupEventListeners();
        await this.simulateLoading();
        this.setupAnimations();
        this.updateContent();
        this.createSlideshow();
        this.setupHeartsAnimation();
        this.setupVideo();
        
        // Start music if enabled
        if (this.config.music.enabled) {
            this.setupAudio();
        }
        
        // Start slideshow autoplay
        if (this.config.slideshow.autoPlay) {
            this.startSlideshow();
        }
    }

    // Cache DOM elements
    cacheDOM() {
        // Loading
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.progressBar = document.getElementById('progressBar');
        this.loadingPercentage = document.getElementById('loadingPercentage');
        
        // Music
        this.musicPlayer = document.getElementById('musicPlayer');
        this.musicToggle = document.getElementById('musicToggle');
        this.musicStatus = this.musicToggle.querySelector('.music-status');
        this.volumeSlider = document.getElementById('volumeSlider');
        
        // Hero Section
        this.heroTitle = document.getElementById('heroTitle');
        this.heroSubtitle = document.getElementById('heroSubtitle');
        this.yesBtn = document.getElementById('yesBtn');
        this.noBtn = document.getElementById('noBtn');
        this.scrollIndicator = document.getElementById('scrollIndicator');
        
        // Slideshow
        this.slideshowTrack = document.getElementById('slideshowTrack');
        this.slideCounter = document.getElementById('slideCounter');
        this.slideIndicators = document.getElementById('slideIndicators');
        this.prevSlide = document.getElementById('prevSlide');
        this.nextSlide = document.getElementById('nextSlide');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.timerBar = document.getElementById('timerBar');
        
        // Video
        this.videoWrapper = document.getElementById('videoWrapper');
        this.loveVideo = document.getElementById('loveVideo');
        this.playVideoBtn = document.getElementById('playVideoBtn');
        this.videoModal = document.getElementById('videoModal');
        this.fullscreenVideo = document.getElementById('fullscreenVideo');
        this.closeModal = document.getElementById('closeModal');
        this.videoCaption = document.getElementById('videoCaption');
        
        // Message Section
        this.messageSection = document.getElementById('messageSection');
        this.finalMessage = document.getElementById('finalMessage');
        this.loveQuote = document.getElementById('loveQuote');
        this.signatureName = document.getElementById('signatureName');
        this.signatureDate = document.getElementById('signatureDate');
        this.backToTop = document.getElementById('backToTop');
        this.shareBtn = document.getElementById('shareBtn');
        
        // Canvas
        this.heartsCanvas = document.getElementById('heartsCanvas');
        this.confettiCanvas = document.getElementById('confettiCanvas');
    }

    // Setup event listeners
    setupEventListeners() {
        // Hero buttons
        this.yesBtn.addEventListener('click', () => this.handleYesClick());
        this.noBtn.addEventListener('click', () => this.handleNoClick());
        
        // Scroll indicator
        this.scrollIndicator.addEventListener('click', () => this.scrollToMemories());
        
        // Music controls
        this.musicToggle.addEventListener('click', () => this.toggleMusic());
        this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        
        // Slideshow controls
        this.prevSlide.addEventListener('click', () => this.prevSlideClick());
        this.nextSlide.addEventListener('click', () => this.nextSlideClick());
        this.playPauseBtn.addEventListener('click', () => this.toggleSlideshow());
        
        // Video controls
        this.playVideoBtn.addEventListener('click', () => this.playVideo());
        this.loveVideo.addEventListener('click', () => this.playVideo());
        this.closeModal.addEventListener('click', () => this.closeVideoModal());
        
        // Back to top
        this.backToTop.addEventListener('click', () => this.scrollToTop());
        
        // Share button
        this.shareBtn?.addEventListener('click', () => this.shareWebsite());
        
        // Modal close on click outside
        this.videoModal.addEventListener('click', (e) => {
            if (e.target === this.videoModal) this.closeVideoModal();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Simulate loading for better UX
    simulateLoading() {
        return new Promise((resolve) => {
            if (!this.config.loading.simulate) {
                this.hideLoading();
                resolve();
                return;
            }
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    this.hideLoading();
                    resolve();
                }
                this.updateLoadingProgress(progress);
            }, this.config.loading.duration / 10);
        });
    }

    updateLoadingProgress(progress) {
        this.progressBar.style.width = `${progress}%`;
        this.loadingPercentage.textContent = `${Math.round(progress)}%`;
    }

    hideLoading() {
        this.loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            this.loadingOverlay.style.display = 'none';
            this.isLoading = false;
        }, 500);
    }

    // Update content from config
    updateContent() {
        // Hero section
        this.heroTitle.textContent = this.config.hero.title;
        this.heroSubtitle.textContent = this.config.hero.subtitle.replace('{partner}', this.config.names.partnerName);
        
        // Video caption
        this.videoCaption.textContent = this.config.video.captions[0];
        
        // Signature
        this.signatureName.textContent = this.config.names.signature;
        this.signatureDate.textContent = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        
        // Random quote
        this.loveQuote.textContent = this.config.quotes[
            Math.floor(Math.random() * this.config.quotes.length)
        ];
    }

    // Setup audio
    setupAudio() {
        this.audio = new Audio();
        this.audio.src = this.config.music.sources[0].url;
        this.audio.loop = true;
        this.audio.volume = this.config.music.volume;
        this.volumeSlider.value = this.config.music.volume * 100;
        
        // Autoplay with user interaction
        document.body.addEventListener('click', () => {
            if (this.config.music.enabled && !this.isMusicPlaying) {
                this.audio.play().catch(() => {
                    console.log('Autoplay prevented. Click the music button to play.');
                });
            }
        }, { once: true });
    }

    toggleMusic() {
        if (!this.audio) return;
        
        if (this.isMusicPlaying) {
            this.audio.pause();
            this.musicStatus.textContent = 'Play Music';
            this.musicToggle.querySelector('i').className = 'fas fa-music';
        } else {
            this.audio.play().catch(e => {
                console.log('Audio play failed:', e);
                this.musicStatus.textContent = 'Click to Play';
            });
            this.musicStatus.textContent = 'Pause Music';
            this.musicToggle.querySelector('i').className = 'fas fa-pause';
        }
        this.isMusicPlaying = !this.isMusicPlaying;
    }

    setVolume(value) {
        if (this.audio) {
            this.audio.volume = value / 100;
        }
    }

    // Handle button clicks
    handleYesClick() {
        this.finalMessage.textContent = this.config.hero.yesMessage;
        this.messageSection.style.display = 'block';
        this.messageSection.scrollIntoView({ behavior: 'smooth' });
        this.createConfetti();
        
        // Play celebration sound if available
        if (this.audio) {
            this.audio.volume = 0.7;
        }
    }

    handleNoClick() {
        const messages = this.config.hero.noMessages;
        
        if (this.currentNoClick < messages.length) {
            this.noBtn.textContent = messages[this.currentNoClick];
            
            // Make button smaller and move it
            const currentSize = 200 - (this.currentNoClick * 10);
            this.noBtn.style.fontSize = `${1 - (this.currentNoClick * 0.05)}rem`;
            this.noBtn.style.transform = `translateX(${Math.random() * 100 - 50}px) translateY(${Math.random() * 100 - 50}px)`;
            
            // Reset position after animation
            setTimeout(() => {
                this.noBtn.style.transform = '';
            }, 300);
            
            this.currentNoClick++;
        } else {
            this.noBtn.textContent = "Okay, maybe next time";
            this.noBtn.disabled = true;
            this.noBtn.style.opacity = '0.5';
        }
    }

    // Slideshow functions
    createSlideshow() {
        this.slideshowTrack.innerHTML = '';
        this.slideIndicators.innerHTML = '';
        
        this.config.memories.forEach((memory, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.style.backgroundImage = `url(${memory.image})`;
            slide.innerHTML = `
                <div class="slide-content">
                    <h3>${memory.title}</h3>
                    <p class="slide-date">${memory.date}</p>
                    <p class="slide-description">${memory.description}</p>
                </div>
            `;
            this.slideshowTrack.appendChild(slide);
            
            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.slideIndicators.appendChild(indicator);
        });
        
        this.updateSlideCounter();
    }

    startSlideshow() {
        if (this.slideshowInterval) clearInterval(this.slideshowInterval);
        
        this.slideshowInterval = setInterval(() => {
            if (this.isSlideshowPlaying) {
                this.nextSlideClick();
            }
        }, this.config.slideshow.interval);
        
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    stopSlideshow() {
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
            this.slideshowInterval = null;
        }
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    toggleSlideshow() {
        this.isSlideshowPlaying = !this.isSlideshowPlaying;
        if (this.isSlideshowPlaying) {
            this.startSlideshow();
        } else {
            this.stopSlideshow();
        }
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.slideshowTrack.style.transform = `translateX(-${index * 100}%)`;
        this.updateSlideCounter();
        this.resetTimer();
        
        // Update active indicator
        document.querySelectorAll('.indicator').forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
    }

    prevSlideClick() {
        this.currentSlide = (this.currentSlide - 1 + this.config.memories.length) % this.config.memories.length;
        this.goToSlide(this.currentSlide);
    }

    nextSlideClick() {
        this.currentSlide = (this.currentSlide + 1) % this.config.memories.length;
        this.goToSlide(this.currentSlide);
    }

    updateSlideCounter() {
        this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.config.memories.length}`;
    }

    resetTimer() {
        this.timerBar.style.width = '0%';
        setTimeout(() => {
            this.timerBar.style.width = '100%';
        }, 10);
    }

    // Video functions
    setupVideo() {
        const videoSource = this.config.video.sources[0];
        this.loveVideo.src = videoSource.url;
        this.fullscreenVideo.src = videoSource.url;
    }

    playVideo() {
        this.videoModal.style.display = 'flex';
        this.fullscreenVideo.play();
        this.isVideoPlaying = true;
    }

    closeVideoModal() {
        this.videoModal.style.display = 'none';
        this.fullscreenVideo.pause();
        this.isVideoPlaying = false;
    }

    // Animation setups
    setupHeartsAnimation() {
        const ctx = this.heartsCanvas.getContext('2d');
        this.heartsCanvas.width = window.innerWidth;
        this.heartsCanvas.height = window.innerHeight;
        
        const hearts = [];
        const heartCount = this.config.animations.hearts.count;
        
        for (let i = 0; i < heartCount; i++) {
            hearts.push({
                x: Math.random() * this.heartsCanvas.width,
                y: Math.random() * this.heartsCanvas.height,
                size: Math.random() * 10 + 10,
                speed: Math.random() * 1 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                color: this.config.animations.confetti.colors[
                    Math.floor(Math.random() * this.config.animations.confetti.colors.length)
                ]
            });
        }
        
        const drawHeart = (x, y, size, color, opacity) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.beginPath();
            const topCurveHeight = size * 0.3;
            ctx.moveTo(x, y + topCurveHeight);
            // Left top curve
            ctx.bezierCurveTo(
                x, y,
                x - size, y,
                x - size, y + topCurveHeight
            );
            // Left bottom curve
            ctx.bezierCurveTo(
                x - size, y + (size + topCurveHeight) / 2,
                x, y + (size + topCurveHeight),
                x, y + size
            );
            // Right bottom curve
            ctx.bezierCurveTo(
                x, y + (size + topCurveHeight),
                x + size, y + (size + topCurveHeight) / 2,
                x + size, y + topCurveHeight
            );
            // Right top curve
            ctx.bezierCurveTo(
                x + size, y,
                x, y,
                x, y + topCurveHeight
            );
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };
        
        const animate = () => {
            ctx.clearRect(0, 0, this.heartsCanvas.width, this.heartsCanvas.height);
            
            hearts.forEach(heart => {
                heart.y -= heart.speed;
                if (heart.y < -20) {
                    heart.y = this.heartsCanvas.height + 20;
                    heart.x = Math.random() * this.heartsCanvas.width;
                }
                
                drawHeart(heart.x, heart.y, heart.size, heart.color, heart.opacity);
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.heartsCanvas.width = window.innerWidth;
            this.heartsCanvas.height = window.innerHeight;
        });
    }

    createConfetti() {
        const ctx = this.confettiCanvas.getContext('2d');
        this.confettiCanvas.width = this.messageSection.offsetWidth;
        this.confettiCanvas.height = this.messageSection.offsetHeight;
        
        const confetti = [];
        const confettiCount = this.config.animations.confetti.count;
        
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                x: Math.random() * this.confettiCanvas.width,
                y: Math.random() * this.confettiCanvas.height - this.confettiCanvas.height,
                r: Math.random() * 10 + 5,
                d: Math.random() * confettiCount + 1,
                color: this.config.animations.confetti.colors[
                    Math.floor(Math.random() * this.config.animations.confetti.colors.length)
                ],
                tilt: Math.random() * 10 - 10,
                tiltAngleIncrement: Math.random() * 0.07 + 0.05,
                tiltAngle: 0
            });
        }
        
        const drawConfetti = () => {
            ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
            
            confetti.forEach(c => {
                ctx.beginPath();
                ctx.lineWidth = c.r / 2;
                ctx.strokeStyle = c.color;
                ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
                ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
                ctx.stroke();
                
                c.tiltAngle += c.tiltAngleIncrement;
                c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
                c.x += Math.sin(c.d);
                c.tilt = Math.sin(c.tiltAngle) * 15;
                
                if (c.y > this.confettiCanvas.height) {
                    c.x = Math.random() * this.confettiCanvas.width;
                    c.y = -20;
                }
            });
            
            requestAnimationFrame(drawConfetti);
        };
        
        drawConfetti();
    }

    // Utility functions
    scrollToMemories() {
        document.getElementById('memories').scrollIntoView({ behavior: 'smooth' });
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.messageSection.style.display = 'none';
        this.currentNoClick = 0;
        this.noBtn.textContent = '<i class="fas fa-heart-broken"></i> Maybe Later';
        this.noBtn.disabled = false;
        this.noBtn.style.opacity = '1';
        this.noBtn.style.fontSize = '1rem';
    }

    async shareWebsite() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Valentine ❤️',
                    text: this.config.sharing.message,
                    url: this.config.sharing.url
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(this.config.sharing.url).then(() => {
                alert('Link copied to clipboard! ❤️');
            });
        }
    }

    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
                this.prevSlideClick();
                break;
            case 'ArrowRight':
                this.nextSlideClick();
                break;
            case ' ':
                e.preventDefault();
                this.toggleSlideshow();
                break;
            case 'Escape':
                this.closeVideoModal();
                break;
        }
    }

    setupAnimations() {
        // Add floating hearts to page
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createFloatingHeart();
            }, i * 300);
        }
    }

    createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.color = this.config.animations.confetti.colors[
            Math.floor(Math.random() * this.config.animations.confetti.colors.length)
        ];
        heart.style.animation = `float ${Math.random() * 3 + 2}s infinite ease-in-out`;
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure all resources are ready
    setTimeout(() => {
        window.valentineWebsite = new ValentineWebsite();
    }, 100);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValentineWebsite;
}