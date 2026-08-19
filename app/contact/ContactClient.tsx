"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertCircle, ArrowRight, Loader2, Mail, MapPin } from "lucide-react";
import companyData from "@/config/company.json";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  website: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

const servicesList = [
  { label: "Web Development", value: "web-development" },
  { label: "Custom Software", value: "custom-software" },
  { label: "AI-Powered Solutions", value: "ai-solutions" },
  { label: "AI & Business Automation", value: "business-automation" },
  { label: "SaaS Development", value: "saas-development" },
  { label: "Application Development", value: "application-development" },
  { label: "Other (Please specify)", value: "other" }
];

const faqs = [
  {
    q: "What happens after I submit an inquiry?",
    a: "Our engineering team will review your system parameters and reach out via email to schedule a 30-minute scoping call."
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDAs)?",
    a: "Yes. We sign standard NDAs before scoping calls to protect your proprietary business concepts and data systems."
  },
  {
    q: "How do you scope project costs?",
    a: "We work with you to define exact feature lists and deliverables, delivering fixed-scope timelines and sprint-based prices."
  }
];

function ContactForm() {
  const searchParams = useSearchParams();
  
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    website: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Pre-fill service dropdown from URL search parameter (e.g. /contact?service=ai-solutions)
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam && servicesList.some((s) => s.value === serviceParam) && form.service !== serviceParam) {
      const timer = setTimeout(() => {
        setForm((prev) => ({ ...prev, service: serviceParam }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams, form.service]);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    
    if (!form.name.trim()) {
      tempErrors.name = "Name is required.";
    } else if (form.name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      tempErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^\+?[0-9\s\-()]{7,18}$/;
    if (!form.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(form.phone.trim())) {
      tempErrors.phone = "Please enter a valid phone number (7 to 18 characters).";
    }

    if (!form.service) {
      tempErrors.service = "Please select a service category.";
    }

    if (!form.message.trim()) {
      tempErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsSuccess(true);
        setForm({ name: "", email: "", phone: "", company: "", service: "", message: "", website: "" });
      } else if (response.status === 501) {
        setSubmitError("Your enquiry has been prepared successfully, but live email delivery is not configured yet.");
      } else {
        setSubmitError(data.message || "Unable to send your enquiry right now. Please try again.");
      }
    } catch {
      setSubmitError("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans text-navy-900 bg-white">
      
      {/* 1. Header Hero */}
      <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <span className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-wide">
            Inquiry
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900">
            {"Let's discuss your project scope."}
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {"Share your technical parameters, timelines, or operational friction points. Submit your project details and our team will review your enquiry."}
          </p>
        </div>
      </section>

      {/* 2. Form & FAQ split section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-premium">
              {isSuccess ? (
                <div className="flex flex-col items-center text-center gap-6 py-12 animate-premium duration-300">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-50 text-brand-500">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy-900 mb-2">{"Enquiry Sent Successfully"}</h3>
                    <p className="text-slate-600 text-sm max-w-md leading-relaxed">
                      {"Thank you for contacting KVYASH Technologies. We have received your enquiry and will get back to you soon."}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-slate-200 bg-white text-navy-900 text-sm font-semibold hover:bg-slate-50 transition-premium cursor-pointer"
                  >
                    {"Submit another enquiry"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                  <h3 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-3 mb-2">Project Intake Form</h3>
                  
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg flex items-center gap-2" role="alert" aria-live="assertive">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Honeypot field for bot protection */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`text-sm bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium ${
                        errors.name ? "border-red-500 bg-red-50/20" : "border-slate-200"
                      }`}
                    />
                    {errors.name && (
                      <span id="name-error" className="text-xs text-red-500 flex items-center gap-1 mt-0.5" role="alert">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`text-sm bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium ${
                          errors.email ? "border-red-500 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                      {errors.email && (
                        <span id="email-error" className="text-xs text-red-500 flex items-center gap-1 mt-0.5" role="alert">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={`text-sm bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium ${
                          errors.phone ? "border-red-500 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                      {errors.phone && (
                        <span id="phone-error" className="text-xs text-red-500 flex items-center gap-1 mt-0.5" role="alert">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Organization & Service Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                        Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Enter your organization"
                        className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="service" className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                        Service Category *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.service}
                        aria-describedby={errors.service ? "service-error" : undefined}
                        className={`text-sm bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium ${
                          errors.service ? "border-red-500 bg-red-50/20" : "border-slate-200"
                        }`}
                      >
                        <option value="">Select service type...</option>
                        {servicesList.map((svc) => (
                          <option key={svc.value} value={svc.value}>
                            {svc.label}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <span id="service-error" className="text-xs text-red-500 flex items-center gap-1 mt-0.5" role="alert">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.service}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                      Project Requirements *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Outline your feature list, database requirements, goals, and any specific needs..."
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`text-sm bg-slate-50 border rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium resize-none ${
                        errors.message ? "border-red-500 bg-red-50/20" : "border-slate-200"
                      }`}
                    />
                    {errors.message && (
                      <span id="message-error" className="text-xs text-red-500 flex items-center gap-1 mt-0.5" role="alert">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-4 rounded-lg bg-brand-500 text-white font-semibold hover:bg-brand-600 active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-400 transition-premium shadow-md shadow-brand-500/10 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        {"Sending enquiry..."}
                      </>
                    ) : (
                      <>
                        {"Submit Scoping Enquiry"}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar FAQ Column */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              
              {/* Contact parameters card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-premium flex flex-col gap-5">
                <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-slate-200 pb-2">Company Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5 text-sm text-slate-600">
                    <Mail className="h-5 w-5 text-brand-500 shrink-0" />
                    <div>
                      <span className="block font-semibold text-navy-900 text-xs uppercase text-slate-400">Direct Scoping Inbox</span>
                      <a href={`mailto:${companyData.email}`} className="hover:text-brand-500 transition-premium">
                        {companyData.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5 text-sm text-slate-600">
                    <MapPin className="h-5 w-5 text-brand-500 shrink-0" />
                    <div>
                      <span className="block font-semibold text-navy-900 text-xs uppercase text-slate-400">Primary Location & Time</span>
                      <span>{companyData.location}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5 text-sm text-slate-600">
                    <svg className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.87c0-.26.05-.52.13-.7a.91.91 0 0 1 .84-.6c.6 0 .84.53.84 1.3v4.87h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.1H5v8.4h3z"/>
                    </svg>
                    <div>
                      <span className="block font-semibold text-navy-900 text-xs uppercase text-slate-400">LinkedIn</span>
                      <a
                        href="https://www.linkedin.com/company/kvyash-technologies/?viewAsMember=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-500 transition-premium"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5 text-sm text-slate-600">
                    <svg className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    <div>
                      <span className="block font-semibold text-navy-900 text-xs uppercase text-slate-400">Instagram</span>
                      <a
                        href="https://www.instagram.com/kvyashtechnologies/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-500 transition-premium"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5 text-sm text-slate-600">
                    <svg className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                    </svg>
                    <div>
                      <span className="block font-semibold text-navy-900 text-xs uppercase text-slate-400">Facebook</span>
                      <a
                        href="https://www.facebook.com/profile.php?id=61593152129252&mibextid=wwXIfr&rdid=J5OmuVjX2vhYEwrr&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BYthtVV3P%2F%3Fmibextid%3DwwXIfr#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-500 transition-premium"
                      >
                        Facebook
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5 text-sm text-slate-600">
                    <svg className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <div>
                      <span className="block font-semibold text-navy-900 text-xs uppercase text-slate-400">X (Twitter)</span>
                      <a
                        href="https://x.com/kvyashtechnolog"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-500 transition-premium"
                      >
                        @kvyashtechnolog
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scoping FAQ list */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider border-b border-slate-100 pb-2">Scoping FAQ</h4>
                {faqs.map((faq) => (
                  <div key={faq.q} className="space-y-1.5">
                    <h5 className="font-bold text-navy-900 text-sm">{faq.q}</h5>
                    <p className="text-slate-600 text-xs leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default function ContactClient() {
  return (
    <Suspense fallback={<div className="bg-white min-h-screen flex items-center justify-center text-slate-500">Loading scoping portal...</div>}>
      <ContactForm />
    </Suspense>
  );
}
