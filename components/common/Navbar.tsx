"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import StartProjectButton from "./StartProjectButton";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Web Dev", href: "/web-development" },
  { label: "Solutions", href: "/solutions" },
  { label: "AI & Automation", href: "/ai-automation" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Logo />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 border border-slate-200/60 p-1 rounded-full backdrop-blur-sm">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-white text-navy-900 shadow-xs font-bold"
                        : "text-slate-600 hover:text-navy-900 hover:bg-white/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <StartProjectButton
                intent="BUILD_SOMETHING"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy-900 hover:bg-black text-white text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer group"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </StartProjectButton>
            </div>

            {/* Mobile Actions: Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <StartProjectButton
                intent="BUILD_SOMETHING"
                className="sm:hidden inline-flex items-center px-3 py-1.5 rounded-full bg-navy-900 text-white text-[11px] font-bold cursor-pointer"
              >
                Start
              </StartProjectButton>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-navy-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close main menu" : "Open main menu"}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-xs lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 bottom-0 z-55 w-full max-w-sm bg-white p-6 shadow-2xl lg:hidden flex flex-col justify-between transition-transform duration-300 ease-out border-l border-slate-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <Logo />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close main menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col py-6 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
              Studio Navigation
            </span>
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 text-base font-semibold rounded-lg transition-colors ${
                    isActive
                      ? "bg-slate-100 text-brand-600 font-bold"
                      : "text-slate-700 hover:text-navy-900 hover:bg-slate-50"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
          <StartProjectButton
            intent="BUILD_SOMETHING"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-navy-900 text-white text-sm font-bold shadow-sm cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </StartProjectButton>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Contact Engineering Team
          </Link>
          <p className="text-[11px] text-slate-400 text-center mt-1">
            Greater Noida • Noida • Delhi NCR • Global
          </p>
        </div>
      </div>
    </>
  );
}
