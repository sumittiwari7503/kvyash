import React from "react";

export const metadata = {
 title: "Privacy Policy",
 description: "Read KVYASH Technologies' privacy policies regarding lead collection and customer confidentiality.",
};

export default function PrivacyPolicyPage() {
 return (
 <div className="font-sans text-navy-900 bg-white">
 <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-16 md:pt-40 md:pb-20">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
 <h1 className="text-4xl font-extrabold tracking-tight text-navy-900">Privacy Policy</h1>
 <p className="text-slate-500 text-sm">Last updated: August 10, 2026</p>
 </div>
 </section>

 <section className="py-20 bg-white">
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 leading-relaxed space-y-6">
 <p>
 This Privacy Policy explains how KVYASH Technologies (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and discloses information about you when you access or use our website.
 </p>
 
 <h3 className="text-lg font-bold text-navy-900 pt-4">1. Information We Collect</h3>
 <p>
 We only collect data that you voluntarily provide to us when initiating a project enquiry or interacting with our services. The information we collect may include:
 </p>
 <ul className="list-disc pl-5 space-y-1.5 mt-2">
 <li><strong>Identification Details:</strong> Full Name.</li>
 <li><strong>Contact Details:</strong> Business Email and Phone Number (if voluntarily supplied).</li>
 <li><strong>Organization Details:</strong> Company/Organization name (if supplied).</li>
 <li><strong>Project Details:</strong> Service category, project requirements, timeline, and budget information submitted through the project-scoping flow.</li>
 <li><strong>Feedback Information:</strong> Review submission information, where applicable.</li>
 <li><strong>Technical Data:</strong> Standard technical information that our hosting platform (Vercel) may process to securely serve the website.</li>
 </ul>
 
 <h3 className="text-lg font-bold text-navy-900 pt-4">2. Contact Forms & Chatbot</h3>
 <p>
 Users may submit project information through our Contact form or via the KVYASH Assistant project-scoping flow. Submitted project information is used strictly to understand your requirements, respond to your enquiries, prepare project discussions, and communicate regarding the requested services.
 </p>

 <h3 className="text-lg font-bold text-navy-900 pt-4">3. Email Processing</h3>
 <p>
 When you submit a contact or scoping form, we use Resend as a transactional email service provider to process and deliver your submission to our team securely. Resend acts as a data processor for these emails.
 </p>
 
 <h3 className="text-lg font-bold text-navy-900 pt-4">4. Cookies</h3>
 <p>
 We distinguish between essential functionality and optional cookies:
 </p>
 <ul className="list-disc pl-5 space-y-1.5 mt-2">
 <li><strong>Essential Functionality:</strong> We use local storage to maintain necessary website features, such as remembering your cookie preferences and preserving the chatbot state during your active session.</li>
 <li><strong>Analytics & Tracking:</strong> We do not currently deploy Google Analytics, tracking pixels, or third-party marketing cookies on this website. Your activity on our site is not tracked for advertising purposes.</li>
 </ul>

 <h3 className="text-lg font-bold text-navy-900 pt-4">5. Data Sharing</h3>
 <p>
 We do not sell your personal information. We only share information with:
 </p>
 <ul className="list-disc pl-5 space-y-1.5 mt-2">
 <li><strong>Service Providers:</strong> Vendors actually used to operate our website, such as our hosting infrastructure and transactional email providers.</li>
 <li><strong>Legal Authorities:</strong> When reasonably necessary to comply with applicable law, regulation, legal process, or governmental request.</li>
 </ul>
 
 <h3 className="text-lg font-bold text-navy-900 pt-4">6. Security</h3>
 <p>
 We use reasonable technical and organizational safeguards designed to protect the information we collect. However, no security system is impenetrable, and we cannot guarantee the absolute security of data transmitted over the internet.
 </p>

 <h3 className="text-lg font-bold text-navy-900 pt-4">7. Data Retention</h3>
 <p>
 We retain information only for as long as reasonably necessary for the purpose for which it was collected, legitimate business requirements, legal obligations, or dispute resolution.
 </p>

 <h3 className="text-lg font-bold text-navy-900 pt-4">8. User Rights</h3>
 <p>
 Subject to applicable law, you may have the right to request access to the personal information we hold about you, request corrections to inaccurate data, or request the deletion of your data. To exercise these rights or ask questions about your personal information, please contact us.
 </p>

 <h3 className="text-lg font-bold text-navy-900 pt-4">9. Policy Changes</h3>
 <p>
 We may update this Privacy Policy from time to time to reflect changes in our website functionality or applicable legal requirements. We encourage you to review this policy periodically.
 </p>
 
 <h3 className="text-lg font-bold text-navy-900 pt-4">10. Contact Us</h3>
 <p>
 If you have any questions regarding this Privacy Policy, please contact us at: <strong>kvyashtechnologies@gmail.com</strong>.
 </p>
 </div>
 </section>
 </div>
 );
}
