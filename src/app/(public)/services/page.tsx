import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/services",
  title: "Services",
  description:
    "Explore credit assessment, education, and restoration coordination services from JHL Credit Solutions.",
});

const SERVICES = [
  {
    title: "Credit Assessment",
    description:
      "An initial evaluation of your credit situation to help determine whether our services may be appropriate for your goals — with no payment required upfront.",
    features: [
      "Review of your stated credit goals",
      "Discussion of primary concerns",
      "Overview of potential next steps",
      "No obligation to proceed",
    ],
  },
  {
    title: "Credit Education",
    description:
      "Resources and guidance to help you understand how credit works, what factors affect your profile, and how to make informed financial decisions.",
    features: [
      "Credit fundamentals and best practices",
      "Understanding credit reports and scores",
      "Strategies for building positive credit history",
      "General credit-building education",
    ],
  },
  {
    title: "Credit Restoration Coordination",
    description:
      "When credit restoration services are appropriate, JHL coordinates professional assistance that may include credit report review, identification of potential inaccuracies or areas requiring further review, personalized service recommendations, and legitimate dispute assistance where applicable — with technical fulfillment handled by an experienced credit restoration specialist working with JHL.",
    features: [
      "Credit report review",
      "Identification of potential inaccuracies or areas requiring further review",
      "Personalized service recommendations",
      "Coordination of credit restoration services",
      "Legitimate dispute assistance where appropriate",
      "Progress support",
    ],
  },
];

export default function ServicesPage() {
  return (
    <Container className="py-12 lg:py-20">
      <SectionHeading
        as="h1"
        title="Our Services"
        subtitle="Credit assessment, education, and restoration coordination services designed to help you understand your credit and explore appropriate next steps."
      />

      <div className="space-y-8">
        {SERVICES.map((service) => (
          <Card key={service.title} className="lg:p-8">
            <h3 className="font-serif text-2xl font-bold text-navy">
              {service.title}
            </h3>
            <p className="mt-3 text-muted leading-relaxed">
              {service.description}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-navy"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <aside className="mt-10 rounded-lg border border-border bg-surface px-6 py-4 text-sm text-muted">
        <p>
          Results vary based on individual circumstances. We do not guarantee
          the removal of any specific item or any particular credit score
          increase. Accurate, verifiable negative information generally cannot be
          removed. Pricing is based on your individual credit profile and the
          scope of services recommended.
        </p>
      </aside>

      <div className="mt-10 text-center">
        <ButtonLink href="/get-started" size="lg">
          Start Your Credit Assessment
        </ButtonLink>
      </div>
    </Container>
  );
}
