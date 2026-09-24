"use client";

import React, { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const emptySubscribe = () => () => {};

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function getThemeSnapshot(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const observer = new MutationObserver(() => callback());
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const isMounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light" as const);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("kvyash-theme", nextTheme);
    } catch {
      // storage unavailable
    }
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!isMounted) {
    return (
      <button
        type="button"
        className={`p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 transition-colors opacity-60 ${className}`}
        aria-label="Toggle theme"
      >
        <span className="h-4 w-4 block" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-navy-900/80 text-slate-700 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer shadow-sm group ${className}`}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 text-slate-700" />
      ) : (
        <Sun className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 text-amber-400" />
      )}
    </button>
  );
}
