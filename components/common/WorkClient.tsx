"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StartProjectButton from "./StartProjectButton";

interface Project {
  title: string;
  category: string;
  categoryId: string; // 'web-software' | 'ai-automation' | 'saas-marketplace'
  status: string; // 'INTERNAL PROJECT' | 'PROTOTYPE' | 'ACTIVE ARCHITECTURE'
  desc: string;
  stack: string[];
}

const projectsData: Project[] = [
  {
    title: "Static Site Generation + Incremental Revalidation",
    category: "Web & Software",
    categoryId: "web-software",
    status: "ACTIVE ARCHITECTURE",
    desc: "A production-oriented web architecture using static generation and cached revalidation for fast content delivery.",
    stack: ["Next.js 16", "TypeScript", "CDN Caching", "Tailwind CSS"]
  },
  {
    title: "Multi-Tenant SaaS Architecture",
    category: "SaaS & Marketplace",
    categoryId: "saas-marketplace",
    status: "PROTOTYPE",
    desc: "Exploration of tenant-aware application architecture designed to keep business data logically separated while supporting shared application compute.",
    stack: ["Next.js", "TypeScript", "PostgreSQL RLS", "Stripe API"]
  },
  {
    title: "Intelligent PDF Data Ingestion Pipeline",
    category: "AI & Automation",
    categoryId: "ai-automation",
    status: "INTERNAL PROJECT",
    desc: "An automated document-processing workflow that extracts structured information from uploaded documents and syncs directly into relational tables.",
    stack: ["LLM API", "Document Processing", "REST API", "PostgreSQL"]
  }
];

export default function WorkClient() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { label: "All Projects", id: "all" },
    { label: "Web & Software", id: "web-software" },
    { label: "AI & Automation", id: "ai-automation" },
    { label: "SaaS & Marketplace", id: "saas-marketplace" }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projectsData 
    : projectsData.filter(p => p.categoryId === activeFilter);

  return (
    <div className="flex flex-col gap-12">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer ${
              activeFilter === f.id
                ? "bg-navy-900 dark:bg-white text-white dark:text-navy-900 border-navy-900 dark:border-white shadow-2xs font-bold"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-navy-900 dark:hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Featured Work Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-dashed rounded-3xl max-w-md mx-auto w-full">
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">No engineering projects in this category currently.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((bp, idx) => {
            return (
              <div
                key={bp.title}
                className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 lg:p-8 shadow-2xs hover:shadow-studio transition-all duration-300 flex flex-col justify-between group reveal-on-scroll hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 studio-card"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Link 
                      href={bp.categoryId === "ai-automation" ? "/ai-automation" : bp.categoryId === "saas-marketplace" ? "/solutions" : "/services"}
                      className="text-[11px] font-mono font-bold text-brand-600 dark:text-brand-400 hover:underline uppercase tracking-widest"
                    >
                      {bp.category}
                    </Link>
                    <span className={`text-[10px] font-mono font-bold border px-2.5 py-0.5 rounded-full uppercase ${
                      bp.status === "ACTIVE ARCHITECTURE"
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                        : bp.status === "PROTOTYPE"
                        ? "bg-blue-50 dark:bg-blue-950/50 text-brand-700 dark:text-brand-400 border-blue-200 dark:border-blue-800"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}>
                      {bp.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white leading-snug mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {bp.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {bp.desc}
                  </p>
                  
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {bp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-md px-2 py-0.5 font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <StartProjectButton
                    intent="BUILD_SOMETHING"
                    className="inline-flex items-center text-xs font-bold text-navy-900 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer self-start transition-colors duration-200 group/btn"
                  >
                    <span>Scope Architecture</span>
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5 transform transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </StartProjectButton>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
