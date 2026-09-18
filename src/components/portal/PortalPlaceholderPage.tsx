import { PortalShell } from "@/components/portal/PortalShell";
import { Card } from "@/components/ui/Card";
import { PROGRESS_STAGES } from "@/lib/types/workflow";

interface PlaceholderPageProps {
  title: string;
  description: string;
  path: string;
}

export function PortalPlaceholderPage({
  title,
  description,
  path,
}: PlaceholderPageProps) {
  return (
    <PortalShell currentPath={path} title={title}>
      <Card>
        <p className="text-muted leading-relaxed">{description}</p>
        <p className="mt-4 text-sm text-muted">
          This section will be available once secure authentication and backend
          services are implemented.
        </p>
      </Card>
    </PortalShell>
  );
}

export function ProgressPlaceholder() {
  return (
    <PortalShell currentPath="/portal/progress" title="Progress">
      <Card>
        <p className="text-muted leading-relaxed mb-6">
          Track your enrollment and service progress through defined workflow
          stages. Outcomes vary and no specific result is guaranteed.
        </p>
        <ol className="space-y-3">
          {PROGRESS_STAGES.map((stage, index) => (
            <li
              key={stage}
              className="flex items-center gap-3 rounded-lg border border-border px-4 py-3"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  index === 0
                    ? "bg-gold text-navy-dark"
                    : "bg-surface text-muted"
                }`}
              >
                {index + 1}
              </span>
              <span className="text-sm text-navy">{stage}</span>
              {index === 0 && (
                <span className="ml-auto text-xs font-medium text-gold-dark">
                  Current (Preview)
                </span>
              )}
            </li>
          ))}
        </ol>
      </Card>
    </PortalShell>
  );
}
