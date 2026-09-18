import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Activity History",
  robots: { index: false, follow: false },
};

export default function AdminActivityPage() {
  return (
    <AdminPlaceholderPage
      path="/admin/activity"
      title="Activity History"
      description="Audit log of system activity including status changes, document uploads, payments, and internal notes. Supports compliance and accountability requirements."
    />
  );
}
