import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <AdminShell currentPath="/admin" title="Admin Overview">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "New Leads", value: "—" },
          { label: "Active Clients", value: "—" },
          { label: "Pending Documents", value: "—" },
          { label: "Open Tasks", value: "—" },
        ].map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-1 font-serif text-xl font-bold text-navy">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <p className="text-muted leading-relaxed">
          Administrator dashboard for managing leads, clients, documents,
          workflow, billing, and internal operations. Requires authenticated
          admin role with full RBAC enforcement.
        </p>
      </Card>
    </AdminShell>
  );
}
