"use client";

import React, { useState, useEffect } from "react";

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
 className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white border border-slate-200 rounded-xl p-5 shadow-premium flex flex-col gap-4 animate-premium duration-300"
 role="dialog" 
 aria-label="Cookie Consent Banner"
 >
 <div className="flex flex-col gap-1.5">
 <h4 className="text-sm font-bold text-navy-900 ">Cookie Preferences</h4>
 <p className="text-slate-600 text-xs leading-relaxed">
 We use essential cookies to verify contact form submissions and secure user sessions. We do not use third-party advertising or marketing trackers.
 </p>
 </div>

 {showPreferences ? (
 <div className="flex flex-col gap-3 pt-2 border-t border-slate-100 ">
 <div className="flex items-center justify-between text-xs">
 <span className="font-semibold text-navy-900 ">Essential Cookies</span>
 <span className="text-slate-400 font-medium">Always Active</span>
 </div>
 <div className="flex items-center justify-between text-xs">
 <span className="font-semibold text-navy-900 ">Optional Analytics</span>
 <label className="relative inline-flex items-center cursor-pointer">
 <input 
 type="checkbox" 
 checked={analyticsConsent} 
 onChange={(e) => setAnalyticsConsent(e.target.checked)}
 className="sr-only peer" 
 />
 <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-500"></div>
 </label>
 </div>
 <div className="flex gap-2.5 mt-2">
 <button
 onClick={handleSavePreferences}
 className="flex-1 text-center py-2 rounded bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold transition-premium cursor-pointer"
 >
 Save Choices
 </button>
 <button
 onClick={() => setShowPreferences(false)}
 className="px-3 py-2 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-premium cursor-pointer"
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
 className="flex-1 text-center py-2.5 rounded bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold transition-premium cursor-pointer shadow-sm"
 >
 Accept All
 </button>
 <button
 onClick={handleRejectOptional}
 className="flex-1 text-center py-2.5 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-premium cursor-pointer"
 >
 Reject Optional
 </button>
 </div>
 <button
 onClick={() => setShowPreferences(true)}
 className="text-center text-[10px] font-bold text-slate-400 hover:text-brand-500 transition-premium uppercase tracking-wider cursor-pointer"
 >
 Customize Preferences
 </button>
 </div>
 )}
 </div>
 );
}
