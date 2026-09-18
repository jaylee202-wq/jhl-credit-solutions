import type { Metadata } from "next";
import { PortalPlaceholderPage } from "@/components/portal/PortalPlaceholderPage";

export const metadata: Metadata = {
  title: "Billing",
  robots: { index: false, follow: false },
};

export default function PortalBillingPage() {
  return (
    <PortalPlaceholderPage
      path="/portal/billing"
      title="Billing"
      description="View billing status and manage payment methods through a compliant, tokenized payment provider. Raw card data will never be stored on our servers."
    />
  );
}
