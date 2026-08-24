"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Database, Server } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export default function HeroSection() {
 const containerRef = useRef<HTMLDivElement>(null);
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 const timer = setTimeout(() => {
 setMounted(true);
 }, 0);

 const container = containerRef.current;
 if (!container) return;

 const handleMouseMove = (e: MouseEvent) => {
 const { width, height, left, top } = container.getBoundingClientRect();
 const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
 const y = (e.clientY - top) / height - 0.5;
 
 container.style.setProperty("--mx", x.toString());
 container.style.setProperty("--my", y.toString());
 };

 const handleMouseLeave = () => {
 container.style.setProperty("--mx", "0");
 container.style.setProperty("--my", "0");
 };

 container.addEventListener("mousemove", handleMouseMove);
 container.addEventListener("mouseleave", handleMouseLeave);

 return () => {
 clearTimeout(timer);
 container.removeEventListener("mousemove", handleMouseMove);
 container.removeEventListener("mouseleave", handleMouseLeave);
 };
 }, []);

 return (
 <section
 ref={containerRef}
 className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 border-b border-slate-200 [--mx:0] [--my:0]"
 >
 {/* Dynamic Animated Grid Overlay */}
 <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.05)_1px,transparent_1px)] (to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] opacity-40 animate-grid-flow" />

 {/* Cyberpunk radial background glow */}
 <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
 
 {/* Hero Left: Text & CTA Reveal */}
 <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
 <span 
 className={`inline-flex self-center lg:self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20 uppercase tracking-widest transition-all duration-700 ${
 mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
 }`}
 >
 <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping" />
 Technology • AI • Digital Systems
 </span>
 
 <h1 
 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 leading-tight transition-all duration-1000 delay-100 font-sans`}
 style={{
 opacity: mounted ? 1 : 0,
 transform: mounted ? "translateY(0)" : "translateY(20px)",
 transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)"
 }}
 >
 From business idea <br className="hidden sm:inline" />
 to web development <br className="hidden sm:inline" />
 and <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-650 to-brand-500 ">AI automation</span>.
 </h1>
 
 <p 
 className={`text-slate-655 text-base sm:text-lg max-w-2xl leading-relaxed`}
 style={{
 opacity: mounted ? 1 : 0,
 transform: mounted ? "translateY(0)" : "translateY(20px)",
 transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 200ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 200ms"
 }}
 >
 KVYASH Technologies is a premium software engineering studio. We build high-performance web platforms, custom SaaS products, and workflow automations that scale operational efficiency.
 </p>
 
 <div 
 className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2`}
 style={{
 opacity: mounted ? 1 : 0,
 transform: mounted ? "translateY(0)" : "translateY(20px)",
 transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 400ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 400ms"
 }}
 >
 <StartProjectButton
 className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded active:scale-[0.98] transition-all shadow-lg shadow-brand-500/20 cursor-pointer text-center text-sm group"
 >
 Start a Project
 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
 </StartProjectButton>
 <Link
 href="/contact"
 className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded border border-slate-300 bg-white/40 text-slate-650 font-semibold hover:bg-slate-100 hover:text-navy-900 transition-all text-center text-sm"
 >
 Talk to KVYASH
 </Link>
 </div>

 <p 
 className={`text-slate-500 text-xs mt-2 font-medium tracking-wide`}
 style={{
 opacity: mounted ? 1 : 0,
 transition: "opacity 1s ease 600ms"
 }}
 >
 Direct engineering access &bull; Full code ownership &bull; Clean prototypes
 </p>
 </div>

 {/* Hero Right: Interactive System Architecture Board */}
 <div className="lg:col-span-5 hidden lg:flex justify-center relative min-h-[460px] select-none">
 {/* Connection Lines (SVGs behind cards) */}
 <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
 {/* Path 1: Client Gateway to API controller */}
 <path
 d="M 230,105 L 230,195"
 fill="none"
 stroke="#1d4ed8"
 strokeWidth="1.5"
 className="animate-dash-move"
 />
 {/* Path 2: API controller to DB */}
 <path
 d="M 230,245 L 140,320"
 fill="none"
 stroke="#1e293b"
 strokeWidth="1.5"
 strokeDasharray="4"
 />
 {/* Path 3: API controller to AI Agent */}
 <path
 d="M 230,245 L 320,320"
 fill="none"
 stroke="#2563eb"
 strokeWidth="1.5"
 className="animate-dash-move"
 style={{ animationDirection: "reverse" }}
 />
 </svg>

 {/* Parallax Card 5: Live Telemetry Status Indicators */}
 <div
 style={{
 transform: "translate(calc(var(--mx) * 5px), calc(var(--my) * 5px))",
 }}
 className="absolute top-10 right-[15%] w-[160px] bg-slate-950/90 border border-slate-800 rounded-lg p-3 shadow-2xl transition-transform duration-300 ease-out z-30 font-mono text-[8px] text-slate-400 space-y-1.5"
 >
 <div className="flex items-center justify-between text-[9px] font-bold text-slate-200 border-b border-slate-800 pb-1 mb-1">
 <span>SYSTEM MONITOR</span>
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
 </div>
 <div className="flex items-center justify-between">
 <span>API STATUS</span>
 <span className="text-emerald-400 font-bold">CONNECTED</span>
 </div>
 <div className="flex items-center justify-between">
 <span>AUTOMATION</span>
 <span className="text-emerald-400 font-bold">ACTIVE</span>
 </div>
 <div className="flex items-center justify-between">
 <span>DATABASE</span>
 <span className="text-emerald-400 font-bold">ONLINE</span>
 </div>
 <div className="flex items-center justify-between">
 <span>AI AGENT</span>
 <span className="text-brand-400 font-bold">READY</span>
 </div>
 </div>

 {/* Parallax Card 1: Client Browser/Request */}
 <div 
 style={{
 transform: "translate(calc(var(--mx) * -12px), calc(var(--my) * -12px))",
 }}
 className="absolute top-6 left-[10%] w-[240px] bg-slate-950/80 border border-slate-800 rounded-xl p-4 shadow-2xl transition-transform duration-300 ease-out z-10 animate-float-slow"
 >
 <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
 <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
 CLIENT SESSION
 </span>
 <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Active</span>
 </div>
 <div className="space-y-1.5 font-mono text-[10px]">
 <div className="flex justify-between text-slate-400">
 <span>GET /api/scoper</span>
 <span className="text-slate-500">2ms</span>
 </div>
 <div className="w-full bg-slate-900 h-1 rounded overflow-hidden">
 <div className="bg-brand-500 h-full w-2/3 rounded animate-pulse" />
 </div>
 </div>
 </div>

 {/* Parallax Card 2: Central Ingestion gateway */}
 <div 
 style={{
 transform: "translate(calc(var(--mx) * 15px), calc(var(--my) * 15px))",
 }}
 className="absolute top-[170px] left-[25%] w-[200px] bg-slate-950/90 border border-brand-500/30 rounded-xl p-4 shadow-2xl transition-transform duration-300 ease-out z-20 animate-pulse-glow"
 >
 <div className="flex items-center gap-2 mb-2">
 <Cpu className="h-4 w-4 text-brand-400" />
 <span className="text-[11px] font-bold text-white tracking-wide uppercase">Core API Node</span>
 </div>
 <div className="text-[10px] text-slate-400 font-mono space-y-1">
 <div className="flex items-center justify-between text-brand-300">
 <span>Thread Pool</span>
 <span>94% idle</span>
 </div>
 <div className="flex items-center justify-between text-slate-500">
 <span>SSL Handshake</span>
 <span>Secure</span>
 </div>
 </div>
 </div>

 {/* Parallax Card 3: Postgres Database node */}
 <div 
 style={{
 transform: "translate(calc(var(--mx) * -18px), calc(var(--my) * -18px))",
 }}
 className="absolute bottom-6 left-[5%] w-[210px] bg-slate-950/80 border border-slate-800 rounded-xl p-4 shadow-2xl transition-transform duration-300 ease-out z-10"
 >
 <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
 <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
 <Database className="h-3 w-3 text-slate-500" />
 PERSISTENCE
 </span>
 <span className="text-[9px] font-mono text-slate-500">PostgreSQL</span>
 </div>
 <div className="space-y-1 font-mono text-[9px] text-slate-400">
 <div className="flex justify-between">
 <span>Connections</span>
 <span className="text-slate-300">14/100</span>
 </div>
 <div className="flex justify-between">
 <span>Row Locks</span>
 <span className="text-emerald-400">0 Active</span>
 </div>
 </div>
 </div>

 {/* Parallax Card 4: AI Scoping agent */}
 <div 
 style={{
 transform: "translate(calc(var(--mx) * 22px), calc(var(--my) * 22px))",
 }}
 className="absolute bottom-[40px] right-[5%] w-[210px] bg-slate-950/85 border border-brand-500/20 rounded-xl p-4 shadow-2xl transition-transform duration-300 ease-out z-10"
 >
 <div className="flex items-center justify-between mb-2">
 <span className="text-[10px] font-mono text-brand-400 flex items-center gap-1">
 <Server className="h-3.5 w-3.5 text-brand-400" />
 AI AGENT ENGINE
 </span>
 </div>
 <div className="bg-slate-900 border border-slate-800 rounded p-2 text-[9px] font-mono text-slate-300">
 <div className="flex items-center gap-1.5 text-brand-300 mb-1">
 <Cpu className="h-2.5 w-2.5 text-brand-300" />
 <span>Prompt classified</span>
 </div>
 <div className="text-slate-500 truncate">intent: WEB_DEVELOPMENT</div>
 </div>
 </div>

 </div>
 </div>
 </div>
 </section>
 );
}
