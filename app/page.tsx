import React from "react";
import { Star, ShieldCheck } from "lucide-react";
import { clientReviews } from "@/config/reviews";
import StartProjectButton from "@/components/common/StartProjectButton";

// Custom premium visual experience sections
import HeroSection from "@/components/home/HeroSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import TimelineSection from "@/components/home/TimelineSection";
import AutomationWorkflow from "@/components/home/AutomationWorkflow";
import DigitizationJourney from "@/components/home/DigitizationJourney";
import DashboardMockup from "@/components/home/DashboardMockup";
import SelectedWork from "@/components/home/SelectedWork";
import FounderCard from "@/components/home/FounderCard";
import FinalCTA from "@/components/home/FinalCTA";

// Metadata for SEO (preserved exactly)
export const metadata = {
  title: {
    absolute: "KVYASH Technologies | Custom Software Development & AI Automation Agency India"
  },
  description: "KVYASH Technologies is a premium custom software development company and AI automation agency in India. We build scalable SaaS platforms, custom web applications, and technology consulting solutions.",
  alternates: {
    canonical: "https://kvyash.com",
  },
};

export default function Home() {
  return (
    <div className="font-sans text-navy-900 bg-white min-h-screen flex flex-col justify-between">
      
      {/* 1. Interactive Parallax Hero */}
      <HeroSection />

      {/* 2. Interactive Service Capabilities */}
      <CapabilitiesSection />

      {/* 3. Scroll-driven Process Timeline */}
      <TimelineSection />

      {/* 4. Active Automation Pipelines Flow */}
      <AutomationWorkflow />

      {/* 5. Scroll-driven Digitization Journey */}
      <DigitizationJourney />

      {/* 6. Live SaaS & Marketplace Blueprint Mockup */}
      <DashboardMockup />

      {/* 7. High-Fidelity Project Visuals & Blueprint Cards */}
      <SelectedWork />

      {/* 8. Founder Engineering Ownership & Custom Coordinate Grid */}
      <FounderCard />

      {/* 9. Client Feedback (Preserved Dynamic Reviews with Scroll-reveal) */}
      <section id="feedback" className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col gap-3 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500">CLIENT FEEDBACK</span>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
                Real work. Real feedback.
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                Verified feedback from real client collaborations will appear here with permission.
              </p>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 w-full">
              {clientReviews.filter(r => r.verified && r.approved).length === 0 ? (
                /* Compact Empty State Card */
                <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 max-w-2xl mx-auto lg:ml-auto">
                  <div className="flex items-start gap-4 text-center sm:text-left flex-col sm:flex-row">
                    <div className="h-10 w-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-navy-900 text-sm">Building our client feedback library.</h4>
                      <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                        Verified client feedback will be published as real collaborations are completed and permission is provided.
                      </p>
                    </div>
                  </div>
                  <StartProjectButton
                    className="inline-flex items-center justify-center px-4 py-2 bg-brand-500 text-white hover:bg-brand-600 text-xs font-bold rounded transition-premium cursor-pointer shadow-sm whitespace-nowrap self-center sm:self-start"
                  >
                    Work With KVYASH
                  </StartProjectButton>
                </div>
              ) : (
                /* Reviews Grid Card */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clientReviews
                    .filter(r => r.verified && r.approved)
                    .map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star
                                key={idx}
                                className={`h-3.5 w-3.5 ${
                                  idx < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-slate-600 text-xs leading-relaxed italic mb-4">
                            &ldquo;{rev.review}&rdquo;
                          </p>
                        </div>

                        <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
                          <div className="h-7 w-7 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 font-bold text-xs shrink-0">
                            {rev.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block font-bold text-navy-900 text-[11px] truncate">{rev.name}</span>
                            <span className="block text-slate-500 text-[9px] truncate">{rev.role} at {rev.company}</span>
                          </div>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold bg-green-50 text-green-700 border border-green-200 uppercase shrink-0">
                            Verified
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </section>

      {/* 10. Shifting Gradient Mesh CTA Block */}
      <FinalCTA />

    </div>
  );
}
