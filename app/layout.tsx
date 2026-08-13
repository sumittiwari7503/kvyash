import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Chatbot from "@/components/common/Chatbot";
import CookieBanner from "@/components/common/CookieBanner";
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
      <body className="min-h-full flex flex-col bg-white text-navy-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Chatbot />
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}
