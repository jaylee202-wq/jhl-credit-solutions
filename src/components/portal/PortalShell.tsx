import Link from "next/link";
import { cn } from "@/lib/utils";

interface PortalNavItem {
  href: string;
  label: string;
}

const PORTAL_NAV: PortalNavItem[] = [
  { href: "/portal", label: "Dashboard" },
  { href: "/portal/documents", label: "Documents" },
  { href: "/portal/agreements", label: "Agreements" },
  { href: "/portal/progress", label: "Progress" },
  { href: "/portal/messages", label: "Messages" },
  { href: "/portal/billing", label: "Billing" },
  { href: "/portal/receipts", label: "Receipts" },
  { href: "/portal/account", label: "Account" },
];

interface PortalShellProps {
  children: React.ReactNode;
  currentPath: string;
  title: string;
}

export function PortalShell({
  children,
  currentPath,
  title,
}: PortalShellProps) {
  return (
    <div className="min-h-screen bg-surface">
      {/* Placeholder banner — authentication not yet implemented */}
      <div className="bg-gold/10 border-b border-gold/30 px-4 py-2 text-center text-sm text-navy">
        <strong>Development Preview:</strong> Client portal authentication and
        backend functionality are not yet implemented.
      </div>

      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:block">
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
              Client Portal
            </p>
          </div>
          <nav aria-label="Portal navigation">
            <ul className="space-y-0.5 px-3 pb-6">
              {PORTAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      currentPath === item.href
                        ? "bg-navy text-white"
                        : "text-navy hover:bg-surface",
                    )}
                    aria-current={
                      currentPath === item.href ? "page" : undefined
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-8">
          <h1 className="font-serif text-2xl font-bold text-navy">{title}</h1>
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

export { PORTAL_NAV };
