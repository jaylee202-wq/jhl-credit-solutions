import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { AdminShell } from "@/components/admin/AdminShell";
import { PROGRESS_STAGES } from "@/lib/types/workflow";

export const metadata: Metadata = {
  title: "Workflow",
  robots: { index: false, follow: false },
};

export default function AdminWorkflowPage() {
  return (
    <AdminShell currentPath="/admin/workflow" title="Workflow Management">
      <Card>
        <p className="text-muted leading-relaxed mb-6">
          Manage client progress through defined workflow stages. Status changes
          will be logged for audit purposes.
        </p>
        <div className="flex flex-wrap gap-2">
          {PROGRESS_STAGES.map((stage) => (
            <span
              key={stage}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-navy"
            >
              {stage}
            </span>
          ))}
        </div>
      </Card>
    </AdminShell>
  );
}
