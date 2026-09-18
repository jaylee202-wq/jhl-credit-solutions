import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/PortalShell";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

export default function PortalDashboardPage() {
  return (
    <PortalShell currentPath="/portal" title="Dashboard">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Current Stage", value: "Enrollment" },
          { label: "Documents", value: "0 uploaded" },
          { label: "Messages", value: "0 unread" },
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
          Welcome to your client portal. Once fully implemented, this dashboard
          will provide an overview of your account status, recent activity, and
          next steps.
        </p>
      </Card>
    </PortalShell>
  );
}
