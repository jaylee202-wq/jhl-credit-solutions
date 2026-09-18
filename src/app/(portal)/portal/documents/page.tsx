import type { Metadata } from "next";
import { PortalPlaceholderPage } from "@/components/portal/PortalPlaceholderPage";

export const metadata: Metadata = {
  title: "Documents",
  robots: { index: false, follow: false },
};

export default function PortalDocumentsPage() {
  return (
    <PortalPlaceholderPage
      path="/portal/documents"
      title="Documents"
      description="Securely upload and access credit-related documents. Documents will be stored in private, encrypted storage — never in public directories."
    />
  );
}
