// 全局状态管理
const AppState = {
    animationEnabled: true,
    showPreview: true,
    textContent: '',
    fontSize: 1.25,
    animationStyle: 'bounce'
};

// DOM元素引用
let elements = {};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化DOM元素引用
    initElements();
    
    // 初始化所有功能
    initNavigation();
    initScrollAnimations();
    initFormValidation();
    initInteractiveControls();
    initModalSystem();
    initNotificationSystem();
    initHeroAnimation();
    initFeatureCards();
    initDemoArea();
    initFeedbackCarousel();
    
    console.log('✨ Modern Frontend Demo Application Initialized');
});

// 初始化DOM元素引用
function initElements() {
    elements = {
        // 导航相关
        header: document.querySelector('.header'),
        navContainer: document.querySelector('.nav-container'),
        mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
        navLinks: document.querySelectorAll('.nav-link'),
        searchBox: document.querySelector('.search-box input'),
        themeToggle: document.querySelector('.btn-icon'),
        logo: document.querySelector('.logo'),
        
        // 交互相关
        demoArea: document.querySelector('.demo-area'),
        animatedElement: document.querySelector('.animated-element'),
        outputText: document.getElementById('output-text'),
        submitBtn: document.querySelector('.contact-form .btn'),
        modal: document.querySelector('.modal'),
        modalClose: document.querySelector('.modal-close'),
        
        // 控制面板相关
        checkAnimation: document.getElementById('check-animation'),
        checkPreview: document.getElementById('check-preview'),
        fontSizeRange: document.getElementById('font-size'),
        fontOutput: document.getElementById('font-output'),
        animationStyle: document.getElementById('animation-style'),
        inputText: document.getElementById('input-text'),
        animateBtn: document.getElementById('animate-btn'),
        clearBtn: document.getElementById('clear-btn'),
        resetBtn: document.getElementById('reset-btn'),
    };
}

// 初始化导航功能
function initNavigation() {
    let lastScroll = 0;
    let headerVisible = true;
    
    // 滚动监听
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 头部阴影效果
        if (currentScroll > 20) {
            elements.header.style.boxShadow = 'var(--shadow-lg)';
        } else {
            elements.header.style.boxShadow = 'none';
        }
        
        // 导航栏显示/隐藏效果
        if (currentScroll > 100) {
            if (currentScroll > lastScroll) {
                if (headerVisible) {
                    elements.header.style.transform = 'translateY(-100%)';
                    headerVisible = false;
                }
            } else {
                if (!headerVisible) {
                    elements.header.style.transform = 'translateY(0)';
                    headerVisible = true;
                }
            }
        } else {
            elements.header.style.transform = 'translateY(0)';
            headerVisible = true;
        }
        
        lastScroll = currentScroll;
        updateActiveNavLink();
    });
    
    // 移动端菜单
    if (elements.mobileMenuBtn) {
        elements.mobileMenuBtn.addEventListener('click', () => {
            elements.navContainer.classList.toggle('active');
            elements.mobileMenuBtn.innerHTML = elements.navContainer.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // 导航链接点击事件
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = elements.header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // 关闭移动端菜单
                if (elements.navContainer.classList.contains('active')) {
                    elements.navContainer.classList.remove('active');
                    elements.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Logo点击事件
    elements.logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 搜索功能
    if (elements.searchBox) {
        elements.searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm.length > 0) {
                // 简单的搜索反馈
                showNotification('搜索功能正在开发...', 'info');
            }
        });
        
        elements.searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm) {
                    showNotification(`搜索 "${searchTerm}"`, 'info');
                }
            }
        });
    }
    
    // 主题切换
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', () => {
            showNotification('主题切换功能正在开发...', 'info');
        });
    }
}

// 更新激活的导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 初始化滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .feedback-card, .contact-item, .hero-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// 初始化表单验证
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    const formInputs = form.querySelectorAll('input, textarea');
    
    // 实时验证
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    // 表单提交
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(form);
        }
    });
    
    // 自定义提交按钮
    if (elements.submitBtn) {
        elements.submitBtn.addEventListener('click', () => {
            const form = elements.submitBtn.closest('form');
            const event = new Event('submit', { bubbles: true });
            form.dispatchEvent(event);
        });
    }
}

// 验证单个字段
function validateField(field) {
    const value = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    let isValid = true;
    let errorMessage = '';
    
    // 清除之前的错误状态
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // 必填字段验证
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = '此字段为必填项';
    }
    
    // 邮箱验证
    if (field.type === 'email' && value && !emailRegex.test(value)) {
        isValid = false;
        errorMessage = '请输入有效的邮箱地址';
    }
    
    // 电话验证
    if (field.type === 'tel' && value && !phoneRegex.test(value)) {
        isValid = false;
        errorMessage = '请输入有效的电话号码';
    }
    
    // 文本区域验证
    if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
        isValid = false;
        errorMessage = '内容至少需要10个字符';
    }
    
    // 显示错误信息
    if (!isValid) {
        field.classList.add('error');
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.style.cssText = 'color: var(--accent-color); font-size: 0.8rem; margin-top: 0.25rem;';
        errorEl.textContent = errorMessage;
        field.parentElement.appendChild(errorEl);
    }
    
    return isValid;
}

// 提交表单
function submitForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // 模拟提交
    elements.submitBtn.disabled = true;
    elements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
    
    setTimeout(() => {
        elements.submitBtn.disabled = false;
        elements.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> 发送消息';
        
        showNotification('消息发送成功！我们会尽快与您联系。', 'success');
        form.reset();
        
        console.log('Form submitted:', data);
    }, 1500);
}

// 初始化交互控制面板
function initInteractiveControls() {
    // 动画开关
    if (elements.checkAnimation) {
        elements.checkAnimation.addEventListener('change', (e) => {
            AppState.animationEnabled = e.target.checked;
            showNotification(AppState.animationEnabled ? '动画已启用' : '动画已禁用', 'info');
        });
    }
    
    // 预览开关
    if (elements.checkPreview) {
        elements.checkPreview.addEventListener('change', (e) => {
            AppState.showPreview = e.target.checked;
            elements.demoArea.style.display = AppState.showPreview ? 'flex' : 'none';
            showNotification(AppState.showPreview ? '预览区域已显示' : '预览区域已隐藏', 'info');
        });
    }
    
    // 字体大小调节
    if (elements.fontSizeRange) {
        elements.fontSizeRange.addEventListener('input', (e) => {
            AppState.fontSize = e.target.value;
            elements.fontOutput.textContent = `${AppState.fontSize}rem`;
            elements.outputText.style.fontSize = `${AppState.fontSize}rem`;
        });
    }
    
    // 动画样式选择
    if (elements.animationStyle) {
        elements.animationStyle.addEventListener('change', (e) => {
            AppState.animationStyle = e.target.value;
            showNotification(`动画样式已改为: ${e.target.options[e.target.selectedIndex].text}`, 'info');
        });
    }
    
    // 文本输入
    if (elements.inputText) {
        elements.inputText.addEventListener('input', (e) => {
            AppState.textContent = e.target.value;
            updateOutputText();
        });
    }
    
    // 动画按钮
    if (elements.animateBtn) {
        elements.animateBtn.addEventListener('click', () => {
            if (elements.animatedElement) {
                elements.animatedElement.classList.remove('animate');
                void elements.animatedElement.offsetWidth; // 触发重排
                elements.animatedElement.classList.add('animate');
                showNotification('执行动画！', 'info');
            }
        });
    }
    
    // 清除按钮
    if (elements.clearBtn) {
        elements.clearBtn.addEventListener('click', () => {
            if (elements.inputText) {
                elements.inputText.value = '';
                AppState.textContent = '';
            }
            updateOutputText();
            showNotification('文本已清除', 'info');
        });
    }
    
    // 重置按钮
    if (elements.resetBtn) {
        elements.resetBtn.addEventListener('click', () => {
            resetControls();
            showNotification('控制面板已重置', 'info');
        });
    }
}

// 更新输出文本
function updateOutputText() {
    if (elements.outputText) {
        if (AppState.textContent) {
            elements.outputText.textContent = AppState.textContent;
        } else {
            elements.outputText.textContent = '开始输入文本...';
            elements.outputText.style.opacity = '0.5';
        }
    }
}

// 重置控制面板
function resetControls() {
    AppState.animationEnabled = true;
    AppState.showPreview = true;
    AppState.textContent = '';
    AppState.fontSize = 1.25;
    AppState.animationStyle = 'bounce';
    
    if (elements.checkAnimation) elements.checkAnimation.checked = true;
    if (elements.checkPreview) elements.checkPreview.checked = true;
    if (elements.fontSizeRange) elements.fontSizeRange.value = 1.25;
    if (elements.fontOutput) elements.fontOutput.textContent = '1.25rem';
    if (elements.animationStyle) elements.animationStyle.value = 'bounce';
    if (elements.inputText) elements.inputText.value = '';
    
    if (elements.demoArea) elements.demoArea.style.display = 'flex';
    if (elements.outputText) {
        elements.outputText.style.fontSize = '1.25rem';
        elements.outputText.textContent = '开始输入文本...';
        elements.outputText.style.opacity = '0.5';
    }
}

// 初始化模态框系统
function initModalSystem() {
    const openModalBtns = document.querySelectorAll('[data-modal="open"]');
    
    // 打开模态框
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (elements.modal) {
                elements.modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // 关闭模态框
    if (elements.modalClose) {
        elements.modalClose.addEventListener('click', closeModal);
    }
    
    if (elements.modal) {
        // 点击背景关闭
        elements.modal.addEventListener('click', (e) => {
            if (e.target === elements.modal) {
                closeModal();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
}

// 关闭模态框
function closeModal() {
    if (elements.modal) {
        elements.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// 初始化通知系统
function initNotificationSystem() {
    // 通知样式
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 2rem;
            z-index: 3000;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-xl);
            transform: translateX(400px);
            transition: transform var(--transition-base);
            max-width: 400px;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification.success { background: var(--success-color); color: white; }
        .notification.error { background: var(--accent-color); color: white; }
        .notification.info { background: var(--primary-color); color: white; }
    `;
    document.head.appendChild(style);
}

// 显示通知
function showNotification(message, type = 'info') {
    // 移除现有通知
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加图标
    const icon = document.createElement('i');
    if (type === 'success') icon.className = 'fas fa-check-circle';
    else if (type === 'error') icon.className = 'fas fa-exclamation-circle';
    else icon.className = 'fas fa-info-circle';
    
    icon.style.marginRight = '0.75rem';
    notification.insertBefore(icon, notification.firstChild);
    
    document.body.appendChild(notification);
    
    // 触发动画
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // 自动关闭
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 初始化英雄区域动画
function initHeroAnimation() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // 随机浮动路径
        card.style.animation = `float 6s ease-in-out infinite ${index * 0.5}s`;
        
        // 鼠标悬停效果
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// 初始化功能卡片
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            showNotification(`您点击了：${title}`, 'info');
            
            // 添加点击反馈
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
}

// 初始化演示区域
function initDemoArea() {
    if (elements.animatedElement) {
        // 鼠标悬停效果
        elements.animatedElement.addEventListener('mouseenter', () => {
            if (AppState.animationEnabled) {
                elements.animatedElement.style.transform = 'scale(1.1) rotate(10deg)';
            }
        });
        
        elements.animatedElement.addEventListener('mouseleave', () => {
            elements.animatedElement.style.transform = '';
        });
        
        // 点击效果
        elements.animatedElement.addEventListener('click', () => {
            if (AppState.animationEnabled) {
                elements.animatedElement.classList.remove('animate');
                void elements.animatedElement.offsetWidth;
                elements.animatedElement.classList.add('animate');
                showNotification('演示元素被点击！', 'info');
            }
        });
    }
}

// 初始化反馈轮播
function initFeedbackCarousel() {
    const carousel = document.querySelector('.carousel-track');
    
    if (carousel) {
        // 暂停轮播
        carousel.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });
        
        // 继续轮播
        carousel.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
        });
    }
}

// 平滑滚动
function smoothScrollTo(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
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

// 监听窗口大小变化
window.addEventListener('resize', debounce(() => {
    // 重置移动端菜单
    if (window.innerWidth > 768 && elements.navContainer) {
        elements.navContainer.classList.remove('active');
        if (elements.mobileMenuBtn) {
            elements.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    updateActiveNavLink();
}, 250));

// 页面加载完成后的额外效果
window.addEventListener('load', () => {
    // 页面加载完成通知
    showNotification('页面加载完成！', 'success');
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});