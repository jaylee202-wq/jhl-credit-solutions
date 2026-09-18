import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SITE } from "@/lib/constants";
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

const SITE_TITLE = `${SITE.name} | ${SITE.tagline}`;
const SITE_DESCRIPTION =
  "Personalized credit restoration and credit education services designed to help you understand your credit, address inaccuracies, and work toward stronger financial opportunities.";
const SOCIAL_PREVIEW_IMAGE = {
  url: "/images/jhl-credit-solutions-social-preview.png",
  width: 1200,
  height: 630,
  alt: "JHL Credit Solutions — Building Credit. Creating Opportunities.",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE.url,
  },
  keywords: [
    "credit restoration",
    "credit education",
    "credit repair",
    "financial literacy",
    "credit solutions",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SOCIAL_PREVIEW_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
        {children}
      </body>
    </html>
  );
}
