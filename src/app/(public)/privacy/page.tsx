import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = {
  ...createPageMetadata({
    path: "/privacy",
    title: "Privacy Policy",
    description: `Privacy Policy for ${SITE.name}. Learn how we collect, use, and protect information on our public website.`,
  }),
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <Container className="py-12 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted">
          Effective for the public website of {SITE.name} ({SITE.domain}).
        </p>

        <div className="mt-8 space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              1. Introduction
            </h2>
            <p className="mt-2">
              {SITE.name} (&quot;JHL,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) respects your privacy. This Privacy Policy
              explains how we may collect, use, share, and protect information
              in connection with our public website and related inquiry,
              assessment, consultation, and service-coordination activities.
            </p>
            <p className="mt-3">
              This page is a public informational privacy notice. It is not the
              individual consumer credit-services contract, statutory
              pre-contract information statement, authorization form, or Notice
              of Cancellation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              2. Information We May Collect
            </h2>
            <p className="mt-2">
              We may collect information you voluntarily provide through our
              website or during the inquiry and consultation process, including:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Name</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>Credit-related goals and concerns</li>
              <li>Information supplied through the Credit Assessment</li>
              <li>
                Credit-report information voluntarily supplied for review
              </li>
              <li>Supporting documentation when necessary</li>
            </ul>
            <p className="mt-3">
              Our initial public Credit Assessment does not request Social
              Security numbers, bank account numbers, credit or debit card
              numbers, or passwords for third-party credit-monitoring or other
              account services.
            </p>
            <p className="mt-3">
              We do not process consumer payments through the public website at
              this time.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              3. How We Use Information
            </h2>
            <p className="mt-2">
              Information submitted through the Credit Assessment or related
              inquiry channels is used for purposes such as:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Responding to your inquiry</li>
              <li>Conducting the assessment</li>
              <li>Consultation</li>
              <li>Credit review</li>
              <li>Determining appropriate service options</li>
              <li>Service administration and coordination</li>
              <li>Customer service</li>
              <li>Legal and compliance obligations</li>
            </ul>
            <p className="mt-3">
              Submitting a Credit Assessment does not automatically enroll you
              in newsletters or promotional email campaigns. We do not currently
              operate a marketing email program based on assessment submissions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              4. Service Providers and Information Sharing
            </h2>
            <p className="mt-2">
              When you choose to proceed and provide appropriate authorization,
              JHL may share information reasonably necessary to provide the
              requested services with service providers, including an
              experienced credit restoration specialist performing technical
              fulfillment.
            </p>
            <p className="mt-3">Information shared may include:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Contact information</li>
              <li>Credit-report information</li>
              <li>Relevant supporting documentation</li>
              <li>
                Other information reasonably necessary to perform authorized
                services
              </li>
            </ul>
            <p className="mt-3">
              Authorized service providers may communicate directly with you
              when necessary to perform technical credit-restoration services.
              JHL remains responsible for its own customer relationship,
              agreements, billing, and general customer service.
            </p>
            <p className="mt-3">
              JHL does not sell consumer personal information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              5. Third-Party Account Access Information
            </h2>
            <p className="mt-2">
              When necessary for a requested credit review, a consumer may
              voluntarily provide access information relating to a third-party
              credit-monitoring or credit-reporting service. Such information,
              if provided through an authorized process, is used only for the
              authorized credit-review or service purpose, should not be used
              for unrelated purposes, and is retained only as long as reasonably
              necessary for the authorized purpose, subject to legal or
              operational requirements.
            </p>
            <p className="mt-3">
              Please do not email passwords or other sensitive account
              credentials through the public website Contact form or Credit
              Assessment. JHL will provide separate instructions if such
              information is needed for an authorized review.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              6. Data Retention
            </h2>
            <p className="mt-2">
              JHL retains information for as long as reasonably necessary to
              provide services, administer the relationship, satisfy legal
              obligations, resolve disputes, and maintain required business and
              compliance records.
            </p>
            <p className="mt-3">
              Temporary account-access credentials may be deleted when they are
              no longer reasonably necessary. Agreements, disclosures,
              authorizations, and other legally required records may be retained
              for the applicable period. We do not promise deletion of records
              that JHL may be legally required to retain.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              7. Security
            </h2>
            <p className="mt-2">
              We use reasonable administrative, technical, and organizational
              measures as appropriate to protect information. No method of
              transmission over the internet or method of electronic storage can
              be guaranteed completely secure, and we cannot promise that
              information will never be subject to unauthorized access,
              interception, or other compromise.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              8. Your Choices and Contact
            </h2>
            <p className="mt-2">
              You may contact us with privacy-related questions or requests at{" "}
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
            <p className="mt-3">
              We do not publicly list a residential or physical owner address
              on this website. Any legally required principal business address
              will be included in applicable client contracts and business
              documentation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-navy">
              9. Updates
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. The updated
              version will be posted on this page when changes are made.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
