import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Chatbot from "@/components/common/Chatbot";
import CookieBanner from "@/components/common/CookieBanner";
import ScrollRevealProvider from "@/components/common/ScrollRevealProvider";
import companyData from "@/config/company.json";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: {
 default: companyData.name,
 template: `%s | ${companyData.name}`,
 },
 description: companyData.description,
 metadataBase: new URL("https://kvyash.com"),
 icons: {
 icon: [
 { url: "/favicon.ico", sizes: "any" },
 { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
 { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
 { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
 { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
 ],
 apple: [
 { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
 ],
 },
 verification: {
 google: "jXaXpv5g0bjsfHhDyYStTlo65aTri8tCqou3FU6LpBo",
 },
 openGraph: {
 title: companyData.name,
 description: companyData.description,
 url: "https://kvyash.com",
 siteName: companyData.name,
 locale: "en_US",
 type: "website",
 },
 twitter: {
 card: "summary_large_image",
 title: companyData.name,
 description: companyData.description,
 },
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html
 lang="en"
 className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
 >
 <head>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Organization",
 "@id": "https://kvyash.com/#organization",
 "name": "KVYASH Technologies",
 "url": "https://kvyash.com",
 "logo": {
 "@type": "ImageObject",
 "@id": "https://kvyash.com/#logo",
 "url": "https://kvyash.com/logo.png",
 "caption": "KVYASH Technologies Logo"
 },
 "contactPoint": {
 "@type": "ContactPoint",
 "email": "kvyashtechnologies@gmail.com",
 "contactType": "customer service"
 },
 "sameAs": [
 "https://www.linkedin.com/company/kvyash-technologies/?viewAsMember=true",
 "https://www.instagram.com/kvyashtechnologies/",
 "https://www.facebook.com/profile.php?id=61593152129252&mibextid=wwXIfr&rdid=J5OmuVjX2vhYEwrr&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BYthtVV3P%2F%3Fmibextid%3DwwXIfr#",
 "https://x.com/kvyashtechnolog"
 ]
 },
 {
 "@type": "WebSite",
 "@id": "https://kvyash.com/#website",
 "url": "https://kvyash.com",
 "name": "KVYASH Technologies",
 "publisher": {
 "@id": "https://kvyash.com/#organization"
 }
 }
 ]
 })
 }}
 />
 </head>
 <body className="min-h-full flex flex-col bg-white text-navy-900 antialiased">
 <ScrollRevealProvider />
 <Navbar />
 <main className="flex-1">{children}</main>
 <Chatbot />
 <CookieBanner />
 <Footer />
 </body>
 </html>
 );
}
