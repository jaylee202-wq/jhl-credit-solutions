import { SITE } from "@/lib/constants";
import type { ChatAction } from "./types";

export const LEGAL_EDUCATION_FOOTER = `This is general educational information only — not legal advice. ${SITE.name} is not a law firm. Laws vary and may change; verify current requirements through official sources such as the CFPB, FTC, or U.S. Code. For questions about your specific situation, consult a qualified consumer-law attorney.`;

export const AUTHORITATIVE_SOURCES =
  "For the most current official information, visit consumerfinance.gov (CFPB), ftc.gov (FTC), or law.cornell.edu (U.S. Code).";

interface LegalEducationResponse {
  content: string;
  actions?: ChatAction[];
}

function respond(content: string, actions?: ChatAction[]): LegalEducationResponse {
  return { content: `${content}\n\n${LEGAL_EDUCATION_FOOTER}`, actions };
}

export function detectIndividualizedLegalClaim(text: string): boolean {
  return [
    /should i sue/,
    /can i sue/,
    /do i have a case/,
    /violated.*(my|the) law/,
    /broke the law.*(my|in my)/,
    /owe(s)? me damages/,
    /must be deleted/,
    /must legally be/,
    /illegal in my case/,
    /\bin my case\b/,
    /\bmy situation\b/,
    /(experian|equifax|transunion).*(violated|broke|illegal)/,
    /(creditor|collector|bureau).*(violated|broke).*(my|me)/,
    /they (violated|broke|ignored).*(my|the) (rights|law)/,
    /did (they|he|she) violate/,
    /was it illegal.*(my|for me)/,
    /how much can i (get|collect|sue)/,
    /this account must/,
    /has to be removed/,
  ].some((pattern) => pattern.test(text));
}

export function getIndividualizedLegalResponse(): LegalEducationResponse {
  return respond(
    `I understand you're asking about a specific situation. I can't determine whether a violation occurred in your case, whether you're entitled to damages, or whether any account must be removed — that requires individualized legal analysis.\n\nWhat I can do is explain general consumer credit laws that may be relevant. If you tell me the general topic (for example, debt collection, credit reporting disputes, or identity theft), I can share educational information.\n\nFor a definitive answer about your circumstances, please consult a qualified consumer-law attorney.`,
  );
}

export function matchLegalEducationIntent(
  text: string,
): LegalEducationResponse | null {
  if (
    [
      /\bfcra\b/,
      /fair credit reporting/,
      /credit reporting act/,
      /disputed information/,
      /credit bureau dispute/,
      /dispute.*credit report/,
      /investigate.*dispute/,
      /inaccurate.*credit report/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `The Fair Credit Reporting Act (FCRA) is a federal law governing how consumer credit information is collected, reported, and used.\n\nIn general, the FCRA:\n• Gives you the right to access your credit reports and know what's in your file\n• Requires credit reporting agencies to follow reasonable procedures for accuracy\n• Requires furnishers (creditors, collectors, etc.) to provide accurate information\n• Gives you the right to dispute incomplete or inaccurate information — bureaus must investigate generally within 30 days in many cases\n• Limits who can access your credit report and under what circumstances\n• Provides certain remedies in some situations when requirements aren't followed\n\nDisputing inaccurate information directly with credit bureaus is a right you have at no cost. ${SITE.name} can help consumers understand this process, but we cannot guarantee any particular dispute outcome.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /\bfdcpa\b/,
      /fair debt collection/,
      /debt collector/,
      /collection agency/,
      /harassing calls/,
      /collector (called|contacted)/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `The Fair Debt Collection Practices Act (FDCPA) is a federal law that generally applies to third-party debt collectors collecting personal, family, and household debts.\n\nIn general, the FDCPA may restrict collectors from:\n• Using harassment, oppression, or abuse\n• Making false or misleading representations\n• Using unfair or unconscionable practices\n• Contacting you at inconvenient times or places (with some limits)\n• Discussing your debt with unauthorized third parties\n\nThe FDCPA also gives consumers certain rights, such as requesting validation of a debt and disputing a debt in writing. Important: the FDCPA generally does not apply to original creditors collecting their own debts in all cases — other laws may apply instead.\n\nWhether a specific collector's conduct violated the FDCPA depends on the facts of each situation.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /\bcroa\b/,
      /credit repair organizations act/,
      /credit repair organization/,
      /credit services organization/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `The Credit Repair Organizations Act (CROA) is a federal law regulating companies that sell credit repair services to consumers.\n\nIn general, CROA requires credit repair organizations to:\n• Provide certain disclosures before you sign a contract\n• Give you a written contract with specific terms\n• Allow a cancellation period (often at least 3 business days)\n• Prohibit demanding payment before services are fully performed (with limited exceptions)\n• Prohibit false or misleading statements about what they can do\n\nCROA also prohibits organizations from advising consumers to make false statements to credit bureaus or creditors.\n\n${SITE.name} is a credit services company subject to applicable federal and state regulations. Our Disclosures page will contain required information once finalized.\n\n${AUTHORITATIVE_SOURCES}`,
      [{ label: "View Disclosures", href: "/disclosures" }],
    );
  }

  if (
    [
      /\bfacta\b/,
      /fair and accurate credit transactions/,
      /free credit report/,
      /annual credit report/,
      /credit report.*free/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `The Fair and Accurate Credit Transactions Act (FACTA) amended the FCRA and includes provisions aimed at reducing identity theft and improving credit report accuracy.\n\nConsumers may know FACTA best for:\n• The right to a free credit report from each major bureau annually through AnnualCreditReport.com (the only federally authorized source)\n• Identity theft protections, including fraud alerts and credit freezes in many situations\n• Certain requirements for truncating card numbers on receipts\n• Red flag rules for creditors to detect identity theft\n\nAlways use AnnualCreditReport.com for free annual reports — not look-alike sites.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /identity theft/,
      /someone opened.*my name/,
      /fraudulent account/,
      /stolen identity/,
      /unauthorized account/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `If you believe you're a victim of identity theft affecting your credit:\n\nGeneral steps consumers often take:\n• Place a fraud alert or credit freeze with each major credit bureau\n• File an identity theft report (including at IdentityTheft.gov through the FTC)\n• Review credit reports for accounts you didn't open\n• Dispute fraudulent or inaccurate information with credit bureaus\n• Contact creditors and financial institutions about unauthorized accounts\n• Keep detailed records of all communications\n\nThe FCRA and FACTA provide certain identity theft-related rights, but specific steps depend on your situation.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /fraud alert/,
      /credit freeze/,
      /security freeze/,
      /lock my credit/,
      /freeze my credit/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `Fraud alerts and credit freezes are tools to help protect your credit file:\n\n• Fraud alert — signals to potential creditors to verify identity before opening new accounts. Initial alerts are generally free; extended alerts may require an identity theft report.\n• Credit freeze (security freeze) — restricts access to your credit report, making it harder for someone to open accounts in your name. Freezing and unfreezing are generally free under federal law.\n\nYou typically need to contact each major credit bureau (Equifax, Experian, TransUnion) separately. A freeze does not affect your credit score.\n\nProcedures and timeframes may vary — check each bureau's current process.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /hard inquiry/,
      /soft inquiry/,
      /hard pull/,
      /soft pull/,
      /credit inquiry/,
      /who checked my credit/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `Credit inquiries appear on your credit report when someone accesses your credit file:\n\n• Hard inquiries — generally occur when you apply for credit (credit card, loan, mortgage). They may affect your credit score slightly and typically remain on your report for about two years.\n• Soft inquiries — generally occur for pre-approval offers, account reviews, or checking your own credit. They typically do not affect your credit score.\n\nYou have the right to know who has accessed your credit report. Unauthorized hard inquiries may be disputable, but whether an inquiry is disputable depends on the facts.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /charge.?off/,
      /charged off/,
      /collection account/,
      /sent to collections/,
      /in collections/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `Charge-offs and collections on credit reports:\n\n• Charge-off — when a creditor writes off a debt as unlikely to be collected, often after prolonged non-payment. The account may still be collectable, and a collector may pursue payment.\n• Collection account — a debt sold or assigned to a collection agency, which may appear as a separate entry on your credit report.\n\nUnder the FCRA, most negative information (including charge-offs and collections) generally may be reported for up to seven years from the date of first delinquency — though specific rules and exceptions apply. Bankruptcies may be reported longer.\n\nYou can dispute inaccurate collection or charge-off information. Accurate, verifiable negative information generally cannot be removed simply because you disagree with it.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /time limit/,
      /how long.*(stay|report|remain)/,
      /reporting period/,
      /seven year/,
      /7 year/,
      /statute.*reporting/,
      /when does.*fall off/,
      /delete after/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `General credit reporting time limits under the FCRA:\n\n• Most negative information (late payments, collections, charge-offs) — generally up to 7 years from the date of first delinquency\n• Chapter 7 bankruptcy — generally up to 10 years\n• Chapter 13 bankruptcy — generally up to 7 years\n• Hard inquiries — generally about 2 years\n• Positive information — may remain longer\n\nThese are general guidelines. Specific dates depend on the type of account, state law, and how the item is reported. If an item is past its reporting period, you may dispute it — but I can't confirm whether a specific item on your report qualifies.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /consumer.*rights/,
      /credit reporting rights/,
      /my rights/,
      /what rights do i have/,
      /rights under/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `General consumer credit reporting rights under federal law include:\n\n• Access your credit reports (including free annual reports via AnnualCreditReport.com)\n• Dispute inaccurate or incomplete information with credit bureaus\n• Know who has accessed your credit report\n• Limit certain prescreened credit offers\n• Place fraud alerts or credit freezes for identity protection\n• Receive certain disclosures when denied credit based on your report\n\nDebt collection rights (under the FDCPA, when applicable) may include disputing debts, requesting validation, and protection from certain collection practices.\n\nThese are general rights — how they apply to your situation may vary.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /debt collection rights/,
      /rights.*collector/,
      /collector.*rights/,
      /stop calling me/,
      /cease communication/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `General debt collection consumer rights (when the FDCPA applies):\n\n• Request written validation of the debt within 30 days of initial contact\n• Dispute the debt in writing — collectors must generally cease collection until verification is provided\n• Request that a collector stop contacting you (in writing) — though the debt may still exist and legal action may still be possible\n• Protection from harassment, false statements, and unfair practices\n• Sue in certain circumstances if the FDCPA is violated — but outcomes depend on specific facts\n\nOriginal creditors collecting their own debts may not be covered by the FDCPA in all cases. State laws may provide additional protections.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /florida/,
      /\bfl\b.*(law|statute|credit)/,
      /florida.*credit/,
      /florida.*consumer/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `Florida has state-level consumer protection laws that may apply to credit-related matters, including requirements for credit services organizations operating in the state.\n\nIn general, Florida law may require credit services organizations to:\n• Register with the state\n• Provide specific disclosures and contract terms\n• Follow bonding or trust account requirements in some cases\n• Honor cancellation rights\n\nFlorida consumers may also have protections under the Florida Deceptive and Unfair Trade Practices Act (FDUTPA) and other state statutes.\n\nSpecific Florida requirements can change. Verify current law through the Florida Statutes (leg.state.fl.us) or consult a Florida-licensed attorney.\n\n${AUTHORITATIVE_SOURCES}`,
    );
  }

  if (
    [
      /consumer (credit )?law/,
      /credit law/,
      /federal credit law/,
      /what laws protect/,
      /legal education/,
      /know my rights/,
      /learn about.*rights/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `I can share general educational information about several consumer credit laws:\n\n• FCRA — credit reporting accuracy, disputes, and access rights\n• FDCPA — debt collection practices (third-party collectors)\n• CROA — credit repair organization requirements\n• FACTA — identity theft protections and free credit reports\n• Florida consumer credit laws — state-level requirements\n\nI can also explain topics like fraud alerts, credit freezes, inquiries, charge-offs, and reporting time limits.\n\nAsk about any specific topic, and I'll explain it in plain English. Remember — this is education, not legal advice.`,
    );
  }

  if (
    [
      /law firm/,
      /are you a lawyer/,
      /is jhl a law firm/,
      /legal representation/,
    ].some((p) => p.test(text))
  ) {
    return respond(
      `${SITE.name} is not a law firm and does not provide legal representation or individualized legal advice. We offer credit restoration and credit education services.\n\nFor legal questions about your specific situation — including whether a law was violated or whether you have a claim — please consult a qualified consumer-law attorney.`,
      [{ label: "Get Started", href: "/get-started" }],
    );
  }

  return null;
}
