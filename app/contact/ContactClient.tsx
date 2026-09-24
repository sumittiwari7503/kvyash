"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertCircle, ArrowRight, Loader2, Mail, MapPin, Sparkles, FileText, HelpCircle, ShieldCheck } from "lucide-react";
import companyData from "@/config/company.json";
import Chatbot from "@/components/common/Chatbot";

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
  { label: "Web Development & Next.js Systems", value: "web-development" },
  { label: "Custom Software & Architecture", value: "custom-software" },
  { label: "AI-Powered Solutions & Workflows", value: "ai-solutions" },
  { label: "AI & Business Automation", value: "business-automation" },
  { label: "SaaS Platform Development", value: "saas-development" },
  { label: "Web & Mobile Applications", value: "application-development" },
  { label: "Other Project Inquiry", value: "other" },
];

const faqs = [
  {
    q: "What happens after I submit a project inquiry?",
    a: "Our engineering team reviews your technical parameters, stack requirements, and deliverables within 1 business day. We reply directly with clarifying questions or a calendar invitation for an architectural scoping call.",
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDAs)?",
    a: "Yes. We execute mutual NDAs prior to detailed architectural scoping whenever proprietary business logic, data models, or pre-release prototypes are involved.",
  },
  {
    q: "How are project timelines and estimates calculated?",
    a: "We produce milestone-driven engineering blueprints with clear deliverables, schema contracts, sprint phases, and transparent sprint estimates.",
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "Your organization receives full ownership of all custom source code, repository commits, database schemas, and infrastructure configuration files upon project handover.",
  },
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
    website: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [contactMode, setContactMode] = useState<"chat" | "form">("chat");

  // Pre-fill service dropdown from URL search parameter (e.g. /contact?service=web-development)
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
      tempErrors.email = "Please enter a valid business email address.";
    }

    const phoneRegex = /^\+?[0-9\s\-()]{7,18}$/;
    if (!form.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(form.phone.trim())) {
      tempErrors.phone = "Please enter a valid phone number (7 to 18 digits).";
    }

    if (!form.service) {
      tempErrors.service = "Please select a service category.";
    }

    if (!form.message.trim()) {
      tempErrors.message = "Project requirements are required.";
    } else if (form.message.trim().length < 10) {
      tempErrors.message = "Please provide at least 10 characters detailing your scope.";
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
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
    <div className="font-sans text-navy-900 dark:text-slate-100 bg-white dark:bg-navy-950 transition-colors duration-300">
      {/* 1. Header Hero */}
      <section className="bg-slate-50/70 dark:bg-navy-900/50 border-b border-slate-200/80 dark:border-navy-800 pt-36 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
          <div className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60 uppercase tracking-wider reveal-on-scroll">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Direct Engineering Inquiry
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white reveal-on-scroll reveal-delay-100">
            Let&apos;s scope your technical system.
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed reveal-on-scroll reveal-delay-200">
            Share your system parameters, data flows, integration bottlenecks, or product vision. Work directly with senior engineers from day one.
          </p>
        </div>
      </section>

      {/* 2. Form & FAQ split section */}
      <section className="py-20 md:py-28 bg-white dark:bg-navy-950 border-b border-slate-100 dark:border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Main Interactive/Form Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 reveal-on-scroll">
              {/* Mode Switcher */}
              <div className="flex bg-slate-100 dark:bg-navy-900 p-1 rounded-xl self-start border border-slate-200/60 dark:border-navy-800">
                <button
                  type="button"
                  onClick={() => setContactMode("chat")}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    contactMode === "chat"
                      ? "bg-white dark:bg-navy-800 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/40 dark:border-navy-700"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Interactive Scoping Assistant
                </button>
                <button
                  type="button"
                  onClick={() => setContactMode("form")}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    contactMode === "form"
                      ? "bg-white dark:bg-navy-800 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/40 dark:border-navy-700"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Standard Intake Form
                </button>
              </div>

              {contactMode === "chat" ? (
                <div className="bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-2xl p-4 sm:p-6 shadow-sm overflow-hidden">
                  <Chatbot isInline={true} />
                </div>
              ) : (
                <div className="bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-2xl p-6 md:p-8 shadow-sm">
                  {isSuccess ? (
                    <div className="flex flex-col items-center text-center gap-6 py-12 animate-fadeIn">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">
                          Inquiry Received Successfully
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md leading-relaxed">
                          Thank you for contacting KVYASH Technologies. Our engineering team will review your requirements and reach out via email to schedule next steps.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-950 text-navy-900 dark:text-slate-100 text-xs font-bold hover:bg-slate-50 dark:hover:bg-navy-900 transition-all cursor-pointer"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-navy-800 pb-3">
                        <h3 className="text-base sm:text-lg font-bold text-navy-900 dark:text-white">
                          Project Specification Form
                        </h3>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                          * Required fields
                        </span>
                      </div>

                      {submitError && (
                        <div
                          className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-400 text-xs sm:text-sm rounded-lg flex items-center gap-2"
                          role="alert"
                          aria-live="assertive"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" />
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
                        <label htmlFor="name" className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Sumit Tiwari"
                          required
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={`text-sm bg-slate-50 dark:bg-navy-950 border rounded-lg px-4 py-3 text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:bg-white dark:focus:bg-navy-950 transition-all ${
                            errors.name ? "border-red-500 bg-red-50/20" : "border-slate-200 dark:border-navy-800"
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
                          <label htmlFor="email" className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="sumit@kvyash.com"
                            required
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className={`text-sm bg-slate-50 dark:bg-navy-950 border rounded-lg px-4 py-3 text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:bg-white dark:focus:bg-navy-950 transition-all ${
                              errors.email ? "border-red-500 bg-red-50/20" : "border-slate-200 dark:border-navy-800"
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
                          <label htmlFor="phone" className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                            className={`text-sm bg-slate-50 dark:bg-navy-950 border rounded-lg px-4 py-3 text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:bg-white dark:focus:bg-navy-950 transition-all ${
                              errors.phone ? "border-red-500 bg-red-50/20" : "border-slate-200 dark:border-navy-800"
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
                          <label htmlFor="company" className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                            Company / Organization
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Enterprise or Studio Name"
                            className="text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-lg px-4 py-3 text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:bg-white dark:focus:bg-navy-950 transition-all"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="service" className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider">
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
                            className={`text-sm bg-slate-50 dark:bg-navy-950 border rounded-lg px-4 py-3 text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:bg-white dark:focus:bg-navy-950 transition-all ${
                              errors.service ? "border-red-500 bg-red-50/20" : "border-slate-200 dark:border-navy-800"
                            }`}
                          >
                            <option value="" className="bg-white dark:bg-navy-900 text-slate-800 dark:text-slate-200">
                              Select project category...
                            </option>
                            {servicesList.map((svc) => (
                              <option
                                key={svc.value}
                                value={svc.value}
                                className="bg-white dark:bg-navy-900 text-slate-800 dark:text-slate-200"
                              >
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
                        <label htmlFor="message" className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                          Project Parameters & Scope *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Outline system deliverables, desired integrations, timelines, expected concurrency, and key technical expectations..."
                          required
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          className={`text-sm bg-slate-50 dark:bg-navy-950 border rounded-lg px-4 py-3 text-navy-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:bg-white dark:focus:bg-navy-950 transition-all resize-none ${
                            errors.message ? "border-red-500 bg-red-50/20" : "border-slate-200 dark:border-navy-800"
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
                        className="w-full inline-flex items-center justify-center px-6 py-4 rounded-lg bg-brand-600 hover:bg-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400 text-white font-semibold active:scale-[0.99] disabled:bg-slate-200 dark:disabled:bg-navy-800 disabled:text-slate-400 transition-all shadow-md shadow-brand-500/10 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Sending specification...
                          </>
                        ) : (
                          <>
                            Submit Project Specification
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Information Column */}
            <div className="lg:col-span-5 flex flex-col gap-8 reveal-on-scroll">
              {/* Studio Channels Card */}
              <div className="bg-slate-50/70 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-navy-800 pb-3">
                  <ShieldCheck className="w-4 h-4 text-brand-500" />
                  <h4 className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                    Direct Studio Channels
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3.5 text-sm">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-navy-950 border border-slate-200/60 dark:border-navy-800 text-brand-600 dark:text-brand-400 shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider">
                        Engineering Inbox
                      </span>
                      <a
                        href={`mailto:${companyData.email}`}
                        className="text-navy-900 dark:text-white font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        {companyData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 text-sm">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-navy-950 border border-slate-200/60 dark:border-navy-800 text-brand-600 dark:text-brand-400 shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider">
                        Studio Base
                      </span>
                      <span className="text-navy-900 dark:text-white font-medium">
                        {companyData.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-navy-800">
                  <span className="block font-semibold text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider mb-3">
                    Public Channels
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.linkedin.com/company/kvyash-technologies/?viewAsMember=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white dark:bg-navy-950 border border-slate-200/60 dark:border-navy-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://x.com/kvyashtechnolog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white dark:bg-navy-950 border border-slate-200/60 dark:border-navy-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      X (Twitter)
                    </a>
                    <a
                      href="https://www.instagram.com/kvyashtechnologies/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white dark:bg-navy-950 border border-slate-200/60 dark:border-navy-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61593152129252&mibextid=wwXIfr&rdid=J5OmuVjX2vhYEwrr&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BYthtVV3P%2F%3Fmibextid%3DwwXIfr#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white dark:bg-navy-950 border border-slate-200/60 dark:border-navy-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>

              {/* Scoping FAQ Card */}
              <div className="bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-navy-800 pb-3">
                  <HelpCircle className="w-4 h-4 text-brand-500" />
                  <h4 className="text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider">
                    Scoping & Engagement FAQ
                  </h4>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.q}
                      className="space-y-1.5 border-b border-slate-100 dark:border-navy-800/80 last:border-0 pb-4 last:pb-0"
                    >
                      <h5 className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm leading-snug">
                        {faq.q}
                      </h5>
                      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
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
    <Suspense
      fallback={
        <div className="bg-white dark:bg-navy-950 min-h-screen flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs">
          Loading scoping portal...
        </div>
      }
    >
      <ContactForm />
    </Suspense>
  );
}
