"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import StartProjectButton from "@/components/common/StartProjectButton";

export default function FinalCTA() {
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

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900 border-b border-slate-950 overflow-hidden relative">
      
      {/* Animated Mesh Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 animate-grid-flow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 sm:p-12 shadow-2xl text-center flex flex-col gap-6 items-center reveal-on-scroll glowing-border">
          
          {/* Subtle floating nodes overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10%" cy="20%" r="2" fill="#2563eb" className="animate-pulse" />
              <circle cx="85%" cy="30%" r="3" fill="#2563eb" className="animate-pulse [animation-delay:1.5s]" />
              <circle cx="20%" cy="80%" r="2.5" fill="#2563eb" className="animate-pulse [animation-delay:0.7s]" />
              <circle cx="75%" cy="75%" r="1.5" fill="#2563eb" className="animate-pulse [animation-delay:2.2s]" />
            </svg>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">
            Let&apos;s build it.
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Have a system you need built?
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed">
            Tell us what you&apos;re trying to solve. We&apos;ll help you scope the correct technical approach and architecture.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto relative z-20">
            <StartProjectButton
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded active:scale-[0.98] transition-all shadow-lg shadow-brand-500/10 cursor-pointer text-center text-sm"
            >
              Start a Project
            </StartProjectButton>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded border border-slate-700 bg-slate-800/40 text-slate-300 font-semibold hover:bg-slate-800 hover:text-white transition-all text-center text-sm"
            >
              Talk to KVYASH
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
