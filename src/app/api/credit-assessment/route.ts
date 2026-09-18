import { Resend } from "resend";
import {
  CREDIT_CONCERNS,
  CREDIT_GOALS,
  REPORT_REVIEW_OPTIONS,
} from "@/lib/constants";

export const runtime = "nodejs";

const ALLOWED_GOALS = new Set<string>(CREDIT_GOALS);
const ALLOWED_CONCERNS = new Set<string>(CREDIT_CONCERNS);
const ALLOWED_REPORT_STATUSES = new Set<string>(
  REPORT_REVIEW_OPTIONS.map((option) => option.value),
);

const REPORT_STATUS_LABELS = Object.fromEntries(
  REPORT_REVIEW_OPTIONS.map((option) => [option.value, option.label]),
);

interface CreditAssessmentPayload {
  name: string;
  email: string;
  phone: string;
  creditGoals: string[];
  primaryConcerns: string[];
  reportReviewStatus: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validatePayload(body: unknown):
  | { ok: true; data: CreditAssessmentPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const record = body as Record<string, unknown>;

  if (!isNonEmptyString(record.name)) {
    return { ok: false, error: "Name is required." };
  }

  if (!isNonEmptyString(record.email)) {
    return { ok: false, error: "Email is required." };
  }

  const email = record.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }

  if (!isNonEmptyString(record.phone)) {
    return { ok: false, error: "Phone is required." };
  }

  if (!isStringArray(record.creditGoals) || record.creditGoals.length === 0) {
    return { ok: false, error: "At least one credit goal is required." };
  }

  if (
    !isStringArray(record.primaryConcerns) ||
    record.primaryConcerns.length === 0
  ) {
    return { ok: false, error: "At least one credit concern is required." };
  }

  if (!isNonEmptyString(record.reportReviewStatus)) {
    return { ok: false, error: "Report review status is required." };
  }

  const creditGoals = record.creditGoals.map((goal) => goal.trim());
  const primaryConcerns = record.primaryConcerns.map((concern) =>
    concern.trim(),
  );
  const reportReviewStatus = record.reportReviewStatus.trim();

  if (creditGoals.some((goal) => !ALLOWED_GOALS.has(goal))) {
    return { ok: false, error: "One or more credit goals are invalid." };
  }

  if (primaryConcerns.some((concern) => !ALLOWED_CONCERNS.has(concern))) {
    return { ok: false, error: "One or more credit concerns are invalid." };
  }

  if (!ALLOWED_REPORT_STATUSES.has(reportReviewStatus)) {
    return { ok: false, error: "Report review status is invalid." };
  }

  return {
    ok: true,
    data: {
      name: record.name.trim(),
      email,
      phone: record.phone.trim(),
      creditGoals,
      primaryConcerns,
      reportReviewStatus,
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatList(items: string[]): string {
  return items.map((item) => `• ${item}`).join("\n");
}

function buildEmailContent(data: CreditAssessmentPayload, submittedAt: string) {
  const reportLabel =
    REPORT_STATUS_LABELS[data.reportReviewStatus] ?? data.reportReviewStatus;

  const text = [
    "New Credit Assessment — JHL Credit Solutions",
    "",
    `Submitted: ${submittedAt}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    "",
    "Credit Goals:",
    formatList(data.creditGoals),
    "",
    "Primary Credit Concerns:",
    formatList(data.primaryConcerns),
    "",
    `Recently reviewed credit reports: ${reportLabel}`,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1a2744; line-height: 1.5;">
      <h2 style="margin: 0 0 16px;">New Credit Assessment — JHL Credit Solutions</h2>
      <p style="margin: 0 0 12px;"><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p style="margin: 0 0 4px;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p style="margin: 0 0 16px;"><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p style="margin: 0 0 4px;"><strong>Credit Goals:</strong></p>
      <ul style="margin: 0 0 16px; padding-left: 20px;">
        ${data.creditGoals.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("")}
      </ul>
      <p style="margin: 0 0 4px;"><strong>Primary Credit Concerns:</strong></p>
      <ul style="margin: 0 0 16px; padding-left: 20px;">
        ${data.primaryConcerns
          .map((concern) => `<li>${escapeHtml(concern)}</li>`)
          .join("")}
      </ul>
      <p style="margin: 0;"><strong>Recently reviewed credit reports:</strong> ${escapeHtml(reportLabel)}</p>
    </div>
  `;

  return { text, html };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validated = validatePayload(body);
  if (!validated.ok) {
    return Response.json({ error: validated.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CREDIT_ASSESSMENT_FROM_EMAIL;
  const toEmail =
    process.env.CREDIT_ASSESSMENT_TO_EMAIL ?? "hello@jhlcreditsolutions.com";

  if (!apiKey || !fromEmail) {
    console.error(
      "Credit assessment email is not configured. Missing RESEND_API_KEY or CREDIT_ASSESSMENT_FROM_EMAIL.",
    );
    return Response.json(
      { error: "Email delivery is not configured." },
      { status: 500 },
    );
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  const { text, html } = buildEmailContent(validated.data, submittedAt);
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: validated.data.email,
      subject: "New Credit Assessment — JHL Credit Solutions",
      text,
      html,
    });

    if (result.error) {
      console.error("Resend rejected credit assessment email.", {
        name: result.error.name,
        message: result.error.message,
      });
      return Response.json(
        { error: "Unable to send assessment email." },
        { status: 502 },
      );
    }

    const notificationEmail = process.env.JHL_NOTIFICATION_EMAIL;
    if (notificationEmail) {
      try {
        const alert = await resend.emails.send({
          from: fromEmail,
          to: [notificationEmail],
          subject: "JHL Alert — New Credit Assessment",
          text: [
            "JHL Alert — New Credit Assessment",
            "",
            `Submission type: Credit Assessment`,
            `Name: ${validated.data.name}`,
            `Email: ${validated.data.email}`,
            `Submitted: ${submittedAt}`,
            "",
            "Please open the JHL Credit Solutions GoDaddy Conversations inbox to review the full submission.",
          ].join("\n"),
        });

        if (alert.error) {
          console.error(
            "Resend rejected internal credit assessment notification.",
            {
              name: alert.error.name,
              message: alert.error.message,
            },
          );
        }
      } catch (error) {
        console.error(
          "Failed to send internal credit assessment notification.",
          {
            message: error instanceof Error ? error.message : "Unknown error",
          },
        );
      }
    } else {
      console.error(
        "Internal credit assessment notification skipped. Missing JHL_NOTIFICATION_EMAIL.",
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to send credit assessment email.", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return Response.json(
      { error: "Unable to send assessment email." },
      { status: 502 },
    );
  }
}
