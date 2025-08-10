// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll (always visible)
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    // Ensure visible on load
    if (navbar) {
        navbar.style.transform = 'translateY(0)';
    }

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        // Keep navbar visible
        navbar.style.transform = 'translateY(0)';
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .game-card, .phone-frame');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero background orbs
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.2;
            orb.style.transform = `translateY(${rate * speed}px)`;
        });
    });
    
    // Phone mockup rotation based on mouse position
    const phoneMockup = document.querySelector('.phone-mockup');
    
    if (phoneMockup) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const rotateX = (y - 0.5) * 10;
            const rotateY = (x - 0.5) * -20;
            
            phoneMockup.style.transform = `rotateY(${-15 + rotateY}deg) rotateX(${5 + rotateX}deg)`;
        });
        
        // Reset phone position when mouse leaves
        document.addEventListener('mouseleave', function() {
            phoneMockup.style.transform = 'rotateY(-15deg) rotateX(5deg)';
        });
    }
    
    // Add loading animation to download button
    const downloadButtons = document.querySelectorAll('.btn-app-store');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add a subtle loading effect
            const originalContent = button.innerHTML;
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                button.style.opacity = '1';
            }, 300);
        });
    });
    
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a brief delay
        setTimeout(typeWriter, 500);
    }
    
    // Add ripple effect to buttons
    function addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Apply ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(addRippleEffect);
    
    // Game card interactive effects
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle shake animation to the game icon
            const icon = card.querySelector('.game-icon');
            if (icon) {
                icon.style.animation = 'shake 0.5s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = card.querySelector('.game-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Scale up the feature icon
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add performance optimization for scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Only update effects if we're not already animating
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll effects go here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Removed custom cursor effect
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent) heroContent.style.animation = 'slideInLeft 1s ease-out';
        if (heroVisual) heroVisual.style.animation = 'slideInRight 1s ease-out';
    });
});

// Add CSS for additional animations
const additionalStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
    z-index: 1;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

/* custom cursor removed */

.loaded .hero-content,
.loaded .hero-visual {
    opacity: 1;
}

/* Mobile styles for hamburger menu */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: rgba(10, 10, 10, 0.95);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(20px);
        padding: 2rem 0;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }
    
    .hamburger.active span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }
    
    .custom-cursor {
        display: none;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
