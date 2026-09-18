import type { Metadata } from "next";
import { PortalPlaceholderPage } from "@/components/portal/PortalPlaceholderPage";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

export default function PortalMessagesPage() {
  return (
    <PortalPlaceholderPage
      path="/portal/messages"
      title="Messages"
      description="Communicate securely with your assigned team. Message history and notifications will be available here."
    />
  );
}
