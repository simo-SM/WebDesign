(function() {
    document.addEventListener('DOMContentLoaded', function() {
        initScrollAnimations();
        initContactForm();
        initFileUpload();
        initFaq();
        initNotificationButtons();
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
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });
    }

    function initContactForm() {
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');

        if (!form || !submitBtn) {
            return;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm()) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                setTimeout(() => {
                    showFormSuccess();
                    form.reset();
                    clearFileList();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }, 2000);
            }
        });
    }

    function validateForm() {
        let isValid = true;

        const name = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (!name.value.trim()) {
            showFieldError(name, nameError);
            isValid = false;
        } else {
            hideFieldError(name, nameError);
        }

        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            showFieldError(email, emailError);
            isValid = false;
        } else {
            hideFieldError(email, emailError);
        }

        const projectType = document.getElementById('project-type');
        const projectTypeError = document.getElementById('project-type-error');
        if (!projectType.value) {
            showFieldError(projectType, projectTypeError);
            isValid = false;
        } else {
            hideFieldError(projectType, projectTypeError);
        }

        const message = document.getElementById('message');
        const messageError = document.getElementById('message-error');
        if (!message.value.trim()) {
            showFieldError(message, messageError);
            isValid = false;
        } else {
            hideFieldError(message, messageError);
        }

        return isValid;
    }

    function showFieldError(field, errorElement) {
        field.style.borderColor = '#ef4444';
        errorElement.classList.add('visible');
    }

    function hideFieldError(field, errorElement) {
        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        errorElement.classList.remove('visible');
    }

    function showFormSuccess() {
        const successMsg = document.getElementById('form-success');
        successMsg.classList.add('visible');

        setTimeout(() => {
            successMsg.classList.remove('visible');
        }, 5000);
    }

    function initFileUpload() {
        const fileUpload = document.getElementById('file-upload');
        const fileInput = document.getElementById('project-files');

        if (!fileUpload || !fileInput) {
            return;
        }

        fileUpload.addEventListener('dragover', function(e) {
            e.preventDefault();
            fileUpload.classList.add('dragover');
        });

        fileUpload.addEventListener('dragleave', function(e) {
            e.preventDefault();
            fileUpload.classList.remove('dragover');
        });

        fileUpload.addEventListener('drop', function(e) {
            e.preventDefault();
            fileUpload.classList.remove('dragover');
            handleFiles(Array.from(e.dataTransfer.files));
        });

        fileInput.addEventListener('change', function() {
            handleFiles(Array.from(this.files));
        });
    }

    function handleFiles(files) {
        const fileList = document.getElementById('file-list');
        const maxFiles = 5;
        const maxSize = 10 * 1024 * 1024;

        if (files.length > maxFiles) {
            showNotification(`Maximum ${maxFiles} files allowed`, 'error');
            return;
        }

        files.forEach(file => {
            if (file.size > maxSize) {
                showNotification(`File ${file.name} is too large. Maximum size is 10MB.`, 'error');
                return;
            }

            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between bg-gray-800 p-3 rounded-lg';
            fileItem.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-file-lines w-5 h-5 text-coral-400" aria-hidden="true"></i>
                    <span class="text-sm">${file.name}</span>
                    <span class="text-xs text-gray-400">(${(file.size / 1024 / 1024).toFixed(2)}MB)</span>
                </div>
                <button type="button" class="text-red-400 hover:text-red-300" onclick="this.parentElement.remove()">
                    <i class="fa-solid fa-xmark w-4 h-4" aria-hidden="true"></i>
                </button>
            `;
            fileList.appendChild(fileItem);
        });
    }

    function clearFileList() {
        document.getElementById('file-list').innerHTML = '';
    }

    function initFaq() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');

                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    function initNotificationButtons() {
        document.querySelectorAll('.js-notification-btn').forEach(button => {
            button.addEventListener('click', function() {
                showNotification(
                    this.getAttribute('data-message') || 'Notification',
                    this.getAttribute('data-type') || 'info'
                );
            });
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
})();
