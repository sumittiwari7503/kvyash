"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    // Read previous consent status on mount
    const consent = localStorage.getItem("kvyash-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("kvyash-cookie-consent", "all");
    localStorage.setItem("kvyash-analytics-consent", "true");
    setIsVisible(false);
  };

  const handleRejectOptional = () => {
    localStorage.setItem("kvyash-cookie-consent", "essential");
    localStorage.setItem("kvyash-analytics-consent", "false");
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("kvyash-cookie-consent", analyticsConsent ? "all" : "essential");
    localStorage.setItem("kvyash-analytics-consent", analyticsConsent ? "true" : "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 rounded-2xl p-5 shadow-lg flex flex-col gap-4 animate-fadeIn duration-300"
      role="dialog"
      aria-label="Cookie Consent Banner"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-500" />
          <h4 className="text-sm font-bold text-navy-900 dark:text-white">
            Privacy & Cookie Preferences
          </h4>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
          We use essential browser storage for security, session continuity, and theme preferences. We do not deploy third-party marketing or tracking cookies.
        </p>
      </div>

      {showPreferences ? (
        <div className="flex flex-col gap-3 pt-3 border-t border-slate-100 dark:border-navy-800">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-navy-900 dark:text-white">
              Essential Storage
            </span>
            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium">
              Always Active
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-navy-900 dark:text-white">
              Optional Analytics
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 dark:bg-navy-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-500" />
            </label>
          </div>

          <div className="flex gap-2.5 mt-2">
            <button
              onClick={handleSavePreferences}
              className="flex-1 text-center py-2 rounded-lg bg-brand-600 hover:bg-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              Save Choices
            </button>
            <button
              onClick={() => setShowPreferences(false)}
              className="px-3 py-2 border border-slate-300 dark:border-navy-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800 text-xs font-semibold transition-all cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-2">
            <button
              onClick={handleAcceptAll}
              className="flex-1 text-center py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectOptional}
              className="flex-1 text-center py-2.5 border border-slate-300 dark:border-navy-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800 text-xs font-semibold transition-all cursor-pointer"
            >
              Essential Only
            </button>
          </div>
          <button
            onClick={() => setShowPreferences(true)}
            className="text-center text-[10px] font-bold text-slate-400 hover:text-brand-500 transition-colors uppercase tracking-wider cursor-pointer"
          >
            Customize Preferences
          </button>
        </div>
      )}
    </div>
  );
}
