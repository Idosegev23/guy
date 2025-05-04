document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission Handling
    const registrationForm = document.querySelector('.registration-form');
    const successResponse = document.querySelector('.form-response.success');
    const errorResponse = document.querySelector('.form-response.error');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(registrationForm);
            
            // Convert FormData to URL-encoded string
            const formBody = new URLSearchParams(formData).toString();
            
            // Send data to webhook
            fetch(registrationForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    successResponse.classList.add('visible');
                    errorResponse.classList.remove('visible');
                    registrationForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successResponse.classList.remove('visible');
                    }, 5000);
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                // Show error message
                errorResponse.classList.add('visible');
                successResponse.classList.remove('visible');
                
                console.error('Error:', error);
                
                // Hide error message after 5 seconds
                setTimeout(() => {
                    errorResponse.classList.remove('visible');
                }, 5000);
            });
        });
    }

    // Date selection in form
    const dateItems = document.querySelectorAll('.form-date-item');
    const hiddenDateInput = document.querySelector('input[name="course_dates"]');
    
    if (dateItems.length > 0 && hiddenDateInput) {
        dateItems.forEach(item => {
            item.addEventListener('click', function() {
                // Toggle active state
                dateItems.forEach(date => date.classList.remove('active'));
                this.classList.add('active');
                
                // Update hidden input with selected date
                hiddenDateInput.value = this.textContent.trim();
            });
        });
    }

    // Initial animation overlay
    const overlayAnimation = document.querySelector('.overlay-animation');
    if (overlayAnimation) {
        overlayAnimation.classList.add('loaded');
        setTimeout(() => {
            overlayAnimation.style.display = 'none';
        }, 1000);
    }

    // Wood grain animation for decorative elements
    const woodGrainElements = document.querySelectorAll('.wood-grain-decoration');
    if (woodGrainElements.length > 0) {
        woodGrainElements.forEach((element, index) => {
            // Add subtle animation with different delays
            element.style.animation = `woodGrainShine 3s ease-in-out ${index * 0.7}s infinite`;
        });
    }
    
    // Add woodwork patterns to section backgrounds
    const addWoodPattern = () => {
        const sections = document.querySelectorAll('.course-stages, .instructor, .example-projects, .registration');
        sections.forEach((section, index) => {
            // Create wood pattern element
            const pattern = document.createElement('div');
            pattern.className = 'wood-pattern-bg';
            // Alternate pattern style
            pattern.dataset.patternType = index % 2 === 0 ? 'rings' : 'lines';
            // Insert as first child to be behind other content
            section.insertBefore(pattern, section.firstChild);
        });
    };
    addWoodPattern();

    // Scroll to top button functionality
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Interactive elements behavior
    const handleInteractiveElements = () => {
        // FAQ items toggle
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems.length > 0) {
            faqItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Close other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    this.classList.toggle('active');
                    
                    // Add wood creaking sound effect
                    if (this.classList.contains('active')) {
                        playWoodSound('creak');
                    }
                });
            });
        }
        
        // Buttons hover wood sound effect
        const buttons = document.querySelectorAll('.cta-button, .submit-button');
        if (buttons.length > 0) {
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => playWoodSound('tap'));
            });
        }
    };
    handleInteractiveElements();
    
    // Simulate wood sounds (creaking, tapping)
    function playWoodSound(type) {
        // Simulate different wood sounds
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'creak') {
            // Creaking wood sound
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(120, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
        } else if (type === 'tap') {
            // Wood tap sound
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }
    
    // Reveal animations for elements when they scroll into view
    const revealElements = document.querySelectorAll('.stage-card, .project-card, .benefit-item, .faq-item, .instructor-image, .instructor-features li');
    
    function checkIfInView() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Initial check
    
    // Parallax effect for wood particles in hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const woodParticles = document.querySelector('.wood-particles');
        
        if (heroSection && woodParticles) {
            const heroHeight = heroSection.offsetHeight;
            const scrollRatio = scrollPosition / heroHeight;
            
            if (scrollRatio <= 1) {
                woodParticles.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }
        }
        
        // Subtle parallax for background
        document.body.style.backgroundPosition = `center ${scrollPosition * 0.05}px`;
    });
}); 