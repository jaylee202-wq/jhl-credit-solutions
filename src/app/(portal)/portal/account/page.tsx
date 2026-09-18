import type { Metadata } from "next";
import { PortalPlaceholderPage } from "@/components/portal/PortalPlaceholderPage";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default function PortalAccountPage() {
  return (
    <PortalPlaceholderPage
      path="/portal/account"
      title="Account & Profile"
      description="Manage your account settings, contact information, and notification preferences."
    />
  );
}
