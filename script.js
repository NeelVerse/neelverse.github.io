/**
 * NEELVERSE MASTER SCRIPT
 * Functionality: Lightning, Floating Islands, Parallax, & Scroll Reveals
 */

// 1. Initialize GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// 2. Global Navigation & Scroll Logic
const initNavigation = () => {
    const nav = document.querySelector('nav');
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Single Scroll Listener for UI transitions
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    });
};

// 3. Isolated Islands "Anti-Gravity" Effect
const initAntiGravity = () => {
    // Only runs if islands exist on the page
    if (document.querySelector('.island')) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 100;
            const y = (e.clientY - window.innerHeight / 2) / 100;

            // Each island moves at a slightly different speed for depth
            gsap.to(".logo-island", { x: x * 2, y: y * 2, duration: 1.5, ease: "sine.out" });
            gsap.to(".menu-island", { x: x * -1, y: y * -3, duration: 2, ease: "sine.out" });
            gsap.to(".action-island", { x: x * 3, y: y * 1, duration: 1.8, ease: "sine.out" });
        });
    }
};


// 4. Subtle Lightning Bolt Effect (Amber Flicker)
const initLightning = () => {
    const overlay = document.querySelector('.lightning-overlay');
    if (!overlay) return;

    function triggerLightning() {
        const nextStrike = Math.random() * 5000 + 3000; // Random timing between 3-8 seconds

        setTimeout(() => {
            const tl = gsap.timeline();
            tl.to(overlay, { opacity: 0.3, duration: 0.1 })
              .to(overlay, { opacity: 0, duration: 0.1 })
              .to(overlay, { opacity: 0.2, duration: 0.1 })
              .to(overlay, { opacity: 0, duration: 0.4 });
            
            triggerLightning();
        }, nextStrike);
    }
    triggerLightning();
};

// 5. Scroll & Entrance Animations
const initScrollAnimations = () => {
    // Standard Reveals for Text and Sections
    gsap.from(".reveal", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out"
    });

    // Tech Heritage Box Stagger
    if (document.querySelector('.tech-box')) {
        gsap.from(".tech-box", {
            scrollTrigger: {
                trigger: ".tech-heritage",
                start: "top 80%"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
    }

    // Parallax Background Image Movement
    if (document.querySelector('.parallax-bg')) {
        gsap.to(".parallax-bg", {
            scrollTrigger: {
                trigger: ".parallax-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: "-20%", 
            ease: "none"
        });
    }

    // Form Group Fade In
    if (document.querySelector('.imperial-form')) {
        gsap.from(".imperial-form .input-group", {
            scrollTrigger: {
                trigger: ".imperial-form",
                start: "top 80%"
            },
            y: 20,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out"
        });
    }
};

// 6. Interactive Hover Parallax for Work Gallery
const initWorkHover = () => {
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            // Subtle movement of titles inside work cards
            const title = item.querySelector('h3');
            if (title) {
                gsap.to(title, {
                    x: (x - 0.5) * 20,
                    y: (y - 0.5) * 20,
                    duration: 0.5
                });
            }
        });
    });
};

// --- INITIALIZE ALL FUNCTIONS ---
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAntiGravity();
    initLightning();
    initScrollAnimations();
    initWorkHover();
});

document.addEventListener('DOMContentLoaded', () => {
    const iphoneToggle = document.getElementById('iphone-toggle');
    const closeX = document.getElementById('close-x');
    const blurScreen = document.getElementById('blur-screen');

    const toggleMenu = () => {
        iphoneToggle.classList.toggle('open');
        blurScreen.classList.toggle('active');
        
        if (blurScreen.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    if (iphoneToggle) iphoneToggle.addEventListener('click', toggleMenu);
    if (closeX) closeX.addEventListener('click', toggleMenu);

    // Close menu if clicking the blurred background area
    blurScreen.addEventListener('click', (e) => {
        if (e.target === blurScreen) toggleMenu();
    });

    // Close menu when any pill is clicked
    document.querySelectorAll('.menu-pill').forEach(link => {
        link.addEventListener('click', () => {
            iphoneToggle.classList.remove('open');
            blurScreen.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});