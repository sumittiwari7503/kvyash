import React from "react";
import Link from "next/link";
import {
  Code,
  Cpu,
  ArrowRight,
  Database,
  Layers,
  ChevronRight,
  Star,
  Server,
  Activity,
  GitBranch,
  ShieldCheck,
  Globe,
  HelpCircle,
  TrendingUp
} from "lucide-react";
import { clientReviews } from "@/config/reviews";
import StartProjectButton from "@/components/common/StartProjectButton";

// Metadata for SEO
export const metadata = {
  title: {
    absolute: "KVYASH Technologies | Custom Software Development & AI Automation Agency India"
  },
  description: "KVYASH Technologies is a premium custom software development company and AI automation agency in India. We build scalable SaaS platforms, custom web applications, and technology consulting solutions.",
  alternates: {
    canonical: "https://kvyash.com",
  },
};



const selectedProjects = [
  {
    title: "Static Site Generation with Edge Revalidation (ISR)",
    category: "Web Infrastructure",
    desc: "Static caching pipeline for content-focused platforms, eliminating compute costs and optimizing load speeds.",
    link: "/work",
    status: "Built",
    statusLabel: "Built"
  },
  {
    title: "Multi-Tenant Serverless Database Partitioning",
    category: "SaaS Architecture",
    desc: "SaaS database isolated tenant structure with row-level security parameters and connection pools.",
    link: "/work",
    status: "Prototype",
    statusLabel: "Prototype"
  },
  {
    title: "Intelligent PDF Data Ingestion Pipeline",
    category: "AI & Data Ingestion",
    desc: "OCR-parsing pipeline mapping raw documents through language models directly to relational database tables.",
    link: "/work",
    status: "Internal Project",
    statusLabel: "Internal Engineering Project"
  }
];

export default function Home() {
  return (
    <div className="font-sans text-navy-900 bg-white min-h-screen flex flex-col justify-between">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <span className="inline-flex self-center lg:self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-widest">
                TECHNOLOGY • AI • DIGITAL GROWTH
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 leading-tight font-sans">
                From business idea to web development and AI automation.
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                KVYASH Technologies is a premium software engineering company. We help businesses plan, build, launch, and grow practical digital systems—from custom web development, SaaS platforms, and marketplaces to AI integrations, workflow automation, and technology consulting.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
                <StartProjectButton
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded transition-premium shadow-md shadow-brand-500/10 cursor-pointer text-center"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </StartProjectButton>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded border border-slate-200 bg-white text-navy-900 font-semibold hover:bg-slate-50 transition-premium text-center"
                >
                  Talk to KVYASH
                </Link>
              </div>

              <p className="text-slate-400 text-xs mt-2 font-medium tracking-wide">
                Direct communication &bull; Clear scope &bull; Maintainable systems
              </p>
            </div>

            {/* Hero Right Visual: Technical Engineering Board */}
            <div className="lg:col-span-5 hidden lg:flex justify-center relative min-h-[420px]">
              <div className="w-[380px] h-[380px] rounded-xl border border-slate-200 bg-white shadow-premium p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70" />
                
                {/* Header Meta */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 relative z-10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-brand-500 animate-pulse" />
                    System Architecture
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">v1.0.0</span>
                </div>
                
                {/* Nodes & Connecting Paths */}
                <div className="flex-1 py-6 flex flex-col gap-4 justify-center relative z-10 font-mono text-xs">
                  {/* Gateway Node */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5 flex items-center justify-between shadow-sm">
                    <span className="text-navy-900 font-semibold flex items-center gap-2">
                      <Server className="h-4 w-4 text-brand-500" />
                      Client Gateway
                    </span>
                    <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">HTTP 200</span>
                  </div>
                  
                  {/* Connection Line */}
                  <div className="flex justify-center my-0.5">
                    <div className="h-4 w-0.5 bg-brand-200 border-dashed" />
                  </div>

                  {/* Processing Ingestion Node */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5 flex items-center justify-between shadow-sm ml-4">
                    <span className="text-navy-900 font-semibold flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-brand-500 animate-spin [animation-duration:8s]" />
                      Ingestion Pipeline
                    </span>
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">Processing</span>
                  </div>

                  {/* Connection Line */}
                  <div className="flex justify-center my-0.5">
                    <div className="h-4 w-0.5 bg-brand-200 border-dashed" />
                  </div>

                  {/* Database Node */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5 flex items-center justify-between shadow-sm">
                    <span className="text-navy-900 font-semibold flex items-center gap-2">
                      <Database className="h-4 w-4 text-brand-500" />
                      PostgreSQL DB
                    </span>
                    <span className="text-[10px] text-slate-500">Idle</span>
                  </div>
                </div>

                {/* Footer details */}
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono relative z-10">
                  <span className="flex items-center gap-1">
                    <GitBranch className="h-3.5 w-3.5 text-brand-500" />
                    main branch
                  </span>
                  <span>SSL Active</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. "What can KVYASH help you with?" Section */}
      <section id="capabilities" className="py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Service Avenues</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              What can KVYASH help you with?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Select an option below to open the scoping assistant directly in that category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between group">
              <div className="flex flex-col gap-4">
                <div className="inline-flex self-start items-center justify-center p-3 rounded bg-brand-50 text-brand-500">
                  <Code className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">Technology & Development</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Websites, SaaS, custom software, mobile apps, APIs.
                </p>
              </div>
              <StartProjectButton
                intent="BUILD_SOMETHING"
                className="inline-flex items-center text-xs font-bold text-brand-500 hover:text-brand-600 mt-6 group-hover:translate-x-1 transition-transform cursor-pointer self-start"
              >
                Explore <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </StartProjectButton>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between group">
              <div className="flex flex-col gap-4">
                <div className="inline-flex self-start items-center justify-center p-3 rounded bg-brand-50 text-brand-500">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">Technology Consulting</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Architecture, technology selection, digital transformation, roadmaps.
                </p>
              </div>
              <StartProjectButton
                intent="CONSULTANCY"
                className="inline-flex items-center text-xs font-bold text-brand-500 hover:text-brand-600 mt-6 group-hover:translate-x-1 transition-transform cursor-pointer self-start"
              >
                Explore <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </StartProjectButton>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between group">
              <div className="flex flex-col gap-4">
                <div className="inline-flex self-start items-center justify-center p-3 rounded bg-brand-50 text-brand-500">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">Offline → Online</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Help traditional/offline businesses establish digital presence, catalogues, bookings, payments, online selling and operations.
                </p>
              </div>
              <StartProjectButton
                intent="OFFLINE_TO_ONLINE"
                className="inline-flex items-center text-xs font-bold text-brand-500 hover:text-brand-600 mt-6 group-hover:translate-x-1 transition-transform cursor-pointer self-start"
              >
                Explore <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </StartProjectButton>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between group">
              <div className="flex flex-col gap-4">
                <div className="inline-flex self-start items-center justify-center p-3 rounded bg-brand-50 text-brand-500">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">Marketplace & SaaS</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Build B2B/B2C marketplaces, multi-vendor systems, subscriptions and dashboards.
                </p>
              </div>
              <StartProjectButton
                intent="MARKETPLACE"
                className="inline-flex items-center text-xs font-bold text-brand-500 hover:text-brand-600 mt-6 group-hover:translate-x-1 transition-transform cursor-pointer self-start"
              >
                Explore <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </StartProjectButton>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between group">
              <div className="flex flex-col gap-4">
                <div className="inline-flex self-start items-center justify-center p-3 rounded bg-brand-50 text-brand-500">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">AI & Automation</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  AI assistants, CRM automation, WhatsApp automation, email automation, AI calling agents and custom AI systems.
                </p>
              </div>
              <StartProjectButton
                intent="AI_AUTOMATION"
                className="inline-flex items-center text-xs font-bold text-brand-500 hover:text-brand-600 mt-6 group-hover:translate-x-1 transition-transform cursor-pointer self-start"
              >
                Explore <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </StartProjectButton>
            </div>

            {/* Card 6 */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between group">
              <div className="flex flex-col gap-4">
                <div className="inline-flex self-start items-center justify-center p-3 rounded bg-brand-50 text-brand-500">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">Marketing & Growth</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  SEO, content, digital marketing, lead generation, paid campaigns and conversion improvement.
                </p>
              </div>
              <StartProjectButton
                intent="MARKETING_GROWTH"
                className="inline-flex items-center text-xs font-bold text-brand-500 hover:text-brand-600 mt-6 group-hover:translate-x-1 transition-transform cursor-pointer self-start"
              >
                Explore <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </StartProjectButton>
            </div>

            {/* Card 7 (Centered in bottom row on large displays) */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transform transition-all duration-300 flex flex-col justify-between group md:col-span-2 lg:col-span-1 lg:col-start-2">
              <div className="flex flex-col gap-4">
                <div className="inline-flex self-start items-center justify-center p-3 rounded bg-brand-50 text-brand-500">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">Product Launch & Growth</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Launch planning, analytics, optimization and ongoing digital improvement.
                </p>
              </div>
              <StartProjectButton
                intent="NOT_SURE"
                className="inline-flex items-center text-xs font-bold text-brand-500 hover:text-brand-600 mt-6 group-hover:translate-x-1 transition-transform cursor-pointer self-start"
              >
                Explore <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </StartProjectButton>
            </div>
          </div>

        </div>
      </section>

      {/* 3. visual journey path */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">How We Partner</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              The Digital Growth Journey
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We guide businesses from early consulting and stack selection through engineering, automation, and digital scaling.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { step: "01", label: "Consult", desc: "Understand goals, assess technical requirements, and define scope." },
              { step: "02", label: "Build", desc: "Develop websites, custom software, SaaS, or mobile applications." },
              { step: "03", label: "Launch", desc: "Prerender pages, deploy serverless configurations, and go live." },
              { step: "04", label: "Automate", desc: "Integrate AI workflows, WhatsApp, custom CRM, and email pipes." },
              { step: "05", label: "Market", desc: "Optimize SEO structure, deploy paid campaigns, and generate leads." },
              { step: "06", label: "Grow", desc: "Monitor conversions, audit data metrics, and continuously improve." }
            ].map((item, idx) => (
              <div key={item.label} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm relative group flex flex-col items-center">
                <span className="text-xs font-extrabold text-brand-500 bg-brand-50 rounded-full px-2 py-0.5 mb-3">{item.step}</span>
                <h4 className="text-navy-900 font-extrabold text-sm mb-1">{item.label}</h4>
                <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed">{item.desc}</p>
                {idx < 5 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-slate-300 font-bold text-sm">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI systems that work with your business */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Core Capability</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              AI systems that work with your business.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We design and build custom AI-powered workflows and background integrations instead of simply adding a generic chatbot.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4 text-center mb-12">
            {[
              "AI Chatbots", "AI CRM", "WhatsApp CRM", "Email Automation", "AI Calling Agents",
              "Lead Qualification", "Customer Support Automation", "Business Workflow Automation", "Custom AI Integrations"
            ].map((label, idx) => (
              <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                <span className="text-brand-500 font-mono text-[10px] font-bold block mb-1">0{idx + 1}</span>
                <span className="text-navy-900 font-bold text-xs">{label}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 max-w-4xl mx-auto shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-navy-900">Custom Workflows We Can Build:</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">✔ Automatically capture leads from WhatsApp</li>
                <li className="flex items-center gap-2">✔ Qualify incoming enquiries before routing to sales</li>
                <li className="flex items-center gap-2">✔ Generate and send automated email drafts & replies</li>
                <li className="flex items-center gap-2">✔ Update external CRM records instantly</li>
                <li className="flex items-center gap-2">✔ Execute automated follow-ups with prospects</li>
                <li className="flex items-center gap-2">✔ Set up human agent live chat transfer fallbacks</li>
                <li className="flex items-center gap-2">✔ Build AI voice/calling workflows</li>
                <li className="flex items-center gap-2">✔ Connect AI directly with existing internal systems</li>
              </ul>
              <p className="text-slate-400 text-[10px] mt-2 font-medium italic">Built around your workflow and requirements.</p>
            </div>
            <div className="flex flex-col gap-4 border-l border-slate-200 pl-0 md:pl-8">
              <h4 className="text-sm font-bold text-navy-900">Get a custom automation blueprint</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                KVYASH identifies your manual business processes, designs the custom AI workflow path, integrates required tools, and deploys stable systems.
              </p>
              <StartProjectButton
                intent="AI_AUTOMATION"
                className="px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded text-xs transition-premium cursor-pointer shrink-0 shadow-sm text-center"
              >
                Start AI Scoping
              </StartProjectButton>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Offline to Online Transformation */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Business Digitization</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              From Offline Business to Online Business
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We help traditional businesses move their operations online by mapping physical processes to stable digital channels.
            </p>
          </div>

          {/* Visual Transformation Path */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16 text-center text-xs font-bold">
            {[
              "OFFLINE BUSINESS", "DIGITAL PRESENCE", "ONLINE CATALOGUE", "PAYMENTS / BOOKINGS",
              "CRM / AUTOMATION", "MARKETING", "DIGITAL GROWTH"
            ].map((label, idx) => (
              <React.Fragment key={label}>
                <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm text-navy-900 uppercase tracking-wide">
                  {label}
                </span>
                {idx < 6 && <span className="text-brand-500 font-extrabold px-1">→</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Retail & Clothing Store", desc: "List local inventory online, sync catalogs, and accept secure payments." },
              { title: "Restaurants & Food Services", desc: "Build direct ordering channels and custom checkout pipelines." },
              { title: "Appointment & Service Teams", desc: "Enable online calendar bookings, auto-reminders, and slot scheduling." },
              { title: "Small Manufacturers", desc: "Digitize wholesale quote requests, customer order history, and pricing." }
            ].map((item) => (
              <div key={item.title} className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm">
                <h4 className="text-navy-900 font-bold text-sm mb-2">{item.title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Marketplace / SaaS / Custom Software */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Core Engineering</span>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight leading-tight">
                Marketplace, SaaS & Custom Software
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We engineer scalable multi-party platforms, multi-tenant subscription products, and custom operational databases tailored directly for B2B and B2C logic.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-navy-900">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded shadow-sm text-center">B2B & B2C Marketplaces</div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded shadow-sm text-center">Multi-Tenant SaaS Products</div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded shadow-sm text-center">Custom CRM & Databases</div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-extrabold text-navy-900 mb-4 pb-2 border-b border-slate-200">
                Capabilities We Build:
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">✔ Vendor onboarding</div>
                <div className="flex items-center gap-1.5">✔ Vendor dashboard</div>
                <div className="flex items-center gap-1.5">✔ Customer accounts</div>
                <div className="flex items-center gap-1.5">✔ Product catalogs</div>
                <div className="flex items-center gap-1.5">✔ Subscription billing</div>
                <div className="flex items-center gap-1.5">✔ Split payments</div>
                <div className="flex items-center gap-1.5">✔ Admin dashboards</div>
                <div className="flex items-center gap-1.5">✔ Custom data reports</div>
              </div>
              <StartProjectButton
                intent="MARKETPLACE"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded text-xs transition-premium cursor-pointer mt-6 shadow-sm text-center"
              >
                Scope Platform Project
              </StartProjectButton>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Selected Work Section */}
      <section id="work" className="py-20 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Selected Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Production architectures.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Rather than fabricating client case studies, we present the technical blueprints of the solutions we design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedProjects.map((proj) => (
              <div
                key={proj.title}
                className="bg-white border border-slate-200/80 hover:border-brand-500/10 rounded-xl p-6 shadow-premium transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">{proj.category}</span>
                    <span className="text-[9px] font-bold bg-slate-100 text-navy-900 border border-slate-200 px-1.5 py-0.5 rounded uppercase">
                      {proj.statusLabel}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm sm:text-base mb-2 group-hover:text-brand-500 transition-colors">{proj.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">{proj.desc}</p>
                </div>
                <Link
                  href={proj.link}
                  className="inline-flex items-center text-xs font-bold text-navy-900 hover:text-brand-500 group-hover:translate-x-0.5 transition-all"
                >
                  View Blueprint
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Founder / Engineering Ownership Section */}
      <section className="py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading and info */}
            <div className="lg:col-span-7 flex flex-col gap-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500">FOUNDER & ENGINEERING OWNERSHIP</span>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
                Built with direct engineering ownership.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                KVYASH Technologies was founded by Sumit Tiwari with a focus on practical software engineering, AI systems, transparent execution, and maintainable digital products.
              </p>
            </div>

            {/* Right Column: Founder card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <Link 
                href="/about#founder"
                className="block w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-xl group cursor-pointer"
              >
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm group-hover:shadow-md group-hover:border-slate-300 transform group-hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center overflow-hidden">
                  <div className="p-6 flex flex-col items-center gap-4 text-center w-full">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center text-white font-extrabold text-xl shadow-sm transform group-hover:scale-105 transition-transform duration-500">
                      ST
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-extrabold text-navy-900 text-sm">Sumit Tiwari</h4>
                      <p className="text-slate-500 text-xs font-medium">Founder & Engineering Lead</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-50/50 border-t border-slate-100 px-6 py-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Founder Profile</span>
                    <span className="text-xs font-bold text-brand-600 flex items-center gap-1 transition-colors group-hover:text-brand-500">
                      View profile <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Client Feedback Section */}
      <section id="feedback" className="py-14 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading and copy */}
            <div className="lg:col-span-5 flex flex-col gap-3 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500">CLIENT FEEDBACK</span>
              <h2 className="text-3xl font-extrabold text-navy-900 tracking-tight">
                Real work. Real feedback.
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                Verified feedback from real client collaborations will appear here with permission.
              </p>
            </div>

            {/* Right Column: Cards or Empty State */}
            <div className="lg:col-span-7 w-full">
              {clientReviews.filter(r => r.verified && r.approved).length === 0 ? (
                /* Elegant Compact Empty State Card */
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

      {/* 10. Final CTA Block */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 shadow-sm text-center flex flex-col gap-5 items-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Have a system you need built?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
              Tell us what you&apos;re trying to solve. We&apos;ll help you scope the right technical approach.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
              <StartProjectButton
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded transition-premium cursor-pointer shadow-sm text-center"
              >
                Start a Project
              </StartProjectButton>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded border border-slate-200 bg-white text-navy-900 font-semibold hover:bg-slate-50 transition-premium text-center"
              >
                Talk to KVYASH
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
