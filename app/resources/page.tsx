import React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Code, Cpu, MessageSquare, Layers } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export const metadata = {
  title: {
    absolute: "Technical Guides & Software Architecture Resources | KVYASH Technologies",
  },
  description: "Explore in-depth technical guides, software architecture blueprints, SaaS engineering frameworks, and AI automation tutorials from KVYASH Technologies.",
  alternates: {
    canonical: "https://kvyash.com/resources",
  },
};

const resourceArticles = [
  {
    slug: "custom-web-application-development",
    title: "Custom Web Application Development: Architecture, Stack & Delivery Guide",
    category: "Web Engineering",
    readTime: "8 min read",
    icon: Code,
    desc: "A comprehensive guide on engineering scalable web applications with Next.js, TypeScript, and relational databases. Covers state management, server components, and performance.",
    topics: ["Next.js App Router", "TypeScript", "PostgreSQL", "Caching & CDN"]
  },
  {
    slug: "saas-development-india",
    title: "SaaS Development in India: Building Scalable Multi-Tenant Platforms",
    category: "Cloud Products",
    readTime: "10 min read",
    icon: Layers,
    desc: "Architectural blueprint for building multi-tenant SaaS products in India with automated billing, tenant data isolation, role-based access, and predictable cloud hosting.",
    topics: ["Multi-Tenancy", "PostgreSQL RLS", "Stripe / Razorpay", "Auth.js"]
  },
  {
    slug: "whatsapp-crm-development",
    title: "WhatsApp CRM Engineering: Automated Messaging & Workflow Pipelines",
    category: "System Integration",
    readTime: "7 min read",
    icon: MessageSquare,
    desc: "How to engineer custom WhatsApp CRM bridges connecting the Official WhatsApp Cloud API to relational business databases, lead intake funnels, and automated follow-ups.",
    topics: ["WhatsApp Cloud API", "Webhook Ingestion", "Lead Routing", "CRM Tables"]
  },
  {
    slug: "ai-automation-for-businesses",
    title: "AI Automation for Businesses: Pragmatic Pipelines & Cognitive Workflows",
    category: "AI & Automation",
    readTime: "9 min read",
    icon: Cpu,
    desc: "Step-by-step breakdown of implementing real-world AI pipelines: unstructured document extraction, automated customer assistance, and human-in-the-loop validation.",
    topics: ["LLM Orchestration", "OCR Extraction", "Data Pipelines", "Human-in-the-Loop"]
  }
];

export default function ResourcesIndexPage() {
  return (
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden reveal-on-scroll">
        <div className="absolute inset-0 bg-studio-dots opacity-60 dark:opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
          <span className="inline-flex self-center items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border border-slate-200/80 dark:border-slate-800 uppercase tracking-wide shadow-2xs">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Engineering Knowledge &amp; Blueprints</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white leading-[1.1]">
            Software Architecture &amp; Engineering Guides
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            In-depth engineering documentation, architecture blueprints, and implementation methodologies published by the KVYASH studio team.
          </p>
        </div>
      </section>

      {/* 2. Resources Grid */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceArticles.map((article, idx) => {
              const IconComponent = article.icon;
              return (
                <article
                  key={article.slug}
                  className="bg-slate-50/80 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 shadow-2xs hover:shadow-studio transition-all duration-300 flex flex-col justify-between group studio-card"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700">
                        <IconComponent className="h-3.5 w-3.5" />
                        <span>{article.category}</span>
                      </span>
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium">
                        {article.readTime}
                      </span>
                    </div>

                    <Link href={`/resources/${article.slug}`}>
                      <h2 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {article.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {article.topics.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      href={`/resources/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
                    >
                      <span>Read Technical Guide</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Engineering Rigor Strip */}
      <section className="py-20 md:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                Architectural Consulting
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
                Need guidance on your system architecture?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                We review system constraints, entity maps, and cloud hosting parameters with your development or leadership team.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <StartProjectButton
                intent="CONSULTANCY"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-navy-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 text-xs font-bold rounded-full transition-all shadow-xs cursor-pointer group"
              >
                <span>Request Architecture Review</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </StartProjectButton>
              <Link
                href="/contact"
                className="px-5 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
