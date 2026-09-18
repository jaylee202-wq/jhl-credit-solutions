/**
 * Client progress workflow stages.
 * Future implementation: persisted per client with audit trail.
 */

export const PROGRESS_STAGES = [
  "Enrollment",
  "Documents Received",
  "Credit Analysis",
  "Action/Dispute Round",
  "Awaiting Responses",
  "Review",
  "Next Action",
  "Completed",
] as const;

export type ProgressStage = (typeof PROGRESS_STAGES)[number];

export interface ClientProgress {
  clientId: string;
  currentStage: ProgressStage;
  stageUpdatedAt: string;
  /** Optional notes visible to authorized roles only */
  internalNotes?: string;
}

/** Lead / assessment submission — no sensitive PII beyond contact info */
export interface CreditAssessmentSubmission {
  name: string;
  email: string;
  phone: string;
  creditGoals: string[];
  primaryConcerns: string[];
  reportReviewStatus: string;
  submittedAt: string;
}
