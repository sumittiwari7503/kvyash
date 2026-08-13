import React from "react";

export const metadata = {
  title: "Disclaimer",
  description: "Read KVYASH Technologies' disclaimer regarding website content, B2B services, project scoping, and third-party systems.",
};

export default function DisclaimerPage() {
  return (
    <div className="font-sans text-navy-900 bg-white">
      <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-navy-900">Disclaimer</h1>
          <p className="text-slate-500 text-sm">Last updated: August 10, 2026</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 leading-relaxed space-y-6">
          <p>
            The information provided by KVYASH Technologies (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on this website is for general informational and business purposes only. All information is provided in good faith, however, we make no representation or warranty of any kind regarding its accuracy, adequacy, validity, reliability, or completeness.
          </p>

          <h3 className="text-lg font-bold text-navy-900 pt-4">1. No Guaranteed Outcomes</h3>
          <p>
            We do not guarantee any specific business outcomes as a result of using our services. Specifically, we make no guarantees regarding search engine rankings, revenue generation, sales, leads, conversions, business growth, investment returns, or specific performance metrics.
          </p>

          <h3 className="text-lg font-bold text-navy-900 pt-4">2. Software Development</h3>
          <p>
            Project outcomes depend heavily on the specific requirements, ongoing communication, and technical constraints. Third-party services, hosting environments, and APIs can affect system behavior. Any estimates regarding timelines, costs, or technical architectures discussed during initial enquiries may change significantly after detailed discovery.
          </p>

          <h3 className="text-lg font-bold text-navy-900 pt-4">3. AI Systems</h3>
          <p>
            For services involving Artificial Intelligence (AI) and automation: AI-generated output may occasionally be inaccurate or inappropriate. All AI systems require appropriate human oversight. Customers are strictly responsible for validating any AI-generated outputs before using them to make important business, legal, or financial decisions. Furthermore, AI integrations depend on third-party APIs and their continuous service availability.
          </p>

          <h3 className="text-lg font-bold text-navy-900 pt-4">4. Marketing & SEO</h3>
          <p>
            Any Search Engine Optimization (SEO) or digital marketing services discussed cannot guarantee specific ranking positions, website traffic levels, conversions, or revenue. Search algorithms are controlled by third parties and change frequently.
          </p>

          <h3 className="text-lg font-bold text-navy-900 pt-4">5. Third-Party Services</h3>
          <p>
            Our website and the products we build may integrate with third-party services, such as hosting providers (e.g., Vercel), email providers (e.g., Resend), and social platforms (e.g., LinkedIn, Instagram). We have no control over and assume no responsibility for the content, privacy policies, uptime, or practices of any third-party sites or services.
          </p>

          <h3 className="text-lg font-bold text-navy-900 pt-4">6. External Links</h3>
          <p>
            This website may contain links to external websites. KVYASH Technologies is not responsible for the content, security, or privacy policies of those external websites.
          </p>
          
          <h3 className="text-lg font-bold text-navy-900 pt-4">7. Client Responsibility</h3>
          <p>
            Clients are solely responsible for the accuracy of the information they provide to us, the ownership and licensing of any supplied content, the legal compliance of their business operations, securing permissions for processing their customers&apos; data, and the security of third-party accounts they control.
          </p>

          <h3 className="text-lg font-bold text-navy-900 pt-4">8. No Professional Advice</h3>
          <p>
            The technology and marketing information provided on this website does not constitute legal, financial, tax, medical, or professional advice. You should consult with appropriate professionals before making any decisions based on information on this site.
          </p>

          <h3 className="text-lg font-bold text-navy-900 pt-4">9. Limitation of Liability</h3>
          <p>
            In no event shall KVYASH Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website or our services.
          </p>
        </div>
      </section>
    </div>
  );
}
