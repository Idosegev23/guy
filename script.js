document.addEventListener('DOMContentLoaded', function() {
    // טיפול בשליחת הטופס
    const form = document.querySelector('.registration-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // בדיקת תקינות שדות הטופס
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            
            if (!name || !phone || !email) {
                alert('נא למלא את כל השדות');
                return;
            }
            
            // כאן בדרך כלל היה קוד לשליחת הנתונים לשרת
            // במקום זה נציג הודעת הצלחה
            alert('תודה שנרשמת! ניצור איתך קשר בקרוב.');
            form.reset();
        });
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
    
    // אנימציה חלקה לניווט בין עוגנים
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // מרווח מהכותרת הדביקה
                    behavior: 'smooth'
                });
            }
        });
    });
    
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