import React from "react";
import Link from "next/link";
import { ArrowRight, Server, ShieldAlert, GitBranch } from "lucide-react";

export const metadata = {
  title: "Solutions Capabilities",
  description: "Explore the technical solutions and system integrations engineered by KVYASH Technologies to address real business problems.",
};

const solutionsData = [
  {
    id: "process-automation",
    icon: GitBranch,
    title: "Operations & Workflow Automation",
    problem: "Operational team members lose hours copying text between disconnected platforms (CRMs, legacy spreadsheets, invoice portals).",
    solution: "We engineer central dashboard systems that consolidate distributed APIs into a single user interface, implementing automatic syncing routines.",
    impact: "Reduces data processing cycles, eliminates copy errors, and speeds up report compiling."
  },
  {
    id: "scalability",
    icon: Server,
    title: "High-Throughput Cloud & SaaS Systems",
    problem: "SaaS software products face performance issues and high hosting bills when scaling database reads and tenant profiles.",
    solution: "We build serverless Next.js and Node.js architectures that scale automatically on Edge CDN networks. Database connections are optimized using connection pooling.",
    impact: "Provides sub-second response times, handles sudden traffic spikes, and keeps server costs low."
  },
  {
    id: "data-integration",
    icon: ShieldAlert,
    title: "Legacy System Integrations",
    problem: "Legacy platforms containing valuable records lack modern API access, blocking automation progress.",
    solution: "We write secure custom bridge layers that extract legacy data and expose standard REST or GraphQL endpoints for other software systems.",
    impact: "Extends the lifecycle of core software investments and allows modern workflow automation."
  }
];

export default function SolutionsPage() {
  return (
    <div className="font-sans text-navy-900 bg-white">
      
      {/* 1. Header Hero */}
      <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <span className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-wide">
            Problem Solving
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900">
            System solutions configured to solve real business friction.
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {"We design and execute custom system integrations that address bottlenecks, helping businesses scale operational efficiency and data consistency."}
          </p>
        </div>
      </section>

      {/* 2. Solutions detail */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          {solutionsData.map((sol) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.title}
                id={sol.id}
                className="bg-white border border-slate-100 rounded-xl p-8 shadow-premium hover:border-brand-500/20 hover:shadow-premium-hover transition-premium duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Column 1: Icon and Title */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="inline-flex self-start items-center justify-center p-3 rounded-lg bg-brand-50 text-brand-500">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 leading-tight">{sol.title}</h3>
                </div>

                {/* Column 2: Challenge-Solution details */}
                <div className="lg:col-span-5 flex flex-col gap-4 text-sm text-slate-600">
                  <div>
                    <strong className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Business Bottleneck</strong>
                    <p className="leading-relaxed">{sol.problem}</p>
                  </div>
                  <div>
                    <strong className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Our Approach</strong>
                    <p className="leading-relaxed">{sol.solution}</p>
                  </div>
                </div>

                {/* Column 3: Impact block */}
                <div className="lg:col-span-3 bg-brand-50 border border-brand-100 rounded-lg p-5 text-xs h-full flex flex-col justify-center">
                  <strong className="text-brand-600 font-bold uppercase tracking-wider block mb-1">Capability Outcome</strong>
                  <p className="text-slate-700 leading-relaxed">{sol.impact}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Methodology */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-500">Our Diagnostics</h2>
          <h3 className="text-3xl font-extrabold text-navy-900 tracking-tight">
            How We Diagnose & Address Bottlenecks
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {"We don't start by writing code. We first map out your current operational flows, database relationships, and third-party APIs to identify where data friction occurs. This scoping ensures we build exactly what is required to streamline your processes."}
          </p>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            {"Let's solve your operational bottlenecks."}
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
            Outline your system challenges or API integrations with an engineer to draft a technical blueprint.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-brand-500 text-white font-semibold hover:bg-brand-600 active:scale-[0.98] transition-premium shadow-sm"
            aria-label="Start solutions scoping project"
          >
            {"Start Scoping Project"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
