"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Cpu, ShieldCheck, Database, Send, Bell } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export default function AutomationWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
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

    // Automation step loop
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const steps = [
    {
      title: "WhatsApp Message",
      desc: "Incoming lead inquiry via chat",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "border-emerald-500 text-emerald-500 bg-emerald-500/10"
    },
    {
      title: "AI Agent Engine",
      desc: "Instant intent parsing & translation",
      icon: <Cpu className="h-5 w-5 animate-spin [animation-duration:8s]" />,
      color: "border-brand-500 text-brand-500 bg-brand-500/10"
    },
    {
      title: "Lead Qualification",
      desc: "Filters out low-budget or invalid bids",
      icon: <ShieldCheck className="h-5 w-5" />,
      color: "border-purple-500 text-purple-500 bg-purple-50/10"
    },
    {
      title: "CRM Sync",
      desc: "Updates contact cards & logs",
      icon: <Database className="h-5 w-5" />,
      color: "border-blue-500 text-blue-500 bg-blue-500/10"
    },
    {
      title: "Team Alert",
      desc: "Routes hot prospect alert instantly",
      icon: <Bell className="h-5 w-5" />,
      color: "border-amber-500 text-amber-500 bg-amber-500/10"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-slate-900 border-b border-slate-950 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3 reveal-on-scroll">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Core Automation Pipeline</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI systems that work with your business.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We design custom AI workflows that connect customer-facing channels directly to your backend database and CRM.
          </p>
        </div>

        {/* Interactive SVG Flowchart Visualization */}
        <div className="w-full max-w-5xl mx-auto bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-10 mb-16 relative overflow-hidden reveal-on-scroll">
          <div className="absolute inset-0 bg-slate-950/40" />

          {/* Diagram Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPassed = activeStep > idx;

              return (
                <div key={step.title} className="flex flex-col items-center text-center relative group">
                  {/* Glowing connector lines for desktop */}
                  {idx < 4 && (
                    <div className="hidden lg:block absolute top-[28px] left-[65%] w-[80%] h-0.5 bg-slate-800 z-0">
                      <div 
                        className={`h-full bg-brand-500 transition-all duration-1000 ${
                          isPassed ? "w-full" : "w-0"
                        }`}
                      />
                      {isActive && (
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-400 rounded-full animate-ping left-0" />
                      )}
                    </div>
                  )}

                  {/* Icon Circle */}
                  <div 
                    className={`h-14 w-14 rounded-full border-2 flex items-center justify-center relative z-10 transition-all duration-500 ${
                      isActive 
                        ? `${step.color} border-brand-500 scale-110 shadow-[0_0_15px_rgba(37,99,235,0.4)]`
                        : isPassed 
                        ? "border-slate-700 text-brand-400 bg-slate-900/60"
                        : "border-slate-800 text-slate-500 bg-slate-950/80"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Meta */}
                  <div className="mt-4 space-y-1">
                    <span className="text-[9px] font-mono text-slate-500">STAGE 0{idx + 1}</span>
                    <h4 className={`text-xs font-bold transition-colors duration-300 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 max-w-[150px] mx-auto leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Blueprints & Scope Section */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto reveal-on-scroll grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="h-4 w-4 text-brand-400" />
              Automations We Engineer:
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                Capture leads from WhatsApp and parse customer requirements instantly.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                Qualify project constraints dynamically before routing to human experts.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                Sync client details instantly with target CRM pipelines.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                Initialize automatic follow-ups and notifications for pending orders.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 pl-0 md:pl-8">
            <h4 className="text-sm font-bold text-white">Get a custom automation blueprint</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              We audit your manual business steps, create a technical automation route, connect necessary APIs, and deploy maintainable flows.
            </p>
            <StartProjectButton
              intent="AI_AUTOMATION"
              className="px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded text-xs transition-premium cursor-pointer shrink-0 shadow-md shadow-brand-500/10 text-center"
            >
              Start AI Scoping
            </StartProjectButton>
          </div>
        </div>

      </div>
    </section>
  );
}
