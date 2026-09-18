import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Agreements",
  robots: { index: false, follow: false },
};

export default function AdminAgreementsPage() {
  return (
    <AdminPlaceholderPage
      path="/admin/agreements"
      title="Agreements"
      description="Manage client service agreements, track signature status, and handle agreement lifecycle."
    />
  );
}
