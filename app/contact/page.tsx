import React from "react";
import ContactClient from "./ContactClient";

export const metadata = {
  title: {
    absolute: "Contact & Project Scoping | KVYASH Technologies"
  },
  description: "Discuss your software, SaaS, or AI automation project with KVYASH Technologies. Submit your parameters for a technical scoping review and architecture plan.",
  alternates: {
    canonical: "https://kvyash.com/contact",
  },
};

export default function ContactPage() {
 return <ContactClient />;
}
