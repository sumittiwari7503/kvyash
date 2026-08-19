import React from "react";
import Link from "next/link";
import StartProjectButton from "@/components/common/StartProjectButton";
import WorkClient from "@/components/common/WorkClient";

export const metadata = {
  title: {
    absolute: "KVYASH Technologies | Our Work"
  },
  description: "Browse KVYASH Technologies portfolio and case studies. See our custom web systems, SaaS platforms, AI integrations, and automation engineering projects.",
  alternates: {
    canonical: "https://kvyash.com/work",
  },
};

export default function WorkPage() {
  return (
    <div className="font-sans text-navy-900 bg-white">
      
      {/* 1. Hero Section */}
      <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-5">
          <span className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-wide">
            SELECTED WORK
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900">
            What we&apos;re building.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We showcase real products, internal engineering work, prototypes, and technical systems. Client work is published only when it can be shared publicly.
          </p>
        </div>
      </section>

      {/* 2. Interactive Portfolio & Filters Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkClient />
        </div>
      </section>

      {/* 3. AI & Automation Capabilities Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 flex flex-col gap-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500">AI & AUTOMATION</span>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
                AI systems built around real workflows.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                We design AI-powered systems around the way a business actually operates — from lead capture and customer communication to CRM updates and workflow automation.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <StartProjectButton
                intent="AI_AUTOMATION"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-500 text-white hover:bg-brand-600 text-xs font-bold rounded transition-premium cursor-pointer shadow-sm text-center"
              >
                Explore AI & Automation →
              </StartProjectButton>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              "AI Chatbots",
              "AI CRM",
              "WhatsApp CRM",
              "Email Automation",
              "AI Calling Agents",
              "Business Workflow Automation"
            ].map((system) => (
              <div
                key={system}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between items-center relative"
              >
                <div className="space-y-2">
                  <span className="inline-block text-[8px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">
                    Capability
                  </span>
                  <h4 className="text-navy-900 font-extrabold text-xs sm:text-sm">{system}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. How We Approach Projects */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Methodology</span>
            <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
              Our engineering standards.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We focus on building practical software solutions that prioritize direct access, clear scope, and documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 shadow-sm">
              <h4 className="text-base font-bold text-navy-900 mb-3 border-b border-slate-200 pb-2">1. Fixed Scope Blueprints</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Before writing any code, we scope all system boundaries, timelines, and integration parameters. This keeps estimation clean and execution predictable.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 shadow-sm">
              <h4 className="text-base font-bold text-navy-900 mb-3 border-b border-slate-200 pb-2">2. Direct Dev Access</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                You work directly with the developers building your tools. We eliminate complex account management structures, preventing miscommunications and delivery delays.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 shadow-sm">
              <h4 className="text-base font-bold text-navy-900 mb-3 border-b border-slate-200 pb-2">3. Transferable Ownership</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                All source code, database structures, repository access, and deploy credentials are handed over directly to you upon completion. Your code stays completely yours.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 shadow-sm text-center flex flex-col gap-6 items-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Have a system in mind?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
              Tell us what you&apos;re trying to build, improve, automate, or take online.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <StartProjectButton
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded transition-premium cursor-pointer shadow-sm text-center"
              >
                Start a Project
              </StartProjectButton>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded border border-slate-200 bg-white text-navy-900 font-semibold hover:bg-slate-50 transition-premium text-center"
              >
                Talk to KVYASH
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
