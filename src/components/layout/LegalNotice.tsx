import { cn } from "@/lib/utils";

interface LegalNoticeProps {
  children?: React.ReactNode;
  className?: string;
}

export function LegalNotice({ children, className }: LegalNoticeProps) {
  return (
    <aside
      className={cn(
        "rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-muted",
        className,
      )}
      role="note"
    >
      <p className="font-medium text-navy">Draft — Pending Final Review</p>
      <p className="mt-1 leading-relaxed">
        {children ??
          "This content is provided as a placeholder and requires final legal and compliance review before publication."}
      </p>
    </aside>
  );
}
