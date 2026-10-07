import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/about",
  title: "About",
  description: `Learn about ${SITE.name} — our mission, values, and commitment to helping consumers navigate their credit journey.`,
});

const VALUES = [
  {
    title: "Integrity",
    description:
      "We operate with honesty and transparency. We do not make promises we cannot keep or guarantees we cannot honor.",
  },
  {
    title: "Education",
    description:
      "Empowering consumers with knowledge is at the core of what we do. Understanding credit is the foundation of financial confidence.",
  },
  {
    title: "Personalized Service",
    description:
      "Every credit situation is different. We take the time to understand your goals and develop an approach suited to your needs.",
  },
  {
    title: "Compliance",
    description:
      "We adhere to applicable federal and state regulations governing credit services organizations and consumer protection.",
  },
];

export default function AboutPage() {
  return (
    <Container className="py-12 lg:py-20">
      <SectionHeading
        as="h1"
        title={`About ${SITE.name}`}
        subtitle="Helping consumers better understand their credit and take meaningful steps toward a stronger financial future."
      />

      <div className="mt-12 lg:mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
            <Image
              src="/images/Jay_Hunter_Lee_Founder_2.png"
              alt="Jay Hunter Lee, Founder & CEO of JHL Credit Solutions"
              width={1023}
              height={1537}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 90vw, 480px"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
              Meet the Founder
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
              Jay Hunter Lee
            </h2>
            <p className="mt-2 text-lg font-medium text-navy-light">
              Founder &amp; CEO
            </p>
            <div className="mt-4 h-0.5 w-16 bg-gold" aria-hidden="true" />
          </div>

          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              Jay Hunter Lee is the Founder and Chief Executive Officer of JHL
              Credit Solutions, a Florida-based credit education and credit
              services company helping consumers better understand their credit
              profiles and take informed steps toward stronger financial
              opportunities.
            </p>
            <p>
              Credit affects where you live, what you drive, what you pay in
              interest, and even employment opportunities in some cases. Under
              Jay&apos;s leadership, {SITE.name} helps consumers understand their
              credit, assess their situation, determine appropriate options, and
              coordinate professional credit-restoration assistance when
              appropriate — all while providing the education needed to make
              informed decisions going forward.
            </p>
            <p>
              We are committed to operating ethically, in compliance with
              applicable regulations, and without making unrealistic promises about
              outcomes.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center font-serif text-2xl font-bold text-navy">
          Our Values
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {VALUES.map((value) => (
            <Card key={value.title}>
              <h3 className="font-serif text-lg font-bold text-navy">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
