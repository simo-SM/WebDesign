(function() {
    document.addEventListener('DOMContentLoaded', function() {
        initProjectFilters();
        initProjectSearch();
        initScrollAnimations();
        initProjectCards();
    });

    function initProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');
                filterProjects(filter, projectCards);
            });
        });
    }

    function filterProjects(filter, projectCards) {
        let visibleCount = 0;

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;

            card.classList.toggle('hidden', !shouldShow);
            if (shouldShow) {
                visibleCount++;
            }
        });

        const noResults = document.getElementById('no-results');
        noResults.classList.toggle('hidden', visibleCount !== 0);
    }

    function initProjectSearch() {
        const searchInput = document.getElementById('project-search');
        const projectCards = document.querySelectorAll('.project-card');

        if (!searchInput) {
            return;
        }

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            projectCards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);

                card.classList.toggle('hidden', !matchesSearch);
            });

            const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
            const noResults = document.getElementById('no-results');
            noResults.classList.toggle('hidden', visibleCards.length !== 0);
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
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });
    }

    function initProjectCards() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.getAttribute('data-title');
                showProjectModal(title);
            });
        });
    }

    function showProjectModal(projectTitle) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-gray-900 rounded-lg max-w-4xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
                <button class="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl" onclick="this.parentElement.parentElement.remove()">
                    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
                <h3 class="text-3xl font-bold mb-6">${projectTitle}</h3>
                <div class="mb-6">
                    <img src="resources/project-web.jpg" alt="${projectTitle}" class="w-full h-64 object-cover rounded-lg mb-4">
                    <p class="text-gray-300 mb-6">This is a detailed case study for "${projectTitle}". In a real implementation, this would include comprehensive project information, design process, challenges, solutions, and results.</p>

                    <div class="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 class="text-lg font-semibold mb-2 text-coral-400">Project Details</h4>
                            <ul class="text-gray-400 space-y-1">
                                <li><strong>Client:</strong> Confidential</li>
                                <li><strong>Duration:</strong> 3 months</li>
                                <li><strong>Team:</strong> Solo project</li>
                                <li><strong>Tools:</strong> Adobe XD, Photoshop, Illustrator</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-2 text-coral-400">Results</h4>
                            <ul class="text-gray-400 space-y-1">
                                <li>â€¢ 40% increase in user engagement</li>
                                <li>â€¢ 25% improvement in conversion rates</li>
                                <li>â€¢ 90% client satisfaction score</li>
                                <li>â€¢ Featured in design awards</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button class="bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded transition-colors">
                        View Live Project
                    </button>
                    <button class="border border-gray-600 hover:border-gray-400 text-gray-300 px-6 py-3 rounded transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">
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
})();
