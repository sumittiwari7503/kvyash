import React from "react";
import Link from "next/link";
import { ArrowRight, Server, ShieldAlert, GitBranch } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export const metadata = {
 title: {
 absolute: "KVYASH Technologies | B2B Technology Consulting & Software Architecture"
 },
 description: "KVYASH Technologies provides custom technology consulting, software architecture, and API systems integration. Optimize and scale your business operations with our engineering services.",
 alternates: {
 canonical: "https://kvyash.com/solutions",
 },
};

const solutionsData = [
 {
 id: "process-automation",
 icon: GitBranch,
 title: "Operations & Workflow Automation",
 problem: "Operational team members lose hours copying text between disconnected platforms (CRMs, legacy spreadsheets, invoice portals).",
 solution: "We engineer central dashboard systems that consolidate distributed APIs into a single user interface, implementing automatic syncing routines.",
 impact: "Reduces data processing cycles, eliminates copy errors, and speeds up report compiling."
 },
 {
 id: "scalability",
 icon: Server,
 title: "High-Throughput Cloud & SaaS Systems",
 problem: "SaaS software products face performance issues and high hosting bills when scaling database reads and tenant profiles.",
 solution: "We build serverless Next.js and Node.js architectures that scale automatically on Edge CDN networks. Database connections are optimized using connection pooling.",
 impact: "Provides sub-second response times, handles sudden traffic spikes, and keeps server costs low."
 },
 {
 id: "data-integration",
 icon: ShieldAlert,
 title: "Legacy System Integrations",
 problem: "Legacy platforms containing valuable records lack modern API access, blocking automation progress.",
 solution: "We write secure custom bridge layers that extract legacy data and expose standard REST or GraphQL endpoints for other software systems.",
 impact: "Extends the lifecycle of core software investments and allows modern workflow automation."
 }
];

export default function SolutionsPage() {
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
 "@id": "https://kvyash.com/solutions/#service",
 "name": "B2B Technology Consulting & Software Architecture Planning",
 "provider": {
 "@id": "https://kvyash.com/#organization"
 },
 "areaServed": {
 "@type": "Country",
 "name": "India"
 },
 "description": "Custom software architecture planning, API systems integration bridge building, database scaling, and technical operations consultancy."
 },
 {
 "@type": "BreadcrumbList",
 "@id": "https://kvyash.com/solutions/#breadcrumb",
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
 "name": "Solutions",
 "item": "https://kvyash.com/solutions"
 }
 ]
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
 Problem Solving
 </span>
 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900 ">
 System solutions configured to solve real business friction.
 </h1>
      <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
        We design and execute custom <Link href="/services" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">system integrations</Link> and <Link href="/ai-automation" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">automated workflows</Link> that address business bottlenecks. Read our blueprint guide on <Link href="/resources/saas-development-india" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">SaaS development in India</Link> or see our previous <Link href="/work" className="font-semibold text-brand-600 hover:text-brand-500 transition-colors">production architectures</Link>.
      </p>
 </div>
 </section>

 {/* 2. Solutions detail */}
 <section className="py-20 md:py-28 bg-white border-b border-slate-100">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
 {solutionsData.map((sol, idx) => {
 const Icon = sol.icon;
 return (
 <div
 key={sol.title}
 id={sol.id}
 className="bg-white border border-slate-100 rounded-xl p-8 shadow-premium hover:border-brand-500/20 hover:shadow-premium-hover transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal-on-scroll hover:-translate-y-1.5 group cursor-pointer"
 style={{ transitionDelay: `${idx * 100}ms` }}
 >
 {/* Column 1: Icon and Title */}
 <div className="lg:col-span-4 flex flex-col gap-4">
 <div className="inline-flex self-start items-center justify-center p-3 rounded-lg bg-brand-50 text-brand-500 border border-brand-100 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white group-hover:scale-105">
 <Icon className="h-6 w-6" aria-hidden="true" />
 </div>
 <h3 className="text-xl font-bold text-navy-900 leading-tight transition-colors duration-300 group-hover:text-brand-650">{sol.title}</h3>
 </div>

 {/* Column 2: Challenge-Solution details */}
 <div className="lg:col-span-5 flex flex-col gap-4 text-sm text-slate-655">
 <div>
 <strong className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Business Bottleneck</strong>
 <p className="leading-relaxed">{sol.problem}</p>
 </div>
 <div>
 <strong className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Our Approach</strong>
 <p className="leading-relaxed">{sol.solution}</p>
 </div>
 </div>

 {/* Column 3: Impact block */}
 <div className="lg:col-span-3 bg-brand-50/50 border border-brand-100/60 rounded-lg p-5 text-xs h-full flex flex-col justify-center transition-all duration-300 group-hover:bg-brand-50 group-hover:border-brand-200">
 <strong className="text-brand-600 font-bold uppercase tracking-wider block mb-1">Capability Outcome</strong>
 <p className="text-slate-700 leading-relaxed">{sol.impact}</p>
 </div>
 </div>
 );
 })}
 </div>
 </section>

 {/* 3. Technology Stack & Systems Integration Matrix */}
 <section className="py-24 bg-slate-50 border-b border-slate-100 reveal-on-scroll">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
 <h2 className="text-xs font-bold uppercase tracking-wider text-brand-500">Our Stack</h2>
 <h3 className="text-3xl font-extrabold text-navy-900 tracking-tight">
 Systems Integration Matrix
 </h3>
 <p className="text-slate-600 text-sm">
 We leverage reliable modern technologies to build stable operational bridges.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
 <h4 className="font-bold text-navy-900 mb-2">Frontend & APIs</h4>
 <p className="text-slate-500 text-xs leading-relaxed">
 Next.js (React 19), TypeScript, Tailwind CSS, GraphQL, and secure RESTful endpoint definitions.
 </p>
 </div>
 <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
 <h4 className="font-bold text-navy-900 mb-2">Database & Cache</h4>
 <p className="text-slate-500 text-xs leading-relaxed">
 PostgreSQL, Prisma ORM, pgvector for semantic stores, Pinecone vector indexes, and Redis key-value caching.
 </p>
 </div>
 <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
 <h4 className="font-bold text-navy-900 mb-2">API Webhooks</h4>
 <p className="text-slate-500 text-xs leading-relaxed">
 Secure integration bridges with Stripe Payment gateways, HubSpot CRM, Salesforce, and custom backend databases.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* 4. Methodology */}
 <section className="py-20 md:py-28 bg-white border-b border-slate-100 reveal-on-scroll">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
 <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Our Diagnostics</span>
 <h3 className="text-3xl font-extrabold text-navy-900 tracking-tight">
 How We Diagnose & Address Bottlenecks
 </h3>
 <p className="text-slate-655 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
 {"We don't start by writing code. We first map out your current operational flows, database relationships, and third-party APIs to identify where data friction occurs. This scoping ensures we build exactly what is required to streamline your processes."}
 </p>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-10">
 <div className="border-l-2 border-brand-500 pl-4">
 <span className="text-xs font-bold text-brand-500 uppercase tracking-wider block mb-1">Phase 1: Architecture Blueprinting</span>
 <p className="text-slate-500 text-xs leading-relaxed">Mapping database structures, systems topology, and API requirements before coding.</p>
 </div>
 <div className="border-l-2 border-brand-500 pl-4">
 <span className="text-xs font-bold text-brand-500 uppercase tracking-wider block mb-1">Phase 2: Secure Middleware Dev</span>
 <p className="text-slate-500 text-xs leading-relaxed">Developing private proxies, sanitizers, and secure request validation layers.</p>
 </div>
 <div className="border-l-2 border-brand-500 pl-4">
 <span className="text-xs font-bold text-brand-500 uppercase tracking-wider block mb-1">Phase 3: Integration Ingestion</span>
 <p className="text-slate-500 text-xs leading-relaxed">Deploying cron sync tasks and REST bridges to PGSQL databases.</p>
 </div>
 </div>
 </div>
 </section>

 {/* 4. CTA */}
 <section className="py-16 md:py-24 bg-white reveal-on-scroll">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
 <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
 {"Let's solve your operational bottlenecks."}
 </h3>
 <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
 Outline your system challenges or API integrations with an engineer to draft a technical blueprint.
 </p>
 <StartProjectButton
 className="inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-brand-500 text-white font-semibold hover:bg-brand-600 active:scale-[0.98] transition-premium shadow-sm cursor-pointer"
 >
 {"Start Scoping Call"}
 <ArrowRight className="ml-2 h-4 w-4" />
 </StartProjectButton>
 </div>
 </section>

 </div>
 );
}
