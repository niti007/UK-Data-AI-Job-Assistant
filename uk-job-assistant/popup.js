document.addEventListener('DOMContentLoaded', () => {
  // Load saved data when popup opens
  chrome.storage.local.get(['jobDescription', 'cvText', 'geminiApiKey'], (data) => {
    if (data.jobDescription) document.getElementById('jobDescription').value = data.jobDescription;
    if (data.cvText) document.getElementById('cvText').value = data.cvText;
    if (data.geminiApiKey) document.getElementById('apiKeyInput').value = data.geminiApiKey;
  });

  // Save the API Key
  document.getElementById('saveKeyBtn').addEventListener('click', () => {
    const key = document.getElementById('apiKeyInput').value.trim();
    chrome.storage.local.set({ geminiApiKey: key }, () => {
      alert('API Key saved to your browser.');
    });
  });

  // Handle Analysis
  document.getElementById('analyseBtn').addEventListener('click', async () => {
    const jd = document.getElementById('jobDescription').value;
    const cv = document.getElementById('cvText').value;
    
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('resultsContainer').style.display = 'none';

    // Save CV so user doesn't have to re-paste every time
    chrome.storage.local.set({ cvText: cv });

    chrome.runtime.sendMessage({ action: 'analyseJob', jobDescription: jd, cv: cv }, (response) => {
      document.getElementById('loadingState').style.display = 'none';
      if (response && response.success) {
        document.getElementById('resultsContainer').style.display = 'block';
        document.getElementById('missingSkills').innerText = response.data.missingSkills;
        document.getElementById('bulletPoints').innerText = response.data.bulletPoints;
        document.getElementById('coverNote').innerText = response.data.coverNote;
      } else {
        const errorMsg = response ? response.error : "Unknown error";
        alert("Error: " + errorMsg);
      }
    });
  });
});