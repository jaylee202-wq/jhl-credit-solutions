/**
 * Future authentication middleware.
 *
 * When implemented, this middleware will:
 * - Protect /portal/* routes (client role)
 * - Protect /admin/* routes (admin role)
 * - Restrict fulfillment contractors to assigned clients only (fulfillment role)
 * - Redirect unauthenticated users when authentication is implemented
 *
 * Fulfillment role must NOT have access to:
 * - Company financial information
 * - Company settings
 * - Other contractors
 * - Unassigned clients
 * - Administrative business data
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  void request;
  // Authentication not yet implemented — allow all routes in development
  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
