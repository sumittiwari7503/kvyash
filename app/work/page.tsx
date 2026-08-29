import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";
import WorkClient from "@/components/common/WorkClient";

export const metadata = {
 title: {
 absolute: "KVYASH Technologies | Our Work"
 },
 description: "Browse KVYASH Technologies portfolio and case studies. See our custom web systems, SaaS platforms, AI integrations, and automation engineering projects.",
 alternates: {
 canonical: "https://kvyash.com/work",
 },
};

export default function WorkPage() {
 return (
 <div className="font-sans text-navy-900 bg-white transition-colors duration-300">
 
 {/* 1. Hero Section */}
 <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-20 md:pt-40 md:pb-24 relative overflow-hidden reveal-on-scroll">
 <div className="absolute inset-0 opacity-5 .03] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-5 relative z-10">
 <span className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-wide">
 SELECTED WORK
 </span>
 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900 ">
 What we&apos;re building.
 </h1>
 <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
 We showcase real products, internal engineering work, prototypes, and technical systems. Client work is published only when it can be shared publicly.
 </p>
 </div>
 </section>

  {/* 2. Interactive Portfolio & Filters Section */}
  <section className="py-20 md:py-28 bg-white border-b border-slate-100 reveal-on-scroll">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <WorkClient />
    </div>
  </section>

  {/* Case Studies Section */}
  <section id="case-studies" className="py-20 md:py-28 bg-white border-b border-slate-100 reveal-on-scroll">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
      
      <div className="text-center max-w-3xl mx-auto mb-4 flex flex-col gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Case Studies</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
          Engineering blueprints in action.
        </h2>
        <p className="text-slate-655 text-sm sm:text-base leading-relaxed">
          Detailed technical reviews of our architectural builds and data integrations.
        </p>
      </div>

      {/* Case Study 1 */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest block mb-1">Web & Software</span>
            <h3 className="text-2xl font-bold text-navy-900 leading-tight">Static Site Generation with Edge Revalidation</h3>
          </div>
          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full self-start uppercase tracking-wider">
            Internal Production Build
          </span>
        </div>

        <div className="space-y-6 text-slate-655 text-sm sm:text-base leading-relaxed">
          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Project Overview</h4>
            <p>
              This is a production-ready Next.js web application architecture designed to export static resources while maintaining dynamic content updates. By utilizing static site generation (SSG) alongside Incremental Static Regeneration (ISR), the platform eliminates origin database compute costs and optimizes pages for sub-second global speeds via content delivery networks (CDNs).
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Project Objective</h4>
            <p>
              To build a high-performance, SEO-optimized business platform that serves content instantly to global visitors, runs completely on edge caches, handles high concurrent traffic spikes without server strain, and automatically revalidates cache layers when page data updates.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Solution</h4>
            <p>
              We engineered a custom Next.js client layout integrating server-side static path exports connected to dynamic caching policies. The system caches HTML pages on Edge CDN node locations and registers revalidation timers, allowing updates to propagate automatically when new data is compiled. To learn how we design web structures, check out KVYASH&apos;s custom <Link href="/services" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">web development services</Link>.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Technology & Architecture</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Next.js & React:</strong> Renders static page structures and executes hydrated micro-interactions in browsers.</li>
              <li><strong>TypeScript:</strong> Standardizes clean data definitions, preventing null reference compile issues.</li>
              <li><strong>Edge Cache:</strong> Caches dynamic HTML payloads at geographical nodes.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Key Features</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Static HTML prerendering for immediate browser paint.</li>
              <li>Edge caching layers returning hits to 99%+ of visitors.</li>
              <li>Fully automated route compilation checks.</li>
              <li>Optimized LCP (Largest Contentful Paint) configurations.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Engineering Approach</h4>
            <p>
              We prioritized simple, robust configurations over unnecessary server hosting layers. The layout hydrater caches static paths and renders HTML immediately, while React hooks initialize dynamic visual staggers asynchronously. This setup eliminates empty whitespace during initial load and respects prefers-reduced-motion settings.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Outcome</h4>
            <p>
              Delivered a highly responsive, compiled Next.js website with zero build warnings, achieving sub-second Largest Contentful Paint times and direct crawlable canonical setups across all core routes.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <StartProjectButton 
              intent="BUILD_SOMETHING"
              className="inline-flex items-center text-xs font-bold text-brand-600 hover:text-brand-500 gap-1.5 transition-colors cursor-pointer group"
            >
              <span>Build a Custom Web System</span>
              <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </StartProjectButton>
          </div>
        </div>
      </div>

      {/* Case Study 2 */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest block mb-1">AI & Automation</span>
            <h3 className="text-2xl font-bold text-navy-900 leading-tight">Intelligent PDF Data Ingestion Pipeline</h3>
          </div>
          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full self-start uppercase tracking-wider">
            Prototype
          </span>
        </div>

        <div className="space-y-6 text-slate-655 text-sm sm:text-base leading-relaxed">
          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Project Overview</h4>
            <p>
              This is a document-processing pipeline designed to automate data capture from unstructured PDF files. The prototype integrates optical character recognition (OCR) and token schema mapping to parse invoices, receipts, or data logs, structure the records, and sync them directly with PostgreSQL relational databases.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Project Objective</h4>
            <p>
              To eliminate manual data entry workloads for operations teams by building a secure, automated document ingestion engine that converts raw files into clean JSON schemas and updates target databases without data leakage.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Solution</h4>
            <p>
              We designed an automated workflow logic matching the KVYASH 3-step pipeline: Document Ingestion, LLM Token Mapping, and Database Ingestion. When a file is loaded, a secure validator intercepts the payload, passes content to token parsers to classify values, and writes the structured records to PostgreSQL tables. For more information on our automation setups, explore KVYASH&apos;s <Link href="/ai-automation" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">AI automation solutions</Link> or get in touch for custom <Link href="/solutions" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">software solutions</Link>.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Technology & Architecture</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>OCR & Token Mapping:</strong> Extracts context and metadata values from unstructured text blocks.</li>
              <li><strong>API Integrations:</strong> Exposes secure endpoint webhooks to ingest documents from remote folders.</li>
              <li><strong>Relational Database:</strong> PostgreSQL database with schema rules mapping columns (sub-totals, names, dates).</li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Key Features</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Automatic schema classification from uploaded PDF attachments.</li>
              <li>Structured output mapping (sub-totals, items, tax fields).</li>
              <li>Secure API endpoints with authorization guards.</li>
              <li>Event triggers alerting operations teams in case of validation warnings.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Engineering Approach</h4>
            <p>
              The system prioritizes logical data isolation by securing the ingestion bridge with proxy validation middleware. This ensures that third-party parsing models cannot store or leak proprietary corporate data. A human-in-the-loop exception dashboard is configured to flag parsing warnings for operator review before database updates are executed.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-navy-900 text-xs sm:text-sm uppercase tracking-wider mb-2">Outcome</h4>
            <p>
              Delivered a prototype pipeline demonstrating automated schema validation, parsing error logging, and direct SQL synchronization for unstructured invoicing assets.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <StartProjectButton 
              intent="AI_AUTOMATION"
              className="inline-flex items-center text-xs font-bold text-brand-600 hover:text-brand-500 gap-1.5 transition-colors cursor-pointer group"
            >
              <span>Build an AI Automation Pipeline</span>
              <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </StartProjectButton>
          </div>
        </div>
      </div>

    </div>
  </section>

 {/* 3. AI & Automation Capabilities Section */}
 <section className="py-20 md:py-28 bg-slate-50 border-b border-slate-100 reveal-on-scroll">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
 <div className="lg:col-span-7 flex flex-col gap-4 text-center lg:text-left">
 <span className="text-xs font-bold uppercase tracking-widest text-brand-500">AI & AUTOMATION</span>
 <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
 AI systems built around real workflows.
 </h2>
 <p className="text-slate-655 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
 We design AI-powered systems around the way a business actually operates — from lead capture and customer communication to CRM updates and workflow automation.
 </p>
 </div>
 
 <div className="lg:col-span-5 flex justify-center lg:justify-end">
 <StartProjectButton
 intent="AI_AUTOMATION"
 className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-500 text-white hover:bg-brand-600 text-xs font-bold rounded transition-premium cursor-pointer shadow-sm text-center"
 >
 Explore AI & Automation →
 </StartProjectButton>
 </div>
 </div>

 {/* Cards Grid */}
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
 {[
 "AI Chatbots",
 "AI CRM",
 "WhatsApp CRM",
 "Email Automation",
 "AI Calling Agents",
 "Business Workflow Automation"
 ].map((system) => (
 <div
 key={system}
 className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between items-center relative"
 >
 <div className="space-y-2">
 <span className="inline-block text-[8px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">
 Capability
 </span>
 <h4 className="text-navy-900 font-extrabold text-xs sm:text-sm">{system}</h4>
 </div>
 </div>
 ))}
 </div>

 </div>
 </section>

 {/* 4. How We Approach Projects */}
 <section className="py-20 md:py-28 bg-white border-b border-slate-100 reveal-on-scroll">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
 <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Methodology</span>
 <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
 Our engineering standards.
 </h2>
 <p className="text-slate-655 text-sm leading-relaxed">
 We focus on building practical software solutions that prioritize direct access, clear scope, and documentation.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 shadow-sm">
 <h4 className="text-base font-bold text-navy-900 mb-3 border-b border-slate-200 pb-2">1. Fixed Scope Blueprints</h4>
 <p className="text-slate-600 text-xs leading-relaxed">
 Before writing any code, we scope all system boundaries, timelines, and integration parameters. This keeps estimation clean and execution predictable.
 </p>
 </div>
 <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 shadow-sm">
 <h4 className="text-base font-bold text-navy-900 mb-3 border-b border-slate-200 pb-2">2. Direct Dev Access</h4>
 <p className="text-slate-600 text-xs leading-relaxed">
 You work directly with the developers building your tools. We eliminate complex account management structures, preventing miscommunications and delivery delays.
 </p>
 </div>
 <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 shadow-sm">
 <h4 className="text-base font-bold text-navy-900 mb-3 border-b border-slate-200 pb-2">3. Transferable Ownership</h4>
 <p className="text-slate-600 text-xs leading-relaxed">
 All source code, database structures, repository access, and deploy credentials are handed over directly to you upon completion. Your code stays completely yours.
 </p>
 </div>
 </div>

 </div>
 </section>

 {/* 5. CTA Section */}
 <section className="py-16 md:py-24 bg-slate-50 reveal-on-scroll">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 shadow-sm text-center flex flex-col gap-6 items-center">
 <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
 Have a system in mind?
 </h2>
 <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
 Tell us what you&apos;re trying to build, improve, <Link href="/ai-automation" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">automate</Link>, or take online with custom <Link href="/services" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">web development</Link> and <Link href="/solutions" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">software solutions</Link>.
 </p>
 
 <div className="flex flex-col sm:flex-row items-center gap-3">
 <StartProjectButton
 className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded transition-premium cursor-pointer shadow-sm text-center"
 >
 Start a Project
 </StartProjectButton>
 <Link
 href="/contact"
 className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded border border-slate-200 bg-white text-navy-900 font-semibold hover:bg-slate-50 transition-premium text-center cursor-pointer"
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
