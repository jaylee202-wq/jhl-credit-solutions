import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-navy-dark text-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo.png"
              alt={`${SITE.name} logo`}
              width={160}
              height={80}
              className="h-14 w-auto sm:h-16"
            />
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/70 hover:text-gold transition-colors"
                >
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs text-white/50 leading-relaxed">
            &copy; {currentYear} {SITE.name}. All rights reserved. Information
            on this website is for general educational purposes and does not
            constitute a guarantee of any specific outcome.
          </p>
        </div>
      </Container>
    </footer>
  );
}
