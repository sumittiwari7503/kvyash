"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import StartProjectButton from "./StartProjectButton";
import ThemeToggle from "./ThemeToggle";
import { headerNavItems } from "@/config/navigation";

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
            ? "py-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs"
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
            <nav className="hidden xl:flex items-center gap-0.5 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/70 p-1 rounded-full backdrop-blur-sm">
              {headerNavItems.map((item) => {
                const isActive = pathname === item.href || (item.href.startsWith("/resources") && pathname.startsWith("/resources"));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-white dark:bg-slate-800 text-navy-900 dark:text-white shadow-2xs font-bold"
                        : "text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions: Theme Toggle, Let's Talk & Start a Project */}
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                href="/contact"
                className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-navy-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
              >
                Let&apos;s Talk
              </Link>
              <ThemeToggle />
              <StartProjectButton
                intent="BUILD_SOMETHING"
                className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-navy-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer group"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </StartProjectButton>
            </div>

            {/* Mobile Actions: Theme Toggle & Menu Toggle */}
            <div className="flex xl:hidden items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-navy-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs xl:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 bottom-0 z-55 w-full max-w-sm bg-white dark:bg-slate-950 p-6 shadow-2xl xl:hidden flex flex-col justify-between transition-transform duration-300 ease-out border-l border-slate-200 dark:border-slate-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
            <Logo />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full text-slate-500 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close main menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col py-6 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">
              Studio Navigation
            </span>
            {headerNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href.startsWith("/resources") && pathname.startsWith("/resources"));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 text-base font-semibold rounded-xl transition-colors ${
                    isActive
                      ? "bg-slate-100 dark:bg-slate-800/80 text-brand-600 dark:text-brand-400 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
          <StartProjectButton
            intent="BUILD_SOMETHING"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-navy-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-navy-900 text-sm font-bold shadow-sm cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </StartProjectButton>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            Let&apos;s Talk
          </Link>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-1">
            Greater Noida • Noida • Delhi NCR • Global
          </p>
        </div>
      </div>
    </>
  );
}
