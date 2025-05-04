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

    // Video playback optimizations
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Ensure video loads correctly
        heroVideo.addEventListener('loadeddata', function() {
            // Video is loaded and can be played
            heroVideo.play().catch(error => {
                console.warn('Autoplay was prevented:', error);
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

    // כפתור חזרה למעלה
    const scrollTopButton = document.querySelector('.scroll-top');
    
    if (scrollTopButton) {
        // הצגת הכפתור כשמגלגלים למטה
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });
        
        // מעבר לראש הדף בלחיצה
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // הדגשת שאלות נפוצות בעת לחיצה
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems) {
        faqItems.forEach(item => {
            item.addEventListener('click', function() {
                // הסרת המחלקה מכל האלמנטים האחרים
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // הוספה או הסרה של המחלקה מהאלמנט הנוכחי
                this.classList.toggle('active');
            });
        });
    }
    
    // אנימציית "Reveal on Scroll" לאלמנטים
    const revealElements = document.querySelectorAll('.stage-card, .project-card, .benefit-item, .faq-item, .instructor-image, .instructor-features li');
    
    // פונקציה לבדיקה אם אלמנט נמצא בתצוגה
    function checkIfInView() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // הוספת מאזין לגלילה
    window.addEventListener('scroll', checkIfInView);
    // בדיקה ראשונית בעת טעינת הדף
    checkIfInView();
    
    // אפקט Parallax בגלילה
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // אפקט פרלקס על רקע עץ
        document.body.style.backgroundPosition = `center ${scrollPosition * 0.05}px`;
    });
    
    // אפקט הופעה לכותרת הראשית
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            heroContent.style.transition = 'opacity 0.8s, transform 0.8s';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }, 300);
    }
}); 