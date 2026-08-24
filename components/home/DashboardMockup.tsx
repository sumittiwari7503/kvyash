"use client";

import React, { useState, useEffect, useRef } from "react";
import { Server, Users, CreditCard, ChevronRight, Activity, ArrowUpRight } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export default function DashboardMockup() {
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "SYS: API Gateway routing initiated.",
    "SYS: DB connection pool spawned (14/100).",
    "SYS: Heartbeat pulse active."
  ]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll reveal binding
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

    // Live telemetry logger simulation
    const logPool = [
      "AUTH: Token verified for Client Session #8902.",
      "DB: Row write committed to 'tenant_metrics' partition.",
      "API: GET /api/v1/automation returned 200 OK.",
      "CRON: Syncing active queues with Postgres pool.",
      "AI: Vector store search finished (12ms).",
      "SYS: SSL certificate handshake verified."
    ];

    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const timestamp = new Date().toLocaleTimeString();
      setTelemetryLogs((prev) => [
        `[${timestamp}] ${randomLog}`,
        ...prev.slice(0, 2)
      ]);
    }, 3500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-[#090d16] border-b border-slate-200/60 dark:border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context Copy */}
          <div className="lg:col-span-6 flex flex-col gap-6 reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Core Engineering</span>
            <h2 className="text-3xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
              Marketplace, SaaS & Custom Software
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              We design and build multi-party platforms, multi-tenant subscription software, and robust Postgres-backed databases customized around your B2B/B2C logic.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] font-bold text-navy-900 dark:text-slate-200 uppercase tracking-wider">
              <div className="p-3 bg-slate-50 dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 rounded shadow-sm text-center">B2B/B2C Marketplace</div>
              <div className="p-3 bg-slate-50 dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 rounded shadow-sm text-center">Multi-Tenant SaaS</div>
              <div className="p-3 bg-slate-50 dark:bg-[#0d1321] border border-slate-200 dark:border-slate-800 rounded shadow-sm text-center">Custom CRM & DBs</div>
            </div>

            <div className="flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-450">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-700" />
                Scalable system architecture prototype models.
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-700" />
                Designed for speed, SEO performance, and security.
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Dashboard Mockup */}
          <div className="lg:col-span-6 reveal-on-scroll relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-400 rounded-2xl blur-lg opacity-10" />
            
            {/* Browser Wrapper */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Browser Header Bar */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
                <div className="bg-slate-900 px-3 py-0.5 rounded border border-slate-800 text-[9px] font-mono text-slate-400">
                  saas-blueprint.kvyash.dev
                </div>
                <div className="w-6" />
              </div>

              {/* Mock Dashboard Body */}
              <div className="p-5 space-y-6">
                
                {/* Visual Label */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="h-3 w-3 text-brand-400 animate-pulse" />
                    Technical Blueprint Prototype
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">Node Cluster: active</span>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* Metric 1 */}
                  <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 space-y-1">
                    <span className="text-[8px] font-mono text-slate-500 flex items-center gap-1">
                      <Users className="h-3 w-3 text-slate-500" />
                      ACTIVE USERS
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-white font-mono">1,402</span>
                      <span className="text-[8px] text-emerald-400 font-mono flex items-center">&bull; online</span>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 space-y-1">
                    <span className="text-[8px] font-mono text-slate-500 flex items-center gap-1">
                      <CreditCard className="h-3 w-3 text-slate-500" />
                      VOLUME (24H)
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-white font-mono">$12,408</span>
                      <ArrowUpRight className="h-2.5 w-2.5 text-emerald-400" />
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 space-y-1">
                    <span className="text-[8px] font-mono text-slate-500 flex items-center gap-1">
                      <Server className="h-3 w-3 text-slate-500" />
                      DB SLOTS
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-white font-mono">14 / 100</span>
                      <span className="text-[7px] text-slate-500 font-mono">Pool</span>
                    </div>
                  </div>

                </div>

                {/* API System Logs Console */}
                <div className="bg-slate-950 border border-slate-850 rounded-lg p-3 font-mono text-[9px] text-slate-400 space-y-1.5 h-[80px] overflow-hidden relative">
                  <div className="absolute top-1.5 right-2 text-[8px] text-slate-500 uppercase tracking-widest">Live Telemetry</div>
                  {telemetryLogs.map((log, idx) => (
                    <div key={idx} className={`${idx === 0 ? "text-brand-300" : "text-slate-500"}`}>
                      {log}
                    </div>
                  ))}
                </div>

                {/* Scope Button */}
                <div className="pt-2">
                  <StartProjectButton
                    intent="MARKETPLACE"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded text-xs transition-premium cursor-pointer shadow-sm text-center"
                  >
                    Scope Platform Project
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </StartProjectButton>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
