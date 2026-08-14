import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LoginTabs from "@/components/LoginTabs";

export const metadata: Metadata = {
  title: "Log In — O2+",
  description: "Log in to your O2+ customer or shop account.",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero title="Log in to O2+" subtitle="Access your orders, deliveries, and account." />
        <LoginTabs />
      </main>
      <Footer />
    </>
  );
}
