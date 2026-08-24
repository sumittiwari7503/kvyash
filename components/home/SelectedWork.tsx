"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const selectedProjects = [
    {
      title: "Static Site Generation with Edge Revalidation (ISR)",
      category: "Web Infrastructure",
      desc: "Static caching pipeline for content-focused platforms, eliminating compute costs and optimizing load speeds.",
      link: "/work",
      statusLabel: "Built",
      visual: (
        <div className="w-full h-full flex flex-col justify-between p-3 font-mono text-[8px] text-slate-400">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span>EDGE CACHE LAYER</span>
            <span className="text-emerald-400">ISR active</span>
          </div>
          <div className="space-y-1 mt-2">
            <div className="flex justify-between">
              <span>Origin Fetch</span>
              <span>12ms (revalidated)</span>
            </div>
            <div className="flex justify-between">
              <span>Cache Ratio</span>
              <span className="text-brand-400">99.2% Hit</span>
            </div>
          </div>
          <div className="w-full bg-slate-900 h-1 rounded overflow-hidden">
            <div className="bg-brand-500 h-full w-full" />
          </div>
        </div>
      )
    },
    {
      title: "Multi-Tenant Serverless Database Partitioning",
      category: "SaaS Architecture",
      desc: "SaaS database isolated tenant structure with row-level security parameters and connection pools.",
      link: "/work",
      statusLabel: "Prototype",
      visual: (
        <div className="w-full h-full flex flex-col justify-between p-3 font-mono text-[8px] text-slate-400">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span>DATABASE PARTITION</span>
            <span className="text-brand-400">RLS safe</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            <div className="bg-slate-900/60 border border-slate-800 p-1 rounded text-center">
              <span>Tenant_A</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-1 rounded text-center">
              <span>Tenant_B</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1 text-[7px] text-slate-500">
            <span>Row-level isolation enabled</span>
          </div>
        </div>
      )
    },
    {
      title: "Intelligent PDF Data Ingestion Pipeline",
      category: "AI & Data Ingestion",
      desc: "OCR-parsing pipeline mapping raw documents through language models directly to relational database tables.",
      link: "/work",
      statusLabel: "Internal Engineering Project",
      visual: (
        <div className="w-full h-full flex flex-col justify-between p-3 font-mono text-[8px] text-slate-400">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span>INGESTION PIPELINE</span>
            <span className="text-purple-400">LLM Parse</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 justify-center">
            <span className="bg-slate-900 border border-slate-850 px-1 py-0.5 rounded">PDF</span>
            <span className="text-slate-600">&rarr;</span>
            <span className="bg-brand-500/20 text-brand-300 border border-brand-500/20 px-1 py-0.5 rounded">Token Grid</span>
            <span className="text-slate-600">&rarr;</span>
            <span className="bg-slate-900 border border-slate-850 px-1 py-0.5 rounded">Table</span>
          </div>
          <div className="h-1" />
        </div>
      )
    }
  ];

  return (
    <section id="work" className="py-20 md:py-28 bg-slate-50 dark:bg-[#0c1321]/50 border-b border-slate-200/60 dark:border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col gap-3 reveal-on-scroll">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Selected Work</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Production architectures.
          </h2>
          <p className="text-slate-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Technical blueprints of the solutions and production code pipelines we design and deploy.
          </p>
        </div>

        {/* Selected Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {selectedProjects.map((proj, idx) => (
            <div
              key={proj.title}
              className="bg-white dark:bg-[#0d1321] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-premium transition-all duration-500 flex flex-col justify-between group reveal-on-scroll hover:shadow-premium-hover hover:border-brand-500/10 dark:hover:border-brand-400/20 hover:-translate-y-1.5"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest">{proj.category}</span>
                  <span className="text-[8px] font-extrabold bg-slate-100 dark:bg-slate-900 text-navy-900 dark:text-slate-200 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {proj.statusLabel}
                  </span>
                </div>

                <h3 className="font-extrabold text-navy-900 dark:text-slate-100 text-base mb-3 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors duration-300">
                  {proj.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {proj.desc}
                </p>

                {/* Project Visual Mockup */}
                <div className="h-[90px] w-full bg-slate-950 border border-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center p-1.5 mb-6 group-hover:scale-[1.02] transition-transform duration-300">
                  {proj.visual}
                </div>
              </div>

              {/* Action Link */}
              <Link
                href={proj.link}
                className="inline-flex items-center text-xs font-bold text-navy-900 dark:text-slate-350 hover:text-brand-500 dark:hover:text-brand-400 group-hover:translate-x-1 transition-all duration-300"
              >
                View Blueprint
                <ChevronRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
