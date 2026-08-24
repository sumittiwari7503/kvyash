"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function FounderCard() {
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

    const elements = sectionRef.current?.querySelectorAll(".founder-image-reveal, .founder-text-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT Column: Professional portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start w-full founder-image-reveal">
            <div className="relative group w-full max-w-[340px]">
              
              {/* Blue Ambient Glow Behind */}
              <div className="absolute -inset-4 bg-brand-500/8 rounded-[28px] blur-xl opacity-60 group-hover:bg-brand-500/15 group-hover:opacity-90 transition-all duration-500 pointer-events-none" />

              {/* Portrait Wrapper */}
              <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-lg transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.015] group-hover:shadow-2xl group-hover:border-slate-300">
                <img
                  src="/sumit.jpg"
                  alt="Sumit Tiwari"
                  className="w-full h-auto aspect-square object-cover object-center filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* RIGHT Column: Text Presentation */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left founder-text-reveal">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-500">
                FOUNDER • KVYASH TECHNOLOGIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Built with engineering ownership.
              </h2>
            </div>
            
            <p className="text-slate-655 text-sm sm:text-base leading-relaxed max-w-xl">
              KVYASH Technologies is built around a simple idea: technology should solve real business problems, not add unnecessary complexity.
            </p>

            <div className="space-y-1 pt-2 border-t border-slate-100 max-w-xl">
              <h4 className="font-extrabold text-navy-900 text-base">Sumit Tiwari</h4>
              <p className="text-slate-500 text-xs font-semibold">Founder & Technology Lead</p>
            </div>

            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/kvyash-technologies/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-500 transition-colors group/link cursor-pointer"
              >
                <svg className="h-4 w-4 text-brand-600 group-hover/link:scale-110 transition-transform fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>Connect on LinkedIn</span>
                <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
