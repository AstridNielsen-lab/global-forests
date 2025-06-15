/*
===========================================
GlobalForests Pro - Modern JavaScript
Autor: AI Assistant
Data: 2024
===========================================
*/

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initPreloader();
    initNavigation();
    initAnimations();
    initCounters();
    initFormHandling();
    initBackToTop();
    initSmoothScrolling();
    initParallax();
});

// ======================
// PRELOADER
// ======================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!preloader) return;
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide preloader after loading completes
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                }, 500);
            }, 500);
        }
        
        if (loadingProgress) {
            loadingProgress.style.width = progress + '%';
        }
    }, 100);
}

// ======================
// NAVIGATION
// ======================
function initNavigation() {
    const navbar = document.querySelector('.header-area');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(255,255,255,0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = 'rgba(255,255,255,0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Mobile menu toggle
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            navbarToggler.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// ======================
// ANIMATIONS
// ======================
function initAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
    
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Parallax effect for hero background
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const heroBackground = heroSection.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// ======================
// COUNTERS
// ======================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const animationDuration = 2000; // 2 seconds
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / (animationDuration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                element.textContent = formatNumber(Math.floor(current));
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = formatNumber(target);
            }
        };
        
        updateCounter();
    }
    
    function formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(0) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'k';
        }
        return num.toString();
    }
}

// ======================
// FORM HANDLING
// ======================
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Validate all fields
        if (!validateForm()) {
            showNotification('Por favor, corrija os erros no formulário.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success simulation
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Analytics tracking (if Google Analytics is available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'contact',
                    event_label: 'contact_form'
                });
            }
        }, 2000);
    }
    
    function validateForm() {
        const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldName = field.name || field.id;
        
        // Clear previous errors
        clearFieldError({ target: field });
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Este campo é obrigatório.');
            return false;
        }
        
        // Email validation
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Por favor, insira um email válido.');
                return false;
            }
        }
        
        // Phone validation (if applicable)
        if (fieldName.includes('phone') && value) {
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                showFieldError(field, 'Por favor, insira um telefone válido.');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        
        let errorElement = field.parentNode.querySelector('.invalid-feedback');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearFieldError(e) {
        const field = e.target;
        field.classList.remove('is-invalid');
        
        const errorElement = field.parentNode.querySelector('.invalid-feedback');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
}

// ======================
// NOTIFICATIONS
// ======================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => hideNotification(notification));
    
    // Auto-hide after 5 seconds
    setTimeout(() => hideNotification(notification), 5000);
}

function hideNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#2ECC71',
        error: '#E74C3C',
        warning: '#F39C12',
        info: '#3498DB'
    };
    return colors[type] || colors.info;
}

// ======================
// BACK TO TOP
// ======================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======================
// SMOOTH SCROLLING
// ======================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header-area')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ======================
// PARALLAX EFFECTS
// ======================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ======================
// UTILITY FUNCTIONS
// ======================

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ======================
// PERFORMANCE OPTIMIZATIONS
// ======================

// Optimize scroll events with throttling
const optimizedScrollHandler = throttle(() => {
    // Add your scroll-dependent code here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images (if Intersection Observer is supported)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ======================
// SERVICE WORKER (for PWA capabilities)
// ======================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ======================
// ANALYTICS TRACKING
// ======================
function trackEvent(action, category, label, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('click', 'button', buttonText);
    }
});

// Track section visibility
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionName = entry.target.id || 'unknown';
            trackEvent('section_view', 'engagement', sectionName);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// ======================
// ERROR HANDLING
// ======================
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can send this to your error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You can send this to your error tracking service
});

// ======================
// COPY TO CLIPBOARD FUNCTIONALITY
// ======================
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess();
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        // Fallback method
        fallbackCopyTextToClipboard(text);
    }
}

// Fallback copy method
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        console.error('Erro ao copiar: ', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

// Show copy success message
function showCopySuccess() {
    showNotification('✅ Copiado com sucesso!', 'success');
}

// Show copy error message
function showCopyError() {
    showNotification('❌ Erro ao copiar. Tente selecionar e copiar manualmente.', 'error');
}

// Make function globally available
window.copyToClipboard = copyToClipboard;

// ======================
// CHATBOT FUNCTIONALITY
// ======================
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyDNSDXAocB4YPm4kY6v9L9C9OtJkQ1y-Uk";

// Chatbot state
let isChatbotOpen = false;
let conversationHistory = [];

// Initialize chatbot
function initChatbot() {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // Toggle chatbot window
    chatbotButton.addEventListener('click', toggleChatbot);
    chatbotClose.addEventListener('click', closeChatbot);

    // Send message events
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Enable/disable send button based on input
    chatbotInput.addEventListener('input', () => {
        const hasText = chatbotInput.value.trim().length > 0;
        chatbotSend.disabled = !hasText;
    });

    // Suggestion buttons
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.getAttribute('data-message');
            chatbotInput.value = message;
            sendMessage();
        });
    });
}

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    isChatbotOpen = !isChatbotOpen;
    
    if (isChatbotOpen) {
        chatbotWindow.classList.add('open');
        document.getElementById('chatbot-input').focus();
    } else {
        chatbotWindow.classList.remove('open');
    }
}

function closeChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.classList.remove('open');
    isChatbotOpen = false;
}

async function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message to chat
    addMessageToChat(message, 'user');
    input.value = '';
    document.getElementById('chatbot-send').disabled = true;

    // Show typing indicator
    showTypingIndicator();

    try {
        // Get response from Gemini API
        const response = await getChatbotResponse(message);
        hideTypingIndicator();
        addMessageToChat(response, 'bot');
    } catch (error) {
        console.error('Erro no chatbot:', error);
        hideTypingIndicator();
        addMessageToChat(
            'Desculpe, estou enfrentando problemas técnicos no momento. ' +
            'Por favor, entre em contato conosco pelo WhatsApp: +55 (11) 97060-3441 ' +
            'ou email: juliocamposmachado@gmail.com',
            'bot'
        );
    }
}

async function getChatbotResponse(userMessage) {
    const systemPrompt = `Você é Julio Campos Machado, especialista da Global Forests Pro, uma empresa líder em sustentabilidade corporativa. Suas características:

🌱 PERSONA:
- Especialista em ESG, compensação de carbono e reflorestamento
- Desenvolvedor da plataforma Global Forests Pro
- Entusiasta de tecnologia verde e IA ambiental
- Comunicação clara, técnica mas acessível
- Sempre positivo e solucionista

🏢 EMPRESA - GLOBAL FORESTS PRO:
- Líder em sustentabilidade corporativa
- Serviços: Compensação de carbono, Consultoria ESG, IA Verde
- Tecnologia: IA, monitoramento por satélite, blockchain
- 500M+ árvores plantadas
- 1.2B toneladas CO₂ compensadas
- 2.500+ empresas parceiras
- Atuação em 84 países

💼 SERVIÇOS PRINCIPAIS:
1. **Compensação de Carbono** ($25/tonelada CO₂)
   - Certificação internacional
   - Monitoramento satelital
   - Blockchain verification
   - Relatórios tempo real

2. **Consultoria ESG Completa** ($5.000+ por projeto)
   - Diagnóstico ESG 360°
   - Estratégia personalizada
   - Certificações B-Corp, ISO
   - Relatórios sustentabilidade

3. **Plataforma IA Verde** ($2.500+ por mês)
   - IA predictiva de impacto
   - Otimização recursos
   - Dashboard executivo
   - API integração

📞 CONTATO:
- WhatsApp: +55 (11) 97060-3441
- Email: juliocamposmachado@gmail.com
- Endereço: Rua Dante Pellacani, CEP 03334-070, São Paulo - SP
- Site: Global Forests (criado por Like Look Solutions)

🎯 COMO RESPONDER:
- Seja Julio Campos Machado em primeira pessoa
- Responda sobre sustentabilidade, ESG, carbono, reflorestamento
- Ofereça soluções específicas da Global Forests Pro
- Use dados e métricas reais da empresa
- Mantenha tom profissional mas amigável
- Convide para contato direto quando apropriado
- Limite respostas a 2-3 parágrafos

Responda como Julio Campos Machado:`;

    const requestBody = {
        contents: [{
            parts: [{
                text: `${systemPrompt}\n\nPergunta do usuário: ${userMessage}`
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.9,
            topK: 40
        }
    };

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error('Resposta inválida da API');
    }
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="https://ui-avatars.com/api/?name=User&background=3498DB&color=fff&size=30&bold=true" alt="Usuário">
            </div>
            <div class="message-content">
                <p>${message}</p>
                <div class="message-time">${timeString}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="https://ui-avatars.com/api/?name=Julio+Campos&background=2ECC71&color=fff&size=30&bold=true" alt="Julio">
            </div>
            <div class="message-content">
                <p>${message}</p>
                <div class="message-time">${timeString}</div>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'flex';
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'none';
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initChatbot();
});

// ======================
// EXPORTS (if using modules)
// ======================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        trackEvent,
        debounce,
        throttle,
        isInViewport,
        copyToClipboard
    };
}

