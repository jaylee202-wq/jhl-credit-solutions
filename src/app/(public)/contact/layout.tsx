import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Contact JHL Credit Solutions. Reach out with questions about our credit restoration and education services.",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
