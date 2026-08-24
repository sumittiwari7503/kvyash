import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { routeAiQuery } from '@/lib/ai/router';

export async function POST(req: Request) {
 try {
 const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
 
 // Rate limit: 20 requests per minute per IP
 if (!checkRateLimit(ip, 20, 60000)) {
 return NextResponse.json({ reply: "You are sending messages too quickly. Please wait a moment." }, { status: 429 });
 }

 const body = await req.json();
 const { message, language, context } = body;

 if (!message || typeof message !== 'string' || message.trim().length === 0) {
 return NextResponse.json({ error: 'Message is required and must not be empty' }, { status: 400 });
 }

 if (message.length > 2000) {
 return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
 }

 const reply = await routeAiQuery(message, language || 'en', context);
 
 return NextResponse.json({ reply });
 } catch (error) {
 console.error('AI API Route Error:', error);
 return NextResponse.json({ reply: "I'm experiencing some technical difficulties. Could we discuss your project requirements instead?" }, { status: 500 });
 }
}
