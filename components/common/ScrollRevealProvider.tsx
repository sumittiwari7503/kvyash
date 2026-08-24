"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealProvider() {
 const pathname = usePathname();

 useEffect(() => {
 // Check user accessibility preference
 const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if (prefersReduced) {
 document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
 el.classList.add("revealed");
 });
 return;
 }

 const observerOptions = {
 root: null,
 rootMargin: "0px 0px -50px 0px", // Trigger when element is 50px into the viewport
 threshold: 0.1,
 };

 const observer = new IntersectionObserver((entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 entry.target.classList.add("revealed");
 observer.unobserve(entry.target);
 }
 });
 }, observerOptions);

 const elements = document.querySelectorAll(".reveal-on-scroll");
 elements.forEach((el) => observer.observe(el));

 return () => {
 observer.disconnect();
 };
 }, [pathname]);

 return null;
}
