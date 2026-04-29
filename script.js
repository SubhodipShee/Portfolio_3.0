document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksList = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .btn-outline[href^="#"], .home-icon');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinksList.classList.contains('active')) {
                    navLinksList.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll Reveal Animation (Simple version)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Add CSS for reveal
    const style = document.createElement('style');
    style.textContent = `
        section.reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
