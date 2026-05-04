"use client";

import { Sparkles } from "lucide-react";

interface MyClubOfferCardProps {
  onSubscribe: () => void;
  profileImg?: string;
  bonusText?: string;
  savedPercentage?: string;
  offerLabel?: string;
  offerPrice?: string;
  originalPrice?: string;
}

export default function MyClubOfferCard({
  onSubscribe,
  profileImg = "img/profile-img.png",
  bonusText = "Bônus 🎁: Chamadas de vídeo, lives, áudios gemendo, e vídeos peladinha todos os dias!! 💋",
  savedPercentage = "20%",
  offerLabel = "3 Meses: Assinar Agora",
  offerPrice = "R$ 24,80",
  originalPrice = "R$ 69,90",
}: MyClubOfferCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-gray-200 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#d946a6]" />
        <p className="text-[17px] font-semibold text-black">Oferta de assinatura</p>
      </div>

      {/* Bonus box */}
      <div className="px-4 py-3 bg-gray-50">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-[#d946a6]/40 to-[#f5f5f5] flex-shrink-0 flex items-center justify-center mt-0.5">
            <img src={profileImg} alt="avatar" className="h-full w-full object-cover" />
          </div>
          <p className="text-[13px] leading-relaxed text-black flex-1 pt-0.5">
            {bonusText}
          </p>
        </div>
      </div>

      {/* Saved badge + CTA */}
      <div className="px-4 pt-3 pb-4 space-y-2">
        {/* Saved badge */}
        <div className="flex items-center gap-2">
          <span className="inline-block bg-green-100 text-green-700 text-[12px] font-bold px-2 py-1 rounded-full">
            Economize {savedPercentage}
          </span>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={onSubscribe}
          className="w-full py-3.5 rounded-2xl text-white font-semibold text-[16px] transition hover:opacity-90 flex items-center justify-between px-5"
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 30%, #d946a6 70%, #9d4edd 100%)",
          }}
        >
          <span>{offerLabel}</span>
          <span>({offerPrice})</span>
        </button>

        {/* Original price */}
        <div className="text-center text-[12px] text-gray-600">
          Preço original <span className="line-through">{originalPrice}</span>
        </div>
      </div>
    </div>
  );
}
