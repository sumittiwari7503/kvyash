"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Cpu, ShieldCheck, Database, Bell, ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

const pipelineSteps = [
  {
    step: "01",
    title: "Inquiry Ingestion",
    desc: "Captures inbound customer requirements via WhatsApp, web forms, or email listeners.",
    icon: MessageSquare,
    badge: "Input Gateway"
  },
  {
    step: "02",
    title: "AI Intent Classification",
    desc: "Extracts project scope, service intent, budget parameters, and technical requirements.",
    icon: Cpu,
    badge: "LLM Processing"
  },
  {
    step: "03",
    title: "Constraint Qualification",
    desc: "Applies business logic to validate timelines, budget fit, and service capability.",
    icon: ShieldCheck,
    badge: "Validation Rules"
  },
  {
    step: "04",
    title: "Database & CRM Sync",
    desc: "Formats structured JSON and commits directly into PostgreSQL or CRM contact records.",
    icon: Database,
    badge: "Persistence Layer"
  },
  {
    step: "05",
    title: "Team Routing & Follow-up",
    desc: "Dispatches instant team alerts with structured summaries and schedules next steps.",
    icon: Bell,
    badge: "Action Loop"
  }
];

export default function AutomationWorkflow() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="ai-automation" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Intelligent Systems
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
              AI &amp; Automation in Practice
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              We design custom AI automations that connect customer touchpoints directly to your database, CRM, and internal workflows.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/ai-automation"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 px-4.5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors shadow-2xs"
            >
              <span>AI Automation Guide</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Studio Pipeline Architecture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {pipelineSteps.map((item, idx) => {
            const Icon = item.icon;
            const isCurrent = activeStep === idx;

            return (
              <div
                key={item.title}
                onClick={() => setActiveStep(idx)}
                className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                  isCurrent
                    ? "border-brand-500 dark:border-brand-500 shadow-md ring-2 ring-brand-500/20 -translate-y-1"
                    : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                      STAGE {item.step}
                    </span>
                    <span className="text-[9px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 border border-brand-100 dark:border-brand-900/60 px-2 py-0.5 rounded-full uppercase">
                      {item.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className={`p-2 rounded-xl ${isCurrent ? "bg-brand-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-navy-900 dark:text-slate-100"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-navy-900 dark:text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                  <span>{isCurrent ? "Active Pipeline Spec" : "Click to view"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Practical Automations We Engineer */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 font-mono">
                Production Capabilities
              </span>
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white tracking-tight">
                Automations Designed For Business Operations
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Rather than generic AI wrappers, we build custom backend integration bridges connecting messaging APIs, optical character recognition (OCR), and language models to eliminate repetitive manual workflows.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "WhatsApp CRM Lead Ingestion & Qualification",
                  "Unstructured PDF & Invoice Parsing to PostgreSQL",
                  "Automated Email Ticket Categorization & Drafting",
                  "Stripe & Razorpay Webhook Event Synchronizers"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-4 justify-between">
              <div>
                <h4 className="text-base font-bold text-navy-900 dark:text-white mb-1">
                  Scope Your Automation Architecture
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  We review your manual data bottlenecks, determine the right API connectors, and provide a clear technical roadmap.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <StartProjectButton
                  intent="AI_AUTOMATION"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-navy-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 text-xs font-bold transition-all duration-200 cursor-pointer text-center"
                >
                  <span>Start AI Scoping</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </StartProjectButton>
                <Link
                  href="/resources/whatsapp-crm-development"
                  className="inline-flex items-center justify-center px-4 py-3 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-white dark:hover:bg-slate-900 transition-colors text-center"
                >
                  WhatsApp CRM Guide
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
