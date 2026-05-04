"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import MyClubHeader from "@/components/MyClubHeader";
import MyClubProfileCard from "@/components/MyClubProfileCard";
import MyClubOfferCard from "@/components/MyClubOfferCard";
import MyClubContentFeed from "@/components/MyClubContentFeed";
import PixModal from "@/components/PixModal";
import MyClubPlansSection from "@/components/MyClubPlansSection";
import CreateAccountModal from "@/components/CreateAccountModal";

interface SelectedPlan {
  label: string;
  amount: number;
}

interface PendingPlan {
  label: string;
  amount: number;
}

const MYCLUB_PLANS = [
  { id: "monthly",   label: "1 Mês",    price: "R$ 29,90", amount: 29.90 },
  { id: "quarterly", label: "3 Meses (10% off)",   price: "R$ 69,90", amount: 69.90 },
  { id: "yearly",  label: "12 Meses", price: "R$ 189,90", amount: 189.90 },
];

const MYCLUB_FEED_ITEMS = [
  { id: "1", isFree: false, likes: 124, comments: 18, image: "/img/Untitled design (1) (1).png" },
  { id: "2", isFree: false, likes: 341, comments: 47, image: "/img/Untitled design (3).png" },
  { id: "3", isFree: false, likes: 215, comments: 32, image: "/img/Untitled design (1) (1).png" },
  { id: "4", isFree: false, likes: 456, comments: 61, image: "/img/Untitled design (3).png" },
];

export default function MyClub() {
  const router = useRouter();
  const [plan, setPlan] = useState<SelectedPlan | null>(null);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<PendingPlan | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data: userData } = await supabaseBrowser.auth.getUser();
      if (userData.user) {
        setIsLoggedIn(true);
        router.replace("/content/emilly");
      } else {
        setIsLoggedIn(false);
      }
    }

    checkAuth();
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      async function checkCountry() {
        try {
          const res = await fetch("/api/check-country");
          const data = await res.json();
          if (data.countryCode && data.countryCode !== "BR") {
            router.replace("/of");
          }
        } catch (error) {
          console.error("Error checking country:", error);
        }
      }

      checkCountry();
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  const handlePlanClick = (label: string, amount: number) => {
    if (!isLoggedIn) {
      setPendingPlan({ label, amount });
      setShowCreateAccount(true);
    } else {
      setPlan({ label, amount });
    }
  };

  const handleAccountCreated = () => {
    setIsLoggedIn(true);
    if (pendingPlan) {
      setPlan(pendingPlan);
      setPendingPlan(null);
    }
  };

  const closeModal = () => setPlan(null);

  return (
    <>
      <MyClubHeader />

      <main className="min-h-screen bg-white pt-12">
        <div className="mx-auto flex max-w-[480px] flex-col gap-3 px-3 py-4 pb-12">
          <MyClubProfileCard coverImg="/img/emilly_cover.png" />

          <MyClubOfferCard
            onSubscribe={() => handlePlanClick("3 Meses", 24.80)}
          />

          <MyClubPlansSection
            plans={MYCLUB_PLANS}
            onSelect={(label, amount) => handlePlanClick(label, amount)}
          />

          <MyClubContentFeed
            onLockedClick={() => handlePlanClick("1 Mês", 29.90)}
            feedItems={MYCLUB_FEED_ITEMS}
          />
        </div>
      </main>

      <CreateAccountModal
        isOpen={showCreateAccount}
        onClose={() => setShowCreateAccount(false)}
        onAccountCreated={handleAccountCreated}
        planLabel={pendingPlan?.label}
        planAmount={pendingPlan?.amount}
      />

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
