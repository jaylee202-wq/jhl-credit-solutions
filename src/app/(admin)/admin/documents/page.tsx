import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Documents",
  robots: { index: false, follow: false },
};

export default function AdminDocumentsPage() {
  return (
    <AdminPlaceholderPage
      path="/admin/documents"
      title="Documents"
      description="Review, manage, and process client documents stored in secure private storage with audit logging."
    />
  );
}
