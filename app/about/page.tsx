import React from "react";
import Link from "next/link";
import { CheckCircle, Shield, Code, Hammer, ArrowRight } from "lucide-react";

export const metadata = {
  title: {
    absolute: "KVYASH Technologies | About Our Software Engineering Team"
  },
  description: "Meet KVYASH Technologies, founded by Sumit Tiwari. We are a software engineering team focused on building reliable, scale-ready web applications and AI solutions with full scoping transparency.",
  alternates: {
    canonical: "https://kvyash.com/about",
  },
};

const values = [
  {
    title: "Uncompromising Transparency",
    desc: "We provide clients with direct access to developers, open repositories, and clear scoping documents. We do not use intermediary accounts blockers or hidden charges."
  },
  {
    title: "Pragmatic Problem Solving",
    desc: "We select tools based on system performance and team maintainability. We will never sell you on complex architecture if a simple, standard database is the optimal solution."
  },
  {
    title: "Architectural Rigor",
    desc: "Every codebase is engineered for durability. We write clean, self-documenting TypeScript, establish automated testing pipelines, and structure clear database relationships."
  }
];

const handoffStandards = [
  "Complete Git repository ownership transfer on launch",
  "Fully modular UI design mockups delivered via Figma",
  "Configured CI/CD automation pipelines",
  "Comprehensive API documentation and database schemas",
  "Standard 30-day post-launch deployment support"
];

export default function AboutPage() {
  return (
    <div className="font-sans text-navy-900 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "https://kvyash.com/about/#founder",
                "name": "Sumit Tiwari",
                "jobTitle": "Founder & Engineering Lead",
                "worksFor": {
                  "@type": "Organization",
                  "name": "KVYASH Technologies",
                  "url": "https://kvyash.com"
                },
                "url": "https://kvyash.com/about"
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://kvyash.com/about/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://kvyash.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "About Us",
                    "item": "https://kvyash.com/about"
                  }
                ]
              }
            ]
          })
        }}
      />
      
      {/* 1. Header Hero */}
      <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <span className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-wide">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900">
            Bridging the gap between business objectives and software execution.
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {"KVYASH Technologies was founded to deliver stable, high-performance software without the overhead. We operate as an engineering partner focused on clean codebase craft and authentic partnerships."}
          </p>
        </div>
      </section>

      {/* 2. Core Philosophy & Narrative */}
      <section id="approach" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Our Approach to Software Craftsmanship
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {"Many businesses struggle to find reliable technology partners. Traditional software agencies often rely on complex jargon, hidden fees, and outsourced teams that deliver brittle templates. This creates a disconnect between what the business actually needs and what the software eventually does."}
          </p>
          <p className="text-slate-600 leading-relaxed">
            {"At KVYASH, we remove this friction by aligning software engineering directly with your business goals. We write code with modularity and scalability in mind, using standard stacks like Next.js, TypeScript, and SQL databases. We focus on building what is necessary, ensuring your systems are fast, secure, and easily maintainable by your in-house teams in the future."}
          </p>
        </div>
      </section>

      {/* --- NEW FOUNDER & ENGINEERING SECTION --- */}
      <section id="founder" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
          
          {/* SECTION 1 & 2: Founder Hero & Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-50 text-slate-600 border border-slate-200 uppercase tracking-widest shadow-sm">
                FOUNDER & ENGINEERING LEADERSHIP
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
                Founder-led engineering.<br />
                <span className="text-brand-500">Built for real business problems.</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
                KVYASH Technologies is founded and led by Sumit Tiwari, with a focus on practical software engineering, AI systems, automation, digital transformation, and scalable digital products for businesses.
              </p>
              <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
                Sumit works across product discovery, technical planning, software architecture, development, AI integration, automation workflows, and delivery — keeping business requirements closely connected to engineering decisions.
              </p>
            </div>
            
            <div className="lg:col-span-5 w-full">
              <Link 
                href="#founder"
                className="block focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-2xl group cursor-pointer"
              >
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group-hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] group-hover:border-slate-300 transform group-hover:-translate-y-0.5 transition-all duration-500 flex flex-col h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="relative z-10 p-8 sm:p-10 flex flex-col items-start gap-8 flex-1">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center text-white text-2xl font-extrabold shadow-md transform group-hover:scale-105 transition-transform duration-500">
                      ST
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-navy-900 text-2xl tracking-tight">Sumit Tiwari</h4>
                      <p className="text-brand-600 font-semibold text-sm tracking-wide uppercase">Founder & Engineering Lead</p>
                      <p className="text-slate-500 font-medium text-sm">KVYASH Technologies</p>
                    </div>
                    <div className="w-full h-px bg-slate-100 my-2"></div>
                    <p className="text-slate-700 text-sm font-semibold tracking-wide">
                      Software &bull; AI &bull; Automation &bull; Digital Products
                    </p>
                  </div>
                  <div className="relative z-10 bg-slate-50/50 border-t border-slate-100 px-8 py-4 sm:px-10 flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Founder Profile</span>
                    <span className="text-sm font-bold text-brand-600 flex items-center gap-1.5 transition-colors group-hover:text-brand-500">
                      View profile <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* SECTION 3: What the Founder Works Across */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Software Engineering",
                  desc: "Practical web applications, backend systems, APIs, and maintainable product architecture."
                },
                {
                  title: "AI & Automation",
                  desc: "AI assistants, business automation, CRM workflows, WhatsApp/email automation, and AI-powered systems."
                },
                {
                  title: "Digital Transformation",
                  desc: "Helping businesses move manual or offline processes into practical digital workflows."
                },
                {
                  title: "Product & Technical Consulting",
                  desc: "Understanding the business problem first, then selecting an appropriate technical approach."
                }
              ].map((item) => (
                <div key={item.title} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 group">
                  <h4 className="font-bold text-navy-900 text-base group-hover:text-brand-500 transition-colors duration-300">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 4: Engineering Philosophy */}
      <section className="py-24 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col gap-10">
          <span className="text-brand-400 font-bold tracking-widest uppercase text-xs">Engineering Philosophy</span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.3]">
            &quot;Understand the problem first.<br />
            Choose the technology second.<br />
            <span className="text-brand-300">Build only what creates real value.</span>&quot;
          </h3>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            KVYASH focuses on clear scope, direct communication, maintainable code, and practical technology decisions without unnecessary complexity.
          </p>
        </div>
      </section>

      {/* SECTION 5: How KVYASH Works */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              How KVYASH Works
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              Every engagement starts by understanding the business objective and constraints before deciding what should be built.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "1", title: "DISCOVER", desc: "Understand the business problem." },
              { num: "2", title: "PLAN", desc: "Define scope, priorities, and technical direction." },
              { num: "3", title: "BUILD", desc: "Develop the required product or system." },
              { num: "4", title: "AUTOMATE", desc: "Connect workflows, AI, CRM, messaging, or operational systems where useful." },
              { num: "5", title: "LAUNCH", desc: "Deploy, validate, and hand over the system." },
              { num: "6", title: "GROW", desc: "Improve, integrate, and scale based on real requirements." }
            ].map((step) => (
              <div key={step.num} className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 text-slate-50 font-black text-6xl group-hover:text-brand-50 transition-colors duration-500 transform translate-x-2 -translate-y-2 pointer-events-none select-none">
                  {step.num}
                </div>
                <div className="relative z-10 flex flex-col gap-3">
                  <span className="text-brand-500 font-bold text-xs tracking-widest uppercase">{step.title}</span>
                  <p className="text-navy-900 font-medium text-sm leading-relaxed max-w-[85%]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* SECTION 6: Ownership / Trust Strip */}
          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-premium flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                "Direct Communication",
                "Clear Scope",
                "Maintainable Systems",
                "Client Code Ownership"
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-500 shrink-0" aria-hidden="true" />
                  <span className="font-bold text-navy-900 text-sm">{point}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-px bg-slate-100"></div>
            <p className="text-center text-slate-600 font-medium text-sm sm:text-base">
              The goal is to leave clients with software they understand, control, and can continue to operate.
            </p>
          </div>

        </div>
      </section>
      {/* --- END NEW FOUNDER & ENGINEERING SECTION --- */}

      {/* Engineering Principles & Core Values Grid */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-500">Standards</h2>
            <h3 className="text-3xl font-extrabold text-navy-900 tracking-tight">
              Engineering Principles
            </h3>
            <p className="text-slate-600 text-sm">
              The code standards and architecture guidelines that guide our development lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-slate-50 border border-slate-100 rounded-xl p-6 shadow-premium hover:shadow-premium-hover transition-premium duration-300 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-navy-900 mb-4 border-b border-slate-200 pb-3">{val.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Standards of Handoff */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="flex flex-col gap-6">
              <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-wide">
                Handoff Standards
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
                What We Deliver to Our Clients
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {"We do not lock you into proprietary hosting accounts or custom frameworks. Every system we launch is fully documented and transferred to your direct ownership on launch day."}
              </p>
              
              <ul className="flex flex-col gap-3 mt-2">
                {handoffStandards.map((std) => (
                  <li key={std} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle className="h-5 w-5 text-brand-500 shrink-0" aria-hidden="true" />
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Box */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 shadow-premium flex flex-col gap-6">
              <h4 className="text-lg font-bold text-navy-900 border-b border-slate-200 pb-3">Engineering Rigor</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Code className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-navy-900 text-sm block">TypeScript Compilation</span>
                    <span className="text-slate-500 text-xs">Strong compilation checking ensures fewer runtime errors and cleaner code.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-navy-900 text-sm block">Security Auditing</span>
                    <span className="text-slate-500 text-xs">Standard encryption protocols and secure database query mappings.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Hammer className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-navy-900 text-sm block">CI/CD Deployments</span>
                    <span className="text-slate-500 text-xs">Automated pipeline scripts verify code builds before moving to production edge servers.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Contact CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            {"Let's establish a technical partnership."}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
            Discuss your system constraints or scaling objectives with one of our developers.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-brand-500 text-white font-semibold hover:bg-brand-600 active:scale-[0.98] transition-premium shadow-sm"
            aria-label="Start project discussion"
          >
            {"Start Scoping Project"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
