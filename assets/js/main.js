function loadNavigation() {
    const headerHTML = `
        <header>
            <h1><a href="index.html" style="color: inherit; text-decoration: none;">Hue Imperial Citadel</a></h1>
            
            <!-- Hamburger Menu Button -->
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
                    <li><a href="tours.html">Itinerary</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="map.html">Location</a></li>
                    <li><a href="booking.html" class="nav-btn">Book Tour</a></li>
                    
                    <!-- THEME TOGGLE MOVED HERE: Now it's the last item in the list! -->
                    <li class="theme-li">
                        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Dark/Light Mode">🌙</button>
                    </li>
                </ul>
            </nav>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    let currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '') currentPage = 'index.html'; 

    const navLinks = document.querySelectorAll('#nav-list a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navList = document.getElementById('nav-list');

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active-menu');
        hamburger.classList.toggle('toggle');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('toggle'));
    });
}

function loadFooter() {
    const footerHTML = `
        <footer>
            <p>&copy; 2026 Hue Citadel Tours. Designed for academic project purposes.</p>
            <p>Contact: <a href="mailto:info@huecitadeltours.com">info@huecitadeltours.com</a></p>
        </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.js-fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        let delayCounter = 0; 
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delayCounter * 150);
                delayCounter++;
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    });

    animatedElements.forEach(el => observer.observe(el));
}

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    loadFooter(); 
    initThemeToggle();
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
});