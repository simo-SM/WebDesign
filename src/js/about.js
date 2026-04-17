(function() {
    document.addEventListener('DOMContentLoaded', function() {
        initScrollAnimations();
        initSkillBars();
        initTimelineAnimations();
    });

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

        document.querySelectorAll('.fade-in-up, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    function initSkillBars() {
        // Triggered by scroll animation when the section becomes visible.
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

    function initTimelineAnimations() {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.5
        });

        document.querySelectorAll('.timeline-item').forEach(item => {
            timelineObserver.observe(item);
        });
    }
})();
