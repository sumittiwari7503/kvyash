import { SYSTEM_PROMPT } from './prompts';

export async function callOpenRouter(message: string, context?: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not set");

  const prompt = context ? `[Context: ${context}]\n\nUser: ${message}` : message;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://kvyash.com', // Optional but recommended by OpenRouter
      'X-Title': 'KVYASH Assistant' // Optional but recommended
    },
    body: JSON.stringify({
      model: "openrouter/free", // Dynamic free fallback router
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 250
    }),
    signal: AbortSignal.timeout(8000)
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.choices || data.choices.length === 0) {
    throw new Error("No response from OpenRouter");
  }

  return data.choices[0].message.content.trim();
}
