import React from "react";
import Link from "next/link";
import {
  Code,
  ArrowRight,
  FileCode,
  Paintbrush,
  Play,
  FileText,
  TrendingUp,
  HelpCircle,
  Globe,
  Cpu,
  Layers,
  CheckCircle,
  ArrowUpRight
} from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export const metadata = {
  title: {
    absolute: "Software Engineering & AI Automation Services | KVYASH"
  },
  description: "Explore custom software engineering, SaaS development, web applications, and AI automation services by KVYASH Technologies. Build scalable digital systems.",
  alternates: {
    canonical: "https://kvyash.com/services",
  },
};

const serviceCategories = [
  {
    id: "development",
    title: "Custom Web & Software Engineering",
    icon: Code,
    intent: "BUILD_SOMETHING",
    whoItHelps: "Startups, scale-ups, and established businesses seeking high-performance, secure, and maintainable software applications.",
    whatWeBuild: [
      "Custom Web Applications",
      "Tailored SaaS Portals",
      "Relational Databases & APIs",
      "Internal Operations Dashboards",
      "Cross-Platform Mobile Apps",
      "Responsive Frontends"
    ],
    useCases: [
      "Replacing complex, manual spreadsheets with single-source database panels",
      "Building multi-party portals with secure permission levels",
      "Tuning API load times and database query responses",
      "Handing over clean repository structures to in-house teams"
    ]
  },
  {
    id: "consulting",
    title: "Technology Consulting & Architecture",
    icon: HelpCircle,
    intent: "CONSULTANCY",
    whoItHelps: "Founders and corporate leaders who need technical clarity, architecture design, and roadmapping before writing code.",
    whatWeBuild: [
      "Technical Architecture Diagrams",
      "System Entity Maps (ERD)",
      "MVP Feature Scopes & Roadmaps",
      "Host & Cloud Budget Estimates",
      "Database Scaling Blueprints",
      "Audit & Code Review Briefs"
    ],
    useCases: [
      "Evaluating scale-ready database models (SQL vs. NoSQL)",
      "Structuring API integration paths for Stripe, HubSpot, or Salesforce",
      "Determining serverless vs. containerized host configurations",
      "Refining legacy codebases to improve query speeds"
    ]
  },
  {
    id: "offline-online",
    title: "Offline → Online Digital Transformation",
    icon: Globe,
    intent: "OFFLINE_TO_ONLINE",
    whoItHelps: "Brick-and-mortar stores, restaurants, services businesses, and manufacturers transitioning physical workflows to the web.",
    whatWeBuild: [
      "Direct E-commerce Stores",
      "Digital Booking Calendars",
      "Online Booking & Scheduling",
      "Customer Intake Portals",
      "Local Catalogue Showcases",
      "Integrated Digital Payments"
    ],
    useCases: [
      "Transitioning physical shop inventory to digital marketplaces",
      "Deploying online scheduler tools synced to Google Calendar",
      "Setting up direct card/wallet payments (Stripe, Razorpay)",
      "Connecting online customer inquiries to automated intake systems"
    ]
  },
  {
    id: "ai-automation",
    title: "AI & Workflow Automation",
    icon: Cpu,
    intent: "AI_AUTOMATION",
    whoItHelps: "Operational teams looking to eliminate manual data entry, optimize support channels, and connect core business pipelines.",
    whatWeBuild: [
      "Cognitive Workflow Assistants",
      "WhatsApp & Email Automations",
      "Lead Qualification Runtimes",
      "CRM Webhook Listeners",
      "Document Extraction Pipelines",
      "Custom AI Calling Agents"
    ],
    useCases: [
      "Auto-categorizing PDF attachments and saving JSON structures to DB",
      "Drafting contextual email responses from CRM ticket inputs",
      "Qualifying inbound WhatsApp inquiries before routing to live agents",
      "Syncing external SaaS platform metrics dynamically into dashboards"
    ]
  },
  {
    id: "marketplace-saas",
    title: "Marketplace & SaaS Platforms",
    icon: Layers,
    intent: "MARKETPLACE",
    whoItHelps: "Operators launching multi-party business platforms or SaaS applications with vendor structures and subscriptions.",
    whatWeBuild: [
      "Multi-Vendor Catalogues",
      "Admin Control Panels",
      "Subscription Billing Portals",
      "Split Commission Systems",
      "Multi-Tenant SaaS Backends",
      "Individual Vendor Dashboards"
    ],
    useCases: [
      "Securing row-level tenant data isolation",
      "Automating payment splits between platform operators and sellers",
      "Managing recurring subscription tiers with Stripe Billing",
      "Building vendor registration flows with automated validation"
    ]
  },
  {
    id: "marketing",
    title: "Product Launch, SEO & Growth",
    icon: TrendingUp,
    intent: "MARKETING_GROWTH",
    whoItHelps: "Launched software products or brands seeking to improve search visibility, conversion metrics, and user sign-ups.",
    whatWeBuild: [
      "Conversion Landing Pages",
      "SEO Audit & Keyword Lists",
      "Lead Funnel Architecture",
      "Conversion Tracking Setups",
      "Analytics Integrations",
      "Digital Campaign Configs"
    ],
    useCases: [
      "Tuning metadata structure to improve search rankings",
      "Friction-free checkout flow designs to reduce cart abandonment",
      "Capturing qualified customer leads through targeted conversion loops",
      "Tracking product sign-up rates across active traffic sources"
    ]
  }
];

const deliverablesList = [
  {
    item: "Source Code Repository",
    details: "Full administrative access to standard GitHub repositories containing clean, linted TypeScript code.",
    icon: FileCode
  },
  {
    item: "Figma UI Designs",
    details: "Modular user interface mockups and interactive flows fully cataloged inside shared Figma workspaces.",
    icon: Paintbrush
  },
  {
    item: "Automated Deployments",
    details: "Configured CI/CD GitHub Actions pipelines deploying automatically to target Cloud environments.",
    icon: Play
  },
  {
    item: "System Schema & Docs",
    details: "Comprehensive readme documents, database entity maps, and REST API collections (Postman).",
    icon: FileText
  }
];

export default function ServicesPage() {
  return (
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": "https://kvyash.com/services/#technology-development",
                "name": "Technology & Development",
                "provider": {
                  "@type": "Organization",
                  "name": "KVYASH Technologies",
                  "url": "https://kvyash.com"
                },
                "description": "Design and development of custom websites, SaaS platforms, databases, and custom software systems."
              },
              {
                "@type": "Service",
                "@id": "https://kvyash.com/services/#technology-consulting",
                "name": "Technology Consulting",
                "provider": {
                  "@type": "Organization",
                  "name": "KVYASH Technologies",
                  "url": "https://kvyash.com"
                },
                "description": "Expert tech stack decisions, software design architecture, and digital roadmaps."
              },
              {
                "@type": "Service",
                "@id": "https://kvyash.com/services/#ai-automation",
                "name": "AI & Automation Solutions",
                "provider": {
                  "@type": "Organization",
                  "name": "KVYASH Technologies",
                  "url": "https://kvyash.com"
                },
                "description": "Integration of intelligent chatbots, automated back-office workflows, and custom AI agents."
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://kvyash.com/services/#breadcrumb",
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
                    "name": "Services",
                    "item": "https://kvyash.com/services"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://kvyash.com/services/#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What does KVYASH Technologies do?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "KVYASH Technologies is a premium software engineering company that builds custom web applications, SaaS platforms, digital marketplaces, and AI-powered business systems. We operate as an engineering partner, focusing on code craftsmanship, architectural rigor, and full execution transparency."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What services does KVYASH provide?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We provide six core engineering and consulting services: Custom Software & Web Development, Technology Consulting (architecture and blueprints), Offline to Online transformation (digital transformation), AI & Automation (LLM integrations, chatbots, back-office automations), Marketplace & SaaS engineering, and conversion-focused Marketing & Growth setups."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does KVYASH build websites?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. We design and build secure, fast, and SEO-optimized custom web systems using modern frameworks like React, Next.js, and Node.js. We focus on building clean code bases with proper database integration rather than using fragile pre-built website templates."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does KVYASH build AI automation systems?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. We engineer intelligent back-office automations, automated email/invoice ingestion pipelines, LLM-powered custom chatbots, and secure WhatsApp CRM messaging connectors to automate manual tasks and reduce data entry errors."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does KVYASH provide technology consulting?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. We offer advisory consulting to help businesses scope digital projects, design system architectures, choose the correct technology stack, plan MVPs (Minimum Viable Products), and map database schemas."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does KVYASH build SaaS products and marketplaces?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. We design and build robust multi-tenant SaaS architectures, secure vendor onboarding portals, split-payment systems (such as Stripe routing), and transactional marketplace platforms built for speed and long-term maintainability."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Who is the founder of KVYASH Technologies?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "KVYASH Technologies was founded and is led by Sumit Tiwari, who serves as the Founder & Engineering Lead. He leads technical discovery, planning, software architecture, development, AI integrations, and system delivery."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      
      {/* 1. Header Hero */}
      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden reveal-on-scroll">
        <div className="absolute inset-0 bg-studio-dots opacity-60 dark:opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
          <span className="inline-flex self-center items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border border-slate-200/80 dark:border-slate-800 uppercase tracking-wide shadow-2xs">
            Studio Service Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white leading-[1.1]">
            Consult • Architect • Build • Automate • Scale
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            We partner with organizations to structure technical blueprints (read our <Link href="/resources/custom-web-application-development" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">architecture guide</Link>), engineer custom <Link href="/web-development" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">web applications</Link>, design scalable <Link href="/solutions" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">software solutions</Link>, and deploy intelligent <Link href="/ai-automation" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">workflow automations</Link>.
          </p>
        </div>
      </section>

      {/* 2. Detailed Capabilities List */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                id={category.id}
                className="border-b border-slate-200/80 dark:border-slate-800/80 pb-20 last:border-0 last:pb-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Category Title & Sidebar */}
                  <div className="lg:col-span-4 flex flex-col gap-5">
                    <div className="inline-flex self-start items-center justify-center p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white tracking-tight">
                      {category.title}
                    </h2>
                    
                    <div className="flex flex-col gap-1.5 mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">Tailored For</span>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {category.whoItHelps}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3">
                      <StartProjectButton
                        intent={category.intent}
                        className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-navy-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 text-xs font-bold transition-all shadow-2xs cursor-pointer group"
                      >
                        <span>Start Scoping</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </StartProjectButton>
                      {category.id === "development" && (
                        <Link
                          href="/web-development"
                          className="inline-flex items-center text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline py-2"
                        >
                          <span>Dedicated Web Dev Page →</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Services & Use Cases Grid */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-7 shadow-2xs">
                      <h3 className="font-extrabold text-navy-900 dark:text-white text-sm uppercase tracking-wider mb-4 font-mono">What We Build</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {category.whatWeBuild.map((item) => (
                          <li key={item} className="flex items-center gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-7 shadow-2xs">
                      <h3 className="font-extrabold text-navy-900 dark:text-white text-sm uppercase tracking-wider mb-4 font-mono">Use Cases &amp; Operational Goals</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {category.useCases.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 leading-relaxed">
                            <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Core Deliverables Standards */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Launch Package</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Standard Launch Deliverables
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Every development project we execute is shipped with a comprehensive set of engineering files, repository access, and documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverablesList.map((dl) => {
              const Icon = dl.icon;
              return (
                <div
                  key={dl.item}
                  className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 shadow-2xs studio-card flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <div className="inline-flex self-start items-center justify-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h4 className="font-bold text-navy-900 dark:text-white text-base">{dl.item}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{dl.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">FAQ</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Find direct answers to common questions about KVYASH Technologies, our capabilities, and services.
            </p>
          </div>

          <div className="space-y-6 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xs">
            {[
              {
                q: "What does KVYASH Technologies do?",
                a: "KVYASH Technologies is a premium software engineering company that builds custom web applications, SaaS platforms, digital marketplaces, and AI-powered business systems. We operate as an engineering partner, focusing on code craftsmanship, architectural rigor, and full execution transparency."
              },
              {
                q: "What services does KVYASH provide?",
                a: "We provide six core engineering and consulting services: Custom Software & Web Development, Technology Consulting (architecture and blueprints), Offline to Online transformation (digital transformation), AI & Automation (LLM integrations, chatbots, back-office automations), Marketplace & SaaS engineering, and conversion-focused Marketing & Growth setups."
              },
              {
                q: "Does KVYASH build websites?",
                a: "Yes. We design and build secure, fast, and SEO-optimized custom web systems using modern frameworks like React, Next.js, and Node.js. We focus on building clean code bases with proper database integration rather than using fragile pre-built website templates."
              },
              {
                q: "Does KVYASH build AI automation systems?",
                a: "Yes. We engineer intelligent back-office automations, automated email/invoice ingestion pipelines, LLM-powered custom chatbots, and secure WhatsApp CRM messaging connectors to automate manual tasks and reduce data entry errors."
              },
              {
                q: "Does KVYASH provide technology consulting?",
                a: "Yes. We offer advisory consulting to help businesses scope digital projects, design system architectures, choose the correct technology stack, plan MVPs (Minimum Viable Products), and map database schemas."
              },
              {
                q: "Does KVYASH build SaaS products and marketplaces?",
                a: "Yes. We design and build robust multi-tenant SaaS architectures, secure vendor onboarding portals, split-payment systems (such as Stripe routing), and transactional marketplace platforms built for speed and long-term maintainability."
              },
              {
                q: "Who is the founder of KVYASH Technologies?",
                a: "KVYASH Technologies was founded and is led by Sumit Tiwari, who serves as the Founder & Engineering Lead. He leads technical discovery, planning, software architecture, development, AI integrations, and system delivery."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-slate-200/80 dark:border-slate-800 last:border-0 pb-6 last:pb-0 text-left">
                <h4 className="font-extrabold text-navy-900 dark:text-white text-base mb-2">
                  {faq.q}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Scoping Call CTA */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Let&apos;s design your software architecture.
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl leading-relaxed">
            Submit your system constraints or scaling challenges to schedule a scoping discussion with our engineering team.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <StartProjectButton
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-navy-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4" />
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
