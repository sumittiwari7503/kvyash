export interface NavItem {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}

export const headerNavItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "AI & Automation", href: "/ai-automation" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
];

export const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services#development" },
      { label: "AI & Automation", href: "/ai-automation" },
      { label: "Consultancy", href: "/services#consulting" },
      { label: "Offline → Online", href: "/services#offline-online" },
      { label: "Marketplace/SaaS", href: "/services#marketplace-saas" },
      { label: "Marketing & Growth", href: "/services#marketing" },
    ],
  },

  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/kvyash-technologies/?viewAsMember=true" },
      { label: "Instagram", href: "https://www.instagram.com/kvyashtechnologies/" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61593152129252&mibextid=wwXIfr&rdid=J5OmuVjX2vhYEwrr&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BYthtVV3P%2F%3Fmibextid%3DwwXIfr#" },
      { label: "X", href: "https://x.com/kvyashtechnolog" },
    ],
  },
];
