import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/terms",
  title: "Terms of Service",
  description: `Website Terms of Service for ${SITE.name}.`,
});

export default function TermsPage() {
  return (
    <Container className="py-12 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted">
          Website terms for {SITE.name} ({SITE.domain}).
        </p>

        <div className="mt-8 space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              1. Agreement to These Website Terms
            </h2>
            <p className="mt-2">
              By accessing or using the {SITE.name} website, you agree to these
              Terms of Service and our Privacy Policy. If you do not agree,
              please do not use the website.
            </p>
            <p className="mt-3">
              These Terms govern use of the public website and related
              informational materials. They do not replace any separate client
              agreement, statutory disclosure, authorization, or Notice of
              Cancellation that may apply if you later choose to proceed with
              paid services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              2. Informational Purpose of the Website
            </h2>
            <p className="mt-2">
              Website content is provided for general informational and
              educational purposes. It is not legal advice, tax advice, or a
              substitute for individualized professional counsel.
            </p>
            <p className="mt-3">
              Visiting the website or submitting a Credit Assessment does not by
              itself create a paid credit-restoration engagement. Submission of
              an assessment is a request for evaluation and consultation.
              Consumers remain free to decide whether to proceed after
              consultation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              3. About Our Services
            </h2>
            <p className="mt-2">
              {SITE.name} is a customer-facing credit services business. We help
              consumers better understand their credit, evaluate their
              situation, explore appropriate options, and coordinate
              professional credit-restoration assistance when appropriate.
            </p>
            <p className="mt-3">
              Consumers typically begin with a Credit Assessment and
              consultation. Pricing is individualized based on the consumer&apos;s
              credit profile and the scope of services recommended. Applicable
              services, scope, pricing, payment terms, required disclosures,
              cancellation rights, and other terms applicable to a paying client
              will be provided through separate client documentation.
            </p>
            <p className="mt-3">
              JHL may coordinate technical credit-restoration fulfillment with
              an experienced credit restoration specialist or other service
              provider. When appropriate and authorized by the consumer,
              necessary information may be shared with that specialist. The
              specialist may communicate directly with the consumer regarding
              technical credit-file work, document needs, progress, responses,
              and next steps. JHL remains responsible for its own customer
              relationship, agreements, billing, and general customer service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              4. No Guarantees
            </h2>
            <p className="mt-2">
              {SITE.name} does not guarantee any particular credit outcome,
              including:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>A particular credit-score increase</li>
              <li>Deletion of a particular account or tradeline</li>
              <li>
                Removal of accurate, current, and verifiable negative
                information
              </li>
              <li>Approval for a mortgage</li>
              <li>Approval for an automobile loan</li>
              <li>Approval for a credit card</li>
              <li>Approval for any other financing</li>
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
              5. Pricing
            </h2>
            <p className="mt-2">
              The initial Credit Assessment is free and comes with no
              obligation. If you choose to proceed after consultation, pricing
              will be based on your individual credit profile and the scope of
              services recommended. Applicable pricing and service terms will be
              explained before you decide whether to proceed.
            </p>
            <p className="mt-3">
              Detailed consumer payment terms, if any, will be contained in the
              applicable client agreement provided before services proceed. We
              do not publish a fixed credit-restoration price on this website,
              and we do not process consumer payments through the public website
              at this time.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              6. Cancellation Rights
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
              This website page is informational only and does not replace the
              required statutory Notice of Cancellation forms or other client
              documents that may be provided before services begin.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              7. Consumer Rights
            </h2>
            <p className="mt-2">
              You have the right to dispute inaccurate information directly with
              consumer reporting agencies at no cost. You can perform many
              credit-related actions yourself without hiring {SITE.name}.
              Accurate, current, and verifiable information cannot lawfully be
              removed merely because it is negative.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              8. Website Use and Intellectual Property
            </h2>
            <p className="mt-2">
              You agree not to misuse the website, attempt to disrupt its
              operation, or use it for unlawful purposes. Content on this
              website, including text, branding, and media, is owned by or
              licensed to {SITE.name} and may not be copied or used for
              commercial purposes without permission, except as allowed by law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              9. Limitation of Liability
            </h2>
            <p className="mt-2">
              To the fullest extent permitted by law, {SITE.name} is not liable
              for indirect, incidental, consequential, special, or punitive
              damages arising from your use of the website or reliance on
              website content. Website information is provided on an
              &quot;as available&quot; basis without warranties of any kind,
              express or implied, except where such warranties cannot be
              disclaimed under applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              10. Contact
            </h2>
            <p className="mt-2">
              Questions about these Terms may be directed to{" "}
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
