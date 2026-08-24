import React from "react";

export const metadata = {
 title: "Terms of Service",
 description: "Terms of Service and B2B software consultancy agreement rules for KVYASH Technologies.",
};

export default function TermsPage() {
 return (
 <div className="font-sans text-navy-900 bg-white">
 <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-16 md:pt-40 md:pb-20">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
 <h1 className="text-4xl font-extrabold tracking-tight text-navy-900">Terms of Service</h1>
 <p className="text-slate-500 text-sm">Last updated: August 10, 2026</p>
 </div>
 </section>

 <section className="py-20 bg-white">
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 leading-relaxed space-y-6">
 <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl mb-8 leading-normal">
 <strong>Important Notice:</strong> These Terms outline standard project engagement parameters for KVYASH Technologies. This document is for informational purposes. Clients are advised to seek professional legal review when establishing software development contracts.
 </div>

 <p>
 Welcome to the KVYASH Technologies website. By navigating this website or submitting an project inquiry through our forms or chatbot, you agree to comply with the following Terms of Service.
 </p>
 
 <h3 className="text-lg font-bold text-navy-900 pt-4">1. Website Use & Information</h3>
 <p>
 The content, system architectures, and capabilities listed on this website are provided for informational purposes. They describe the engineering services and potential deliverables KVYASH Technologies can execute for clients.
 </p>
 
 <h3 className="text-lg font-bold text-navy-900 pt-4">2. Project Enquiries & Scoping</h3>
 <p>
 Submitting a scoping request via our forms or chatbot starts an exploratory project scoping phase. This initial conversation is non-binding and does not constitute a contract to perform development services. 
 </p>
 
 <h3 className="text-lg font-bold text-navy-900 pt-4">3. Scope of Work, Estimates & Proposals</h3>
 <p>
 Any project timeline estimates, software architectures, or pricing ranges provided during scoping conversations are non-binding estimates. Formal development work is governed strictly by a signed Statement of Work (SOW) or Master Services Agreement (MSA) detailing the exact feature scope, milestones, and deliverable list.
 </p>
 
 <h3 className="text-lg font-bold text-navy-900 pt-4">4. Intellectual Property & Handoff</h3>
 <p>
 Unless specified otherwise in a signed client agreement, all code, documentation, and assets built during a project are fully transferred to client ownership upon receipt of final launch payments. KVYASH retains no ownership or license keys to client systems after handoff.
 </p>

 <h3 className="text-lg font-bold text-navy-900 pt-4">5. Client-Provided Materials</h3>
 <p>
 Clients are responsible for providing all necessary assets, API keys, brand graphics, and functional parameters required to complete the project scope. The client represents that they own or hold proper licenses for all materials provided to KVYASH.
 </p>

 <h3 className="text-lg font-bold text-navy-900 pt-4">6. Third-Party Services</h3>
 <p>
 Our software solutions frequently integrate third-party APIs, transactional email tools (such as Resend), database hosts, or LLM models (such as OpenAI/Anthropic APIs). KVYASH is not responsible for the uptime, compliance, or service charges of these third-party platforms.
 </p>

 <h3 className="text-lg font-bold text-navy-900 pt-4">7. Hosting, Deployment & Maintenance</h3>
 <p>
 We deploy software directly to client-owned hosting environments (Vercel, AWS, or similar) to ensure client control. Following deployment, KVYASH offers a standard 30-day post-launch support period. Ongoing maintenance, updates, or feature additions require a separate retainer agreement.
 </p>

 <h3 className="text-lg font-bold text-navy-900 pt-4">8. Limitation of Liability</h3>
 <p>
 KVYASH Technologies is not liable for operational interruptions, system downtime, security breaches of third-party APIs, or financial losses resulting from the use or deployment of our custom software. We offer no guarantees of search rankings, customer conversions, or specific business outcomes.
 </p>

 <h3 className="text-lg font-bold text-navy-900 pt-4">9. Termination</h3>
 <p>
 Either party may terminate the project scoping phase at any time. Active client contracts may only be terminated according to the clauses and notice periods specified in the signed Statement of Work.
 </p>

 <h3 className="text-lg font-bold text-navy-900 pt-4">10. Governing Law</h3>
 <p>
 Any legal claims or disputes arising out of website usage or project scoping shall be governed by the laws and jurisdictions of Greater Noida West, Uttar Pradesh, India.
 </p>
 </div>
 </section>
 </div>
 );
}
