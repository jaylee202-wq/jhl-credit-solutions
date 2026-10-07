import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Use h1 for the primary page heading; h2 for in-page sections. */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
        className,
      )}
    >
      <HeadingTag className="font-serif text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        {title}
      </HeadingTag>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-muted mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-4 h-0.5 w-16 bg-gold",
          align === "center" ? "mx-auto" : "",
        )}
        aria-hidden="true"
      />
    </div>
  );
}
