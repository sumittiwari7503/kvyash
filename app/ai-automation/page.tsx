import React from "react";
import Link from "next/link";
import { Cpu, Workflow, Database, CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
 title: {
 absolute: "KVYASH Technologies | AI Automation Agency Delhi NCR & India"
 },
 description: "KVYASH Technologies is a premium AI automation agency in Delhi NCR and India. We design AI chatbot solutions, WhatsApp CRM integrations, automated email pipelines, and intelligent business workflows.",
 alternates: {
 canonical: "https://kvyash.com/ai-automation",
 },
};

const aiServices = [
 {
 icon: Cpu,
 title: "Large Language Model (LLM) Integration",
 desc: "We connect APIs from OpenAI, Anthropic, or open-source hosting layers directly to your proprietary business workflows. Securely configure custom RAG (Retrieval-Augmented Generation) setups to query internal database records safely."
 },
 {
 icon: Workflow,
 title: "Intelligent Workflow Automation",
 desc: "Deploy automated event listeners that trigger on data changes (e.g., invoice uploads, CRM field modifications) to format data and sync systems dynamically, removing manual copying errors."
 },
 {
 icon: Database,
 title: "Structured Data Extraction",
 desc: "Ingest unstructured PDF documents, emails, or logs. We write custom parsers and utilize LLM token mapping to output clean, schema-compliant JSON data directly into your operations database."
 }
];

const capabilities = [
 "Custom LLM API token optimizations and prompt scoping",
 "Vector database integrations (Pinecone, pgvector)",
 "Honeypot email capture filters & auto-routing workflows",
 "API webhook connectors (Stripe, HubSpot, Salesforce)",
 "Automated error logging and pipeline analytics panels"
];

export default function AiAutomationPage() {
 const faqs = [
 {
 q: "What AI automation services does KVYASH Technologies offer?",
 a: "We develop custom LLM API integrations, Retrieval-Augmented Generation (RAG) vector search applications, intelligent business webhooks, and automated document data extraction pipelines."
 },
 {
 q: "How does KVYASH keep business data secure when integrating AI?",
 a: "We prioritize security by utilizing private hosting layers, proxy authorization filters, and secure database parameters to ensure sensitive company files are never leaked or used to train public LLM models."
 },
 {
 q: "Do you integrate custom CRMs and databases?",
 a: "Yes. We build custom API connectors and webhook listeners connecting databases (such as PostgreSQL) with HubSpot, Stripe, Salesforce, and custom ERP software."
 }
 ];

 return (
 <div className="font-sans text-navy-900 bg-white transition-colors duration-300">
 {/* JSON-LD Schemas */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Service",
 "@id": "https://kvyash.com/ai-automation/#service",
 "name": "AI & Workflow Automation Development Services",
 "provider": {
 "@id": "https://kvyash.com/#organization"
 },
 "areaServed": {
 "@type": "Country",
 "name": "India"
 },
 "description": "Custom Large Language Model (LLM) integrations, RAG applications, vector search configurations, and database automated pipelines."
 },
 {
 "@type": "BreadcrumbList",
 "@id": "https://kvyash.com/ai-automation/#breadcrumb",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "Home",
 "item": "https://kvyash.com"
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "AI & Automation",
 "item": "https://kvyash.com/ai-automation"
 }
 ]
 },
 {
 "@type": "FAQPage",
 "@id": "https://kvyash.com/ai-automation/#faq",
 "mainEntity": faqs.map(faq => ({
 "@type": "Question",
 "name": faq.q,
 "acceptedAnswer": {
 "@type": "Answer",
 "text": faq.a
 }
 }))
 }
 ]
 })
 }}
 />
 
 {/* 1. Header Hero */}
 <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-20 md:pt-40 md:pb-24 relative overflow-hidden reveal-on-scroll">
 <div className="absolute inset-0 opacity-5 .03] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
 <span className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-wide">
 Specialization
 </span>
 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900 ">
 Pragmatic artificial intelligence integrated into business operations.
 </h1>
 <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
 We bypass the industry hype to implement stable, automated data pipelines, custom <Link href="/solutions" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">enterprise API integrations</Link>, and intelligent <Link href="/services" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">scoping systems</Link> (see our previous <Link href="/work" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">production architectures</Link>).
 </p>
 </div>
 </section>

 {/* 2. core capabilities */}
 <section className="py-20 md:py-28 bg-white border-b border-slate-100 reveal-on-scroll">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
 <span className="text-xs font-bold uppercase tracking-widest text-brand-500">How We Solve It</span>
 <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
 Pragmatic Automation Verticals
 </h3>
 <p className="text-slate-655 text-sm">
 We design and execute custom API connectors and data mapping solutions.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {aiServices.map((svc) => {
 const Icon = svc.icon;
 return (
 <div
 key={svc.title}
 className="bg-white border border-slate-100 rounded-xl p-6 shadow-premium hover:shadow-premium-hover transition-premium flex flex-col justify-between"
 >
 <div className="flex flex-col gap-4">
 <div className="inline-flex self-start items-center justify-center p-3 rounded-lg bg-brand-50 text-brand-500 ">
 <Icon className="h-6 w-6" aria-hidden="true" />
 </div>
 <h4 className="text-lg font-bold text-navy-900 ">{svc.title}</h4>
 <p className="text-slate-500 text-xs leading-relaxed">{svc.desc}</p>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </section>

 {/* 3. Deep-Dive Section */}
 <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-100 reveal-on-scroll">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
 
 <div className="lg:col-span-7 flex flex-col gap-6">
 <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-widest">
 Security & Scaling
 </span>
 <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
 Secure Data Isolation Standards
 </h3>
 <p className="text-slate-655 text-base leading-relaxed">
 {"We prioritize data privacy. When integrating third-party AI APIs or vector indexing stores, we implement proxy validation middleware to ensure your proprietary business data is never leaked or used to train public models."}
 </p>
 
 <ul className="flex flex-col gap-3 mt-2">
 {capabilities.map((cap) => (
 <li key={cap} className="flex items-center gap-3 text-sm text-slate-600 ">
 <CheckCircle className="h-5 w-5 text-brand-500 shrink-0" aria-hidden="true" />
 <span>{cap}</span>
 </li>
 ))}
 </ul>
 </div>

 {/* UI Card Graphic representation */}
 <div className="lg:col-span-5 bg-white border border-slate-100 rounded-xl p-8 shadow-premium flex flex-col gap-6">
 <h4 className="text-base font-bold text-navy-900 border-b border-slate-200 pb-3 uppercase tracking-wider">Example: PDF Parser Pipeline</h4>
 <div className="flex flex-col gap-4 relative">
 <div 
   className="bg-slate-50 border border-slate-200 rounded p-4 text-xs text-slate-500 animate-pipeline-pulse"
   style={{ animationDelay: "0s" }}
 >
 <span className="font-semibold text-navy-900 block mb-1">Step 1: Document Ingestion</span>
 User uploads PDF invoice to secure portal bucket.
 </div>
 <div 
   className="bg-slate-50 border border-slate-200 rounded p-4 text-xs text-slate-500 ml-4 border-l-brand-500 border-l-4 animate-pipeline-pulse"
   style={{ animationDelay: "1s" }}
 >
 <span className="font-semibold text-navy-900 block mb-1">Step 2: LLM Token Mapping</span>
 Intelligent API parses formatting schema to find sub-totals, items, and tax dates.
 </div>
 <div 
   className="bg-slate-50 border border-slate-200 rounded p-4 text-xs text-slate-500 animate-pipeline-pulse"
   style={{ animationDelay: "2s" }}
 >
 <span className="font-semibold text-navy-900 block mb-1">Step 3: Database Ingestion</span>
 Clean, structured payload is written to PostgreSQL, updating CRM analytics.
 </div>
 </div>
 </div>

 </div>
 </div>
 </section>

 {/* 4. FAQs Section */}
 <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-100 reveal-on-scroll">
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
 <span className="text-xs font-bold uppercase tracking-widest text-brand-500">FAQ</span>
 <h3 className="text-3xl font-extrabold text-navy-900 tracking-tight">
 AI & Automation FAQs
 </h3>
 </div>
 <div className="space-y-8 bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
 {faqs.map((faq, idx) => (
 <div key={idx} className="space-y-2 border-b border-slate-100 last:border-0 pb-6 last:pb-0">
 <h4 className="text-base font-extrabold text-navy-900 flex items-start gap-2">
 <span className="text-brand-500 font-mono font-bold">Q:</span>
 {faq.q}
 </h4>
 <p className="text-slate-600 text-sm pl-6 leading-relaxed">
 {faq.a}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* 5. CTA */}
 <section className="py-16 md:py-24 bg-white reveal-on-scroll">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
 <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
 {"Let's automate your manual workloads."}
 </h3>
 <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
 Drop us your workflow challenges or API specifications. We will outline a pragmatic automation approach.
 </p>
 <Link
 href="/contact"
 className="inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-brand-500 text-white font-semibold hover:bg-brand-600 active:scale-[0.98] transition-premium shadow-sm cursor-pointer"
 aria-label="Start automation scoping project"
 >
 {"Start Scoping Project"}
 <ArrowRight className="ml-2 h-4 w-4" />
 </Link>
 </div>
 </section>

 </div>
 );
}
