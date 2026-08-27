"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import StartProjectButton from "./StartProjectButton";

interface Project {
 title: string;
 category: string;
 categoryId: string; // 'web-software' | 'ai-automation' | 'saas-marketplace' | 'internal-engineering'
 status: string; // 'BUILT' | 'PROTOTYPE' | 'IN DEVELOPMENT' | 'INTERNAL PROJECT'
 desc: string;
 stack: string[];
}

const projectsData: Project[] = [
 {
 title: "Static Site Generation + Edge Revalidation",
 category: "Web & Software",
 categoryId: "web-software",
 status: "INTERNAL PROJECT",
 desc: "A production-oriented web architecture using static generation and edge revalidation for fast content delivery.",
 stack: ["Next.js", "TypeScript", "Edge Cache"]
 },
 {
 title: "Multi-Tenant SaaS Architecture",
 category: "SaaS & Marketplace",
 categoryId: "saas-marketplace",
 status: "PROTOTYPE",
 desc: "Exploration of tenant-aware application architecture designed to keep business data logically separated while supporting shared application infrastructure.",
 stack: ["Next.js", "TypeScript", "SQL", "Serverless"]
 },
 {
 title: "Intelligent PDF Data Ingestion",
 category: "AI & Automation",
 categoryId: "ai-automation",
 status: "INTERNAL PROJECT",
 desc: "An automated document-processing workflow that extracts structured information from uploaded documents and prepares it for downstream systems.",
 stack: ["AI", "Document Processing", "API", "Database"]
 }
];

export default function WorkClient() {
 const [activeFilter, setActiveFilter] = useState("all");

 const filters = [
 { label: "All", id: "all" },
 { label: "Web & Software", id: "web-software" },
 { label: "AI & Automation", id: "ai-automation" },
 { label: "SaaS & Marketplace", id: "saas-marketplace" },
 { label: "Internal Engineering", id: "internal-engineering" }
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
 className={`px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${
 activeFilter === f.id
 ? "bg-brand-500 text-white border-brand-500 shadow-sm"
 : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 "
 }`}
 >
 {f.label}
 </button>
 ))}
 </div>

 {/* Featured Work Grid */}
 {filteredProjects.length === 0 ? (
 <div className="text-center py-12 bg-slate-50 border border-slate-200 border-dashed rounded-xl max-w-md mx-auto w-full">
 <p className="text-slate-500 text-xs font-semibold">No engineering projects in this category currently.</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {filteredProjects.map((bp, idx) => {
 return (
 <div
 key={bp.title}
 className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col justify-between group reveal-on-scroll hover:-translate-y-[5px] hover:border-slate-300"
 style={{ transitionDelay: `${idx * 100}ms` }}
 >
 <div>
 <div className="flex items-center justify-between gap-2 mb-3">
 <Link 
 href={bp.categoryId === "ai-automation" ? "/ai-automation" : bp.categoryId === "saas-marketplace" ? "/solutions" : "/services"}
 className="text-[10px] font-bold text-brand-500 hover:text-brand-600 transition-colors uppercase tracking-widest"
 >
 {bp.category}
 </Link>
 <span className={`text-[8px] font-bold border px-1.5 py-0.5 rounded uppercase ${
 bp.status === "BUILT"
 ? "bg-green-50 text-green-700 border-green-200 "
 : bp.status === "PROTOTYPE"
 ? "bg-blue-50 text-blue-700 border-blue-200 "
 : bp.status === "IN DEVELOPMENT"
 ? "bg-amber-50 text-amber-700 border-amber-200 "
 : "bg-slate-100 text-navy-900 border-slate-200 "
 }`}>
 {bp.status}
 </span>
 </div>
 <h3 className="text-sm font-bold text-navy-900 leading-tight mb-2 group-hover:text-brand-500 transition-colors">{bp.title}</h3>
 <p className="text-slate-650 text-xs leading-relaxed mb-6">{bp.desc}</p>
 
 {/* Tech Stack Badges */}
 <div className="flex flex-wrap gap-1.5 mb-6">
 {bp.stack.map((tech) => (
 <span
 key={tech}
 className="text-[9px] bg-slate-50 text-slate-500 border border-slate-200 rounded px-2 py-0.5 font-medium"
 >
 {tech}
 </span>
 ))}
 </div>
 </div>

 <StartProjectButton
 intent="BUILD_SOMETHING"
 className="inline-flex items-center text-xs font-bold text-navy-900 hover:text-brand-500 mt-2 cursor-pointer self-start transition-colors duration-200"
 >
 <span>Explore Architecture</span> <ChevronRight className="ml-1 h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
 </StartProjectButton>
 </div>
 );
 })}
 </div>
 )}
 </div>
 );
}
