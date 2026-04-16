// 1. Subtle Lightning Bolt Effect
function triggerLightning() {
    const overlay = document.querySelector('.lightning-overlay');
    
    // Create a random interval for lightning
    const nextStrike = Math.random() * 5000 + 3000; 

    setTimeout(() => {
        const tl = gsap.timeline();
        tl.to(overlay, { opacity: 0.6, duration: 0.1 })
          .to(overlay, { opacity: 0, duration: 0.1 })
          .to(overlay, { opacity: 0.4, duration: 0.1 })
          .to(overlay, { opacity: 0, duration: 0.4 });
        
        triggerLightning();
    }, nextStrike);
}

triggerLightning();

// 2. Smooth Page Entrances
gsap.from(".reveal", {
    y: 30,
    opacity: 0,
    duration: 1.5,
    stagger: 0.3,
    ease: "power4.out"
});

// 3. Hover Parallax for Work Items
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        gsap.to(item.querySelector('h3'), {
            x: (x - 0.5) * 20,
            y: (y - 0.5) * 20,
            duration: 0.5
        });
    });
});
// Mobile Menu Toggle Logic
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

// Close menu when a link is clicked (useful for one-page sections)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
    });
});

// Add this to your existing script.js
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
