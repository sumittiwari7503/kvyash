import React from "react";

export const metadata = {
  title: "Privacy Policy | KVYASH Technologies",
  description:
    "Read KVYASH Technologies' privacy policy regarding lead collection, data protection, and customer confidentiality.",
  alternates: {
    canonical: "https://kvyash.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-white dark:bg-navy-950 min-h-screen transition-colors duration-300">
      <section className="bg-slate-50/70 dark:bg-navy-900/50 border-b border-slate-200/80 dark:border-navy-800 pt-36 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <div className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60 uppercase tracking-wider">
            Legal & Trust
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Last updated: August 10, 2026
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white dark:bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
          <p>
            This Privacy Policy explains how KVYASH Technologies (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and safeguards information when you access or use our website.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            1. Information We Collect
          </h2>
          <p>
            We only collect data that you voluntarily provide to us when initiating a project enquiry or interacting with our services. The information we collect may include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><strong>Identification Details:</strong> Full Name.</li>
            <li><strong>Contact Details:</strong> Business Email and Phone Number (if voluntarily supplied).</li>
            <li><strong>Organization Details:</strong> Company/Organization name (if supplied).</li>
            <li><strong>Project Details:</strong> Service category, project requirements, timeline, and budget information submitted through the project-scoping flow.</li>
            <li><strong>Feedback Information:</strong> Review submission information, where applicable.</li>
            <li><strong>Technical Data:</strong> Standard technical information that our hosting platform (Hostinger) may process to securely serve the website.</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            2. Contact Forms & Chatbot
          </h2>
          <p>
            Users may submit project information through our Contact form or via the KVYASH Assistant project-scoping flow. Submitted project information is used strictly to understand your requirements, respond to your enquiries, prepare project discussions, and communicate regarding requested services.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            3. Email Processing
          </h2>
          <p>
            When you submit a contact or scoping form, we use transactional email service providers to process and deliver your submission to our team securely.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            4. Cookies & Local Storage
          </h2>
          <p>
            We distinguish between essential functionality and optional cookies:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><strong>Essential Functionality:</strong> We use local storage to maintain necessary website features, such as remembering your theme preferences, cookie consent status, and preserving interactive assistant state during your active session.</li>
            <li><strong>Analytics & Tracking:</strong> We do not deploy third-party marketing cookies or tracking pixels for advertising purposes.</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            5. Data Sharing
          </h2>
          <p>
            We do not sell your personal information. We only share information with:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><strong>Service Providers:</strong> Vendors used to operate our website, such as hosting infrastructure and transactional email gateways.</li>
            <li><strong>Legal Authorities:</strong> When reasonably necessary to comply with applicable law, regulation, legal process, or governmental request.</li>
          </ul>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            6. Security Safeguards
          </h2>
          <p>
            We use reasonable technical and organizational safeguards designed to protect the information we collect. However, no security system is impenetrable, and we cannot guarantee the absolute security of data transmitted over the internet.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            7. Data Retention
          </h2>
          <p>
            We retain information only for as long as reasonably necessary for the purpose for which it was collected, legitimate business requirements, legal obligations, or dispute resolution.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            8. User Rights
          </h2>
          <p>
            Subject to applicable law, you may have the right to request access to the personal information we hold about you, request corrections to inaccurate data, or request the deletion of your data. To exercise these rights, please contact us.
          </p>

          <h2 className="text-lg font-bold text-navy-900 dark:text-white pt-4 border-t border-slate-100 dark:border-navy-800">
            9. Contact Us
          </h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact us at: <strong>kvyashtechnologies@gmail.com</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
