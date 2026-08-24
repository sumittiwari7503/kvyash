import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
 className?: string;
 isFooter?: boolean;
}

export default function Logo({ className = "", isFooter = false }: LogoProps) {
 // Define dimensions based on Navbar vs. Footer specifications
 const widthStyle = isFooter
 ? "w-[145px] md:w-[170px]" // Footer mobile: 145px, desktop: 170px
 : "w-[140px] sm:w-[160px] lg:w-[180px]"; // Navbar mobile: 140px, tablet: 160px, desktop: 180px
 
 const heightStyle = isFooter
 ? "max-h-[50px]"
 : "max-h-[44px] sm:max-h-[48px] lg:max-h-[52px]"; // Navbar max-heights to keep vertical breathing room

 return (
 <Link href="/" className={`inline-flex items-center ${className}`} aria-label="KVYASH Technologies Home">
 <Image
 src="/logo.png"
 alt="KVYASH Technologies"
 width={813}
 height={233}
 className={`${widthStyle} ${heightStyle} h-auto object-contain`}
 priority
 />
 </Link>
 );
}
