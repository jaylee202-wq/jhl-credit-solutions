import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { KonnectBuddy } from "@/components/chatbot/KonnectBuddy";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <KonnectBuddy />
    </>
  );
}
