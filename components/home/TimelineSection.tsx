"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Hammer, Rocket, Cpu, TrendingUp, BarChart2 } from "lucide-react";

export default function TimelineSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Trigger when element is in the middle 50% of screen
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-step-index"));
          if (!isNaN(index)) {
            setActiveStep(index);
          }
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      step: "01",
      label: "Consult",
      desc: "Understand goals, assess existing systems, determine technology selection, and establish exact project scope parameters.",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      step: "02",
      label: "Build",
      desc: "Develop high-performance websites, custom SaaS platforms, multi-tenant databases, or mobile applications with clean architecture.",
      icon: <Hammer className="h-5 w-5" />
    },
    {
      step: "03",
      label: "Launch",
      desc: "Optimize site rendering, register DNS records, configure serverless edge routing, and push the project live safely.",
      icon: <Rocket className="h-5 w-5" />
    },
    {
      step: "04",
      label: "Automate",
      desc: "Build AI-powered workflows, integrate WhatsApp CRM gateways, connect databases, and eliminate redundant manual business loops.",
      icon: <Cpu className="h-5 w-5" />
    },
    {
      step: "05",
      label: "Market",
      desc: "Implement advanced technical SEO headers, configure canonical schemas, and orchestrate paid digital client acquisition loops.",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      step: "06",
      label: "Grow",
      desc: "Track user telemetry dashboards, audit conversion funnels, resolve bottlenecks, and deploy continuous operational updates.",
      icon: <BarChart2 className="h-5 w-5" />
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50 border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">How We Partner</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            The Digital Growth Journey
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A comprehensive, end-to-end engineering roadmap designed to translate early requirements into verified growth.
          </p>
        </div>

        {/* Scroll-Driven Timeline Layout */}
        <div className="relative">
          
          {/* Vertical line running through the center/left */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2 z-0" />

          {/* Steps Loop */}
          <div className="space-y-12">
            {steps.map((item, idx) => {
              const isActive = activeStep === idx;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.label}
                  ref={(el) => { stepRefs.current[idx] = el; }}
                  data-step-index={idx}
                  className={`flex flex-col md:flex-row items-start md:items-center relative z-10 transition-all duration-700 ease-out ${
                    isActive 
                      ? "opacity-100 scale-100" 
                      : "opacity-40 scale-[0.98] blur-[0.5px]"
                  }`}
                >
                  
                  {/* Left Column for desktop (aligned opposite to right) */}
                  <div className={`w-full md:w-1/2 pr-0 md:pr-12 pl-12 md:pl-0 text-left md:text-right order-2 md:order-1 ${
                    isEven ? "md:opacity-100" : "md:opacity-0 pointer-events-none"
                  }`}>
                    {isEven && (
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 justify-start md:justify-end mb-2">
                          <span className="text-[10px] font-mono text-brand-500 font-extrabold uppercase bg-brand-50 px-2 py-0.5 rounded-full">
                            Phase {item.step}
                          </span>
                        </div>
                        <h4 className="text-navy-900 font-extrabold text-base mb-2">{item.label}</h4>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Icon Dot in the middle */}
                  <div className="absolute left-6 md:left-1/2 top-1.5 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                    <div 
                      className={`h-11 w-11 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? "border-brand-500 text-brand-500 scale-110 shadow-[0_0_12px_rgba(37,99,235,0.3)]" 
                          : "border-slate-300 text-slate-400"
                      }`}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Right Column for desktop */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 text-left order-3 ${
                    !isEven ? "md:opacity-100" : "md:opacity-0 pointer-events-none"
                  }`}>
                    {!isEven && (
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 justify-start mb-2">
                          <span className="text-[10px] font-mono text-brand-500 font-extrabold uppercase bg-brand-50 px-2 py-0.5 rounded-full">
                            Phase {item.step}
                          </span>
                        </div>
                        <h4 className="text-navy-900 font-extrabold text-base mb-2">{item.label}</h4>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    )}

                    {/* Fallback layout for mobile: Show card text directly below heading */}
                    <div className="block md:hidden bg-white border border-slate-200 p-5 rounded-xl shadow-sm mt-3">
                      <h4 className="text-navy-900 font-extrabold text-sm mb-1">{item.label}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
