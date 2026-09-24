"use client";

import React from "react";
import Link from "next/link";
import { Code, Layers, Server, Lock, Globe, Terminal, Zap, ArrowUpRight } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

interface BuildItem {
  number: string;
  title: string;
  category: string;
  desc: string;
  stack: string;
  intent: string;
  link: string;
  icon: React.ElementType;
}

const buildItems: BuildItem[] = [
  {
    number: "01",
    title: "Custom Web Applications",
    category: "Software Engineering",
    desc: "Bespoke browser platforms handling complex business logic, role-based user permissions, multi-step transaction flows, and dedicated relational database schemas.",
    stack: "Next.js • React • TypeScript • PostgreSQL",
    intent: "BUILD_SOMETHING",
    link: "/web-development",
    icon: Code
  },
  {
    number: "02",
    title: "Multi-Tenant SaaS Platforms",
    category: "Cloud Products",
    desc: "Scalable subscription software engineered with tenant data isolation, automated Stripe/Razorpay recurring billing, team permissions, and user onboarding.",
    stack: "PostgreSQL RLS • Next.js • Stripe • Supabase",
    intent: "BUILD_SOMETHING",
    link: "/solutions",
    icon: Layers
  },
  {
    number: "03",
    title: "Operations & Admin Dashboards",
    category: "Internal Systems",
    desc: "Single-source operational control panels replacing fragile spreadsheets with relational database interfaces, real-time analytics, and status tracking.",
    stack: "React • Server Actions • Database Pooling",
    intent: "BUILD_SOMETHING",
    link: "/web-development",
    icon: Server
  },
  {
    number: "04",
    title: "Customer & Partner Portals",
    category: "Client Software",
    desc: "Authenticated client hubs for automated project intake, secure document exchange, subscription management, and direct communication.",
    stack: "Auth.js • Edge Storage • Secure APIs",
    intent: "BUILD_SOMETHING",
    link: "/services",
    icon: Lock
  },
  {
    number: "05",
    title: "High-Performance Business Websites",
    category: "Digital Platforms",
    desc: "Fast, SEO-first marketing and corporate platforms engineered on Next.js SSG + ISR, Tailwind CSS, and structured schema for optimal Google discovery.",
    stack: "Next.js 16 • Static Site Gen • ISR • Tailwind",
    intent: "BUILD_SOMETHING",
    link: "/web-development",
    icon: Globe
  },
  {
    number: "06",
    title: "API Middleware & Database Systems",
    category: "Backend Architecture",
    desc: "Custom RESTful APIs, webhook listeners, and background workers connecting web platforms with CRMs, payment gateways, WhatsApp, and internal databases.",
    stack: "Node.js • PostgreSQL • Redis • Webhooks",
    intent: "BUILD_SOMETHING",
    link: "/services",
    icon: Terminal
  },
  {
    number: "07",
    title: "AI Workflows & Messaging Automations",
    category: "Automated Pipelines",
    desc: "Cognitive lead routing, automated WhatsApp follow-ups, unstructured PDF document extraction, and intelligent internal business processes.",
    stack: "LLM APIs • WhatsApp Business API • Vector Search",
    intent: "AI_AUTOMATION",
    link: "/ai-automation",
    icon: Zap
  }
];

export default function CapabilitiesSection() {
  return (
    <section id="what-we-build" className="py-24 md:py-32 bg-slate-100/60 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Studio Scope &amp; Deliverables
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
              What We Build
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              We engineer custom software systems and digital platforms tailored directly around your operational logic—delivered with clean architecture and complete code ownership.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 px-4.5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors shadow-2xs"
            >
              <span>Explore All Services</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildItems.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 lg:p-8 flex flex-col justify-between studio-card group ${
                  idx === 6 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                      {item.number}
                    </span>
                    <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-900/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-navy-900 dark:text-slate-100 group-hover:bg-brand-500 group-hover:text-white dark:group-hover:bg-brand-600 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    {item.stack}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <Link
                      href={item.link}
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <span>Read Overview</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                    <StartProjectButton
                      intent={item.intent}
                      className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 cursor-pointer"
                    >
                      Scope Project →
                    </StartProjectButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
