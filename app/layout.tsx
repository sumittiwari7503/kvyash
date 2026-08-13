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
    default: `${companyData.name} | Thoughtful Digital Solutions`,
    template: `%s | ${companyData.name}`,
  },
  description: companyData.description,
  metadataBase: new URL("https://kvyash.com"),
  openGraph: {
    title: `${companyData.name} | Digital Solutions`,
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
