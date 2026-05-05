"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import SubscribeBox from "@/components/SubscribeBox";
import PlansSection from "@/components/PlansSection";
import ContentFeed from "@/components/ContentFeed";
import PixModal from "@/components/PixModal";

interface SelectedPlan {
  label: string;
  amount: number;
}

export default function Home() {
  const router = useRouter();
  const [plan, setPlan] = useState<SelectedPlan | null>(null);

  // Check auth immediately
  useEffect(() => {
    async function checkAuth() {
      const { data: userData } = await supabaseBrowser.auth.getUser();
      if (userData.user) {
        // Check if user has purchased content
        try {
          const res = await fetch("/api/user/has-purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userData.user.id }),
          });

          const data = await res.json();
          if (data.hasPurchase) {
            router.replace("/content/emilly");
          }
        } catch (error) {
          console.error("Error checking purchases:", error);
        }
      }
    }

    checkAuth();
  }, [router]);

  // Check country after page loads (with delay to allow page to render first)
  useEffect(() => {
    const timer = setTimeout(() => {
      async function checkCountry() {
        try {
          const res = await fetch("/api/check-country");
          const data = await res.json();
          console.log("Country code:", data.countryCode);
          if (data.countryCode && data.countryCode !== "BR") {
            console.log("Redirecting to /of");
            router.replace("/of");
          }
        } catch (error) {
          console.error("Error checking country:", error);
        }
      }

      checkCountry();
    }, 1000); // Wait 1 second before checking country

    return () => clearTimeout(timer);
  }, [router]);

  const openModal = (label: string, amount: number) =>
    setPlan({ label, amount });

  const closeModal = () => setPlan(null);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-12">
        <div className="mx-auto flex max-w-[480px] flex-col gap-3 px-3 py-4 pb-12">
          <ProfileCard />

          <SubscribeBox
            onSubscribe={() => openModal("1 Mês", 13.87)}
            onLogin={() => openModal("1 Mês", 13.87)}
          />

          <PlansSection onSelect={(label, amount) => openModal(label, amount)} />

          <ContentFeed onLockedClick={() => openModal("1 Mês", 13.87)} />
        </div>
      </main>

      <PixModal
        isOpen={plan !== null}
        onClose={closeModal}
        planLabel={plan?.label ?? ""}
        planAmount={plan?.amount ?? 0}
        creatorSlug="emilly"
      />
    </>
  );
}
