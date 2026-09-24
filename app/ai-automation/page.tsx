import React from "react";
import Link from "next/link";
import { Cpu, Workflow, Database, CheckCircle, ArrowRight, ArrowUpRight } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export const metadata = {
  title: {
    absolute: "AI & Workflow Automation Services | KVYASH Technologies"
  },
  description: "KVYASH Technologies is a premium AI automation and software engineering agency. We build AI assistants, WhatsApp CRM integrations, automated email pipelines, and intelligent business workflows.",
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

export default function AiAutomationPage() {
  return (
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
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
      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden reveal-on-scroll">
        <div className="absolute inset-0 bg-studio-dots opacity-60 dark:opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
          <span className="inline-flex self-center items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border border-slate-200/80 dark:border-slate-800 uppercase tracking-wide shadow-2xs">
            Pragmatic Engineering • Intelligent Systems
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white leading-[1.1]">
            Pragmatic artificial intelligence integrated into business operations.
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            We bypass industry hype to implement stable, automated data pipelines, custom <Link href="/solutions" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">enterprise API integrations</Link>, and intelligent <Link href="/services" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">workflow automations</Link>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <StartProjectButton
              intent="AI_AUTOMATION"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md cursor-pointer"
            >
              <span>Scope Automation Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </StartProjectButton>
            <Link
              href="/resources/ai-automation-for-businesses"
              className="inline-flex items-center justify-center px-7 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-full border border-slate-300 dark:border-slate-700 transition-all shadow-2xs text-center"
            >
              Read Architecture Guide
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Capabilities</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Pragmatic Automation Verticals
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              We design and execute custom API connectors and data mapping solutions. Learn what processes can be optimized with our guide on <Link href="/resources/ai-automation-for-businesses" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">AI automation for businesses</Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-2xs studio-card flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <div className="inline-flex self-start items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 border border-slate-200/60 dark:border-slate-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 dark:text-white">{svc.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Pipeline Visualization */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-800 uppercase tracking-widest">
                Security &amp; Scaling
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
                Secure Data Isolation Standards
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                We prioritize data privacy. When integrating third-party AI APIs or vector indexing stores, we implement proxy validation middleware to ensure your proprietary business data is never leaked or used to train public models.
              </p>
              
              <ul className="flex flex-col gap-3 mt-2">
                {capabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="h-5 w-5 text-brand-500 shrink-0" aria-hidden="true" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Pipeline Visual Box */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 shadow-studio flex flex-col gap-5">
              <h3 className="text-base font-bold text-navy-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 uppercase tracking-wider font-mono">
                Architecture: Document Ingestion Pipeline
              </h3>
              <div className="flex flex-col gap-3.5 relative font-mono text-xs">
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-navy-900 dark:text-white block mb-1 text-xs">Stage 01 • Trigger</span>
                  User uploads PDF invoice to authenticated portal bucket.
                </div>
                <div className="bg-brand-50/50 dark:bg-slate-950 border border-brand-200/80 dark:border-brand-900/60 rounded-2xl p-4 text-slate-700 dark:text-slate-300 ml-3">
                  <span className="font-bold text-brand-600 dark:text-brand-400 block mb-1 text-xs">Stage 02 • AI Token Mapping</span>
                  LLM API parses schema to extract vendor, line items, totals, and tax dates.
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-navy-900 dark:text-white block mb-1 text-xs">Stage 03 • Action &amp; Database</span>
                  Clean schema commits directly to PostgreSQL, updating CRM analytics.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FAQs Section */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">FAQ</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              AI &amp; Automation FAQs
            </h2>
          </div>
          <div className="space-y-6 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-3xl shadow-2xs">
            {faqs.map((faq, idx) => (
              <div key={idx} className="space-y-2 border-b border-slate-200/80 dark:border-slate-800 last:border-0 pb-6 last:pb-0">
                <h3 className="text-base font-extrabold text-navy-900 dark:text-white flex items-start gap-2">
                  <span className="text-brand-500 font-mono font-bold">Q:</span>
                  {faq.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Let&apos;s automate your manual workloads.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl leading-relaxed">
            Drop us your workflow challenges or API specifications. We will outline a pragmatic automation approach.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <StartProjectButton
              intent="AI_AUTOMATION"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-navy-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4" />
            </StartProjectButton>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
