# 🇬🇧 UK Data & AI Job Assistant

An intelligent Chrome Extension designed specifically for Data & AI professionals in the UK market. This tool automates the tedious parts of job applications by extracting job details and using AI to align your experience with recruiter expectations.

---

## ✨ Features

* **Smart Extraction**: Automatically pulls job descriptions from LinkedIn and Indeed using custom selectors.
* **Gap Analysis**: Identifies the top 5 missing keywords from the JD and suggests how to frame transferable skills.
* **Achievement-Focused Bullets**: Generates CV points using the `[Action Verb] + [Task] + [Result]` formula.
* **UK-Style Cover Notes**: Drafts professional, non-salesy cover letters using British English (e.g., *optimise*, *analysing*).
* **Privacy-Centric**: Your CV and API Key are stored locally on your machine via `chrome.storage`.

---

## 🛠️ Installation (Developer Mode)

Since this extension is not currently on the Chrome Web Store, you can install it manually:

### 1. Organize Your Files
Ensure the following files are saved together in a single folder named `uk-job-assistant`:

* `manifest.json`
* `content_script.js`
* `background.js`
* `popup.html`
* `popup.js`
* `popup.css`

### 2. Load the Extension
1.  Open Google Chrome and go to `chrome://extensions/`.
2.  In the top right, toggle **Developer mode** to **ON**.
3.  Click the **Load unpacked** button that appears.
4.  Select your `uk-job-assistant` folder.

---

## 🔑 Setup & Configuration

This extension requires a **Gemini API Key** to perform the analysis.

1.  **Get a Key**: Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).
2.  **Save the Key**: 
    * Click the **Puzzle Piece** icon in Chrome and pin the **UK Job Assistant**.
    * Open the extension, paste your key into the **API Settings** box, and click **Save**.

---

## 🚀 How to Use

1.  **Navigate**: Open a job posting on LinkedIn or Indeed.
2.  **Open**: Click the extension icon. The job description should be automatically filled in.
3.  **Paste CV**: Input your current CV text (this is saved locally so you only have to do it once).
4.  **Analyse**: Click **✨ Analyse & Generate**.
5.  **Apply**: Review the gap analysis and copy the tailored content into your application.

---

## ⚖️ Disclaimer

This tool is a careers consultant assistant. Always review and verify AI-generated content before submitting job applications to ensure accuracy and personal authenticity.
