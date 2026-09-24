import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Cpu, Database, CheckCircle2, ShieldCheck, Terminal } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";
import WorkClient from "@/components/common/WorkClient";

export const metadata = {
  title: {
    absolute: "KVYASH Technologies | Selected Work & Engineering Blueprints",
  },
  description:
    "Explore KVYASH Technologies portfolio and case studies. Inspect production web applications, SaaS architectures, AI workflows, and custom business systems.",
  alternates: {
    canonical: "https://kvyash.com/work",
  },
};

export default function WorkPage() {
  return (
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-white dark:bg-navy-950 transition-colors duration-300">
      {/* 1. Hero Section */}
      <section className="bg-slate-50/70 dark:bg-navy-900/50 border-b border-slate-200/80 dark:border-navy-800 pt-36 pb-20 md:pt-40 md:pb-24 relative overflow-hidden reveal-on-scroll">
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-5 relative z-10">
          <div className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Selected Work & Case Studies
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white">
            What we build & deploy.
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We showcase real software systems, internal engineering builds, validated prototypes, and production architectures. Client systems are published only when permission is cleared.
          </p>
        </div>
      </section>

      {/* 2. Interactive Portfolio & Filters Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-navy-950 border-b border-slate-100 dark:border-navy-800 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkClient />
        </div>
      </section>

      {/* 3. Deep-Dive Case Studies Section */}
      <section id="case-studies" className="py-20 md:py-28 bg-slate-50/50 dark:bg-navy-900/30 border-b border-slate-200/80 dark:border-navy-800 reveal-on-scroll">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Architectural Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Engineering blueprints in action.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Transparent breakdowns of production architectures, state machines, and data pipelines built by KVYASH.
            </p>
          </div>

          {/* Case Study 1 */}
          <article className="bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-navy-800 pb-6">
              <div>
                <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest block mb-2">
                  Web Engineering & Next.js Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 dark:text-white leading-tight">
                  High-Performance Web Architecture with Dynamic Revalidation
                </h3>
              </div>
              <span className="text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 rounded-full self-start uppercase tracking-wider whitespace-nowrap">
                Production Architecture
              </span>
            </div>

            <div className="space-y-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <div>
                <h4 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-500" />
                  Project Overview
                </h4>
                <p>
                  A production-ready Next.js application architecture built to deliver pre-rendered static content while maintaining on-demand dynamic updates. By leveraging static generation and Incremental Static Regeneration (ISR), the architecture minimizes origin compute overhead and ensures rapid global delivery via CDN caching.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-brand-500" />
                  Technical Objective
                </h4>
                <p>
                  Deliver a resilient, search-engine-optimized platform that serves content rapidly to visitors, handles concurrent traffic spikes cleanly, and updates cached assets when CMS or database records change.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-brand-500" />
                  Engineering Solution
                </h4>
                <p>
                  We engineered a lightweight Next.js client layout that integrates pre-compiled server-rendered routes with dynamic revalidation triggers. Discover more in our dedicated <Link href="/web-development" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">web development services</Link> and our guide on <Link href="/resources/custom-web-application-development" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">custom web application development</Link>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800">
                  <h5 className="font-bold text-navy-900 dark:text-white text-xs uppercase tracking-wider mb-2">
                    Core Technologies
                  </h5>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                    <li>• <strong>Next.js & React:</strong> Pre-rendered server components with selective client hydration.</li>
                    <li>• <strong>TypeScript:</strong> End-to-end strict types preventing runtime schema mismatches.</li>
                    <li>• <strong>Tailwind CSS:</strong> Dual-theme tokenized design system with zero layout shift.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800">
                  <h5 className="font-bold text-navy-900 dark:text-white text-xs uppercase tracking-wider mb-2">
                    Key Outcomes
                  </h5>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                    <li>• Immediate SSR paint with zero blank-screen flash.</li>
                    <li>• Full accessibility and prefers-reduced-motion compatibility.</li>
                    <li>• Structured JSON-LD graphs for verified search engine discovery.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                <StartProjectButton 
                  intent="BUILD_SOMETHING"
                  className="inline-flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 gap-1.5 transition-colors cursor-pointer group"
                >
                  <span>Scope a Web Engineering Project</span>
                  <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </StartProjectButton>
              </div>
            </div>
          </article>

          {/* Case Study 2 */}
          <article className="bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-navy-800 pb-6">
              <div>
                <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest block mb-2">
                  AI & Automation • Data Pipelines
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 dark:text-white leading-tight">
                  Intelligent Document Ingestion & Schema Transformation Pipeline
                </h3>
              </div>
              <span className="text-[11px] font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-400 border border-brand-200 dark:border-brand-800/60 px-3 py-1 rounded-full self-start uppercase tracking-wider whitespace-nowrap">
                Production Prototype
              </span>
            </div>

            <div className="space-y-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <div>
                <h4 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-500" />
                  Project Overview
                </h4>
                <p>
                  An enterprise document ingestion pipeline engineered to parse unstructured PDF files, invoices, and contracts. It integrates OCR text parsing with token schema mapping to transform raw text into strictly validated JSON schemas synchronized with PostgreSQL databases.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-500" />
                  Security & Isolation
                </h4>
                <p>
                  Data isolation is maintained via proxy middleware. Documents are stripped of extraneous metadata, processed in temporary execution memory, and never cached on third-party model stores.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-brand-500" />
                  Workflow Integration
                </h4>
                <p>
                  Follows our 3-stage pipeline: Secure Ingestion → Token Schema Classification → Relational Database Sync. Read more about our approach in <Link href="/ai-automation" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">AI & Automation</Link> or our guide on <Link href="/resources/ai-automation-for-businesses" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">AI Automation for Businesses</Link>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800">
                  <h5 className="font-bold text-navy-900 dark:text-white text-xs uppercase tracking-wider mb-2">
                    Core Technologies
                  </h5>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                    <li>• <strong>OCR & Token Parsing:</strong> Extracts layout and key-value fields reliably.</li>
                    <li>• <strong>Webhook Ingestion:</strong> Authenticated endpoints for external workflow triggers.</li>
                    <li>• <strong>PostgreSQL Storage:</strong> Typed relational tables with audit history logs.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200/60 dark:border-navy-800">
                  <h5 className="font-bold text-navy-900 dark:text-white text-xs uppercase tracking-wider mb-2">
                    Operational Impact
                  </h5>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                    <li>• Eliminates repetitive manual data entry routines.</li>
                    <li>• Flags low-confidence extractions for human verification.</li>
                    <li>• Structured exports ready for ERP and CRM ingestion.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                <StartProjectButton 
                  intent="AI_AUTOMATION"
                  className="inline-flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 gap-1.5 transition-colors cursor-pointer group"
                >
                  <span>Build an Automation Pipeline</span>
                  <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </StartProjectButton>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 4. AI & Automation Capabilities Grid */}
      <section className="py-20 md:py-28 bg-white dark:bg-navy-950 border-b border-slate-100 dark:border-navy-800 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 flex flex-col gap-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                AI & Systems Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
                AI systems built around operational reality.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                We build AI-driven tooling directly into core business operations — customer communication, CRM synchronization, lead routing, and document parsing.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <StartProjectButton
                intent="AI_AUTOMATION"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-600 hover:bg-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400 text-white text-xs font-bold rounded-lg transition-all shadow-sm text-center"
              >
                Explore AI & Automation →
              </StartProjectButton>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              "AI Customer Assistants",
              "CRM Intelligence",
              "WhatsApp Automation",
              "Email Routing Engines",
              "Document Parsing",
              "Business Orchestration",
            ].map((system) => (
              <div
                key={system}
                className="bg-slate-50 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-xl p-5 shadow-sm flex flex-col justify-between items-center transition-all hover:border-brand-500/50"
              >
                <div className="space-y-2">
                  <span className="inline-block text-[9px] font-bold bg-white dark:bg-navy-950 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-200/60 dark:border-navy-800 uppercase">
                    Capability
                  </span>
                  <h4 className="text-navy-900 dark:text-white font-bold text-xs sm:text-sm">{system}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Engineering Standards */}
      <section className="py-20 md:py-28 bg-slate-50/50 dark:bg-navy-900/30 border-b border-slate-200/80 dark:border-navy-800 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Studio Methodology
            </span>
            <h2 className="text-3xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Our engineering standards.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We focus on building resilient software architectures with transparent communication, fixed scopes, and complete code handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider border-b border-slate-100 dark:border-navy-800 pb-3">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                1. Fixed-Scope Blueprints
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Before writing any code, we document all system boundaries, data contracts, and deliverables so development stays predictable.
              </p>
            </div>

            <div className="bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider border-b border-slate-100 dark:border-navy-800 pb-3">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                2. Direct Engineering Access
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                You collaborate directly with the software engineers building your product — eliminating account management layers and communication delays.
              </p>
            </div>

            <div className="bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider border-b border-slate-100 dark:border-navy-800 pb-3">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                3. Full Ownership & Handover
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Source code, database structures, repositories, and deployment configurations are transferred directly to your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Editorial CTA Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-navy-950 reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50/70 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-2xl p-8 sm:p-12 shadow-sm text-center flex flex-col gap-6 items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Have a digital system in mind?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Tell us what you are looking to build, scale, or automate with custom <Link href="/web-development" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">web development</Link>, <Link href="/ai-automation" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">AI workflows</Link>, or <Link href="/solutions" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">bespoke software solutions</Link>.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <StartProjectButton className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-brand-600 hover:bg-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400 text-white font-semibold rounded-lg transition-all shadow-sm text-center">
                Start a Project
              </StartProjectButton>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-950 text-navy-900 dark:text-slate-100 font-semibold hover:bg-slate-50 dark:hover:bg-navy-900 transition-all text-center"
              >
                Talk to KVYASH
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
