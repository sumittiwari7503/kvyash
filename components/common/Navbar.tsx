"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { headerNavItems } from "@/config/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Lock scroll when mobile menu is open
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "shadow-sm py-2 bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50" 
            : "py-3 bg-white dark:bg-[#090d16] border-slate-100 dark:border-slate-800/20"
        }`}
      >
        <div className="max-w-[1300px] mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {headerNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-premium hover:text-brand-500 dark:hover:text-brand-400 ${
                      isActive 
                        ? "text-brand-500 font-semibold" 
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA & Theme Toggle Button */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 active:scale-[0.98] transition-premium shadow-sm shadow-brand-500/20"
              >
                {"Let's Talk"}
              </Link>
            </div>

            {/* Mobile Actions: Theme Toggle + Menu Toggle */}
            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-900 focus:outline-none transition-premium cursor-pointer"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close main menu" : "Open main menu"}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 bottom-0 z-[60] w-full max-w-sm bg-white dark:bg-[#0c1321] p-6 shadow-xl md:hidden transition-transform duration-300 ease-in-out border-l border-slate-100 dark:border-slate-800/80 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 focus:outline-none cursor-pointer"
            aria-label="Close main menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 mb-8">
          {headerNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium py-2 border-b border-slate-50 dark:border-slate-800/40 transition-premium hover:text-brand-500 dark:hover:text-brand-400 ${
                  isActive 
                    ? "text-brand-500 font-semibold" 
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center w-full px-5 py-3 rounded-md bg-brand-500 text-white text-base font-semibold hover:bg-brand-600 active:scale-[0.98] transition-premium shadow-sm shadow-brand-500/20"
        >
          {"Let's Talk"}
        </Link>
      </div>
    </>
  );
}
