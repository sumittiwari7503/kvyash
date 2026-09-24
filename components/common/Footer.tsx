import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import StartProjectButton from "./StartProjectButton";
import { footerSections } from "@/config/navigation";
import companyData from "@/config/company.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Studio Statement & Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-200">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <Logo isFooter />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              An independent software engineering and digital product studio. We architect, design, and build production web applications, SaaS platforms, and intelligent business workflows.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium pt-2">
              <span>Direct Email: <a href={`mailto:${companyData.email}`} className="text-navy-900 font-semibold hover:text-brand-600 underline underline-offset-2">{companyData.email}</a></span>
              <span>•</span>
              <span>Location: <strong className="text-navy-900 font-semibold">{companyData.location}</strong></span>
            </div>
          </div>
          
          <div className="lg:col-span-5 bg-white border border-slate-200/90 p-6 sm:p-7 rounded-2xl shadow-xs flex flex-col justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600 block mb-1">
                Project Scoping
              </span>
              <h3 className="text-lg font-bold text-navy-900">
                Have something worth building?
              </h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Describe your project, application requirements, or automation goals with our interactive assistant.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <StartProjectButton
                intent="BUILD_SOMETHING"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-navy-900 hover:bg-black text-white text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer group"
              >
                <span>Scope Your Project</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </StartProjectButton>
              <Link
                href="/contact"
                className="text-xs font-semibold text-slate-600 hover:text-navy-900 px-3 py-2 transition-colors"
              >
                Direct Inquiry →
              </Link>
            </div>
          </div>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-slate-200/80">
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3.5">
              <h4 className="text-navy-900 font-bold text-xs tracking-wider uppercase">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  const isAbout = link.href === "/about";
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-navy-900 transition-colors text-xs font-medium inline-flex items-center gap-1 group"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          prefetch={isAbout ? false : undefined}
                          className="text-slate-600 hover:text-navy-900 transition-colors text-xs font-medium"
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {companyData.name}. All rights reserved. • Founded by Sumit Tiwari</p>
          <div className="flex items-center gap-4 text-slate-500">
            <Link href="/privacy-policy" className="hover:text-navy-900 transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-navy-900 transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-navy-900 transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
