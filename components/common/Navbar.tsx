"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { headerNavItems } from "@/config/navigation";

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
 ? "shadow-sm py-2 bg-white/80 backdrop-blur-md border-slate-200/50" 
 : "py-4 bg-white/0 border-transparent"
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
 className={`text-sm font-medium transition-premium hover:text-brand-500 relative py-1 group ${
 isActive 
 ? "text-brand-500 font-semibold" 
 : "text-slate-600"
 }`}
 >
 {item.label}
 {/* Subtle underline hover effect */}
 <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 ${
 isActive ? "scale-x-100" : ""
 }`} />
 </Link>
 );
 })}
 </nav>

 {/* Desktop CTA */}
 <div className="hidden md:flex items-center gap-4">
 <Link
 href="/contact"
 className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 shadow-sm shadow-brand-500/20 group"
 >
 <span>{"Let's Talk"}</span>
 <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 ml-1">→</span>
 </Link>
 </div>

 {/* Mobile Actions: Menu Toggle */}
 <div className="flex md:hidden items-center gap-3">
 <button
 type="button"
 onClick={() => setIsOpen(!isOpen)}
 className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-brand-500 hover:bg-slate-50 focus:outline-none transition-premium cursor-pointer"
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
 className={`fixed inset-0 z-[55] bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
 isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
 }`}
 onClick={() => setIsOpen(false)}
 />

 {/* Mobile Drawer panel */}
 <div
 id="mobile-menu"
 className={`fixed top-0 right-0 bottom-0 z-[60] w-full max-w-sm bg-white p-6 shadow-xl md:hidden transition-transform duration-300 ease-in-out border-l border-slate-100 ${
 isOpen ? "translate-x-0" : "translate-x-full"
 }`}
 >
 <div className="flex items-center justify-between mb-8">
 <Logo />
 <button
 type="button"
 onClick={() => setIsOpen(false)}
 className="p-2 rounded-md text-slate-600 hover:text-brand-500 focus:outline-none cursor-pointer"
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
 className={`text-lg font-medium py-2 border-b border-slate-50 transition-premium hover:text-brand-500 ${
 isActive 
 ? "text-brand-500 font-semibold" 
 : "text-slate-600"
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
