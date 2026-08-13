import { SYSTEM_PROMPT } from './prompts';

export async function callGroq(message: string, context?: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) throw new Error("GROQ_API_KEY is not set");

  const prompt = context ? `[Context: ${context}]\n\nUser: ${message}` : message;

  const isXaiGrok = apiKey.startsWith('xai-');
  const url = isXaiGrok 
    ? 'https://api.x.ai/v1/chat/completions' 
    : 'https://api.groq.com/openai/v1/chat/completions';
  const model = isXaiGrok ? 'grok-2' : 'llama3-8b-8192';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
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
    throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.choices || data.choices.length === 0) {
    throw new Error("No response from Groq");
  }

  return data.choices[0].message.content.trim();
}
