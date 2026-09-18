import Link from "next/link";
import { cn } from "@/lib/utils";

interface AdminNavItem {
  href: string;
  label: string;
}

const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/clients", label: "Active Clients" },
  { href: "/admin/documents", label: "Documents" },
  { href: "/admin/agreements", label: "Agreements" },
  { href: "/admin/workflow", label: "Workflow" },
  { href: "/admin/billing", label: "Billing" },
  { href: "/admin/activity", label: "Activity History" },
];

interface AdminShellProps {
  children: React.ReactNode;
  currentPath: string;
  title: string;
}

export function AdminShell({
  children,
  currentPath,
  title,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-navy border-b border-navy-light px-4 py-2 text-center text-sm text-white/80">
        <strong>Development Preview:</strong> Admin authentication, RBAC, and
        backend functionality are not yet implemented.
      </div>

      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-navy-dark lg:block">
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">
              Admin Portal
            </p>
          </div>
          <nav aria-label="Admin navigation">
            <ul className="space-y-0.5 px-3 pb-6">
              {ADMIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      currentPath === item.href
                        ? "bg-gold text-navy-dark"
                        : "text-white/70 hover:bg-white/10 hover:text-white",
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

export { ADMIN_NAV };
