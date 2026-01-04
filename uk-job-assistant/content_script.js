(function() {
  // 1. The extraction logic
  function extractJobDescription() {
    const selectors = [
      '.jobs-description__content', 
      '#job-details', 
      '#jobDescriptionText', 
      '.jobsearch-jobDescriptionText',
      '.jobs-search__job-details--container'
    ];
    
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element && element.innerText.trim().length > 100) {
        return element.innerText.trim();
      }
    }
    return null;
  }

  // 2. The saving logic
  function saveJob() {
    const jdText = extractJobDescription();
    if (jdText) {
      chrome.storage.local.set({ jobDescription: jdText }, () => {
        console.log('Job description updated in storage.');
      });
    }
  }

  // 3. Listen for clicks and scroll changes (Dynamic Loading)
  // This watches the "body" for any changes to the text/HTML
  const observer = new MutationObserver(() => {
    saveJob();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Also run it immediately on load
  setTimeout(saveJob, 2000);
})();