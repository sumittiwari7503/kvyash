import React from "react";
import Link from "next/link";
import {
  Code,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Server,
  Zap,
  Globe,
  Lock,
  GitBranch,
  Terminal,
  FileCode,
  Sparkles,
  HelpCircle
} from "lucide-react";
import StartProjectButton from "@/components/common/StartProjectButton";

export const metadata = {
  title: {
    absolute: "Custom Web & Web Application Development Services | KVYASH"
  },
  description: "KVYASH Technologies delivers custom web development and web application engineering in India. Build high-performance Next.js websites, SaaS portals, and admin dashboards.",
  alternates: {
    canonical: "https://kvyash.com/web-development",
  },
  openGraph: {
    title: "Custom Web & Web Application Development Services | KVYASH Technologies",
    description: "High-performance custom web applications, SaaS platforms, business websites, and admin dashboards engineered with Next.js, React, and TypeScript.",
    url: "https://kvyash.com/web-development",
    siteName: "KVYASH Technologies",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Web & Web Application Development Services | KVYASH",
    description: "High-performance custom web applications, SaaS platforms, business websites, and admin dashboards engineered with Next.js, React, and TypeScript.",
  }
};

const whatWeBuild = [
  {
    icon: Globe,
    title: "Business & Corporate Websites",
    desc: "Fast, SEO-first marketing and corporate platforms engineered on Next.js SSG + ISR, Tailwind CSS, and headless content structures for optimal discovery and brand authority."
  },
  {
    icon: Code,
    title: "Custom Web Applications",
    desc: "Purpose-built browser software handling specialized business logic, role-based user permissions, multi-step workflows, and secure relational database architectures."
  },
  {
    icon: Layers,
    title: "Multi-Tenant SaaS Platforms",
    desc: "Scalable subscription architectures engineered with tenant data isolation, Stripe/Razorpay automated billing, member onboarding, and granular access controls."
  },
  {
    icon: Server,
    title: "Operations & Admin Dashboards",
    desc: "Single-source operational control panels replacing brittle spreadsheets with relational database interfaces, real-time analytics, and automated status syncing."
  },
  {
    icon: Lock,
    title: "Customer & Partner Portals",
    desc: "Authenticated client hubs for automated project intake, secure file exchanges, subscription management, and bidirectional communication."
  },
  {
    icon: Terminal,
    title: "Internal Business Tools",
    desc: "Tailored back-office software, inventory systems, and employee workflow portals designed to eliminate manual data entry and streamline team operations."
  },
  {
    icon: Zap,
    title: "API Middleware & System Bridges",
    desc: "Custom RESTful APIs and webhook listeners connecting web applications with CRMs, payment gateways, WhatsApp Business API, and legacy databases."
  }
];

const capabilities = [
  {
    icon: FileCode,
    title: "Frontend Architecture",
    points: [
      "Component-driven engineering with React 19 and Next.js App Router",
      "Strict TypeScript interfaces to minimize runtime type errors",
      "Mobile-responsive, accessible UI with Tailwind CSS",
      "Optimized asset loading and hydration to support fast Largest Contentful Paint"
    ]
  },
  {
    icon: Database,
    title: "Backend & Database Engineering",
    points: [
      "Scalable relational data modeling with PostgreSQL and Supabase",
      "Connection pooling and query indexing for high-throughput loads",
      "Secure RESTful APIs, Next.js Server Actions, and webhook handlers",
      "Automated database migrations and schema versioning"
    ]
  },
  {
    icon: Cpu,
    title: "Performance & Delivery",
    points: [
      "Prerendered static HTML cached globally across CDNs",
      "Incremental Static Regeneration (ISR) for fresh content updates",
      "Streamlined JavaScript bundles without unnecessary third-party tracking bloat",
      "Core Web Vitals tuning optimized for Google search indexability"
    ]
  },
  {
    icon: GitBranch,
    title: "Security & Integration Standards",
    points: [
      "Parameterized database queries to defend against SQL injection",
      "Role-based access control (RBAC) and row-level tenant security",
      "Strict payload validation, sanitized form inputs, and CSRF protection",
      "Direct integrations with Stripe, Razorpay, HubSpot, and WhatsApp"
    ]
  }
];

const techStack = [
  {
    category: "Frontend Frameworks",
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "HTML5 / Semantic Web"]
  },
  {
    category: "Backend & Runtime",
    items: ["Node.js", "Next.js Server Actions", "RESTful APIs", "Webhook Listeners", "Microservices"]
  },
  {
    category: "Databases & Storage",
    items: ["PostgreSQL", "Supabase", "Redis Cache", "Prisma / Drizzle ORM", "Secure Object Storage"]
  },
  {
    category: "Cloud & Infrastructure",
    items: ["Global CDN Distribution", "Hostinger Cloud", "AWS", "Docker Containers", "Git Version Control"]
  }
];

const lifecycleSteps = [
  {
    number: "01",
    title: "Discovery & Requirements Scoping",
    desc: "We analyze your business workflows, user personas, database relationships, and functional requirements to establish clear technical milestones."
  },
  {
    number: "02",
    title: "Architecture & Data Modeling",
    desc: "We draft Entity-Relationship Diagrams (ERDs), API endpoint contracts, security permission matrices, and cloud hosting specifications before writing code."
  },
  {
    number: "03",
    title: "UI/UX & Interactive Wireframing",
    desc: "We design clean, intuitive user interfaces focused on task completion speed, mobile responsiveness, and clear user journeys."
  },
  {
    number: "04",
    title: "Iterative Sprint Development",
    desc: "We build features in bi-weekly sprint cycles with clean, modular TypeScript code and provide live staging previews for milestone reviews."
  },
  {
    number: "05",
    title: "QA, Security & Performance Auditing",
    desc: "We conduct automated type checking, input validation tests, security vulnerability scans, and Core Web Vitals performance benchmarks."
  },
  {
    number: "06",
    title: "Cloud Deployment & DNS Setup",
    desc: "We configure domain routing, SSL/TLS certificates, CDN edge caching rules, and production database environments for smooth launch."
  },
  {
    number: "07",
    title: "Handover & Technical Support",
    desc: "We transfer project deliverables and repository access under agreed terms, deliver architectural documentation, and provide ongoing technical support."
  }
];

const targetAudiences = [
  {
    title: "Growing Businesses & Enterprises",
    desc: "Companies seeking to replace fragmented spreadsheets and manual data entry with secure, centralized web dashboards and automated customer intake portals."
  },
  {
    title: "Founders & Digital Startups",
    desc: "Entrepreneurs requiring production-ready web applications, SaaS MVPs, or multi-vendor platforms engineered on scalable, maintainable foundations to minimize technical debt."
  },
  {
    title: "Operations & Service Teams",
    desc: "Organizations that need customized client portals, automated appointment scheduling, and direct CRM integrations to streamline daily customer communications."
  },
  {
    title: "Companies Modernizing Legacy Systems",
    desc: "Businesses transitioning outdated, slow web applications into modern Next.js and React web architectures deployed with global caching."
  }
];

const faqs = [
  {
    q: "What is the difference between a business website and a custom web application?",
    a: "A business website primarily delivers content, brand positioning, and lead generation to visitors. A custom web application is an interactive software platform that executes complex business workflows, user authentication, database operations, and data processing in the browser."
  },
  {
    q: "Which technology stack does KVYASH Technologies use for web development?",
    a: "We build with modern full-stack JavaScript and TypeScript stacks, primarily Next.js 16, React 19, TypeScript, Tailwind CSS, Node.js, and PostgreSQL databases, deployed on modern cloud and CDN infrastructure to optimize loading performance."
  },
  {
    q: "Who owns the intellectual property and code repository once the project is finished?",
    a: "Upon project completion and milestone sign-off under agreed contract terms, custom source code, database schemas, and project assets are handed over directly to your team with no proprietary vendor lock-in."
  },
  {
    q: "Can KVYASH integrate our custom web application with our existing CRM or ERP?",
    a: "Yes. We build custom API connectors and webhook listeners connecting your web application with HubSpot, Salesforce, Stripe, Razorpay, WhatsApp Business API, and proprietary backend databases."
  },
  {
    q: "How long does a typical custom web development project take to launch?",
    a: "Project timelines vary based on scope, feature complexity, and design review cycles. Initial business websites are often scoped within 2 to 4 weeks, while custom web applications, SaaS prototypes, and multi-role dashboards typically scope across 4 to 10 weeks based on defined milestone plans."
  },
  {
    q: "How do you ensure web application security and protect user data?",
    a: "We implement defensive security practices including parameterized queries to protect against SQL injection, schema payload validation, row-level tenant isolation where required, secure environment variable isolation, and HTTPS/TLS encryption across all endpoints."
  }
];

export default function WebDevelopmentPage() {
  return (
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "@id": "https://kvyash.com/web-development/#service",
                "name": "Custom Web & Web Application Development Services",
                "provider": {
                  "@id": "https://kvyash.com/#organization"
                },
                "areaServed": [
                  { "@type": "Country", "name": "India" },
                  { "@type": "AdministrativeArea", "name": "Delhi NCR" },
                  { "@type": "City", "name": "Noida" },
                  { "@type": "City", "name": "Greater Noida" }
                ],
                "description": "Full-stack custom web development, web application engineering, Next.js business platforms, SaaS architectures, and internal business dashboards.",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Web Engineering Services",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web Application Development" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Website Development" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS Platform Engineering" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Operations Dashboard & Portal Development" } }
                  ]
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://kvyash.com/web-development/#breadcrumb",
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
                    "name": "Web Development",
                    "item": "https://kvyash.com/web-development"
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": "https://kvyash.com/web-development/#faq",
                "mainEntity": faqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* 1. Header Hero Section */}
      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden reveal-on-scroll">
        <div className="absolute inset-0 bg-studio-dots opacity-60 dark:opacity-40 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
          <span className="inline-flex self-center items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border border-slate-200/80 dark:border-slate-800 uppercase tracking-wide shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
            Engineering • Modern Web Systems • Custom Applications
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white leading-[1.1]">
            Custom Web &amp; Web Application Development Services
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            We engineer high-performance business websites, bespoke web applications, customer portals, and internal operations tools. Built with Next.js, React, TypeScript, and scalable relational databases—delivered with clean architecture, caching performance, and repository handover under agreed terms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <StartProjectButton
              intent="BUILD_SOMETHING"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md cursor-pointer group"
            >
              <span>Scope Your Web Project</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </StartProjectButton>
            <Link
              href="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-full border border-slate-300 dark:border-slate-700 transition-all shadow-2xs text-center"
            >
              Explore Engineering Blueprints
            </Link>
          </div>
        </div>
      </section>

      {/* 2. What We Build Section (7 Capability Pillars) */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Solutions Portfolio</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              What We Build
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              From high-converting corporate web platforms to complex multi-tenant cloud software, we develop purpose-built digital systems tailored to your business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeBuild.map((item, idx) => {
              const Icon = item.icon;
              const isLast = idx === 6;
              return (
                <div
                  key={item.title}
                  className={`bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-7 lg:p-8 flex flex-col justify-between studio-card ${
                    isLast ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="inline-flex self-start items-center justify-center p-3 rounded-xl bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-2xs border border-slate-200/60 dark:border-slate-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 dark:text-white leading-snug">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Engineering Capabilities Section */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Architecture &amp; Quality</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Engineering Capabilities
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              We apply software engineering principles to modern web development, focusing on maintainability, performance optimization, and relational data integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 flex flex-col gap-5 shadow-2xs studio-card"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 border border-slate-200/60 dark:border-slate-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 dark:text-white">{cap.title}</h3>
                  </div>
                  <ul className="space-y-3 pt-2">
                    {cap.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Technology Stack Matrix */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Modern Technology Stack</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Engineered With Modern Foundations
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              We choose robust, industry-standard technologies that deliver longevity, strong ecosystem support, and zero reliance on proprietary black boxes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack) => (
              <div
                key={stack.category}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 flex flex-col gap-4 shadow-2xs studio-card"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 font-mono">{stack.category}</h3>
                <ul className="space-y-2.5">
                  {stack.items.map((item) => (
                    <li key={item} className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 7-Step Development Lifecycle */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Our Methodology</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              7-Step Development Lifecycle
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              A transparent, milestone-driven engineering process from requirements scoping through cloud deployment and handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifecycleSteps.map((step, idx) => {
              const isLast = idx === 6;
              return (
                <div
                  key={step.number}
                  className={`bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 flex flex-col justify-between shadow-2xs studio-card ${
                    isLast ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-mono font-extrabold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                      Step {step.number}
                    </span>
                    <h3 className="text-lg font-bold text-navy-900 dark:text-white">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Security, IP Ownership & Quality Practices */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Security &amp; Standards</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
                Built For Reliability, Security, and Longevity
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                We design web systems with defensive engineering practices, utilizing parameterized database queries, authenticated API boundaries, and isolated tenant permissions.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <ShieldCheck className="h-5 w-5 text-brand-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-bold text-navy-900 dark:text-white">Code &amp; Deliverables Transfer</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      All custom source code, database migration files, and components are transferred directly to your Git repository upon milestone completion under agreed terms with zero vendor lock-in.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <Database className="h-5 w-5 text-brand-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-bold text-navy-900 dark:text-white">Row-Level Security &amp; Data Isolation</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      Databases are configured with strict access policies, ensuring multi-tenant data isolation and secure environment variable separation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <Zap className="h-5 w-5 text-brand-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-bold text-navy-900 dark:text-white">Edge Caching &amp; Core Web Vitals</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      Static assets and dynamic routes are tuned for rapid paint times, low layout shifts, and responsive interaction latencies across mobile and desktop.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 shadow-2xs">
              <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-5 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Standard Engineering Checklist
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>TypeScript strict mode enabled across entire codebase</span>
                </li>
                <li className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Strict linter compliance and clean build passes</span>
                </li>
                <li className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Self-referential canonical tags and OpenGraph metadata</span>
                </li>
                <li className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Automated database connection pooling &amp; SSL connections</span>
                </li>
                <li className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Sanitized form inputs and API payload validation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Complete repository documentation &amp; environment configuration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Who This Service Is For */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Target Audiences</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Who This Service Is For
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              We collaborate with business leaders, technical founders, and operational teams who require reliable, maintainable web software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {targetAudiences.map((aud) => (
              <div
                key={aud.title}
                className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 lg:p-8 flex flex-col gap-3 shadow-2xs studio-card"
              >
                <h3 className="text-lg font-bold text-navy-900 dark:text-white">{aud.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Custom Development vs. Templates / No-Code */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Approach Comparison</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Custom Development vs. Templates &amp; No-Code
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Understanding when no-code tools suffice and when custom Next.js engineering is required for business scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Basic Tools</span>
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Templates &amp; No-Code Builders</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                  Effective for simple blogs, temporary landing experiments, and early proof-of-concept prototypes with standard layout needs.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>Rapid setup for basic static layouts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>Constrained to predefined plugin ecosystems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>Recurring monthly SaaS platform fees per user/seat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>Difficult to scale complex relational database schemas</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-brand-50/50 dark:bg-slate-900 border border-brand-200/70 dark:border-brand-900/60 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider block mb-2">Engineered Solution</span>
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Custom Next.js &amp; React Engineering</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Essential when your company requires proprietary workflows, unique database logic, granular role permissions, edge caching performance, and full code ownership.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-500" />
                    <span>Optimized page rendering via CDN edge caching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-500" />
                    <span>Custom PostgreSQL schemas tailored to operational requirements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-500" />
                    <span>Direct code and IP handover under agreed project terms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-500" />
                    <span>Seamless integration with CRMs, payment gateways, and custom APIs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Verifiable Technical Proof */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-studio flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Verifiable Technical Proof</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white tracking-tight">
                Static Site Generation with Incremental Revalidation
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Review our internal production Next.js architecture utilizing static page exports, dynamic caching policies, and optimized Largest Contentful Paint benchmarks. Explore our live <Link href="/work#case-studies" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">production case studies</Link>, explore <Link href="/solutions" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">B2B software blueprints</Link>, or read our guide on <Link href="/resources/custom-web-application-development" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">custom web application development</Link>.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-full transition-all shadow-md text-center"
              >
                <span>View Case Studies</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-5 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-700 transition-all text-center"
              >
                Services Overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Buyer FAQ Section */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80 reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Frequently Asked Questions</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight">
              Web Development FAQ
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Common questions about our custom web engineering, technology stack, project scoping, and technical deliverables.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-7 transition-all duration-300 shadow-2xs"
              >
                <h3 className="text-base font-bold text-navy-900 dark:text-white mb-2.5 flex items-start gap-2.5">
                  <HelpCircle className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed pl-7.5">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final Project Scoping CTA Block */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
          <span className="inline-flex self-center items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 border border-slate-200/80 dark:border-slate-800 uppercase tracking-wide shadow-2xs">
            Start A Project
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy-900 dark:text-white">
            Ready to Engineer Your Custom Web Platform?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Tell us about your web application requirements, business workflows, or website redesign. We will review your technical specifications and provide a structured project blueprint.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <StartProjectButton
              intent="BUILD_SOMETHING"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md cursor-pointer group"
            >
              <span>Scope Your Project Online</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </StartProjectButton>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-full border border-slate-300 dark:border-slate-700 transition-all shadow-2xs text-center"
            >
              Let&apos;s Talk
            </Link>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
            Serving businesses across Greater Noida, Noida, Delhi NCR, and international teams. Also explore our <Link href="/ai-automation" className="text-brand-600 dark:text-brand-400 hover:underline">AI automation services</Link> and <Link href="/services" className="text-brand-600 dark:text-brand-400 hover:underline">full service directory</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
