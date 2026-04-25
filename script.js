/**
 * NEELVERSE MASTER SCRIPT 
 * Version: 5.0 - Final Bugless Edition
 */

// 1. Initialize GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// 1. Initialize GSAP Plugins safely
if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
} else {
    console.warn("ScrollTrigger not found. Some animations will be disabled.");
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('iphone-toggle');
    const menu = document.getElementById('blur-screen');
    const close = document.getElementById('close-x');

    if (btn && menu) {
        // Direct assignment is safer than listeners sometimes
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.add('active');
            btn.classList.add('open');
            document.body.style.overflow = 'hidden';
            console.log("Menu Opened");
        };

        const shutMenu = () => {
            menu.classList.remove('active');
            btn.classList.remove('open');
            document.body.style.overflow = 'auto';
            console.log("Menu Closed");
        };

        if (close) close.onclick = shutMenu;
        
        // Close on background click
        menu.onclick = (e) => { if(e.target === menu) shutMenu(); };

        // Close on link click
        document.querySelectorAll('.menu-pill').forEach(link => {
            link.onclick = shutMenu;
        });
    }
 });


    // --- 2. GLOBAL SCROLL LOGIC (Island Shrink) ---
    const nav = document.querySelector('.universe-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });

   // --- 3. ANTI-GRAVITY MOUSE EFFECT ---
 document.addEventListener('mousemove', (e) => {
    // ADD THIS LINE: It kills the effect if the body has the 'subpage' class
    if (document.body.classList.contains('subpage')) return; 

    if (window.innerWidth > 1100) {
        const x = (e.clientX - window.innerWidth / 2) / 100;
        const y = (e.clientY - window.innerHeight / 2) / 100;

        gsap.to(".logo-island", { x: x * 2, y: y * 2, duration: 1.5, ease: "sine.out" });
        gsap.to(".menu-island", { x: x * -1, y: y * -3, duration: 2, ease: "sine.out" });
        gsap.to(".action-island", { x: x * 3, y: y * 1, duration: 1.8, ease: "sine.out" });
    }
 });
    // --- 4. ATMOSPHERIC LIGHTNING ---
    const lightningOverlay = document.querySelector('.lightning-overlay');
    if (lightningOverlay) {
        const triggerLightning = () => {
            const tl = gsap.timeline();
            tl.to(lightningOverlay, { opacity: 0.3, duration: 0.1 })
              .to(lightningOverlay, { opacity: 0, duration: 0.1 })
              .to(lightningOverlay, { opacity: 0.2, duration: 0.1 })
              .to(lightningOverlay, { opacity: 0, duration: 0.4 });
            
            setTimeout(triggerLightning, Math.random() * 5000 + 4000);
        };
        triggerLightning();
    }

    // --- 5. ENTRANCE REVEALS ---
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        gsap.from(reveals, {
            y: 30,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // --- 6. PARALLAX SECTION BACKGROUND ---
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        gsap.to(parallaxBg, {
            scrollTrigger: {
                trigger: ".parallax-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: "-15%",
            ease: "none"
        });
    }

    // --- 7. WORK HOVER PARALLAX ---
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            const title = item.querySelector('h3');
            if (title) {
                gsap.to(title, { x: (x - 0.5) * 20, y: (y - 0.5) * 20, duration: 0.5 });
            }
        });
    });

    // --- 8. TECH BOX STAGGER ---
    if (document.querySelector('.tech-heritage')) {
        gsap.from(".tech-box", {
            scrollTrigger: {
                trigger: ".tech-heritage",
                start: "top 85%"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
    }

    // --- 9. IMPERIAL FORM STAGGER ---
    if (document.querySelector('.imperial-form')) {
        gsap.from(".input-group", {
            scrollTrigger: {
                trigger: ".imperial-form",
                start: "top 90%"
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
