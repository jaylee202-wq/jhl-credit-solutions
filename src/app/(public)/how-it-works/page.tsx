import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how the JHL Credit Solutions process works — from initial assessment through ongoing support.",
};

const STEPS = [
  {
    step: "01",
    title: "Credit Assessment",
    description:
      "Start with an initial assessment so JHL can better understand your credit concerns, goals, and current situation. No payment or sensitive information is required at this stage.",
  },
  {
    step: "02",
    title: "Consultation",
    description:
      "JHL discusses your credit situation and goals and explains potential next steps.",
  },
  {
    step: "03",
    title: "Credit Review & Service Recommendation",
    description:
      "Your credit profile is reviewed to determine what type and amount of work may be appropriate.",
  },
  {
    step: "04",
    title: "Service Options & Pricing",
    description:
      "You receive the applicable service recommendation and pricing based on your individual credit situation and scope of work. You can then decide whether to proceed.",
  },
  {
    step: "05",
    title: "Credit Restoration Process",
    description:
      "Clients who proceed are connected with the credit restoration specialist handling the technical work associated with their file. The specialist communicates directly with you regarding necessary information, legitimate dispute activity where appropriate, responses, progress, and next steps.",
  },
  {
    step: "06",
    title: "Progress & Support",
    description:
      "The specialist continues managing the technical credit-restoration process and client communication related to the credit file, while JHL remains available for appropriate customer support.",
  },
];

export default function HowItWorksPage() {
  return (
    <Container className="py-12 lg:py-20">
      <SectionHeading
        title="How It Works"
        subtitle="A transparent, step-by-step approach to understanding your credit and exploring appropriate service options."
      />

      <div className="relative mx-auto max-w-3xl">
        <div
          className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold/30 hidden sm:block"
          aria-hidden="true"
        />
        <ol className="space-y-10">
          {STEPS.map((item) => (
            <li key={item.step} className="relative sm:pl-20">
              <div className="flex items-start gap-4 sm:absolute sm:left-0 sm:top-0">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-lg font-bold text-gold">
                  {item.step}
                </span>
              </div>
              <div className="sm:pt-2">
                <h3 className="font-serif text-xl font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <aside className="mx-auto mt-12 max-w-3xl rounded-lg border border-border bg-surface px-6 py-4 text-sm text-muted">
        <p>
          Timelines and outcomes vary. We do not guarantee specific results,
          score increases, or item removals. Each credit situation is unique.
          Pricing is based on individual circumstances and is explained before
          you decide whether to proceed.
        </p>
      </aside>

      <div className="mt-10 text-center">
        <ButtonLink href="/get-started" size="lg">
          Get Started Today
        </ButtonLink>
      </div>
    </Container>
  );
}
