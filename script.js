// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // Initialize all interactive features
    initLanguageSwitcher();
    initCharts();
    initQRCode();
    initScrollAnimations();
    initSmoothScroll();
    initNavHighlight();
    initCounterAnimation();

    // Language Switcher
    function initLanguageSwitcher() {
        // Get saved language or default to German
        let currentLang = localStorage.getItem('language') || 'de';

        // Apply saved language
        applyLanguage(currentLang);

        // Setup flag click handlers
        const deFlagButton = document.getElementById('lang-de');
        const enFlagButton = document.getElementById('lang-en');

        if (deFlagButton) {
            deFlagButton.addEventListener('click', () => switchLanguage('de'));
        }

        if (enFlagButton) {
            enFlagButton.addEventListener('click', () => switchLanguage('en'));
        }

        function switchLanguage(lang) {
            currentLang = lang;
            localStorage.setItem('language', lang);
            applyLanguage(lang);

            // Update charts with new language
            updateCharts(lang);
        }

        function applyLanguage(lang) {
            // Update active flag styling
            document.querySelectorAll('.lang-flag').forEach(flag => {
                flag.classList.remove('active');
            });

            const activeFlag = document.getElementById(`lang-${lang}`);
            if (activeFlag) {
                activeFlag.classList.add('active');
            }

            // Update all translatable elements
            document.querySelectorAll('[data-de][data-en]').forEach(element => {
                const translation = element.getAttribute(`data-${lang}`);
                if (translation) {
                    // Check if it's a placeholder attribute
                    if (element.hasAttribute('placeholder')) {
                        element.setAttribute('placeholder', translation);
                    } else {
                        element.textContent = translation;
                    }
                }
            });

            // Update HTML lang attribute
            document.documentElement.lang = lang;
        }

        function updateCharts(lang) {
            // Reinitialize charts with new language
            const technicalCtx = document.getElementById('technicalSkillsChart');
            const managementCtx = document.getElementById('managementSkillsChart');

            if (technicalCtx) {
                const existingChart = Chart.getChart(technicalCtx);
                if (existingChart) {
                    existingChart.destroy();
                }
                createTechnicalChart(lang);
            }

            if (managementCtx) {
                const existingChart = Chart.getChart(managementCtx);
                if (existingChart) {
                    existingChart.destroy();
                }
                createManagementChart(lang);
            }
        }
    }

    // Technical Skills Chart
    function initCharts() {
        const currentLang = localStorage.getItem('language') || 'de';
        createTechnicalChart(currentLang);
        createManagementChart(currentLang);
    }

    function createTechnicalChart(lang) {
        const technicalCtx = document.getElementById('technicalSkillsChart');
        if (!technicalCtx) return;

        const labels = {
            de: ['ERP Systeme', 'Cloud & Infrastructure', 'AI & Innovation', 'SAP Expertise', 'Blockchain', 'Agile Methods'],
            en: ['ERP Systems', 'Cloud & Infrastructure', 'AI & Innovation', 'SAP Expertise', 'Blockchain', 'Agile Methods']
        };

        new Chart(technicalCtx, {
            type: 'radar',
            data: {
                labels: labels[lang],
                datasets: [{
                    label: lang === 'de' ? 'Expertise Level' : 'Expertise Level',
                    data: [95, 90, 85, 98, 80, 95],
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(37, 99, 235, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    function createManagementChart(lang) {
        const managementCtx = document.getElementById('managementSkillsChart');
        if (!managementCtx) return;

        const labels = {
            de: ['Leadership', 'Projektmanagement', 'Budget Management', 'Team Building', 'Strategisches Denken', 'Change Management'],
            en: ['Leadership', 'Project Management', 'Budget Management', 'Team Building', 'Strategic Thinking', 'Change Management']
        };

        new Chart(managementCtx, {
            type: 'polarArea',
            data: {
                labels: labels[lang],
                datasets: [{
                    data: [98, 95, 92, 96, 94, 93],
                    backgroundColor: [
                        'rgba(37, 99, 235, 0.7)',
                        'rgba(124, 58, 237, 0.7)',
                        'rgba(236, 72, 153, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(99, 102, 241, 0.7)'
                    ],
                    borderColor: [
                        'rgba(37, 99, 235, 1)',
                        'rgba(124, 58, 237, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(99, 102, 241, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // QR Code Generation
    function initQRCode() {
        const qrcodeContainer = document.getElementById('qrcode');
        if (qrcodeContainer) {
            new QRCode(qrcodeContainer, {
                text: 'https://www.linkedin.com/in/alexgiss/',
                width: 200,
                height: 200,
                colorDark: '#2563eb',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }

    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards and timeline items
        const animatedElements = document.querySelectorAll('.about-card, .timeline-item, .skill-card, .cert-card, .personality-card, .game-card, .contact-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    // Smooth Scroll for Navigation
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Navigation Highlight on Scroll
    function initNavHighlight() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Counter Animation for Stats - Simplified version
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const finalValue = counter.getAttribute('data-target');
            if (finalValue) {
                let current = 0;
                const increment = Math.ceil(finalValue / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        counter.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        counter.textContent = current;
                    }
                }, 30);
            }
        });
    }

    // Add hover effects to achievements
    const achievements = document.querySelectorAll('.achievement');
    achievements.forEach((achievement, index) => {
        achievement.style.animationDelay = `${index * 0.1}s`;
    });

    // Add interactive tooltip for certifications
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Easter Egg: Konami Code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Create confetti effect
        const colors = ['#2563eb', '#7c3aed', '#ec4899', '#10b981', '#f59e0b'];
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 30);
        }

        // Show message
        const message = document.createElement('div');
        message.innerHTML = '<h2>🎉 Easter Egg Gefunden! 🎉</h2><p>Du hast den Konami Code entdeckt!</p>';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: bounceIn 0.5s ease-out;
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }

    function createConfetti(color) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${color};
            left: ${Math.random() * window.innerWidth}px;
            top: -20px;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        const targetY = window.innerHeight + 20;
        const targetX = confetti.offsetLeft + (Math.random() - 0.5) * 200;

        confetti.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${targetX - confetti.offsetLeft}px, ${targetY}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        setTimeout(() => confetti.remove(), duration * 1000);
    }

    // Add CSS animations for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% { transform: translate(-50%, -50%) scale(0); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        .nav-link.active {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            color: white;
        }
    `;
    document.head.appendChild(style);

    // Interactive timeline hover effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.timeline-icon');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.timeline-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Language bar animation on scroll
    const langBars = document.querySelectorAll('.lang-fill');
    const langObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                langObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    langBars.forEach(bar => langObserver.observe(bar));

    // Stat bar animation on scroll
    const statFills = document.querySelectorAll('.stat-fill');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statFills.forEach(fill => statObserver.observe(fill));

    // Add parallax effect to hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Ensure mobile navigation remains visible
    if (window.innerWidth <= 768) {
        const navBar = document.querySelector('.nav-bar');
        if (navBar) {
            navBar.style.transform = 'translateY(0)';
        }
    }

    // Print button functionality
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 5px 25px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    printButton.addEventListener('click', () => window.print());
    document.body.appendChild(printButton);

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ec4899 0%, #7c3aed 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 5px 25px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: all 0.3s ease;
        opacity: 0;
        pointer-events: none;
    `;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.pointerEvents = 'auto';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.pointerEvents = 'none';
        }
    });

    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(backToTopButton);

    console.log('🎉 Portfolio loaded successfully!');
    console.log('💡 Try the Konami Code for a surprise!');
});
