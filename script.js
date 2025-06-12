// Language switching functionality
let currentLanguage = 'zh'; // Default to Traditional Chinese

function toggleLanguage() {
    const newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    switchLanguage(newLanguage);
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Add transition class
    document.body.classList.add('lang-transition');
    
    // Get all elements with language attributes
    const elements = document.querySelectorAll('[data-en][data-zh]');
    
    setTimeout(() => {
        elements.forEach(element => {
            if (lang === 'zh') {
                element.textContent = element.getAttribute('data-zh');
            } else {
                element.textContent = element.getAttribute('data-en');
            }
        });
        
        // Handle select options
        const selectOptions = document.querySelectorAll('option[data-en][data-zh]');
        selectOptions.forEach(option => {
            if (lang === 'zh') {
                option.textContent = option.getAttribute('data-zh');
            } else {
                option.textContent = option.getAttribute('data-en');
            }
        });
        
        // Update language toggle button
        const langButton = document.querySelector('.lang-text');
        langButton.textContent = lang === 'en' ? '中文' : 'EN';
        
        // Update document language
        document.documentElement.lang = lang === 'en' ? 'en' : 'zh-TW';
        
        // Remove transition class
        document.body.classList.remove('lang-transition');
    }, 150);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language to Traditional Chinese
    switchLanguage('zh');
    
    // Enhanced smooth scrolling for SPA experience
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                // Add active state to navigation
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll with easing
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload (SPA behavior)
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Section visibility tracking for active navigation
    const sections = document.querySelectorAll('section[id]');
    const navObserverOptions = {
        threshold: 0.3,
        rootMargin: '-70px 0px -70px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeNavLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeNavLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    activeNavLink.classList.add('active');
                }
            }
        });
    }, navObserverOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add loading animation to elements
    const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .skill-item');
    animatedElements.forEach(element => {
        element.classList.add('loading');
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
    const observeElements = document.querySelectorAll('.service-card, .pricing-card, .about-text, .contact-info');
    observeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !email || !service || !message) {
        showNotification(
            currentLanguage === 'en' ? 'Please fill in all fields.' : '請填寫所有欄位。',
            'error'
        );
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification(
            currentLanguage === 'en' ? 'Please enter a valid email address.' : '請輸入有效的電子郵件地址。',
            'error'
        );
        return;
    }
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = currentLanguage === 'en' ? 'Sending...' : '發送中...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        showNotification(
            currentLanguage === 'en' 
                ? 'Thank you for your message! I\'ll get back to you soon.' 
                : '感謝您的訊息！我會盡快回覆您。',
            'success'
        );
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // In a real implementation, you would send the data to your server:
        // sendFormData(formData);
        
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateX(100px)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.code-animation');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Professional business name
const businessNames = {
    en: "Little Mountain Studio",
    zh: "阿山工作室"
};

// Mobile menu toggle (if needed for mobile responsiveness)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-active');
}

// Add click outside to close mobile menu
document.addEventListener('click', function(e) {
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('mobile-active');
    }
});

// Loading screen (optional)
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
});

// Utility function to get translated text
function getTranslatedText(enText, zhText) {
    return currentLanguage === 'en' ? enText : zhText;
}

// Copy contact information to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification(
            getTranslatedText('Copied to clipboard!', '已複製到剪貼簿！'),
            'success'
        );
    }).catch(() => {
        showNotification(
            getTranslatedText('Failed to copy', '複製失敗'),
            'error'
        );
    });
}

// Add click handlers for contact methods
document.addEventListener('DOMContentLoaded', function() {
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.style.cursor = 'pointer';
        method.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            copyToClipboard(text);
        });
    });
});

// Enhanced form validation
function validateForm(formData) {
    const errors = [];
    
    // Name validation
    const name = formData.get('name').trim();
    if (name.length < 2) {
        errors.push(getTranslatedText('Name must be at least 2 characters.', '姓名至少需要2個字符。'));
    }
    
    // Email validation
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push(getTranslatedText('Please enter a valid email address.', '請輸入有效的電子郵件地址。'));
    }
    
    // Message validation
    const message = formData.get('message').trim();
    if (message.length < 10) {
        errors.push(getTranslatedText('Message must be at least 10 characters.', '訊息至少需要10個字符。'));
    }
    
    return errors;
}

// Professional tips for better user experience
const tips = {
    en: {
        webDev: "A professional website is your digital storefront - make it count!",
        database: "Good data management is the foundation of any successful business.",
        analysis: "Data-driven decisions lead to better business outcomes.",
        ai: "AI can automate repetitive tasks and unlock new possibilities.",
        education: "Investing in tech education is investing in the future.",
        consulting: "Strategic technology planning saves time and money."
    },
    zh: {
        webDev: "專業網站是您的數位店面 - 讓它發揮作用！",
        database: "良好的資料管理是任何成功企業的基礎。",
        analysis: "數據驅動的決策帶來更好的業務成果。",
        ai: "AI 可以自動化重複性任務並開啟新的可能性。",
        education: "投資科技教育就是投資未來。",
        consulting: "策略性技術規劃節省時間和金錢。"
    }
};

// Add tooltips or additional information on hover
function addServiceTips() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const services = ['webDev', 'database', 'analysis', 'ai', 'education', 'consulting'];
        const serviceKey = services[index];
        
        if (tips.en[serviceKey]) {
            card.addEventListener('mouseenter', function() {
                showTip(tips[currentLanguage][serviceKey], this);
            });
        }
    });
}

function showTip(text, element) {
    const tip = document.createElement('div');
    tip.className = 'service-tip';
    tip.textContent = text;
    tip.style.cssText = `
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.9rem;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    element.style.position = 'relative';
    element.appendChild(tip);
    
    setTimeout(() => tip.style.opacity = '1', 100);
    
    setTimeout(() => {
        tip.style.opacity = '0';
        setTimeout(() => {
            if (tip.parentNode) {
                tip.parentNode.removeChild(tip);
            }
        }, 300);
    }, 3000);
} 