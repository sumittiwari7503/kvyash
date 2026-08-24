"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, GitBranch, Terminal } from "lucide-react";

export default function FounderCard() {
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

 return (
 <section ref={sectionRef} className="py-20 md:py-28 bg-white border-b border-slate-200/60 overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
 
 {/* Left Column: Heading and info */}
 <div className="lg:col-span-7 flex flex-col gap-5 text-center lg:text-left reveal-on-scroll">
 <span className="text-xs font-bold uppercase tracking-widest text-brand-500">FOUNDER & ENGINEERING OWNERSHIP</span>
 <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
 Built with direct engineering ownership.
 </h2>
 <p className="text-slate-655 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
 KVYASH Technologies was founded by Sumit Tiwari with a commit to practical systems engineering, clean APIs, transparent status logs, and robust software product lifecycles.
 </p>
 </div>

 {/* Right Column: Founder card with technical layout */}
 <div className="lg:col-span-5 flex justify-center lg:justify-end w-full reveal-on-scroll">
 <Link 
 href="/about#founder"
 className="block w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-2xl group cursor-pointer relative"
 >
 {/* Glow Behind */}
 <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-blue-400 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />

 <div className="relative bg-white border border-slate-200 rounded-2xl shadow-premium overflow-hidden transition-all duration-500 hover:border-slate-350 hover:-translate-y-1 hover:shadow-premium-hover">
 
 {/* SVG Animated Mesh Background inside card */}
 <div className="absolute inset-0 opacity-10 pointer-events-none">
 <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <pattern id="cardGrid" width="20" height="20" patternUnits="userSpaceOnUse">
 <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" className="text-slate-400 " strokeWidth="0.5" />
 </pattern>
 </defs>
 <rect width="100%" height="100%" fill="url(#cardGrid)" />
 <circle cx="80" cy="50" r="1.5" fill="#2563eb" className="animate-ping" />
 <circle cx="280" cy="120" r="1.5" fill="#2563eb" />
 </svg>
 </div>

 <div className="p-8 flex flex-col items-center gap-5 text-center relative z-10">
 {/* Founder Profile Circle */}
 <div className="h-20 w-20 rounded-full bg-slate-900 flex items-center justify-center text-white font-extrabold text-2xl shadow-md border-2 border-slate-800 relative group-hover:scale-105 transition-transform duration-500">
 ST
 {/* Ring indicator */}
 <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-brand-500 border-2 border-white flex items-center justify-center">
 <Terminal className="h-2.5 w-2.5 text-white" />
 </span>
 </div>

 <div className="space-y-1">
 <h4 className="font-extrabold text-navy-900 text-base">Sumit Tiwari</h4>
 <p className="text-slate-500 text-xs font-mono tracking-wider flex items-center justify-center gap-1.5">
 <GitBranch className="h-3.5 w-3.5 text-brand-500 " />
 Founder & Lead Engineer
 </p>
 </div>
 </div>

 {/* Card Footer Link */}
 <div className="bg-slate-50/80 border-t border-slate-100 px-6 py-4 flex items-center justify-between relative z-10">
 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Founder Profile</span>
 <span className="text-xs font-bold text-brand-600 flex items-center gap-1 transition-colors group-hover:text-brand-500 ">
 View profile <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
 </span>
 </div>

 </div>
 </Link>
 </div>

 </div>
 </div>
 </section>
 );
}
