import { VideoHeroPlaceholder } from "@/components/hero/VideoHeroPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/",
  title: "Home",
  absoluteTitle: `${SITE.name} | Credit Restoration and Credit Education`,
  description:
    "Take control of your credit journey. JHL Credit Solutions provides credit restoration and credit education to help you build a stronger financial future.",
});

const VALUE_PROPS = [
  {
    title: "Understand Your Credit",
    description:
      "Gain clarity on how credit works and what factors influence your financial profile.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    ),
  },
  {
    title: "Personalized Guidance",
    description:
      "Work with JHL to understand your credit situation, explore appropriate service options, and coordinate credit restoration assistance when needed.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    ),
  },
  {
    title: "Build Toward Opportunity",
    description:
      "Stronger credit can open doors — from housing to employment to better financial terms.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
      />
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white">
        <Container className="py-12 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
                {SITE.tagline}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl">
                Take Control of Your Credit Journey
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Credit can affect where you live, what you drive, what you pay,
                and the opportunities available to you. {SITE.name} helps
                consumers better understand their credit, evaluate their
                situation, develop an appropriate path forward, and coordinate
                professional credit restoration assistance when appropriate.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href="/get-started" size="lg">
                  Get Started
                </ButtonLink>
                <ButtonLink href="/how-it-works" variant="outline" size="lg">
                  Learn How It Works
                </ButtonLink>
              </div>
            </div>
            <VideoHeroPlaceholder />
          </div>
        </Container>
      </section>

      {/* Value Props */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading
            title="Why Credit Matters"
            subtitle="Your credit profile influences many aspects of daily life. Understanding and managing it is an important step toward financial confidence."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_PROPS.map((item) => (
              <Card key={item.title} className="text-center sm:text-left">
                <div className="mb-4 inline-flex rounded-lg bg-gold/10 p-3">
                  <svg
                    className="h-6 w-6 text-gold-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-16 lg:py-20">
        <Container className="text-center">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70 leading-relaxed">
            Start with a free credit assessment. There is no obligation and no
            payment required at this stage.
          </p>
          <ButtonLink href="/get-started" size="lg" className="mt-8">
            Begin Your Credit Assessment
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
