"use client";

import React, { useState, useEffect, useRef } from "react";
import { Code, Layers, Cpu, MessageSquare, HelpCircle, ShoppingCart, TrendingUp, ChevronRight } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

interface CapabilityCard {
  title: string;
  desc: string;
  intent: string;
  icon: React.ReactNode;
  category: string;
}

export default function CapabilitiesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
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

  const cards: CapabilityCard[] = [
    {
      title: "Web Development",
      desc: "High-performance company websites, custom portfolios, CMS integrations (WordPress/Sanity), landing pages, and responsive corporate web portals.",
      intent: "BUILD_SOMETHING",
      icon: <Code className="h-6 w-6" />,
      category: "Websites & Portals"
    },
    {
      title: "SaaS & Custom Software",
      desc: "Multi-tenant subscription architectures, user authentication, secure payment gateways (Stripe/Razorpay), and custom relational operational databases.",
      intent: "BUILD_SOMETHING",
      icon: <Layers className="h-6 w-6" />,
      category: "Cloud Systems"
    },
    {
      title: "AI & Automation",
      desc: "Automated follow-ups, cognitive lead routing pipelines, customer support integrations, email processors, and customized internal business automations.",
      intent: "AI_AUTOMATION",
      icon: <Cpu className="h-6 w-6" />,
      category: "Agentic Systems"
    },
    {
      title: "WhatsApp CRM Integration",
      desc: "Direct customer ingestion, booking slots notifications, broadcast campaigns, auto-replies, and unified support inbox routing directly on WhatsApp.",
      intent: "AI_AUTOMATION",
      icon: <MessageSquare className="h-6 w-6" />,
      category: "Messaging Automation"
    },
    {
      title: "Technology Consulting",
      desc: "Software architecture auditing, database optimization, cloud migration strategies, modern stack selection, and digital transformation roadmaps.",
      intent: "CONSULTANCY",
      icon: <HelpCircle className="h-6 w-6" />,
      category: "Strategy & Audit"
    },
    {
      title: "Marketplace Development",
      desc: "Multi-vendor marketplaces, merchant onboarding dashboards, product search & filter algorithms, admin control panels, and commission routing rules.",
      intent: "MARKETPLACE",
      icon: <ShoppingCart className="h-6 w-6" />,
      category: "Multi-vendor Commerce"
    },
    {
      title: "Product Launch & Growth",
      desc: "SEO structure optimization, analytics telemetry setup, paid lead campaigns, conversion rate auditing, and ongoing digital performance scaling.",
      intent: "MARKETING_GROWTH",
      icon: <TrendingUp className="h-6 w-6" />,
      category: "Marketing & Conversion"
    }
  ];

  return (
    <section ref={sectionRef} id="capabilities" className="py-20 md:py-28 bg-white dark:bg-[#090d16] border-b border-slate-200/60 dark:border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col gap-3 reveal-on-scroll">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            What we build.
          </h2>
          <p className="text-slate-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            We design and build custom web applications, multi-tenant SaaS products, secure databases, and workflow automations.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const isHovered = hoveredIdx === idx;
            const isLastCentering = idx === 6; // Center the 7th card on desktop grid

            return (
              <div
                key={card.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`bg-slate-50 dark:bg-[#0d1321] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-premium transition-all duration-500 flex flex-col justify-between group relative overflow-hidden reveal-on-scroll glowing-border ${
                  isLastCentering ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                } hover:-translate-y-1.5 hover:border-brand-500/20 dark:hover:border-brand-400/30 hover:bg-white dark:hover:bg-[#0e172a] hover:shadow-premium-hover`}
                style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
              >
                {/* Background glow behind card on hover */}
                <div 
                  className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.04),transparent_50%)] pointer-events-none transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`} 
                />

                <div className="flex flex-col gap-4 relative z-10">
                  {/* Category & Icon Row */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center justify-center p-3 rounded-xl bg-brand-50 dark:bg-slate-900 text-brand-500 dark:text-brand-400 transition-all duration-500 group-hover:bg-brand-500 dark:group-hover:bg-brand-400 group-hover:text-white group-hover:scale-110">
                      {card.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-900/60 px-2 py-0.5 rounded-full animate-premium">
                      {card.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-navy-900 dark:text-slate-100 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {card.desc}
                  </p>

                  {/* Micro Visualizer Area */}
                  <div className="h-[90px] w-full bg-slate-900/5 dark:bg-slate-900/40 rounded-xl border border-slate-200/40 dark:border-slate-800/45 relative overflow-hidden flex items-center justify-center p-4">
                    
                    {/* Index 0: Web Development Preview */}
                    {idx === 0 && (
                      <div className="w-full h-full flex flex-col justify-between">
                        <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/80 p-1 rounded-md text-[8px] font-mono text-slate-500 dark:text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <span className="ml-1 text-[7px] truncate text-slate-400 dark:text-slate-500">kvyash.com</span>
                        </div>
                        <div className="flex-1 flex items-center gap-2 px-1 mt-2">
                          <div className="h-6 flex-1 bg-slate-200/60 dark:bg-slate-900/60 rounded flex items-center px-1.5 text-[8px] text-slate-400 dark:text-slate-500 font-mono">
                            {isHovered ? "Building system..." : "Enter idea..."}
                          </div>
                          <div className="h-6 w-12 bg-brand-500 text-white text-[7px] font-bold rounded flex items-center justify-center transition-all group-hover:bg-brand-600">
                            Submit
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Index 1: SaaS Architecture Database Pool */}
                    {idx === 1 && (
                      <div className="flex items-center justify-around w-full px-4">
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[8px] font-mono font-bold text-slate-500 dark:text-slate-400 relative">
                            API
                            {isHovered && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping" />}
                          </div>
                          <span className="text-[8px] text-slate-400 mt-1 font-mono">Gateway</span>
                        </div>
                        <svg className="w-12 h-6" xmlns="http://www.w3.org/2000/svg">
                          <line x1="0" y1="12" x2="48" y2="12" stroke="#cbd5e1" strokeWidth="1.5" className={isHovered ? "animate-dash-move" : ""} />
                        </svg>
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-10 bg-slate-800 text-white rounded flex flex-col items-center justify-center text-[7px] font-mono shadow-sm">
                            <span>Postgres</span>
                            <span className="text-emerald-400 text-[6px]">Online</span>
                          </div>
                          <span className="text-[8px] text-slate-400 mt-1 font-mono">DB Pool</span>
                        </div>
                      </div>
                    )}

                    {/* Index 2: AI Agent Flow */}
                    {idx === 2 && (
                      <div className="flex items-center gap-1.5 justify-center text-[7px] font-mono">
                        <span className="bg-slate-200/80 dark:bg-slate-800/80 px-1 py-0.5 rounded text-slate-600 dark:text-slate-300">Trigger</span>
                        <span className="text-slate-300">&rarr;</span>
                        <span className="bg-brand-500 text-white px-1.5 py-0.5 rounded font-bold animate-pulse">AI Agent</span>
                        <span className="text-slate-300">&rarr;</span>
                        <span className="bg-slate-800 text-white px-1 py-0.5 rounded">Action</span>
                      </div>
                    )}

                    {/* Index 3: WhatsApp Bubble Flow */}
                    {idx === 3 && (
                      <div className="w-full flex flex-col gap-2 font-sans">
                        <div className="bg-emerald-500 text-white text-[8px] rounded-lg px-2 py-1 max-w-[80%] self-start rounded-tl-none shadow-sm transition-transform duration-300 group-hover:scale-95">
                          Need booking bot setup
                        </div>
                        <div className="bg-white dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[8px] rounded-lg px-2 py-1 max-w-[80%] self-end rounded-tr-none shadow-sm">
                          {isHovered ? "Configuring calendar slot..." : "Initializing CRM API..."}
                        </div>
                      </div>
                    )}

                    {/* Index 4: Consulting Stack Architecture */}
                    {idx === 4 && (
                      <div className="flex flex-col gap-1 w-full max-w-[150px] font-mono text-[7px] text-center">
                        <div className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350 border border-slate-300 dark:border-slate-700 rounded py-0.5">Frontend App (Next.js)</div>
                        <div className="bg-brand-500 text-white rounded py-0.5 relative">
                          API controller
                          {isHovered && <span className="absolute inset-0 bg-brand-600 rounded animate-ping opacity-25" />}
                        </div>
                        <div className="bg-slate-800 text-slate-300 rounded py-0.5">Relational DB partitions</div>
                      </div>
                    )}

                    {/* Index 5: Marketplace Multi-user purchase */}
                    {idx === 5 && (
                      <div className="w-full flex justify-between items-center text-[8px] font-mono px-2">
                        <div className="flex flex-col">
                          <span className="text-slate-400">Vendor Item</span>
                          <span className="font-bold text-navy-900 dark:text-slate-100">$120.00</span>
                        </div>
                        <div className="h-6 w-16 bg-emerald-500 text-white rounded flex items-center justify-center font-bold">
                          {isHovered ? "Paid split" : "Pay with Card"}
                        </div>
                      </div>
                    )}

                    {/* Index 6: Analytics Conversion Chart */}
                    {idx === 6 && (
                      <svg className="w-full h-full p-2" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path
                          d="M0,25 Q20,15 40,20 T80,5 T100,2"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="2"
                          strokeDasharray="200"
                          strokeDashoffset={isHovered ? "0" : "200"}
                          className="transition-all duration-1000 ease-out"
                        />
                        {isHovered && (
                          <>
                            <circle cx="40" cy="20" r="2.5" fill="#1d4ed8" className="animate-ping" />
                            <circle cx="80" cy="5" r="2.5" fill="#1d4ed8" />
                          </>
                        )}
                      </svg>
                    )}

                  </div>
                </div>

                {/* Explore Link CTA */}
                <div className="relative z-10 self-start">
                  <StartProjectButton
                    intent={card.intent}
                    className="inline-flex items-center text-xs font-bold text-brand-500 hover:text-brand-600 mt-6 group-hover:translate-x-1 transition-all cursor-pointer self-start"
                  >
                    Start Scoping <ChevronRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </StartProjectButton>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
