// ==========================================================================
// 1. Inject Navigation & Handle Mobile Drop-Down Menu
// ==========================================================================
function loadNavigation() {
    const headerHTML = `
        <header>
            <h1><a href="index.html" style="color: inherit; text-decoration: none;">Hue Imperial Citadel</a></h1>
            
            <!-- Hamburger Menu Button (3 dashes) -->
            <button class="hamburger" aria-label="Toggle Navigation" aria-expanded="false">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>

            <nav aria-label="Main Navigation">
                <ul id="nav-list">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="history.html">History</a></li>
                    <li><a href="attractions.html">Attractions</a></li>
                    <li><a href="tours.html">Schedule</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="map.html">Location</a></li>
                    <li><a href="booking.html" class="nav-btn">Book Tour</a></li>
                </ul>
            </nav>
        </header>
    `;

    // Insert the header at the very beginning of the <body>
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // --- UX Feature: Highlight the active page ---
    let currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '') currentPage = 'index.html'; // Default to home

    const navLinks = document.querySelectorAll('#nav-list a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // --- Mobile Menu Toggle Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navList = document.getElementById('nav-list');

    hamburger.addEventListener('click', () => {
        // Toggles the drop-down animation in CSS
        navList.classList.toggle('active-menu');
        
        // Animates the 3 dashes into an 'X'
        hamburger.classList.toggle('toggle');
        
        // Accessibility update for screen readers
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });
}

function loadFooter() {
    const footerHTML = `
        <footer>
            <p>&copy; 2026 Hue Citadel Tours. Designed for academic project purposes.</p>
            <p>Contact: <a href="mailto:info@huecitadeltours.com">info@huecitadeltours.com</a></p>
        </footer>
    `;

    // Insert the footer at the very end of the <body>
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// ==========================================================================
// 2. Staggered Build-Up Scroll Animations
// ==========================================================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.js-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        // Counter to create a staggered 1-2-3 delay effect
        let delayCounter = 0; 
        
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Apply a dynamic delay so they build up one by one
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delayCounter * 150); // 150ms delay between each element
                
                delayCounter++; // Increase delay for the next item
                
                // Stop observing the element once it has animated
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before hitting the bottom of the screen
    });

    // Start observing all elements with the 'js-fade-in' class
    animatedElements.forEach(el => observer.observe(el));
}

// ==========================================================================
// 3. Initialize Everything on Page Load
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    loadFooter();
    // 2. Wait just 100 milliseconds before starting animations.
    // This forces the browser to paint the "hidden" state first,
    // ensuring the "build-up" animation plays every time you load a page!
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
});