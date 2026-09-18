import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Billing",
  robots: { index: false, follow: false },
};

export default function AdminBillingPage() {
  return (
    <AdminPlaceholderPage
      path="/admin/billing"
      title="Billing & Payments"
      description="Track payment status, manage billing schedules, and integrate with a tokenized payment provider. Pricing structure pending compliance review."
    />
  );
}
