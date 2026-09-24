"use client";

import React from "react";
import { Store, Globe, CreditCard, Users, Zap, ArrowUpRight } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

const stages = [
  { step: "01", title: "Physical Operations", subtitle: "Manual workflows & fragmented records", icon: Store },
  { step: "02", title: "Web Platform", subtitle: "Custom web app & digital authority", icon: Globe },
  { step: "03", title: "Digital Checkout", subtitle: "Direct payments & order processing", icon: CreditCard },
  { step: "04", title: "CRM Sync", subtitle: "Centralized client management", icon: Users },
  { step: "05", title: "AI Automation", subtitle: "Instant lead routing & notifications", icon: Zap }
];

const useCases = [
  {
    title: "Retail & Multi-Location Commerce",
    desc: "Catalog sync across web interfaces, automated order tracking, and integrated Stripe/Razorpay payments."
  },
  {
    title: "Service & Consulting Teams",
    desc: "Online client intake, dynamic scheduling synced to Google Calendar, and authenticated client portals."
  },
  {
    title: "Manufacturers & Distributors",
    desc: "B2B quote request portals, tiered customer pricing tables, and relational database inventory sync."
  },
  {
    title: "Operations & Back-Office Hubs",
    desc: "Replacing fragile spreadsheets with custom PostgreSQL dashboards and automated status tracking."
  }
];

export default function DigitizationJourney() {
  return (
    <section className="py-24 md:py-32 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200">
          <div className="max-w-2xl flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              Digital Transformation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Moving Offline Workflows Online
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We translate manual business operations into robust, database-backed digital software systems that reduce friction and scale with your team.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <StartProjectButton
              intent="OFFLINE_TO_ONLINE"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-brand-600 px-4 py-2.5 rounded-full border border-slate-300 bg-slate-50 hover:bg-white transition-colors shadow-xs cursor-pointer"
            >
              <span>Scope Digital Transition</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </StartProjectButton>
          </div>
        </div>

        {/* 5-Step Transformation Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.title}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between studio-card"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-3">
                    STAGE {stage.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-navy-900 w-fit mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-navy-900 mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {stage.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Industry Use Cases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col gap-2.5 studio-card"
            >
              <h3 className="text-sm font-bold text-navy-900">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
