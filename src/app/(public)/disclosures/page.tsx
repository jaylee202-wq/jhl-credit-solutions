import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclosures",
  description: `Public consumer disclosures and credit rights information for ${SITE.name}.`,
};

export default function DisclosuresPage() {
  return (
    <Container className="py-12 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
          Disclosures
        </h1>
        <p className="mt-3 text-sm text-muted">
          Public educational disclosures for visitors of {SITE.name}.
        </p>

        <div className="mt-8 space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              Important Notice About This Page
            </h2>
            <p className="mt-2">
              This website disclosure page is for general public information and
              consumer education. It does <strong className="text-navy">not</strong>{" "}
              replace the formal federal or Florida disclosure statements,
              consumer credit-services contract, authorization forms, or
              cancellation notices that may be required before services begin.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              Your Credit Rights
            </h2>
            <p className="mt-2">
              Consumers have the right to dispute inaccurate information
              directly with consumer reporting agencies. Consumers can perform
              many credit-related actions themselves without hiring{" "}
              {SITE.name}.
            </p>
            <p className="mt-3">
              Accurate, current, and verifiable information cannot lawfully be
              removed merely because it is negative. {SITE.name} cannot
              guarantee deletion of information or a particular credit-score
              improvement. Credit restoration results vary.
            </p>
            <p className="mt-3">
              Consumers will receive applicable statutory disclosures and
              contractual documents before entering into paid services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              No Guarantees
            </h2>
            <p className="mt-2">
              {SITE.name} does not guarantee:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>A particular credit-score increase</li>
              <li>Deletion of a particular account or tradeline</li>
              <li>
                Removal of accurate, current, and verifiable negative
                information
              </li>
              <li>Approval for a mortgage, automobile loan, credit card, or other financing</li>
              <li>A particular interest rate</li>
              <li>A specific completion date</li>
              <li>Any other specific credit outcome</li>
            </ul>
            <p className="mt-3">
              Results vary depending on the individual credit profile, the
              accuracy and verifiability of reported information, responses from
              consumer reporting agencies and furnishers, consumer
              participation, and other circumstances.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              How Our Process Works
            </h2>
            <p className="mt-2">
              Consumers begin with {SITE.name} through a Credit Assessment and
              consultation. Pricing is individualized based on the consumer&apos;s
              credit profile and scope of services. The initial Credit Assessment
              is free and comes with no obligation. If you choose to proceed
              after consultation, pricing will be based on your individual credit
              profile and the scope of services recommended. Applicable pricing
              and service terms will be explained before you decide whether to
              proceed.
            </p>
            <p className="mt-3">
              When technical credit-restoration services are appropriate and
              authorized, {SITE.name} may coordinate fulfillment with an
              experienced credit restoration specialist or service provider. The
              specialist may communicate directly with the consumer regarding
              technical credit-file work, document needs, progress, responses,
              and next steps. {SITE.name} remains responsible for its own
              customer relationship, agreements, billing, and general customer
              service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              Cancellation Rights (Informational)
            </h2>
            <p className="mt-2">
              Consumers entering into applicable credit-services agreements have
              cancellation rights under applicable federal and state law and
              will receive the required cancellation disclosures with their
              client documents.
            </p>
            <p className="mt-3">
              For Florida consumers, Florida law provides a right to cancel an
              applicable credit-services contract without penalty or obligation
              within five days from the date the contract is signed. Separately,
              the federal Credit Repair Organizations Act (CROA) generally
              provides a three-business-day cancellation right.
            </p>
            <p className="mt-3">
              This page does not replace the required statutory Notice of
              Cancellation forms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              No Government Affiliation
            </h2>
            <p className="mt-2">
              {SITE.name} is a private company and is not affiliated with,
              endorsed by, or connected to any government agency, including the
              Federal Trade Commission, Consumer Financial Protection Bureau, or
              any consumer reporting agency.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              Formal Client Documents
            </h2>
            <p className="mt-2">
              Before paid services begin, consumers will receive applicable
              client documentation, which may include required federal and state
              disclosures, a written service agreement, authorizations, and
              cancellation notices. Those documents — not this website page —
              control the contractual relationship.
            </p>
            <p className="mt-3">
              Any bond, surety, trust-account, registration, license,
              insurance, or related statutory details required by applicable law
              will be included in the applicable client documents provided before
              paid services begin.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              Contact
            </h2>
            <p className="mt-2">
              Questions may be directed to{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold-dark hover:text-gold"
              >
                {SITE.email}
              </a>
              .
            </p>
            <div className="mt-3">
              <p>Mailing address:</p>
              <p className="mt-1 whitespace-pre-line">
                {`JHL Credit Solutions
PO Box 3264
Seminole, FL 33775-3264`}
              </p>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
