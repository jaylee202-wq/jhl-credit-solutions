import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const SITE_DESCRIPTION =
  "Personalized credit restoration and credit education services designed to help you understand your credit, address inaccuracies, and work toward stronger financial opportunities.";

export const SOCIAL_PREVIEW_IMAGE = {
  url: "/images/jhl-credit-solutions-social-preview.png",
  width: 1200,
  height: 630,
  alt: "JHL Credit Solutions — Building Credit. Creating Opportunities.",
} as const;

/** Public routes included in the XML sitemap (and valid for indexing). */
export const PUBLIC_SITEMAP_PATHS = [
  "/",
  "/services",
  "/how-it-works",
  "/about",
  "/faq",
  "/get-started",
  "/contact",
  "/privacy",
  "/terms",
  "/disclosures",
] as const;

export function absoluteUrl(path: string = "/"): string {
  const base = SITE.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

function fullDocumentTitle(pageTitle: string, absoluteTitle?: string): string {
  if (absoluteTitle) return absoluteTitle;
  if (pageTitle.includes(SITE.name)) return pageTitle;
  return `${pageTitle} | ${SITE.name}`;
}

/**
 * Page-level metadata with correct canonical + page-specific OG/Twitter.
 * Do not set a root-layout homepage-only canonical.
 */
export function createPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  /** When set, bypasses the root `%s | Site` title template (e.g. homepage). */
  absoluteTitle?: string;
}): Metadata {
  const { title, description, path, absoluteTitle } = options;
  const url = absoluteUrl(path);
  const ogTitle = fullDocumentTitle(title, absoluteTitle);

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE.name,
      title: ogTitle,
      description,
      images: [SOCIAL_PREVIEW_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [SOCIAL_PREVIEW_IMAGE.url],
    },
  };
}

/** Official company website (Organization identity). */
export const ORGANIZATION_URL = "https://jhlcreditsolutions.com";

/** Founder personal site — Person URL only, never the company website. */
export const FOUNDER = {
  name: "Jay Hunter Lee",
  jobTitle: "Founder & CEO",
  url: "https://jayhunterlee.com",
} as const;

/**
 * Single Organization JSON-LD for the site.
 * Company website stays on jhlcreditsolutions.com; founder Person uses
 * jayhunterlee.com. Does not invent certifications, ratings, or social profiles.
 */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: "JHL Credit Solutions, LLC",
    url: ORGANIZATION_URL,
    email: SITE.email,
    description: SITE_DESCRIPTION,
    slogan: SITE.tagline,
    logo: `${ORGANIZATION_URL}/images/logo.png`,
    founder: {
      "@type": "Person",
      name: FOUNDER.name,
      url: FOUNDER.url,
      jobTitle: FOUNDER.jobTitle,
    },
    address: {
      "@type": "PostalAddress",
      name: "Business Mailing Address",
      streetAddress: "PO Box 3264",
      addressLocality: "Seminole",
      addressRegion: "FL",
      postalCode: "33775-3264",
      addressCountry: "US",
    },
  };
}
