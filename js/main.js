// =============================================
// MAIN.JS - JavaScript Global do Site
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Main.js carregado!');

    // ===== MENU HAMBURGUER =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // ===== HEADER SCROLL =====
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== DROPDOWNS =====
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu && window.innerWidth > 768) {
                menu.style.display = 'block';
                setTimeout(() => {
                    menu.style.opacity = '1';
                    menu.style.transform = 'translateY(0)';
                }, 10);
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu && window.innerWidth > 768) {
                menu.style.opacity = '0';
                menu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 300);
            }
        });
        
        const link = dropdown.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        const isOpen = menu.style.display === 'block';
                        document.querySelectorAll('.dropdown-menu').forEach(m => {
                            m.style.display = 'none';
                            m.style.opacity = '0';
                            m.style.transform = 'translateY(-10px)';
                        });
                        if (!isOpen) {
                            menu.style.display = 'block';
                            setTimeout(() => {
                                menu.style.opacity = '1';
                                menu.style.transform = 'translateY(0)';
                            }, 10);
                        }
                    }
                }
            });
        }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        });
    });

    // ===== FECHAR DROPDOWNS AO CLICAR FORA =====
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
                menu.style.opacity = '0';
                menu.style.transform = 'translateY(-10px)';
            });
        }
    });

    // ===== BOTÃO VOLTAR AO TOPO =====
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('show', window.scrollY > 500);
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== BARRA DE PROGRESSO =====
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = (scrollTop / docHeight * 100) + '%';
        });
    }

    // ==========================================
    // DARK MODE
    // ==========================================
    const darkModeToggle = document.getElementById('darkModeToggle');

    function applyDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            if (darkModeToggle) {
                darkModeToggle.textContent = '☀️';
                darkModeToggle.setAttribute('aria-label', 'Modo claro');
            }
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            if (darkModeToggle) {
                darkModeToggle.textContent = '🌙';
                darkModeToggle.setAttribute('aria-label', 'Modo escuro');
            }
            localStorage.setItem('darkMode', 'false');
        }
    }

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === null) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyDarkMode(prefersDark);
    } else {
        applyDarkMode(savedDarkMode === 'true');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isCurrentlyDark = document.body.classList.contains('dark-mode');
            applyDarkMode(!isCurrentlyDark);
        });
    }

    // ==========================================
    // VÍDEO NA SECÇÃO SOBRE - FUNCIONAL
    // ==========================================
    
    const video = document.getElementById('sobreVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoContainer = document.getElementById('videoContainer');
    const videoControls = document.getElementById('videoControls');
    const videoTogglePlay = document.getElementById('videoTogglePlay');
    const videoProgress = document.getElementById('videoProgress');
    const videoTime = document.getElementById('videoTime');
    const videoVolumeBtn = document.getElementById('videoVolumeBtn');
    const videoFullscreenBtn = document.getElementById('videoFullscreenBtn');

    if (video && videoPlayBtn) {

        videoPlayBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleVideo();
        });

        videoContainer.addEventListener('click', function(e) {
            if (e.target.closest('.video-controls') || e.target.closest('.video-control-btn')) return;
            toggleVideo();
        });

        function toggleVideo() {
            if (video.paused) {
                video.play();
                videoOverlay.classList.add('hidden');
                videoControls.classList.add('show');
                if (videoTogglePlay) videoTogglePlay.textContent = '⏸';
            } else {
                video.pause();
                videoOverlay.classList.remove('hidden');
                videoControls.classList.remove('show');
                if (videoTogglePlay) videoTogglePlay.textContent = '▶';
            }
        }

        if (videoTogglePlay) {
            videoTogglePlay.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleVideo();
            });
        }

        video.addEventListener('timeupdate', function() {
            const progress = (video.currentTime / video.duration) * 100;
            if (videoProgress) videoProgress.value = progress;
            
            if (videoTime) {
                const current = formatTime(video.currentTime);
                const total = formatTime(video.duration);
                videoTime.textContent = current + ' / ' + total;
            }
        });

        if (videoProgress) {
            videoProgress.addEventListener('input', function() {
                const time = (this.value / 100) * video.duration;
                video.currentTime = time;
            });
        }

        if (videoVolumeBtn) {
            let isMuted = false;
            videoVolumeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                isMuted = !isMuted;
                video.muted = isMuted;
                this.textContent = isMuted ? '🔇' : '🔊';
            });
        }

        if (videoFullscreenBtn) {
            videoFullscreenBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.webkitRequestFullscreen) {
                    videoContainer.webkitRequestFullscreen();
                }
            });
        }

        function formatTime(seconds) {
            if (!seconds || isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return mins + ':' + (secs < 10 ? '0' : '') + secs;
        }

        videoContainer.addEventListener('mouseenter', function() {
            if (!video.paused) {
                videoControls.classList.add('show');
            }
        });

        videoContainer.addEventListener('mouseleave', function() {
            if (!video.paused) {
                setTimeout(() => {
                    videoControls.classList.remove('show');
                }, 2000);
            }
        });

        video.addEventListener('ended', function() {
            videoOverlay.classList.remove('hidden');
            videoControls.classList.remove('show');
            if (videoTogglePlay) videoTogglePlay.textContent = '▶';
        });

        document.addEventListener('visibilitychange', function() {
            if (document.hidden && !video.paused) {
                video.pause();
                videoOverlay.classList.remove('hidden');
                videoControls.classList.remove('show');
                if (videoTogglePlay) videoTogglePlay.textContent = '▶';
            }
        });

        console.log('✅ Vídeo funcional carregado!');
    }

    // ==========================================
    // CARROSSEL DO HERO
    // ==========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const heroPrevBtn = document.getElementById('heroPrev');
    const heroNextBtn = document.getElementById('heroNext');
    let currentHeroSlide = 0;
    let heroInterval;

    if (heroSlides.length > 0) {
        function goToHeroSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            heroDots.forEach(dot => dot.classList.remove('active'));
            
            if (index < 0) index = heroSlides.length - 1;
            if (index >= heroSlides.length) index = 0;
            
            heroSlides[index].classList.add('active');
            heroDots[index].classList.add('active');
            currentHeroSlide = index;
        }

        function nextHeroSlide() {
            goToHeroSlide(currentHeroSlide + 1);
        }

        function prevHeroSlide() {
            goToHeroSlide(currentHeroSlide - 1);
        }

        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', function() {
                clearInterval(heroInterval);
                prevHeroSlide();
                startHeroAutoPlay();
            });
        }

        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', function() {
                clearInterval(heroInterval);
                nextHeroSlide();
                startHeroAutoPlay();
            });
        }

        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(heroInterval);
                goToHeroSlide(index);
                startHeroAutoPlay();
            });
        });

        function startHeroAutoPlay() {
            clearInterval(heroInterval);
            heroInterval = setInterval(nextHeroSlide, 5000);
        }

        const heroCarousel = document.querySelector('.hero-carousel');
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', function() {
                clearInterval(heroInterval);
            });
            heroCarousel.addEventListener('mouseleave', function() {
                startHeroAutoPlay();
            });
        }

        startHeroAutoPlay();
        console.log('✅ Hero Carousel carregado!');
    }

    // ==========================================
    // SLIDESHOW DA PÁGINA (8 SLIDES)
    // ==========================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (slides.length > 0) {
        console.log(`📊 Slideshow: ${totalSlides} slides encontrados`);

        function goToSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            document.querySelectorAll('.slide-dot').forEach(dot => dot.classList.remove('active'));
            
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            slides[index].classList.add('active');
            document.querySelectorAll('.slide-dot')[index]?.classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        const dotsContainer = document.querySelector('.slide-dots');
        if (dotsContainer && dotsContainer.children.length === 0) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'slide-dot' + (index === 0 ? ' active' : '');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
            console.log(`✅ ${totalSlides} dots criados (fallback)`);
        }

        const nextBtn = document.querySelector('.slide-btn.next');
        const prevBtn = document.querySelector('.slide-btn.prev');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                resetSlideInterval();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                resetSlideInterval();
            });
        }

        let slideInterval = setInterval(nextSlide, 5000);

        function resetSlideInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            slideshowContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
            
            slideshowContainer.addEventListener('touchstart', () => {
                clearInterval(slideInterval);
            });
            slideshowContainer.addEventListener('touchend', () => {
                setTimeout(() => {
                    slideInterval = setInterval(nextSlide, 5000);
                }, 3000);
            });
        }

        document.addEventListener('keydown', function(e) {
            const rect = slideshowContainer?.getBoundingClientRect();
            const isVisible = rect && rect.top < window.innerHeight && rect.bottom > 0;
            
            if (!isVisible) return;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                resetSlideInterval();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                resetSlideInterval();
            }
        });

        console.log(`✅ Slideshow inicializado com ${totalSlides} slides!`);
    }

    // ===== FECHAR MODALS COM ESC =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.auth-modal.open, .chat-widget.open').forEach(el => {
                el.classList.remove('open');
            });
            document.body.style.overflow = '';
        }
    });

    console.log('✅ Main.js - Todos os módulos carregados!');
});