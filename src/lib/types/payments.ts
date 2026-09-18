/**
 * Payment architecture types — tokenized provider integration only.
 * NEVER store raw card numbers, CVV, or full account numbers.
 */

export type PaymentProvider = "stripe" | "other";

export interface PaymentMethodToken {
  /** Token from hosted/tokenized payment provider */
  providerTokenId: string;
  provider: PaymentProvider;
  lastFour?: string;
  brand?: string;
  expiresAt?: string;
}

export interface PaymentIntent {
  id: string;
  clientId: string;
  amountCents: number;
  currency: "USD";
  status: "pending" | "processing" | "succeeded" | "failed" | "cancelled";
  /** Provider reference — not raw card data */
  providerPaymentId?: string;
  createdAt: string;
}

/** Placeholder — pricing structure pending compliance review */
export interface ProgramPricing {
  id: string;
  name: string;
  description: string;
  /** Amounts and schedules to be defined after compliance review */
  status: "pending_compliance_review";
}
