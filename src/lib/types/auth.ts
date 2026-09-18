/**
 * Role-based access control types.
 * Future implementation: enforce via middleware and server-side session validation.
 */

export type UserRole = "client" | "admin" | "fulfillment";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  /** Fulfillment contractors are scoped to assigned client IDs only */
  assignedClientIds?: string[];
}

export interface Session {
  user: AuthenticatedUser;
  expiresAt: string;
}

/** Minimum permissions per role — least-privilege by design */
export const ROLE_PERMISSIONS = {
  client: [
    "portal:dashboard:read",
    "portal:documents:read",
    "portal:documents:upload",
    "portal:agreements:read",
    "portal:agreements:sign",
    "portal:progress:read",
    "portal:messages:read",
    "portal:messages:write",
    "portal:billing:read",
    "portal:receipts:read",
    "portal:account:read",
    "portal:account:update",
  ],
  fulfillment: [
    "portal:clients:read:assigned",
    "portal:documents:read:assigned",
    "portal:progress:read:assigned",
    "portal:progress:update:assigned",
    "portal:messages:read:assigned",
    "portal:messages:write:assigned",
  ],
  admin: [
    "admin:leads:read",
    "admin:leads:write",
    "admin:clients:read",
    "admin:clients:write",
    "admin:documents:read",
    "admin:documents:write",
    "admin:agreements:read",
    "admin:agreements:write",
    "admin:workflow:read",
    "admin:workflow:write",
    "admin:billing:read",
    "admin:billing:write",
    "admin:notes:read",
    "admin:notes:write",
    "admin:activity:read",
    "admin:settings:read",
    "admin:settings:write",
    "admin:fulfillment:assign",
  ],
} as const;

export type Permission =
  (typeof ROLE_PERMISSIONS)[keyof typeof ROLE_PERMISSIONS][number];
