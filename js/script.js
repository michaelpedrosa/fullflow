// Initialize Lucide Icons
lucide.createIcons();

// Scroll Animations and Interactions
document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Observer for fade-up elements
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
        if (el.style.animationDelay) {
            el.style.transitionDelay = el.style.animationDelay;
        }
        observer.observe(el);
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 0';
        }
    });

    // 3. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Language Switcher Logic
    const btnFR = document.getElementById('lang-fr');
    const btnEN = document.getElementById('lang-en');
    
    if (btnFR && btnEN) {
        const switchLang = (lang) => {
            // Update the body class to toggle display of elements
            document.documentElement.classList.remove('lang-en-active', 'lang-fr-active');
            document.documentElement.classList.add(`lang-${lang}-active`);
            document.documentElement.lang = lang;
            
            // Toggle active state on buttons
            if (lang === 'fr') {
                btnFR.classList.add('active');
                btnEN.classList.remove('active');
            } else {
                btnEN.classList.add('active');
                btnFR.classList.remove('active');
            }
            
            // Save preference to localStorage
            localStorage.setItem('fullflow_lang', lang);
        };

        // Initialize based on saved preference or default to 'en'
        const savedLang = localStorage.getItem('fullflow_lang') || 'en';
        switchLang(savedLang);

        // Bind events
        btnFR.addEventListener('click', (e) => {
            e.preventDefault();
            switchLang('fr');
        });
        
        btnEN.addEventListener('click', (e) => {
            e.preventDefault();
            switchLang('en');
        });
    }

    // 5. Text Reveal on Scroll System
    const revealElements = document.querySelectorAll('.reveal-text');
    const updateReveal = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const startReveal = windowHeight * 0.85;
            const endReveal = windowHeight * 0.4;
            
            if (rect.top > startReveal) {
                el.style.backgroundPosition = '100% 0';
            } else if (rect.top < endReveal) {
                el.style.backgroundPosition = '0% 0';
            } else {
                const progress = (startReveal - rect.top) / (startReveal - endReveal);
                el.style.backgroundPosition = `${100 - (progress * 100)}% 0`;
            }
        });
    };
    window.addEventListener('scroll', updateReveal);
    updateReveal();

    // 6. Vanta.js Topology Background
    if (typeof VANTA !== 'undefined') {
        VANTA.TOPOLOGY({
            el: "#vanta-bg",
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 14247723,
            backgroundColor: 6949
        });
    }
});
