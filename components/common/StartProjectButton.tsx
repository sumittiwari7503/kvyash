"use client";

import React from "react";

interface StartProjectButtonProps {
 className?: string;
 intent?: string;
 children: React.ReactNode;
}

export default function StartProjectButton({ className, intent, children }: StartProjectButtonProps) {
 const handleClick = () => {
 if (typeof window !== "undefined") {
 window.dispatchEvent(new CustomEvent("kvyash:start-project", { detail: { intent } }));
 }
 };

 return (
 <button type="button" onClick={handleClick} className={className}>
 {children}
 </button>
 );
}
