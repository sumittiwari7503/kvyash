import { callGemini } from './gemini';
import { callGroq } from './groq';
import { callOpenRouter } from './openrouter';

function validateResponse(reply: string): string | null {
  if (!reply) return null;
  let clean = reply.trim();
  
  // Strip accidental metadata like {"response": "..."} if a model hallucinates json
  if (clean.startsWith('{') && clean.endsWith('}')) {
    try {
      const parsed = JSON.parse(clean);
      if (parsed && typeof parsed.response === 'string') {
        clean = parsed.response;
      }
    } catch {}
  }

  // Reject secrets / api keys
  if (clean.match(/sk-[a-zA-Z0-9]{20,}/) || clean.match(/AIza[0-9A-Za-z-_]{35}/)) {
    return null;
  }

  // Reject obvious AI assistant leaks
  if (clean.toLowerCase().includes("as an ai language model") || clean.toLowerCase().includes("i am an ai")) {
    return null;
  }

  if (clean.length === 0) return null;
  return clean;
}

let geminiCooldown = 0;
let groqCooldown = 0;
let openRouterCooldown = 0;
const COOLDOWN_MS = 60000;

export async function routeAiQuery(message: string, language: string, context?: string): Promise<string> {
  const now = Date.now();

  let langInstruction = "";
  if (language === "hi") {
    langInstruction = "The response MUST be in Hindi (using Devanagari script). Do NOT use Latin script.";
  } else if (language === "hinglish") {
    langInstruction = "The response MUST be in Hinglish (using Latin script, i.e., Hindi words in English alphabet). Do NOT use Devanagari script.";
  } else {
    langInstruction = "The response MUST be in English.";
  }

  const messageWithLang = `${message}\n\n[Instruction: ${langInstruction}]`;

  // 1. Try Gemini
  if (now > geminiCooldown) {
    try {
      const rawReply = await callGemini(messageWithLang, context);
      const valid = validateResponse(rawReply);
      if (valid) return valid;
    } catch (error) {
      console.error("Gemini failed:", error);
      geminiCooldown = Date.now() + COOLDOWN_MS;
    }
  }

  // 2. Fallback to Groq
  if (now > groqCooldown) {
    try {
      const rawReply = await callGroq(messageWithLang, context);
      const valid = validateResponse(rawReply);
      if (valid) return valid;
    } catch (error) {
      console.error("Groq failed:", error);
      groqCooldown = Date.now() + COOLDOWN_MS;
    }
  }

  // 3. Fallback to OpenRouter
  if (now > openRouterCooldown) {
    try {
      const rawReply = await callOpenRouter(messageWithLang, context);
      const valid = validateResponse(rawReply);
      if (valid) return valid;
    } catch (error) {
      console.error("OpenRouter failed:", error);
      openRouterCooldown = Date.now() + COOLDOWN_MS;
    }
  }

  // 4. Safe fallback message
  if (language === "hi") {
    return "मैं अभी इसका सत्यापित उत्तर नहीं दे सकता, और मैं अंदाज़ा नहीं लगाना चाहता। मैं आपको KVYASH सेवाओं, प्रोजेक्ट प्लानिंग या टेक्नोलॉजी कंसल्टिंग में मदद कर सकता हूँ। या फिर आप मुझे बता सकते हैं कि आप क्या बनाना चाहते हैं और मैं उसका दायरा (scope) तय करूँगा।";
  }
  if (language === "hinglish") {
    return "Main abhi iska verify kiya hua jawab nahi de sakta, aur main guess nahi karna chahta. Main aapko KVYASH services, project planning ya technology consulting me madad kar sakta hoon. Ya fir aap mujhe bata sakte hain ki aap kya banana chahte hain aur main use scope karunga.";
  }
  return "I don't have enough verified information to answer that accurately right now, and I don't want to guess. I can still help with KVYASH services, technology consulting, AI & automation, project planning, or you can tell me what you're trying to build and I'll help you scope it.";
}
