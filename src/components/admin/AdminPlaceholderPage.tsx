import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";

interface AdminPlaceholderPageProps {
  title: string;
  description: string;
  path: string;
}

export function AdminPlaceholderPage({
  title,
  description,
  path,
}: AdminPlaceholderPageProps) {
  return (
    <AdminShell currentPath={path} title={title}>
      <Card>
        <p className="text-muted leading-relaxed">{description}</p>
        <p className="mt-4 text-sm text-muted">
          This section requires admin authentication, role-based access control,
          and backend services — none of which are implemented in this version.
        </p>
      </Card>
    </AdminShell>
  );
}
