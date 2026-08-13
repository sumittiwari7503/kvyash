import React from "react";

export const metadata = {
  title: "Cookie Policy",
  description: "Read KVYASH Technologies' cookie policies and how we handle browser state data.",
};

export default function CookiePolicyPage() {
  return (
    <div className="font-sans text-navy-900 bg-white">
      <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-navy-900">Cookie Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: August 10, 2026</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 leading-relaxed space-y-6">
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl mb-8 leading-normal">
            <strong>Important Notice:</strong> This document outlines our transparent cookie and local storage policies. It is for informational purposes only. Visitors and clients are advised to perform their own professional legal reviews when configuring compliance frameworks.
          </div>

          <p>
            This Cookie Policy explains how KVYASH Technologies uses cookies and similar storage technologies on our website. We believe in transparency and keeping your browsing experience clean, fast, and secure.
          </p>
          
          <h3 className="text-lg font-bold text-navy-900 pt-4">1. What Are Cookies and Local Storage?</h3>
          <p>
            Cookies and local storage (localStorage) are small data fragments stored directly in your browser. They enable web applications to remember your state, store choices, and secure interactive features.
          </p>
          
          <h3 className="text-lg font-bold text-navy-900 pt-4">2. Essential Cookies & Storage (Always Active)</h3>
          <p>
            We deploy essential local storage values to maintain key features on this website:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><strong>Cookie Consent State:</strong> Remembers your privacy selection (opt-in/opt-out) so you are not prompted repeatedly.</li>
            <li><strong>Chatbot State & History:</strong> Persists your conversation history and scoping state in active sessions, preventing the chatbot from resetting during page navigations.</li>
            <li><strong>CSRF Security Tokens:</strong> Validates form submissions to protect against cross-site scripting and unauthorized requests.</li>
          </ul>
          
          <h3 className="text-lg font-bold text-navy-900 pt-4">3. Analytics & Advertising Trackers</h3>
          <p>
            KVYASH Technologies **does not currently deploy** third-party tracking scripts, marketing cookies, Google Analytics, Meta Pixels, or behavior-profiling trackers. Your activity on our pages remains completely private and is not logged for marketing purposes.
          </p>
          
          <h3 className="text-lg font-bold text-navy-900 pt-4">4. Consent Configuration</h3>
          <p>
            Our website displays a standard Cookie Consent banner to register your privacy preference. Because no optional marketing or analytics tracking scripts are active on our site, your choice will not impact your privacy profile. You can clear your browser storage at any time to delete these settings.
          </p>
          
          <h3 className="text-lg font-bold text-navy-900 pt-4">5. Contact Information</h3>
          <p>
            If you have questions regarding our cookie practices, please contact us at: kvyashtechnologies@gmail.com.
          </p>
        </div>
      </section>
    </div>
  );
}
