import { SITE } from "@/lib/constants";
import type { ChatAction, ChatMessage } from "./types";
import {
  detectIndividualizedLegalClaim,
  getIndividualizedLegalResponse,
  matchLegalEducationIntent,
} from "./legal-education";

export const BUDDY_NAME = "Konnect Buddy";

export const OPENING_GREETING = `Hi! I'm Konnect Buddy 👋
I'm here to help answer questions about JHL Credit Solutions, our credit restoration process, getting started, and general consumer credit rights. How can I help?`;

export const QUICK_ACTIONS = [
  "How does JHL Credit Solutions work?",
  "What services do you provide?",
  "How do I get started?",
  "What are my credit reporting rights?",
  "Contact JHL Credit Solutions",
] as const;

const FINALIZING_DETAILS =
  "The initial credit assessment is free and comes with no obligation. If you choose to proceed after consultation, pricing will be based on your individual credit profile and the scope of services recommended. Any applicable pricing and service terms will be explained before you decide whether to proceed.";

const GET_STARTED_ACTION: ChatAction = {
  label: "Get Started",
  href: "/get-started",
};

const CONTACT_ACTION: ChatAction = {
  label: "Contact Us",
  href: "/contact",
};

interface BuddyResponse {
  content: string;
  actions?: ChatAction[];
}

function createMessage(
  role: ChatMessage["role"],
  content: string,
  actions?: ChatAction[],
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    content,
    actions,
    timestamp: Date.now(),
  };
}

export function createGreetingMessage(): ChatMessage {
  return createMessage("assistant", OPENING_GREETING);
}

export function createUserMessage(content: string): ChatMessage {
  return createMessage("user", content.trim());
}

function normalizeInput(input: string): string {
  return input.toLowerCase().trim();
}

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text));
}

function respond(content: string, actions?: ChatAction[]): BuddyResponse {
  return { content, actions };
}

function detectSensitiveRequest(text: string): boolean {
  return matchesAny(text, [
    /\bssn\b/,
    /social security/,
    /credit card/,
    /card number/,
    /bank account/,
    /routing number/,
    /account number/,
    /upload.*document/,
    /send.*document/,
    /my specific account/,
    /look at my credit/,
    /analyze my credit/,
  ]);
}

function detectGuaranteeRequest(text: string): boolean {
  return matchesAny(text, [
    /guarantee/,
    /guaranteed/,
    /will my score/,
    /score increase/,
    /raise my score/,
    /remove.*negative/,
    /delete.*negative/,
    /get approved/,
    /loan approval/,
    /mortgage approval/,
    /will i get/,
  ]);
}

function detectPricingRequest(text: string): boolean {
  return matchesAny(text, [
    /price/,
    /pricing/,
    /payment/,
    /how much/,
    /cost/,
    /fee/,
    /pay for/,
    /subscription/,
  ]);
}

function detectLegalAdviceRequest(text: string): boolean {
  return matchesAny(text, [
    /give me legal advice/,
    /need legal advice/,
    /tell me if i should sue/,
    /will i win (my|the|this)/,
    /represent me in court/,
  ]);
}

function detectGovernmentAffiliation(text: string): boolean {
  return matchesAny(text, [
    /jhl.*(affiliated|endorsed|connected|government)/,
    /(affiliated|endorsed|connected).*(government|ftc|cfpb).*(jhl|you|your company)/,
    /(are you|is jhl|is your company).*(government|ftc|cfpb)/,
    /work for the (government|ftc|cfpb)/,
  ]);
}

function matchIntent(text: string): BuddyResponse {
  if (detectSensitiveRequest(text)) {
    return respond(
      `For your privacy and security, I can't collect sensitive information like Social Security numbers, payment details, or account numbers here.\n\nThe best next step is our short Credit Assessment on the Get Started page, or you can reach our team directly at ${SITE.email}.`,
      [GET_STARTED_ACTION, CONTACT_ACTION],
    );
  }

  if (detectGuaranteeRequest(text)) {
    return respond(
      `I can't guarantee specific credit score increases, item removals, or approvals. Outcomes depend on individual circumstances, and results vary.\n\n${SITE.name} helps consumers understand their credit, explore appropriate service options, and coordinate professional credit restoration assistance when appropriate. The best next step is our short Credit Assessment.`,
      [GET_STARTED_ACTION],
    );
  }

  if (detectPricingRequest(text)) {
    return respond(`${FINALIZING_DETAILS}`, [
      GET_STARTED_ACTION,
      CONTACT_ACTION,
    ]);
  }

  if (detectIndividualizedLegalClaim(text)) {
    return getIndividualizedLegalResponse();
  }

  const legalEducation = matchLegalEducationIntent(text);
  if (legalEducation) {
    return legalEducation;
  }

  if (detectLegalAdviceRequest(text)) {
    return respond(
      `I'm not able to provide individualized legal advice. I can share general educational information about consumer credit laws if you'd like.\n\nFor specific legal questions about your situation, please consult a qualified consumer-law attorney. You can also contact us at ${SITE.email} for service-related questions about ${SITE.name}.`,
      [CONTACT_ACTION],
    );
  }

  if (matchesAny(text, [/find a lawyer/, /need an attorney/, /consumer.?law attorney/])) {
    return respond(
      `For individualized legal questions, a qualified consumer-law attorney licensed in your state is the best resource. Many state bar associations offer lawyer referral services.\n\nI can still help with general educational information about credit laws, or questions about ${SITE.name} services.`,
    );
  }

  if (detectGovernmentAffiliation(text)) {
    return respond(
      `${SITE.name} is a private company and is not affiliated with, endorsed by, or connected to any government agency — including the FTC, CFPB, or any credit bureau.`,
    );
  }

  if (
    matchesAny(text, [
      /^how does jhl/,
      /how does.*work/,
      /how it works/,
      /what is the process/,
      /credit restoration process/,
    ])
  ) {
    return respond(
      `${SITE.name} follows a structured approach:\n\n1. Credit Assessment — share your goals and concerns (free, no payment required)\n2. Consultation — JHL discusses your credit situation and potential next steps\n3. Credit Review & Service Recommendation — your credit profile is reviewed to determine what type and amount of work may be appropriate\n4. Service Options & Pricing — you receive a service recommendation and pricing based on your individual situation; you decide whether to proceed\n5. Credit Restoration Process — clients who proceed are connected with a credit restoration specialist handling technical work; the specialist communicates directly regarding necessary information, legitimate dispute activity where appropriate, responses, and progress\n6. Progress & Support — the specialist continues managing technical credit-restoration work and file-related communication, while JHL remains available for appropriate customer support\n\nTimelines and outcomes vary. We don't guarantee specific results.`,
      [GET_STARTED_ACTION, { label: "How It Works", href: "/how-it-works" }],
    );
  }

  if (
    matchesAny(text, [
      /what services/,
      /services do you/,
      /what do you offer/,
      /what do you provide/,
    ])
  ) {
    return respond(
      `We offer three main areas of support:\n\n• Credit Assessment — a free initial evaluation to help determine whether our services may be appropriate for your goals\n• Credit Education — understanding credit reports, scores, and positive credit-building strategies\n• Credit Restoration Coordination — when appropriate, JHL coordinates professional assistance that may include credit report review, identification of potential inaccuracies, personalized service recommendations, and legitimate dispute assistance — with technical fulfillment handled by an experienced credit restoration specialist working with JHL\n\nVisit our Services page for more detail.`,
      [
        { label: "View Services", href: "/services" },
        GET_STARTED_ACTION,
      ],
    );
  }

  if (
    matchesAny(text, [
      /how do i get started/,
      /get started/,
      /sign up/,
      /enroll/,
      /credit assessment/,
      /begin/,
    ])
  ) {
    return respond(
      `I can help with that. The best next step is our short Credit Assessment.\n\nIt's free, requires no payment, and collects only basic contact information and your credit goals — no Social Security numbers or sensitive financial details.\n\nA team member will review your submission and reach out to discuss next steps. Submitting the assessment does not enroll you in paid services.`,
      [GET_STARTED_ACTION],
    );
  }

  if (
    matchesAny(text, [
      /how long/,
      /timeline/,
      /time frame/,
      /timeframe/,
      /how many months/,
      /duration/,
    ])
  ) {
    return respond(
      `Timelines vary significantly based on individual circumstances, the complexity of your credit profile, and bureau response times. There is no standard duration, and we don't guarantee results within any specific timeframe.\n\nOur How It Works page outlines the general process. For a personalized overview, start with the Credit Assessment.`,
      [
        { label: "How It Works", href: "/how-it-works" },
        GET_STARTED_ACTION,
      ],
    );
  }

  if (
    matchesAny(text, [
      /contact/,
      /email/,
      /reach/,
      /phone/,
      /talk to someone/,
      /speak with/,
    ])
  ) {
    return respond(
      `You can reach ${SITE.name} at:\n\n📧 ${SITE.email}\n\nBusiness hours: Monday – Friday, 9:00 AM – 5:00 PM EST\n\nYou can also use our contact form for general inquiries.`,
      [CONTACT_ACTION],
    );
  }

  if (matchesAny(text, [/about/, /who are you/, /who is jhl/, /company/])) {
    return respond(
      `${SITE.name} is a consumer credit restoration and credit education company. We help consumers understand their credit, assess their situation, determine appropriate options, and coordinate professional credit-restoration assistance when appropriate.\n\n"${SITE.tagline}"`,
      [{ label: "About Us", href: "/about" }, GET_STARTED_ACTION],
    );
  }

  if (
    matchesAny(text, [
      /who works on/,
      /who handles/,
      /who will work/,
      /credit specialist/,
      /restoration specialist/,
      /who does the work/,
    ])
  ) {
    return respond(
      `${SITE.name} manages the customer relationship, assessment, consultation, and overall service coordination. When technical credit-restoration services are appropriate, an experienced credit restoration specialist working with JHL may handle the technical credit-file work and communicate directly with you regarding your file, progress, and next steps.`,
      [GET_STARTED_ACTION, CONTACT_ACTION],
    );
  }

  if (matchesAny(text, [/faq/, /frequently asked/, /common questions/])) {
    return respond(`Our FAQ page covers common questions about services, timelines, security, and what to expect.`, [
      { label: "View FAQ", href: "/faq" },
      GET_STARTED_ACTION,
    ]);
  }

  if (matchesAny(text, [/privacy/, /terms/, /disclosure/, /legal page/])) {
    return respond(
      `Legal and compliance pages are available on our website, including our Privacy Policy, Terms of Service, and Disclosures.`,
      [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Disclosures", href: "/disclosures" },
      ],
    );
  }

  if (matchesAny(text, [/hello/, /hi\b/, /hey/, /good morning/, /good afternoon/])) {
    return respond(
      `Hello! I'm here to help with questions about ${SITE.name}, our services, and getting started. What would you like to know?`,
    );
  }

  if (matchesAny(text, [/thank/, /thanks/])) {
    return respond(
      `You're welcome! If you have more questions, feel free to ask. When you're ready, our Credit Assessment is a great next step.`,
      [GET_STARTED_ACTION],
    );
  }

  if (matchesAny(text, [/bye/, /goodbye/, /see you/])) {
    return respond(
      `Thanks for chatting! Remember, you can start your free Credit Assessment anytime. Have a great day!`,
      [GET_STARTED_ACTION],
    );
  }

  return respond(
    `I'm not sure I have a specific answer for that, but I can help with questions about our services, getting started, general consumer credit rights, or how to contact us.\n\nFor detailed or account-specific questions, please use Get Started or email us at ${SITE.email}.`,
    [GET_STARTED_ACTION, CONTACT_ACTION],
  );
}

export function getBuddyResponse(userInput: string): ChatMessage {
  const normalized = normalizeInput(userInput);

  if (!normalized) {
    return createMessage(
      "assistant",
      "Please type a question and I'll do my best to help!",
    );
  }

  const exactQuickAction = QUICK_ACTIONS.find(
    (action) => action.toLowerCase() === normalized,
  );
  if (exactQuickAction) {
    const response = matchIntent(normalizeInput(exactQuickAction));
    return createMessage("assistant", response.content, response.actions);
  }

  const response = matchIntent(normalized);
  return createMessage("assistant", response.content, response.actions);
}
