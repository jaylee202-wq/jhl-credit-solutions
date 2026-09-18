"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "What is credit restoration?",
    answer:
      "Credit restoration involves reviewing credit reports, identifying potentially inaccurate or unverifiable information, and working through the formal dispute process with credit bureaus and creditors where appropriate. When technical credit-restoration services are appropriate, an experienced credit restoration specialist working with JHL may handle the technical credit-file work. It is a regulated service governed by federal and state consumer protection laws.",
  },
  {
    question: "Who works on my credit?",
    answer:
      "JHL Credit Solutions manages the customer relationship, assessment, consultation, and overall service coordination. When technical credit-restoration services are appropriate, an experienced credit restoration specialist working with JHL may handle the technical credit-file work and communicate directly with you regarding your file, progress, and next steps.",
  },
  {
    question: "How long does the process take?",
    answer:
      "Timelines vary significantly based on individual circumstances, the complexity of your credit profile, and bureau response times. There is no standard duration, and we do not guarantee results within any specific timeframe.",
  },
  {
    question: "Will my credit score increase?",
    answer:
      "We cannot guarantee any specific credit score increase. Outcomes depend on many factors including the accuracy of items on your reports, your overall credit history, and actions taken by credit bureaus and creditors.",
  },
  {
    question: "What information do you need to get started?",
    answer:
      "Our initial credit assessment collects basic contact information and details about your credit goals and concerns. We do not request Social Security numbers, banking information, or full account numbers through our public website form.",
  },
  {
    question: "Is there a cost for the credit assessment?",
    answer:
      "The initial credit assessment is free and comes with no obligation. If you choose to proceed after consultation, pricing will be based on your individual credit profile and the scope of services recommended. Any applicable pricing and service terms will be explained before you decide whether to proceed.",
  },
  {
    question: "Can you remove any negative item from my credit report?",
    answer:
      "We cannot guarantee the removal of any specific item. When credit restoration services are appropriate, work may focus on potentially inaccurate or unverifiable information through proper legal channels. Accurate, verifiable negative information generally cannot be removed.",
  },
  {
    question: "How is my information kept secure?",
    answer:
      "We take appropriate steps to handle your information responsibly. We do not request Social Security numbers, banking details, or full credit account numbers through our public website form. If additional information is needed during your service, JHL will provide instructions for submitting it appropriately.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Container className="py-12 lg:py-20">
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="Common questions about our services, process, and what to expect."
      />

      <div className="mx-auto max-w-3xl divide-y divide-border">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="py-4">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-serif text-lg font-semibold text-navy">
                  {item.question}
                </span>
                <svg
                  className={cn(
                    "h-5 w-5 shrink-0 text-gold transition-transform",
                    isOpen && "rotate-180",
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  isOpen ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
                role="region"
                aria-hidden={!isOpen}
              >
                <p className="text-muted leading-relaxed">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
