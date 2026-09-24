"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Code, MessageSquare } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export default function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 border-b border-slate-200/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Studio Callout Box */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-studio text-center flex flex-col items-center gap-8 reveal-on-scroll">
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-600 font-semibold block">
              Initiate Project Scoping
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Have a software system you need engineered?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Tell us what you&apos;re trying to build, automate, or take online. We&apos;ll help you scope the technical architecture, database schemas, and delivery roadmap.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <StartProjectButton
              intent="BUILD_SOMETHING"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-full text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group text-center"
            >
              <span>Start Scoping Project</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </StartProjectButton>
            
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-navy-900 font-semibold text-sm sm:text-base transition-all duration-300 shadow-sm text-center"
            >
              Talk to KVYASH
            </Link>
          </div>

          {/* Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-4 border-t border-slate-100 w-full max-w-4xl text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy-900">Fixed-Scope Blueprint</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Defined milestones and clear boundaries before coding.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy-900">Direct Dev Communication</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Work directly with engineers without account middle layers.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                <Code className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy-900">Full Code Ownership</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Direct GitHub repository and IP transfer on launch.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
