"use client";

import React, { useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight, Loader2, Star } from "lucide-react";

interface ReviewForm {
  name: string;
  email: string;
  company: string;
  role: string;
  service: string;
  rating: number;
  review: string;
  photoUrl: string;
  photoConsent: boolean;
  website: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  service?: string;
  rating?: string;
  review?: string;
}

export default function SubmitReviewPage() {
  const [form, setForm] = useState<ReviewForm>({
    name: "",
    email: "",
    company: "",
    role: "",
    service: "",
    rating: 5,
    review: "",
    photoUrl: "",
    photoConsent: false,
    website: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    
    if (!form.name.trim()) {
      tempErrors.name = "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      tempErrors.email = "Work email is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      tempErrors.email = "Please enter a valid work email address.";
    }

    if (!form.company.trim()) {
      tempErrors.company = "Organization name is required.";
    }

    if (!form.role.trim()) {
      tempErrors.role = "Role/designation is required.";
    }

    if (!form.service.trim()) {
      tempErrors.service = "Project service category is required.";
    }

    if (form.rating < 1 || form.rating > 5) {
      tempErrors.rating = "Rating must be between 1 and 5 stars.";
    }

    if (!form.review.trim()) {
      tempErrors.review = "Review text is required.";
    } else if (form.review.trim().length < 10) {
      tempErrors.review = "Review description must be at least 10 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleStarKeyDown = (e: React.KeyboardEvent, star: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const nextRating = Math.min(5, star + 1);
      setForm((prev) => ({ ...prev, rating: nextRating }));
      document.getElementById(`star-rating-${nextRating}`)?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prevRating = Math.max(1, star - 1);
      setForm((prev) => ({ ...prev, rating: prevRating }));
      document.getElementById(`star-rating-${prevRating}`)?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setForm({
          name: "",
          email: "",
          company: "",
          role: "",
          service: "",
          rating: 5,
          review: "",
          photoUrl: "",
          photoConsent: false,
          website: ""
        });
      } else {
        setSubmitError(data.message || "Failed to submit your review. Please try again.");
      }
    } catch {
      setSubmitError("A network error occurred. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans text-navy-900 bg-white min-h-screen">
      <section className="bg-slate-50 border-b border-slate-100 pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6">
          <span className="inline-flex self-center items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-500 border border-brand-100 uppercase tracking-wide">
            Feedback
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-navy-900">
            Submit Client Feedback
          </h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
            Only genuine project collaborators should submit feedback. All submissions are manually reviewed before publication.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-premium">
            {isSuccess ? (
              <div className="flex flex-col items-center text-center gap-6 py-12">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand-50 text-brand-500">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-1">Feedback Submitted</h3>
                  <p className="text-slate-600 text-xs max-w-sm leading-relaxed">
                    Thank you. Your feedback has been received and is pending verification.
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="inline-flex items-center justify-center px-5 py-2 rounded-md border border-slate-200 bg-white text-navy-900 text-xs font-semibold hover:bg-slate-50 transition-premium cursor-pointer"
                >
                  Submit another review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <h3 className="text-sm font-bold text-navy-900 border-b border-slate-100 pb-2 mb-2">
                  Verification & Details
                </h3>

                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-lg flex items-center gap-2" role="alert">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Honeypot */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Aman Sharma"
                      required
                      className={`text-xs bg-slate-50 border rounded px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium ${
                        errors.name ? "border-red-500 bg-red-50/20" : "border-slate-200"
                      }`}
                    />
                    {errors.name && <span className="text-[10px] text-red-500 mt-0.5">{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. aman@company.com"
                      required
                      className={`text-xs bg-slate-50 border rounded px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium ${
                        errors.email ? "border-red-500 bg-red-50/20" : "border-slate-200"
                      }`}
                    />
                    <span className="text-[9px] text-slate-500 leading-tight">
                      Your email address is used for internal verification and will not be displayed publicly.
                    </span>
                    {errors.email && <span className="text-[10px] text-red-500 mt-0.5">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                      Organization / Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corp"
                      required
                      className={`text-xs bg-slate-50 border rounded px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium ${
                        errors.company ? "border-red-500 bg-red-50/20" : "border-slate-200"
                      }`}
                    />
                    {errors.company && <span className="text-[10px] text-red-500 mt-0.5">{errors.company}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="role" className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                      Your Role / Designation *
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="e.g. Lead Designer"
                      required
                      className={`text-xs bg-slate-50 border rounded px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium ${
                        errors.role ? "border-red-500 bg-red-50/20" : "border-slate-200"
                      }`}
                    />
                    {errors.role && <span className="text-[10px] text-red-500 mt-0.5">{errors.role}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                    Service / Collaboration Type *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className={`text-xs bg-slate-50 border rounded px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium ${
                      errors.service ? "border-red-500 bg-red-50/20" : "border-slate-200"
                    }`}
                  >
                    <option value="">Select project type...</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="AI Solutions">AI Solutions</option>
                    <option value="Process Automation">Process Automation</option>
                    <option value="SaaS Development">SaaS Development</option>
                  </select>
                  {errors.service && <span className="text-[10px] text-red-500 mt-0.5">{errors.service}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider" id="star-rating-label">
                    Collaboration Rating *
                  </label>
                  <div 
                    className="flex items-center gap-1.5 py-1"
                    role="radiogroup"
                    aria-labelledby="star-rating-label"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        id={`star-rating-${star}`}
                        type="button"
                        role="radio"
                        aria-checked={form.rating === star}
                        aria-label={`Rate ${star} out of 5 stars`}
                        onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onKeyDown={(e) => handleStarKeyDown(e, star)}
                        className="text-slate-300 hover:scale-110 focus:outline-none focus:text-amber-500 transition-premium shrink-0 cursor-pointer"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            (hoverRating || form.rating) >= star
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && <span className="text-[10px] text-red-500">{errors.rating}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="review" className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                    Review Description *
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    rows={4}
                    value={form.review}
                    onChange={handleChange}
                    placeholder="Describe your project, team dynamics, communication, and engineering quality..."
                    required
                    className={`text-xs bg-slate-50 border rounded px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium resize-none ${
                      errors.review ? "border-red-500 bg-red-50/20" : "border-slate-200"
                    }`}
                  />
                  {errors.review && <span className="text-[10px] text-red-500 mt-0.5">{errors.review}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="photoUrl" className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                    Profile Photo URL <span className="text-slate-400 font-medium">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="photoUrl"
                    name="photoUrl"
                    value={form.photoUrl}
                    onChange={handleChange}
                    placeholder="e.g. https://linkedin.com/in/.../photo.jpg"
                    className="text-xs bg-slate-50 border border-slate-200 rounded px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-premium"
                  />
                  <span className="text-[9px] text-slate-500 leading-tight">
                    Your photo will only be displayed publicly if you explicitly provide consent below.
                  </span>
                </div>

                <div className="flex items-start gap-2.5 py-1">
                  <input
                    type="checkbox"
                    id="photoConsent"
                    name="photoConsent"
                    checked={form.photoConsent}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="photoConsent" className="text-[11px] text-slate-500 leading-normal">
                    I consent to displaying my profile photo on the website alongside my review.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 inline-flex items-center justify-center px-5 py-3 rounded bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-400 transition-premium cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                      Submitting review...
                    </>
                  ) : (
                    <>
                      Submit Review for Verification
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
