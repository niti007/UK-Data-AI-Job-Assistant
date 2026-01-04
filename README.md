🇬🇧 UK Data & AI Job Assistant
An intelligent Chrome Extension designed to help Data & AI professionals navigate the UK job market. It automatically extracts job descriptions from LinkedIn and Indeed, performs a gap analysis against your CV, and generates tailored, UK-style application content.

✨ Features
Automatic Extraction: Scrapes job descriptions directly from LinkedIn and Indeed (UK & US) using dynamic selectors.

Gap Analysis: Identifies top missing keywords and suggests how to frame transferable skills without hallucinations.

UK-Tailored CV Bullets: Generates achievement-focused bullets using British English (e.g., optimise, realise).

Professional Cover Notes: Creates concise, 3-paragraph cover letters focused on technical evidence and cultural fit.

Privacy First: Your CV and API key are stored locally in your browser, not on external servers.

🛠️ Installation (Developer Mode)
Since this extension is in development, follow these steps to install it manually:

1. Prepare the Files
Download or create a folder named uk-job-assistant and include the following files from this repository:

manifest.json

content_script.js

background.js

popup.html

popup.js

popup.css

2. Load into Chrome
Open Chrome and navigate to chrome://extensions/.

Enable Developer mode using the toggle in the top right corner.

Click Load unpacked in the top left.

Select your uk-job-assistant folder.

🔑 Setup
This extension uses the Gemini 1.5 Flash model to process data.

Get an API Key: Visit Google AI Studio and generate a free API key.

Configure the Extension: Click the extension icon in your toolbar, paste your key into the API Settings section, and click Save.

🚀 How to Use
Browse Jobs: Open a job posting on LinkedIn or Indeed.

Open Assistant: Click the extension icon. The job description will be automatically populated.

Input CV: Paste your current CV text into the "Your CV" box (it will be saved for future use).

Generate: Click ✨ Analyse & Generate.

Review: Receive your gap analysis, suggested bullets, and a tailored cover note instantly.

📝 Technical Details
Manifest V3: Built using the latest Chrome extension standards.

Permissions: Uses activeTab, scripting, and storage to interact with job sites and save your preferences securely.

AI Engine: Integrates with the Google Generative Language API (gemini-1.5-flash).

⚖️ Disclaimer
This tool is a careers consultant assistant. Always review and verify AI-generated content before submitting job applications to ensure accuracy and personal authenticity.
