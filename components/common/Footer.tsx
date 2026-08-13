import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import StartProjectButton from "./StartProjectButton";
import { footerSections } from "@/config/navigation";
import companyData from "@/config/company.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200/60 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Panel: Brand Intro & Action */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-200/60 mb-12">
          <div className="flex flex-col gap-4 max-w-xl">
            <Logo isFooter />
            <p className="text-slate-600 text-sm leading-relaxed">
              {companyData.description}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-slate-500 text-xs mt-1">
              <span>Email: <a href={`mailto:${companyData.email}`} className="hover:text-brand-500 transition-premium font-semibold">{companyData.email}</a></span>
              <span>Location: {companyData.location}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 bg-white border border-slate-200 p-5 rounded-xl shadow-sm shrink-0 w-full sm:w-auto">
            <span className="text-navy-950 font-bold text-xs uppercase tracking-wider block">Have a project in mind?</span>
            <span className="text-slate-500 text-[10px] leading-none mb-1 block">Scope it dynamically with KVYASH Assistant.</span>
            <StartProjectButton className="text-center text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 px-4 py-2.5 rounded transition-premium cursor-pointer shadow-sm">
              Start a Project
            </StartProjectButton>
          </div>
        </div>

        {/* 6-Column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-navy-900 font-bold text-xs tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-brand-500 transition-premium text-xs"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-slate-600 hover:text-brand-500 transition-premium text-xs"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright block */}
        <div className="border-t border-slate-200/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {companyData.name}. All rights reserved. | Founder: Sumit Tiwari</p>
          <p className="text-slate-400">
            We build thoughtful digital solutions that solve real business problems.
          </p>
        </div>
      </div>
    </footer>
  );
}
