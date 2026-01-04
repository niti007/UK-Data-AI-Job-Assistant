const API_CONFIG = {
  endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/',
  model: 'gemini-3-flash-preview' 
};

const SYSTEM_PROMPT = `You are a specialist UK Careers Consultant for Data & AI roles. 

Your goal is to provide a GAP ANALYSIS and TAILORED CONTENT based ONLY on the evidence in the candidate's CV.

STRICT FORMATTING RULE: 
- DO NOT use any markdown formatting. 
- DO NOT use double asterisks (**) for bolding. 
- DO NOT use italics or underscores.
- Provide the output in clean, plain text only.

RULES:
1. NO HALLUCINATIONS: Do not state the candidate has used a tool (like SAP or LIMS) if it's not in their CV.
2. NO "WILLING TO LEARN" FLUFF: Do not write bullet points about "willingness to apply logic" or "prepared to learn." Recruiters want to see what you HAVE done.
3. TRANSFERABLE SKILLS: If a tool is missing (e.g., PowerAutomate), find a similar experience (e.g., Python scripts) and phrase the bullet to highlight the "Automation Logic" rather than the specific tool name.
4. UK STYLE: Use British English (e.g., optimise, realise). Keep the cover note concise and professional, not overly "enthusiastic" or "salesy."

Format your response with these exact headers:
## Missing / Important Skills & Keywords
(List the top 5 keywords from the JD missing from the CV. If they are missing, suggest how to frame similar experience instead of lying.)

## Suggested CV Bullet Points
(Provide 3-5 high-impact bullets. Focus on ACHIEVEMENTS and RESULTS. Use the [Action Verb] + [Task] + [Result/Tool] formula.)

## Tailored Cover Note (UK Style)
(A professional 3-paragraph note. Paragraph 1: Interest in the specific company. Paragraph 2: Evidence of matching the top 2 technical requirements. Paragraph 3: Cultural fit and "call to action".)`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyseJob') {
    handleAnalyseJob(request.jobDescription, request.cv)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

async function handleAnalyseJob(jobDescription, cv) {
  // 1. Fetch the user's key from local storage
  const storage = await chrome.storage.local.get(['geminiApiKey']);
  const userKey = storage.geminiApiKey;

  if (!userKey) {
    throw new Error("API Key missing. Please enter your key in the extension settings below.");
  }

  const userPrompt = `JD:\n${jobDescription}\n\nCV:\n${cv}`;
  // 2. Use the dynamically retrieved key
  const url = `${API_CONFIG.endpoint}${API_CONFIG.model}:generateContent?key=${userKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: SYSTEM_PROMPT + "\n\n" + userPrompt }] }]
    })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'API Error');

  const text = data.candidates[0].content.parts[0].text;
  
  return {
    success: true,
    data: {
      missingSkills: text.match(/## Missing \/ Important Skills & Keywords\s*([\s\S]*?)(?=##|$)/i)?.[1].trim() || "No skills found.",
      bulletPoints: text.match(/## Suggested CV Bullet Points\s*([\s\S]*?)(?=##|$)/i)?.[1].trim() || "No bullets found.",
      coverNote: text.match(/## Tailored Cover Note \(UK Style\)\s*([\s\S]*?)(?=##|$)/i)?.[1].trim() || "No note found."
    }
  };
}