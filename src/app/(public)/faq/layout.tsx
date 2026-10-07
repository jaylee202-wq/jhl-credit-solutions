import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/faq",
  title: "FAQ",
  description:
    "Frequently asked questions about JHL Credit Solutions credit assessment, education, and restoration services — including timelines, costs, and what to expect.",
});

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
