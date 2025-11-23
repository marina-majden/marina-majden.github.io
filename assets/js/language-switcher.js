document.addEventListener('DOMContentLoaded', function() {
    // Initialize button and language check
    const toggleButton = document.getElementById('toggleLang');
    const currentLang = document.documentElement.lang;

    // Set button text based on current language
    toggleButton.textContent = currentLang === 'en' 
        ? 'HR' 
        : 'EN';

    // Add click event to toggle language
    toggleButton.addEventListener('click', function() {
        const newLang = currentLang === 'en' ? 'hr' : 'en';
        localStorage.setItem('preferredLang', newLang);
        window.location.href = newLang === 'en' ? 'index.html' : 'index-hr.html';
    });
/*
    // Check if stored language matches current page
    const preferredLang = localStorage.getItem('preferredLang');
    if (preferredLang && preferredLang !== currentLang) {
        window.location.href = preferredLang === 'en' ? 'index.html' : 'index-hr.html';
    } */
});