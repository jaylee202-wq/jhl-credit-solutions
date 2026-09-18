import { Resend } from "resend";

export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validatePayload(
  body: unknown,
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
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

  if (!isNonEmptyString(record.subject)) {
    return { ok: false, error: "Subject is required." };
  }

  if (!isNonEmptyString(record.message)) {
    return { ok: false, error: "Message is required." };
  }

  const name = record.name.trim();
  const subject = record.subject.trim();
  const message = record.message.trim();

  if (name.length > 200) {
    return { ok: false, error: "Name is too long." };
  }

  if (subject.length > 300) {
    return { ok: false, error: "Subject is too long." };
  }

  if (message.length > 5000) {
    return { ok: false, error: "Message is too long." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      subject,
      message,
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

function buildEmailContent(data: ContactPayload, submittedAt: string) {
  const text = [
    "New Contact Message — JHL Credit Solutions",
    "",
    `Submitted: ${submittedAt}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1a2744; line-height: 1.5;">
      <h2 style="margin: 0 0 16px;">New Contact Message — JHL Credit Solutions</h2>
      <p style="margin: 0 0 12px;"><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p style="margin: 0 0 4px;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p style="margin: 0 0 16px;"><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p style="margin: 0 0 4px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
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
      "Contact email is not configured. Missing RESEND_API_KEY or CREDIT_ASSESSMENT_FROM_EMAIL.",
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
      subject: "New Contact Message — JHL Credit Solutions",
      text,
      html,
    });

    if (result.error) {
      console.error("Resend rejected contact email.", {
        name: result.error.name,
        message: result.error.message,
      });
      return Response.json(
        { error: "Unable to send contact email." },
        { status: 502 },
      );
    }

    const notificationEmail = process.env.JHL_NOTIFICATION_EMAIL;
    if (notificationEmail) {
      try {
        const alert = await resend.emails.send({
          from: fromEmail,
          to: [notificationEmail],
          subject: "JHL Alert — New Contact Message",
          text: [
            "JHL Alert — New Contact Message",
            "",
            `Submission type: Contact form`,
            `Name: ${validated.data.name}`,
            `Email: ${validated.data.email}`,
            `Subject: ${validated.data.subject}`,
            `Submitted: ${submittedAt}`,
            "",
            "Please open the JHL Credit Solutions GoDaddy Conversations inbox to review the full submission.",
          ].join("\n"),
        });

        if (alert.error) {
          console.error("Resend rejected internal contact notification.", {
            name: alert.error.name,
            message: alert.error.message,
          });
        }
      } catch (error) {
        console.error("Failed to send internal contact notification.", {
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    } else {
      console.error(
        "Internal contact notification skipped. Missing JHL_NOTIFICATION_EMAIL.",
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email.", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return Response.json(
      { error: "Unable to send contact email." },
      { status: 502 },
    );
  }
}
