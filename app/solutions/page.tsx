import React from "react";
import Link from "next/link";
import { ArrowRight, Server, ShieldAlert, GitBranch } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export const metadata = {
  title: {
    absolute: "Business Solutions & Systems Architecture | KVYASH Technologies"
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
    solution: "We build Next.js and Node.js architectures that scale automatically on Cloud & CDN networks. Database connections are optimized using connection pooling.",
    impact: "Provides rapid response times, handles sudden traffic spikes, and keeps server costs low."
  },
  {
    id: "data-integration",
    icon: ShieldAlert,
    title: "Legacy System Integrations & Bridges",
    problem: "Legacy platforms containing valuable records lack modern API access, blocking automation progress.",
    solution: "We write secure custom bridge layers that extract legacy data and expose standard REST or GraphQL endpoints for modern software systems.",
    impact: "Extends the lifecycle of core software investments and allows modern workflow automation."
  }
];

export default function SolutionsPage() {
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
      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden reveal-on-scroll">
        <div className="absolute inset-0 bg-studio-dots opacity-60 dark:opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
          <span className="inline-flex self-center items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border border-slate-200/80 dark:border-slate-800 uppercase tracking-wide shadow-2xs">
            Problem Solving &bull; Engineering Blueprints
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white leading-[1.1]">
            System solutions configured to solve real business friction.
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            We design and execute custom <Link href="/services" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">system integrations</Link> and <Link href="/ai-automation" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">automated workflows</Link> that eliminate operational bottlenecks. Read our guides on <Link href="/resources/custom-web-application-development" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">custom web application development</Link>, <Link href="/resources/saas-development-india" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">SaaS development in India</Link>, and <Link href="/resources/whatsapp-crm-development" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">WhatsApp CRM development</Link>.
          </p>
        </div>
      </section>

      {/* 2. Solutions Detail (Problem → Solution Storytelling) */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          {solutionsData.map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.title}
                id={sol.id}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 lg:p-10 shadow-2xs hover:border-brand-500/30 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start studio-card reveal-on-scroll"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Column 1: Icon and Title */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="inline-flex self-start items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 border border-slate-200/60 dark:border-slate-700 shadow-2xs">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 dark:text-white leading-snug">{sol.title}</h3>
                </div>

                {/* Column 2: Challenge-Solution details */}
                <div className="lg:col-span-5 flex flex-col gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <div>
                    <strong className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-1 font-mono">Business Bottleneck</strong>
                    <p className="leading-relaxed">{sol.problem}</p>
                  </div>
                  <div>
                    <strong className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-1 font-mono">Our Approach</strong>
                    <p className="leading-relaxed">{sol.solution}</p>
                  </div>
                </div>

                {/* Column 3: Impact block */}
                <div className="lg:col-span-3 bg-white dark:bg-slate-950 border border-brand-100 dark:border-brand-900/60 rounded-2xl p-6 text-xs h-full flex flex-col justify-center">
                  <strong className="text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider block mb-1 font-mono">Capability Outcome</strong>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{sol.impact}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Systems Integration Matrix */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">Architecture Matrix</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Systems Integration Matrix
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              We leverage reliable modern technologies to build stable operational bridges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 shadow-2xs studio-card">
              <h3 className="font-bold text-navy-900 dark:text-white mb-2 text-base">Frontend &amp; APIs</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Next.js (React 19), TypeScript, Tailwind CSS, GraphQL, and secure RESTful endpoint definitions.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 shadow-2xs studio-card">
              <h3 className="font-bold text-navy-900 dark:text-white mb-2 text-base">Database &amp; Storage</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                PostgreSQL, Prisma ORM, pgvector for semantic search stores, Pinecone vector indexes, and Redis key-value caching.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 shadow-2xs studio-card">
              <h3 className="font-bold text-navy-900 dark:text-white mb-2 text-base">API Webhooks &amp; Bridges</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Secure integration bridges with Stripe Payment gateways, HubSpot CRM, Salesforce, WhatsApp Business API, and internal databases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Diagnostics & Scoping Methodology */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Diagnostics</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            How We Diagnose &amp; Address Bottlenecks
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            We don&apos;t start by writing code. We first map out your current operational flows, database relationships, and third-party APIs to identify where data friction occurs. This scoping ensures we build exactly what is required to streamline your processes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-8">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6">
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider block mb-1 font-mono">Phase 1: Architecture Blueprinting</span>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">Mapping database structures, systems topology, and API requirements before coding.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6">
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider block mb-1 font-mono">Phase 2: Secure Middleware Dev</span>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">Developing private proxies, sanitizers, and secure request validation layers.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6">
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider block mb-1 font-mono">Phase 3: Integration &amp; Ingestion</span>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">Deploying background sync tasks and REST bridges to PostgreSQL databases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Let&apos;s solve your operational bottlenecks.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl leading-relaxed">
            Outline your system challenges or API integrations with an engineer to draft a technical blueprint.
          </p>
          <StartProjectButton
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            <span>Start Scoping Call</span>
            <ArrowRight className="h-4 w-4" />
          </StartProjectButton>
        </div>
      </section>

    </div>
  );
}
