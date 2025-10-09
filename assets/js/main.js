// ========================================================================
// MAIN JAVASCRIPT
// ========================================================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================================================
    // Mobile Navigation Toggle
    // ========================================================================

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ========================================================================
    // Dark Mode (Default)
    // ========================================================================

    // Dark mode is always enabled
    const html = document.documentElement;
    html.setAttribute('data-theme', 'dark');

    // ========================================================================
    // Smooth Scroll for Navigation Links
    // ========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================================================
    // Active Navigation Link Highlighting
    // ========================================================================

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ========================================================================
    // Navbar Background on Scroll
    // ========================================================================

    const navbar = document.querySelector('.navbar');

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = html.getAttribute('data-theme') === 'dark'
                ? 'rgba(15, 23, 42, 0.98)'
                : 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = html.getAttribute('data-theme') === 'dark'
                ? 'rgba(15, 23, 42, 0.95)'
                : 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12)';
        }
    }

    window.addEventListener('scroll', updateNavbar);

    // ========================================================================
    // Fade In Animation on Scroll
    // ========================================================================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    const animatedElements = document.querySelectorAll(
        '.project-card, .publication-card, .skill-category, .education-card, .timeline-item'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ========================================================================
    // Typing Effect for Hero Title (optional enhancement)
    // ========================================================================

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // ========================================================================
    // Add Active Class to Navigation on Page Load
    // ========================================================================

    highlightNavigation();
    updateNavbar();

    // ========================================================================
    // Preloader (optional - for better UX)
    // ========================================================================

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

});

// ========================================================================
// Console Easter Egg
// ========================================================================

console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #2563EB;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #6B7280;');
console.log('%cFeel free to reach out at tbydlon3@gatech.edu', 'font-size: 14px; color: #6B7280;');
console.log('%c🚀 Let\'s build something amazing together!', 'font-size: 14px; color: #10B981;');