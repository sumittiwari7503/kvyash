import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Shield, Code, Hammer, ArrowRight, ArrowUpRight } from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export const metadata = {
  title: {
    absolute: "About KVYASH Technologies | Independent Software Engineering Studio"
  },
  description: "Meet KVYASH Technologies, founded by Sumit Tiwari. We are an independent software engineering studio building reliable web applications, SaaS products, and AI automations.",
  alternates: {
    canonical: "https://kvyash.com/about",
  },
};

const values = [
  {
    title: "Uncompromising Transparency",
    desc: "We provide clients with direct developer access, open repositories, and clear scoping documents. No account manager middle layers or surprise fees."
  },
  {
    title: "Pragmatic Problem Solving",
    desc: "We select tools based on operational longevity and team maintainability. We never over-engineer architecture if a clean, standard database is the optimal solution."
  },
  {
    title: "Architectural Rigor",
    desc: "Every codebase is engineered for durability. We write clean, self-documenting TypeScript, establish automated testing pipelines, and structure clear relational database relationships."
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
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
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
      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-studio-dots opacity-60 dark:opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
          <span className="inline-flex self-center items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border border-slate-200/80 dark:border-slate-800 uppercase tracking-wide shadow-2xs">
            Studio Story &amp; Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white leading-[1.1]">
            Bridging the gap between business objectives and software execution.
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            KVYASH Technologies was founded to deliver stable, high-performance software without agency bloat. We operate as an engineering partner, designing custom <Link href="/web-development" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">web applications</Link>, scalable <Link href="/solutions" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">SaaS platforms</Link>, and pragmatic <Link href="/ai-automation" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">AI workflows</Link>.
          </p>
        </div>
      </section>

      {/* 2. Core Philosophy & Narrative */}
      <section id="approach" className="py-20 md:py-28 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 font-semibold block">
            Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Our Approach to Software Craftsmanship
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Many businesses struggle to find reliable technology partners. Traditional software agencies often rely on complex jargon, hidden fees, and outsourced teams that deliver brittle templates. This creates an expensive disconnect between what the business actually needs and what the software eventually does.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            At KVYASH, we remove this friction by aligning software engineering directly with your business goals. We write code with modularity and scalability in mind, using standard stacks like Next.js, TypeScript, and SQL databases (explore our <Link href="/work" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">production architectures</Link>). We build only what creates real value, ensuring your systems are fast, secure, and easily maintainable by your in-house teams.
          </p>
        </div>
      </section>

      {/* 3. Founder & Engineering Section */}
      <section id="founder" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
          
          {/* Founder Hero & Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Portrait */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start w-full">
              <div className="relative group w-full max-w-[340px]">
                {/* Ambient Glow */}
                <div className="absolute -inset-4 bg-brand-500/10 dark:bg-brand-500/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Portrait Wrapper */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-studio transition-all duration-500 ease-out group-hover:-translate-y-1">
                  <Image
                    src="/sumit.jpg"
                    alt="Sumit Tiwari - Founder & Technology Lead"
                    width={600}
                    height={600}
                    sizes="(max-width: 640px) 100vw, 340px"
                    priority
                    className="w-full h-auto aspect-square object-cover object-center filter grayscale-[5%] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                  FOUNDER • KVYASH TECHNOLOGIES
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
                  Built with engineering ownership.
                </h2>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-xl">
                KVYASH Technologies is built around a simple idea: technology should solve real business problems, not add unnecessary complexity.
              </p>

              <div className="space-y-1 pt-2 border-t border-slate-200/80 dark:border-slate-800 max-w-xl">
                <h4 className="font-extrabold text-navy-900 dark:text-white text-base">Sumit Tiwari</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">Founder &amp; Technology Lead</p>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.linkedin.com/company/kvyash-technologies/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors group/link cursor-pointer"
                >
                  <svg className="h-4 w-4 fill-current group-hover/link:scale-110 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>

          </div>

          {/* Scope Domains */}
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
              <div key={item.title} className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-2xs studio-card flex flex-col gap-2.5">
                <h4 className="font-bold text-navy-900 dark:text-white text-base">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* 4. Engineering Philosophy Quote */}
      <section className="py-24 md:py-32 bg-navy-900 dark:bg-slate-900 text-white relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-studio-dots opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col gap-8">
          <span className="text-brand-400 font-bold tracking-widest uppercase text-xs">Engineering Philosophy</span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.3]">
            &quot;Understand the problem first.<br />
            Choose the technology second.<br />
            <span className="text-brand-300">Build only what creates real value.</span>&quot;
          </h3>
          <p className="text-slate-300 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            KVYASH focuses on clear scope, direct communication, maintainable code, and practical technology decisions without unnecessary complexity.
          </p>
        </div>
      </section>

      {/* 5. How KVYASH Works */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 font-semibold block">
              Engagement Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              How KVYASH Works
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              Every engagement starts by understanding the business objective and technical constraints before deciding what should be built.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "DISCOVER", desc: "Understand the business problem, operational flows, and team goals." },
              { num: "02", title: "PLAN", desc: "Define fixed scope, data models, priorities, and technical milestones." },
              { num: "03", title: "BUILD", desc: "Develop the required software application using clean TypeScript & Next.js." },
              { num: "04", title: "AUTOMATE", desc: "Connect workflows, AI, CRM, messaging, or operational databases where useful." },
              { num: "05", title: "LAUNCH", desc: "Deploy to cloud infrastructure, validate security, and hand over the system." },
              { num: "06", title: "GROW", desc: "Improve, integrate, and scale based on real user feedback and metrics." }
            ].map((step) => (
              <div key={step.num} className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 shadow-2xs studio-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-2xl font-mono font-extrabold text-brand-600 dark:text-brand-400">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed mt-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Ownership Trust Strip */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Direct Communication",
                "Clear Scope Blueprints",
                "Maintainable Systems",
                "Client Code Ownership"
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-500 shrink-0" aria-hidden="true" />
                  <span className="font-bold text-navy-900 dark:text-white text-sm">{point}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-px bg-slate-200/80 dark:border-slate-800" />
            <p className="text-center text-slate-600 dark:text-slate-300 font-medium text-sm sm:text-base">
              The goal is to leave clients with software they understand, control, and can continue to operate independently.
            </p>
          </div>

        </div>
      </section>

      {/* 6. Standards Grid */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Engineering Standards</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Code &amp; Architecture Principles
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              The engineering standards and architecture guidelines that guide our development lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-7 shadow-2xs studio-card flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-bold text-navy-900 dark:text-white mb-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">{val.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Standards of Handoff */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="flex flex-col gap-6">
              <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-800 uppercase tracking-wide">
                Handoff Standards
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
                What We Deliver to Our Clients
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                We do not lock you into proprietary hosting accounts or custom frameworks. Every system we launch is fully documented and transferred to your direct ownership on launch day.
              </p>
              
              <ul className="flex flex-col gap-3 mt-2">
                {handoffStandards.map((std) => (
                  <li key={std} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="h-5 w-5 text-brand-500 shrink-0" aria-hidden="true" />
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 shadow-studio flex flex-col gap-6">
              <h4 className="text-lg font-bold text-navy-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">Engineering Rigor</h4>
              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <Code className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-navy-900 dark:text-white text-sm block">TypeScript Compilation</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs">Strong compilation checking ensures fewer runtime errors and cleaner code.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <Shield className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-navy-900 dark:text-white text-sm block">Security Auditing</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs">Standard encryption protocols and secure database query mappings.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <Hammer className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-navy-900 dark:text-white text-sm block">CI/CD Deployments</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs">Automated pipeline scripts verify code builds before moving to production cloud environments.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Contact CTA */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-900/40 reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Let&apos;s establish a technical partnership.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-lg leading-relaxed">
            Discuss your system constraints or scaling objectives with our engineering team.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <StartProjectButton
              intent="BUILD_SOMETHING"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-navy-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 font-bold text-xs sm:text-sm rounded-full transition-all shadow-md cursor-pointer"
            >
              <span>Start Scoping Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </StartProjectButton>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
