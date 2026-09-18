import type { Metadata } from "next";
import { ProgressPlaceholder } from "@/components/portal/PortalPlaceholderPage";

export const metadata: Metadata = {
  title: "Progress",
  robots: { index: false, follow: false },
};

export default function PortalProgressPage() {
  return <ProgressPlaceholder />;
}
