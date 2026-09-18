import type { Metadata } from "next";
import { PortalPlaceholderPage } from "@/components/portal/PortalPlaceholderPage";

export const metadata: Metadata = {
  title: "Receipts",
  robots: { index: false, follow: false },
};

export default function PortalReceiptsPage() {
  return (
    <PortalPlaceholderPage
      path="/portal/receipts"
      title="Receipts"
      description="Access payment receipts and transaction history for your account."
    />
  );
}
