import React from "react";

export const metadata = {
  title: "Cookie Policy | KVYASH Technologies",
  description:
    "Read KVYASH Technologies' cookie policies and how we handle browser state data.",
  alternates: {
    canonical: "https://kvyash.com/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-white dark:bg-navy-950 min-h-screen transition-colors duration-300">
      <section className="bg-slate-50/70 dark:bg-navy-900/50 border-b border-slate-200/80 dark:border-navy-800 pt-36 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60 uppercase tracking-wider">
            Data Privacy
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Last updated: August 10, 2026
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs rounded-xl mb-8 leading-normal">
            <strong>Important Notice:</strong> This document outlines our cookie and local storage policies. It is provided for transparency and user awareness.
          </div>

          <p>
            This Cookie Policy explains how KVYASH Technologies uses cookies and similar storage technologies on our website. We prioritize a clean, fast, and secure experience.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            1. What Are Cookies and Local Storage?
          </h2>
          <p>
            Cookies and browser storage (localStorage) are small data fragments stored directly in your browser. They enable web applications to remember your state, store theme preferences, and secure interactive features.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            2. Essential Storage (Always Active)
          </h2>
          <p>
            We deploy essential local storage values to maintain key features on this website:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><strong>Theme Mode (Light / Dark):</strong> Stores your selected theme preference to prevent visual flicker upon page load.</li>
            <li><strong>Cookie Consent State:</strong> Remembers your privacy selection so you are not prompted repeatedly.</li>
            <li><strong>Chatbot State & History:</strong> Persists your conversation history and scoping state in active sessions, preventing the chatbot from resetting during page navigations.</li>
            <li><strong>CSRF Security Tokens:</strong> Validates form submissions to protect against unauthorized requests.</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            3. Analytics & Advertising Trackers
          </h2>
          <p>
            KVYASH Technologies <strong>does not deploy</strong> third-party tracking scripts, advertising pixels, or behavior-profiling trackers. Your activity on our website is not tracked for advertising purposes.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            4. Consent Configuration
          </h2>
          <p>
            Our website displays a standard Cookie Consent banner to register your privacy preference. You can clear your browser storage at any time to reset these settings.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            5. Contact Information
          </h2>
          <p>
            If you have questions regarding our cookie practices, please contact us at: <strong>kvyashtechnologies@gmail.com</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
