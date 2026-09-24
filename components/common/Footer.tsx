import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import StartProjectButton from "./StartProjectButton";
import { footerSections } from "@/config/navigation";
import companyData from "@/config/company.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100/60 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Studio Statement & Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <Logo isFooter />
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              An independent software engineering and digital product studio. We architect, design, and build production web applications, SaaS platforms, and intelligent business workflows.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium pt-2">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-brand-500" />
                <a href={`mailto:${companyData.email}`} className="text-navy-900 dark:text-slate-200 font-semibold hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {companyData.email}
                </a>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-brand-500" />
                <strong className="text-navy-900 dark:text-slate-200 font-semibold">{companyData.location}</strong>
              </span>
            </div>
          </div>
          
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-7 rounded-3xl shadow-xs flex flex-col justify-between gap-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 block mb-1">
                Project Scoping
              </span>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white leading-snug">
                Have something worth building?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 leading-relaxed">
                Describe your project, custom application requirements, or automation goals to get a structured engineering blueprint.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <StartProjectButton
                intent="BUILD_SOMETHING"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-navy-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer group"
              >
                <span>Scope Your Project</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </StartProjectButton>
              <Link
                href="/contact"
                className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white px-3 py-2 transition-colors"
              >
                Direct Inquiry →
              </Link>
            </div>
          </div>
        </div>

        {/* Directory Links Grid (5-column layout on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-14 border-b border-slate-200/80 dark:border-slate-800/80">
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3.5">
              <h4 className="text-navy-900 dark:text-white font-bold text-xs tracking-wider uppercase">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors text-xs font-medium inline-flex items-center gap-1 group"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors text-xs font-medium"
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

        {/* Bottom Studio Metadata & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} {companyData.name}. All rights reserved. • Founded by Sumit Tiwari</p>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <Link href="/privacy-policy" className="hover:text-navy-900 dark:hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-navy-900 dark:hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-navy-900 dark:hover:text-white transition-colors">Cookies</Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-navy-900 dark:hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
