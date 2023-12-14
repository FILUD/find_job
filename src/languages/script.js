// Function to set the selected language in local storage
function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    applyLanguage();
  }
  
  // Function to apply the selected language when the page loads
  function applyLanguage() {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    
    // Default language is English
    let language = 'en';
    
    if (preferredLanguage === 'th') {
      language = 'th';
    } else if (preferredLanguage === 'lo') {
      language = 'lo';
    }
    
    // Apply the selected language
    document.documentElement.lang = language;
  }
  
  // Apply the selected language when the page loads
  applyLanguage();
  