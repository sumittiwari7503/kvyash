"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Hammer, Rocket, Cpu, TrendingUp, BarChart2, ArrowRight } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export default function TimelineSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
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
      label: "Consult & Scope",
      tagline: "Architecture discovery before code",
      desc: "We understand your commercial goals, assess existing systems, select the exact technology stack, and establish fixed-scope sprint deliverables.",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      step: "02",
      label: "Build & Model",
      tagline: "Clean, component-driven engineering",
      desc: "We develop high-performance web applications, custom SaaS platforms, relational SQL databases, and internal dashboards using TypeScript and Next.js.",
      icon: <Hammer className="h-5 w-5" />
    },
    {
      step: "03",
      label: "Deploy & Optimize",
      tagline: "Deployment & performance tuning",
      desc: "We optimize site rendering, configure DNS routing, set up automated CI/CD deployment pipelines, and launch the platform safely.",
      icon: <Rocket className="h-5 w-5" />
    },
    {
      step: "04",
      label: "Automate Workflows",
      tagline: "Eliminating manual data entry",
      desc: "We build AI document ingestion pipelines, integrate WhatsApp CRM webhooks, connect databases, and remove operational friction points.",
      icon: <Cpu className="h-5 w-5" />
    },
    {
      step: "05",
      label: "Market & Index",
      tagline: "Technical SEO & search discovery",
      desc: "We implement crawlable canonical metadata, structured JSON-LD schemas, and conversion funnels to capture high-intent commercial searches.",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      step: "06",
      label: "Iterate & Scale",
      tagline: "Direct developer partnership",
      desc: "We monitor operational performance, resolve bottlenecks, hand over full repository ownership, and deploy continuous product upgrades.",
      icon: <BarChart2 className="h-5 w-5" />
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8 pb-8 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 font-semibold mb-3 block">
              Studio Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
              A disciplined, milestone-driven delivery process.
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md leading-relaxed">
            From technical discovery to production deployment and direct code transfer—every phase is executed with full transparency.
          </p>
        </div>

        {/* Studio Grid of 6 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item, idx) => {
            const isActive = activeStep === idx;

            return (
              <div
                key={item.label}
                ref={(el) => { stepRefs.current[idx] = el; }}
                data-step-index={idx}
                className={`bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:border-brand-500/30 dark:hover:border-brand-500/40 hover:shadow-studio hover:-translate-y-1 ${
                  isActive ? "border-brand-500/50 dark:border-brand-500/50 shadow-2xs" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="text-2xl sm:text-3xl font-mono font-extrabold text-brand-600 dark:text-brand-400 tracking-tight">
                      {item.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-navy-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-1">
                    {item.label}
                  </h3>
                  <p className="text-xs font-mono font-medium text-brand-600 dark:text-brand-400 mb-3 uppercase tracking-wider">
                    {item.tagline}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 dark:text-slate-500 font-bold">
                  <span>PHASE {item.step}</span>
                  <span className="text-brand-600 dark:text-brand-400 font-semibold">• ACTIVE STANDARD</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Methodology Callout Banner */}
        <div className="mt-12 bg-navy-900 dark:bg-slate-900 text-white border border-transparent dark:border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 reveal-on-scroll shadow-studio">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to start with a fixed-scope technical blueprint?
            </h4>
            <p className="text-slate-300 dark:text-slate-400 text-sm max-w-xl">
              We align with your team on architecture, timelines, and deliverables before a single line of production code is written.
            </p>
          </div>
          <StartProjectButton
            intent="BUILD_SOMETHING"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 font-semibold rounded-full text-xs sm:text-sm transition-all duration-300 shadow-md cursor-pointer"
          >
            <span>Request Scoping Call</span>
            <ArrowRight className="h-4 w-4" />
          </StartProjectButton>
        </div>

      </div>
    </section>
  );
}
