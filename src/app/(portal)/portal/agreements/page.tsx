import type { Metadata } from "next";
import { PortalPlaceholderPage } from "@/components/portal/PortalPlaceholderPage";

export const metadata: Metadata = {
  title: "Agreements",
  robots: { index: false, follow: false },
};

export default function PortalAgreementsPage() {
  return (
    <PortalPlaceholderPage
      path="/portal/agreements"
      title="Agreements"
      description="View and sign service agreements. E-signature integration is planned for a future release."
    />
  );
}
