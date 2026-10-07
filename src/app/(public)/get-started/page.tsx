import { CreditAssessmentForm } from "@/components/forms/CreditAssessmentForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/get-started",
  title: "Get Started",
  description:
    "Begin your free credit assessment with JHL Credit Solutions. No payment or sensitive information required.",
});

export default function GetStartedPage() {
  return (
    <Container className="py-12 lg:py-20">
      <SectionHeading
        as="h1"
        title="Start Your Credit Assessment"
        subtitle="Tell us about your credit goals and concerns. This initial assessment is free, requires no payment, and helps us understand whether we may be able to assist you."
      />

      <div className="mx-auto max-w-2xl">
        <Card className="mb-8 border-gold/20 bg-gold/5">
          <h3 className="font-serif text-lg font-bold text-navy">
            What to Expect
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold" aria-hidden="true">
                1.
              </span>
              Complete the form below with your contact information and credit
              goals.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold" aria-hidden="true">
                2.
              </span>
              A team member will review your submission and reach out to
              discuss next steps.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold font-bold" aria-hidden="true">
                3.
              </span>
              If our services may be a good fit after consultation, we&apos;ll
              explain potential next steps — no pressure, no obligation.
            </li>
          </ul>
        </Card>

        <CreditAssessmentForm />
      </div>
    </Container>
  );
}
