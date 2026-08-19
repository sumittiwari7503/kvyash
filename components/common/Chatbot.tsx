"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, X, Send, Bot, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import companyData from "@/config/company.json";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface IntakeData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string; // Mapped category slug e.g. web-development
  serviceLabel: string; // Mapped category label e.g. Web Development
  requirements: string;
  timeline: string;
  budget: string;
  projectTypes: string[]; // multi-intent support
}

type ChatState =
  | "IDLE"
  | "PROJECT_DETECTED"
  | "SCOPING_PROJECT"
  | "ASK_CONTACT_NAME"
  | "ASK_CONTACT_EMAIL"
  | "ASK_OPTIONAL_COMPANY"
  | "ASK_OPTIONAL_PHONE"
  | "ASK_OPTIONAL_TIMELINE"
  | "ASK_OPTIONAL_BUDGET"
  | "ASK_PROJECT_TYPE"
  | "ASK_REQUIREMENTS"
  | "REVIEW"
  | "PROJECT_EDIT"
  | "SUBMITTING"
  | "SUCCESS"
  | "CANCELLED";

type LangType = "en" | "hi" | "hinglish";

type BotIntent =
  | "NONE"
  | "BUILD_SOMETHING"
  | "CONSULTANCY"
  | "OFFLINE_TO_ONLINE"
  | "MARKETPLACE"
  | "MARKETING_GROWTH"
  | "AI_AUTOMATION"
  | "NOT_SURE"
  | "GENERAL_SERVICE"
  // AI Sub-intents
  | "AI_BOT"
  | "AI_CRM"
  | "WA_CRM"
  | "EMAIL_AUTO"
  | "AI_CALLING"
  | "LEAD_MGMT"
  | "CUST_SUPPORT"
  | "WORKFLOW_AUTO"
  | "CUSTOM_AI_AGENT"
  | "AI_NOT_SURE";

const INITIAL_QUICK_ACTIONS = [
  { text: "Explore Services", type: "FAQ_SERVICES" },
  { text: "Explore AI & Automation", type: "FAQ_AI" },
  { text: "See Our Work", type: "FAQ_WORK" },
  { text: "Get Consultancy", type: "FAQ_CONSULTANCY" },
  { text: "Talk About a Project", type: "START_PROJECT" }
];

const QUICK_ACTIONS = INITIAL_QUICK_ACTIONS;

const SERVICE_SLUG_MAP: Record<string, string> = {
  "Website": "web-development",
  "E-commerce": "web-development",
  "SaaS": "saas-development",
  "AI & Automation": "ai-solutions",
  "Custom Software": "custom-software",
  "Mobile App": "application-development",
  "Technology Consulting": "technology-consulting",
  "Offline to Online": "digital-transformation",
  "Marketplace": "marketplace-development",
  "Marketing & Growth": "marketing-growth",
  "Other": "custom-software"
};

const checkIsScopingLabel = (label: string): boolean => {
  if (!label) return false;
  const l = label.toLowerCase();
  return (
    l.includes("e-commerce") ||
    l.includes("ecommerce") ||
    l.includes("saas") ||
    l.includes("ai solutions") ||
    l.includes("ai-automation") ||
    l.includes("business automation") ||
    l.includes("application development") ||
    l.includes("mobile app") ||
    l.includes("marketplace") ||
    l.includes("marketing") ||
    l.includes("chatbot") ||
    l.includes("automation")
  );
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTypingState, setIsTypingState] = useState(false);
  const [currentQuickActions, setCurrentQuickActions] = useState(INITIAL_QUICK_ACTIONS);

  const isProcessingRef = useRef(false);
  const isSubmittingRef = useRef(false);

  const isTyping = isTypingState;
  const setIsTyping = (val: boolean) => {
    setIsTypingState(val);
    isProcessingRef.current = val;
  };

  const startTyping = () => {
    setIsTyping(true);
  };

  const stopTyping = () => {
    setIsTyping(false);
  };

  const isSecurityAttack = (val: string): boolean => {
    const normalized = val.toLowerCase().trim();
    return (
      normalized.includes("ignore previous instructions") ||
      normalized.includes("ignore instructions") ||
      normalized.includes("your system prompt") ||
      normalized.includes("your api key") ||
      normalized.includes("your credentials") ||
      normalized.includes("your secret key") ||
      normalized.includes("show me your api key") ||
      normalized.includes("show me the api key") ||
      normalized.includes("give me api key") ||
      normalized.includes("reveal api key") ||
      normalized.includes("what is your api key") ||
      normalized.includes("what is your prompt") ||
      normalized.includes("system prompt leak") ||
      normalized.includes("leak prompt") ||
      normalized.includes("env var leak") ||
      normalized.includes("leak env") ||
      normalized.includes("show credentials") ||
      normalized.includes("reveal credentials") ||
      normalized.includes("give me your credentials")
    );
  };

  const isGibberish = (text: string): boolean => {
    const norm = text.toLowerCase().trim();
    if (norm.length < 3) return false;
    if (/^[bcdfghjklmnpqrstvwxyz]+$/.test(norm)) return true;
    if (/^(asdf|qwer|zxcv|dfgh|ghjk|hjkl|jklm)/.test(norm)) return true;
    if (/(.)\1\1\1/.test(norm)) return true;
    if (norm.split(/\s+/).length === 1 && norm.length >= 6 && !/[aeiouy]/i.test(norm)) return true;
    return false;
  };
  
  // Scoping Lead Capturing & State persistence
  const [chatState, setChatState] = useState<ChatState>("IDLE");
  const [language, setLanguage] = useState<LangType>("en");
  const [returnToReview, setReturnToReview] = useState(false);
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [lastEntityContext, setLastEntityContext] = useState<"NONE" | "FOUNDER" | "SERVICES" | "COMPANY">("NONE");
  
  const [intakeData, setIntakeData] = useState<IntakeData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    serviceLabel: "",
    requirements: "",
    timeline: "",
    budget: "",
    projectTypes: []
  });

  const [activeIntents, setActiveIntents] = useState<BotIntent[]>([]);
  const [currentIntentIndex, setCurrentIntentIndex] = useState(0);

  const [scopingStage, setScopingStage] = useState<
    | "NONE"
    // E-commerce
    | "ECOMM_PRODUCTS" | "ECOMM_PAYMENTS" | "ECOMM_INVENTORY" | "ECOMM_ADMIN"
    // SaaS
    | "SAAS_USERS" | "SAAS_WORKFLOW" | "SAAS_AUTH" | "SAAS_DASHBOARD" | "SAAS_BILLING" | "SAAS_INTEGRATIONS"
    // AI Chatbot
    | "BOT_PURPOSE" | "BOT_USERS" | "BOT_KNOWLEDGE" | "BOT_CHANNELS" | "BOT_LEAD_CAPTURE" | "BOT_HANDOFF"
    // Mobile App
    | "APP_PLATFORM" | "APP_TARGET_USER" | "APP_FEATURES" | "APP_AUTH" | "APP_BACKEND" | "APP_NOTIFICATIONS"
    // Automation
    | "AUTO_WORKFLOW" | "AUTO_TRIGGER" | "AUTO_ACTION" | "AUTO_TOOLS" | "AUTO_RESULT"
    // Consultancy Flow
    | "CONSULT_GOAL" | "CONSULT_PROBLEM" | "CONSULT_CUST_ACTION"
    // Offline to Online Flow
    | "OFFLINE_BIZ" | "OFFLINE_ACTION" | "OFFLINE_PAYMENTS" | "OFFLINE_DELIVERY" | "OFFLINE_MARKETING"
    // Marketplace Flow
    | "MARKET_TARGET" | "MARKET_MODEL" | "MARKET_ONBOARDING" | "MARKET_COMMISSION" | "MARKET_DASHBOARDS"
    // Marketing Flow
    | "MARKETING_BIZ" | "MARKETING_LIVE" | "MARKETING_GOAL" | "MARKETING_SEO"
    // CRM
    | "CRM_TYPE" | "CRM_USERS" | "CRM_FEATURES" | "CRM_PIPELINE" | "CRM_INTEGRATIONS" | "CRM_AUTOMATION" | "CRM_DASHBOARDS"
    // WhatsApp CRM
    | "WA_SETUP" | "WA_VOLUME" | "WA_FEATURES" | "WA_REPLIES" | "WA_FOLLOWUPS" | "WA_TEAM" | "WA_CRM"
    // Email Automation
    | "EMAIL_PLATFORM" | "EMAIL_TYPES" | "EMAIL_CLASSIFY" | "EMAIL_REPLIES" | "EMAIL_FOLLOWUPS" | "EMAIL_APPROVAL"
    // AI Calling Agent
    | "CALL_PURPOSE" | "CALL_DIRECTION" | "CALL_FEATURES" | "CALL_LANGUAGES" | "CALL_CRM" | "CALL_HANDOFF" | "CALL_LOGGING"
    // AI Top-level selector
    | "AI_SELECT_SUBTYPE"
  >("NONE");

  const [scopingData, setScopingData] = useState({
    // Ecomm
    ecommProducts: "", ecommPayments: "", ecommInventory: "", ecommAdmin: "",
    // SaaS
    saasUsers: "", saasWorkflow: "", saasAuth: "", saasDashboard: "", saasBilling: "", saasIntegrations: "",
    // Bot
    botPurpose: "", botUsers: "", botKnowledge: "", botChannels: "", botLeadCapture: "", botHandoff: "",
    // App
    appPlatform: "", appTargetUser: "", appFeatures: "", appAuth: "", appBackend: "", appNotifications: "",
    // Automation
    autoWorkflow: "", autoTrigger: "", autoAction: "", autoTools: "", autoResult: "",
    // Consultancy
    consultGoal: "", consultProblem: "", consultCustomerAction: "",
    // Offline to Online
    offlineBizType: "", offlineProcess: "", offlineDesiredAction: "", offlinePayments: "", offlineDelivery: "", offlineMarketing: "",
    // Marketplace
    marketType: "", marketProductOrService: "", marketMultiVendor: "", marketVendorOnboarding: "", marketCommission: "", marketDashboards: "",
    // Marketing
    marketingBusiness: "", marketingIsLive: "", marketingObjective: "", marketingChannels: "", marketingSEO: "",
    
    // CRM
    crmType: "", crmUsers: "", crmFeatures: "", crmPipeline: "", crmIntegrations: "", crmAutomation: "", crmDashboards: "",
    // WhatsApp CRM
    waSetup: "", waVolume: "", waFeatures: "", waReplies: "", waFollowups: "", waTeam: "", waCrm: "",
    // Email Automation
    emailPlatform: "", emailTypes: "", emailClassify: "", emailReplies: "", emailFollowups: "", emailApproval: "",
    // AI Calling Agent
    callPurpose: "", callDirection: "", callFeatures: "", callLanguages: "", callCrm: "", callHandoff: "", callLogging: "",
    
    // AI Selector
    aiSubtype: ""
  });
  
  const [consultancyState, setConsultancyState] = useState<
    | "NONE"
    | "WEB"
    | "MOBILE"
    | "SAAS"
    | "MARKET"
    | "AI"
    | "NOT_SURE"
    | "MOBILE_USER"
    | "WEB_FEATURES"
    | "MARKET_FEATURES"
    | "WEB_DONE"
    | "MOBILE_DONE"
    | "SAAS_DONE"
    | "MARKET_DONE"
    | "AI_DONE"
    | "NOT_SURE_DONE"
  >("NONE");

  const [awaitingSomethingElse, setAwaitingSomethingElse] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounterRef = useRef(0);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);



  const addBotMessage = (text: string) => {
    messageIdCounterRef.current += 1;
    const botMsg: Message = {
      id: `bot-${messageIdCounterRef.current}`,
      sender: "bot",
      text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, botMsg]);
  };

  // Initialize welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: "Hi, I'm the KVYASH Assistant. I can help you plan, build, launch, automate, or grow your digital business. What are you looking to achieve?",
          timestamp: new Date(),
        }
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);



  const handleSendRef = useRef<((text: string, typeKey?: string) => void) | null>(null);

  useEffect(() => {
    const handleStartProject = (e: Event) => {
      const customEv = e as CustomEvent<{ intent?: string }>;
      const targetIntent = customEv?.detail?.intent || "";
      setIsOpen(true);
      if (chatState === "IDLE") {
        if (targetIntent && handleSendRef.current) {
          let triggerText = "";
          if (targetIntent === "CONSULTANCY") triggerText = "Get Consultancy";
          else if (targetIntent === "OFFLINE_TO_ONLINE") triggerText = "Take My Business Online";
          else if (targetIntent === "MARKETPLACE") triggerText = "Build a Marketplace";
          else if (targetIntent === "MARKETING_GROWTH") triggerText = "Marketing & Growth";
          else if (targetIntent === "AI_AUTOMATION") triggerText = "AI & Automation";
          else if (targetIntent === "BUILD_SOMETHING") triggerText = "Build Something";
          else if (targetIntent === "NOT_SURE") triggerText = "Help Me Decide";

          if (triggerText) {
            handleSendRef.current(triggerText, targetIntent);
            return;
          }
        }

        setChatState("SCOPING_PROJECT");
        setIntakeData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          serviceLabel: "",
          requirements: "",
          timeline: "",
          budget: "",
          projectTypes: []
        });
        addBotMessage("Absolutely. I can help you scope the project.\nTell me what you'd like to build or improve, and I'll guide you through the requirements.");
      }
    };

    window.addEventListener("kvyash:start-project", handleStartProject);
    return () => {
      window.removeEventListener("kvyash:start-project", handleStartProject);
    };
  }, [chatState]);



  const detectLanguage = (text: string): LangType => {
    const normalized = text.toLowerCase().trim();
    
    // 1. Devanagari script is strictly Hindi
    if (/[\u0900-\u097F]/.test(text)) {
      return "hi";
    }

    // 2. Exact word boundaries check for Hinglish
    const hinglishPattern = /\b(mujhe|apna|apni|apne|banwani|banwana|chahiye|chahye|chaheye|karwani|karwana|karna|karke|kardo|aapse|kya|bhai|banani|hona|hoon|mera|meri|mere|banwani hai|banwana hai|banana hai|banwana)\b/i;
    if (hinglishPattern.test(normalized)) {
      return "hinglish";
    }

    return "en";
  };

  const cleanProjectTypeName = (text: string): string => {
    const prefixes = [
      "i want to build a", "i want to build an", "i want to build",
      "i want a", "i want an", "i need a", "i need an",
      "i have a project idea for a", "i have a project idea for an", "i have a project idea for",
      "need a", "need an", "want to launch a", "want to launch an", "want to launch",
      "build a", "build an", "create a", "create an", "develop a", "develop an", "make a", "make an",
      "mujhe ek", "ek", "banwana hai", "banwani hai", "banana hai", "banani hai"
    ];
    let cleaned = text.trim();
    let lowerCleaned = cleaned.toLowerCase();
    for (const prefix of prefixes) {
      if (lowerCleaned.startsWith(prefix + " ")) {
        cleaned = cleaned.substring(prefix.length + 1).trim();
        lowerCleaned = cleaned.toLowerCase();
      }
    }
    const suffixes = [
      "banwana hai", "banwani hai", "banana hai", "banani hai", "chahiye", "chahye", "chaheye", "karwana hai", "karwani hai"
    ];
    for (const suffix of suffixes) {
      if (lowerCleaned.endsWith(" " + suffix)) {
        cleaned = cleaned.substring(0, cleaned.length - (suffix.length + 1)).trim();
        lowerCleaned = cleaned.toLowerCase();
      }
    }
    return cleaned;
  };

  const isValidProjectType = (text: string): boolean => {
    const norm = text.toLowerCase().trim();
    const invalidInputs = [
      "hy", "hi", "hello", "hey", "hii", "hyy", "heyya", "yo",
      "reset", "reset chat", "start over", "restart", "clear chat", "new conversation",
      "that's it", "that its", "thats it", "done", "that's all", "nothing else", "no more",
      "ok", "okay", "hmm", "yes", "no", "haan", "nahi", "skip", "none", "yup", "nope"
    ];
    if (invalidInputs.includes(norm)) {
      return false;
    }
    if (norm === "ai") {
      return false;
    }
    if (norm.length < 3) {
      return false;
    }
    if (isGibberish(text)) {
      return false;
    }
    return true;
  };

  const isProjectIntent = (text: string): boolean => {
    const normalized = text.toLowerCase().trim();

    if (
      normalized.includes("don't know") ||
      normalized.includes("dont know") ||
      normalized.includes("not sure") ||
      normalized.includes("help me decide") ||
      normalized.includes("advice") ||
      normalized.includes("consult") ||
      normalized.includes("samajh nahi") ||
      normalized.includes("samajh nahi aa raha") ||
      normalized.includes("mujhe nahi pata") ||
      normalized.includes("app or website") ||
      normalized.includes("website or app") ||
      normalized.includes("app or web") ||
      normalized.includes("web or app")
    ) {
      return false;
    }

    const cleaned = cleanProjectTypeName(text);
    if (isValidProjectType(cleaned)) {
      return true;
    }
    // English actionable phrases/intent indicators
    const hasEnglishIntent =
      normalized.includes("i want to build") ||
      normalized.includes("i want to create") ||
      normalized.includes("i want a") ||
      normalized.includes("i need a") ||
      normalized.includes("i need an") ||
      normalized.includes("i have a project idea") ||
      normalized.includes("i need help building my project") ||
      normalized.includes("i need a digital solution for my business") ||
      normalized.includes("need custom software") ||
      normalized.includes("need automation") ||
      normalized.includes("need a website") ||
      normalized.includes("need a saas") ||
      normalized.includes("need an app") ||
      normalized.includes("need a chatbot") ||
      normalized.includes("need crm") ||
      normalized.includes("want to hire") ||
      normalized.includes("like to build") ||
      normalized.includes("like to hire") ||
      normalized.includes("can you build") ||
      normalized.includes("can you make") ||
      normalized.includes("can you develop") ||
      normalized.includes("need someone to") ||
      normalized.includes("want to launch") ||
      normalized.startsWith("build a ") ||
      normalized.startsWith("create a ") ||
      normalized.startsWith("develop a ") ||
      normalized.startsWith("make a ") ||
      normalized.startsWith("automate my ");

    // Hindi/Hinglish actionable phrases
    const hasHindiIntent =
      normalized.includes("banwana hai") ||
      normalized.includes("banwani hai") ||
      normalized.includes("banwana chahata") ||
      normalized.includes("banwani chahati") ||
      normalized.includes("banana hai") ||
      normalized.includes("banani hai") ||
      normalized.includes("mujhe apna project banana hai") ||
      normalized.includes("mujhe ek project build karwana hai") ||
      normalized.includes("business ko online lana") ||
      normalized.includes("whatsapp automation chahiye") ||
      normalized.includes("app ya website samajh nahi aa raha") ||
      normalized.includes("mujhe nahi pata mujhe kya banana chahiye") ||
      normalized.includes("website banwani hai") ||
      normalized.includes("mujhe apna project banana hai") ||
      normalized.includes("mujhe ek project build karwana hai") ||
      normalized.includes("business ko online lana") ||
      normalized.includes("whatsapp automation chahiye") ||
      normalized.includes("app ya website samajh nahi aa raha") ||
      normalized.includes("mujhe nahi pata mujhe kya banana chahiye") ||
      normalized.includes("website banwani hai") ||
      normalized.includes("online store banana hai") ||
      normalized.includes("apna business digital karna hai") ||
      normalized.includes("customers ke liye app chahiye") ||
      normalized.includes("ai se business automate karna hai") ||
      normalized.includes("whatsapp pe customers manage karne hain") ||
      normalized.includes("sales team ke liye crm chahiye") ||
      normalized.includes("calling agent banana hai") ||
      normalized.includes("email automatically send karni hai") ||
      normalized.includes("existing website ko improve karna hai") ||
      normalized.includes("karwana hai") ||
      normalized.includes("karwani hai") ||
      normalized.includes("online lana hai") ||
      normalized.includes("automate karna hai") ||
      normalized.includes("kaam karwana") ||
      normalized.includes("website chahiye") ||
      normalized.includes("crm chahiye") ||
      normalized.includes("app chahiye");

    return hasEnglishIntent || hasHindiIntent;
  };

  const detectProjectType = (text: string): { slug: string; label: string; list: string[] } => {
    const normalized = text.toLowerCase();
    const list: string[] = [];
    
    if (normalized.includes("ecommerce") || normalized.includes("e-commerce") || normalized.includes("online store") || normalized.includes("shopify") || normalized.includes("shopping")) {
      list.push("E-commerce");
    }
    if (normalized.includes("saas") || normalized.includes("subscription platform")) {
      list.push("SaaS");
    }
    if (normalized.includes("web app") || normalized.includes("web application") || normalized.includes("dashboard")) {
      list.push("Web Application");
    }
    if (normalized.includes("chatbot") || normalized.includes("ai solution") || normalized.includes("llm") || normalized.includes("gpt") || normalized.includes("support bot")) {
      list.push("AI Chatbot");
    }
    if (normalized.includes("automate") || normalized.includes("automation") || normalized.includes("workflow")) {
      list.push("AI Automation");
    }
    if (normalized.includes("app") || normalized.includes("android") || normalized.includes("ios") || normalized.includes("mobile application")) {
      list.push("Mobile App");
    }
    if (normalized.includes("website") || normalized.includes("site") || normalized.includes("web page")) {
      list.push("Website");
    }

    if (list.length > 0) {
      const primary = list[0];
      let slug = "custom-software";
      if (primary === "E-commerce" || primary === "Website") slug = "web-development";
      else if (primary === "SaaS" || primary === "Web Application") slug = "saas-development";
      else if (primary === "AI Chatbot") slug = "ai-solutions";
      else if (primary === "AI Automation") slug = "business-automation";
      else if (primary === "Mobile App") slug = "application-development";
      
      return { slug, label: list.join(" & "), list };
    }
    
    return { slug: "", label: "", list: [] };
  };

  // Helper to extract organization and other info from query
  const extractIntakeInfo = (text: string) => {
    const parsedData: Partial<IntakeData> = {};

    // 1. Detect category type
    const cleaned = cleanProjectTypeName(text);
    const detected = detectProjectType(cleaned);
    if (detected.slug) {
      parsedData.service = detected.slug;
      parsedData.serviceLabel = cleaned;
      parsedData.projectTypes = [cleaned];
    } else if (isValidProjectType(cleaned)) {
      parsedData.service = "custom-software";
      parsedData.serviceLabel = cleaned;
      parsedData.projectTypes = [cleaned];
    }

    // 2. Extract company/business name (e.g. clothing business)
    const forMyMatch = text.match(/for my\s+([a-zA-Z0-9\s]+?)(?:\s+with|\s+and|\.|\?|$)/i);
    const fromMatch = text.match(/from\s+([a-zA-Z0-9\s]+?)(?:\s+and|\s+i|\s+need|\.|\?|$)/i);
    const runMatch = text.match(/(?:run|business|company|chalata hoon|chalati hoon|owner of)\s+(?:a\s+)?([a-zA-Z0-9\s]+?)(?:\s+and|\s+i|\s+need|\.|\?|$)/i);
    if (forMyMatch) {
      parsedData.company = forMyMatch[1].trim();
    } else if (fromMatch) {
      parsedData.company = fromMatch[1].trim();
    } else if (runMatch) {
      parsedData.company = runMatch[1].trim();
    }

    // 3. Extract email address
    const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    if (emailMatch) {
      parsedData.email = emailMatch[1].trim();
    }

    // 4. Extract Name
    const nameMatch = text.match(/(?:my name is|i am|i'm|this is|mera naam|naam)\s+([a-zA-Z]+)/i);
    if (nameMatch) {
      parsedData.name = nameMatch[1].trim();
    }

    // 5. Extract Timeline
    const timelineMatch = text.match(/(?:within|in|timeline of|timeline:?\s*)\s*([0-9]+\s*(?:weeks?|months?|days?|year?s?))/i);
    if (timelineMatch) {
      parsedData.timeline = timelineMatch[0].trim();
    } else if (text.toLowerCase().includes("asap")) {
      parsedData.timeline = "ASAP";
    }

    // 6. Extract Requirements (text following "with" or "need" or "want")
    const reqWords = ["with", "need", "want", "requires", "features"];
    for (const word of reqWords) {
      if (text.toLowerCase().includes(` ${word} `)) {
        const parts = text.split(new RegExp(`\\b${word}\\b`, "i"));
        if (parts[1]) {
          parsedData.requirements = parts[1].trim();
          break;
        }
      }
    }

    return parsedData;
  };

  // Normal FAQ / QA Answers
  const getFaqResponse = (text: string, typeKey?: string, overrideLang?: LangType): string | null => {
    const normalized = text.toLowerCase().trim();
    const lang = overrideLang || detectLanguage(normalized);

    if (isSecurityAttack(normalized)) {
      return lang === "hi"
        ? "मैं सिस्टम कॉन्फ़िगरेशन, प्रॉम्प्ट या API कीज़ शेयर नहीं कर सकता। मैं KVYASH Technologies से जुड़े प्रश्न हल कर सकता हूँ।"
        : lang === "hinglish"
        ? "Main system configurations, prompts, ya API keys share nahi kar sakta. Main KVYASH Technologies se related queries solve kar sakta hoon."
        : "I cannot disclose system prompts, API keys, or security credentials. Let me know if you would like to ask about KVYASH services or projects.";
    }

    if (
      normalized.includes("fake") ||
      normalized.includes("fabricate") ||
      normalized.includes("invent") ||
      normalized.includes("generate review") ||
      normalized.includes("fake review") ||
      normalized.includes("fake client")
    ) {
      return lang === "hi"
        ? "हम क्लाइंट फीडबैक या स्टैटिस्टिक्स का निर्माण नहीं करते। हम केवल सत्यापित विवरण ही प्रदान करते हैं।"
        : lang === "hinglish"
        ? "Hum client feedback ya statistics fabricate nahi karte. Hum sabhi verified details hi target karte hain."
        : "KVYASH Technologies does not fabricate customer stories or generate fake testimonials. All client work is verified before publication.";
    }

    // Casual Greetings
    if (
      normalized === "hi" ||
      normalized === "hello" ||
      normalized === "hey" ||
      normalized === "yo" ||
      normalized.startsWith("hello ") ||
      normalized.startsWith("hi ") ||
      normalized.includes("how are you") ||
      normalized.includes("how's it going") ||
      normalized.includes("kya haal") ||
      normalized.includes("kaise ho")
    ) {
      return lang === "hi"
        ? "नमस्ते! मैं KVYASH Technologies असिस्टेंट हूँ। मैं ठीक हूँ। आप बताएं, मैं आपकी कैसे मदद कर सकता हूँ?"
        : lang === "hinglish"
        ? "Hi! Main KVYASH Technologies Assistant hoon. Main badhiya hoon. Aap bataiye, main aapki help kaise kar sakta hoon?"
        : "Hello! I'm the KVYASH Assistant. I can help you plan, build, launch, automate, or grow your digital business. What are you looking to achieve?";
    }

    // Casual Chat Closures / Thanks
    if (
      normalized === "thanks" ||
      normalized === "thank you" ||
      normalized.includes("shukriya") ||
      normalized.includes("dhanyawad") ||
      normalized === "ok" ||
      normalized === "okay" ||
      normalized === "great" ||
      normalized === "nice" ||
      normalized === "cool" ||
      normalized === "bye" ||
      normalized.startsWith("bye ") ||
      normalized.startsWith("good morning") ||
      normalized.startsWith("good evening") ||
      normalized.startsWith("good afternoon")
    ) {
      if (normalized.includes("thanks") || normalized.includes("thank you") || normalized.includes("shukriya")) {
        return lang === "hi"
          ? "आपका स्वागत है! अगर आप किसी प्रोजेक्ट को शुरू करना चाहते हैं, तो मुझे ज़रूर बताएं।"
          : lang === "hinglish"
          ? "Aapka swagat hai! Agar aap kisi project ko scope ya start karna chahte hain, toh mujhe zaroor batayein."
          : "You're welcome. If you want to discuss a project or explore what KVYASH can help with, I'm here.";
      }
      if (normalized.startsWith("good morning")) {
        return lang === "hi" ? "सुप्रभात! आज मैं आपकी कैसे मदद कर सकता हूँ?" : lang === "hinglish" ? "Good morning! Aaj main aapki kaise help kar sakta hoon?" : "Good morning! How can I help you today?";
      }
      if (normalized.startsWith("good evening") || normalized.startsWith("good afternoon")) {
        return lang === "hi" ? "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?" : lang === "hinglish" ? "Namaste! Aaj main aapki kaise help kar sakta hoon?" : "Hello! How can I help you today?";
      }
      if (normalized === "bye") {
        return lang === "hi" ? "अलविदा! आपका दिन शुभ हो।" : lang === "hinglish" ? "Alvida! Have a great day." : "Goodbye! Have a great day.";
      }
      return lang === "hi"
        ? "मैं आपकी डिजिटल सिस्टम आवश्यकताओं पर चर्चा करने के लिए तैयार हूँ। शुरू करें?"
        : lang === "hinglish"
        ? "Aapki digital system requirements discuss karne ke liye main ready hoon. Shuru karein?"
        : "I'm ready when you want to discuss your project or scoping details. Let me know!";
    }

    // Founder Experience check
    if (
      normalized.includes("experience") ||
      normalized.includes("coding duration") ||
      normalized.includes("years coding") ||
      normalized.includes("how long has your founder been working") ||
      normalized.includes("kitne saal ka") ||
      normalized.includes("kitne saal se") ||
      normalized.includes("saal ka experience") ||
      normalized.includes("experienced is sumit") ||
      normalized.includes("how experienced")
    ) {
      return lang === "hi"
        ? "वेबसाइट पर अभी सुमित तिवारी के प्रोफेशनल एक्सपीरियंस का सत्यापित वर्ष प्रकाशित नहीं है, इसलिए मैं अंदाज़ा नहीं लगाना चाहता। वह व्यावहारिक सॉफ्टवेयर इंजीनियरिंग, AI और ऑटोमेशन, डिजिटल प्रोडक्ट्स और टेक्नोलॉजी सॉल्यूशंस पर ध्यान केंद्रित करते हैं। आप उनके बारे में और विवरण About पेज पर देख सकते हैं।"
        : lang === "hinglish"
        ? "Website par abhi Sumit Tiwari ke professional experience ka verified years published nahi hai, isliye main guess ya fabricate nahi karna chahta. Woh practical software engineering, AI & automation, digital products aur technology solutions par focus karte hain. Aap unke baare me aur details About page par dekh sakte hain."
        : "The website currently doesn't publish a verified number of years of professional experience for Sumit Tiwari, so I don't want to guess or make up a figure.\n\nWhat I can tell you is that he focuses on practical software engineering, AI & automation, digital products, and technology solutions through KVYASH Technologies.\n\nYou can learn more about the founder on the About page.";
    }

    // Founder Role check
    if (
      normalized.includes("founder's role") ||
      normalized.includes("founder role") ||
      normalized.includes("what does the founder do") ||
      normalized.includes("what does he do") ||
      normalized.includes("what does sumit do") ||
      normalized.includes("founder kya kaam") ||
      normalized.includes("founder kya karte") ||
      normalized.includes("sumit's role") ||
      normalized.includes("what does sumit handle") ||
      normalized.includes("founder handles") ||
      normalized.includes("is the founder involved") ||
      normalized.includes("does the founder work on")
    ) {
      return lang === "hi"
        ? "KVYASH में फाउंडर का रोल उत्पाद खोज, व्यावसायिक आवश्यकताओं को समझना, तकनीकी योजना, सॉफ्टवेयर आर्किटेक्चर, वेब/सॉफ्टवेयर विकास, AI एकीकरण, ऑटोमेशन वर्कफ़्लो और इंजीनियरिंग के काम को संभालना है।"
        : lang === "hinglish"
        ? "KVYASH me founder ka role product discovery, business requirements samajhna, technical planning, software architecture, development, AI integration, automation workflows aur engineering execution oversee karna hai."
        : "The founder's role at KVYASH includes product discovery, understanding business requirements, technical planning, software architecture, web/software development, AI integration, automation workflows, and engineering execution.";
    }

    // Founder General check
    if (
      typeKey === "founder" ||
      normalized.includes("founder") ||
      normalized.includes("founded by") ||
      normalized.includes("who is the founder") ||
      normalized.includes("who founded") ||
      normalized.includes("who is behind") ||
      normalized.includes("sumit") ||
      normalized.includes("tiwari") ||
      normalized.includes("owner") ||
      normalized.includes("founder's approach")
    ) {
      return lang === "hi"
        ? "सुमित तिवारी KVYASH Technologies के फाउंडर और इंजीनियरिंग लीड हैं।\n\nउनका ध्यान व्यावहारिक सॉफ्टवेयर इंजीनियरिंग, AI सिस्टम, ऑटोमेशन, डिजिटल ट्रांसफॉर्मेशन और बिज़नेस-ओरिएंटेड डिजिटल प्रोडक्ट्स पर है।\nउनका दर्शन सरल है: 'पहले प्रॉब्लम को समझें। टेक्नोलॉजी का चयन बाद में करें। वही बनाएं जो वास्तविक वैल्यू क्रिएट करे।'\n\nक्या आप KVYASH की सेवाओं या फाउंडर के रोल के बारे में और जानना चाहेंगे?"
        : lang === "hinglish"
        ? "KVYASH Technologies ke founder Sumit Tiwari hain.\n\nUnka focus practical software engineering, AI systems, automation, digital transformation, aur business-oriented digital products par hai.\nUnki philosophy hai: 'Pehle problem samjhein. Phir technology chunein. Wahi banayein jo real value create kare.'\n\nKya aap KVYASH ki services ya founder ke role ke baare me aur janna chahenge?"
        : "Sumit Tiwari is the founder and engineering lead at KVYASH Technologies.\n\nHe focuses on practical software engineering, AI systems, automation, digital transformation, and business-oriented digital products.\nHis philosophy is simple: 'Understand the problem first. Choose the technology second. Build what creates real value.'\n\nWould you like to know more about KVYASH's services or the founder's role?";
    }

    // Company Age
    if (
      normalized.includes("when was kvyash founded") ||
      normalized.includes("how old is kvyash") ||
      normalized.includes("years has kvyash been operating") ||
      normalized.includes("company kab start") ||
      normalized.includes("kab start hui") ||
      normalized.includes("kab bani") ||
      normalized.includes("company age")
    ) {
      return lang === "hi"
        ? "मुझे अभी KVYASH की स्थापना के वर्ष का सत्यापित डेटा उपलब्ध नहीं है, इसलिए मैं अंदाज़ा नहीं लगाऊँगा।"
        : lang === "hinglish"
        ? "Mujhe abhi KVYASH ki founding year ka verified data available nahi hai, isliye main guess nahi karunga."
        : "I don't currently have a verified founding year published for KVYASH, so I don't want to guess.";
    }

    // Client/Company history
    if (
      normalized.includes("companies has he worked with") ||
      normalized.includes("companies has the founder worked with") ||
      normalized.includes("past clients") ||
      normalized.includes("previous companies") ||
      normalized.includes("how many clients")
    ) {
      return lang === "hi"
        ? "मेरे पास पिछले क्लाइंट या कंपनी प्रोजेक्ट्स की सत्यापित जानकारी नहीं है, इसलिए मैं अंदाज़ा नहीं लगाना चाहता।"
        : lang === "hinglish"
        ? "Mere paas previous client ya company engagements ka verified information nahi hai, isliye main guess ya fabricate nahi karna chahta."
        : "I don't have verified information about previous client or company engagements, so I don't want to make one up.";
    }

    // Guarantees
    if (
      normalized.includes("guarantee seo") ||
      normalized.includes("guarantee ranking") ||
      normalized.includes("guarantee sales") ||
      normalized.includes("guarantee revenue")
    ) {
      return lang === "hi"
        ? "हम SEO रैंकिंग, रेवेन्यू या कन्वर्जन की अवास्तविक गारंटी नहीं देते हैं। हम पूरी तरह से टेक्निकल ऑप्टिमाइज़ेशन और एथिकल मार्केटिंग पर ध्यान केंद्रित करते हैं।"
        : lang === "hinglish"
        ? "Hum SEO rankings, revenue, ya conversion ki artificial guarantees provide nahi karte. Hum purely technical optimizations aur ethical marketing par focus karte hain."
        : "We do not offer artificial guarantees for search rankings, conversions, or revenue. We focus strictly on technical optimizations, quality delivery, and ethical marketing practices.";
    }

    // General Business client types
    if (
      normalized.includes("who do you work with") ||
      normalized.includes("work with startups") ||
      normalized.includes("work with small business") ||
      normalized.includes("help an offline business") ||
      normalized.includes("help an existing company") ||
      normalized.includes("improve an existing website") ||
      normalized.includes("improve existing website") ||
      normalized.includes("work on an existing software") ||
      normalized.includes("kis type ke business")
    ) {
      return lang === "hi"
        ? "हम रिटेलर्स, स्टार्टअप्स और स्मॉल-टू-मीडियम बिज़नेस के साथ काम करते हैं जो वर्कफ़्लो को ऑटोमेट करना, कस्टम सॉफ्टवेयर बनाना, या ऑपरेशन्स को ऑनलाइन ट्रांसफ़र करना चाहते हैं।"
        : lang === "hinglish"
        ? "Hum retailers, startups, aur small-to-medium businesses ke sath kaam karte hain jo workflows automate karna, custom software build karna, ya operations online transition karna chahte hain."
        : "We work with brick-and-mortar retailers, startups, small-to-medium businesses, and existing companies that want to automate workflows, build custom software architectures, or move operations online.";
    }

    // Company Description
    if (
      normalized.includes("what is kvyash") ||
      normalized.includes("what do you do") ||
      normalized.includes("tell me about kvyash") ||
      normalized.includes("kvyash technologies") ||
      normalized.includes("who are you") ||
      normalized.includes("kya karti hai") ||
      normalized.includes("kya company hai")
    ) {
      return lang === "hi"
        ? "KVYASH Technologies एक टेक्नोलॉजी और डिजिटल सॉल्यूशंस कंपनी है जो व्यावहारिक सॉफ्टवेयर इंजीनियरिंग, AI और ऑटोमेशन, टेक्नोलॉजी कंसल्टिंग, डिजिटल ट्रांसफॉर्मेशन, मार्केटप्लेस/SaaS सॉल्यूशंस और मार्केटिंग व ग्रोथ पर ध्यान केंद्रित करती है। हम उन व्यवसायों के साथ काम करते हैं जो डिजिटल प्रोडक्ट्स बनाना, ऑपरेशन्स ऑटोमेट करना, ऑफलाइन प्रोसेस को ऑनलाइन लाना, या मौजूदा सिस्टम्स को इम्प्रूव करना चाहते हैं।"
        : lang === "hinglish"
        ? "KVYASH Technologies ek technology aur digital solutions company hai jo practical software engineering, AI & automation, technology consulting, digital transformation, marketplace/SaaS solutions aur marketing & growth par focus karti hai. Hum un businesses ke sath kaam karte hain jo digital products build karna, operations automate karna, offline processes ko online lana, ya existing systems ko improve karna chahte hain."
        : "KVYASH Technologies is a technology and digital solutions company focused on practical software engineering, AI & automation, technology consulting, digital transformation, marketplace/SaaS solutions, and marketing & growth.\n\nWe work with businesses that want to build digital products, automate operations, move offline processes online, or improve an existing digital system.";
    }

    // Location
    if (
      normalized.includes("location") ||
      normalized.includes("located") ||
      normalized.includes("where are you") ||
      normalized.includes("office") ||
      normalized.includes("address") ||
      normalized.includes("kahan hai")
    ) {
      return lang === "hi"
        ? "हम ग्रेटर नोएडा वेस्ट, उत्तर प्रदेश, भारत में स्थित हैं। हमारे इंजीनियरिंग और स्कोपिंग ऑपरेशन्स यहीं से मैनेज किए जाते हैं।"
        : lang === "hinglish"
        ? `Hum Greater Noida West, Uttar Pradesh, India me located hain. Hamara office location and systems control yaheen se handle hote hain.`
        : `KVYASH Technologies is located in Greater Noida West, Uttar Pradesh, India. All engineering and scoping operations are managed directly by our team here.`;
    }

    // Contact details
    if (
      normalized.includes("contact") ||
      normalized.includes("email") ||
      normalized.includes("phone number") ||
      normalized.includes("call you") ||
      normalized.includes("reach you") ||
      normalized.includes("connect") ||
      normalized.includes("baat kaise")
    ) {
      return lang === "hi"
        ? "आप हमें सीधे kvyashtechnologies@gmail.com पर ईमेल भेज सकते हैं या हमारे /contact पेज पर संपर्क कर सकते हैं। हम २४ घंटे में जवाब देते हैं।"
        : lang === "hinglish"
        ? `Aap hume directly kvyashtechnologies@gmail.com par email bhej sakte hain ya hamare /contact page par scope request drop kar sakte hain. Hum 24 ghante me respond karte hain.`
        : `You can reach us directly via email at kvyashtechnologies@gmail.com. Alternatively, you can start a scoping request here or submit the form on our /contact page. We respond within 24 hours.`;
    }

    // Specific AI capabilities details
    if (
      typeKey === "FAQ_WA" ||
      normalized.includes("whatsapp crm") ||
      normalized.includes("whatsapp automation") ||
      normalized.includes("whatsapp api")
    ) {
      return lang === "hi"
        ? "हम आधिकारिक व्हाट्सएप बिज़नेस APIs कॉन्फ़िगर करते हैं जो कस्टमर लीड्स को ऑटोमैटिकली कैप्चर करते हैं, ऑटो-रिप्लाई ट्रिगर करते हैं और सिस्टम CRM में एंट्री भरते हैं।"
        : lang === "hinglish"
        ? "Hum official WhatsApp Business APIs configure karte hain jo customer leads automatically catch karte hain, auto-replies trigger karte hain, aur system CRM me entry populate karte hain."
        : "We design WhatsApp CRM configurations using official APIs to capture inbound leads, route customer queries, trigger instant auto-replies, and sync conversation logs directly to your databases.";
    }

    if (
      typeKey === "FAQ_CALLING" ||
      normalized.includes("calling agent") ||
      normalized.includes("calling assistant") ||
      normalized.includes("voice bot") ||
      normalized.includes("voice agent")
    ) {
      return lang === "hi"
        ? "हम कस्टम वॉयस AI कॉलिंग एजेंट्स डिज़ाइन करते हैं जो इनकमिंग कॉल्स हैंडल कर सकें, ऑटो-क्वालिफिकेशन पूरा कर सकें, या कस्टमर फॉलो-अप शेड्यूल कर सकें।"
        : lang === "hinglish"
        ? "Hum custom voice AI calling agents design karte hain jo inbound leads handle kar sakein, auto-qualification complete karein, ya customer follow-ups schedule kar sakein."
        : "We build custom AI Calling Agents using text-to-speech models and LLMs to place outbound customer follow-ups, handle simple bookings, or pre-qualify leads dynamically.";
    }

    if (
      typeKey === "FAQ_CRM" ||
      normalized.includes("crm automation") ||
      normalized.includes("crm integration") ||
      normalized.includes("automate my crm")
    ) {
      return lang === "hi"
        ? "हम कस्टम डेटाबेस और CRM सिंकिंग वर्कफ़्लो बनाते हैं (जैसे HubSpot, Salesforce, या डेटाबेस ऑटोमेशन) जो स्प्रेडशीट्स और लीड्स पाइपलाइन को व्यवस्थित रखते हैं।"
        : lang === "hinglish"
        ? "Hum custom database and CRM syncing workflows banate hain (jaise HubSpot, Salesforce, ya database automation) jo spreadsheets aur leads pipeline ko clean rakhte hain."
        : "We design custom CRM automations (HubSpot, Salesforce, or proprietary databases) that automatically sync customer details, leads metadata, and email interactions, eliminating manual data entry.";
    }

    // Services
    if (
      typeKey === "FAQ_SERVICES" ||
      typeKey === "services" ||
      normalized.includes("services") ||
      normalized.includes("what services") ||
      normalized.includes("what do you offer") ||
      normalized.includes("capabilities") ||
      normalized.includes("what do you guys do") ||
      normalized.includes("do you build websites") ||
      normalized.includes("do you build apps") ||
      normalized.includes("do you provide marketing") ||
      normalized.includes("do you provide consultancy")
    ) {
      return lang === "hi"
        ? "बिल्कुल। कृपया बताएं आप क्या बनाना चाहते हैं। अगर आप टेक्नोलॉजी को लेकर श्योर नहीं हैं, तो मैं हेल्प करूँगा डिसाइड करने में कि आपको वेबसाइट, ऐप, SaaS, मार्केटप्लेस या AI/ऑटोमेशन सिस्टम चाहिए।"
        : lang === "hinglish"
        ? "Bilkul. Kripya batayein aap kya build karna chahte hain. Agar aap technology ko lekar sure nahi hain, toh main help karunga decide karne me ki aapko website, app, SaaS, marketplace, ya AI/automation system chahiye."
        : "Absolutely. Tell me what you're trying to build. If you're not sure about the technology, that's fine — I'll help you figure out whether you need a website, app, SaaS, marketplace, or AI/automation system.";
    }

    // AI & Automation Top Level
    if (
      typeKey === "FAQ_AI" ||
      typeKey === "ai" ||
      normalized.includes("ai services") ||
      normalized.includes("ai & automation") ||
      normalized.includes("can ai manage") ||
      normalized.includes("can you build an ai chatbot") ||
      normalized.includes("what ai solutions")
    ) {
      return lang === "hi"
        ? "हम बिज़नेस प्रोसेस को ऑटोमेट करने के लिए AI सिस्टम बनाते हैं। इसमें कस्टम LLMs इंटीग्रेशन्स, व्हाट्सएप लीड हैंडलर, ऑटोमैटिक ईमेल रिस्पॉन्डर्स, वॉयस एजेंट्स और कस्टम वर्कफ़्लो कनेक्टर्स शामिल हैं।"
        : lang === "hinglish"
        ? "Hum business processes automate karne ke liye AI systems banate hain. Isme custom LLMs integrations, WhatsApp lead handlers, automatic email responders, voice agents aur custom workflow connectors shamil hain."
        : "We design capability-focused AI Systems and workflows. Solutions we can create include AI Chatbots, WhatsApp CRMs, Email auto-responders, AI Calling Agents, lead qualification pipelines, document parsers, and custom API-driven AI integrations.";
    }

    // Technology Consulting
    if (
      typeKey === "FAQ_CONSULTANCY" ||
      normalized.includes("consultancy") ||
      normalized.includes("consulting") ||
      normalized.includes("advice") ||
      normalized.includes("strategy") ||
      normalized.includes("tech stack") ||
      normalized.includes("technology selector") ||
      normalized.includes("choose between") ||
      normalized.includes("app or website") ||
      normalized.includes("where to start")
    ) {
      return lang === "hi"
        ? "बिल्कुल। हम डेवलपमेंट शुरू होने से पहले सही टेक्नोलॉजी डिसीजन लेने में आपकी मदद कर सकते हैं। हम आपकी रिक्वायरमेंट्स को स्पष्ट करने, वेबसाइट बनाम मोबाइल ऐप की तुलना करने, सही टेक स्टैक चुनने, सिस्टम आर्किटेक्चर प्लान करने और एक MVP रोडमैप डिसाइड करने में मदद कर सकते हैं।\n\nआप क्या बनाना चाहते हैं?"
        : lang === "hinglish"
        ? "Bilkul. Hum development shuru hone se pehle sahi technology decision lene me aapki madad kar sakte hain. Hum aapke requirements clarify karne, website vs mobile app compare karne, sahi tech stack chunne, system architecture plan karne, aur ek MVP roadmap design karne me help kar sakte hain.\n\nAap kya build karna chahte hain?"
        : "Absolutely. We can help you make the right technology decision before development starts. We can help clarify your requirements, compare website vs mobile app, choose a suitable tech stack, plan the system architecture, and define an MVP roadmap.\n\nWhat are you trying to build?";
    }

    if (typeKey === "FAQ_CONSULT_WEB") {
      return lang === "hi"
        ? "समझ गया। आप क्या बनाना चाहते हैं — कंपनी वेबसाइट, ई-कॉमर्स स्टोर, कस्टमर पोर्टल, वेब एप्लिकेशन या कुछ और?"
        : lang === "hinglish"
        ? "Samajh gaya. Aap kya build karna chahte hain — company website, ecommerce store, customer portal, web application, ya kuch aur?"
        : "Got it. What are you looking to build — a company website, ecommerce store, customer portal, web application, or something else?";
    }

    if (typeKey === "FAQ_CONSULT_MOBILE") {
      return lang === "hi"
        ? "समझ गया। क्या यह मोबाइल ऐप iOS, Android या दोनों के लिए होगा? और आपके टार्गेट यूज़र्स कौन हैं?"
        : lang === "hinglish"
        ? "Understood. Kya ye mobile app iOS, Android, ya dono ke liye hoga? Aur aapke target users kaun hain?"
        : "Understood. Will this mobile app be for iOS, Android, or both? And who is your target user?";
    }

    if (typeKey === "FAQ_CONSULT_SAAS") {
      return lang === "hi"
        ? "बेहतरीन। यह SaaS प्रोडक्ट किस मुख्य वर्कफ़्लो को ऑटोमेट करता है, और आपका टार्गेट बिज़नेस मॉडल (जैसे सब्सक्रिप्शन-बेस्ड) क्या है?"
        : lang === "hinglish"
        ? "Excellent. Ye SaaS product kis core workflow ko automate karta hai, aur aapka target business model (jaise subscription-based) kya hai?"
        : "Excellent. What core workflow does this SaaS automate, and what is your target business model (e.g. subscription-based)?";
    }

    if (typeKey === "FAQ_CONSULT_MARKET") {
      return lang === "hi"
        ? "समझ गया। आपके मार्केटप्लेस में सप्लायर और डिमांड साइड पार्टीज़ कौन हैं, और ट्रांसेक्शन्स कैसे हैंडल होंगे?"
        : lang === "hinglish"
        ? "Got it. Aapke marketplace me supply aur demand side parties kaun hain, aur transactions kaise handle honge?"
        : "Got it. Who are the supply and demand parties in your marketplace, and how will transactions be handled?";
    }

    if (typeKey === "FAQ_CONSULT_AI") {
      return lang === "hi"
        ? "बढ़िया। क्या आप कस्टमर-फेसिंग चैटबॉट बनाना चाहते हैं, बैक-ऑफिस वर्कफ़्लो ऑटोमेट करना चाहते हैं, या कस्टम AI एजेंट्स कनेक्ट करना चाहते हैं?"
        : lang === "hinglish"
        ? "Great. Kya aap customer-facing chatbot banana chahte hain, back-office workflows automate karna chahte hain, ya custom AI agents connect karna chahte hain?"
        : "Great. Are you looking to build a customer-facing chatbot, automate back-office workflows, or connect custom AI agents?";
    }

    if (typeKey === "FAQ_CONSULT_NOT_SURE") {
      return lang === "hi"
        ? "कोई बात नहीं। मुझे अपने बिज़नेस या आइडिया के बारे में थोड़ा बताएं, आप क्या प्रॉब्लम सॉल्व करना चाहते हैं और इसे कौन यूज़ करेगा। मैं आपको सही डिजिटल अप्रोच समझने में मदद करूँगा।"
        : lang === "hinglish"
        ? "Koi baat nahi. Mujhe apne business ya idea ke baare me thoda batayein, aap kya problem solve karna chahte hain, aur ise kaun use karega. Main aapko sahi digital approach samajhne me help karunga."
        : "No problem. Tell me briefly about your business or idea, what problem you want to solve, and who will use it. I'll help you figure out the right digital approach.";
    }

    // Marketplace / Offline to online
    if (
      normalized.includes("marketplace") ||
      normalized.includes("offline to online") ||
      normalized.includes("offline online") ||
      normalized.includes("multi vendor") ||
      normalized.includes("business online") ||
      normalized.includes("traditional business") ||
      normalized.includes("booking system") ||
      normalized.includes("online store")
    ) {
      return lang === "hi"
        ? "हम ब्रिक-एंड-मोर्टार स्टोर्स को ऑनलाइन कैटलॉग, डिजिटल पेमेंट्स, बुकिंग इंजन और मल्टी-वेंडर मार्केटप्लेस कॉन्फ़िगरेशन पर ट्रांसफर करने में मदद करते हैं।"
        : lang === "hinglish"
        ? "Hum brick-and-mortar stores ko online catalogs, digital payments, booking engines, aur multi-vendor system marketplace configurations par transition karne me help karte hain."
        : "We specialize in brick-and-mortar digital transformations and multi-party marketplaces. This includes setting up digital catalogues, automated reservation engines, customer booking schedulers, vendor portals, and split-payment configurations.";
    }

    // Marketing & Growth
    if (
      normalized.includes("marketing") ||
      normalized.includes("seo") ||
      normalized.includes("google ads") ||
      normalized.includes("meta ads") ||
      normalized.includes("lead generation") ||
      normalized.includes("cro") ||
      normalized.includes("growth")
    ) {
      return lang === "hi"
        ? "हम लॉन्च कैंपेन, लैंडिंग पेज टेस्ट (CRO) और आर्गेनिक सर्च इंजन विजिबिलिटी (SEO) हैंडल करते हैं ताकि आपके प्लेटफार्म पर टार्गेटेड लीड्स/कस्टमर्स डिलीवर हों।"
        : lang === "hinglish"
        ? "Hum launch campaigns, landing page tests (CRO), aur organic search engine visibility (SEO) handle karte hain taaki aapke platform par targeted leads/customers deliver hon."
        : "Our Marketing & Growth services focus on clean, technical SEO configurations, structural search and social media campaigns, landing page A/B tests, and analytics tracking to increase search rankings and acquisition rates.";
    }

    // Work / Case Studies
    if (
      typeKey === "FAQ_WORK" ||
      normalized.includes("work") ||
      normalized.includes("portfolio") ||
      normalized.includes("project") ||
      normalized.includes("case study") ||
      normalized.includes("what have you built") ||
      normalized.includes("what has the founder built") ||
      normalized.includes("what has sumit built") ||
      normalized.includes("show me work") ||
      normalized.includes("ai projects") ||
      normalized.includes("saas projects") ||
      normalized.includes("web projects")
    ) {
      return lang === "hi"
        ? "हम अपने /work पेज पर स्ट्रक्चरल ब्लूप्रिंट, टेक्निकल कैपेबिलिटीज और इंटरनल इंजीनियरिंग प्रोटोटाइप दिखाते हैं (जैसे एज-कैशिंग आर्किटेक्चर, SaaS स्कीमा)। हम इंटरनल प्रोटोटाइप को क्लाइंट प्रोजेक्ट्स की तरह पेश नहीं करते हैं।"
        : lang === "hinglish"
        ? "Hum structural blueprints, technical capabilities aur internal engineering prototypes hamare /work page par showcase karte hain (jaise edge-caching architectures, SaaS schemas). Hum internal prototypes ko client projects ki tarah present nahi karte."
        : "We showcase our technical architecture blueprints, internal engineering tools, and capabilities on our /work page (such as edge-caching architectures and SaaS schemas). We clearly distinguish these internal prototypes from verified client work and do not fabricate customer case studies.";
    }

    // Legal / Privacy / Trust
    if (
      normalized.includes("privacy") ||
      normalized.includes("cookie") ||
      normalized.includes("terms") ||
      normalized.includes("disclaimer") ||
      normalized.includes("safe") ||
      normalized.includes("track") ||
      normalized.includes("data")
    ) {
      return lang === "hi"
        ? "हम यूजर प्राइवेसी और डेटा सुरक्षा सिद्धांतों का ध्यान रखते हैं। डिटेल्स के लिए आप हमारे privacy-policy, cookie-policy, terms और disclaimer पेज विजिट कर सकते हैं।"
        : lang === "hinglish"
        ? "Hum user privacy aur data safety principles ka dhyan rakhte hain. details ke liye aap privacy-policy, cookie-policy, terms, and disclaimer pages visit kar sakte hain."
        : "We store lead data securely under HTTPS standards and run validations to protect input forms. You can find full details of our data policies and consulting liability limits on our /privacy-policy, /cookie-policy, /terms, and /disclaimer pages.";
    }

    // Social Links
    if (
      normalized.includes("social") ||
      normalized.includes("linkedin") ||
      normalized.includes("instagram") ||
      normalized.includes("facebook") ||
      normalized.includes("twitter") ||
      normalized.includes("x.com")
    ) {
      const links = companyData.social_links.map((link) => `${link.platform}: ${link.url}`).join("\n");
      return lang === "hi"
        ? `हमारे ऑफिशियल सोशल चैनल्स ये हैं:\n${links}`
        : lang === "hinglish"
        ? `Humare official social channels ye hain:\n${links}`
        : `You can find and connect with KVYASH Technologies on our official social channels:\n${links}`;
    }

    // Unclear gibberish / edge case fallbacks
    return null;
  };

  const isDetailed = (req: string): boolean => {
    if (!req) return false;
    const normalized = req.toLowerCase().trim();
    const genericPhrases = [
      "a website", "an app", "a saas", "an ecommerce website", "ecommerce website",
      "a chatbot", "automation", "custom software", "software", "web app", "web application",
      "website", "app", "saas", "chatbot", "ai chatbot"
    ];
    if (genericPhrases.some(phrase => normalized === phrase || normalized === `an ${phrase}` || normalized === `a ${phrase}`)) {
      return false;
    }
    // If the user has already provided some features or details (denoted by a comma or multiple words)
    if (normalized.includes(",") || normalized.split(/\s+/).length >= 3) {
      return true;
    }
    if (normalized.length < 25) {
      const features = [
        "razorpay", "payment", "inventory", "admin", "login", "auth", "database", "dashboard",
        "gpt", "pdf", "ocr", "stripe", "booking", "ecom", "store", "sell", "billing",
        "real estate", "portfolio", "listing", "contact", "form"
      ];
      if (!features.some(f => normalized.includes(f))) {
        return false;
      }
    }
    return true;
  };

  const parseScopingInput = (text: string, currentData: typeof scopingData, activeStage: typeof scopingStage) => {
    const updates = { ...currentData };
    const normalized = text.toLowerCase().trim();

    const isAffirmative = (t: string): boolean | null => {
      const yesPatterns = ["yes", "yeah", "yup", "sure", "ok", "haan", "ji haan", "chahiye", "integrate kar", "add", "include"];
      const noPatterns = ["no", "nope", "not needed", "nahi", "na", "nahi chahiye", "exclude", "without", "skip"];
      if (yesPatterns.some(pat => t === pat || t.startsWith(pat + " ") || t.endsWith(" " + pat))) {
        return true;
      }
      if (noPatterns.some(pat => t === pat || t.startsWith(pat + " ") || t.endsWith(" " + pat))) {
        return false;
      }
      return null;
    };

    const aff = isAffirmative(normalized);

    // E-commerce
    if (activeStage === "ECOMM_PRODUCTS" && aff === null) updates.ecommProducts = text;
    else if (activeStage === "ECOMM_PAYMENTS" && aff !== null) updates.ecommPayments = aff ? "Yes" : "No";
    else if (activeStage === "ECOMM_INVENTORY" && aff !== null) updates.ecommInventory = aff ? "Yes" : "No";
    else if (activeStage === "ECOMM_ADMIN" && aff !== null) updates.ecommAdmin = aff ? "Yes" : "No";

    // SaaS
    else if (activeStage === "SAAS_USERS" && aff === null) updates.saasUsers = text;
    else if (activeStage === "SAAS_WORKFLOW" && aff === null) updates.saasWorkflow = text;
    else if (activeStage === "SAAS_AUTH" && aff !== null) updates.saasAuth = aff ? "Yes" : "No";
    else if (activeStage === "SAAS_DASHBOARD" && aff !== null) updates.saasDashboard = aff ? "Yes" : "No";
    else if (activeStage === "SAAS_BILLING" && aff !== null) updates.saasBilling = aff ? "Yes" : "No";
    else if (activeStage === "SAAS_INTEGRATIONS" && aff !== null) updates.saasIntegrations = aff ? "Yes" : "No";

    // AI Chatbot
    else if (activeStage === "BOT_PURPOSE" && aff === null) updates.botPurpose = text;
    else if (activeStage === "BOT_USERS" && aff === null) updates.botUsers = text;
    else if (activeStage === "BOT_KNOWLEDGE" && aff === null) updates.botKnowledge = text;
    else if (activeStage === "BOT_CHANNELS" && aff === null) updates.botChannels = text;
    else if (activeStage === "BOT_LEAD_CAPTURE" && aff !== null) updates.botLeadCapture = aff ? "Yes" : "No";
    else if (activeStage === "BOT_HANDOFF" && aff !== null) updates.botHandoff = aff ? "Yes" : "No";

    // Mobile App
    else if (activeStage === "APP_PLATFORM" && aff === null) updates.appPlatform = text;
    else if (activeStage === "APP_TARGET_USER" && aff === null) updates.appTargetUser = text;
    else if (activeStage === "APP_FEATURES" && aff === null) updates.appFeatures = text;
    else if (activeStage === "APP_AUTH" && aff !== null) updates.appAuth = aff ? "Yes" : "No";
    else if (activeStage === "APP_BACKEND" && aff !== null) updates.appBackend = aff ? "Yes" : "No";
    else if (activeStage === "APP_NOTIFICATIONS" && aff !== null) updates.appNotifications = aff ? "Yes" : "No";

    // Automation
    else if (activeStage === "AUTO_WORKFLOW" && aff === null) updates.autoWorkflow = text;
    else if (activeStage === "AUTO_TRIGGER" && aff === null) updates.autoTrigger = text;
    else if (activeStage === "AUTO_ACTION" && aff === null) updates.autoAction = text;
    else if (activeStage === "AUTO_TOOLS" && aff === null) updates.autoTools = text;
    else if (activeStage === "AUTO_RESULT" && aff === null) updates.autoResult = text;

    // Consultancy
    else if (activeStage === "CONSULT_GOAL" && aff === null) updates.consultGoal = text;
    else if (activeStage === "CONSULT_PROBLEM" && aff === null) updates.consultProblem = text;
    else if (activeStage === "CONSULT_CUST_ACTION" && aff === null) updates.consultCustomerAction = text;

    // Offline to Online
    else if (activeStage === "OFFLINE_BIZ" && aff === null) updates.offlineBizType = text;
    else if (activeStage === "OFFLINE_ACTION" && aff === null) updates.offlineDesiredAction = text;
    else if (activeStage === "OFFLINE_PAYMENTS" && aff !== null) updates.offlinePayments = aff ? "Yes" : "No";
    else if (activeStage === "OFFLINE_DELIVERY" && aff === null) updates.offlineDelivery = text;
    else if (activeStage === "OFFLINE_MARKETING" && aff !== null) updates.offlineMarketing = aff ? "Yes" : "No";

    // Marketplace
    else if (activeStage === "MARKET_TARGET" && aff === null) updates.marketType = text;
    else if (activeStage === "MARKET_MODEL" && aff === null) updates.marketProductOrService = text;
    else if (activeStage === "MARKET_ONBOARDING" && aff === null) updates.marketVendorOnboarding = text;
    else if (activeStage === "MARKET_COMMISSION" && aff === null) updates.marketCommission = text;
    else if (activeStage === "MARKET_DASHBOARDS" && aff !== null) updates.marketDashboards = aff ? "Yes" : "No";

    // Marketing
    else if (activeStage === "MARKETING_BIZ" && aff === null) updates.marketingBusiness = text;
    else if (activeStage === "MARKETING_LIVE" && aff !== null) updates.marketingIsLive = aff ? "Yes" : "No";
    else if (activeStage === "MARKETING_GOAL" && aff === null) updates.marketingObjective = text;
    else if (activeStage === "MARKETING_SEO" && aff !== null) updates.marketingSEO = aff ? "Yes" : "No";

    else if (activeStage === "CRM_TYPE" && aff === null) updates.crmType = text;
    else if (activeStage === "CRM_USERS" && aff === null) updates.crmUsers = text;
    else if (activeStage === "CRM_FEATURES" && aff === null) updates.crmFeatures = text;
    else if (activeStage === "CRM_PIPELINE" && aff === null) updates.crmPipeline = text;
    else if (activeStage === "CRM_INTEGRATIONS" && aff === null) updates.crmIntegrations = text;
    else if (activeStage === "CRM_AUTOMATION" && aff === null) updates.crmAutomation = text;
    else if (activeStage === "CRM_DASHBOARDS" && aff !== null) updates.crmDashboards = aff ? "Yes" : "No";

    // WhatsApp CRM
    else if (activeStage === "WA_SETUP" && aff === null) updates.waSetup = text;
    else if (activeStage === "WA_VOLUME" && aff === null) updates.waVolume = text;
    else if (activeStage === "WA_FEATURES" && aff === null) updates.waFeatures = text;
    else if (activeStage === "WA_REPLIES" && aff !== null) updates.waReplies = aff ? "Yes" : "No";
    else if (activeStage === "WA_FOLLOWUPS" && aff !== null) updates.waFollowups = aff ? "Yes" : "No";
    else if (activeStage === "WA_TEAM" && aff === null) updates.waTeam = text;
    else if (activeStage === "WA_CRM" && aff === null) updates.waCrm = text;

    // Email Automation
    else if (activeStage === "EMAIL_PLATFORM" && aff === null) updates.emailPlatform = text;
    else if (activeStage === "EMAIL_TYPES" && aff === null) updates.emailTypes = text;
    else if (activeStage === "EMAIL_CLASSIFY" && aff === null) updates.emailClassify = text;
    else if (activeStage === "EMAIL_REPLIES" && aff !== null) updates.emailReplies = aff ? "Yes" : "No";
    else if (activeStage === "EMAIL_FOLLOWUPS" && aff !== null) updates.emailFollowups = aff ? "Yes" : "No";
    else if (activeStage === "EMAIL_APPROVAL" && aff !== null) updates.emailApproval = aff ? "Yes" : "No";

    // AI Calling Agent
    else if (activeStage === "CALL_PURPOSE" && aff === null) updates.callPurpose = text;
    else if (activeStage === "CALL_DIRECTION" && aff === null) updates.callDirection = text;
    else if (activeStage === "CALL_FEATURES" && aff === null) updates.callFeatures = text;
    else if (activeStage === "CALL_LANGUAGES" && aff === null) updates.callLanguages = text;
    else if (activeStage === "CALL_CRM" && aff === null) updates.callCrm = text;
    else if (activeStage === "CALL_HANDOFF" && aff !== null) updates.callHandoff = aff ? "Yes" : "No";
    else if (activeStage === "CALL_LOGGING" && aff !== null) updates.callLogging = aff ? "Yes" : "No";

    // AI Top-level Select Subtype
    else if (activeStage === "AI_SELECT_SUBTYPE") updates.aiSubtype = text;

    // General intent-based entity extraction as cross-intent support
    if (normalized.includes("payment") || normalized.includes("razorpay") || normalized.includes("stripe")) {
      const isNo = normalized.includes("no") || normalized.includes("nahi") || normalized.includes("without");
      updates.ecommPayments = isNo ? "No" : "Yes";
      updates.saasBilling = isNo ? "No" : "Yes";
      updates.offlinePayments = isNo ? "No" : "Yes";
    }
    if (normalized.includes("inventory") || normalized.includes("stock") || normalized.includes("warehouse")) {
      updates.ecommInventory = (normalized.includes("no") || normalized.includes("nahi") || normalized.includes("without")) ? "No" : "Yes";
    }
    if (normalized.includes("admin") || normalized.includes("dashboard") || normalized.includes("admin panel")) {
      const isNo = normalized.includes("no") || normalized.includes("nahi") || normalized.includes("without");
      updates.ecommAdmin = isNo ? "No" : "Yes";
      updates.saasDashboard = isNo ? "No" : "Yes";
      updates.appBackend = isNo ? "No" : "Yes";
      updates.marketDashboards = isNo ? "No" : "Yes";
    }
    if (normalized.includes("auth") || normalized.includes("login") || normalized.includes("signup") || normalized.includes("signin")) {
      const isNo = normalized.includes("no") || normalized.includes("nahi") || normalized.includes("without");
      updates.saasAuth = isNo ? "No" : "Yes";
      updates.appAuth = isNo ? "No" : "Yes";
    }
    if (normalized.includes("seo") || normalized.includes("google search")) {
      updates.marketingSEO = (normalized.includes("no") || normalized.includes("nahi") || normalized.includes("without")) ? "No" : "Yes";
    }
    if (normalized.includes("marketing") || normalized.includes("ads") || normalized.includes("meta ads")) {
      updates.offlineMarketing = (normalized.includes("no") || normalized.includes("nahi") || normalized.includes("without")) ? "No" : "Yes";
    }

    return updates;
  };

  const classifyIntents = (text: string): BotIntent[] => {
    const normalized = text.toLowerCase();
    const intents: BotIntent[] = [];

    const isEcommSaaSApp = 
      normalized.includes("website") ||
      normalized.includes("web dev") ||
      normalized.includes("custom software") ||
      normalized.includes("saas") ||
      normalized.includes("mobile app") ||
      normalized.includes("android") ||
      normalized.includes("ios") ||
      normalized.includes("app dev") ||
      normalized.includes("banwani") ||
      normalized.includes("banwana") ||
      normalized.includes("chahiye");

    const isConsult =
      normalized.includes("consult") ||
      normalized.includes("advice") ||
      normalized.includes("strategy") ||
      normalized.includes("not sure") ||
      normalized.includes("help me decide") ||
      normalized.includes("samajh nahi") ||
      normalized.includes("what should i") ||
      normalized.includes("don't know what") ||
      normalized.includes("don't know") ||
      normalized.includes("dont know") ||
      normalized.includes("app or website") ||
      normalized.includes("website or app") ||
      normalized.includes("app or web") ||
      normalized.includes("web or app") ||
      normalized.includes("technology advice");

    const isOffline =
      normalized.includes("offline") ||
      normalized.includes("shop") ||
      normalized.includes("clothing shop") ||
      normalized.includes("store online") ||
      normalized.includes("retail") ||
      normalized.includes("restaurant") ||
      normalized.includes("traditional") ||
      normalized.includes("online lana");

    const isMarket =
      normalized.includes("marketplace") ||
      normalized.includes("multi vendor") ||
      normalized.includes("multi-vendor") ||
      normalized.includes("vendor portal") ||
      normalized.includes("amazon");

    const isMarketing =
      normalized.includes("marketing") ||
      normalized.includes("seo") ||
      normalized.includes("meta ads") ||
      normalized.includes("google ads") ||
      normalized.includes("promote") ||
      normalized.includes("lead generation") ||
      normalized.includes("growth");

    const isAIAuto =
      normalized.includes("ai chatbot") ||
      normalized.includes("ai automation") ||
      normalized.includes("automation") ||
      normalized.includes("automate") ||
      normalized.includes("chatbot");

    // Detect specific AI & Automation sub-intents for combined scoping
    if (normalized.includes("whatsapp crm") || (normalized.includes("whatsapp") && normalized.includes("crm"))) {
      intents.push("WA_CRM");
    }
    if (normalized.includes("chatbot") || normalized.includes("ai bot") || (normalized.includes("bot") && !normalized.includes("calling"))) {
      intents.push("AI_BOT");
    }
    if (normalized.includes("crm") && !normalized.includes("whatsapp")) {
      intents.push("AI_CRM");
    }
    if (normalized.includes("email automation") || normalized.includes("email assistant") || normalized.includes("auto email") || normalized.includes("email replies") || (normalized.includes("email") && normalized.includes("automate"))) {
      intents.push("EMAIL_AUTO");
    }
    if (normalized.includes("calling agent") || normalized.includes("calling bot") || normalized.includes("voice agent") || normalized.includes("ai call") || normalized.includes("calling assistant")) {
      intents.push("AI_CALLING");
    }
    if (normalized.includes("lead qualification") || normalized.includes("lead management") || normalized.includes("lead route")) {
      intents.push("LEAD_MGMT");
    }
    if (normalized.includes("customer support") || normalized.includes("support workflow")) {
      intents.push("CUST_SUPPORT");
    }
    if (normalized.includes("workflow automation") || normalized.includes("automate process") || normalized.includes("spreadsheet automation")) {
      intents.push("WORKFLOW_AUTO");
    }
    if (normalized.includes("custom ai agent") || normalized.includes("ai agents") || normalized.includes("cognitive agent")) {
      intents.push("CUSTOM_AI_AGENT");
    }

    if (isConsult) intents.push("CONSULTANCY");
    if (isOffline) intents.push("OFFLINE_TO_ONLINE");
    if (isMarket) intents.push("MARKETPLACE");
    if (isMarketing) intents.push("MARKETING_GROWTH");
    
    // Push AI_AUTOMATION only if no specific AI sub-intent is already active
    if (isAIAuto && !intents.some(i => ["WA_CRM", "AI_BOT", "AI_CRM", "EMAIL_AUTO", "AI_CALLING", "LEAD_MGMT", "CUST_SUPPORT", "WORKFLOW_AUTO", "CUSTOM_AI_AGENT"].includes(i))) {
      intents.push("AI_AUTOMATION");
    }
    
    if (isEcommSaaSApp && !isOffline && !isMarket && !isConsult && !isMarketing && !isAIAuto) {
      intents.push("BUILD_SOMETHING");
    }

    if (intents.length === 0) {
      if (normalized.includes("decide") || normalized.includes("choose") || normalized.includes("help")) {
        intents.push("NOT_SURE");
      } else {
        intents.push("BUILD_SOMETHING"); // fallback project intent
      }
    }

    return intents;
  };

  const runScoping = (
    userText: string,
    intent: BotIntent,
    intentIndex: number,
    allIntents: BotIntent[],
    currentIntake: IntakeData,
    lang: LangType,
    scopedData: typeof scopingData
  ) => {
    let nextStage: typeof scopingStage = "NONE";
    let botPrompt = "";

    // Identify intent category
    if (intent === "CONSULTANCY" || intent === "NOT_SURE") {
      if (!scopedData.consultGoal) {
        nextStage = "CONSULT_GOAL";
        if (intent === "NOT_SURE") {
          botPrompt = lang === "hi"
            ? "Koi baat nahi. Aap apne business me kya achieve karna chahte hain ye batayein, aur main help karunga decide karne me ki website, app, SaaS, marketplace, ya AI system aapke liye sabse behtar rahega."
            : "That's completely fine. Tell me what you're trying to achieve in your business, and I'll help you figure out whether a website, app, SaaS product, marketplace, or AI/automation system makes the most sense.";
        } else {
          botPrompt = lang === "hi" 
            ? "Aap business me kya improve ya achieve karna chahte hain?" 
            : "What are you trying to improve or achieve?";
        }
      } else if (!scopedData.consultProblem) {
        nextStage = "CONSULT_PROBLEM";
        botPrompt = lang === "hi"
          ? "Inme se aapka challenge kya hai?\n• New business idea\n• Existing business digitization\n• Product/MVP planning\n• Technology decision\n• Process improvement\n• Existing website/software problem\n• Growth/marketing"
          : "Which of these best describes your business stage or challenge?\n\n• New business idea\n• Existing business digitization\n• Product/MVP planning\n• Technology decision\n• Process improvement\n• Existing website/software problem\n• Growth/marketing";
      } else if (!scopedData.consultCustomerAction) {
        nextStage = "CONSULT_CUST_ACTION";
        botPrompt = lang === "hi"
          ? "Aapke customers online kya features use kar paayein?"
          : "What should your customers be able to do online?";
      }
    } else if (intent === "OFFLINE_TO_ONLINE") {
      if (!scopedData.offlineBizType) {
        nextStage = "OFFLINE_BIZ";
        botPrompt = lang === "hi"
          ? "Aapka offline business kis type ka hai (jaise clothing store, restaurant, manufacturer)?"
          : "What type of offline business do you run (e.g. clothing store, restaurant, manufacturer)?";
      } else if (!scopedData.offlineDesiredAction) {
        nextStage = "OFFLINE_ACTION";
        botPrompt = lang === "hi"
          ? "Aap kya chahte hain - browse products, order and pay online, WhatsApp par connect, ya ye sabhi?"
          : "Do you want customers mainly to browse products, order and pay online, contact you on WhatsApp, or all of these?";
      } else if (!scopedData.offlinePayments) {
        nextStage = "OFFLINE_PAYMENTS";
        botPrompt = lang === "hi" ? "Kya online payments integration chahiye?" : "Will you need online payments integrated?";
      } else if (!scopedData.offlineDelivery) {
        nextStage = "OFFLINE_DELIVERY";
        botPrompt = lang === "hi" ? "Delivery ke liye koi location limit ya constraints hain?" : "Do you have specific delivery or service area constraints?";
      } else if (!scopedData.offlineMarketing) {
        nextStage = "OFFLINE_MARKETING";
        botPrompt = lang === "hi" ? "Kya launch ke baad marketing support chahiye?" : "Will you need digital marketing support to launch online?";
      }
    } else if (intent === "MARKETPLACE") {
      if (!scopedData.marketType) {
        nextStage = "MARKET_TARGET";
        botPrompt = lang === "hi" ? "Kya ye B2B marketplace hai ya B2C?" : "Is this marketplace B2B (business-to-business) or B2C (business-to-consumer)?";
      } else if (!scopedData.marketProductOrService) {
        nextStage = "MARKET_MODEL";
        botPrompt = lang === "hi"
          ? "Kya ye products ke liye hai (jaise Amazon) ya service booking ke liye?"
          : "Is it a product marketplace (like Amazon), service booking marketplace (like Urban Company), or local delivery?";
      } else if (!scopedData.marketVendorOnboarding) {
        nextStage = "MARKET_ONBOARDING";
        botPrompt = lang === "hi"
          ? "Vendors onboarding process kya hoga (self-signup ya admin check)?"
          : "How should vendors onboard and list products/services (self-signup, manual approval, or direct upload)?";
      } else if (!scopedData.marketCommission) {
        nextStage = "MARKET_COMMISSION";
        botPrompt = lang === "hi"
          ? "Commission model kya hoga (commission per order ya flat subscription fee)?"
          : "Will you use a commission-based model per order, or flat subscription fees for vendors?";
      } else if (!scopedData.marketDashboards) {
        nextStage = "MARKET_DASHBOARDS";
        botPrompt = lang === "hi"
          ? "Kya vendors aur customers dono ke liye separate dashboard portals chahiye?"
          : "Will you need dedicated dashboards for both vendors and customers?";
      }
    } else if (intent === "MARKETING_GROWTH") {
      if (!scopedData.marketingBusiness) {
        nextStage = "MARKETING_BIZ";
        botPrompt = lang === "hi" ? "Aap kis business ya product ko promote karna chahte hain?" : "What is the business or product we are promoting?";
      } else if (!scopedData.marketingIsLive) {
        nextStage = "MARKETING_LIVE";
        botPrompt = lang === "hi" ? "Kya aapki website ya application already live hai?" : "Is the website or app already live?";
      } else if (!scopedData.marketingObjective) {
        nextStage = "MARKETING_GOAL";
        botPrompt = lang === "hi"
          ? "Primary goal kya hai - website traffic, organic leads, paid meta/google sales, ya brand awareness?"
          : "Is your main goal more website traffic, organic leads, paid meta/google sales, or overall brand awareness?";
      } else if (!scopedData.marketingSEO) {
        nextStage = "MARKETING_SEO";
        botPrompt = lang === "hi" ? "Kya SEO optimization setups chahiye?" : "Will you need search engine optimization (SEO) setups?";
      }
    } else if (intent === "AI_AUTOMATION") {
      if (!scopedData.aiSubtype) {
        nextStage = "AI_SELECT_SUBTYPE";
        botPrompt = lang === "hi"
          ? "Aap kya build ya automate karna chahte hain?"
          : "What would you like to build or automate?";
      } else {
        const sub = scopedData.aiSubtype.toLowerCase();
        let subIntent: BotIntent = "NONE";
        if (sub.includes("chatbot")) subIntent = "AI_BOT";
        else if (sub.includes("whatsapp")) subIntent = "WA_CRM";
        else if (sub.includes("crm")) subIntent = "AI_CRM";
        else if (sub.includes("email")) subIntent = "EMAIL_AUTO";
        else if (sub.includes("calling")) subIntent = "AI_CALLING";
        else if (sub.includes("lead")) subIntent = "LEAD_MGMT";
        else if (sub.includes("support")) subIntent = "CUST_SUPPORT";
        else if (sub.includes("workflow")) subIntent = "WORKFLOW_AUTO";
        else if (sub.includes("agent")) subIntent = "CUSTOM_AI_AGENT";
        else if (sub.includes("not sure") || sub.includes("decide")) subIntent = "AI_NOT_SURE";

        if (subIntent !== "NONE") {
          const newIntents = [...allIntents];
          newIntents[intentIndex] = subIntent;
          return runScoping(userText, subIntent, intentIndex, newIntents, currentIntake, lang, scopedData);
        }
      }
    } else if (intent === "AI_BOT") {
      if (!scopedData.botPurpose) { nextStage = "BOT_PURPOSE"; botPrompt = lang === "hi" ? "Chatbot ka main purpose kya hai?" : "What is the primary purpose of this AI chatbot?"; }
      else if (!scopedData.botUsers) { nextStage = "BOT_USERS"; botPrompt = lang === "hi" ? "Users kaun honge (customers ya support staff)?" : "Who will be interacting with the chatbot (customers, staff, etc.)?"; }
      else if (!scopedData.botKnowledge) { nextStage = "BOT_KNOWLEDGE"; botPrompt = lang === "hi" ? "Bot ko train karne ke liye knowledge source kya hai?" : "What is the knowledge source (documents, database, FAQs) for training the bot?"; }
      else if (!scopedData.botChannels) { nextStage = "BOT_CHANNELS"; botPrompt = lang === "hi" ? "Chatbot kahan deploy hoga (website, WhatsApp, Slack)?" : "What channels should the bot support (website, WhatsApp, Slack)?"; }
      else if (!scopedData.botLeadCapture) { nextStage = "BOT_LEAD_CAPTURE"; botPrompt = lang === "hi" ? "Kya chatbot contact leads capture karega?" : "Should the chatbot capture leads and contact details?"; }
      else if (!scopedData.botHandoff) { nextStage = "BOT_HANDOFF"; botPrompt = lang === "hi" ? "Kya human agent handoff fallback system chahiye?" : "Will you need a human handoff fallback or live chat trigger?"; }
    } else if (intent === "AI_CRM") {
      if (!scopedData.crmType) { nextStage = "CRM_TYPE"; botPrompt = lang === "hi" ? "Kya aap existing CRM (HubSpot/Salesforce) integrate karna chahte hain ya new custom CRM build karna hai?" : "Will this be integrated with an existing CRM (like HubSpot or Salesforce), or do we need to build a new custom CRM?"; }
      else if (!scopedData.crmUsers) { nextStage = "CRM_USERS"; botPrompt = lang === "hi" ? "Kitne users/team members CRM access karenge aur unke roles kya honge?" : "How many users or team members will need access, and what are their primary roles?"; }
      else if (!scopedData.crmFeatures) { nextStage = "CRM_FEATURES"; botPrompt = lang === "hi" ? "Aapki core customer management requirements kya hain?" : "What are your core lead and customer management needs (e.g. tracking contact history, notes)?"; }
      else if (!scopedData.crmPipeline) { nextStage = "CRM_PIPELINE"; botPrompt = lang === "hi" ? "Kya deal stages and pipeline tracking features chahiye?" : "Do you need custom sales pipeline stages and deal tracking?"; }
      else if (!scopedData.crmIntegrations) { nextStage = "CRM_INTEGRATIONS"; botPrompt = lang === "hi" ? "Kya WhatsApp aur email communications CRM se integrated chahiye?" : "Will you need WhatsApp, email, or other communication channels integrated directly into the CRM?"; }
      else if (!scopedData.crmAutomation) { nextStage = "CRM_AUTOMATION"; botPrompt = lang === "hi" ? "Kya CRM automation features (auto-lead assignment, notifications) chahiye?" : "What automated actions do you need within the CRM (e.g. auto-assigning leads, notifications)?"; }
      else if (!scopedData.crmDashboards) { nextStage = "CRM_DASHBOARDS"; botPrompt = lang === "hi" ? "Kya custom reporting/analytics dashboard chahiye?" : "Will you need custom analytics dashboards and reporting features?"; }
    } else if (intent === "WA_CRM") {
      if (!scopedData.waSetup) { nextStage = "WA_SETUP"; botPrompt = lang === "hi" ? "Kya aapke paas already WhatsApp Business API setup hai?" : "Do you have an existing WhatsApp Business API setup, or do we need to set it up from scratch?"; }
      else if (!scopedData.waVolume) { nextStage = "WA_VOLUME"; botPrompt = lang === "hi" ? "Aapka daily/monthly messages volume kitna hai?" : "What is your approximate daily or monthly customer messaging volume?"; }
      else if (!scopedData.waFeatures) { nextStage = "WA_FEATURES"; botPrompt = lang === "hi" ? "WhatsApp CRM ke core features kya hone chahiye (jaise broadcast, shared inbox)?" : "What are your core messaging requirements (e.g. broadcasts, team inbox, agent routing)?"; }
      else if (!scopedData.waReplies) { nextStage = "WA_REPLIES"; botPrompt = lang === "hi" ? "Kya query aane par automated replies set karne hain?" : "Do you need automated instant replies for incoming messages?"; }
      else if (!scopedData.waFollowups) { nextStage = "WA_FOLLOWUPS"; botPrompt = lang === "hi" ? "Kya customer follow-up sequences automatically run karne hain?" : "Do you need automated follow-up messaging sequences for inactive leads?"; }
      else if (!scopedData.waTeam) { nextStage = "WA_TEAM"; botPrompt = lang === "hi" ? "Kitne team members chat manage karenge?" : "How many team members need access to manage the WhatsApp conversations?"; }
      else if (!scopedData.waCrm) { nextStage = "WA_CRM"; botPrompt = lang === "hi" ? "Kya is WhatsApp setup ko kisi internal database/CRM se link karna hai?" : "Do we need to integrate this WhatsApp queue directly with an external CRM?"; }
    } else if (intent === "EMAIL_AUTO") {
      if (!scopedData.emailPlatform) { nextStage = "EMAIL_PLATFORM"; botPrompt = lang === "hi" ? "Aap konsa email platform use karte hain (Gmail, Outlook, custom SMTP)?" : "What email platform do you currently use (e.g. Gmail, Outlook, custom SMTP)?"; }
      else if (!scopedData.emailTypes) { nextStage = "EMAIL_TYPES"; botPrompt = lang === "hi" ? "Kis type ke incoming/outgoing emails automate karne hain?" : "What types of incoming or outgoing emails do you want to automate?"; }
      else if (!scopedData.emailClassify) { nextStage = "EMAIL_CLASSIFY"; botPrompt = lang === "hi" ? "Kya incoming emails ko classify/categorize (leads, support, billing) karna hai?" : "Do you need AI to classify/categorize incoming emails (e.g. support, billing, spam)?"; }
      else if (!scopedData.emailReplies) { nextStage = "EMAIL_REPLIES"; botPrompt = lang === "hi" ? "Kya replies automatically draft/send hone chahiye?" : "Do you need automated reply drafts or instant auto-replies generated?"; }
      else if (!scopedData.emailFollowups) { nextStage = "EMAIL_FOLLOWUPS"; botPrompt = lang === "hi" ? "Kya automatic follow-up sequences execute karne hain?" : "Do you need automated email follow-up sequences based on customer actions?"; }
      else if (!scopedData.emailApproval) { nextStage = "EMAIL_APPROVAL"; botPrompt = lang === "hi" ? "Kya email send hone se pehle human approval/review process chahiye?" : "Should emails be sent automatically, or do they require human approval first?"; }
    } else if (intent === "AI_CALLING") {
      if (!scopedData.callPurpose) { nextStage = "CALL_PURPOSE"; botPrompt = lang === "hi" ? "Automated calls ka main purpose kya hoga?" : "What is the primary purpose of the automated calls (e.g. lead qualification, reminders, appointments)?"; }
      else if (!scopedData.callDirection) { nextStage = "CALL_DIRECTION"; botPrompt = lang === "hi" ? "Ye calling agent incoming calls handle karega, outgoing calls, ya dono?" : "Will the calling agent handle incoming calls, outgoing calls, or both?"; }
      else if (!scopedData.callFeatures) { nextStage = "CALL_FEATURES"; botPrompt = lang === "hi" ? "Call ke dauran kya actions trigger hone chahiye (jaise slot booking, logging)?" : "What are the core capabilities needed during the call (e.g. booking calendar slots, logging answers)?"; }
      else if (!scopedData.callLanguages) { nextStage = "CALL_LANGUAGES"; botPrompt = lang === "hi" ? "Calling agent ko konse languages bolne aane chahiye?" : "Which languages does the calling agent need to speak fluently?"; }
      else if (!scopedData.callCrm) { nextStage = "CALL_CRM"; botPrompt = lang === "hi" ? "Kya calls details aur logs CRM me save karne hain?" : "Do we need to sync calling logs and customer answers directly with your CRM?"; }
      else if (!scopedData.callHandoff) { nextStage = "CALL_HANDOFF"; botPrompt = lang === "hi" ? "Kya call ke dauran live human agent handoff support chahiye?" : "Will you need human agent transfer fallback during the call?"; }
      else if (!scopedData.callLogging) { nextStage = "CALL_LOGGING"; botPrompt = lang === "hi" ? "Kya call recordings aur transcripts save karne hain?" : "Do you need call recording and speech-to-text transcript logging?"; }
    } else if (intent === "AI_NOT_SURE") {
      if (!scopedData.consultProblem) { nextStage = "CONSULT_PROBLEM"; botPrompt = lang === "hi" ? "Koi baat nahi. Mujhe apne business aur targets ke baare me thoda batayein. Main sahi digital approach decide karne me help karunga." : "No problem. Tell me a little about your business and what manual process or bottleneck you are trying to solve."; }
      else if (!scopedData.consultGoal) { nextStage = "CONSULT_GOAL"; botPrompt = lang === "hi" ? "Is automation se aapka primary goal kya hai (jaise time save karna, sales badhana)?" : "What is the primary goal you want to achieve with this automation (e.g. save time, increase sales)?"; }
    } else if (intent === "LEAD_MGMT" || intent === "CUST_SUPPORT" || intent === "WORKFLOW_AUTO" || intent === "CUSTOM_AI_AGENT") {
      if (!scopedData.autoWorkflow) { nextStage = "AUTO_WORKFLOW"; botPrompt = lang === "hi" ? "Abhi aap manual workflow kaise run karte hain?" : "What is the current manual process or workflow you want to automate?"; }
      else if (!scopedData.autoTrigger) { nextStage = "AUTO_TRIGGER"; botPrompt = lang === "hi" ? "Automation start karne ka trigger event kya hai?" : "What trigger event should start the automation sequence?"; }
      else if (!scopedData.autoAction) { nextStage = "AUTO_ACTION"; botPrompt = lang === "hi" ? "Trigger ke baad automation kya actions run karegi?" : "What specific actions should occur once the automation starts?"; }
      else if (!scopedData.autoTools) { nextStage = "AUTO_TOOLS"; botPrompt = lang === "hi" ? "Konse external tools link karne hain?" : "What tools or software systems are you currently using that need to be connected?"; }
      else if (!scopedData.autoResult) { nextStage = "AUTO_RESULT"; botPrompt = lang === "hi" ? "Automation flow ka ultimate final result kya hoga?" : "What is the desired final result or outcome of this automation flow?"; }
    } else if (intent === "BUILD_SOMETHING") {
      // Find category subtype
      const isEcomm = currentIntake.serviceLabel.includes("E-commerce") || currentIntake.projectTypes.includes("E-commerce");
      const isSaaS = currentIntake.serviceLabel.includes("SaaS") || currentIntake.projectTypes.includes("SaaS");
      const isApp = currentIntake.serviceLabel.includes("Application Development") || currentIntake.projectTypes.includes("Application Development") || currentIntake.serviceLabel.includes("Mobile App");
      const isAuto = currentIntake.serviceLabel.includes("AI-Automation") || currentIntake.projectTypes.includes("AI-Automation") || currentIntake.serviceLabel.includes("Business Automation") || currentIntake.serviceLabel.includes("Process Automation") || currentIntake.serviceLabel.toLowerCase().includes("automation");

      if (isEcomm) {
        if (!scopedData.ecommProducts) { nextStage = "ECOMM_PRODUCTS"; botPrompt = lang === "en" ? "What will you be selling?" : "Aap kya sell karenge?"; }
        else if (!scopedData.ecommPayments) { nextStage = "ECOMM_PAYMENTS"; botPrompt = lang === "en" ? "Will you need online payments?" : "Kya online payments integrate karwani hain?"; }
        else if (!scopedData.ecommInventory) { nextStage = "ECOMM_INVENTORY"; botPrompt = lang === "en" ? "Will you need inventory management?" : "Kya inventory management features chahiye?"; }
        else if (!scopedData.ecommAdmin) { nextStage = "ECOMM_ADMIN"; botPrompt = lang === "en" ? "Will you need an admin panel?" : "Kya admin panel ki zaroorat hai?"; }
      } else if (isSaaS) {
        if (!scopedData.saasUsers) { nextStage = "SAAS_USERS"; botPrompt = lang === "en" ? "Who are the target users for your SaaS?" : "Aapke SaaS ke target users kaun hain?"; }
        else if (!scopedData.saasWorkflow) { nextStage = "SAAS_WORKFLOW"; botPrompt = lang === "en" ? "What is the main workflow or problem this SaaS solves?" : "SaaS ka main workflow ya user path kya hoga?"; }
        else if (!scopedData.saasAuth) { nextStage = "SAAS_AUTH"; botPrompt = lang === "en" ? "Will you need user authentication (signup/login)?" : "Kya authentication setup chahiye (signup/login)?"; }
        else if (!scopedData.saasDashboard) { nextStage = "SAAS_DASHBOARD"; botPrompt = lang === "en" ? "Will your SaaS require a custom dashboard interface?" : "Kya user/admin custom dashboard dashboard interface chahiye?"; }
        else if (!scopedData.saasBilling) { nextStage = "SAAS_BILLING"; botPrompt = lang === "en" ? "Will you need subscription billing or payment gates?" : "Kya subscription billing setup (Stripe integrations) chahiye?"; }
        else if (!scopedData.saasIntegrations) { nextStage = "SAAS_INTEGRATIONS"; botPrompt = lang === "en" ? "Will you need to connect third-party APIs or integrations?" : "Kya external API integrations add karne hain?"; }
      } else if (isApp) {
        if (!scopedData.appPlatform) { nextStage = "APP_PLATFORM"; botPrompt = lang === "en" ? "Which platforms are we targeting: iOS, Android, or both?" : "Konsi platform target karni hai: iOS, Android, ya dono?"; }
        else if (!scopedData.appTargetUser) { nextStage = "APP_TARGET_USER"; botPrompt = lang === "en" ? "Who is the target user for the app?" : "App ke target users kaun hain?"; }
        else if (!scopedData.appFeatures) {
          nextStage = "APP_FEATURES";
          botPrompt = lang === "en"
            ? `Got it — a mobile app for ${scopedData.appTargetUser || 'local users'}, targeting ${scopedData.appPlatform === 'both' ? 'both iOS and Android' : scopedData.appPlatform}. What would you like the app to include?`
            : lang === "hi"
            ? `समझ गया — ${scopedData.appTargetUser || 'लोकल यूज़र्स'} के लिए मोबाइल ऐप, जो ${scopedData.appPlatform === 'both' ? 'iOS और Android दोनों' : scopedData.appPlatform} को टार्गेट कर रहा है। आप ऐप में क्या शामिल करना चाहेंगे?`
            : `Got it — ${scopedData.appTargetUser || 'local users'} ke liye mobile app, targeting ${scopedData.appPlatform === 'both' ? 'both iOS and Android' : scopedData.appPlatform}. Aap app me kya requirements include karna chahenge?`;
        }
        else if (!scopedData.appAuth) { nextStage = "APP_AUTH"; botPrompt = lang === "en" ? "Will the mobile app require user authentication?" : "Kya app me signup/login setup chahiye?"; }
        else if (!scopedData.appBackend) { nextStage = "APP_BACKEND"; botPrompt = lang === "en" ? "Will you need a custom backend database or admin API to manage app data?" : "Kya content control ke liye admin database panel chahiye?"; }
        else if (!scopedData.appNotifications) { nextStage = "APP_NOTIFICATIONS"; botPrompt = lang === "en" ? "Do you need push notifications integrated?" : "Kya push notifications integration chahiye?"; }
      } else if (isAuto) {
        if (!scopedData.autoWorkflow) { nextStage = "AUTO_WORKFLOW"; botPrompt = lang === "en" ? "What is the current manual process or workflow you want to automate?" : "Abhi aap manual workflow kaiser run karte hain?"; }
        else if (!scopedData.autoTrigger) { nextStage = "AUTO_TRIGGER"; botPrompt = lang === "en" ? "What trigger event should start the automation sequence?" : "Automation shuru karne ka trigger event kya hai?"; }
        else if (!scopedData.autoAction) { nextStage = "AUTO_ACTION"; botPrompt = lang === "en" ? "What specific actions should occur once the automation starts?" : "Trigger ke baad automation kya actions run karegi?"; }
        else if (!scopedData.autoTools) { nextStage = "AUTO_TOOLS"; botPrompt = lang === "en" ? "What tools or software systems are you currently using that need to be connected?" : "Konse external tools use hotey hain jo connect karne hain?"; }
        else if (!scopedData.autoResult) { nextStage = "AUTO_RESULT"; botPrompt = lang === "en" ? "What is the desired final result or outcome of this automation flow?" : "Automation flow ka ultimate final result kya hoga?"; }
      }
    }

    if (nextStage !== "NONE") {
      setScopingStage(nextStage);
      setChatState("SCOPING_PROJECT");
      addBotMessage(botPrompt);
      return true;
    } else {
      // Consultancy recommendation generator check
      if (intent === "CONSULTANCY" || intent === "NOT_SURE") {
        let recommendation = "website";
        const goal = scopedData.consultGoal.toLowerCase();
        const action = scopedData.consultCustomerAction.toLowerCase();
        if (goal.includes("saas") || action.includes("subscribe") || action.includes("dashboard")) {
          recommendation = "SaaS application";
        } else if (goal.includes("app") || action.includes("phone") || action.includes("mobile") || action.includes("notification")) {
          recommendation = "Mobile app";
        } else if (goal.includes("marketplace") || action.includes("vendor") || action.includes("sell")) {
          recommendation = "Marketplace platform";
        } else if (goal.includes("automate") || goal.includes("workflow")) {
          recommendation = "Custom software / Automation system";
        }

        let recomMsg = "";
        if (lang === "en") {
          recomMsg = `Based on your goal, I recommend building a ${recommendation}. KVYASH can assist you in drafting the full blueprint for this.`;
        } else {
          recomMsg = `Aapke target ko samajhte hue, main recommend karta hoon ki aap ek ${recommendation} banwayein. KVYASH iska technical plan design kar sakta hai.`;
        }
        addBotMessage(recomMsg);
      }

      // Check next intent
      const nextIndex = intentIndex + 1;
      if (nextIndex < allIntents.length) {
        setCurrentIntentIndex(nextIndex);
        const nextIntent = allIntents[nextIndex];
        
        let switchAnnouncement = "";
        if (lang === "en") {
          switchAnnouncement = `Got it. Now let's discuss the details for ${nextIntent}.`;
        } else {
          switchAnnouncement = `Maine note kar liya hai. Ab ${nextIntent} ke baare me discuss karte hain.`;
        }
        addBotMessage(switchAnnouncement);
        
        return runScoping(userText, nextIntent, nextIndex, allIntents, currentIntake, lang, scopedData);
      } else {
        // Compile everything
        const parts: string[] = [];

        if (scopedData.consultGoal) {
          parts.push(`Consult Goal: ${scopedData.consultGoal}. Priority: ${scopedData.consultProblem}. Cust action: ${scopedData.consultCustomerAction}.`);
        }
        if (scopedData.offlineBizType) {
          parts.push(`Offline ${scopedData.offlineBizType} to online. Action: ${scopedData.offlineDesiredAction}. Payments: ${scopedData.offlinePayments}. Delivery: ${scopedData.offlineDelivery}. Marketing: ${scopedData.offlineMarketing}.`);
        }
        if (scopedData.marketType) {
          parts.push(`Marketplace targeting ${scopedData.marketType} (${scopedData.marketProductOrService}). Onboarding: ${scopedData.marketVendorOnboarding}. Commission: ${scopedData.marketCommission}. Dashboards: ${scopedData.marketDashboards}.`);
        }
        if (scopedData.marketingBusiness) {
          parts.push(`Marketing growth for ${scopedData.marketingBusiness} (Live: ${scopedData.marketingIsLive}). Goal: ${scopedData.marketingObjective}. SEO required: ${scopedData.marketingSEO}.`);
        }
        if (scopedData.ecommProducts) {
          parts.push(`Ecommerce platform selling: ${scopedData.ecommProducts}. Payments: ${scopedData.ecommPayments}. Inventory: ${scopedData.ecommInventory}. Admin Panel: ${scopedData.ecommAdmin}.`);
        }
        if (scopedData.saasUsers) {
          parts.push(`SaaS project for ${scopedData.saasUsers}. Workflow: ${scopedData.saasWorkflow}. Authentication: ${scopedData.saasAuth}. Dashboard: ${scopedData.saasDashboard}. Billing: ${scopedData.saasBilling}. Integrations: ${scopedData.saasIntegrations}.`);
        }
        if (scopedData.botPurpose) {
          parts.push(`AI Chatbot for ${scopedData.botPurpose}. Target Users: ${scopedData.botUsers}. Knowledge base: ${scopedData.botKnowledge}. Channels: ${scopedData.botChannels}. Lead Capture: ${scopedData.botLeadCapture}. Handoff: ${scopedData.botHandoff}.`);
        }
        if (scopedData.appPlatform) {
          parts.push(`Mobile app targeting ${scopedData.appPlatform}. Target user: ${scopedData.appTargetUser}. Features: ${scopedData.appFeatures}. Authentication: ${scopedData.appAuth}. Backend API: ${scopedData.appBackend}. Notifications: ${scopedData.appNotifications}.`);
        }
        if (scopedData.autoWorkflow) {
          parts.push(`Automation for ${scopedData.autoWorkflow}. Trigger: ${scopedData.autoTrigger}. Action: ${scopedData.autoAction}. Connected Tools: ${scopedData.autoTools}. Outcome: ${scopedData.autoResult}.`);
        }
        if (scopedData.crmType) {
          parts.push(`CRM: ${scopedData.crmType}. Users: ${scopedData.crmUsers}. Features: ${scopedData.crmFeatures}. Pipeline: ${scopedData.crmPipeline}. Integrations: ${scopedData.crmIntegrations}. Automation: ${scopedData.crmAutomation}. Dashboards: ${scopedData.crmDashboards}.`);
        }
        if (scopedData.waSetup) {
          parts.push(`WhatsApp CRM: ${scopedData.waSetup}. Daily Vol: ${scopedData.waVolume}. Features: ${scopedData.waFeatures}. Replies: ${scopedData.waReplies}. Followups: ${scopedData.waFollowups}. Team: ${scopedData.waTeam}. CRM integration: ${scopedData.waCrm}.`);
        }
        if (scopedData.emailPlatform) {
          parts.push(`Email Automation: ${scopedData.emailPlatform}. Types: ${scopedData.emailTypes}. Classification: ${scopedData.emailClassify}. Replies: ${scopedData.emailReplies}. Followups: ${scopedData.emailFollowups}. Approval: ${scopedData.emailApproval}.`);
        }
        if (scopedData.callPurpose) {
          parts.push(`AI Calling Agent: ${scopedData.callPurpose}. Direction: ${scopedData.callDirection}. Capabilities: ${scopedData.callFeatures}. Languages: ${scopedData.callLanguages}. CRM sync: ${scopedData.callCrm}. Handoff: ${scopedData.callHandoff}. Logging: ${scopedData.callLogging}.`);
        }

        const compiled = parts.length > 0 ? parts.join(" | ") : userText;
        currentIntake.requirements = compiled;
        setIntakeData(currentIntake);
        setScopingStage("NONE");

        const next = getNextStepState(chatState, currentIntake);
        setChatState(next);
        addBotMessage(getStepPromptMessage(next, lang, currentIntake.service, currentIntake.projectTypes));
        return false;
      }
    }
  };

  const initScoping = (text: string, category: string, currentIntake: IntakeData, lang: LangType) => {
    // Top level classifier fallback mapping
    const intents = classifyIntents(text);
    setActiveIntents(intents);
    setCurrentIntentIndex(0);
    return runScoping(text, intents[0], 0, intents, currentIntake, lang, scopingData);
  };

  const getNextStepState = (current: ChatState, currentData: IntakeData): ChatState => {
    if (!currentData.serviceLabel) return "ASK_PROJECT_TYPE";
    if (!currentData.requirements || !isDetailed(currentData.requirements)) return "ASK_REQUIREMENTS";
    if (!currentData.name) return "ASK_CONTACT_NAME";
    if (!currentData.email) return "ASK_CONTACT_EMAIL";
    if (currentData.company === "") return "ASK_OPTIONAL_COMPANY";
    if (currentData.phone === "") return "ASK_OPTIONAL_PHONE";
    if (currentData.timeline === "") return "ASK_OPTIONAL_TIMELINE";
    if (currentData.budget === "") return "ASK_OPTIONAL_BUDGET";
    return "REVIEW";
  };

  const getScopingPromptTextOnly = (
    stage: typeof scopingStage,
    lang: LangType,
    scopedData: typeof scopingData
  ): string => {
    switch (stage) {
      // E-commerce
      case "ECOMM_PRODUCTS":
        return lang === "en" ? "What will you be selling?" : "Aap kya sell karenge?";
      case "ECOMM_PAYMENTS":
        return lang === "en" ? "Will you need online payments?" : "Kya online payments integrate karwani hain?";
      case "ECOMM_INVENTORY":
        return lang === "en" ? "Will you need inventory management?" : "Kya inventory management features chahiye?";
      case "ECOMM_ADMIN":
        return lang === "en" ? "Will you need an admin panel?" : "Kya admin panel ki zaroorat hai?";
      // SaaS
      case "SAAS_USERS":
        return lang === "en" ? "Who are the target users for your SaaS?" : "Aapke SaaS ke target users kaun hain?";
      case "SAAS_WORKFLOW":
        return lang === "en" ? "What is the main workflow or problem this SaaS solves?" : "SaaS ka main workflow ya user path kya hoga?";
      case "SAAS_AUTH":
        return lang === "en" ? "Will you need user authentication (signup/login)?" : "Kya authentication setup chahiye (signup/login)?";
      case "SAAS_DASHBOARD":
        return lang === "en" ? "Will your SaaS require a custom dashboard interface?" : "Kya user/admin custom dashboard dashboard interface chahiye?";
      case "SAAS_BILLING":
        return lang === "en" ? "Will you need subscription billing or payment gates?" : "Kya subscription billing setup (Stripe integrations) chahiye?";
      case "SAAS_INTEGRATIONS":
        return lang === "en" ? "Will you need to connect third-party APIs or integrations?" : "Kya external API integrations add karne hain?";
      // AI Chatbot
      case "BOT_PURPOSE":
        return lang === "hi" ? "Chatbot ka main purpose kya hai?" : "What is the primary purpose of this AI chatbot?";
      case "BOT_USERS":
        return lang === "hi" ? "Users kaun honge (customers ya support staff)?" : "Who will be interacting with the chatbot (customers, staff, etc.)?";
      case "BOT_KNOWLEDGE":
        return lang === "hi" ? "Bot ko train karne ke liye knowledge source kya hai?" : "What is the knowledge source (documents, database, FAQs) for training the bot?";
      case "BOT_CHANNELS":
        return lang === "hi" ? "Chatbot kahan deploy hoga (website, WhatsApp, Slack)?" : "What channels should the bot support (website, WhatsApp, Slack)?";
      case "BOT_LEAD_CAPTURE":
        return lang === "hi" ? "Kya chatbot contact leads capture karega?" : "Should the chatbot capture leads and contact details?";
      case "BOT_HANDOFF":
        return lang === "hi" ? "Kya human agent handoff fallback system chahiye?" : "Will you need a human handoff fallback or live chat trigger?";
      // Mobile App
      case "APP_PLATFORM":
        return lang === "en" ? "Which platforms are we targeting: iOS, Android, or both?" : "Konsi platform target karni hai: iOS, Android, ya dono?";
      case "APP_TARGET_USER":
        return lang === "en" ? "Who is the target user for the app?" : "App ke target users kaun hain?";
      case "APP_FEATURES":
        return lang === "en"
          ? `Got it — a mobile app for ${scopedData.appTargetUser || 'local users'}, targeting ${scopedData.appPlatform === 'both' ? 'both iOS and Android' : scopedData.appPlatform}. What would you like the app to include?`
          : lang === "hi"
          ? `समझ गया — ${scopedData.appTargetUser || 'लोकल यूज़र्स'} के लिए मोबाइल ऐप, जो ${scopedData.appPlatform === 'both' ? 'iOS और Android दोनों' : scopedData.appPlatform} को टार्गेट कर रहा है। आप ऐप में क्या शामिल करना चाहेंगे?`
          : `Got it — ${scopedData.appTargetUser || 'local users'} ke liye mobile app, targeting ${scopedData.appPlatform === 'both' ? 'both iOS and Android' : scopedData.appPlatform}. Aap app me kya requirements include karna chahenge?`;
      case "APP_AUTH":
        return lang === "en" ? "Will the mobile app require user authentication?" : "Kya app me signup/login setup chahiye?";
      case "APP_BACKEND":
        return lang === "en" ? "Will you need a custom backend database or admin API to manage app data?" : "Kya content control ke liye admin database panel chahiye?";
      case "APP_NOTIFICATIONS":
        return lang === "en" ? "Do you need push notifications integrated?" : "Kya push notifications integration chahiye?";
      // Automation
      case "AUTO_WORKFLOW":
        return lang === "en" ? "What is the current manual process or workflow you want to automate?" : "Abhi aap manual workflow kaiser run karte hain?";
      case "AUTO_TRIGGER":
        return lang === "en" ? "What trigger event should start the automation sequence?" : "Automation shuru karne ka trigger event kya hai?";
      case "AUTO_ACTION":
        return lang === "en" ? "What specific actions should occur once the automation starts?" : "Trigger ke baad automation kya actions run karegi?";
      case "AUTO_TOOLS":
        return lang === "en" ? "What tools or software systems are you currently using that need to be connected?" : "Konse external tools use hotey hain jo connect karne hain?";
      case "AUTO_RESULT":
        return lang === "en" ? "What is the desired final result or outcome of this automation flow?" : "Automation flow ka ultimate final result kya hoga?";
      // Consultancy Flow
      case "CONSULT_GOAL":
        return lang === "hi" ? "Aap business me kya improve ya achieve karna chahte hain?" : "What are you trying to improve or achieve?";
      case "CONSULT_PROBLEM":
        return lang === "hi"
          ? "Inme se aapka challenge kya hai?\n• New business idea\n• Existing business digitization\n• Product/MVP planning\n• Technology decision\n• Process improvement\n• Existing website/software problem\n• Growth/marketing"
          : "Which of these best describes your business stage or challenge?\n\n• New business idea\n• Existing business digitization\n• Product/MVP planning\n• Technology decision\n• Process improvement\n• Existing website/software problem\n• Growth/marketing";
      case "CONSULT_CUST_ACTION":
        return lang === "hi" ? "Aapke customers online kya features use kar paayein?" : "What should your customers be able to do online?";
      // Offline to Online Flow
      case "OFFLINE_BIZ":
        return lang === "hi" ? "Aapka offline business kis type ka hai (jaise clothing store, restaurant, manufacturer)?" : "What type of offline business do you run (e.g. clothing store, restaurant, manufacturer)?";
      case "OFFLINE_ACTION":
        return lang === "hi" ? "Aap kya chahte hain - browse products, order and pay online, WhatsApp par connect, ya ye sabhi?" : "Do you want customers mainly to browse products, order and pay online, contact you on WhatsApp, or all of these?";
      case "OFFLINE_PAYMENTS":
        return lang === "hi" ? "Kya online payments integration chahiye?" : "Will you need online payments integrated?";
      case "OFFLINE_DELIVERY":
        return lang === "hi" ? "Delivery ke liye koi location limit ya constraints hain?" : "Do you have specific delivery or service area constraints?";
      case "OFFLINE_MARKETING":
        return lang === "hi" ? "Kya launch ke baad marketing support chahiye?" : "Will you need digital marketing support to launch online?";
      // Marketplace Flow
      case "MARKET_TARGET":
        return lang === "hi" ? "Kya ye B2B marketplace hai ya B2C?" : "Is this marketplace B2B (business-to-business) or B2C (business-to-consumer)?";
      case "MARKET_MODEL":
        return lang === "hi" ? "Kya ye products ke liye hai (jaise Amazon) ya service booking ke liye?" : "Is it a product marketplace (like Amazon), service booking marketplace (like Urban Company), or local delivery?";
      case "MARKET_ONBOARDING":
        return lang === "hi" ? "Vendors onboarding process kya hoga (self-signup ya admin check)?" : "How should vendors onboard and list products/services (self-signup, manual approval, or direct upload)?";
      case "MARKET_COMMISSION":
        return lang === "hi" ? "Commission model kya hoga (commission per order ya flat subscription fee)?" : "Will you use a commission-based model per order, or flat subscription fees for vendors?";
      case "MARKET_DASHBOARDS":
        return lang === "hi" ? "Kya vendors aur customers dono ke liye separate dashboard portals chahiye?" : "Will you need dedicated dashboards for both vendors and customers?";
      // Marketing Flow
      case "MARKETING_BIZ":
        return lang === "hi" ? "Aap kis business ya product ko promote karna chahte hain?" : "What is the business or product we are promoting?";
      case "MARKETING_LIVE":
        return lang === "hi" ? "Kya aapki website ya application already live hai?" : "Is the website or app already live?";
      case "MARKETING_GOAL":
        return lang === "hi" ? "Primary goal kya hai - website traffic, organic leads, paid meta/google sales, ya brand awareness?" : "Is your main goal more website traffic, organic leads, paid meta/google sales, or overall brand awareness?";
      case "MARKETING_SEO":
        return lang === "hi" ? "Kya SEO optimization setups chahiye?" : "Will you need search engine optimization (SEO) setups?";
      // CRM
      case "CRM_TYPE":
        return lang === "hi" ? "Kya aap existing CRM (HubSpot/Salesforce) integrate karna chahte hain ya new custom CRM build karna hai?" : "Will this be integrated with an existing CRM (like HubSpot or Salesforce), or do we need to build a new custom CRM?";
      case "CRM_USERS":
        return lang === "hi" ? "Kitne users/team members CRM access karenge aur unke roles kya honge?" : "How many users or team members will need access, and what are their primary roles?";
      case "CRM_FEATURES":
        return lang === "hi" ? "Aapki core customer management requirements kya hain?" : "What are your core lead and customer management needs (e.g. tracking contact history, notes)?";
      case "CRM_PIPELINE":
        return lang === "hi" ? "Do you need custom sales pipeline stages and deal tracking?" : "Do you need custom sales pipeline stages and deal tracking?";
      case "CRM_INTEGRATIONS":
        return lang === "hi" ? "Kya WhatsApp ya Email integration is CRM ke sath chahiye?" : "Should we integrate WhatsApp or Email with this CRM?";
      case "CRM_AUTOMATION":
        return lang === "hi" ? "Kya CRM automation features (auto-lead assignment, notifications) chahiye?" : "What automated actions do you need within the CRM (e.g. auto-assigning leads, notifications)?";
      case "CRM_DASHBOARDS":
        return lang === "hi" ? "Kya custom reporting/analytics dashboard chahiye?" : "Will you need custom analytics dashboards and reporting features?";
      // WhatsApp CRM
      case "WA_SETUP":
        return lang === "hi" ? "Kya aapke paas already WhatsApp Business API setup hai?" : "Do you have an existing WhatsApp Business API setup, or do we need to set it up from scratch?";
      case "WA_VOLUME":
        return lang === "hi" ? "Aapka daily/monthly messages volume kitna hai?" : "What is your approximate daily or monthly customer messaging volume?";
      case "WA_FEATURES":
        return lang === "hi" ? "WhatsApp CRM ke core features kya hone chahiye (jaise broadcast, shared inbox)?" : "What are your core messaging requirements (e.g. broadcasts, team inbox, agent routing)?";
      case "WA_REPLIES":
        return lang === "hi" ? "Kya query aane par automated replies set karne hain?" : "Do you need automated instant replies for incoming messages?";
      case "WA_FOLLOWUPS":
        return lang === "hi" ? "Kya customer follow-up sequences automatically run karne hain?" : "Do you need automated follow-up messaging sequences for inactive leads?";
      case "WA_TEAM":
        return lang === "hi" ? "Kitne team members chat manage karenge?" : "How many team members need access to manage the WhatsApp conversations?";
      case "WA_CRM":
        return lang === "hi" ? "Kya is WhatsApp setup ko kisi internal database/CRM se link karna hai?" : "Do we need to integrate this WhatsApp queue directly with an external CRM?";
      // Email Automation
      case "EMAIL_PLATFORM":
        return lang === "hi" ? "Aap konsa email platform use karte hain (Gmail, Outlook, custom SMTP)?" : "What email platform do you currently use (e.g. Gmail, Outlook, custom SMTP)?";
      case "EMAIL_TYPES":
        return lang === "hi" ? "Kis type ke incoming/outgoing emails automate karne hain?" : "What types of incoming or outgoing emails do you want to automate?";
      case "EMAIL_CLASSIFY":
        return lang === "hi" ? "Kya incoming emails ko classify/categorize (leads, support, billing) karna hai?" : "Do you need AI to classify/categorize incoming emails (e.g. support, billing, spam)?";
      case "EMAIL_REPLIES":
        return lang === "hi" ? "Kya replies automatically draft/send hone chahiye?" : "Do you need automated reply drafts or instant auto-replies generated?";
      case "EMAIL_FOLLOWUPS":
        return lang === "hi" ? "Kya automatic follow-up sequences execute karne hain?" : "Do you need automated email follow-up sequences based on customer actions?";
      case "EMAIL_APPROVAL":
        return lang === "hi" ? "Kya email send hone se pehle human approval/review process chahiye?" : "Should emails be sent automatically, or do they require human approval first?";
      // AI Calling Agent
      case "CALL_PURPOSE":
        return lang === "hi" ? "Automated calls ka main purpose kya hoga?" : "What is the primary purpose of the automated calls (e.g. lead qualification, reminders, appointments)?";
      case "CALL_DIRECTION":
        return lang === "hi" ? "Ye calling agent incoming calls handle karega, outgoing calls, ya dono?" : "Will the calling agent handle incoming calls, outgoing calls, or both?";
      case "CALL_FEATURES":
        return lang === "hi" ? "Call ke dauran kya actions trigger hone chahiye (jaise slot booking, logging)?" : "What are the core capabilities needed during the call (e.g. booking calendar slots, logging answers)?";
      case "CALL_LANGUAGES":
        return lang === "hi" ? "Calling agent ko konse languages bolne aane chahiye?" : "Which languages does the calling agent need to speak fluently?";
      case "CALL_CRM":
        return lang === "hi" ? "Kya calls details aur logs CRM me save karne hain?" : "Do we need to sync calling logs and customer answers directly with your CRM?";
      case "CALL_HANDOFF":
        return lang === "hi" ? "Kya call ke dauran live human agent handoff support chahiye?" : "Will you need human agent transfer fallback during the call?";
      case "CALL_LOGGING":
        return lang === "hi" ? "Kya call recordings aur transcripts save karne hain?" : "Do you need call recording and speech-to-text transcript logging?";
      // AI Select Subtype
      case "AI_SELECT_SUBTYPE":
        return lang === "hi" ? "Aap kya build ya automate karna chahte hain?" : "What would you like to build or automate?";
      default:
        return "";
    }
  };

  const getRequirementsPrompt = (service: string, lang: LangType, projectTypes?: string[], currentReqs?: string): string => {
    const type = (projectTypes && projectTypes[0]) || service;
    const normalizedType = type.toLowerCase();

    if (currentReqs && currentReqs.trim().length > 0) {
      const req = currentReqs.trim();
      if (lang === "hi") {
        return `समझ गया — ${req}। आप इसमें क्या फीचर्स या क्षमताएं शामिल करना चाहेंगे?`;
      } else if (lang === "hinglish") {
        return `Got it — ${req}. Aap isme kya features include karna chahenge?`;
      } else {
        return `Got it — ${req}. What features or capabilities would you like it to include?`;
      }
    }

    const isNonsense = (t: string) => {
      if (t.length < 3) return true;
      if (/^[bcdfghjklmnpqrstvwxyz]+$/.test(t)) return true;
      if (/^(asdf|qwer|zxcv)/.test(t)) return true;
      if (/(.)\1\1/.test(t)) return true;
      return false;
    };
    
    if (lang === "hi") {
      if (normalizedType.includes("ecommerce") || normalizedType.includes("e-commerce")) {
        return "आप क्या सेल करेंगे, और क्या पेमेंट्स, इन्वेंटरी, या एडमिन पैनल की ज़रूरत है?";
      }
      if (normalizedType.includes("saas") || normalizedType.includes("web-app") || normalizedType.includes("web application")) {
        return "SaaS प्रोडक्ट क्या प्रॉब्लम सॉल्व करेगा, और इसे कौन यूज़ करेगा?";
      }
      if (normalizedType.includes("chatbot") || normalizedType.includes("ai")) {
        return "Chatbot क्या हैंडल करेगा — कस्टमर सपोर्ट, लीड जनरेशन, इंटरनल असिस्टेंस या कुछ और?";
      }
      if (normalizedType.includes("automation")) {
        return "आप बिजनेस का कौन सा प्रोसेस ऑटोमेट करना चाहते हैं?";
      }
      if (normalizedType.includes("app") || normalizedType.includes("mobile") || normalizedType.includes("android") || normalizedType.includes("ios")) {
        return "क्या आपको एंड्रॉइड ऐप, iOS, या दोनों की ज़रूरत है?";
      }
      if (isNonsense(normalizedType)) {
        return "मुझे ठीक से समझ नहीं आया। आप किस टाइप की वेबसाइट बनवाना चाहते हैं — कंपनी वेबसाइट, पोर्टफोलियो, ई-कॉमर्स या कुछ और?";
      }
      if (normalizedType === "something else" || normalizedType === "other" || normalizedType === "kuch aur") {
        return "कोई बात नहीं। मुझे थोड़ा बताएं कि वेबसाइट में क्या फंक्शन्स चाहिए, और मैं सही स्ट्रक्चर डिफाइन करूँगा।";
      }
      if (normalizedType && normalizedType !== "custom-software" && normalizedType !== "web-development") {
        return `समझ गया — एक ${type}। आप इसमें क्या इन्क्लूड करना चाहेंगे (जैसे प्रॉपर्टी लिस्टिंग्स, कॉन्टैक्ट फॉर्म्स, डैशबोर्ड्स या कुछ और)?`;
      }
      return "आप किस टाइप की वेबसाइट बनवाना चाहते हैं — कंपनी वेबसाइट, पोर्टफोलियो, ई-कॉमर्स या कुछ और?";
    }
    
    if (lang === "hinglish") {
      if (normalizedType.includes("ecommerce") || normalizedType.includes("e-commerce")) {
        return "Aap kya sell karenge, aur kya payments, inventory, ya admin panel ki zaroorat hai?";
      }
      if (normalizedType.includes("saas") || normalizedType.includes("web-app") || normalizedType.includes("web application")) {
        return "SaaS product kya problem solve karega, aur ise kaun use karega?";
      }
      if (normalizedType.includes("chatbot") || normalizedType.includes("ai")) {
        return "Chatbot kya handle karega — customer support, lead generation, internal assistance, ya kuch aur?";
      }
      if (normalizedType.includes("automation")) {
        return "Aap business ka kaun sa process automate karna chahte hain?";
      }
      if (normalizedType.includes("app") || normalizedType.includes("mobile") || normalizedType.includes("android") || normalizedType.includes("ios")) {
        return "Aapko Android app, iOS, ya dono chahiye?";
      }
      if (isNonsense(normalizedType)) {
        return "Mujhe theek se samajh nahi aaya. Aap kis type ki website banwana chahte hain — company website, portfolio, ecommerce, ya kuch aur?";
      }
      if (normalizedType === "something else" || normalizedType === "other" || normalizedType === "kuch aur") {
        return "Koi baat nahi. Mujhe thoda batayein ki website me kya functions chahiye, aur main sahi structure define karunga.";
      }
      if (normalizedType && normalizedType !== "custom-software" && normalizedType !== "web-development") {
        return `Samajh gaya — ek ${type}. Aap isme kya include karna chahenge (jaise property listings, contact forms, dashboards, ya kuch aur)?`;
      }
      return "Aap kis type ki website banwana chahte hain — company website, portfolio, ecommerce, ya kuch aur?";
    }
    
    // English Default
    if (normalizedType.includes("ecommerce") || normalizedType.includes("e-commerce")) {
      return "What will you be selling, and do you need payments, inventory, or an admin panel?";
    }
    if (normalizedType.includes("saas") || normalizedType.includes("web-app") || normalizedType.includes("web application")) {
      return "What problem will the SaaS product solve, and who will use it?";
    }
    if (normalizedType.includes("chatbot") || normalizedType.includes("ai")) {
      return "What would you like the chatbot to handle — customer support, lead generation, internal assistance, or something else?";
    }
    if (normalizedType.includes("automation")) {
      return "Which business process would you like to automate?";
    }
    if (normalizedType.includes("app") || normalizedType.includes("mobile") || normalizedType.includes("android") || normalizedType.includes("ios")) {
      return "Do you need Android, iOS, or both?";
    }
    if (isNonsense(normalizedType)) {
      return "I didn't quite catch that. What kind of website are you looking for — company website, portfolio, ecommerce, or something else?";
    }
    if (normalizedType === "something else" || normalizedType === "other") {
      return "No problem. Tell me briefly what you want the website to do, and I'll help define the right structure.";
    }
    if (normalizedType && normalizedType !== "custom-software" && normalizedType !== "web-development") {
      return `Got it — a ${type}. What would you like it to include, such as property listings, search/filtering, enquiry forms, agent dashboards, or something else?`;
    }
    return "What kind of website are you looking for — company website, portfolio, ecommerce, or something else?";
  };

  const getStepPromptMessage = (state: ChatState, lang: LangType, serviceSlug?: string, projectTypes?: string[]): string => {
    switch (state) {
      case "ASK_CONTACT_NAME":
        if (lang === "en") {
          return "Perfect. I have the project details noted. To send this enquiry to the KVYASH team, what should I call you?";
        } else if (lang === "hi") {
          return "बिल्कुल। मैंने प्रोजेक्ट डिटेल्स नोट कर ली हैं। इस enquiry को KVYASH टीम को भेजने के लिए, आपका नाम क्या है?";
        } else {
          return "Perfect. Maine project details note kar li hain. Is enquiry ko KVYASH team ko bhejne ke liye, aapka naam kya hai?";
        }
      case "ASK_CONTACT_EMAIL": {
        const nameCap = intakeData.name ? (intakeData.name.charAt(0).toUpperCase() + intakeData.name.slice(1)) : "";
        if (lang === "en") {
          return nameCap 
            ? `Thanks, ${nameCap}. What is the best business email to reach you on?`
            : "Thanks. What is the best business email to reach you on?";
        } else if (lang === "hi") {
          return nameCap
            ? `धन्यवाद, ${nameCap}। आपसे संपर्क करने के लिए सबसे अच्छा बिजनेस ईमेल क्या है?`
            : "धन्यवाद। आपसे संपर्क करने के लिए सबसे अच्छा बिजनेस ईमेल क्या है?";
        } else {
          return nameCap
            ? `Thanks, ${nameCap}. Aapka business email address kya hai?`
            : "Thanks. Aapka business email address kya hai?";
        }
      }
      case "ASK_PROJECT_TYPE":
        if (lang === "en") {
          return "Absolutely. I can help you scope it. What are you looking to build — a website, ecommerce store, SaaS product, marketplace, mobile app, AI system, automation, or something else?";
        } else if (lang === "hi") {
          return "ज़रूर। मैं इसे स्कोप करने में मदद करूँगा। आप क्या बनवाना चाहते हैं — वेबसाइट, ई-कॉमर्स स्टोर, SaaS, मार्केटप्लेस, मोबाइल ऐप, AI सिस्टम, ऑटोमेशन या कुछ और?";
        } else {
          return "Zaroor. Main ise scope karne me madad karunga. Aap kya banwana chahte hain — website, ecommerce store, SaaS, marketplace, mobile app, AI system, automation, ya kuch aur?";
        }
      case "ASK_REQUIREMENTS":
        return getRequirementsPrompt(serviceSlug || "custom-software", lang, projectTypes, intakeData.requirements);
      case "ASK_OPTIONAL_COMPANY":
        if (lang === "en") {
          return "What is your company or organization name? (Optional)";
        } else if (lang === "hi") {
          return "आपकी कंपनी या ऑर्गनाइजेशन का नाम क्या है? (ऑप्शनल)";
        } else {
          return "Aapki company ya organization ka naam kya hai? (Optional)";
        }
      case "ASK_OPTIONAL_PHONE":
        if (lang === "en") {
          return "Can you share your phone number? (Optional)";
        } else if (lang === "hi") {
          return "क्या आप अपना फोन नंबर शेयर करेंगे? (ऑप्शनल)";
        } else {
          return "Kya aap apna phone number share karenge? (Optional)";
        }
      case "ASK_OPTIONAL_TIMELINE":
        if (lang === "en") {
          return "What is your preferred timeline for the project? (Optional)";
        } else if (lang === "hi") {
          return "आपका पसंदीदा टाइमलाइन क्या है? (ऑप्शनल)";
        } else {
          return "Aapka preferred timeline kya hai? (Optional)";
        }
      case "ASK_OPTIONAL_BUDGET":
        if (lang === "en") {
          return "What is your approximate budget for the project? (Optional)";
        } else if (lang === "hi") {
          return "आपका अनुमानित बजट क्या है? (ऑप्शनल)";
        } else {
          return "Aapka approximate budget kya hai? (Optional)";
        }
      case "REVIEW":
        if (lang === "en") {
          return "Please review your project enquiry summary before we submit it to the KVYASH team:";
        } else if (lang === "hi") {
          return "कृपया सबमिट करने से पहले अपनी प्रोजेक्ट इन्क्वायरी समरी को रिव्यू कर लें:";
        } else {
          return "Kripya submit karne se pehle apne project enquiry summary ko review kar lein:";
        }
      default:
        return "";
    }
  };

  const getStepNumber = (state: ChatState): number => {
    switch (state) {
      case "SCOPING_PROJECT": return 1;
      case "ASK_PROJECT_TYPE": return 2;
      case "ASK_REQUIREMENTS": return 3;
      case "ASK_CONTACT_NAME": return 4;
      case "ASK_CONTACT_EMAIL": return 5;
      case "ASK_OPTIONAL_COMPANY": return 6;
      case "ASK_OPTIONAL_PHONE": return 7;
      case "ASK_OPTIONAL_TIMELINE": return 8;
      case "ASK_OPTIONAL_BUDGET": return 8;
      case "REVIEW": return 8;
      default: return 0;
    }
  };

  const getLeadScore = (data: IntakeData): "HOT" | "WARM" | "COLD" => {
    if (data.name && data.email && data.service && data.requirements && data.timeline) {
      return "HOT";
    }
    if (data.name && data.email && data.service && data.requirements) {
      return "WARM";
    }
    return "COLD";
  };

  const isInformationalQuery = (text: string, typeKey?: string): boolean => {
    if (typeKey?.startsWith("FAQ_")) return true;
    if (isProjectIntent(text)) return false;
    if (typeKey === "start-project" || typeKey === "START_PROJECT") return false;
    
    const lower = text.toLowerCase().trim();
    // Do not intercept if it's a short yes/no/skip/none/etc.
    const simpleAnswers = ["yes", "no", "yeah", "yup", "nope", "skip", "none", "na", "haan", "ji", "ok", "great", "thanks"];
    if (simpleAnswers.includes(lower)) return false;

    // Detect FAQ topics
    const faqKeywords = [
      "founder", "sumit", "tiwari", "location", "located", "where are you",
      "privacy", "cookie", "terms", "disclaimer", "social links", "linkedin",
      "instagram", "facebook", "twitter", "what is kvyash", "what do you do",
      "what services", "what do you offer", "who are you", "what can you do",
      "who owns", "address", "email address"
    ];
    
    return faqKeywords.some(keyword => lower.includes(keyword)) ||
           lower.includes("how are you") ||
           lower.includes("good morning") ||
           lower.includes("good evening") ||
           lower.includes("good afternoon") ||
           lower === "hi" ||
           lower === "hello" ||
           lower === "hey" ||
           lower === "yo" ||
           lower.includes("calling agent") ||
           lower.includes("whatsapp crm") ||
           lower.includes("crm automation") ||
           lower.includes("services do you offer") ||
           lower.includes("services do you provide") ||
           lower.includes("what services") ||
           lower.includes("do you build website") ||
           lower.includes("do you build app") ||
           lower.includes("do you provide consultancy") ||
           lower.includes("do you provide marketing") ||
           lower.includes("can ai manage") ||
           lower.includes("can you build an ai chatbot") ||
           lower.includes("what ai services") ||
           lower.includes("show me your work") ||
           lower.includes("what have you built") ||
           lower.includes("what projects") ||
           lower.includes("show ai projects") ||
           lower.includes("ye company kya karti hai") ||
           lower.includes("founder kaun hai") ||
           lower.includes("kahan hai");
  };
  const handleSend = (text: string, typeKey?: string) => {
    if (!text.trim() && !typeKey) return;
    if (isProcessingRef.current) return;
    startTyping();

    const userText = text.trim();
    let detectedLang: LangType = "en";

    // Priority A: Explicit language associated with a quick-action selection
    if (typeKey) {
      if (typeKey.startsWith("FAQ_") || typeKey === "START_PROJECT" || typeKey === "founder" || typeKey === "services") {
        detectedLang = "en";
      } else {
        // Dynamic option click / skip: use previous conversation language
        detectedLang = language;
      }
    } else {
      // Priority B: Latest meaningful user message language
      const msgLang = detectLanguage(userText);
      const simpleAnswers = [
        "yes", "no", "yeah", "yup", "nope", "skip", "none", "na", "haan", "ji", "ok", "great", "thanks",
        "both", "dono", "both platforms", "dono platforms", "local users", "vendor portals",
        "skip optional step", "flexible", "not sure", "asap"
      ];
      const isSimple = simpleAnswers.some(ans => userText.toLowerCase().trim().includes(ans)) || userText.length < 20;
      
      if (isSimple && language !== "en") {
        // Priority C: Existing conversation language (Hinglish/Hindi retention)
        detectedLang = language;
      } else {
        detectedLang = msgLang;
      }
    }

    if (!detectedLang) {
      detectedLang = "en";
    }

    setLanguage(detectedLang);

    // 1. Add User Message to screen
    if (userText) {
      messageIdCounterRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${messageIdCounterRef.current}`,
          sender: "user",
          text: userText,
          timestamp: new Date()
        }
      ]);
      setInputText("");
    }

    // Intercept Reset chat, Greetings, and "that's it" Completion Phrases
    const cleanLowerIntercept = userText.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
    
    // 1. Reset chat
    const resetKeywords = ["reset chat", "reset", "start over", "restart", "clear chat", "new conversation"];
    if (resetKeywords.includes(cleanLowerIntercept)) {
      setIntakeData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        serviceLabel: "",
        requirements: "",
        timeline: "",
        budget: "",
        projectTypes: []
      });
      setScopingData({
        ecommProducts: "", ecommPayments: "", ecommInventory: "", ecommAdmin: "",
        saasUsers: "", saasWorkflow: "", saasAuth: "", saasDashboard: "", saasBilling: "", saasIntegrations: "",
        botPurpose: "", botUsers: "", botKnowledge: "", botChannels: "", botLeadCapture: "", botHandoff: "",
        appPlatform: "", appTargetUser: "", appFeatures: "", appAuth: "", appBackend: "", appNotifications: "",
        autoWorkflow: "", autoTrigger: "", autoAction: "", autoTools: "", autoResult: "",
        consultGoal: "", consultProblem: "", consultCustomerAction: "",
        offlineBizType: "", offlineProcess: "", offlineDesiredAction: "", offlinePayments: "", offlineDelivery: "", offlineMarketing: "",
        marketType: "", marketProductOrService: "", marketMultiVendor: "", marketVendorOnboarding: "", marketCommission: "", marketDashboards: "",
        marketingBusiness: "", marketingIsLive: "", marketingObjective: "", marketingChannels: "", marketingSEO: "",
        crmType: "", crmUsers: "", crmFeatures: "", crmPipeline: "", crmIntegrations: "", crmAutomation: "", crmDashboards: "",
        waSetup: "", waVolume: "", waFeatures: "", waReplies: "", waFollowups: "", waTeam: "", waCrm: "",
        emailPlatform: "", emailTypes: "", emailClassify: "", emailReplies: "", emailFollowups: "", emailApproval: "",
        callPurpose: "", callDirection: "", callFeatures: "", callLanguages: "", callCrm: "", callHandoff: "", callLogging: "",
        aiSubtype: ""
      });
      setScopingStage("NONE");
      setChatState("IDLE");
      setConsultancyState("NONE");
      setReturnToReview(false);
      setIsLocalMode(false);
      setActiveIntents([]);
      setCurrentIntentIndex(0);
      setAwaitingSomethingElse(false);
      setLastEntityContext("NONE");
      setCurrentQuickActions(INITIAL_QUICK_ACTIONS);
      
      setTimeout(() => {
        addBotMessage(detectedLang === "hi"
          ? "बिल्कुल — मैंने बातचीत रीसेट कर दी है। आप क्या बनाना चाहते हैं?"
          : detectedLang === "hinglish"
          ? "Sure — maine conversation reset kar di hai. Aap kya banana chahte hain?"
          : "Sure — I've reset the conversation. What are you looking to build?");
        stopTyping();
      }, 300);
      return;
    }

    // 2. Greetings
    const greetings = ["hi", "hy", "hello", "hey", "hii", "hyy", "heyya", "yo", "hello assistant", "hello bot"];
    if (greetings.includes(cleanLowerIntercept)) {
      let greetingResponse = "";
      if (chatState === "IDLE") {
        greetingResponse = detectedLang === "hi"
          ? "नमस्ते! मैं KVYASH असिस्टेंट हूँ। मैं प्रोजेक्ट प्लानिंग या टेक्नोलॉजी कंसल्टिंग में मदद कर सकता हूँ। आप क्या बनाना चाहते हैं?"
          : detectedLang === "hinglish"
          ? "Hi! Main KVYASH Assistant hoon. Main project planning ya technology consulting me help kar sakta hoon. Aap kya banana chahte hain?"
          : "Hi! I'm the KVYASH Assistant. I can help with services, projects, or starting a new project enquiry. What are you looking to build?";
      } else if (chatState === "ASK_PROJECT_TYPE") {
        greetingResponse = detectedLang === "hi"
          ? "नमस्ते! आप क्या बनाना चाहते हैं — वेबसाइट, ई-कॉमर्स स्टोर, SaaS, मार्केटप्लेस, मोबाइल ऐप, AI सिस्टम, ऑटोमेशन या कुछ और?"
          : detectedLang === "hinglish"
          ? "Hi! Aap kya banana chahte hain — website, ecommerce store, SaaS, marketplace, mobile app, AI system, automation, ya kuch aur?"
          : "Hi! What are you looking to build — a website, ecommerce store, SaaS product, marketplace, mobile app, AI system, automation, or something else?";
      } else {
        const stepPrompt = getStepPromptMessage(chatState, detectedLang, intakeData.service, intakeData.projectTypes);
        greetingResponse = detectedLang === "hi"
          ? `नमस्ते! चलिए हमारे पिछले चरण पर वापस आते हैं — ${stepPrompt}`
          : detectedLang === "hinglish"
          ? `Hi! Chaliye humare previous step par wapas aate hain — ${stepPrompt}`
          : `Hi! Let's return to our previous step — ${stepPrompt}`;
      }
      setTimeout(() => {
        addBotMessage(greetingResponse);
        stopTyping();
      }, 300);
      return;
    }

    // 3. Completion Phrases
    const completionPhrases = ["that's it", "that its", "thats it", "done", "that's all", "nothing else", "no more"];
    if (completionPhrases.includes(cleanLowerIntercept)) {
      if (chatState === "ASK_REQUIREMENTS") {
        if (intakeData.requirements && intakeData.requirements.trim().length > 0) {
          const next = getNextStepState(chatState, intakeData);
          setChatState(next);
          setTimeout(() => {
            addBotMessage(detectedLang === "en"
              ? `Got it. I'll use the requirements you've provided. Let's proceed — ${getStepPromptMessage(next, detectedLang, intakeData.service, intakeData.projectTypes)}`
              : detectedLang === "hi"
              ? `समझ गया। मैं आपके द्वारा दिए गए विवरण का उपयोग करूँगा। चलिए आगे बढ़ते हैं — ${getStepPromptMessage(next, detectedLang, intakeData.service, intakeData.projectTypes)}`
              : `Got it. Main aapke requirements use karunga. Chaliye aage badhte hain — ${getStepPromptMessage(next, detectedLang, intakeData.service, intakeData.projectTypes)}`);
            stopTyping();
          }, 300);
        } else {
          setTimeout(() => {
            addBotMessage(detectedLang === "en"
              ? "Please tell me briefly what features or capabilities you need before we proceed."
              : "Kripya aage badhne se pehle batayein ki aapko kya features chahiye.");
            stopTyping();
          }, 300);
        }
        return;
      } else if (chatState === "SCOPING_PROJECT") {
        runScoping("Skip", activeIntents[currentIntentIndex], currentIntentIndex, activeIntents, intakeData, detectedLang, scopingData);
        return;
      } else if (chatState === "ASK_PROJECT_TYPE") {
        setTimeout(() => {
          addBotMessage(detectedLang === "en"
            ? "What are you looking to build? Please select or specify a project type first."
            : "Aap kya banana chahte hain? Kripya pehle project type batayein.");
          stopTyping();
        }, 300);
        return;
      }
    }

    // Intercept Continue/Reset consultancy actions immediately before timeout scheduling
    if (typeKey === "CONTINUE_CONSULTANCY") {
      startTyping();
      setTimeout(() => {
        if (chatState !== "IDLE") {
          runScoping("", activeIntents[currentIntentIndex], currentIntentIndex, activeIntents, intakeData, detectedLang, scopingData);
        } else {
          let lastQuestion = "";
          if (consultancyState === "WEB") {
            lastQuestion = detectedLang === "en" 
              ? "What are you looking to build — a company website, ecommerce store, customer portal, web application, or something else?" 
              : detectedLang === "hi"
              ? "समझ गया। आप क्या बनाना चाहते हैं — कंपनी वेबसाइट, ई-कॉमर्स स्टोर, कस्टमर पोर्टल, वेब एप्लिकेशन या कुछ और?"
              : "Samajh gaya. Aap kya build karna chahte hain — company website, ecommerce store, customer portal, web application, ya kuch aur?";
          } else if (consultancyState === "MOBILE") {
            lastQuestion = detectedLang === "en"
              ? "Will this mobile app be for iOS, Android, or both? And who is your target user?"
              : detectedLang === "hi"
              ? "समझ गया। क्या यह मोबाइल ऐप iOS, Android या दोनों के लिए होगा? और आपके टार्गेट यूज़र्स कौन हैं?"
              : "Understood. Kya ye mobile app iOS, Android, ya dono ke liye hoga? Aur aapke target users kaun hain?";
          } else if (consultancyState === "SAAS") {
            lastQuestion = detectedLang === "en"
              ? "What core workflow does this SaaS automate, and what is your target business model (e.g. subscription-based)?"
              : detectedLang === "hi"
              ? "बेहतरीन। यह SaaS प्रोडक्ट किस मुख्य वर्कफ़्लो को ऑटोमेट करता है, और आपका टार्गेट बिज़नेस मॉडल (जैसे सब्सक्रिप्शन-बेस्ड) क्या है?"
              : "Excellent. Ye SaaS product kis core workflow ko automate karta hai, aur aapka target business model (jaise subscription-based) kya hai?";
          } else if (consultancyState === "MARKET") {
            lastQuestion = detectedLang === "en"
              ? "Who are the supply and demand parties in your marketplace, and how will transactions be handled?"
              : detectedLang === "hi"
              ? "समझ गया। आपके मार्केटप्लेस में सप्लायर और डिमांड साइड पार्टीज़ कौन हैं, और ट्रांसेक्शन्स कैसे हैंडल होंगे?"
              : "Got it. Aapke marketplace me supply aur demand side parties kaun hain, aur transactions kaise handle honge?";
          } else if (consultancyState === "AI") {
            lastQuestion = detectedLang === "en"
              ? "Are you looking to build a customer-facing chatbot, automate back-office workflows, or connect custom AI agents?"
              : detectedLang === "hi"
              ? "बढ़िया। क्या आप कस्टमर-फेसिंग चैटबॉट बनाना चाहते हैं, बैक-ऑफिस वर्कफ़्लो ऑटोमेट करना चाहते हैं, या कस्टम AI एजेंट्स कनेक्ट करना चाहते हैं?"
              : "Great. Kya aap customer-facing chatbot banana chahte hain, back-office workflows automate karna chahte hain, ya custom AI agents connect karna chahte hain?";
          } else if (consultancyState === "NOT_SURE") {
            lastQuestion = detectedLang === "en"
              ? "Tell me briefly about your business or idea, what problem you want to solve, and who will use it."
              : detectedLang === "hi"
              ? "कोई बात नहीं। मुझे अपने बिज़नेस या आइडिया के बारे में थोड़ा बताएं, आप क्या प्रॉब्लम सॉल्व करना चाहते हैं और इसे कौन यूज़ करेगा। मैं आपको सही डिजिटल अप्रोच समझने में मदद करूँगा।"
              : "No problem. Mujhe apne business ya idea ke baare me thoda batayein, aap kya problem solve karna chahte hain, aur ise kaun use karega. Main aapko sahi digital approach samajhne me help karunga.";
          }
          if (lastQuestion) {
            addBotMessage(lastQuestion);
          }
          stopTyping();
        }
      }, 300);
      return;
    }

    if (typeKey === "RESET_CONSULTANCY") {
      setIsTyping(true);
      setScopingData({
        ecommProducts: "", ecommPayments: "", ecommInventory: "", ecommAdmin: "",
        saasUsers: "", saasWorkflow: "", saasAuth: "", saasDashboard: "", saasBilling: "", saasIntegrations: "",
        botPurpose: "", botUsers: "", botKnowledge: "", botChannels: "", botLeadCapture: "", botHandoff: "",
        appPlatform: "", appTargetUser: "", appFeatures: "", appAuth: "", appBackend: "", appNotifications: "",
        autoWorkflow: "", autoTrigger: "", autoAction: "", autoTools: "", autoResult: "",
        consultGoal: "", consultProblem: "", consultCustomerAction: "",
        offlineBizType: "", offlineProcess: "", offlineDesiredAction: "", offlinePayments: "", offlineDelivery: "", offlineMarketing: "",
        marketType: "", marketProductOrService: "", marketMultiVendor: "", marketVendorOnboarding: "", marketCommission: "", marketDashboards: "",
        marketingBusiness: "", marketingIsLive: "", marketingObjective: "", marketingChannels: "", marketingSEO: "",
        crmType: "", crmUsers: "", crmFeatures: "", crmPipeline: "", crmIntegrations: "", crmAutomation: "", crmDashboards: "",
        waSetup: "", waVolume: "", waFeatures: "", waReplies: "", waFollowups: "", waTeam: "", waCrm: "",
        emailPlatform: "", emailTypes: "", emailClassify: "", emailReplies: "", emailFollowups: "", emailApproval: "",
        callPurpose: "", callDirection: "", callFeatures: "", callLanguages: "", callCrm: "", callHandoff: "", callLogging: "",
        aiSubtype: ""
      });
      setScopingStage("NONE");
      setChatState("IDLE");
      setConsultancyState("NONE");
      setTimeout(() => {
        const triggerText = "Get Consultancy";
        const faqReply = getFaqResponse(triggerText, "FAQ_CONSULTANCY", detectedLang);
        addBotMessage(faqReply || "What are you looking to build?");
        setCurrentQuickActions([
          { text: detectedLang === "hi" ? "वेबसाइट / वेब ऐप" : "Website / Web App", type: "FAQ_CONSULT_WEB" },
          { text: detectedLang === "hi" ? "मोबाइल ऐप" : "Mobile App", type: "FAQ_CONSULT_MOBILE" },
          { text: detectedLang === "hi" ? "SaaS प्रोडक्ट" : "SaaS Product", type: "FAQ_CONSULT_SAAS" },
          { text: detectedLang === "hi" ? "मार्केटप्लेस" : "Marketplace", type: "FAQ_CONSULT_MARKET" },
          { text: detectedLang === "hi" ? "AI / ऑटोमेशन" : "AI / Automation", type: "FAQ_CONSULT_AI" },
          { text: detectedLang === "hi" ? "निश्चित नहीं" : "Not Sure Yet", type: "FAQ_CONSULT_NOT_SURE" }
        ]);
        setIsTyping(false);
      }, 300);
      return;
    }

    const cleanLower = userText.toLowerCase().trim();
    const isConsultancyTrigger = 
      typeKey === "FAQ_CONSULTANCY" || 
      typeKey === "CONSULTANCY" || 
      cleanLower === "get consultancy" || 
      classifyIntents(userText).includes("CONSULTANCY") || 
      classifyIntents(userText).includes("NOT_SURE");

    if (isConsultancyTrigger) {
      const isScopingConsulting = chatState !== "IDLE" && (activeIntents.includes("CONSULTANCY") || activeIntents.includes("NOT_SURE"));
      const isFaqConsulting = chatState === "IDLE" && consultancyState !== "NONE";
      if (isScopingConsulting || isFaqConsulting) {
        addBotMessage(detectedLang === "en"
          ? "You are already in an active consultancy session. Would you like to continue or start a new consultation?"
          : detectedLang === "hi"
          ? "आप पहले से ही कंसल्टेंसी सेशन में हैं। क्या आप जारी रखना चाहते हैं या नया सेशन शुरू करना चाहते हैं?"
          : "Aap already consultancy session me hain. Kya aap continue karna chahte hain ya naya session start karna chahte hain?");
        setCurrentQuickActions([
          { text: detectedLang === "en" ? "Continue Session" : detectedLang === "hi" ? "जारी रखें" : "Continue Karein", type: "CONTINUE_CONSULTANCY" },
          { text: detectedLang === "en" ? "Start New Session" : detectedLang === "hi" ? "नया सेशन शुरू करें" : "Naya Session Start Karein", type: "RESET_CONSULTANCY" }
        ]);
        setIsTyping(false);
        return;
      }
    }

    setTimeout(() => {
      try {
        const language = detectedLang; // Shadow state variable
        const currentConsultancyState = consultancyState;
        let processedUserText = userText;
        let processedLowerVal = userText.toLowerCase();

      // Intercept awaitingSomethingElse
      if (awaitingSomethingElse) {
        setAwaitingSomethingElse(false);
        const updatedIntake = { ...intakeData };
        if (chatState === "ASK_PROJECT_TYPE") {
          updatedIntake.service = "custom-software";
          updatedIntake.serviceLabel = "Custom Software";
          updatedIntake.projectTypes = ["Custom Software"];
          updatedIntake.requirements = userText;
          setIntakeData(updatedIntake);
          
          const next = getNextStepState(chatState, updatedIntake);
          setChatState(next);
          addBotMessage(getStepPromptMessage(next, language, updatedIntake.service, updatedIntake.projectTypes));
          setIsTyping(false);
          return;
        }
        else if (chatState === "ASK_REQUIREMENTS") {
          updatedIntake.requirements = userText;
          setIntakeData(updatedIntake);
          
          const next = getNextStepState(chatState, updatedIntake);
          setChatState(next);
          addBotMessage(getStepPromptMessage(next, language, updatedIntake.service, updatedIntake.projectTypes));
          setIsTyping(false);
          return;
        }
        else if (chatState === "SCOPING_PROJECT") {
          let prefix = "";
          if (scopingData.appPlatform || scopingData.appTargetUser) {
            prefix = `Mobile App for ${scopingData.appTargetUser || 'users'}, targeting ${scopingData.appPlatform || 'platforms'}. `;
          }
          updatedIntake.requirements = `${prefix}Features: ${userText}`;
          setIntakeData(updatedIntake);
          setScopingStage("NONE");
          setChatState("ASK_CONTACT_NAME");
          
          addBotMessage(language === "en"
            ? "Perfect. I have the project details noted. To send this enquiry to the KVYASH team, what should I call you?"
            : language === "hi"
            ? "बिल्कुल। मैंने प्रोजेक्ट के डिटेल्स नोट कर लिए हैं। इस पूछताछ (enquiry) को KVYASH टीम को भेजने के लिए, मुझे आपका नाम क्या बताना चाहिए?"
            : "Perfect. Maine project details note kar liye hain. Is enquiry ko KVYASH team ko send karne ke liye, main aapko kis naam se bula sakta hoon?");
          setIsTyping(false);
          return;
        }
      }

      const cleanLower = userText.toLowerCase().trim();
      if (cleanLower === "something else" || cleanLower === "other" || cleanLower === "kuch aur") {
        const isReqStage = chatState === "ASK_REQUIREMENTS" || chatState === "ASK_PROJECT_TYPE" || scopingStage === "APP_FEATURES" || scopingStage === "SAAS_WORKFLOW" || scopingStage === "ECOMM_PRODUCTS";
        if (isReqStage) {
          setAwaitingSomethingElse(true);
          addBotMessage(language === "en" 
            ? "No problem. Tell me briefly what you want the app or product to do, and I'll help define the right structure."
            : "No problem. Mujhe thoda batayein ki aap app ya product se kya karwana chahte hain, aur main iska right structure define karunga.");
          setIsTyping(false);
          return;
        }
      }

      // Pronoun resolution / context memory mapper
      if (lastEntityContext === "FOUNDER") {
        const pronounPatterns = [
          "what does he do", "how much experience does he have", "how experienced is he",
          "does he work on", "can i hire him", "who is he", "what is his role",
          "wo kya karte", "woh kya karte", "kitna experience hai unhe", "kitna experience hai unko",
          "experience kitna hai", "wo kya kaam karte", "woh kya kaam karte", "how experienced is sumit",
          "how long has sumit coding", "how long coding", "years coding",
          "what does he work on", "is he involved in", "does he build", "does he code"
        ];
        
        const hasPronoun = pronounPatterns.some(p => processedLowerVal.includes(p)) ||
                           processedLowerVal === "he" ||
                           processedLowerVal === "who is he" ||
                           processedLowerVal === "what does he handle" ||
                           processedLowerVal === "does he build" ||
                           processedLowerVal === "does he code";
                           
        if (hasPronoun) {
          processedUserText = `${processedUserText} (founder Sumit Tiwari)`;
          processedLowerVal = processedUserText.toLowerCase();
        }
      }
      
      if (lastEntityContext === "SERVICES") {
        const pronounPatterns = [
          "which one is best for", "which is best for", "best for an offline", "best for offline"
        ];
        const hasPronoun = pronounPatterns.some(p => processedLowerVal.includes(p));
        if (hasPronoun) {
          processedUserText = `${processedUserText} (services offline business)`;
          processedLowerVal = processedUserText.toLowerCase();
        }
      }

      // Update entity context state
      if (
        processedLowerVal.includes("founder") ||
        processedLowerVal.includes("sumit") ||
        processedLowerVal.includes("tiwari") ||
        processedLowerVal.includes("owner") ||
        typeKey === "founder"
      ) {
        setLastEntityContext("FOUNDER");
      } else if (
        processedLowerVal.includes("service") ||
        processedLowerVal.includes("website") ||
        processedLowerVal.includes("app") ||
        processedLowerVal.includes("saas") ||
        processedLowerVal.includes("marketplace") ||
        processedLowerVal.includes("automation") ||
        processedLowerVal.includes("marketing") ||
        processedLowerVal.includes("consult") ||
        typeKey?.startsWith("FAQ_") ||
        typeKey === "services"
      ) {
        setLastEntityContext("SERVICES");
      } else if (
        processedLowerVal.includes("kvyash") ||
        processedLowerVal.includes("company") ||
        processedLowerVal.includes("office") ||
        processedLowerVal.includes("location") ||
        processedLowerVal.includes("where")
      ) {
        setLastEntityContext("COMPANY");
      }

      const lowerVal = processedLowerVal;

      // Update dynamic quick actions based on what user asked
      const isUnrelatedAction = 
        lowerVal.includes("services") || typeKey === "FAQ_SERVICES" ||
        lowerVal.includes("ai") || lowerVal.includes("automation") || typeKey === "FAQ_AI" ||
        lowerVal.includes("work") || lowerVal.includes("portfolio") || lowerVal.includes("projects") || typeKey === "FAQ_WORK" ||
        typeKey === "START_PROJECT" || typeKey === "RESET_CONSULTANCY";
        
      if (isUnrelatedAction) {
        setConsultancyState("NONE");
      }
      if (lowerVal.includes("services") || typeKey === "FAQ_SERVICES") {
        setCurrentQuickActions([
          { text: "AI & Automation", type: "FAQ_AI" },
          { text: "Marketplace & SaaS", type: "FAQ_SAAS" },
          { text: "Technology Consulting", type: "FAQ_CONSULTANCY" },
          { text: "Talk About a Project", type: "START_PROJECT" }
        ]);
      } else if (lowerVal.includes("ai") || lowerVal.includes("automation") || typeKey === "FAQ_AI") {
        setCurrentQuickActions([
          { text: "WhatsApp CRM", type: "FAQ_WA" },
          { text: "AI Calling Agents", type: "FAQ_CALLING" },
          { text: "CRM Automation", type: "FAQ_CRM" },
          { text: "Talk About a Project", type: "START_PROJECT" }
        ]);
      } else if (lowerVal.includes("work") || lowerVal.includes("portfolio") || lowerVal.includes("projects") || typeKey === "FAQ_WORK") {
        setCurrentQuickActions([
          { text: "AI Projects", type: "FAQ_AI_PROJECTS" },
          { text: "SaaS Projects", type: "FAQ_SAAS_PROJECTS" },
          { text: "Talk About a Project", type: "START_PROJECT" },
          { text: "Explore Services", type: "FAQ_SERVICES" }
        ]);
      } else if (
        lowerVal.includes("consult") ||
        typeKey === "FAQ_CONSULTANCY" ||
        lowerVal.includes("tech stack") ||
        typeKey === "FAQ_TECH_STACK" ||
        typeKey === "FAQ_APP_VS_WEB" ||
        lowerVal.includes("choose between") ||
        lowerVal.includes("app or website")
      ) {
        setCurrentQuickActions([
          { text: "Website / Web App", type: "FAQ_CONSULT_WEB" },
          { text: "Mobile App", type: "FAQ_CONSULT_MOBILE" },
          { text: "SaaS Product", type: "FAQ_CONSULT_SAAS" },
          { text: "Marketplace", type: "FAQ_CONSULT_MARKET" },
          { text: "AI / Automation", type: "FAQ_CONSULT_AI" },
          { text: "Not Sure Yet", type: "FAQ_CONSULT_NOT_SURE" }
        ]);
      } else if (
        typeKey === "FAQ_CONSULT_WEB" ||
        typeKey === "FAQ_CONSULT_MOBILE" ||
        typeKey === "FAQ_CONSULT_SAAS" ||
        typeKey === "FAQ_CONSULT_MARKET" ||
        typeKey === "FAQ_CONSULT_AI" ||
        typeKey === "FAQ_CONSULT_NOT_SURE"
      ) {
        if (typeKey === "FAQ_CONSULT_WEB") setConsultancyState("WEB");
        else if (typeKey === "FAQ_CONSULT_MOBILE") setConsultancyState("MOBILE");
        else if (typeKey === "FAQ_CONSULT_SAAS") setConsultancyState("SAAS");
        else if (typeKey === "FAQ_CONSULT_MARKET") setConsultancyState("MARKET");
        else if (typeKey === "FAQ_CONSULT_AI") setConsultancyState("AI");
        else if (typeKey === "FAQ_CONSULT_NOT_SURE") setConsultancyState("NOT_SURE");

        setCurrentQuickActions([
          { text: "Talk About a Project", type: "START_PROJECT" },
          { text: "Get Consultancy", type: "FAQ_CONSULTANCY" }
        ]);
      } else {
        setCurrentQuickActions(INITIAL_QUICK_ACTIONS);
      }

      // Security check: API key / Secrets request
      if (isSecurityAttack(lowerVal)) {
        addBotMessage("I cannot disclose internal API keys or configurations. I am here to help you scope, plan, and build digital solutions with KVYASH Technologies. Let me know what you would like to build!");
        stopTyping();
        return;
      }

      const updatedIntake = { ...intakeData };

      // Intercept informational/FAQ queries during scoping
      if (chatState !== "IDLE" && isInformationalQuery(processedUserText, typeKey)) {
        const faqReply = getFaqResponse(processedUserText, typeKey, detectedLang);
        const lang = detectedLang;
        
        let baseAnswer = faqReply;
        if (baseAnswer === null) {
          baseAnswer = lang === "hi" 
            ? "Mujhe ye theek se samajh nahi aaya." 
            : "I'm not exactly sure about that.";
        }

        let scopingPromptText = "";
        if (chatState === "SCOPING_PROJECT" && scopingStage !== "NONE") {
          const nextPrompt = getScopingPromptTextOnly(scopingStage, lang, scopingData);
          if (nextPrompt) {
            scopingPromptText = lang === "hi"
              ? `\n\nप्रोजेक्ट स्कोपिंग पर वापस आते हैं — ${nextPrompt}`
              : lang === "hinglish"
              ? `\n\nProject scoping par wapas aate hain — ${nextPrompt}`
              : `\n\nComing back to your project scoping — ${nextPrompt}`;
          }
        } else {
          const stepPrompt = getStepPromptMessage(chatState, lang, intakeData.service, intakeData.projectTypes);
          if (stepPrompt) {
            scopingPromptText = lang === "hi"
              ? `\n\nआपके डिटेल्स चेक करने पर वापस आते हैं — ${stepPrompt}`
              : lang === "hinglish"
              ? `\n\nDetails check karne par wapas aate hain — ${stepPrompt}`
              : `\n\nReturning to our previous step — ${stepPrompt}`;
          }
        }
        
        addBotMessage(baseAnswer + scopingPromptText);
        stopTyping();
        return;
      }

      // 2. Intent-based Edit & Correction handler checks (Natural Editing)
      if (
        (chatState as string) === "REVIEW" ||
        (chatState as string) === "PROJECT_EDIT" ||
        (chatState as string) === "SCOPING_PROJECT" ||
        (chatState as string) === "ASK_REQUIREMENTS" ||
        (chatState as string) === "ASK_CONTACT_NAME"
      ) {
        if (lowerVal.includes("change name") || lowerVal.includes("edit name") || lowerVal.includes("edit my name") || lowerVal.includes("galat naam")) {
          setReturnToReview(true);
          setChatState("ASK_CONTACT_NAME");
          addBotMessage(detectedLang === "en" ? "Sure. What is your correct name?" : "Aapka correct name kya hai?");
          setIsTyping(false);
          return;
        }
        if (lowerVal.includes("change email") || lowerVal.includes("edit email") || lowerVal.includes("wrong email") || lowerVal.includes("galat email") || lowerVal.includes("email change") || lowerVal.includes("email galat")) {
          setReturnToReview(true);
          setChatState("ASK_CONTACT_EMAIL");
          addBotMessage(detectedLang === "en" ? "Sure. What is your correct business email?" : "Aapka correct business email kya hai?");
          setIsTyping(false);
          return;
        }
        if (lowerVal.includes("change phone") || lowerVal.includes("edit phone") || lowerVal.includes("wrong phone") || lowerVal.includes("galat number") || lowerVal.includes("phone number change")) {
          setReturnToReview(true);
          setChatState("ASK_OPTIONAL_PHONE");
          addBotMessage(detectedLang === "en" ? "Sure. Please share your correct phone number:" : "Apna correct phone number batayein:");
          setIsTyping(false);
          return;
        }
        if (lowerVal.includes("change company") || lowerVal.includes("edit company") || lowerVal.includes("company change")) {
          setReturnToReview(true);
          setChatState("ASK_OPTIONAL_COMPANY");
          addBotMessage(detectedLang === "en" ? "Sure. What is your company name?" : "Aapki company ka naam kya hai?");
          setIsTyping(false);
          return;
        }
        if (lowerVal.includes("change budget") || lowerVal.includes("edit budget") || lowerVal.includes("budget change") || lowerVal.includes("budget is") || lowerVal.includes("budget abhi decide")) {
          setReturnToReview(true);
          setChatState("ASK_OPTIONAL_BUDGET");
          addBotMessage(detectedLang === "en" ? "Sure. What is your approximate budget?" : "Aapka approximate budget kya hai?");
          setIsTyping(false);
          return;
        }
        if (lowerVal.includes("change timeline") || lowerVal.includes("edit timeline") || lowerVal.includes("timeline change")) {
          setReturnToReview(true);
          setChatState("ASK_OPTIONAL_TIMELINE");
          addBotMessage(detectedLang === "en" ? "Sure. What is your timeline?" : "Aapka timeline kya hai?");
          setIsTyping(false);
          return;
        }

        const isRequirementsState = chatState === "ASK_REQUIREMENTS" || chatState === "REVIEW" || chatState === "PROJECT_EDIT";
        if (isRequirementsState) {
          // Mid-conversation corrections for AI & Automation intents addition
          if (lowerVal.includes("actually") || lowerVal.includes("add") || lowerVal.includes("need") || lowerVal.includes("bhi chahiye") || lowerVal.includes("bhi add")) {
            let addedIntent: BotIntent = "NONE";
            let label = "";
            if (lowerVal.includes("calling agent") || lowerVal.includes("calling bot") || lowerVal.includes("voice agent") || lowerVal.includes("ai call")) {
              addedIntent = "AI_CALLING";
              label = "AI Calling Agent";
            } else if (lowerVal.includes("whatsapp")) {
              addedIntent = "WA_CRM";
              label = "WhatsApp CRM";
            } else if (lowerVal.includes("chatbot") || lowerVal.includes("ai bot")) {
              addedIntent = "AI_BOT";
              label = "AI Chatbot";
            } else if (lowerVal.includes("crm")) {
              addedIntent = "AI_CRM";
              label = "CRM";
            } else if (lowerVal.includes("email")) {
              addedIntent = "EMAIL_AUTO";
              label = "Email Automation";
            }

            if (addedIntent !== "NONE" && !activeIntents.includes(addedIntent)) {
              const nextIntents = [...activeIntents, addedIntent];
              setActiveIntents(nextIntents);
              
              const freshExtracted = parseScopingInput(userText, scopingData, scopingStage);
              setScopingData(freshExtracted);

              addBotMessage(detectedLang === "en"
                ? `Got it. I've added ${label} to your requirements.`
                : `Maine requirements me ${label} add kar diya hai.`);
                
              setIsTyping(false);
              runScoping(userText, nextIntents[currentIntentIndex], currentIntentIndex, nextIntents, updatedIntake, detectedLang, freshExtracted);
              return;
            }
          }

          // Mid-conversation corrections for AI & Automation intents removal
          if (lowerVal.includes("remove") || lowerVal.includes("don't need") || lowerVal.includes("no need") || lowerVal.includes("nahi chahiye") || lowerVal.includes("remove kar")) {
            let removedIntent: BotIntent = "NONE";
            let label = "";
            if (lowerVal.includes("calling") || lowerVal.includes("voice")) {
              removedIntent = "AI_CALLING";
              label = "AI Calling Agent";
            } else if (lowerVal.includes("whatsapp")) {
              removedIntent = "WA_CRM";
              label = "WhatsApp CRM";
            } else if (lowerVal.includes("chatbot") || lowerVal.includes("ai bot")) {
              removedIntent = "AI_BOT";
              label = "AI Chatbot";
            } else if (lowerVal.includes("crm")) {
              removedIntent = "AI_CRM";
              label = "CRM";
            } else if (lowerVal.includes("email")) {
              removedIntent = "EMAIL_AUTO";
              label = "Email Automation";
            }

            if (removedIntent !== "NONE" && activeIntents.includes(removedIntent)) {
              const nextIntents = activeIntents.filter(i => i !== removedIntent);
              setActiveIntents(nextIntents);
              
              const nextScoping = { ...scopingData };
              if (removedIntent === "AI_CALLING") {
                nextScoping.callPurpose = ""; nextScoping.callDirection = ""; nextScoping.callFeatures = ""; nextScoping.callLanguages = ""; nextScoping.callCrm = ""; nextScoping.callHandoff = ""; nextScoping.callLogging = "";
              } else if (removedIntent === "WA_CRM") {
                nextScoping.waSetup = ""; nextScoping.waVolume = ""; nextScoping.waFeatures = ""; nextScoping.waReplies = ""; nextScoping.waFollowups = ""; nextScoping.waTeam = ""; nextScoping.waCrm = "";
              } else if (removedIntent === "AI_BOT") {
                nextScoping.botPurpose = ""; nextScoping.botUsers = ""; nextScoping.botKnowledge = ""; nextScoping.botChannels = ""; nextScoping.botLeadCapture = ""; nextScoping.botHandoff = "";
              } else if (removedIntent === "AI_CRM") {
                nextScoping.crmType = ""; nextScoping.crmUsers = ""; nextScoping.crmFeatures = ""; nextScoping.crmPipeline = ""; nextScoping.crmIntegrations = ""; nextScoping.crmAutomation = ""; nextScoping.crmDashboards = "";
              } else if (removedIntent === "EMAIL_AUTO") {
                nextScoping.emailPlatform = ""; nextScoping.emailTypes = ""; nextScoping.emailClassify = ""; nextScoping.emailReplies = ""; nextScoping.emailFollowups = ""; nextScoping.emailApproval = "";
              }
              setScopingData(nextScoping);

              addBotMessage(detectedLang === "en"
                ? `Removed ${label} from your requirements.`
                : `Maine requirements se ${label} remove kar diya hai.`);

              setIsTyping(false);
              
              let nextIndex = currentIntentIndex;
              if (nextIndex >= nextIntents.length) {
                nextIndex = Math.max(0, nextIntents.length - 1);
              }
              setCurrentIntentIndex(nextIndex);

              if (nextIntents.length > 0) {
                runScoping(userText, nextIntents[nextIndex], nextIndex, nextIntents, updatedIntake, detectedLang, nextScoping);
              } else {
                setScopingStage("NONE");
                const next = getNextStepState(chatState, updatedIntake);
                setChatState(next);
                addBotMessage(getStepPromptMessage(next, detectedLang, updatedIntake.service, updatedIntake.projectTypes));
              }
              return;
            }
          }
          
          // Remove feature intent
          if (lowerVal.includes("nahi chahiye") || lowerVal.includes("remove") || lowerVal.includes("don't need") || lowerVal.includes("no need")) {
            if (lowerVal.includes("payment") || lowerVal.includes("gateway")) {
              updatedIntake.requirements = updatedIntake.requirements.replace(/payment gateway|payment|razorpay/gi, "").trim();
              updatedIntake.requirements += " (No payment gateway)";
            } else {
              updatedIntake.requirements += ` (Removed: ${userText})`;
            }
            setIntakeData(updatedIntake);
            addBotMessage(detectedLang === "en" ? "Updated requirements." : "Maine requirements update kar diye hain.");
            const next = getNextStepState(chatState, updatedIntake);
            setChatState(next);
            addBotMessage(getStepPromptMessage(next, language, updatedIntake.service, updatedIntake.projectTypes));
            setIsTyping(false);
            return;
          }

          // Add feature/incremental requirements updates (Test 6, Test 21)
          if (lowerVal.includes("admin panel") || lowerVal.includes("razorpay") || lowerVal.includes("ordering") || lowerVal.includes("bhi") || lowerVal.includes("add ")) {
            updatedIntake.requirements = updatedIntake.requirements 
              ? `${updatedIntake.requirements}, ${userText}`
              : userText;
            setIntakeData(updatedIntake);
            
            addBotMessage(detectedLang === "en" ? `Added "${userText}" to requirements.` : `Maine "${userText}" ko requirements me add kar diya hai.`);
            const next = getNextStepState(chatState, updatedIntake);
            setChatState(next);
            addBotMessage(getStepPromptMessage(next, language, updatedIntake.service, updatedIntake.projectTypes));
            setIsTyping(false);
            return;
          }

          // Reclassification checks
          if (
            lowerVal.includes("actually") ||
            lowerVal.includes("change project") ||
            lowerVal.includes("change type") ||
            lowerVal.includes("edit project") ||
            lowerVal.includes("need a saas") ||
            lowerVal.includes("need automation") ||
            lowerVal.includes("need an app") ||
            lowerVal.includes("need a website") ||
            lowerVal.includes("need a mobile app")
          ) {
            const detected = detectProjectType(userText);
            if (detected.slug) {
              updatedIntake.service = detected.slug;
              updatedIntake.serviceLabel = detected.label;
              updatedIntake.projectTypes = detected.list;
              setIntakeData(updatedIntake);
              
              addBotMessage(detectedLang === "en"
                ? `Got it — I'll update the project to ${detected.label}.`
                : `Got it — maine project type ko update karke ${detected.label} kar diya hai.`);
              
              const isScopingLabel = checkIsScopingLabel(detected.label);

              if (isScopingLabel) {
                initScoping(userText, detected.label, updatedIntake, language);
              } else {
                setScopingStage("NONE");
                setChatState("ASK_REQUIREMENTS");
                addBotMessage(getStepPromptMessage("ASK_REQUIREMENTS", language, detected.slug, detected.list));
              }
              setIsTyping(false);
              return;
            }
          }
        }
      }

      // CASE A: Chatbot is in IDLE mode (FAQ QA / Scoping Intent Detection)
      if (chatState === "IDLE") {
        const cleanText = userText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").toLowerCase().trim();

        // Check if the user input is a short context-free answer (e.g. "both", "yes", "no", "skip") while NOT inside an active consultancy state
        if (consultancyState === "NONE") {
          const shortWords = ["both", "dono", "yes", "no", "skip", "haan", "nahi", "both platforms", "dono platforms", "दोनों"];
          if (shortWords.includes(cleanText)) {
            addBotMessage(detectedLang === "hi"
              ? "मुझे आपके इस उत्तर का संदर्भ (context) समझ नहीं आया। क्या आप कोई नया प्रोजेक्ट शुरू करना चाहते हैं या हमारी सेवाओं के बारे में जानना चाहते हैं?"
              : detectedLang === "hinglish"
              ? "Mujhe is answer ka context samajh nahi aaya. Kya aap new project start karna chahte hain ya services ke baare me janna chahte hain?"
              : "I'm not sure what you're referring to. Are you looking to discuss a project, or would you like to ask about KVYASH services?");
            setIsTyping(false);
            return;
          }
        }

        // Handle active consultancyState contextual answers under IDLE
        if (consultancyState !== "NONE") {
          if (consultancyState === "MOBILE") {
            const platforms = ["both", "ios", "android", "ios and android", "ios + android", "all", "dono", "dono platforms", "both platforms", "ios bhi android bhi", "ios aur android dono", "दोनों"];
            const isPlatform = platforms.some(p => cleanText === p || cleanText.includes(p));
            if (isPlatform) {
              setConsultancyState("MOBILE_USER");
              const targetBoth = cleanText.includes("both") || cleanText.includes("dono") || cleanText.includes("all") || cleanText.includes("both platforms") || cleanText.includes("दोनों");
              const targetIos = cleanText.includes("ios") && !cleanText.includes("android");
              const platformVal = targetBoth ? "both" : targetIos ? "ios" : "android";
              setScopingData(prev => ({ ...prev, appPlatform: platformVal }));
              
              if (detectedLang === "en") {
                addBotMessage(targetBoth 
                  ? "Got it — you're targeting both iOS and Android. Who is the target user for the app?"
                  : targetIos
                  ? "Got it — you're targeting iOS. Who is the target user for the app?"
                  : "Got it — you're targeting Android. Who is the target user for the app?");
              } else if (detectedLang === "hi") {
                addBotMessage(targetBoth
                  ? "समझ गया — आप iOS और Android दोनों को टार्गेट कर रहे हैं। ऐप के लिए आपके टार्गेट यूज़र्स कौन हैं?"
                  : targetIos
                  ? "समझ गया — आप iOS को टार्गेट कर रहे हैं। ऐप के लिए आपके टार्गेट यूज़र्स कौन हैं?"
                  : "समझ गया — आप Android को टार्गेट कर रहे हैं। ऐप के लिए आपके टार्गेट यूज़र्स कौन हैं?");
              } else {
                addBotMessage(targetBoth
                  ? "Got it — aap iOS aur Android dono ko target kar rahe hain. App ke liye aapke target users kaun hain?"
                  : targetIos
                  ? "Got it — aap iOS target kar rahe hain. App ke liye aapke target users kaun hain?"
                  : "Got it — aap Android target kar rahe hain. App ke liye aapke target users kaun hain?");
              }
              setIsTyping(false);
              return;
            }
          } 
          else if (consultancyState === "MOBILE_USER") {
            setConsultancyState("MOBILE_DONE");
            setScopingData(prev => ({ ...prev, appTargetUser: userText }));
            if (detectedLang === "en") {
              addBotMessage("Understood. For a mobile app targeting those users, KVYASH can help you design a cross-platform app (using React Native or Flutter) to minimize development costs and optimize time-to-market. Would you like to start a formal project scoping session?");
            } else if (detectedLang === "hi") {
              addBotMessage("समझ गया। इन यूज़र्स को टार्गेट करने वाले मोबाइल ऐप के लिए, KVYASH विकास लागत को कम करने और टाइम-टू-मार्केट को अनुकूलित करने के लिए एक क्रॉस-प्लेटफॉर्म ऐप (React Native या Flutter का उपयोग करके) डिज़ाइन करने में आपकी मदद कर सकता है। क्या आप एक औपचारिक (formal) प्रोजेक्ट स्कोपिंग शुरू करना चाहेंगे?");
            } else {
              addBotMessage("Understood. In users ko target karne wale mobile app ke liye, KVYASH cross-platform app (React Native/Flutter) design karne me help kar sakta hai taaki dev costs aur time-to-market optimize ho sake. Kya aap formal project scoping session start karna chahenge?");
            }
            setCurrentQuickActions([
              { text: detectedLang === "en" ? "Start Project Scoping" : detectedLang === "hi" ? "प्रोजेक्ट स्कोपिंग शुरू करें" : "Project Scoping Start Karein", type: "START_PROJECT" },
              { text: detectedLang === "en" ? "Explore Services" : detectedLang === "hi" ? "सेवाएं देखें" : "Explore Services", type: "FAQ_SERVICES" }
            ]);
            setIsTyping(false);
            return;
          }
          else if (consultancyState === "WEB") {
            setConsultancyState("WEB_FEATURES");
            if (detectedLang === "en") {
              addBotMessage(`Got it. For a ${userText}, we recommend a clean frontend (React/Next.js) with standard backend APIs. What features are most important to you (e.g. payments, dashboard, customer login)?`);
            } else if (detectedLang === "hi") {
              addBotMessage(`समझ गया। ${userText} के लिए, हम मानक बैकएंड APIs के साथ एक क्लीन फ्रंटएंड (React/Next.js) की सलाह देते हैं। आपके लिए कौन से फीचर्स सबसे महत्वपूर्ण हैं (जैसे पेमेंट्स, डैशबोर्ड, कस्टमर लॉगिन)?`);
            } else {
              addBotMessage(`Got it. ${userText} ke liye, hum standard backend APIs ke sath ek clean frontend (React/Next.js) recommend karte hain. Aapke liye konse features sabse important hain (jaise payments, dashboard, customer login)?`);
            }
            setIsTyping(false);
            return;
          }
          else if (consultancyState === "WEB_FEATURES") {
            setConsultancyState("WEB_DONE");
            if (detectedLang === "en") {
              addBotMessage("Understood. We specialize in building fast, SEO-optimized web applications with modern dashboards and secure integrations. Let's start a scoping session to detail your technology requirements.");
            } else if (detectedLang === "hi") {
              addBotMessage("समझ गया। हम आधुनिक डैशबोर्ड और सुरक्षित एकीकरण (integrations) के साथ तेज़, SEO-अनुकूलित वेब एप्लिकेशन बनाने में माहिर हैं। अपनी तकनीक आवश्यकताओं का विवरण देने के लिए स्कोपिंग सत्र शुरू करें।");
            } else {
              addBotMessage("Understood. Hum modern dashboards aur secure integrations ke sath fast, SEO-optimized web applications build karne me specialize karte hain. Apne tech requirements details map karne ke liye scoping start karte hain.");
            }
            setCurrentQuickActions([
              { text: detectedLang === "en" ? "Start Project Scoping" : detectedLang === "hi" ? "प्रोजेक्ट स्कोपिंग शुरू करें" : "Project Scoping Start Karein", type: "START_PROJECT" },
              { text: detectedLang === "en" ? "Explore Services" : detectedLang === "hi" ? "सेवाएं देखें" : "Explore Services", type: "FAQ_SERVICES" }
            ]);
            setIsTyping(false);
            return;
          }
          else if (consultancyState === "SAAS") {
            setConsultancyState("SAAS_DONE");
            if (detectedLang === "en") {
              addBotMessage("Understood. We specialize in building SaaS architectures with secure multi-tenant databases, robust user dashboards, and Stripe/payment gateway integrations. Would you like to check our services or start a scoping session?");
            } else if (detectedLang === "hi") {
              addBotMessage("समझ गया। हम सुरक्षित मल्टी-टेनेंट डेटाबेस, मजबूत यूजर डैशबोर्ड और स्ट्राइप/पेमेंट गेटवे एकीकरण (integrations) के साथ SaaS आर्किटेक्चर बनाने में माहिर हैं। क्या आप हमारी सेवाएं देखना चाहेंगे या स्कोपिंग शुरू करना चाहेंगे?");
            } else {
              addBotMessage("Understood. Hum secure multi-tenant databases, user dashboards, aur payment gateway integrations ke sath SaaS architectures build karne me specialize karte hain. Kya aap humari services check karenge ya scoping session start karenge?");
            }
            setCurrentQuickActions([
              { text: detectedLang === "en" ? "Start Project Scoping" : detectedLang === "hi" ? "प्रोजेक्ट स्कोपिंग शुरू करें" : "Project Scoping Start Karein", type: "START_PROJECT" },
              { text: detectedLang === "en" ? "Explore Services" : detectedLang === "hi" ? "सेवाएं देखें" : "Explore Services", type: "FAQ_SERVICES" }
            ]);
            setIsTyping(false);
            return;
          }
          else if (consultancyState === "MARKET") {
            const marketKeywords = ["vendor portal", "vendor portals", "split payment", "split payments", "booking", "customer accounts", "admin dashboard", "vendor", "portal", "portals"];
            const isMarketFeature = marketKeywords.some(kw => cleanText.includes(kw));
            
            if (isMarketFeature) {
              setConsultancyState("MARKET_FEATURES");
              if (detectedLang === "en") {
                addBotMessage("Got it — vendor portals can be included. What else would you need from the marketplace, such as customer accounts, payments, booking, search, or an admin dashboard?");
              } else if (detectedLang === "hi") {
                addBotMessage("समझ गया — वेंडर पोर्टल्स को शामिल किया जा सकता है। आपको मार्केटप्लेस से और क्या चाहिए, जैसे कस्टमर अकाउंट्स, पेमेंट्स, बुकिंग, सर्च, या एक एडमिन डैशबोर्ड?");
              } else {
                addBotMessage("Got it — vendor portals include kiya ja sakta hai. Aapko marketplace me aur kya chahiye, jaise customer accounts, payments, booking, search, ya admin dashboard?");
              }
              setIsTyping(false);
              return;
            } else {
              setConsultancyState("MARKET_DONE");
              if (detectedLang === "en") {
                addBotMessage("Got it. Multi-party marketplaces require robust split-payment routing and vendor control portals. KVYASH has extensive blueprints for this. Let's scope the details when you are ready.");
              } else if (detectedLang === "hi") {
                addBotMessage("समझ गया। मल्टी-पार्टी मार्केटप्लेस के लिए मजबूत स्प्लिट-पेमेंट राउटिंग और वेंडर कंट्रोल पोर्टल्स की आवश्यकता होती है। KVYASH के पास इसके लिए व्यापक ब्लूप्रिंट हैं। जब आप तैयार हों तो डिटेल्स स्कोप करते हैं।");
              } else {
                addBotMessage("Got it. Multi-party marketplaces ke liye robust split-payment routing aur vendor control portals ki zaroorat hoti hai. KVYASH ke paas iske liye extensive blueprints hain. Jab aap ready hon toh details scope karte hain.");
              }
              setCurrentQuickActions([
                { text: detectedLang === "en" ? "Start Project Scoping" : detectedLang === "hi" ? "प्रोजेक्ट स्कोपिंग शुरू करें" : "Project Scoping Start Karein", type: "START_PROJECT" },
                { text: detectedLang === "en" ? "Explore Services" : detectedLang === "hi" ? "सेवाएं देखें" : "Explore Services", type: "FAQ_SERVICES" }
              ]);
              setIsTyping(false);
              return;
            }
          }
          else if (consultancyState === "MARKET_FEATURES") {
            setConsultancyState("MARKET_DONE");
            if (detectedLang === "en") {
              addBotMessage("Understood. We can help you design and build a marketplace with these modules. Would you like to start a formal scoping session to map out the vendor onboarding and split-payment routes?");
            } else if (detectedLang === "hi") {
              addBotMessage("समझ गया। हम इन क्षमताओं के साथ एक कस्टम मार्केटप्लेस को डिज़ाइन और बिल्ड करने में आपकी मदद कर सकते हैं। क्या आप स्कोपिंग सेशन शुरू करना चाहेंगे?");
            } else {
              addBotMessage("Understood. Hum in capabilities ke sath complete custom marketplace build karne me help kar sakta hai. Kya aap scoping session start karna chahenge?");
            }
            setCurrentQuickActions([
              { text: detectedLang === "en" ? "Start Project Scoping" : detectedLang === "hi" ? "प्रोजेक्ट स्कोपिंग शुरू करें" : "Project Scoping Start Karein", type: "START_PROJECT" },
              { text: detectedLang === "en" ? "Explore Services" : detectedLang === "hi" ? "सेवाएं देखें" : "Explore Services", type: "FAQ_SERVICES" }
            ]);
            setIsTyping(false);
            return;
          }
          else if (consultancyState === "AI") {
            setConsultancyState("AI_DONE");
            if (detectedLang === "en") {
              addBotMessage("Understood. We build custom LLM-powered bots, WhatsApp CRM systems, and workflow connectors to automate manual tasks. Let's start a project scope to map your workflows.");
            } else if (detectedLang === "hi") {
              addBotMessage("समझ गया। हम मैन्युअल कार्यों को ऑटोमेट करने के लिए कस्टम LLM-संचालित बॉट्स, व्हाट्सएप CRM सिस्टम और वर्कफ़्लो कनेक्टर्स बनाते हैं। अपने वर्कफ़्लो को मैप करने के लिए प्रोजेक्ट स्कोप शुरू करें।");
            } else {
              addBotMessage("Understood. Hum manual tasks ko automate karne ke liye custom LLM-powered bots, WhatsApp CRM systems, aur workflow connectors banate hain. Apne workflows ko map karne ke liye project scope start karein.");
            }
            setCurrentQuickActions([
              { text: detectedLang === "en" ? "Start Project Scoping" : detectedLang === "hi" ? "प्रोजेक्ट स्कोपिंग शुरू करें" : "Project Scoping Start Karein", type: "START_PROJECT" },
              { text: detectedLang === "en" ? "Explore Services" : detectedLang === "hi" ? "सेवाएं देखें" : "Explore Services", type: "FAQ_SERVICES" }
            ]);
            setIsTyping(false);
            return;
          }
          else if (consultancyState === "NOT_SURE") {
            setConsultancyState("NOT_SURE_DONE");
            if (detectedLang === "en") {
              addBotMessage("Thank you for the context. We recommend starting with a technology consultation session to map your architecture. Would you like to request a blueprint?");
            } else if (detectedLang === "hi") {
              addBotMessage("विवरण के लिए धन्यवाद। हम आपकी वास्तुकला (architecture) को मैप करने के लिए एक तकनीक परामर्श सत्र (technology consultation session) के साथ शुरू करने की सलाह देते हैं। क्या आप एक ब्लूप्रिंट का अनुरोध करना चाहेंगे?");
            } else {
              addBotMessage("Thank you details ke liye. Hum architecture map karne ke liye ek tech consultation session ke sath start karne ki advice dete hain. Kya aap blueprint request karna chahenge?");
            }
            setCurrentQuickActions([
              { text: detectedLang === "en" ? "Start Project Scoping" : detectedLang === "hi" ? "प्रोजेक्ट स्कोपिंग शुरू करें" : "Project Scoping Start Karein", type: "START_PROJECT" },
              { text: detectedLang === "en" ? "Explore Services" : detectedLang === "hi" ? "सेवाएं देखें" : "Explore Services", type: "FAQ_SERVICES" }
            ]);
            setIsTyping(false);
            return;
          }
        }

        if (userText === "I need help" || userText.toLowerCase() === "help") {
          addBotMessage(detectedLang === "en" 
            ? "Sure — are you looking to start a new project, learn about our services, or get help with something else?"
            : "Ji — kya aap naya project start karna chahte hain, services ke baare me janna chahte hain, ya kisi aur cheez me help chahiye?");
          stopTyping();
          return;
        }

        // Greeting QA check
        if (lowerVal === "hi" || lowerVal === "hello") {
          addBotMessage("Hi! I'm the KVYASH Assistant. I can help with services, projects, or starting a new project enquiry. What are you looking to build?");
          stopTyping();
          return;
        }

        // Random/Unclear inputs check / Gibberish check
        if (isGibberish(userText)) {
          addBotMessage(detectedLang === "hi"
            ? "मुझे यह समझ नहीं आया। क्या आप KVYASH के बारे में जानकारी चाहते हैं या किसी प्रोजेक्ट पर चर्चा करना चाहते हैं?"
            : detectedLang === "hinglish"
            ? "Mujhe ye samajh nahi aaya. Kya aap KVYASH ke baare me information chahte hain ya kisi project par discuss karna chahte hain?"
            : "I didn't quite catch that. Are you looking for information about KVYASH or would you like to discuss a project?");
          stopTyping();
          return;
        }

        if (
          typeKey === "start-project" ||
          typeKey === "START_PROJECT" ||
          typeKey === "BUILD_SOMETHING" ||
          typeKey === "AI_AUTOMATION" ||
          typeKey === "OFFLINE_TO_ONLINE" ||
          typeKey === "MARKETPLACE" ||
          typeKey === "MARKETING_GROWTH" ||
          typeKey === "CONSULTANCY" ||
          typeKey === "NOT_SURE" ||
          isProjectIntent(userText) ||
          lowerVal.includes("want to work with you") ||
          lowerVal.includes("want to hire") ||
          lowerVal.includes("book a project") ||
          lowerVal.includes("contact me")
        ) {
          setLanguage(detectedLang);
          
          // Auto-extract provided details from prompt
          const extracted = extractIntakeInfo(userText);
          const freshIntake = {
            name: extracted.name || "",
            email: extracted.email || "",
            phone: "",
            company: extracted.company || "",
            service: extracted.service || "",
            serviceLabel: extracted.serviceLabel || "",
            requirements: extracted.requirements || "",
            timeline: extracted.timeline || "",
            budget: "",
            projectTypes: extracted.projectTypes || []
          };

          // Classify intents from user message or selected typeKey
          let detectedIntents = classifyIntents(userText);
          if (typeKey === "START_PROJECT") {
            detectedIntents = ["BUILD_SOMETHING"];
          } else if (typeKey && typeKey !== "start-project" && QUICK_ACTIONS.some(qa => typeKey === qa.type)) {
            detectedIntents = [typeKey as BotIntent];
          }

          // Pre-populate service labels
          let matchedService = "";
          let matchedLabel = freshIntake.serviceLabel || "";
          if (currentConsultancyState === "MOBILE" || currentConsultancyState === "MOBILE_USER" || currentConsultancyState === "MOBILE_DONE" || scopingData.appPlatform) {
            matchedService = "application-development";
            if (!matchedLabel) matchedLabel = "Mobile App";
          } else if (currentConsultancyState === "WEB" || currentConsultancyState === "WEB_FEATURES" || currentConsultancyState === "WEB_DONE") {
            matchedService = "web-development";
            if (!matchedLabel) matchedLabel = "Web Development";
          } else if (currentConsultancyState === "SAAS" || currentConsultancyState === "SAAS_DONE") {
            matchedService = "saas-development";
            if (!matchedLabel) matchedLabel = "SaaS";
          } else if (currentConsultancyState === "MARKET" || currentConsultancyState === "MARKET_FEATURES" || currentConsultancyState === "MARKET_DONE") {
            matchedService = "marketplace-development";
            if (!matchedLabel) matchedLabel = "Marketplace";
          } else if (currentConsultancyState === "AI" || currentConsultancyState === "AI_DONE") {
            matchedService = "ai-solutions";
            if (!matchedLabel) matchedLabel = "AI & Automation";
          } else if (detectedIntents.includes("OFFLINE_TO_ONLINE")) {
            matchedService = "digital-transformation";
            if (!matchedLabel) matchedLabel = "Offline to Online";
          } else if (detectedIntents.includes("MARKETPLACE")) {
            matchedService = "marketplace-development";
            if (!matchedLabel) matchedLabel = "Marketplace";
          } else if (detectedIntents.includes("CONSULTANCY") || detectedIntents.includes("NOT_SURE")) {
            matchedService = "technology-consulting";
            if (!matchedLabel) matchedLabel = "Technology Consulting";
          } else if (detectedIntents.includes("MARKETING_GROWTH")) {
            matchedService = "marketing-growth";
            if (!matchedLabel) matchedLabel = "Marketing & Growth";
          } else if (detectedIntents.includes("AI_AUTOMATION")) {
            matchedService = "ai-solutions";
            if (!matchedLabel) matchedLabel = "AI & Automation";
          } else {
            matchedService = freshIntake.service || "custom-software";
            if (!matchedLabel) matchedLabel = "Custom Software";
          }

          freshIntake.service = matchedService;
          freshIntake.serviceLabel = matchedLabel;
          if (freshIntake.projectTypes.length === 0) {
            freshIntake.projectTypes = [matchedLabel];
          }

          setIntakeData(freshIntake);

          // Setup initial announcement if multiple intents exist
          if (detectedIntents.length > 1) {
            let announcement = "";
            if (detectedLang === "en") {
              const stages: string[] = [];
              if (detectedIntents.includes("OFFLINE_TO_ONLINE")) stages.push("offline-to-online setup");
              if (detectedIntents.includes("BUILD_SOMETHING") || detectedIntents.some(i => i === "MARKETPLACE")) stages.push("ecommerce/product setup");
              if (detectedIntents.some(i => ["WA_CRM", "AI_BOT", "AI_CRM", "EMAIL_AUTO", "AI_CALLING", "AI_AUTOMATION"].includes(i))) stages.push("WhatsApp/CRM/AI automation");
              if (detectedIntents.includes("MARKETING_GROWTH")) stages.push("marketing & growth");
              
              if (stages.length > 1) {
                announcement = `Yes, we can look at this as one connected transformation: ${stages.join(" → ")}. I'll guide you through each area step-by-step.`;
              } else {
                announcement = `Got it. You're looking to scope multiple requirements: ${detectedIntents.map(i => i.replace("_", " ").toLowerCase()).join(" + ")}. I'll guide you through each area step-by-step.`;
              }
            } else {
              const stages: string[] = [];
              if (detectedIntents.includes("OFFLINE_TO_ONLINE")) stages.push("offline-to-online");
              if (detectedIntents.includes("BUILD_SOMETHING") || detectedIntents.some(i => i === "MARKETPLACE")) stages.push("ecommerce/product");
              if (detectedIntents.some(i => ["WA_CRM", "AI_BOT", "AI_CRM", "EMAIL_AUTO", "AI_CALLING", "AI_AUTOMATION"].includes(i))) stages.push("automation");
              if (detectedIntents.includes("MARKETING_GROWTH")) stages.push("marketing");
              
              if (stages.length > 1) {
                announcement = `Haan, hum isko ek connected transformation ki tarah dekh sakte hain: ${stages.join(" → ")}. Hum har area ko ek-ek karke discuss karenge.`;
              } else {
                announcement = `Got it. Aap multiple requirements scope karna chahte hain: ${detectedIntents.map(i => i.replace("_", " ")).join(" + ")}. Hum har area ko ek-ek karke discuss karenge.`;
              }
            }
            addBotMessage(announcement);
          }

          // Pre-populate scopingData fields from first message if possible
          const initialExtractedData = parseScopingInput(userText, scopingData, "NONE");
          const mergedScopingData = { ...scopingData, ...initialExtractedData };
          setScopingData(mergedScopingData);

          setActiveIntents(detectedIntents);
          setCurrentIntentIndex(0);

          runScoping(userText, detectedIntents[0], 0, detectedIntents, freshIntake, detectedLang, mergedScopingData);
          stopTyping();
          return;
        } else {
          // Standard QA FAQ response
          const botResponse = getFaqResponse(processedUserText, typeKey, detectedLang);
          if (botResponse !== null) {
            addBotMessage(botResponse);
            stopTyping();
          } else {
            // No local answer found, trigger AI Fallback
            fetch('/api/assistant', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: processedUserText, language: detectedLang, context: lastEntityContext })
            })
            .then(res => res.json())
            .then(data => {
              addBotMessage(data.reply || (detectedLang === "hi" ? "कुछ गड़बड़ हुई, कृपया दोबारा कोशिश करें।" : detectedLang === "hinglish" ? "Kuch error aaya, kripya dubara try karein." : "I'm not sure I understand that right now."));
              stopTyping();
            })
            .catch(() => {
              addBotMessage(detectedLang === "hi" ? "कुछ गड़बड़ हुई, कृपया दोबारा कोशिश करें।" : detectedLang === "hinglish" ? "Kuch error aaya, kripya dubara try karein." : "I'm not sure I understand that right now.");
              stopTyping();
            });
            return;
          }
        }

        return;
      }

      // CASE B: Chatbot is inside the multi-step lead capture flow
      let nextState: ChatState = chatState;
      let botResponseText = "";

      switch (chatState) {
        case "SCOPING_PROJECT": {
          const lowerScopingVal = userText.toLowerCase().trim();
          let correctionMade = false;
          let correctionMsg = "";

          // 1. Change project type from ecommerce to marketplace
          if (lowerScopingVal.includes("change the project from ecommerce to marketplace") || lowerScopingVal.includes("marketplace instead of ecommerce")) {
            updatedIntake.service = "marketplace-development";
            updatedIntake.serviceLabel = "Marketplace";
            updatedIntake.projectTypes = ["Marketplace"];

            setActiveIntents(prev => {
              const next = [...prev];
              const idx = next.indexOf("BUILD_SOMETHING");
              if (idx !== -1) {
                next[idx] = "MARKETPLACE";
              } else if (!next.includes("MARKETPLACE")) {
                next.push("MARKETPLACE");
              }
              return next;
            });

            correctionMsg = language === "en"
              ? "Understood. I've changed your project type to a Marketplace. Let's scope the marketplace features."
              : "Samajh gaya. Maine project type E-commerce se badalkar Marketplace kar diya hai. Ab marketplace features discuss karte hain.";

            correctionMade = true;
          }
          // 2. Add marketing intent midway
          else if (lowerScopingVal.includes("also add marketing") || lowerScopingVal.includes("marketing bhi chahiye") || lowerScopingVal.includes("need marketing too") || lowerScopingVal.includes("also need marketing")) {
            setActiveIntents(prev => {
              if (!prev.includes("MARKETING_GROWTH")) {
                return [...prev, "MARKETING_GROWTH"];
              }
              return prev;
            });
            correctionMsg = language === "en"
              ? "Got it. I've added Marketing & Growth to our scoping sequence."
              : "Got it. Maine scoping sequence me Marketing & Growth add kar diya hai.";
            correctionMade = true;
          }
          // 3. Update shoes to clothing
          else if (lowerScopingVal.includes("actually clothing instead of shoes") || (lowerScopingVal.includes("clothing") && lowerScopingVal.includes("instead of"))) {
            setScopingData(prev => ({
              ...prev,
              ecommProducts: "Clothing",
              offlineBizType: "Clothing Shop"
            }));
            correctionMsg = language === "en" ? "Updated product type to clothing." : "Product type badalkar clothing kar diya gaya hai.";
            correctionMade = true;
          }
          // 4. Update payments to false/No
          else if (lowerScopingVal.includes("don't need payments") || lowerScopingVal.includes("no payments") || lowerScopingVal.includes("payments nahi chahiye")) {
            setScopingData(prev => ({
              ...prev,
              ecommPayments: "No",
              offlinePayments: "No"
            }));
            correctionMsg = language === "en" ? "Updated: Payments integration not required." : "Updated: Payments ki zaroorat nahi hai.";
            correctionMade = true;
          }

          if (correctionMade) {
            const nextActiveIntents = [...activeIntents];
            if (lowerScopingVal.includes("change the project from ecommerce to marketplace") || lowerScopingVal.includes("marketplace instead of ecommerce")) {
              const idx = nextActiveIntents.indexOf("BUILD_SOMETHING");
              if (idx !== -1) {
                nextActiveIntents[idx] = "MARKETPLACE";
              } else if (!nextActiveIntents.includes("MARKETPLACE")) {
                nextActiveIntents.push("MARKETPLACE");
              }
            }
            if (lowerScopingVal.includes("also add marketing") || lowerScopingVal.includes("marketing bhi chahiye") || lowerScopingVal.includes("need marketing too") || lowerScopingVal.includes("also need marketing")) {
              if (!nextActiveIntents.includes("MARKETING_GROWTH")) {
                nextActiveIntents.push("MARKETING_GROWTH");
              }
            }

            setIntakeData(updatedIntake);
            addBotMessage(correctionMsg);

            const nextScopingData = { ...scopingData };
            if (lowerScopingVal.includes("actually clothing instead of shoes") || (lowerScopingVal.includes("clothing") && lowerScopingVal.includes("instead of"))) {
              nextScopingData.ecommProducts = "Clothing";
              nextScopingData.offlineBizType = "Clothing Shop";
            }
            if (lowerScopingVal.includes("don't need payments") || lowerScopingVal.includes("no payments") || lowerScopingVal.includes("payments nahi chahiye")) {
              nextScopingData.ecommPayments = "No";
              nextScopingData.offlinePayments = "No";
            }

            const currentIntent = nextActiveIntents[currentIntentIndex] || "BUILD_SOMETHING";
            setTimeout(() => {
              runScoping("", currentIntent, currentIntentIndex, nextActiveIntents, updatedIntake, language, nextScopingData);
            }, 600);

            setIsTyping(false);
            return;
          }

          if (!updatedIntake.service) {
            const detected = detectProjectType(userText);
            if (detected.slug) {
              updatedIntake.service = detected.slug;
              updatedIntake.serviceLabel = detected.label;
              updatedIntake.projectTypes = detected.list;
            }
          }
          setIntakeData(updatedIntake);

          const isTextStage = 
            scopingStage === "ECOMM_PRODUCTS" ||
            scopingStage === "SAAS_USERS" || scopingStage === "SAAS_WORKFLOW" ||
            scopingStage === "BOT_PURPOSE" || scopingStage === "BOT_USERS" || scopingStage === "BOT_KNOWLEDGE" || scopingStage === "BOT_CHANNELS" ||
            scopingStage === "APP_PLATFORM" || scopingStage === "APP_FEATURES" ||
            scopingStage === "AUTO_WORKFLOW" || scopingStage === "AUTO_TRIGGER" || scopingStage === "AUTO_ACTION" || scopingStage === "AUTO_TOOLS" || scopingStage === "AUTO_RESULT" ||
            scopingStage === "CONSULT_GOAL" || scopingStage === "CONSULT_PROBLEM" || scopingStage === "CONSULT_CUST_ACTION" ||
            scopingStage === "OFFLINE_BIZ" || scopingStage === "OFFLINE_ACTION" || scopingStage === "OFFLINE_DELIVERY" ||
            scopingStage === "MARKET_TARGET" || scopingStage === "MARKET_MODEL" || scopingStage === "MARKET_ONBOARDING" || scopingStage === "MARKET_COMMISSION" ||
            scopingStage === "MARKETING_BIZ" || scopingStage === "MARKETING_GOAL";

          const yesPatterns = ["yes", "yeah", "yup", "sure", "ok", "haan", "ji haan", "chahiye", "integrate kar", "add", "include"];
          const noPatterns = ["no", "nope", "not needed", "nahi", "na", "nahi chahiye", "exclude", "without", "skip"];
          const norm = userText.toLowerCase().trim();
          const isAmbiguousYesNo = isTextStage && (yesPatterns.some(p => norm === p) || noPatterns.some(p => norm === p));

          if (isAmbiguousYesNo) {
            let clarificationText = "";
            if (scopingStage === "ECOMM_PRODUCTS") clarificationText = language === "en" ? "Sure — what specific items or products are you selling?" : "Kripya batayein aap kya sell karenge?";
            else if (scopingStage === "SAAS_USERS") clarificationText = language === "en" ? "Understood. Who will be the end users of your SaaS application?" : "Aapke SaaS ke customers/users kaun honge?";
            else if (scopingStage === "SAAS_WORKFLOW") clarificationText = language === "en" ? "Could you explain the main action or workflow users perform in this SaaS?" : "SaaS ka main user workflow kya hoga?";
            else if (scopingStage === "BOT_PURPOSE") clarificationText = language === "en" ? "Could you specify the primary task or role this chatbot will handle?" : "Chatbot ka primary task kya hoga?";
            else if (scopingStage === "BOT_USERS") clarificationText = language === "en" ? "Who are the primary target users of this chatbot?" : "Chatbot ko primarily kaun use karega?";
            else if (scopingStage === "BOT_KNOWLEDGE") clarificationText = language === "en" ? "Where should the bot look for its knowledge (e.g. documents, PDFs, link)?" : "Bot training database kya hoga?";
            else if (scopingStage === "BOT_CHANNELS") clarificationText = language === "en" ? "What channels will this bot deploy to (e.g. Website, WhatsApp, Slack)?" : "Chatbot ko kahan deploy karna hai?";
            else if (scopingStage === "APP_PLATFORM") clarificationText = language === "en" ? "Should we build this for Android, iOS, or both platforms?" : "Aapko app Android ke liye chahiye, iOS ke liye, ya dono ke liye?";
            else if (scopingStage === "APP_FEATURES") clarificationText = language === "en" ? "Could you list the core features you want in this mobile application?" : "Mobile app ke main features kya honge?";
            else if (scopingStage === "AUTO_WORKFLOW") clarificationText = language === "en" ? "Could you describe the manual workflow you are looking to automate?" : "Aap konsa manual workflow automate karna chahte hain?";
            else if (scopingStage === "AUTO_TRIGGER") clarificationText = language === "en" ? "What event triggers this automation (e.g. new form submit, invoice payment)?" : "Automation shuru karne ka trigger event kya hoga?";
            else if (scopingStage === "AUTO_ACTION") clarificationText = language === "en" ? "What actions should the automation run once triggered?" : "Trigger hone ke baad kya tasks trigger honge?";
            else if (scopingStage === "AUTO_TOOLS") clarificationText = language === "en" ? "What apps or tools should be linked (e.g. Salesforce, Excel, Gmail)?" : "Kon-konse system APIs connect karne hain?";
            else if (scopingStage === "AUTO_RESULT") clarificationText = language === "en" ? "What is the final result of this automated process?" : "Automation shuru hone ka target outcome kya hai?";
            else if (scopingStage === "CONSULT_GOAL") clarificationText = language === "en" ? "What target or milestone are you aiming to achieve?" : "Kripya batayein aap kya goal achieve karna chahte hain?";
            else if (scopingStage === "CONSULT_PROBLEM") clarificationText = language === "en" ? "Which challenge best describes your stage?" : "Kripya list me se apna primary challenge select karein.";
            else if (scopingStage === "CONSULT_CUST_ACTION") clarificationText = language === "en" ? "What actions should users perform online?" : "Kripya batayein log aapki site/app par kya actions perform kar sakein?";
            else if (scopingStage === "OFFLINE_BIZ") clarificationText = language === "en" ? "What type of offline business is it?" : "Kripya batayein aapka offline business kya kaam karta hai?";
            else if (scopingStage === "OFFLINE_ACTION") clarificationText = language === "en" ? "Should customers browse, order and pay online, or Whatsapp connect?" : "Kripya target online action batayein.";
            else if (scopingStage === "OFFLINE_DELIVERY") clarificationText = language === "en" ? "What is the delivery area or geographic boundary?" : "Kripya delivery area limits/rules batayein.";
            else if (scopingStage === "MARKET_TARGET") clarificationText = language === "en" ? "Is it B2B or B2C?" : "Kripya target model (B2B ya B2C) batayein.";
            else if (scopingStage === "MARKET_MODEL") clarificationText = language === "en" ? "Are you selling products or booking services?" : "Kripya marketplace model (products/services) batayein.";
            else if (scopingStage === "MARKET_ONBOARDING") clarificationText = language === "en" ? "How will vendors onboard and sign up?" : "Vendors onboarding process kya hoga?";
            else if (scopingStage === "MARKET_COMMISSION") clarificationText = language === "en" ? "What commission or billing model is used?" : "Commission structure kya rakhenge?";
            else if (scopingStage === "MARKETING_BIZ") clarificationText = language === "en" ? "What business or product should we market?" : "Aap kis product ko promote karna chahte hain?";
            else if (scopingStage === "MARKETING_GOAL") clarificationText = language === "en" ? "What is the primary marketing milestone?" : "Aapka main target milestone kya hai?";

            nextState = "SCOPING_PROJECT";
            botResponseText = clarificationText;
          } else {
            const updates = parseScopingInput(userText, scopingData, scopingStage);
            const newScopingData = { ...scopingData, ...updates };
            setScopingData(newScopingData);

            const activeIntent = activeIntents[currentIntentIndex] || "BUILD_SOMETHING";
            runScoping(userText, activeIntent, currentIntentIndex, activeIntents, updatedIntake, language, newScopingData);
            return;
          }
        }
        break;

        case "ASK_CONTACT_NAME":
          if (!userText || userText.length < 2) {
            botResponseText = language === "en"
              ? "Please enter a valid name (minimum 2 characters)."
              : "Kripya ek valid naam likhein (kam se kam 2 characters).";
          } else {
            updatedIntake.name = userText;
            setIntakeData(updatedIntake);
            if (returnToReview) {
              nextState = "REVIEW";
              setReturnToReview(false);
              botResponseText = language === "en" ? "Updated. Review your details below." : "Name update ho gaya hai. Review kar lein.";
            } else {
              nextState = getNextStepState(chatState, updatedIntake);
              botResponseText = getStepPromptMessage(nextState, language, updatedIntake.service, updatedIntake.projectTypes);
            }
          }
          break;

        case "ASK_CONTACT_EMAIL":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!userText || !emailRegex.test(userText)) {
            botResponseText = language === "en"
              ? "Please enter a valid email address."
              : "Kripya ek valid email address enter karein.";
          } else {
            updatedIntake.email = userText;
            setIntakeData(updatedIntake);
            if (returnToReview) {
              nextState = "REVIEW";
              setReturnToReview(false);
              botResponseText = language === "en" ? "Updated. Review your details below." : "Email update ho gaya hai. Review kar lein.";
            } else {
              nextState = getNextStepState(chatState, updatedIntake);
              botResponseText = getStepPromptMessage(nextState, language, updatedIntake.service, updatedIntake.projectTypes);
            }
          }
          break;

        case "ASK_PROJECT_TYPE":
          const cleanedText = cleanProjectTypeName(userText);
          const isValid = isValidProjectType(cleanedText);
          if (!isValid) {
            botResponseText = language === "en"
              ? "I didn't quite catch that. What are you looking to build — a website, ecommerce store, SaaS product, marketplace, mobile app, AI system, automation, or something else?"
              : language === "hi"
              ? "मुझे यह प्रोजेक्ट टाइप समझ नहीं आया। आप क्या बनाना चाहते हैं — वेबसाइट, ई-कॉमर्स स्टोर, SaaS, मार्केटप्लेस, मोबाइल ऐप, AI सिस्टम, ऑटोमेशन या कुछ और?"
              : "Mujhe ye project type samajh nahi aaya. Aap kya banana chahte hain — website, ecommerce store, SaaS, marketplace, mobile app, AI system, automation, ya kuch aur?";
            nextState = "ASK_PROJECT_TYPE";
          } else {
            const detected = detectProjectType(cleanedText);
            const typeSlug = detected.slug || "custom-software";
            updatedIntake.service = typeSlug;
            updatedIntake.serviceLabel = cleanedText;
            updatedIntake.projectTypes = [cleanedText];
            setIntakeData(updatedIntake);
            
            const isScopingLabel = checkIsScopingLabel(cleanedText);
              
            if (isScopingLabel) {
              initScoping(cleanedText, cleanedText, updatedIntake, language);
              setIsTyping(false);
              return;
            } else {
              setScopingStage("NONE");
              if (returnToReview) {
                nextState = "REVIEW";
                setReturnToReview(false);
                botResponseText = language === "en" ? "Updated. Review your details below." : "Project type update ho gaya hai. Review kar lein.";
              } else {
                nextState = getNextStepState(chatState, updatedIntake);
                botResponseText = getStepPromptMessage(nextState, language, updatedIntake.service, updatedIntake.projectTypes);
              }
            }
          }
          break;

        case "ASK_REQUIREMENTS":
          if (checkIsScopingLabel(updatedIntake.serviceLabel) || updatedIntake.projectTypes.some(t => checkIsScopingLabel(t))) {
            
            const isTextStage = 
              scopingStage === "ECOMM_PRODUCTS" ||
              scopingStage === "SAAS_USERS" || scopingStage === "SAAS_WORKFLOW" ||
              scopingStage === "BOT_PURPOSE" || scopingStage === "BOT_USERS" || scopingStage === "BOT_KNOWLEDGE" || scopingStage === "BOT_CHANNELS" ||
              scopingStage === "APP_PLATFORM" || scopingStage === "APP_FEATURES" ||
              scopingStage === "AUTO_WORKFLOW" || scopingStage === "AUTO_TRIGGER" || scopingStage === "AUTO_ACTION" || scopingStage === "AUTO_TOOLS" || scopingStage === "AUTO_RESULT";

            const yesPatterns = ["yes", "yeah", "yup", "sure", "ok", "haan", "ji haan", "chahiye", "integrate kar", "add", "include"];
            const noPatterns = ["no", "nope", "not needed", "nahi", "na", "nahi chahiye", "exclude", "without", "skip"];
            const norm = userText.toLowerCase().trim();
            const isAmbiguousYesNo = isTextStage && (yesPatterns.some(p => norm === p) || noPatterns.some(p => norm === p));

            if (isAmbiguousYesNo) {
              let clarificationText = "";
              if (scopingStage === "ECOMM_PRODUCTS") clarificationText = language === "en" ? "Sure — what specific items or products are you selling?" : "Kripya batayein aap kya sell karenge?";
              else if (scopingStage === "SAAS_USERS") clarificationText = language === "en" ? "Understood. Who will be the end users of your SaaS application?" : "Aapke SaaS ke customers/users kaun honge?";
              else if (scopingStage === "SAAS_WORKFLOW") clarificationText = language === "en" ? "Could you explain the main action or workflow users perform in this SaaS?" : "SaaS ka main user workflow kya hoga?";
              else if (scopingStage === "BOT_PURPOSE") clarificationText = language === "en" ? "Could you specify the primary task or role this chatbot will handle?" : "Chatbot ka primary task kya hoga?";
              else if (scopingStage === "BOT_USERS") clarificationText = language === "en" ? "Who are the primary target users of this chatbot?" : "Chatbot ko primarily kaun use karega?";
              else if (scopingStage === "BOT_KNOWLEDGE") clarificationText = language === "en" ? "Where should the bot look for its knowledge (e.g. documents, PDFs, link)?" : "Bot training database kya hoga?";
              else if (scopingStage === "BOT_CHANNELS") clarificationText = language === "en" ? "What channels will this bot deploy to (e.g. Website, WhatsApp, Slack)?" : "Chatbot ko kahan deploy karna hai?";
              else if (scopingStage === "APP_PLATFORM") clarificationText = language === "en" ? "Should we build this for Android, iOS, or both platforms?" : "Aapko app Android ke liye chahiye, iOS ke liye, ya dono ke liye?";
              else if (scopingStage === "APP_FEATURES") clarificationText = language === "en" ? "Could you list the core features you want in this mobile application?" : "Mobile app ke main features kya honge?";
              else if (scopingStage === "AUTO_WORKFLOW") clarificationText = language === "en" ? "Could you describe the manual workflow you are looking to automate?" : "Aap konsa manual workflow automate karna chahte hain?";
              else if (scopingStage === "AUTO_TRIGGER") clarificationText = language === "en" ? "What event triggers this automation (e.g. new form submit, invoice payment)?" : "Automation shuru karne ka trigger event kya hoga?";
              else if (scopingStage === "AUTO_ACTION") clarificationText = language === "en" ? "What actions should the automation run once triggered?" : "Trigger hone ke baad kya tasks trigger honge?";
              else if (scopingStage === "AUTO_TOOLS") clarificationText = language === "en" ? "What apps or tools should be linked (e.g. Salesforce, Excel, Gmail)?" : "Kon-konse system APIs connect karne hain?";
              else if (scopingStage === "AUTO_RESULT") clarificationText = language === "en" ? "What is the final result of this automated process?" : "Automation shuru hone ka target outcome kya hai?";

              nextState = "ASK_REQUIREMENTS";
              botResponseText = clarificationText;
            } else {
              const updates = parseScopingInput(userText, scopingData, scopingStage);
              const newScopingData = { ...scopingData, ...updates };
              setScopingData(newScopingData);

              let nextScopingStage: typeof scopingStage = "NONE";
              let botPrompt = "";

              const isE = updatedIntake.serviceLabel.includes("E-commerce") || updatedIntake.projectTypes.includes("E-commerce");
              const isS = updatedIntake.serviceLabel.includes("SaaS") || updatedIntake.projectTypes.includes("SaaS") || updatedIntake.serviceLabel.toLowerCase().includes("saas");
              const isB = updatedIntake.serviceLabel.includes("AI Solutions") || updatedIntake.projectTypes.includes("AI Solutions") || updatedIntake.serviceLabel.toLowerCase().includes("chatbot");
              const isA = updatedIntake.serviceLabel.includes("Application Development") || updatedIntake.projectTypes.includes("Application Development") || updatedIntake.serviceLabel.includes("Mobile App");
              const isAu = updatedIntake.serviceLabel.includes("AI-Automation") || updatedIntake.projectTypes.includes("AI-Automation") || updatedIntake.serviceLabel.includes("Business Automation") || updatedIntake.serviceLabel.includes("Process Automation") || updatedIntake.serviceLabel.toLowerCase().includes("automation");

              if (isE) {
                if (!newScopingData.ecommProducts) { nextScopingStage = "ECOMM_PRODUCTS"; botPrompt = language === "en" ? "What will you be selling?" : "Aap kya sell karenge?"; }
                else if (!newScopingData.ecommPayments) { nextScopingStage = "ECOMM_PAYMENTS"; botPrompt = language === "en" ? "Will you need online payments?" : "Kya aapko online payments integrate karwani hain?"; }
                else if (!newScopingData.ecommInventory) { nextScopingStage = "ECOMM_INVENTORY"; botPrompt = language === "en" ? "Will you need inventory management?" : "Kya inventory management features chahiye?"; }
                else if (!newScopingData.ecommAdmin) { nextScopingStage = "ECOMM_ADMIN"; botPrompt = language === "en" ? "Will you need an admin panel?" : "Kya admin panel ki zaroorat hai?"; }
              } else if (isS) {
                if (!newScopingData.saasUsers) { nextScopingStage = "SAAS_USERS"; botPrompt = language === "en" ? "Who are the target users for your SaaS?" : "Aapke SaaS ke target users kaun hain?"; }
                else if (!newScopingData.saasWorkflow) { nextScopingStage = "SAAS_WORKFLOW"; botPrompt = language === "en" ? "What is the main workflow or problem this SaaS solves?" : "SaaS ka main workflow ya user path kya hoga?"; }
                else if (!newScopingData.saasAuth) { nextScopingStage = "SAAS_AUTH"; botPrompt = language === "en" ? "Will you need user authentication (signup/login)?" : "Kya authentication setup chahiye (signup/login)?"; }
                else if (!newScopingData.saasDashboard) { nextScopingStage = "SAAS_DASHBOARD"; botPrompt = language === "en" ? "Will your SaaS require a custom dashboard interface?" : "Kya user/admin custom dashboard dashboard interface chahiye?"; }
                else if (!newScopingData.saasBilling) { nextScopingStage = "SAAS_BILLING"; botPrompt = language === "en" ? "Will you need subscription billing or payment gates?" : "Kya subscription billing setup (Stripe integrations) chahiye?"; }
                else if (!newScopingData.saasIntegrations) { nextScopingStage = "SAAS_INTEGRATIONS"; botPrompt = language === "en" ? "Will you need to connect third-party APIs or integrations?" : "Kya external API integrations add karne hain?"; }
              } else if (isB) {
                if (!newScopingData.botPurpose) { nextScopingStage = "BOT_PURPOSE"; botPrompt = language === "en" ? "What is the primary purpose of this AI chatbot?" : "Chatbot ka main purpose kya hai?"; }
                else if (!newScopingData.botUsers) { nextScopingStage = "BOT_USERS"; botPrompt = language === "en" ? "Who will be interacting with the chatbot (customers, staff, etc.)?" : "Users kaun honge (customers ya support staff)?"; }
                else if (!newScopingData.botKnowledge) { nextScopingStage = "BOT_KNOWLEDGE"; botPrompt = language === "en" ? "What is the knowledge source (documents, database, FAQs) for training the bot?" : "Bot train karne ke liye knowledge source kya hai?"; }
                else if (!newScopingData.botChannels) { nextScopingStage = "BOT_CHANNELS"; botPrompt = language === "en" ? "What channels should the bot support (website, WhatsApp, Slack)?" : "Chatbot kahan deploy hoga (website, WhatsApp, Slack)?"; }
                else if (!newScopingData.botLeadCapture) { nextScopingStage = "BOT_LEAD_CAPTURE"; botPrompt = language === "en" ? "Should the chatbot capture leads and contact details?" : "Kya chatbot contact leads capture karega?"; }
                else if (!newScopingData.botHandoff) { nextScopingStage = "BOT_HANDOFF"; botPrompt = language === "en" ? "Will you need a human handoff fallback or live chat trigger?" : "Kya human agent handoff fallback system chahiye?"; }
              } else if (isA) {
                if (!newScopingData.appPlatform) { nextScopingStage = "APP_PLATFORM"; botPrompt = language === "en" ? "Which platforms are we targeting: iOS, Android, or both?" : "Konsi platform target karni hai: iOS, Android, ya dono?"; }
                else if (!newScopingData.appTargetUser) { nextScopingStage = "APP_TARGET_USER"; botPrompt = language === "en" ? "Who is the target user for the app?" : "App ke target users kaun hain?"; }
                else if (!newScopingData.appFeatures) {
                  nextScopingStage = "APP_FEATURES";
                  botPrompt = language === "en"
                    ? `Got it — a mobile app for ${newScopingData.appTargetUser || 'local users'}, targeting ${newScopingData.appPlatform === 'both' ? 'both iOS and Android' : newScopingData.appPlatform}. What would you like the app to include?`
                    : language === "hi"
                    ? `समझ गया — ${newScopingData.appTargetUser || 'लोकल यूज़र्स'} के लिए मोबाइल ऐप, जो ${newScopingData.appPlatform === 'both' ? 'iOS और Android दोनों' : newScopingData.appPlatform} को टार्गेट कर रहा है। आप ऐप में क्या शामिल करना चाहेंगे?`
                    : `Got it — ${newScopingData.appTargetUser || 'local users'} ke liye mobile app, targeting ${newScopingData.appPlatform === 'both' ? 'both iOS and Android' : newScopingData.appPlatform}. Aap app me kya requirements include karna chahenge?`;
                }
                else if (!newScopingData.appAuth) { nextScopingStage = "APP_AUTH"; botPrompt = language === "en" ? "Will the mobile app require user authentication?" : "Kya app me signup/login setup chahiye?"; }
                else if (!newScopingData.appBackend) { nextScopingStage = "APP_BACKEND"; botPrompt = language === "en" ? "Will you need a custom backend database or admin API to manage app data?" : "Kya content control ke liye admin database panel chahiye?"; }
                else if (!newScopingData.appNotifications) { nextScopingStage = "APP_NOTIFICATIONS"; botPrompt = language === "en" ? "Do you need push notifications integrated?" : "Kya push notifications integration chahiye?"; }
              } else if (isAu) {
                if (!newScopingData.autoWorkflow) { nextScopingStage = "AUTO_WORKFLOW"; botPrompt = language === "en" ? "What is the current manual process or workflow you want to automate?" : "Abhi aap manual workflow kaiser run karte hain?"; }
                else if (!newScopingData.autoTrigger) { nextScopingStage = "AUTO_TRIGGER"; botPrompt = language === "en" ? "What trigger event should start the automation sequence?" : "Automation shuru karne ka trigger event kya hai?"; }
                else if (!newScopingData.autoAction) { nextScopingStage = "AUTO_ACTION"; botPrompt = language === "en" ? "What specific actions should occur once the automation starts?" : "Trigger ke baad automation kya actions run karegi?"; }
                else if (!newScopingData.autoTools) { nextScopingStage = "AUTO_TOOLS"; botPrompt = language === "en" ? "What tools or software systems are you currently using that need to be connected?" : "Konse external tools use hotey hain jo connect karne hain?"; }
                else if (!newScopingData.autoResult) { nextScopingStage = "AUTO_RESULT"; botPrompt = language === "en" ? "What is the desired final result or outcome of this automation flow?" : "Automation flow ka ultimate final result kya hoga?"; }
              }

              setScopingStage(nextScopingStage);

              if (nextScopingStage !== "NONE") {
                nextState = "ASK_REQUIREMENTS";
                botResponseText = botPrompt;
              } else {
                let compiled = "";
                if (isE) compiled = `Ecommerce platform selling: ${newScopingData.ecommProducts}. Payments: ${newScopingData.ecommPayments}. Inventory: ${newScopingData.ecommInventory}. Admin Panel: ${newScopingData.ecommAdmin}.`;
                else if (isS) compiled = `SaaS project for ${newScopingData.saasUsers}. Workflow: ${newScopingData.saasWorkflow}. Authentication: ${newScopingData.saasAuth}. Dashboard: ${newScopingData.saasDashboard}. Billing: ${newScopingData.saasBilling}. Integrations: ${newScopingData.saasIntegrations}.`;
                else if (isB) compiled = `AI Chatbot for ${newScopingData.botPurpose}. Target Users: ${newScopingData.botUsers}. Knowledge base: ${newScopingData.botKnowledge}. Channels: ${newScopingData.botChannels}. Lead Capture: ${newScopingData.botLeadCapture}. Handoff: ${newScopingData.botHandoff}.`;
                else if (isA) compiled = `Mobile app targeting ${newScopingData.appPlatform}. Target user: ${newScopingData.appTargetUser}. Features: ${newScopingData.appFeatures}. Authentication: ${newScopingData.appAuth}. Backend API: ${newScopingData.appBackend}. Notifications: ${newScopingData.appNotifications}.`;
                else if (isAu) compiled = `Automation for ${newScopingData.autoWorkflow}. Trigger: ${newScopingData.autoTrigger}. Action: ${newScopingData.autoAction}. Connected Tools: ${newScopingData.autoTools}. Outcome: ${newScopingData.autoResult}.`;

                updatedIntake.requirements = compiled;
                setIntakeData(updatedIntake);
                
                if (returnToReview) {
                  nextState = "REVIEW";
                  setReturnToReview(false);
                  botResponseText = language === "en" ? "Updated. Review your details below." : "Requirements update ho gaye hain. Review kar lein.";
                } else {
                  nextState = getNextStepState(chatState, updatedIntake);
                  botResponseText = getStepPromptMessage(nextState, language, updatedIntake.service, updatedIntake.projectTypes);
                }
              }
            }
          } else {
            updatedIntake.requirements = userText;
            setIntakeData(updatedIntake);
            if (returnToReview) {
              nextState = "REVIEW";
              setReturnToReview(false);
              botResponseText = language === "en" ? "Updated. Review your details below." : "Requirements update ho gaye hain. Review kar lein.";
            } else {
              nextState = getNextStepState(chatState, updatedIntake);
              botResponseText = getStepPromptMessage(nextState, language, updatedIntake.service, updatedIntake.projectTypes);
            }
          }
          break;

        case "ASK_OPTIONAL_COMPANY":
          const companyVal = userText.toLowerCase() === "skip" ? "Skipped" : userText;
          updatedIntake.company = companyVal;
          setIntakeData(updatedIntake);
          if (returnToReview) {
            nextState = "REVIEW";
            setReturnToReview(false);
            botResponseText = language === "en" ? "Updated. Review your details below." : "Company update ho gaya hai. Review kar lein.";
          } else {
            nextState = getNextStepState(chatState, updatedIntake);
            botResponseText = getStepPromptMessage(nextState, language, updatedIntake.service, updatedIntake.projectTypes);
          }
          break;

        case "ASK_OPTIONAL_PHONE":
          const phoneVal = (userText.toLowerCase() === "skip" || userText.toLowerCase().includes("nahi dena")) ? "Skipped" : userText;
          updatedIntake.phone = phoneVal;
          setIntakeData(updatedIntake);
          if (returnToReview) {
            nextState = "REVIEW";
            setReturnToReview(false);
            botResponseText = language === "en" ? "Updated. Review your details below." : "Phone number update ho gaya hai. Review kar lein.";
          } else {
            nextState = getNextStepState(chatState, updatedIntake);
            botResponseText = getStepPromptMessage(nextState, language, updatedIntake.service, updatedIntake.projectTypes);
          }
          break;

        case "ASK_OPTIONAL_TIMELINE":
          const timelineVal = userText.toLowerCase() === "skip" ? "Not Specified" : userText;
          updatedIntake.timeline = timelineVal;
          setIntakeData(updatedIntake);
          if (returnToReview) {
            nextState = "REVIEW";
            setReturnToReview(false);
            botResponseText = language === "en" ? "Updated. Review your details below." : "Timeline update ho gaya hai. Review kar lein.";
          } else {
            nextState = getNextStepState(chatState, updatedIntake);
            botResponseText = getStepPromptMessage(nextState, language, updatedIntake.service, updatedIntake.projectTypes);
          }
          break;

        case "ASK_OPTIONAL_BUDGET":
          const budgetVal = (userText.toLowerCase() === "skip" || userText.toLowerCase().includes("decide nahi")) ? "Flexible / Unspecified" : userText;
          updatedIntake.budget = budgetVal;
          setIntakeData(updatedIntake);
          nextState = "REVIEW";
          botResponseText = getStepPromptMessage(nextState, language, updatedIntake.service, updatedIntake.projectTypes);
          break;

        default:
          break;
      }

      setChatState(nextState);
      addBotMessage(botResponseText);
      } catch (err) {
        console.error("Error in handleSend timeout callback:", err);
        addBotMessage(detectedLang === "en"
          ? "Something went wrong. Let's continue. What are you looking to build?"
          : "Kuch error hua hai. Chaliye continue karte hain. Aap kya banana chahte hain?");
      } finally {
        setIsTyping(false);
      }
    }, 600);
  };

  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  const handleSelectOption = (val: string) => {
    handleSend(val);
  };

  const handleSkipField = () => {
    handleSend("Skip");
  };

  const handleEditField = (field: keyof IntakeData, stateName: ChatState) => {
    setReturnToReview(true);
    setChatState(stateName);
    
    const isScopingLabel = 
      checkIsScopingLabel(intakeData.serviceLabel) || 
      intakeData.projectTypes.some(t => checkIsScopingLabel(t));

    if (stateName === "ASK_REQUIREMENTS" && isScopingLabel) {
      initScoping("", intakeData.serviceLabel || intakeData.projectTypes[0], intakeData, language);
    } else {
      addBotMessage(getStepPromptMessage(stateName, language, intakeData.service, intakeData.projectTypes));
    }
  };

  const resetScoping = () => {
    setScopingStage("NONE");
    setScopingData({
      ecommProducts: "", ecommPayments: "", ecommInventory: "", ecommAdmin: "",
      saasUsers: "", saasWorkflow: "", saasAuth: "", saasDashboard: "", saasBilling: "", saasIntegrations: "",
      botPurpose: "", botUsers: "", botKnowledge: "", botChannels: "", botLeadCapture: "", botHandoff: "",
      appPlatform: "", appTargetUser: "", appFeatures: "", appAuth: "", appBackend: "", appNotifications: "",
      autoWorkflow: "", autoTrigger: "", autoAction: "", autoTools: "", autoResult: "",
      consultGoal: "", consultProblem: "", consultCustomerAction: "",
      offlineBizType: "", offlineProcess: "", offlineDesiredAction: "", offlinePayments: "", offlineDelivery: "", offlineMarketing: "",
      marketType: "", marketProductOrService: "", marketMultiVendor: "", marketVendorOnboarding: "", marketCommission: "", marketDashboards: "",
      marketingBusiness: "", marketingIsLive: "", marketingObjective: "", marketingChannels: "", marketingSEO: "",
      
      crmType: "", crmUsers: "", crmFeatures: "", crmPipeline: "", crmIntegrations: "", crmAutomation: "", crmDashboards: "",
      waSetup: "", waVolume: "", waFeatures: "", waReplies: "", waFollowups: "", waTeam: "", waCrm: "",
      emailPlatform: "", emailTypes: "", emailClassify: "", emailReplies: "", emailFollowups: "", emailApproval: "",
      callPurpose: "", callDirection: "", callFeatures: "", callLanguages: "", callCrm: "", callHandoff: "", callLogging: "",
      aiSubtype: ""
    });
  };

  const resetChatbotToIdle = () => {
    setChatState("IDLE");
    setScopingStage("NONE");
    resetScoping();
    setIntakeData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      serviceLabel: "",
      requirements: "",
      timeline: "",
      budget: "",
      projectTypes: []
    });
    setActiveIntents([]);
    setCurrentIntentIndex(0);
    setReturnToReview(false);
    setCurrentQuickActions(INITIAL_QUICK_ACTIONS);
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Hi, I'm the KVYASH Assistant. I can help you plan, build, launch, automate, or grow your digital business. What are you looking to achieve?",
        timestamp: new Date(),
      }
    ]);
  };

  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      const wasSuccess = chatState === "SUCCESS";
      const isClosed = !isOpen;

      if (pathname === "/contact" || wasSuccess || isClosed) {
        setTimeout(() => {
          resetChatbotToIdle();
          if (pathname === "/contact") {
            setIsOpen(false);
          }
        }, 0);
      }
      prevPathnameRef.current = pathname;
    }
  }, [pathname, isOpen, chatState]);



  const handleCancelEnquiry = () => {
    setChatState("CANCELLED");
    resetScoping();
    setIntakeData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      serviceLabel: "",
      requirements: "",
      timeline: "",
      budget: "",
      projectTypes: []
    });
    setReturnToReview(false);
    addBotMessage(language === "en"
      ? "Enquiry cancelled. I am back in FAQ mode. What would you like to know?"
      : "Enquiry cancel ho gayi hai. Main back FAQ mode me hoon. Aap kya janna chahte hain?");
    
    setTimeout(() => {
      setChatState("IDLE");
    }, 500);
  };

  const handleConfirmSubmit = async () => {
    if (isSubmittingRef.current || chatState === "SUBMITTING") return;
    isSubmittingRef.current = true;
    setChatState("SUBMITTING");
    setIsTyping(true);

    try {
      const targetPhone = (intakeData.phone && intakeData.phone !== "Skipped")
        ? intakeData.phone
        : "";

      const score = getLeadScore(intakeData);
      console.log(`[Lead Qualification Score]: ${score}`);

      const payload = {
        name: intakeData.name,
        email: intakeData.email,
        phone: targetPhone,
        company: (intakeData.company && intakeData.company !== "Skipped") ? intakeData.company : "N/A",
        service: intakeData.service || "custom-software",
        message: `Project Types: ${intakeData.projectTypes.join(", ") || intakeData.serviceLabel}\nRequirements: ${intakeData.requirements}\nTimeline: ${intakeData.timeline || "Not Specified"}\nBudget: ${intakeData.budget || "N/A"}\n\nSubmitted via KVYASH Chatbot Scoping Consultant.`,
        website: "" // Honeypot
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      setIsTyping(false);

      if (response.ok && data.success) {
        setChatState("SUCCESS");
        setIsLocalMode(false);
        addBotMessage(language === "en"
          ? `Thanks, ${intakeData.name}. Your project enquiry has been sent to the KVYASH Technologies team.\n\nWe'll review the details and get back to you.`
          : language === "hi"
          ? `धन्यवाद, ${intakeData.name}। आपकी प्रोजेक्ट इन्क्वायरी KVYASH Technologies टीम को भेज दी गई है।\n\nहम डिटेल्स का रिव्यू करके जल्द ही आपसे संपर्क करेंगे।`
          : `Dhanyawad, ${intakeData.name}. Aapka project enquiry KVYASH Technologies team ko bhej diya gaya hai.\n\nHum details review karke jald hi aapse contact karenge.`);
      } else if (response.status === 501) {
        setChatState("SUCCESS");
        setIsLocalMode(true);
        addBotMessage(language === "en"
          ? `Your enquiry has been prepared successfully, but live email delivery is not configured yet.`
          : language === "hi"
          ? `आपकी इन्क्वायरी सफलतापूर्वक तैयार कर ली गई है, लेकिन लाइव ईमेल डिलीवरी अभी कॉन्फ़िगर नहीं की गई है।`
          : `Aapki enquiry successfully prepare ho gayi hai par live email delivery configure nahi hai.`);
      } else {
        isSubmittingRef.current = false;
        setChatState("REVIEW");
        addBotMessage(data.message || "Unable to send your scoping enquiry right now. Please verify details and try again.");
      }
    } catch {
      isSubmittingRef.current = false;
      setIsTyping(false);
      setChatState("REVIEW");
      addBotMessage("Something went wrong while sending your enquiry. Your details are still here. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 font-sans flex flex-col items-end gap-3 pointer-events-none">
      {/* Chat Panel Box */}
      <div
        className={`flex flex-col bg-white border border-slate-200 shadow-2xl rounded-2xl w-[calc(100vw-32px)] sm:w-[380px] h-[500px] max-h-[80vh] overflow-hidden transform transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-navy-900 text-white px-5 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-brand-500">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">KVYASH Assistant</h3>
              <span className="text-xs text-brand-100 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Consultant Mode
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              if (chatState === "SUCCESS") {
                resetChatbotToIdle();
              }
            }}
            className="text-slate-300 hover:text-white transition-premium p-1 rounded-md hover:bg-white/10"
            aria-label="Minimize chat panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Progress Indicator */}
        {(chatState as string) !== "IDLE" && (chatState as string) !== "SUCCESS" && (chatState as string) !== "SUBMITTING" && (
          <div className="bg-brand-50 border-b border-brand-100 text-brand-600 text-[10px] px-4 py-1.5 font-bold uppercase tracking-wider flex justify-between shrink-0">
            <span>Project Scoping Flow</span>
            <span>Step {getStepNumber(chatState)} of 8</span>
          </div>
        )}

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-brand-500 text-white rounded-tr-none"
                    : "bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Inline Summary Card */}
          {(chatState as string) === "REVIEW" && (
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3 animate-premium text-xs text-slate-700">
              <h4 className="font-bold text-navy-900 border-b border-slate-100 pb-1.5 text-sm uppercase tracking-wider">
                PROJECT ENQUIRY SUMMARY
              </h4>
              <div className="space-y-1.5">
                <div className="flex justify-between gap-2">
                  <span className="font-semibold text-slate-400">Name:</span>
                  <span className="text-navy-900 text-right">{intakeData.name}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="font-semibold text-slate-400">Email:</span>
                  <span className="text-navy-900 text-right break-all">{intakeData.email}</span>
                </div>
                {intakeData.phone && intakeData.phone !== "Skipped" && (
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold text-slate-400">Phone:</span>
                    <span className="text-navy-900 text-right">{intakeData.phone}</span>
                  </div>
                )}
                {intakeData.company && intakeData.company !== "Skipped" && (
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold text-slate-400">Company:</span>
                    <span className="text-navy-900 text-right">{intakeData.company}</span>
                  </div>
                )}
                <div className="flex justify-between gap-2">
                  <span className="font-semibold text-slate-400">Project Type:</span>
                  <span className="text-navy-900 text-right font-bold text-brand-500">{intakeData.serviceLabel}</span>
                </div>

                {/* Structured Scoping Metadata Rows */}
                {scopingData.consultGoal && (
                  <>
                    <div className="flex justify-between gap-2 border-t border-slate-50 pt-1">
                      <span className="font-semibold text-slate-400">Goal:</span>
                      <span className="text-navy-900 text-right">{scopingData.consultGoal}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Challenge:</span>
                      <span className="text-navy-900 text-right">{scopingData.consultProblem}</span>
                    </div>
                  </>
                )}
                {scopingData.offlineBizType && (
                  <>
                    <div className="flex justify-between gap-2 border-t border-slate-50 pt-1">
                      <span className="font-semibold text-slate-400">Offline Business:</span>
                      <span className="text-navy-900 text-right">{scopingData.offlineBizType}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Online Action:</span>
                      <span className="text-navy-900 text-right">{scopingData.offlineDesiredAction}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Online Payments:</span>
                      <span className="text-navy-900 text-right">{scopingData.offlinePayments}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Marketing Support:</span>
                      <span className="text-navy-900 text-right">{scopingData.offlineMarketing}</span>
                    </div>
                  </>
                )}
                {scopingData.marketType && (
                  <>
                    <div className="flex justify-between gap-2 border-t border-slate-50 pt-1">
                      <span className="font-semibold text-slate-400">Target Marketplace:</span>
                      <span className="text-navy-900 text-right">{scopingData.marketType}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Model Type:</span>
                      <span className="text-navy-900 text-right">{scopingData.marketProductOrService}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Vendor Onboarding:</span>
                      <span className="text-navy-900 text-right">{scopingData.marketVendorOnboarding}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Portals Needed:</span>
                      <span className="text-navy-900 text-right">{scopingData.marketDashboards === "Yes" ? "Vendor & Customer Dashboards" : "Basic/Standard"}</span>
                    </div>
                  </>
                )}
                {scopingData.marketingBusiness && (
                  <>
                    <div className="flex justify-between gap-2 border-t border-slate-50 pt-1">
                      <span className="font-semibold text-slate-400">Promoting:</span>
                      <span className="text-navy-900 text-right">{scopingData.marketingBusiness}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Platform Live:</span>
                      <span className="text-navy-900 text-right">{scopingData.marketingIsLive}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Primary Goal:</span>
                      <span className="text-navy-900 text-right">{scopingData.marketingObjective}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">SEO Audit:</span>
                      <span className="text-navy-900 text-right">{scopingData.marketingSEO}</span>
                    </div>
                  </>
                )}
                {scopingData.ecommProducts && (
                  <>
                    <div className="flex justify-between gap-2 border-t border-slate-50 pt-1">
                      <span className="font-semibold text-slate-400">Selling Products:</span>
                      <span className="text-navy-900 text-right">{scopingData.ecommProducts}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Payments Gate:</span>
                      <span className="text-navy-900 text-right">{scopingData.ecommPayments}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Inventory Sync:</span>
                      <span className="text-navy-900 text-right">{scopingData.ecommInventory}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Admin Control:</span>
                      <span className="text-navy-900 text-right">{scopingData.ecommAdmin}</span>
                    </div>
                  </>
                )}
                {scopingData.crmType && (
                  <>
                    <div className="flex justify-between gap-2 border-t border-slate-50 pt-1">
                      <span className="font-semibold text-slate-400">CRM Setup:</span>
                      <span className="text-navy-900 text-right">{scopingData.crmType}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">CRM Users:</span>
                      <span className="text-navy-900 text-right">{scopingData.crmUsers}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">WhatsApp/Email:</span>
                      <span className="text-navy-900 text-right">{scopingData.crmIntegrations}</span>
                    </div>
                  </>
                )}
                {scopingData.waSetup && (
                  <>
                    <div className="flex justify-between gap-2 border-t border-slate-50 pt-1">
                      <span className="font-semibold text-slate-400">WhatsApp CRM:</span>
                      <span className="text-navy-900 text-right">{scopingData.waSetup} (Vol: {scopingData.waVolume})</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Replies & Followups:</span>
                      <span className="text-navy-900 text-right">Replies: {scopingData.waReplies} / Followups: {scopingData.waFollowups}</span>
                    </div>
                  </>
                )}
                {scopingData.emailPlatform && (
                  <>
                    <div className="flex justify-between gap-2 border-t border-slate-50 pt-1">
                      <span className="font-semibold text-slate-400">Email Platform:</span>
                      <span className="text-navy-900 text-right">{scopingData.emailPlatform}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">AI Classification:</span>
                      <span className="text-navy-900 text-right">{scopingData.emailClassify}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Human Approval:</span>
                      <span className="text-navy-900 text-right">{scopingData.emailApproval}</span>
                    </div>
                  </>
                )}
                {scopingData.callPurpose && (
                  <>
                    <div className="flex justify-between gap-2 border-t border-slate-50 pt-1">
                      <span className="font-semibold text-slate-400">Calling Agent:</span>
                      <span className="text-navy-900 text-right">{scopingData.callPurpose} ({scopingData.callDirection})</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">Voice Languages:</span>
                      <span className="text-navy-900 text-right">{scopingData.callLanguages}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="font-semibold text-slate-400">CRM Sync & Handoff:</span>
                      <span className="text-navy-900 text-right">CRM: {scopingData.callCrm} / Handoff: {scopingData.callHandoff}</span>
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-0.5 pt-1 border-t border-slate-100">
                  <span className="font-semibold text-slate-400">Compiled Blueprint Description:</span>
                  <span className="text-navy-900 leading-relaxed bg-slate-50 border border-slate-100 rounded p-1.5 mt-1 block whitespace-pre-line font-mono text-[10px]">
                    {intakeData.requirements}
                  </span>
                </div>
                {intakeData.timeline && intakeData.timeline !== "Not Specified" && (
                  <div className="flex justify-between gap-2 pt-1 border-t border-slate-50">
                    <span className="font-semibold text-slate-400">Timeline:</span>
                    <span className="text-navy-900 text-right">{intakeData.timeline}</span>
                  </div>
                )}
                {intakeData.budget && intakeData.budget !== "Flexible / Unspecified" && (
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold text-slate-400">Budget:</span>
                    <span className="text-navy-900 text-right">{intakeData.budget}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Typings Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" />
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Dynamic Controls / Choice Selectors Block */}
        <div className="p-3 bg-white border-t border-slate-100 flex flex-col gap-2 shrink-0">
          
          {/* Idle state shortcuts */}
          {(chatState as string) === "IDLE" && !isTyping && (
            <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto">
              {currentQuickActions.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => handleSend(prompt.text, prompt.type)}
                  className="text-[10px] sm:text-xs text-brand-500 bg-brand-50 hover:bg-brand-100 border border-brand-100 rounded-full px-2.5 py-1 text-left transition-premium cursor-pointer shrink-0 animate-premium font-semibold"
                >
                  {prompt.text}
                </button>
              ))}
            </div>
          )}

          {/* Skip buttons for optional fields */}
          {((chatState as string) === "ASK_OPTIONAL_PHONE" || (chatState as string) === "ASK_OPTIONAL_COMPANY") && (
            <button
              onClick={handleSkipField}
              className="w-full text-center py-2 border border-dashed border-slate-200 rounded text-slate-500 hover:bg-slate-50 text-xs font-semibold transition-premium cursor-pointer"
            >
              {language === "en" ? "Skip optional step" : "Optional step skip karein"}
            </button>
          )}

          {/* Project Type selector pills */}
          {((chatState as string) === "ASK_PROJECT_TYPE" || ((chatState as string) === "ASK_PROJECT_TYPE" && returnToReview)) && (
            <div className="grid grid-cols-3 gap-1 max-h-[140px] overflow-y-auto">
              {Object.keys(SERVICE_SLUG_MAP).map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className="text-center py-1.5 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-[10px] sm:text-xs font-medium transition-premium cursor-pointer truncate px-1"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Scoping binary questions (Yes/No) quick replies */}
          {((chatState as string) === "SCOPING_PROJECT" || (chatState as string) === "ASK_REQUIREMENTS") &&
            (scopingStage === "ECOMM_PAYMENTS" || scopingStage === "ECOMM_INVENTORY" || scopingStage === "ECOMM_ADMIN" ||
             scopingStage === "SAAS_AUTH" || scopingStage === "SAAS_DASHBOARD" || scopingStage === "SAAS_BILLING" || scopingStage === "SAAS_INTEGRATIONS" ||
             scopingStage === "BOT_LEAD_CAPTURE" || scopingStage === "BOT_HANDOFF" ||
             scopingStage === "APP_AUTH" || scopingStage === "APP_BACKEND" || scopingStage === "APP_NOTIFICATIONS" ||
             scopingStage === "OFFLINE_PAYMENTS" || scopingStage === "OFFLINE_MARKETING" ||
             scopingStage === "MARKET_DASHBOARDS" ||
             scopingStage === "MARKETING_LIVE" || scopingStage === "MARKETING_SEO" ||
             scopingStage === "CRM_DASHBOARDS" ||
             scopingStage === "WA_REPLIES" || scopingStage === "WA_FOLLOWUPS" ||
             scopingStage === "EMAIL_REPLIES" || scopingStage === "EMAIL_FOLLOWUPS" || scopingStage === "EMAIL_APPROVAL" ||
             scopingStage === "CALL_HANDOFF" || scopingStage === "CALL_LOGGING") && (
              <div className="flex gap-2 animate-premium">
                <button
                  type="button"
                  onClick={() => handleSelectOption("Yes")}
                  className="flex-1 text-center py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded transition-premium cursor-pointer shadow-sm"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectOption("No")}
                  className="flex-1 text-center py-2 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-xs font-bold transition-premium cursor-pointer shadow-sm"
                >
                  No
                </button>
              </div>
            )}

          {/* AI Scoping Subtype selectors */}
          {scopingStage === "AI_SELECT_SUBTYPE" && (
            <div className="grid grid-cols-2 gap-1.5 max-h-[140px] overflow-y-auto animate-premium">
              {[
                { label: "AI Chatbot", value: "AI Chatbot" },
                { label: "CRM", value: "CRM" },
                { label: "WhatsApp CRM", value: "WhatsApp CRM" },
                { label: "Email Automation", value: "Email Automation" },
                { label: "AI Calling Agent", value: "AI Calling Agent" },
                { label: "Lead Management", value: "Lead Management" },
                { label: "Customer Support", value: "Customer Support" },
                { label: "Business Workflow", value: "Business Workflow" },
                { label: "Custom AI Agent", value: "Custom AI Agent" },
                { label: "Not sure — Help me decide", value: "Not sure" }
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelectOption(opt.value)}
                  className="text-center py-1.5 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-[10px] sm:text-xs font-semibold transition-premium cursor-pointer truncate px-1"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Timeline selector pills */}
          {(chatState as string) === "ASK_OPTIONAL_TIMELINE" && (
            <div className="grid grid-cols-3 gap-1">
              {["ASAP", "1-4 weeks", "1-3 months", "3+ months", "Not sure"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className="text-center py-1.5 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-[10px] sm:text-xs font-medium transition-premium cursor-pointer"
                >
                  {opt}
                </button>
              ))}
              <button
                onClick={handleSkipField}
                className="text-center py-1.5 border border-dashed border-slate-200 rounded text-slate-500 hover:bg-slate-50 text-[10px] sm:text-xs font-medium transition-premium cursor-pointer"
              >
                Skip
              </button>
            </div>
          )}

          {/* Budget selector pills */}
          {(chatState as string) === "ASK_OPTIONAL_BUDGET" && (
            <div className="grid grid-cols-3 gap-1">
              {["Under ₹50K", "₹50K-₹1L", "₹1L-₹3L", "₹3L+", "Not sure"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className="text-center py-1.5 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-[10px] sm:text-xs font-medium transition-premium cursor-pointer"
                >
                  {opt}
                </button>
              ))}
              <button
                onClick={() => handleSelectOption("Skip")}
                className="text-center py-1.5 border border-dashed border-slate-200 rounded text-slate-500 hover:bg-slate-50 text-[10px] sm:text-xs font-medium transition-premium cursor-pointer"
              >
                Skip
              </button>
            </div>
          )}

          {/* Review actions confirm/edit/cancel panel */}
          {((chatState as string) === "REVIEW" || (chatState as string) === "SUBMITTING") && (
            <div className="flex flex-col gap-2 animate-premium">
              <span className="text-[10px] text-slate-500 font-medium text-center mb-1 leading-normal">
                Please review your information before submitting. Your information is used to review and respond to your enquiry.
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={handleConfirmSubmit}
                  disabled={(chatState as string) === "SUBMITTING" || isTyping}
                  className="flex-[2] inline-flex items-center justify-center text-center py-2 bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-xs font-bold rounded transition-premium cursor-pointer"
                >
                  {(chatState as string) === "SUBMITTING"
                    ? (language === "en" ? "Submitting..." : "Submit ho raha hai...")
                    : (language === "en" ? "Submit Enquiry" : "Enquiry Submit Karein")}
                  {(chatState as string) !== "SUBMITTING" && <ArrowRight className="ml-1.5 h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => setChatState("PROJECT_EDIT")}
                  disabled={(chatState as string) === "SUBMITTING" || isTyping}
                  className="flex-1 text-center py-2 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-xs font-bold transition-premium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === "en" ? "Edit" : "Edit"}
                </button>
                <button
                  onClick={handleCancelEnquiry}
                  disabled={(chatState as string) === "SUBMITTING" || isTyping}
                  className="flex-1 text-center py-2 border border-slate-200 rounded text-red-500 hover:bg-red-50 text-xs font-bold transition-premium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === "en" ? "Cancel" : "Cancel"}
                </button>
              </div>
            </div>
          )}

          {/* Edit sub-selector drawer */}
          {(chatState as string) === "PROJECT_EDIT" && (
            <div className="flex flex-col gap-1.5 animate-premium">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Field to Edit</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleEditField("name", "ASK_CONTACT_NAME")}
                  className="text-center py-1.5 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-xs font-medium transition-premium cursor-pointer"
                >
                  Edit Name
                </button>
                <button
                  onClick={() => handleEditField("email", "ASK_CONTACT_EMAIL")}
                  className="text-center py-1.5 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-xs font-medium transition-premium cursor-pointer"
                >
                  Edit Email
                </button>
                <button
                  onClick={() => handleEditField("serviceLabel", "ASK_PROJECT_TYPE")}
                  className="text-center py-1.5 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-xs font-medium transition-premium cursor-pointer"
                >
                  Edit Project Type
                </button>
                <button
                  onClick={() => handleEditField("requirements", "ASK_REQUIREMENTS")}
                  className="text-center py-1.5 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-xs font-medium transition-premium cursor-pointer"
                >
                  Edit Requirements
                </button>
              </div>
              <button
                onClick={() => setChatState("REVIEW")}
                className="w-full text-center py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 text-xs font-bold transition-premium cursor-pointer"
              >
                Back to Summary
              </button>
            </div>
          )}

          {/* Submitting progress */}
          {(chatState as string) === "SUBMITTING" && (
            <div className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
              Sending scoping parameters...
            </div>
          )}

          {/* Success portal links */}
          {(chatState as string) === "SUCCESS" && (
            <div className="flex flex-col gap-2">
              {isLocalMode && (
                <div className="p-2.5 bg-amber-50 border border-amber-100 text-amber-800 text-[10px] rounded-lg flex items-start gap-1.5 leading-normal mb-1">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                  <span>
                    <strong>API Status Warning:</strong> Staging mode was active. Your lead details compiled correctly but Resend credentials must be configured on deployment for inbox dispatch.
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                <a
                  href="/services"
                  className="flex-1 text-center py-2 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-premium cursor-pointer"
                >
                  View Services
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setChatState("IDLE");
                  }}
                  className="flex-1 text-center py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded transition-premium cursor-pointer"
                >
                  Close Assistant
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Form input - locked if selecting pills or reviewing */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="flex items-center gap-2 border-t border-slate-200 p-3 bg-white shrink-0"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={
              isTyping ||
              (chatState as string) === "ASK_PROJECT_TYPE" ||
              (chatState as string) === "ASK_OPTIONAL_TIMELINE" ||
              (chatState as string) === "ASK_OPTIONAL_BUDGET" ||
              (chatState as string) === "REVIEW" ||
              (chatState as string) === "PROJECT_EDIT" ||
              (chatState as string) === "SUBMITTING" ||
              (chatState as string) === "SUCCESS"
            }
            placeholder={
              (chatState as string) === "IDLE"
                ? "Ask about our services..."
                : (chatState as string) === "ASK_PROJECT_TYPE"
                ? (language === "en" ? "Describe what you want to build..." : "Describe karein aap kya banana chahte hain...")
                : (chatState as string) === "SCOPING_PROJECT"
                ? (language === "en" ? "Tell me about your project..." : "Apne project ke baare mein batayein...")
                : (chatState as string) === "ASK_REQUIREMENTS"
                ? (language === "en" ? "Enter project requirements..." : "Project details batayein...")
                : (chatState as string) === "ASK_CONTACT_NAME"
                ? (language === "en" ? "Enter your name" : "Aapka naam kya hai?")
                : (chatState as string) === "ASK_CONTACT_EMAIL"
                ? (language === "en" ? "Enter your email" : "Aapka business email kya hai?")
                : (chatState as string) === "ASK_OPTIONAL_PHONE"
                ? (language === "en" ? "Enter your phone number" : "Aapka phone number kya hai?")
                : (chatState as string) === "ASK_OPTIONAL_COMPANY"
                ? (language === "en" ? "Enter your organization" : "Aapki company ka naam?")
                : "Select an option below..."
            }
            aria-label="Ask chatbot a question"
            className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium disabled:bg-slate-100 disabled:text-slate-400"
          />
          <button
            type="submit"
            disabled={
              isTyping ||
              !inputText.trim() ||
              (chatState as string) === "ASK_PROJECT_TYPE" ||
              (chatState as string) === "ASK_OPTIONAL_TIMELINE" ||
              (chatState as string) === "ASK_OPTIONAL_BUDGET" ||
              (chatState as string) === "REVIEW" ||
              (chatState as string) === "PROJECT_EDIT" ||
              (chatState as string) === "SUBMITTING" ||
              (chatState as string) === "SUCCESS"
            }
            className="flex items-center justify-center h-10 w-10 rounded-lg bg-brand-500 text-white hover:bg-brand-600 disabled:bg-slate-100 disabled:text-slate-400 transition-premium shrink-0 cursor-pointer"
            aria-label="Send query"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          const nextOpen = !isOpen;
          setIsOpen(nextOpen);
          if (!nextOpen && chatState === "SUCCESS") {
            resetChatbotToIdle();
          }
        }}
        className={`flex items-center justify-center h-14 w-14 rounded-full bg-brand-500 text-white hover:bg-brand-600 shadow-lg active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto ${
          isOpen ? "rotate-90 bg-slate-800 hover:bg-slate-900" : ""
        }`}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
}
