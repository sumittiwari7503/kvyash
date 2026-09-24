import React from "react";

export const metadata = {
  title: "Disclaimer | KVYASH Technologies",
  description:
    "Read KVYASH Technologies' disclaimer regarding website content, B2B services, project scoping, and third-party systems.",
  alternates: {
    canonical: "https://kvyash.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-white dark:bg-navy-950 min-h-screen transition-colors duration-300">
      <section className="bg-slate-50/70 dark:bg-navy-900/50 border-b border-slate-200/80 dark:border-navy-800 pt-36 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60 uppercase tracking-wider">
            Legal & Notices
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900 dark:text-white">
            Disclaimer
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Last updated: August 10, 2026
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
          <p>
            The information provided by KVYASH Technologies (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on this website is for general informational and business purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind regarding its universal applicability or guaranteed commercial outcomes.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            1. No Guaranteed Commercial Outcomes
          </h2>
          <p>
            We do not guarantee specific business outcomes as an automatic consequence of deploying digital systems. Specifically, we make no guarantees regarding search engine rankings, revenue generation, customer conversions, or universal growth figures.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            2. Software Development & Scoping
          </h2>
          <p>
            Project outcomes depend on specific client requirements, data schemas, communication cadences, and infrastructure environments. Any estimates regarding timelines, costs, or architectures discussed during initial enquiries are subject to formal discovery.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            3. AI Systems & Automation
          </h2>
          <p>
            For services involving Artificial Intelligence and automation: AI-generated outputs may occasionally require validation. All automated systems should include appropriate human oversight. Clients are responsible for validating AI outputs prior to executing sensitive business decisions.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            4. Third-Party Services
          </h2>
          <p>
            Our website and bespoke client builds may integrate with third-party hosting providers (e.g. Hostinger, AWS), email gateways, and APIs. We have no direct operational control over third-party platform changes, outages, or policy updates.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall KVYASH Technologies, nor its directors or team members, be liable for indirect, incidental, or consequential damages resulting from website usage, system downtime, or third-party outages.
          </p>
        </div>
      </section>
    </div>
  );
}
