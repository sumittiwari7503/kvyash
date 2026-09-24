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
    title: "Static Site Generation with Edge Revalidation",
    category: "Web Infrastructure & Performance",
    status: "Production Architecture",
    summary: "A production-grade Next.js web application architecture leveraging static site exports (SSG) alongside Incremental Static Regeneration (ISR). Caches prerendered HTML on global Edge CDNs for sub-second paint times while keeping dynamic content fresh.",
    architecture: ["Next.js App Router", "TypeScript Strict", "Edge CDN Caching", "ISR Timers"],
    features: ["Sub-second Largest Contentful Paint (LCP)", "Zero origin server strain during traffic spikes", "Automated cache revalidation on data commit"],
    link: "/work#case-studies",
    intent: "BUILD_SOMETHING"
  },
  {
    title: "Multi-Tenant SaaS Database Partitioning",
    category: "SaaS & Cloud Architecture",
    status: "Engineering Prototype",
    summary: "Tenant-aware cloud application architecture designed to keep sensitive customer data logically isolated via PostgreSQL Row-Level Security (RLS) while sharing high-efficiency application compute layers and automated billing.",
    architecture: ["PostgreSQL RLS", "Supabase", "Connection Pooling", "Stripe Billing"],
    features: ["Granular row-level tenant permission matrix", "Automated subscription and seat management", "Isolated database partitions preventing data leakage"],
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
    <section id="work" className="py-24 md:py-32 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200">
          <div className="max-w-2xl flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              Selected Work &amp; Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Production Architectures
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Real software systems, engineering blueprints, and data pipelines designed and deployed by KVYASH Technologies.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-brand-600 px-4 py-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-xs"
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
              className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 lg:p-10 shadow-xs studio-card"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Project Left Context */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.architecture.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono font-medium text-slate-700 bg-white border border-slate-200/80 px-3 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href={project.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-brand-600 transition-colors"
                    >
                      <span>Read Technical Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <StartProjectButton
                      intent={project.intent}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 cursor-pointer"
                    >
                      Scope Similar Build →
                    </StartProjectButton>
                  </div>
                </div>

                {/* Project Right: Key Architectural Highlights */}
                <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    System Highlights
                  </span>
                  <ul className="space-y-3">
                    {project.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0 mt-2" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Clean Handover Standard</span>
                    <span className="text-emerald-600 font-bold">100% Repository Transfer</span>
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
