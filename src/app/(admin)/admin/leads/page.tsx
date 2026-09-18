import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return (
    <AdminPlaceholderPage
      path="/admin/leads"
      title="Leads"
      description="View and manage credit assessment submissions and prospective clients. Includes lead status tracking and assignment."
    />
  );
}
