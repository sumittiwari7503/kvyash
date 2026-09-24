import React from "react";

export const metadata = {
  title: "Terms of Service | KVYASH Technologies",
  description:
    "Terms of Service and software engineering engagement parameters for KVYASH Technologies.",
  alternates: {
    canonical: "https://kvyash.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-white dark:bg-navy-950 min-h-screen transition-colors duration-300">
      <section className="bg-slate-50/70 dark:bg-navy-900/50 border-b border-slate-200/80 dark:border-navy-800 pt-36 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60 uppercase tracking-wider">
            Legal & Terms
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Last updated: August 10, 2026
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs rounded-xl mb-8 leading-normal">
            <strong>Important Notice:</strong> These Terms outline standard project engagement parameters for KVYASH Technologies. Formal development work is governed strictly by signed client agreements and Statements of Work.
          </div>

          <p>
            Welcome to the KVYASH Technologies website. By navigating this website or submitting a project inquiry through our forms or chatbot, you agree to comply with the following Terms of Service.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            1. Website Use & Information
          </h2>
          <p>
            The content, system architectures, and capabilities listed on this website are provided for informational purposes. They describe engineering services and potential deliverables KVYASH Technologies can execute for clients.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            2. Project Enquiries & Scoping
          </h2>
          <p>
            Submitting a scoping request via our forms or chatbot starts an exploratory project scoping phase. This initial conversation is non-binding and does not constitute a contract to perform development services.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            3. Scope of Work, Estimates & Proposals
          </h2>
          <p>
            Any project timeline estimates, software architectures, or pricing ranges provided during scoping conversations are non-binding estimates. Formal development work is governed strictly by a signed Statement of Work (SOW) or Master Services Agreement (MSA) detailing the exact feature scope, milestones, and deliverable list.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            4. Intellectual Property & Handoff
          </h2>
          <p>
            Unless specified otherwise in a signed client agreement, all custom code, documentation, and assets built during a project are fully transferred to client ownership upon receipt of final milestone payments.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            5. Client-Provided Materials
          </h2>
          <p>
            Clients are responsible for providing all necessary assets, API keys, brand graphics, and functional parameters required to complete the project scope. The client represents that they own or hold proper licenses for all materials provided.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            6. Third-Party Services
          </h2>
          <p>
            Our software solutions frequently integrate third-party APIs, transactional email tools, database hosts, or AI model providers. KVYASH is not responsible for the uptime, compliance, or service charges of these third-party platforms.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            7. Hosting, Deployment & Maintenance
          </h2>
          <p>
            We deploy software directly to client-owned hosting environments (Hostinger, AWS, or similar) to ensure client control. Following deployment, KVYASH offers a standard post-launch support window as specified in individual client agreements. Ongoing maintenance requires a separate retainer agreement.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            8. Limitation of Liability
          </h2>
          <p>
            KVYASH Technologies is not liable for operational interruptions, system downtime, security breaches of third-party APIs, or indirect financial losses resulting from the use or deployment of custom software. We offer no guarantees of search rankings or specific business conversion rates.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            9. Governing Law
          </h2>
          <p>
            Any legal claims or disputes arising out of website usage or project scoping shall be governed by the laws and jurisdictions of Greater Noida West, Uttar Pradesh, India.
          </p>
        </div>
      </section>
    </div>
  );
}
