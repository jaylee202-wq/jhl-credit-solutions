"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/FormFields";
import { SITE } from "@/lib/constants";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validateForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.subject.trim()) {
    errors.subject = "Please enter a subject.";
  }

  if (!data.message.trim()) {
    errors.message = "Please enter a message.";
  }

  return errors;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setSubmitError(null);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        setSubmitError(
          "We were unable to send your message. Please try again or email hello@jhlcreditsolutions.com.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "We were unable to send your message. Please try again or email hello@jhlcreditsolutions.com.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-12 lg:py-20">
      <SectionHeading
        title="Contact Us"
        subtitle="Have a question? We'd love to hear from you. Reach out and our team will respond as soon as possible."
      />

      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <h3 className="font-serif text-lg font-bold text-navy">
              Email
            </h3>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 block text-sm text-gold-dark hover:text-gold transition-colors"
            >
              {SITE.email}
            </a>
          </Card>
          <Card>
            <h3 className="font-serif text-lg font-bold text-navy">
              Business Mailing Address
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed whitespace-pre-line">
              {`JHL Credit Solutions
PO Box 3264
Seminole, FL 33775-3264`}
            </p>
          </Card>
          <Card>
            <h3 className="font-serif text-lg font-bold text-navy">
              Business Hours
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Monday – Friday
              <br />
              9:00 AM – 5:00 PM EST
            </p>
          </Card>
          <Card>
            <h3 className="font-serif text-lg font-bold text-navy">
              Existing Clients
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Existing clients may use this form for general service-related
              questions. Please do not submit passwords, Social Security numbers,
              financial account information, or other sensitive information.
            </p>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {submitted ? (
            <Card className="text-center py-12">
              <h3 className="font-serif text-xl font-bold text-navy">
                Message Sent
              </h3>
              <p className="mt-3 text-muted">
                Thank you for reaching out. We&apos;ll get back to you shortly.
              </p>
            </Card>
          ) : (
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <Input
                  id="contact-name"
                  label="Name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  error={errors.name}
                />
                <Input
                  id="contact-email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={errors.email}
                />
                <Input
                  id="contact-subject"
                  label="Subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  error={errors.subject}
                />
                <Textarea
                  id="contact-message"
                  label="Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  error={errors.message}
                />
                {submitError && (
                  <p className="text-sm text-red-600" role="alert">
                    {submitError}
                  </p>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
}
