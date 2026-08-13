import { NextResponse } from 'next/server';
import { callGemini } from '@/lib/ai/gemini';
import { callGroq } from '@/lib/ai/groq';
import { callOpenRouter } from '@/lib/ai/openrouter';

interface TestResult {
  status: string;
  configured?: boolean;
  keyPrefix?: string;
  response?: string;
  error?: string;
}

export async function GET() {
  const results: Record<string, TestResult> = {
    gemini: { status: 'untested' },
    groq: { status: 'untested' },
    openrouter: { status: 'untested' }
  };

  // 1. Test Gemini
  try {
    const key = process.env.GEMINI_API_KEY;
    results.gemini.configured = !!key;
    results.gemini.keyPrefix = key ? key.slice(0, 6) + '...' : 'none';
    if (key) {
      const response = await callGemini("Hello, reply with the word 'OK' only.");
      results.gemini.status = 'success';
      results.gemini.response = response;
    }
  } catch (error: unknown) {
    results.gemini.status = 'error';
    results.gemini.error = error instanceof Error ? error.message : String(error);
  }

  // 2. Test Groq/Grok
  try {
    const key = process.env.GROQ_API_KEY;
    results.groq.configured = !!key;
    results.groq.keyPrefix = key ? key.slice(0, 6) + '...' : 'none';
    if (key) {
      const response = await callGroq("Hello, reply with the word 'OK' only.");
      results.groq.status = 'success';
      results.groq.response = response;
    }
  } catch (error: unknown) {
    results.groq.status = 'error';
    results.groq.error = error instanceof Error ? error.message : String(error);
  }

  // 3. Test OpenRouter
  try {
    const key = process.env.OPENROUTER_API_KEY;
    results.openrouter.configured = !!key;
    results.openrouter.keyPrefix = key ? key.slice(0, 9) + '...' : 'none';
    if (key) {
      const response = await callOpenRouter("Hello, reply with the word 'OK' only.");
      results.openrouter.status = 'success';
      results.openrouter.response = response;
    }
  } catch (error: unknown) {
    results.openrouter.status = 'error';
    results.openrouter.error = error instanceof Error ? error.message : String(error);
  }

  return NextResponse.json(results);
}
