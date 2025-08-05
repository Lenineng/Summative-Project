/**
 * Translation Dictionary for Student Reflection Page
 * Supports English and French languages
 */

const translations = {
    // English (Default)
    en: {
        title: "Student Course Reflection",
        greeting: "Welcome! Please share your thoughts about the course.",
        intro: "Your feedback is valuable to us. Please take a few minutes to reflect on your learning experience.",
        
        question1: "What did you enjoy most about the course?",
        question2: "What was the most challenging part of the course?",
        question3: "What could be improved about the course?",
        
        answer1_placeholder: "Share what you found most engaging, interesting, or valuable in this course...",
        answer2_placeholder: "Describe any difficulties, obstacles, or challenging concepts you encountered...",
        answer3_placeholder: "Suggest any improvements, changes, or additional resources that would enhance the course...",
        
        submit_btn: "Submit Reflection",
        footer: "Thank you for taking the time to reflect on your learning experience!",
        loading: "Loading...",
        
        // Status messages
        saved: "Your responses have been saved",
        submitted: "Thank you! Your reflection has been submitted successfully.",
        error: "An error occurred. Please try again."
    },
    
    // French
    fr: {
        title: "Réflexion Étudiante sur le Cours",
        greeting: "Bienvenue ! Veuillez partager vos réflexions sur le cours.",
        intro: "Vos commentaires sont précieux pour nous. Veuillez prendre quelques minutes pour réfléchir à votre expérience d'apprentissage.",
        
        question1: "Qu'avez-vous le plus apprécié dans ce cours ?",
        question2: "Quelle a été la partie la plus difficile du cours ?",
        question3: "Que pourrait-on améliorer dans ce cours ?",
        
        answer1_placeholder: "Partagez ce que vous avez trouvé le plus engageant, intéressant ou précieux dans ce cours...",
        answer2_placeholder: "Décrivez les difficultés, obstacles ou concepts difficiles que vous avez rencontrés...",
        answer3_placeholder: "Suggérez des améliorations, des changements ou des ressources supplémentaires qui amélioreraient le cours...",
        
        submit_btn: "Soumettre la Réflexion",
        footer: "Merci d'avoir pris le temps de réfléchir à votre expérience d'apprentissage !",
        loading: "Chargement...",
        
        saved: "Vos réponses ont été sauvegardées",
        submitted: "Merci ! Votre réflexion a été soumise avec succès.",
        error: "Une erreur s'est produite. Veuillez réessayer."
    }
};

/**
 * Language metadata for additional functionality
 */
const languageMetadata = {
    en: {
        name: "English",
        nativeName: "English",
        direction: "ltr",
        flag: "🇺🇸"
    },
    fr: {
        name: "French",
        nativeName: "Français",
        direction: "ltr",
        flag: "🇫🇷"
    }
};

/**
 * Utility functions for translation management
 */
const TranslationUtils = {
    /**
     * Get available languages
     */
    getAvailableLanguages() {
        return Object.keys(translations);
    },

    /**
     * Check if a language is supported
     */
    isLanguageSupported(lang) {
        return translations.hasOwnProperty(lang);
    },

    /**
     * Get translation for a specific key and language
     */
    getTranslation(lang, key) {
        if (!this.isLanguageSupported(lang)) {
            lang = 'en'; // Fallback to English
        }
        return translations[lang][key] || translations['en'][key] || key;
    },

    /**
     * Get language metadata
     */
    getLanguageMetadata(lang) {
        return languageMetadata[lang] || languageMetadata['en'];
    },

    /**
     * Detect browser language preference
     */
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0];
        return this.isLanguageSupported(shortLang) ? shortLang : 'en';
    }
};

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, languageMetadata, TranslationUtils };
}