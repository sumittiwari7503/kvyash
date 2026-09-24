"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

interface StudioProject {
  title: string;
  category: string;
  status: string;
  summary: string;
  architecture: string[];
  features: string[];
  link: string;
  intent: string;
}

const studioProjects: StudioProject[] = [
  {
    title: "Static Site Generation with Incremental Revalidation",
    category: "Web Infrastructure & Performance",
    status: "Production Architecture",
    summary: "A production-grade Next.js web application architecture leveraging static site generation (SSG) alongside Incremental Static Regeneration (ISR). Serves pre-rendered HTML via CDN caching for fast page delivery while keeping dynamic content fresh.",
    architecture: ["Next.js App Router", "TypeScript Strict", "CDN Caching", "ISR Timers"],
    features: ["Optimized Largest Contentful Paint (LCP)", "Reduced origin server strain during traffic spikes", "Automated cache revalidation on data updates"],
    link: "/work#case-studies",
    intent: "BUILD_SOMETHING"
  },
  {
    title: "Multi-Tenant SaaS Database Partitioning",
    category: "SaaS & Cloud Architecture",
    status: "Engineering Prototype",
    summary: "Tenant-aware cloud application architecture designed to keep sensitive customer data logically isolated via PostgreSQL Row-Level Security (RLS) while sharing high-efficiency application compute layers and automated billing.",
    architecture: ["PostgreSQL RLS", "Supabase", "Connection Pooling", "Stripe Billing"],
    features: ["Granular row-level tenant permission matrix", "Automated subscription and seat management", "Isolated database partitions for tenant separation"],
    link: "/solutions",
    intent: "BUILD_SOMETHING"
  },
  {
    title: "Intelligent PDF Data Ingestion Pipeline",
    category: "AI & Data Automation",
    status: "Internal Engineering Project",
    summary: "Automated document processing pipeline converting unstructured PDF files and invoices into schema-compliant JSON records. Integrates OCR, token parsing, and validation rules to sync directly into relational operational databases.",
    architecture: ["LLM API Parsing", "Schema Validation", "PostgreSQL", "Webhook Listeners"],
    features: ["Eliminates manual invoice and document entry", "Deterministic schema output with field validation", "Automated error capture and audit trails"],
    link: "/ai-automation",
    intent: "AI_AUTOMATION"
  }
];

export default function SelectedWork() {
  return (
    <section id="work" className="py-24 md:py-32 bg-slate-100/60 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Selected Work &amp; Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
              Production Architectures
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Real software systems, engineering blueprints, and data pipelines designed and deployed by KVYASH Technologies.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 px-4.5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors shadow-2xs"
            >
              <span>View Case Studies</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Selected Work Showcase Cards */}
        <div className="space-y-8">
          {studioProjects.map((project) => (
            <div
              key={project.title}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 lg:p-10 shadow-xs studio-card"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Project Left Context */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 rounded-full">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.architecture.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 px-3 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={project.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      <span>Read Technical Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <StartProjectButton
                      intent={project.intent}
                      className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 cursor-pointer"
                    >
                      Scope Similar Build →
                    </StartProjectButton>
                  </div>
                </div>

                {/* Project Right: Key Architectural Highlights */}
                <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs flex flex-col gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                    System Highlights
                  </span>
                  <ul className="space-y-3">
                    {project.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0 mt-2" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>Clean Handover Standard</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Full Repository Transfer</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
