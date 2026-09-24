"use client";

import React, { useState } from "react";
import { ShieldCheck, ArrowUpRight, Cpu, CheckCircle2 } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

interface ArchitectureBlueprint {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  principles: string[];
  intent: "MARKETPLACE" | "BUILD_SOMETHING" | "AI_AUTOMATION";
}

const blueprints: ArchitectureBlueprint[] = [
  {
    id: "saas",
    badge: "SaaS Application Architecture",
    title: "Multi-Tenant Cloud Platform",
    tagline: "Logical data isolation with unified operational control.",
    description: "Engineered for B2B subscription software requiring role-based permissions, automated Stripe/Razorpay billing cycles, and isolated PostgreSQL schemas.",
    specs: [
      { label: "Data Model", value: "Row-Level Security (RLS)" },
      { label: "Auth Layer", value: "JWT + Session Cookies" },
      { label: "Billing Engine", value: "Stripe Webhook Sync" },
      { label: "Cache Strategy", value: "Dynamic Route Tags" }
    ],
    principles: [
      "Zero shared-state memory leaks across tenant accounts",
      "Automated tenant onboarding with provisioned schemas",
      "Real-time event logging and audit trails"
    ],
    intent: "MARKETPLACE"
  },
  {
    id: "marketplace",
    badge: "Transactional Platform",
    title: "B2B / B2C Commerce Engine",
    tagline: "High-concurrency catalogue and automated payout routing.",
    description: "Designed for multi-vendor marketplaces requiring vendor portals, unified search indexing, escrow or split commission processing, and order lifecycle tracking.",
    specs: [
      { label: "Search Index", value: "Optimized SQL + pgvector" },
      { label: "Payout Route", value: "Automated Split Gateways" },
      { label: "Concurrency", value: "Optimistic DB Locking" },
      { label: "Inventory", value: "Real-time State Sync" }
    ],
    principles: [
      "Instant catalogue search response with indexed relational queries",
      "Isolated vendor control panels for inventory and sales reporting",
      "Secure webhook event listeners for payment status reconciliation"
    ],
    intent: "MARKETPLACE"
  },
  {
    id: "internal",
    badge: "Operations Infrastructure",
    title: "Internal Operations Hub & DB",
    tagline: "Replacing brittle spreadsheets with a single source of truth.",
    description: "Custom operational dashboards and back-office portals that consolidate distributed APIs, customer records, and inventory data into an intuitive web interface.",
    specs: [
      { label: "Backend Core", value: "PostgreSQL + Prisma" },
      { label: "Interface", value: "Next.js App Router" },
      { label: "Integrations", value: "CRMs & ERP Webhooks" },
      { label: "Deployment", value: "Cloud Infrastructure" }
    ],
    principles: [
      "Consolidated multi-department operational views",
      "Automated PDF extraction and invoice record ingestion",
      "Custom role-based permissions for staff and management"
    ],
    intent: "BUILD_SOMETHING"
  }
];

export default function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<string>("saas");
  const currentBlueprint = blueprints.find((b) => b.id === activeTab) || blueprints[0];

  return (
    <section className="py-24 md:py-32 bg-slate-50 border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 reveal-on-scroll">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-600 font-semibold mb-3 block">
              05 / Systems Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Architectural blueprints engineered for durability.
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md leading-relaxed">
            Every platform we build begins with structured data modeling, secure auth boundaries, and clean maintainable codebases.
          </p>
        </div>

        {/* Interactive Architecture Workspace */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-studio reveal-on-scroll">
          
          {/* Blueprint Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-8 border-b border-slate-100">
            {blueprints.map((bp) => (
              <button
                key={bp.id}
                type="button"
                onClick={() => setActiveTab(bp.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === bp.id
                    ? "bg-navy-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-navy-900"
                }`}
              >
                {bp.title}
              </button>
            ))}
          </div>

          {/* Blueprint Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-8 items-center">
            
            {/* Left Blueprint Details */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-brand-50 text-brand-600 border border-brand-100 uppercase tracking-wide mb-3">
                  <Cpu className="h-3 w-3" />
                  {currentBlueprint.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
                  {currentBlueprint.title}
                </h3>
                <p className="text-brand-600 text-sm font-medium mt-1">
                  {currentBlueprint.tagline}
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {currentBlueprint.description}
              </p>

              {/* Engineering Principles */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                  Core Engineering Invariants
                </span>
                {currentBlueprint.principles.map((principle) => (
                  <div key={principle} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>{principle}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <StartProjectButton
                  intent={currentBlueprint.intent}
                  className="inline-flex items-center justify-center px-6 py-3 bg-navy-900 hover:bg-brand-600 text-white font-semibold rounded-full text-xs sm:text-sm transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <span>Scope This Architecture</span>
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </StartProjectButton>
              </div>
            </div>

            {/* Right Blueprint Spec Box */}
            <div className="lg:col-span-6">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-navy-900 uppercase tracking-wide">
                      Architecture Topology
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Production Standard
                  </span>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {currentBlueprint.specs.map((spec) => (
                    <div key={spec.label} className="bg-white border border-slate-200/70 rounded-xl p-4 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        {spec.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-navy-900 font-mono block">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Architecture Pillars */}
                <div className="p-4 bg-white border border-slate-200/70 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-navy-900">
                    <ShieldCheck className="h-4 w-4 text-brand-600" />
                    <span>Deployment &amp; Handover Guarantee</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    All database schemas, API routes, migrations, and UI components are documented and delivered with full GitHub repository transfer.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
