import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SITE } from "@/lib/constants";
import { SITE_DESCRIPTION, SOCIAL_PREVIEW_IMAGE } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const SITE_TITLE = `${SITE.name} | Credit Restoration and Credit Education`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "credit restoration",
    "credit education",
    "credit repair",
    "financial literacy",
    "credit solutions",
  ],
  // Shared defaults only — page-specific title/description/canonical/url
  // are set via createPageMetadata() on each public route.
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    images: [SOCIAL_PREVIEW_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [SOCIAL_PREVIEW_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
