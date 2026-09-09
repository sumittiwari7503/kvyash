import React from "react";

// Custom premium visual experience sections
import HeroSection from "@/components/home/HeroSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import AutomationWorkflow from "@/components/home/AutomationWorkflow";
import DigitizationJourney from "@/components/home/DigitizationJourney";
import SelectedWork from "@/components/home/SelectedWork";
import DashboardMockup from "@/components/home/DashboardMockup";
import TimelineSection from "@/components/home/TimelineSection";
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
    <div className="font-sans text-navy-900 bg-white transition-colors duration-300 min-h-screen flex flex-col justify-between">
      
      {/* 1. Interactive Parallax Hero */}
      <HeroSection />

      {/* 2. Interactive Service Capabilities (Trust / What We Build) */}
      <CapabilitiesSection />

      {/* 3. Active Automation Pipelines Flow (AI & Automation) */}
      <AutomationWorkflow />

      {/* 4. Scroll-driven Digitization Journey */}
      <DigitizationJourney />

      {/* 5. High-Fidelity Project Visuals & Blueprint Cards (Selected Work) */}
      <SelectedWork />

      {/* 6. Live SaaS & Marketplace Blueprint Mockup */}
      <DashboardMockup />

      {/* 7. Scroll-driven Process Timeline (How We Work) */}
      <TimelineSection />

      {/* 8. Shifting Gradient Mesh CTA Block */}
      <FinalCTA />

    </div>
  );
}
