"use client";

import { useState } from "react";
import { Images, Play, UserCheck, Heart } from "lucide-react";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import SubscribeBox from "@/components/SubscribeBox";
import PlansSection from "@/components/PlansSection";
import ContentFeed from "@/components/ContentFeed";
import PixModal from "@/components/PixModal";

// ─── Dados da Aline — edite aqui ────────────────────────────────────────────

const CREATOR = {
  name: "Aline Oliveira",
  username: "@alineoliveira",
  bio: "Bem-vindo ao meu universo exclusivo... Aqui você descobre o melhor de mim 🔥",
  profileImg: "/img/aline_profile.png",   // troque pelo caminho da foto da Aline
  coverImg: "/img/aline_cover.png",       // troque pelo caminho da capa da Aline
  stats: [
    { icon: Images,    value: "142" },
    { icon: Play,      value: "521" },
    { icon: UserCheck, value: "48" },
    { icon: Heart,     value: "298.2K" },
  ],
};

const PLANS = [
  { id: "monthly",   label: "1 Mês (26% off)",    price: "R$ 13,88", amount: 13.88 },
  { id: "quarterly", label: "3 meses (42% off)",   price: "R$ 19,87", amount: 19.87 },
  { id: "lifetime",  label: "Vitalício (50% off)", price: "R$ 35,98", amount: 35.98 },
];

const FEED_ITEMS = [
  { id: "1", isFree: false, likes: 156, comments: 22, image: "/img/aline_1.png" },
  { id: "2", isFree: false, likes: 289, comments: 35, image: "/img/aline_2.png" },
];

const DEFAULT_PLAN = { label: PLANS[0].label, amount: PLANS[0].amount };

// ─────────────────────────────────────────────────────────────────────────────

interface SelectedPlan {
  label: string;
  amount: number;
}

export default function Aline() {
  const [plan, setPlan] = useState<SelectedPlan | null>(null);

  const openModal = (label: string, amount: number) => setPlan({ label, amount });
  const closeModal = () => setPlan(null);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-12">
        <div className="mx-auto flex max-w-[480px] flex-col gap-3 px-3 py-4 pb-12">
          <ProfileCard
            name={CREATOR.name}
            username={CREATOR.username}
            bio={CREATOR.bio}
            stats={CREATOR.stats}
            profileImg={CREATOR.profileImg}
            coverImg={CREATOR.coverImg}
            showLiveBorder={false}
          />

          <SubscribeBox
            creatorName={CREATOR.name}
            price="13,88"
            onSubscribe={() => openModal(DEFAULT_PLAN.label, DEFAULT_PLAN.amount)}
            onLogin={() => openModal(DEFAULT_PLAN.label, DEFAULT_PLAN.amount)}
          />

          <PlansSection
            plans={PLANS}
            onSelect={(label, amount) => openModal(label, amount)}
          />

          <ContentFeed
            creatorName={CREATOR.name}
            creatorHandle={CREATOR.username}
            profileImg={CREATOR.profileImg}
            feedItems={FEED_ITEMS}
            onLockedClick={() => openModal(DEFAULT_PLAN.label, DEFAULT_PLAN.amount)}
          />
        </div>
      </main>

      <PixModal
        isOpen={plan !== null}
        onClose={closeModal}
        planLabel={plan?.label ?? ""}
        planAmount={plan?.amount ?? 0}
        creatorName={CREATOR.name}
        creatorHandle={CREATOR.username}
        profileImg={CREATOR.profileImg}
        creatorSlug="aline"
      />
    </>
  );
}
