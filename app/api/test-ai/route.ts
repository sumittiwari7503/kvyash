import { NextResponse } from 'next/server';

interface ApiTestResult {
  keyPrefix?: string;
  statusCode?: number;
  body?: string;
  error?: string;
}

export async function GET() {
  const results: Record<string, ApiTestResult> = {
    gemini: {},
    groq: {},
    openrouter: {}
  };

  // 1. Test Gemini
  try {
    const key = (process.env.GEMINI_API_KEY || "").trim();
    results.gemini.keyPrefix = key ? key.slice(0, 6) + '...' : 'none';
    if (key) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Hello" }] }]
        })
      });
      results.gemini.statusCode = res.status;
      results.gemini.body = await res.text();
    } else {
      results.gemini.error = "Not configured";
    }
  } catch (err: unknown) {
    results.gemini.error = err instanceof Error ? err.message : String(err);
  }

  // 2. Test Groq/xAI
  try {
    const key = (process.env.GROQ_API_KEY || "").trim();
    results.groq.keyPrefix = key ? key.slice(0, 6) + '...' : 'none';
    if (key) {
      const isXaiGrok = key.startsWith('xai-');
      const url = isXaiGrok 
        ? 'https://api.x.ai/v1/chat/completions' 
        : 'https://api.groq.com/openai/v1/chat/completions';
      const model = isXaiGrok ? 'grok-2' : 'llama3-8b-8192';
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: "Hello" }]
        })
      });
      results.groq.statusCode = res.status;
      results.groq.body = await res.text();
    } else {
      results.groq.error = "Not configured";
    }
  } catch (err: unknown) {
    results.groq.error = err instanceof Error ? err.message : String(err);
  }

  // 3. Test OpenRouter
  try {
    const key = (process.env.OPENROUTER_API_KEY || "").trim();
    results.openrouter.keyPrefix = key ? key.slice(0, 9) + '...' : 'none';
    if (key) {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
          model: "google/gemma-2-9b-it:free",
          messages: [{ role: "user", content: "Hello" }]
        })
      });
      results.openrouter.statusCode = res.status;
      results.openrouter.body = await res.text();
    } else {
      results.openrouter.error = "Not configured";
    }
  } catch (err: unknown) {
    results.openrouter.error = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json(results);
}
