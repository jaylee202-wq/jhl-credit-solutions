import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Active Clients",
  robots: { index: false, follow: false },
};

export default function AdminClientsPage() {
  return (
    <AdminPlaceholderPage
      path="/admin/clients"
      title="Active Clients"
      description="Manage enrolled client records, view client details, and track service status across all active accounts."
    />
  );
}
