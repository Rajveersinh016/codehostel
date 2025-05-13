
// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Handle mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');
let isOpen = false;

mobileToggle.addEventListener('click', function() {
    isOpen = !isOpen;
    if (isOpen) {
        mobileNav.classList.add('open');
        // Change hamburger to X
        mobileToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
            </svg>
        `;
    } else {
        mobileNav.classList.remove('open');
        // Change X back to hamburger
        mobileToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
        `;
    }
});

// Close mobile menu when clicking on links
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        isOpen = false;
        // Change X back to hamburger
        mobileToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
        `;
    });
});

// Hero section animations
document.addEventListener('DOMContentLoaded', function() {
    const headingBadge = document.getElementById('hero-badge');
    const heading = document.getElementById('hero-heading');
    const subheading = document.getElementById('hero-subheading');
    const cta = document.getElementById('hero-cta');
    
    // Animate heading badge immediately
    if (headingBadge) {
        headingBadge.classList.add('animate-fadeIn');
    }
    
    // Animate heading after 300ms
    setTimeout(() => {
        if (heading) {
            heading.classList.add('animate-fadeIn');
        }
    }, 300);
    
    // Animate subheading and CTA after 600ms
    setTimeout(() => {
        if (subheading) {
            subheading.classList.add('animate-fadeIn');
        }
        if (cta) {
            cta.classList.add('animate-fadeIn');
        }
    }, 600);
    
    // Scroll to booking section when Reserve Now button is clicked
    const reserveButton = document.getElementById('reserve-btn');
    if (reserveButton) {
        reserveButton.addEventListener('click', function() {
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
