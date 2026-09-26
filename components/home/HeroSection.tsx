import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code, Database, Cpu } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Subtle Studio Background Grid */}
      <div className="absolute inset-0 bg-studio-dots opacity-60 dark:opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-50/60 dark:bg-brand-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 shadow-2xs uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              <span>Independent Digital Product Studio</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white leading-[1.08] font-sans">
              We design &amp; build <br className="hidden sm:inline" />
              <span className="text-navy-900 dark:text-white">software products,</span> <br className="hidden sm:inline" />
              <span className="text-brand-600 dark:text-brand-400">web applications</span> &amp; <br className="hidden sm:inline" />
              intelligent systems.
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed">
              KVYASH is a modern software engineering studio. We partner with founders and ambitious businesses to architect custom <Link href="/web-development" className="font-semibold text-navy-900 dark:text-white underline underline-offset-4 decoration-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">web applications</Link>, scalable <Link href="/solutions" className="font-semibold text-navy-900 dark:text-white underline underline-offset-4 decoration-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">SaaS platforms</Link>, operational dashboards, and pragmatic <Link href="/ai-automation" className="font-semibold text-navy-900 dark:text-white underline underline-offset-4 decoration-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">AI automations</Link>.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <StartProjectButton
                intent="BUILD_SOMETHING"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-navy-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 text-sm font-bold rounded-full transition-all duration-200 shadow-md shadow-navy-900/10 cursor-pointer group text-center"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </StartProjectButton>

              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-all duration-200 text-center"
              >
                <span>View Selected Work</span>
                <ArrowRight className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </Link>
            </div>

            {/* Studio Trust Markers */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> Direct Developer Access
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> Full Repository Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> Modern Next.js + SQL Stack
              </span>
            </div>
          </div>

          {/* Right Column: Layered Editorial Studio Architecture Preview */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-studio relative overflow-hidden flex flex-col gap-5">
              
              {/* Top Studio Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-navy-900 dark:bg-white text-white dark:text-navy-900 flex items-center justify-center text-xs font-bold">
                    K
                  </div>
                  <span className="text-xs font-bold text-navy-900 dark:text-white">KVYASH Architecture Spec</span>
                </div>
                <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-900/60 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Production Blueprint
                </span>
              </div>

              {/* Layered Architectural Showcase */}
              <div className="space-y-3">
                
                {/* Layer 1: Frontend & User Layer */}
                <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-2xs hover:border-brand-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-navy-900 dark:text-white flex items-center gap-2">
                      <Code className="h-4 w-4 text-brand-500" />
                      Client Application Layer
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">React 19 • Next.js App Router</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Accessible, component-driven UI with responsive Tailwind layouts, optimized caching, and fast initial rendering.
                  </p>
                </div>

                {/* Layer 2: API & Relational Database */}
                <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-2xs hover:border-brand-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-navy-900 dark:text-white flex items-center gap-2">
                      <Database className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      Relational Backend &amp; Data Schema
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">PostgreSQL • Supabase</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Custom relational data models, connection pooling, row-level tenant security, and automated database migrations.
                  </p>
                </div>

                {/* Layer 3: Automation & Integrations */}
                <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-2xs hover:border-brand-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-navy-900 dark:text-white flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      AI &amp; System Integration Bridges
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">WhatsApp • REST • Webhooks</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Webhook listeners and AI pipelines connecting customer communication directly into operational CRM tables.
                  </p>
                </div>

              </div>

              {/* Bottom Quick Action Strip */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Have specific technical requirements?</span>
                <StartProjectButton
                  intent="BUILD_SOMETHING"
                  className="font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 cursor-pointer"
                >
                  Scope Architecture →
                </StartProjectButton>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
