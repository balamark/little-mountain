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
    
    // Initialize dashboard animations
    initDashboardAnimations();
    
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

// Counter Animation for Dashboard Stats
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Dashboard intersection observer
function initDashboardAnimations() {
    const dashboard = document.querySelector('.dashboard-container');
    if (!dashboard) return;
    
    const dashboardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate counters when dashboard comes into view
                setTimeout(animateCounters, 500);
                
                // Animate chart bars
                const bars = document.querySelectorAll('.bar-fill');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.animation = 'barGrow 1s ease-out forwards';
                    }, 800 + (index * 100));
                });
                
                dashboardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    dashboardObserver.observe(dashboard);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const dashboardElements = document.querySelectorAll('.dashboard-container');
    
    dashboardElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Professional business name
const businessNames = {
    en: "Little Mountain Studio",
    zh: "阿山工作室"
};

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const icon = toggleButton.querySelector('i');
    
    navMenu.classList.toggle('mobile-active');
    
    // Change icon
    if (navMenu.classList.contains('mobile-active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

// Add click outside to close mobile menu
document.addEventListener('click', function(e) {
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (!navbar.contains(e.target) && navMenu.classList.contains('mobile-active')) {
        navMenu.classList.remove('mobile-active');
        const icon = document.querySelector('.mobile-menu-toggle i');
        icon.className = 'fas fa-bars';
    }
});

// Close mobile menu when clicking nav links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            const icon = document.querySelector('.mobile-menu-toggle i');
            
            if (navMenu.classList.contains('mobile-active')) {
                navMenu.classList.remove('mobile-active');
                icon.className = 'fas fa-bars';
            }
        });
    });
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

// Service Modal Functions
const serviceContent = {
    webdev: {
        title: {
            en: "🌐 Web Development",
            zh: "🌐 網站開發"
        },
        content: {
            en: `
                <h3>✨ Beautiful one-page websites with continuous scrolling</h3>
                <p>Mark creates stunning websites that tell your story seamlessly.</p>
                
                <h4>🎯 What makes it special:</h4>
                <ul>
                    <li>Mobile-friendly design that looks great everywhere</li>
                    <li>Integration with your LINE official account</li>
                    <li>Fast and engaging user experience</li>
                </ul>
                
                <h4>Check out our work:</h4>
                <p>See a live example at <a href="https://moreway-cafe.de.r.appspot.com/" target="_blank">Moreway Cafe</a> - a beautiful coffee shop website with LINE integration!</p>
                <p>A useful gift drawing app at<a href="https://studio--studio-s1ksa.us-central1.hosted.app/" target="_blank"> - a quick utility tool for drawing gifts among friends</a>
                <h4>Perfect for:</h4>
                <ul>
                    <li>Cafés and restaurants</li>
                    <li>Small businesses</li>
                    <li>Creative professionals</li>
                    <li>Online shops</li>
                </ul>
                
                <p><strong>🚀 Ready to shine online?</strong> Your website will work as smoothly as your business runs!</p>
            `,
            zh: `
                <h3>✨ 美觀的單頁網站，無間斷滾動體驗</h3>
                <p>Mark 打造令人驚艷的網站，述說您的故事。</p>
                
                <h4>🎯 特色功能：</h4>
                <ul>
                    <li>手機友善設計，在任何裝置都美觀</li>
                    <li>整合您的 LINE 官方帳號</li>
                    <li>快速且吸引人的用戶體驗</li>
                </ul>
                
                <h4>🌟 作品範例：</h4>
                <p>請看 <a href="https://moreway-cafe.de.r.appspot.com/" target="_blank">摩威咖啡</a> 的實際案例 - 美觀的咖啡店網站，整合LINE官方帳號的訂單系統</p>
                <p>一個實用的抽禮物應用程式在<a href="https://studio--studio-s1ksa.us-central1.hosted.app/" target="_blank"> - 一個快速實用的工具，讓朋友們可以一起參與抽獎活動</a></p>
                <h4>適合對象：</h4>
                <ul>
                    <li>咖啡廳和餐廳</li>
                    <li>小型企業</li>
                    <li>創意工作者</li>
                    <li>線上商店</li>
                </ul>
                
                <p><strong>準備在線上發光？</strong> 您的網站將如您的業務一樣順暢運作！</p>
            `
        }
    },
    database: {
        title: {
            en: "Customer Databases",
            zh: "客戶資料庫"
        },
        content: {
            en: `
                <h3>Organize your customer data with secure, scalable databases</h3>
                <p>Mark's custom database solutions save time and boost efficiency, built with the same precision he brings to solving puzzles (a favorite café pastime!).</p>
                
                <h4>What you get:</h4>
                <ul>
                    <li>Custom database design tailored to your business</li>
                    <li>Secure data storage with backup systems</li>
                    <li>Easy-to-use interface for your team</li>
                    <li>Integration with your existing tools</li>
                    <li>Scalable architecture that grows with your business</li>
                </ul>
                
                <h4>Benefits:</h4>
                <ul>
                    <li>Stop losing customer information in spreadsheets</li>
                    <li>Access real-time business insights</li>
                    <li>Automate repetitive data entry tasks</li>
                    <li>Improve customer service with organized records</li>
                </ul>
                
                <p><strong>Need a smarter way to manage data?</strong> With experience from Microsoft's enterprise systems, Mark knows how to build databases that actually work for your business.</p>
            `,
            zh: `
                <h3>使用安全、可擴展的資料庫整理客戶資料</h3>
                <p>Mark 的客製化資料庫解決方案節省時間並提升效率，以他解決謎題的精準度打造（這是他在咖啡廳的最愛消遣！）。</p>
                
                <h4>您將獲得：</h4>
                <ul>
                    <li>為您的業務量身訂製的資料庫設計</li>
                    <li>具備備份系統的安全資料存儲</li>
                    <li>團隊易於使用的介面</li>
                    <li>與現有工具的整合</li>
                    <li>隨業務成長的可擴展架構</li>
                </ul>
                
                <h4>好處：</h4>
                <ul>
                    <li>不再在試算表中遺失客戶資訊</li>
                    <li>獲得即時業務洞察</li>
                    <li>自動化重複的資料輸入任務</li>
                    <li>通過整理記錄改善客戶服務</li>
                </ul>
                
                <p><strong>需要更智慧的資料管理方式？</strong> 憑藉微軟企業系統的經驗，Mark 知道如何建立真正適合您業務的資料庫。</p>
            `
        }
    },
    analysis: {
        title: {
            en: "Data Analysis",
            zh: "資料分析"
        },
        content: {
            en: `
                <h3>Turn data into decisions with clear reports and visualizations</h3>
                <p>Mark uncovers insights to drive your success, blending analytical precision with his love for discovering patterns (whether in data or tennis strategies!).</p>
                
                <h4>What you get:</h4>
                <ul>
                    <li>Custom dashboards showing key business metrics</li>
                    <li>Automated reports delivered to your inbox</li>
                    <li>Data visualization that tells your story</li>
                    <li>Predictive analysis for better planning</li>
                    <li>Training to understand and use your data</li>
                </ul>
                
                <h4>Transform your business with:</h4>
                <ul>
                    <li>Customer behavior insights</li>
                    <li>Sales trend analysis</li>
                    <li>Performance tracking</li>
                    <li>Cost optimization opportunities</li>
                </ul>
                
                <p><strong>Want to unlock your data's potential?</strong> Mark turns complex data into clear, actionable insights that help you make confident business decisions.</p>
            `,
            zh: `
                <h3>通過清晰的報告和視覺化將資料轉化為決策</h3>
                <p>Mark 挖掘洞察以推動您的成功，結合分析精準度與他對發現模式的熱愛（無論是資料還是網球策略！）。</p>
                
                <h4>您將獲得：</h4>
                <ul>
                    <li>顯示關鍵業務指標的客製化儀表板</li>
                    <li>自動發送到您信箱的報告</li>
                    <li>講述您故事的資料視覺化</li>
                    <li>更好規劃的預測分析</li>
                    <li>理解和使用資料的培訓</li>
                </ul>
                
                <h4>透過以下方式轉變您的業務：</h4>
                <ul>
                    <li>客戶行為洞察</li>
                    <li>銷售趨勢分析</li>
                    <li>績效追蹤</li>
                    <li>成本優化機會</li>
                </ul>
                
                <p><strong>想要釋放資料的潛力？</strong> Mark 將複雜資料轉化為清晰、可行的洞察，幫助您做出自信的業務決策。</p>
            `
        }
    },
    ai: {
        title: {
            en: "AI Boot Camp for Students",
            zh: "學生 AI 訓練營"
        },
        content: {
            en: `
                <h3>Inspire kids with hands-on AI Boot Camps</h3>
                <p>Perfect for elementary to high school students, Mark creates fun, future-ready learning experiences. As both a parent and teacher, he brings the same enthusiasm he shares with his son when exploring new games together.</p>
                
                <h4>What students learn:</h4>
                <ul>
                    <li>Basic AI concepts through interactive projects</li>
                    <li>Hands-on coding with beginner-friendly tools</li>
                    <li>Real-world AI applications and ethics</li>
                    <li>Creative problem-solving skills</li>
                    <li>Confidence in technology and innovation</li>
                </ul>
                
                <h4>Program formats:</h4>
                <ul>
                    <li>After-school workshops (4-week sessions)</li>
                    <li>Summer camp intensives</li>
                    <li>Parent-child learning experiences</li>
                    <li>School partnership programs</li>
                </ul>
                
                <p><strong>Ready to spark curiosity in AI?</strong> Mark combines Microsoft-level expertise with a teacher's heart to make AI accessible and exciting for young minds.</p>
            `,
            zh: `
                <h3>透過實作 AI 訓練營激發孩子們的靈感</h3>
                <p>適合小學到高中學生，Mark 創造有趣、面向未來的學習體驗。身為家長和教師，他帶來與兒子一起探索新遊戲時的相同熱忱。</p>
                
                <h4>學生將學習：</h4>
                <ul>
                    <li>透過互動專案學習基礎 AI 概念</li>
                    <li>使用初學者友好工具的實作編程</li>
                    <li>真實世界的 AI 應用和倫理</li>
                    <li>創造性解決問題的技能</li>
                    <li>對技術和創新的信心</li>
                </ul>
                
                <h4>課程形式：</h4>
                <ul>
                    <li>課後工作坊（4週課程）</li>
                    <li>暑期密集營</li>
                    <li>親子學習體驗</li>
                    <li>學校合作計畫</li>
                </ul>
                
                <p><strong>準備激發對 AI 的好奇心？</strong> Mark 結合微軟級專業知識與教師的心，讓年輕人能夠接觸並對 AI 感到興奮。</p>
            `
        }
    },
    education: {
        title: {
            en: "🎓 Tech Education Programs",
            zh: "🎓 科技教育課程"
        },
        content: {
            en: `
                <h3>🌟 School Programming Workshops</h3>
                <p><strong>Focus Areas:</strong> AI Applications, Python, Scratch, Web Development</p>
                <ul>
                    <li><strong>AI Applications:</strong> Image recognition, chatbots, smart recommendations</li>
                    <li><strong>Python Basics:</strong> Variables, loops, functions through games</li>
                    <li><strong>Scratch:</strong> Visual programming with animated stories</li>
                    <li><strong>Web Development:</strong> Build simple websites with HTML/CSS</li>
                </ul>
                
                <h3>👨‍👩‍👧‍👦 Parent-Child Coding Sessions</h3>
                <p><strong>Strengthen family bonds through technology learning together!</strong></p>
                <ul>
                    <li><strong>How it works:</strong> Parents and children pair up on projects</li>
                    <li><strong>Learning approach:</strong> Problem-solving as a team</li>
                    <li><strong>Projects:</strong> Family quiz app, photo gallery, simple games</li>
                    <li><strong>Benefits:</strong> Communication, patience, and shared achievement</li>
                </ul>
                
                <h3>🏕️ AI Bootcamp Plans & Pricing</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>📅 1-Day Intensive:</strong> NT$2,000 (Max 8 kids)</p>
                    <ul><li>AI basics, simple chatbot project</li></ul>
                    
                    <p><strong>📅 2-Day Workshop:</strong> NT$3,600 (Max 6 kids)</p>
                    <ul><li>AI + Python basics, interactive game</li></ul>
                    
                    <p><strong>📅 5-Day Camp:</strong> NT$8,500 (Max 4 kids)</p>
                    <ul><li>Complete AI project: smart recommendation system</li></ul>
                </div>
                
                <h3>🎁 Non-Profit School Programs</h3>
                <p><strong>1-Hour AI Fun Class - FREE for schools!</strong></p>
                <ul>
                    <li><strong>Curriculum:</strong> "Train Your AI Pet" - visual programming</li>
                    <li><strong>Project:</strong> Students create AI that recognizes shapes/colors</li>
                    <li><strong>Hands-on:</strong> Everyone gets to "teach" AI through examples</li>
                    <li><strong>Takeaway:</strong> Understanding how AI learns from data</li>
                </ul>
                
                <p><strong>🚀 Ready to inspire young minds?</strong> Small classes ensure personalized attention!</p>
                <a href="ai-workshop.html">Elephant AI Workshop</a>
            `,
            zh: `
                <h3>🌟 學校編程工作坊</h3>
                <p><strong>重點領域：</strong> AI 應用、Python、Scratch、網站開發</p>
                <ul>
                    <li><strong>AI 應用：</strong> 圖像識別、聊天機器人、智慧推薦</li>
                    <li><strong>Python 基礎：</strong> 透過遊戲學習變數、迴圈、函數</li>
                    <li><strong>Scratch：</strong> 用動畫故事學視覺化程式設計</li>
                    <li><strong>網站開發：</strong> 用 HTML/CSS 建立簡單網站</li>
                </ul>
                
                <h3>👨‍👩‍👧‍👦 親子編程課程</h3>
                <p><strong>透過科技學習增進家庭關係！</strong></p>
                <ul>
                    <li><strong>學習方式：</strong> 親子搭檔完成專案</li>
                    <li><strong>教學方法：</strong> 團隊解決問題</li>
                    <li><strong>專案內容：</strong> 家庭問答應用程式、相片畫廊、簡單遊戲</li>
                    <li><strong>學習效益：</strong> 溝通、耐心、共同成就感</li>
                </ul>
                
                <h3>🏕️ AI 訓練營計畫與收費</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>📅 一日密集班：</strong> NT$2,000 (最多8位學童)</p>
                    <ul><li>AI 基礎概念、簡單聊天機器人專案</li></ul>
                    
                    <p><strong>📅 兩日工作坊：</strong> NT$3,600 (最多6位學童)</p>
                    <ul><li>AI + Python 基礎、互動遊戲製作</li></ul>
                    
                    <p><strong>📅 五日營隊：</strong> NT$8,500 (最多4位學童)</p>
                    <ul><li>完整 AI 專案：智慧推薦系統</li></ul>
                </div>
                
                <h3>🎁 非營利學校課程</h3>
                <p><strong>一小時 AI 趣味課程 - 學校免費！</strong></p>
                <ul>
                    <li><strong>課程內容：</strong> "訓練你的 AI 寵物" - 視覺化程式設計</li>
                    <li><strong>專案目標：</strong> 學生創造能識別形狀/顏色的 AI</li>
                    <li><strong>實作體驗：</strong> 每位學生都能透過範例"教導" AI</li>
                    <li><strong>學習重點：</strong> 理解 AI 如何從資料中學習</li>
                </ul>
                
                <p><strong>🚀 準備啟發年輕心靈？</strong> 小班制確保個人化關注！</p>
                <a href="ai-workshop.html">大象 AI 創意工作坊</a>
            `
        }
    },
    consulting: {
        title: {
            en: "Tech Consulting for Organizations",
            zh: "組織科技顧問"
        },
        content: {
            en: `
                <h3>Strategic technology consulting</h3>
                <p>Mark provides affordable, effective tech solutions especially for nonprofits and community organizations. He loves helping communities grow, just like building connections on the tennis court.</p>
                
                <h4>Consulting services:</h4>
                <ul>
                    <li>Technology strategy and planning</li>
                    <li>System architecture review</li>
                    <li>Cost-effective solution recommendations</li>
                    <li>Digital transformation roadmaps</li>
                    <li>Vendor selection and management</li>
                </ul>
                
                <h4>Specializes in:</h4>
                <ul>
                    <li><strong>Nonprofit Technology:</strong> Budget-conscious solutions</li>
                    <li><strong>Small Business Systems:</strong> Growth-focused planning</li>
                    <li><strong>Educational Technology:</strong> Learning-centered approaches</li>
                    <li><strong>Community Projects:</strong> Impact-driven solutions</li>
                </ul>
                
                <p><strong>Why choose Mark?</strong> With Microsoft enterprise experience and a heart for community service, he provides high-level strategic thinking at accessible prices.</p>
            `,
            zh: `
                <h3>策略性科技顧問</h3>
                <p>Mark 為非營利組織和社區組織提供負擔得起的有效科技解決方案。他喜歡幫助社區成長，就像在網球場上建立連結一樣。</p>
                
                <h4>顧問服務：</h4>
                <ul>
                    <li>科技策略和規劃</li>
                    <li>系統架構審查</li>
                    <li>成本效益解決方案建議</li>
                    <li>數位轉型路線圖</li>
                    <li>供應商選擇和管理</li>
                </ul>
                
                <h4>專精領域：</h4>
                <ul>
                    <li><strong>非營利組織科技：</strong> 預算導向解決方案</li>
                    <li><strong>小企業系統：</strong> 成長導向規劃</li>
                    <li><strong>教育科技：</strong> 學習導向方法</li>
                    <li><strong>社區專案：</strong> 影響導向解決方案</li>
                </ul>
                
                <p><strong>為什麼選擇 Mark？</strong> 擁有微軟企業經驗和社區服務的心，他以易於接受的價格提供高層次策略思維。</p>
            `
        }
    }
};

function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const service = serviceContent[serviceType];
    if (service) {
        modalTitle.textContent = service.title[currentLanguage];
        modalContent.innerHTML = service.content[currentLanguage];
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        closeServiceModal();
    }
}

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeServiceModal();
    }
});

// Update modal content when language changes
function updateModalContent() {
    const modal = document.getElementById('serviceModal');
    if (modal.style.display === 'block') {
        // Find which service is currently shown and update it
        // This ensures modal content updates when language is toggled
        const modalTitle = document.getElementById('modalTitle').textContent;
        for (const [serviceType, service] of Object.entries(serviceContent)) {
            if (service.title.en === modalTitle || service.title.zh === modalTitle) {
                openServiceModal(serviceType);
                break;
            }
        }
    }
} 