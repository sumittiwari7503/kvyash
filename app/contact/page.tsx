import React from "react";
import ContactClient from "./ContactClient";

export const metadata = {
  title: {
    absolute: "KVYASH Technologies | Contact"
  },
  description: "Connect with KVYASH Technologies. Request a digital solution scoping session, ask questions, or start technology consulting project.",
  alternates: {
    canonical: "https://kvyash.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
