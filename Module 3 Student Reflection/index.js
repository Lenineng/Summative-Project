/**
 * Student Reflection Page - Main JavaScript Module
 * Handles internationalization, user interactions, and data persistence
 */

class StudentReflectionApp {
    constructor() {
        this.currentLanguage = 'en';
        this.reflectionData = {
            question1: '',
            question2: '',
            question3: '',
            timestamp: null,
            language: 'en'
        };
        this.autoSaveTimer = null;
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Show loading overlay
        this.showLoading();

        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    /**
     * Initialize app after DOM is ready
     */
    initializeApp() {
        // Detect and set initial language
        this.currentLanguage = this.detectInitialLanguage();
        
        // Load saved reflection data
        this.loadReflectionData();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Apply initial translations
        this.switchLanguage(this.currentLanguage);
        
        // Setup auto-save functionality
        this.setupAutoSave();
        
        // Initialize animations
        this.initializeAnimations();
        
        // Hide loading overlay
        setTimeout(() => {
            this.hideLoading();
        }, 800);
    }

    /**
     * Detect initial language based on saved preference or browser settings
     */
    detectInitialLanguage() {
        // Check localStorage first
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && TranslationUtils.isLanguageSupported(savedLang)) {
            return savedLang;
        }

        // Fall back to browser language detection
        return TranslationUtils.detectBrowserLanguage();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Language switcher buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetLang = e.currentTarget.dataset.lang;
                this.switchLanguage(targetLang);
            });
        });

        // Textarea input handlers for auto-save
        const textareas = document.querySelectorAll('.answer-area');
        textareas.forEach((textarea, index) => {
            const questionKey = `question${index + 1}`;
            
            // Load saved content
            textarea.value = this.reflectionData[questionKey] || '';
            
            // Input event for auto-save
            textarea.addEventListener('input', (e) => {
                this.reflectionData[questionKey] = e.target.value;
                this.scheduleAutoSave();
            });

            // Focus and blur effects
            textarea.addEventListener('focus', function() {
                this.parentElement.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            textarea.addEventListener('blur', function() {
                this.parentElement.parentElement.style.transform = 'scale(1)';
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S to save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveReflectionData();
                this.showNotification(TranslationUtils.getTranslation(this.currentLanguage, 'saved'));
            }
        });

        // Window beforeunload to save data
        window.addEventListener('beforeunload', () => {
            this.saveReflectionData();
        });
    }

    /**
     * Switch language and update all content
     */
    switchLanguage(lang) {
        if (!TranslationUtils.isLanguageSupported(lang)) {
            console.warn(`Language ${lang} not supported, falling back to English`);
            lang = 'en';
        }

        this.currentLanguage = lang;
        this.reflectionData.language = lang;
        
        // Save preference
        localStorage.setItem('preferredLanguage', lang);
        
        // Update document language attribute
        document.documentElement.lang = lang;
        
        // Update active button state
        this.updateLanguageButtons(lang);
        
        // Apply translations
        this.applyTranslations();
        
        // Save the language change
        this.saveReflectionData();
        
        // Add transition effect
        document.querySelector('.container').classList.add('fade-in');
        setTimeout(() => {
            document.querySelector('.container').classList.remove('fade-in');
        }, 600);
    }

    /**
     * Update language button states
     */
    updateLanguageButtons(activeLang) {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === activeLang);
        });
    }

    /**
     * Apply translations to all elements
     */
    applyTranslations() {
        const currentTranslations = translations[this.currentLanguage];

        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (currentTranslations[key]) {
                element.textContent = currentTranslations[key];
            }
        });

        // Update placeholder texts
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            if (currentTranslations[key]) {
                element.placeholder = currentTranslations[key];
            }
        });

        // Update page title
        document.title = currentTranslations.title;

        // Update document direction if needed (for RTL languages)
        const metadata = TranslationUtils.getLanguageMetadata(this.currentLanguage);
        document.documentElement.dir = metadata.direction;
    }

    /**
     * Setup auto-save functionality
     */
    setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            this.saveReflectionData();
        }, 30000);
    }

    /**
     * Schedule auto-save with debouncing
     */
    scheduleAutoSave() {
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }
        
        this.autoSaveTimer = setTimeout(() => {
            this.saveReflectionData();
        }, 2000); // Save 2 seconds after user stops typing
    }

    /**
     * Save reflection data to localStorage
     */
    saveReflectionData() {
        this.reflectionData.timestamp = new Date().toISOString();
        localStorage.setItem('reflectionData', JSON.stringify(this.reflectionData));
    }

    /**
     * Load reflection data from localStorage
     */
    loadReflectionData() {
        const saved = localStorage.getItem('reflectionData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.reflectionData = { ...this.reflectionData, ...data };
            } catch (e) {
                console.warn('Error loading saved reflection data:', e);
            }
        }
    }

    /**
     * Initialize animations and scroll effects
     */
    initializeAnimations() {
        // Add intersection observer for question cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe question cards
        document.querySelectorAll('.question-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }

    /**
     * Show loading overlay
     */
    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('show');
        }
    }

    /**
     * Hide loading overlay
     */
    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }

    /**
     * Show notification message
     */
    showNotification(message, type = 'success') {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.className = `notification ${type} show`;

        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    /**
     * Get reflection summary for submission
     */
    getReflectionSummary() {
        return {
            ...this.reflectionData,
            submittedAt: new Date().toISOString(),
            language: this.currentLanguage,
            wordCounts: {
                question1: this.countWords(this.reflectionData.question1),
                question2: this.countWords(this.reflectionData.question2),
                question3: this.countWords(this.reflectionData.question3)
            }
        };
    }

    /**
     * Count words in text
     */
    countWords(text) {
        return text ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
    }

    /**
     * Export reflection data as JSON
     */
    exportData() {
        const data = this.getReflectionSummary();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reflection-${new Date().getTime()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

/**
 * Submit reflection function (called from HTML)
 */
function submitReflection() {
    const app = window.reflectionApp;
    if (!app) return;

    // Show loading
    app.showLoading();

    // Simulate submission process
    setTimeout(() => {
        const summary = app.getReflectionSummary();
        console.log('Reflection submitted:', summary);
        
        // Save final version
        app.saveReflectionData();
        
        // Show success message
        const message = TranslationUtils.getTranslation(app.currentLanguage, 'submitted');
        app.showNotification(message, 'success');
        
        // Hide loading
        app.hideLoading();
        
        // Optional: Export data automatically
        // app.exportData();
    }, 1500);
}

/**
 * Add notification styles dynamically
 */
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.notification.success {
    background: linear-gradient(135deg, #4CAF50, #45a049);
}

.notification.error {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.notification.show {
    transform: translateX(0);
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize the application
window.reflectionApp = new StudentReflectionApp();