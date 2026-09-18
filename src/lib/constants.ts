export const SITE = {
  name: "JHL Credit Solutions",
  tagline: "Building Credit. Creating Opportunities.",
  domain: "jhlcreditsolutions.com",
  email: "hello@jhlcreditsolutions.com",
  url: "https://jhlcreditsolutions.com",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/get-started", label: "Get Started" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/faq", label: "FAQ" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/disclosures", label: "Disclosures" },
  ],
} as const;

export const CREDIT_GOALS = [
  "Improve overall credit profile",
  "Prepare for a major purchase (home, vehicle, etc.)",
  "Address inaccurate or questionable items",
  "Build credit history",
  "Better understand my credit reports",
  "Other",
] as const;

export const CREDIT_CONCERNS = [
  "Late payments or collections",
  "Identity theft or fraud",
  "High credit utilization",
  "Limited credit history",
  "Inaccurate information on reports",
  "Not sure where to start",
  "Other",
] as const;

export const REPORT_REVIEW_OPTIONS = [
  { value: "yes-recent", label: "Yes, within the last 3 months" },
  { value: "yes-older", label: "Yes, but more than 3 months ago" },
  { value: "no", label: "No, I have not reviewed them recently" },
  { value: "unsure", label: "I'm not sure" },
] as const;
