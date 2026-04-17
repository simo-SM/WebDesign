(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const isHomePage = document.getElementById('typed-text') !== null;

        initMobileMenu();
        initNavigation();

        if (isHomePage) {
            initTypewriter();
            initScrollAnimations();
            initSkillBars();
            initToolCards();
            initHomeProjectCards();
        }

        preloadImages();

        console.log('Design Portfolio initialized successfully');
    });

    function initTypewriter() {
        const typedElement = document.getElementById('typed-text');
        if (!typedElement || typeof Typed === 'undefined') {
            return;
        }

        new Typed('#typed-text', {
            strings: [
                'Designer',
                'Visual Storyteller',
                'Digital Artist',
                'UX/UI Expert',
                'Brand Creator'
            ],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    if (entry.target.querySelector('.skill-progress')) {
                        animateSkillBars();
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });
    }

    function initSkillBars() {
        // Triggered when the observed section enters the viewport.
    }

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 200);
        });
    }

    function initToolCards() {
        const toolCards = document.querySelectorAll('.tool-card');

        toolCards.forEach(card => {
            card.addEventListener('click', function() {
                const tool = this.getAttribute('data-tool');
                handleToolSelection(tool, this);
            });

            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    scale: 1.05,
                    rotateY: 5,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    scale: 1,
                    rotateY: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    function handleToolSelection(tool, element) {
        document.querySelectorAll('.tool-card').forEach(card => {
            card.classList.remove('active');
        });

        element.classList.add('active');

        const statusText = document.getElementById('status');
        if (statusText) {
            statusText.textContent = `Filtering projects created with ${tool}...`;
        }

        const loadingProgress = document.querySelector('.loading-progress');
        if (loadingProgress) {
            anime({
                targets: loadingProgress,
                width: '100%',
                duration: 1000,
                easing: 'easeInOutQuad',
                complete: function() {
                    setTimeout(() => {
                        filterProjectsByTool(tool);
                        anime({
                            targets: loadingProgress,
                            width: '0%',
                            duration: 500
                        });
                    }, 500);
                }
            });
        }
    }

    function filterProjectsByTool(tool) {
        showNotification(`Showing projects created with ${tool}`, 'success');

        setTimeout(() => {
            const statusText = document.getElementById('status');
            if (statusText) {
                statusText.textContent = 'Loading languages from Adobe Creative Suite...';
            }
        }, 2000);
    }

    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                showNotification('Mobile menu opened', 'info');
            });
        }
    }

    function initNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === currentPage);
        });
    }

    function initHomeProjectCards() {
        if (document.getElementById('projects-grid')) {
            return;
        }

        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                const titleElement = this.querySelector('h3');
                const projectTitle = titleElement ? titleElement.textContent : 'Project';
                showProjectModal(projectTitle);
            });

            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    translateY: -12,
                    scale: 1.02,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });

            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    translateY: 0,
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    function showProjectModal(projectTitle) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-gray-900 rounded-lg max-w-2xl w-full p-8 relative">
                <button class="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl" onclick="this.parentElement.parentElement.remove()">
                    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
                <h3 class="text-2xl font-bold mb-4">${projectTitle}</h3>
                <p class="text-gray-300 mb-6">This is a demo modal for the project "${projectTitle}". In a real implementation, this would show detailed project information, images, and case study content.</p>
                <div class="flex gap-4">
                    <button class="bg-coral-500 hover:bg-coral-600 text-white px-6 py-2 rounded transition-colors">
                        View Full Case Study
                    </button>
                    <button class="border border-gray-600 hover:border-gray-400 text-gray-300 px-6 py-2 rounded transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Close
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });

        anime({
            targets: modal.querySelector('div'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 400,
            delay: 100,
            easing: 'easeOutBack'
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    function showNotification(message, type) {
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = 'notification fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-lg max-w-sm';

        switch (type) {
            case 'success':
                notification.className += ' bg-green-600 text-white';
                break;
            case 'error':
                notification.className += ' bg-red-600 text-white';
                break;
            case 'warning':
                notification.className += ' bg-yellow-600 text-white';
                break;
            default:
                notification.className += ' bg-blue-600 text-white';
        }

        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutQuad'
        });

        setTimeout(() => {
            if (notification.parentElement) {
                anime({
                    targets: notification,
                    translateX: 300,
                    opacity: 0,
                    duration: 300,
                    easing: 'easeInQuad',
                    complete: () => notification.remove()
                });
            }
        }, 5000);
    }

    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) {
            return;
        }

        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    const throttledScrollHandler = throttle(function() {
        const heroSection = document.querySelector('.hero-bg');
        if (!heroSection) {
            return;
        }

        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }, 16);

    window.addEventListener('scroll', throttledScrollHandler);

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                }, limit);
            }
        };
    }

    function preloadImages() {
        [
            'resources/hero-design.jpg',
            'resources/project-web.jpg',
            'resources/project-branding.jpg',
            'resources/project-mobile.jpg'
        ].forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    console.log('%cDesign Portfolio Website', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
    console.log('%cCrafted with passion and precision', 'color: #6c7b7f; font-size: 12px;');
    console.log('%cBuilt with: HTML5, CSS3, JavaScript, Tailwind CSS, Anime.js', 'color: #7c9885; font-size: 10px;');
})();
