"use client";

import { useState } from "react";
import {
  CREDIT_CONCERNS,
  CREDIT_GOALS,
  REPORT_REVIEW_OPTIONS,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import {
  CheckboxGroup,
  Input,
  RadioGroup,
} from "@/components/ui/FormFields";
import { Card } from "@/components/ui/Card";

interface FormData {
  name: string;
  email: string;
  phone: string;
  creditGoals: string[];
  primaryConcerns: string[];
  reportReviewStatus: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  creditGoals?: string;
  primaryConcerns?: string;
  reportReviewStatus?: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  creditGoals: [],
  primaryConcerns: [],
  reportReviewStatus: "",
};

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  }

  if (data.creditGoals.length === 0) {
    errors.creditGoals = "Please select at least one credit goal.";
  }

  if (data.primaryConcerns.length === 0) {
    errors.primaryConcerns = "Please select at least one concern.";
  }

  if (!data.reportReviewStatus) {
    errors.reportReviewStatus = "Please select an option.";
  }

  return errors;
}

export function CreditAssessmentForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
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
      const response = await fetch("/api/credit-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          creditGoals: formData.creditGoals,
          primaryConcerns: formData.primaryConcerns,
          reportReviewStatus: formData.reportReviewStatus,
        }),
      });

      if (!response.ok) {
        setSubmitError(
          "We were unable to submit your Credit Assessment. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "We were unable to submit your Credit Assessment. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="text-center py-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
          <svg
            className="h-8 w-8 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-bold text-navy">
          Thank You for Your Interest
        </h3>
        <p className="mt-3 max-w-md mx-auto text-muted leading-relaxed">
          Thank you. Your Credit Assessment has been received. A member of JHL
          Credit Solutions will contact you to discuss your next steps.
        </p>
        <p className="mt-4 text-sm text-muted">
          Submitting this form does not enroll you in paid services and does not
          guarantee any specific outcome.
        </p>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="name"
          label="Full Name"
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
          id="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          error={errors.email}
        />
        <div className="sm:col-span-2">
          <Input
            id="phone"
            label="Phone Number"
            type="tel"
            autoComplete="tel"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            error={errors.phone}
          />
        </div>
      </div>

      <CheckboxGroup
        legend="What are your general credit goals? (Select all that apply)"
        name="creditGoals"
        options={CREDIT_GOALS}
        values={formData.creditGoals}
        onChange={(values) =>
          setFormData({ ...formData, creditGoals: values })
        }
        error={errors.creditGoals}
      />

      <CheckboxGroup
        legend="What are your primary credit concerns? (Select all that apply)"
        name="primaryConcerns"
        options={CREDIT_CONCERNS}
        values={formData.primaryConcerns}
        onChange={(values) =>
          setFormData({ ...formData, primaryConcerns: values })
        }
        error={errors.primaryConcerns}
      />

      <RadioGroup
        legend="Have you recently reviewed your credit reports?"
        name="reportReviewStatus"
        options={[...REPORT_REVIEW_OPTIONS]}
        value={formData.reportReviewStatus}
        onChange={(value) =>
          setFormData({ ...formData, reportReviewStatus: value })
        }
        error={errors.reportReviewStatus}
      />

      <aside className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
        <p>
          <strong className="text-navy">Privacy note:</strong> This form
          collects basic contact information only. We do not request Social
          Security numbers, banking details, or full credit account numbers
          through this public form.
        </p>
      </aside>

      {submitError && (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted max-w-md">
          Submitting this form requests a consultation and does not enroll you
          in paid services or guarantee any specific credit outcome. Information
          provided is for assessment purposes only.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Assessment"}
        </Button>
      </div>
    </form>
  );
}
