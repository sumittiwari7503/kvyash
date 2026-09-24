export interface NavItem {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}

export const headerNavItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Web Development", href: "/web-development" },
  { label: "AI & Automation", href: "/ai-automation" },
  { label: "Resources", href: "/resources/custom-web-application-development" },
  { label: "About", href: "/about" },
];

export const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Work & Case Studies", href: "/work" },
      { label: "Project Scoping", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Custom Web Development", href: "/web-development" },
      { label: "AI & Workflow Automation", href: "/ai-automation" },
      { label: "Technology Consulting", href: "/services#consulting" },
      { label: "SaaS & Marketplace Engineering", href: "/services#marketplace-saas" },
      { label: "Business Systems Integration", href: "/solutions" },
      { label: "Digital Transformation", href: "/services#offline-online" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Web App Architecture Guide", href: "/resources/custom-web-application-development" },
      { label: "SaaS Development India", href: "/resources/saas-development-india" },
      { label: "WhatsApp CRM Engineering", href: "/resources/whatsapp-crm-development" },
      { label: "AI Automation for Business", href: "/resources/ai-automation-for-businesses" },
    ],
  },
  {
    title: "Legal & Trust",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Client Feedback", href: "/submit-review" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/kvyash-technologies/?viewAsMember=true" },
      { label: "Instagram", href: "https://www.instagram.com/kvyashtechnologies/" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61593152129252&mibextid=wwXIfr&rdid=J5OmuVjX2vhYEwrr&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BYthtVV3P%2F%3Fmibextid%3DwwXIfr#" },
      { label: "X", href: "https://x.com/kvyashtechnolog" },
    ],
  },
];
