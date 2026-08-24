"use client";

import React, { useEffect, useRef } from "react";
import { Store, Globe, Eye, CreditCard, Users, Zap, Award } from "lucide-react";

export default function DigitizationJourney() {
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

  const stages = [
    { title: "Offline Business", subtitle: "Physical Operations", icon: <Store className="h-4 w-4" /> },
    { title: "Website", subtitle: "Digital Identity", icon: <Globe className="h-4 w-4" /> },
    { title: "Online Catalogue", subtitle: "Inventory Display", icon: <Eye className="h-4 w-4" /> },
    { title: "Payments", subtitle: "Secured Checkout", icon: <CreditCard className="h-4 w-4" /> },
    { title: "CRM Sync", subtitle: "Customer Tracking", icon: <Users className="h-4 w-4" /> },
    { title: "Automation", subtitle: "AI Lead Routing", icon: <Zap className="h-4 w-4" /> },
    { title: "Growth", subtitle: "Conversion Auditing", icon: <Award className="h-4 w-4" /> }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50 border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3 reveal-on-scroll">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Business Digitization</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            From Offline Business to Online Business
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We map physical operations to stable digital channels to transition brick-and-mortar setups into scalable systems.
          </p>
        </div>

        {/* Scroll-Revealed Horizontal Timeline Container */}
        <div className="relative w-full overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 horizontal-scroll-mask">
          <div className="flex flex-row lg:justify-between items-start min-w-[900px] lg:min-w-0 gap-4 lg:gap-2 relative py-8">
            
            {/* Desktop Connector Line running across */}
            <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-0.5 bg-slate-200 z-0" />

            {stages.map((stage, idx) => (
              <div 
                key={stage.title} 
                className="flex-1 flex flex-col items-center text-center relative z-10 reveal-on-scroll group"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Node circle */}
                <div className="h-10 w-10 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-navy-900 transition-all duration-500 group-hover:bg-brand-500 group-hover:text-white group-hover:scale-110 group-hover:border-brand-500">
                  {stage.icon}
                </div>

                {/* Step indicator */}
                <span className="text-[9px] font-mono text-slate-400 mt-3 font-bold">
                  STEP 0{idx + 1}
                </span>

                {/* Main Label */}
                <h4 className="text-xs font-bold text-navy-900 mt-1 uppercase tracking-wide group-hover:text-brand-500 transition-colors">
                  {stage.title}
                </h4>

                {/* Subtitle */}
                <p className="text-[10px] text-slate-500 mt-0.5 max-w-[120px] leading-relaxed">
                  {stage.subtitle}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Vertical/Grid Cards below for details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 reveal-on-scroll">
          {[
            { title: "Retail & Clothing Store", desc: "List local inventory online, sync catalogs across web interfaces, and accept secure payments." },
            { title: "Restaurants & Food Services", desc: "Build direct ordering channels and custom checkout pipelines to eliminate high third-party commissions." },
            { title: "Appointment & Service Teams", desc: "Enable online calendar bookings, auto-reminders, and slot scheduling integrated directly with Google Calendar." },
            { title: "Small Manufacturers", desc: "Digitize wholesale quote requests, customer order history, and custom catalog pricing tables." }
          ].map((item) => (
            <div 
              key={item.title} 
              className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              <div className="w-1.5 h-full bg-brand-500 absolute left-0 top-0 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-navy-900 font-bold text-sm mb-2">{item.title}</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
