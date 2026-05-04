"use client";

import { Images, Play, UserCheck, Heart } from "lucide-react";
import React from "react";
import { useState } from "react";

const DEFAULT_STATS = [
  { icon: Images,    value: "156" },
  { icon: Play,      value: "78" },
  { icon: UserCheck, value: "0" },
  { icon: Heart,     value: "5.4K" },
];

const DEFAULT_BIO = "A japa mais brasileira que vc vai conhecer 🇧🇷 aqui agente pode se conectar melhor 😘 vem ser meu assistente pra me ver...";

interface MyClubProfileCardProps {
  name?: string;
  username?: string;
  bio?: string;
  location?: string;
  stats?: { icon: React.ElementType; value: string }[];
  profileImg?: string;
  coverImg?: string;
}

export default function MyClubProfileCard({
  name = "Emilly Faria",
  username = "@millyfaria4",
  bio = DEFAULT_BIO,
  location = "São Paulo - SP",
  stats = DEFAULT_STATS,
  profileImg = "img/profile-img.png",
  coverImg,
}: MyClubProfileCardProps) {
  const [expanded, setExpanded] = useState(false);
  const short = bio.slice(0, 100);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <style>{`
        @keyframes liveGradientShadow {
          0% {
            box-shadow: 0 0 0 3px #d946a6, 0 0 20px 3px rgba(217, 70, 166, 0.3);
          }
          50% {
            box-shadow: 0 0 0 3px #9d4edd, 0 0 20px 3px rgba(157, 78, 221, 0.3);
          }
          100% {
            box-shadow: 0 0 0 3px #d946a6, 0 0 20px 3px rgba(217, 70, 166, 0.3);
          }
        }
        .myclub-live-border {
          border-radius: 50%;
          animation: liveGradientShadow 3s ease infinite;
        }
      `}</style>

      {/* Cover */}
      <div className="relative h-40 w-full bg-gradient-to-br from-[#f0f0f0] via-[#e0e0e0] to-[#d0d0d0] sm:h-40">
        <div
          className="absolute inset-0 opacity-100"
          style={coverImg ? { backgroundImage: `url('${coverImg}')`, backgroundSize: "cover", backgroundPosition: "center" } : { background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 30%, #d946a6 70%, #9d4edd 100%)" }}
        />

        {/* Stats overlay (top right) */}
        <div className="absolute top-3 right-3 bg-black/40 rounded-lg px-3 py-2 backdrop-blur-sm flex items-center gap-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-1">
                <Icon className="h-3.5 w-3.5 text-white" />
                <span className="text-[12px] font-semibold text-white">{s.value}</span>
              </div>
            );
          })}
        </div>

        {/* Avatar with Live Border */}
        <div className="absolute -bottom-8 left-4">
          <div
            className="myclub-live-border rounded-full flex items-center justify-center"
            style={{ width: "96px", height: "96px" }}
          >
            <div className="h-[96px] w-[96px] overflow-hidden rounded-full border-[3px] border-white bg-gray-200">
              <img src={profileImg} alt="avatar" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Live Badge */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center gap-1 rounded-full px-2 py-1 text-white text-[11px] font-bold shadow-lg whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #d946a6 0%, #9d4edd 100%)",
            }}
          >
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            LIVE
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-5 pt-10">
        {/* Name row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-[17px] font-bold tracking-[-0.03em] text-black">{name}</h1>
              <span className="flex h-4 w-4 items-center justify-center rounded-full">
                <svg fill="none" viewBox="0 0 22 22" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.00012 12L11.0001 14L15.0001 10M7.83486 4.69705C8.55239 4.63979 9.23358 4.35763 9.78144 3.89075C11.0599 2.80123 12.9403 2.80123 14.2188 3.89075C14.7667 4.35763 15.4478 4.63979 16.1654 4.69705C17.8398 4.83067 19.1695 6.16031 19.3031 7.83474C19.3603 8.55227 19.6425 9.23346 20.1094 9.78132C21.1989 11.0598 21.1989 12.9402 20.1094 14.2187C19.6425 14.7665 19.3603 15.4477 19.3031 16.1653C19.1695 17.8397 17.8398 19.1693 16.1654 19.303C15.4479 19.3602 14.7667 19.6424 14.2188 20.1093C12.9403 21.1988 11.0599 21.1988 9.78144 20.1093C9.23358 19.6424 8.55239 19.3602 7.83486 19.303C6.16043 19.1693 4.83079 17.8397 4.69717 16.1653C4.63991 15.4477 4.35775 14.7665 3.89087 14.2187C2.80135 12.9402 2.80135 11.0598 3.89087 9.78132C4.35775 9.23346 4.63991 8.55227 4.69717 7.83474C4.83079 6.16031 6.16043 4.83067 7.83486 4.69705Z"
                    stroke="#d946a6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <p className="text-[13px] text-gray-500">
              {username} · <span className="text-[#d946a6]">Disponível agora</span>
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-3">
          <p className="text-[14px] leading-relaxed text-black">
            {expanded ? bio : short + (bio.length > 100 ? "…" : "")}
          </p>
          {bio.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-[12px] font-semibold text-[#d946a6] hover:underline"
            >
              {expanded ? "Ver menos" : "Ler mais"}
            </button>
          )}
        </div>

        {/* Location */}
        {location && (
          <div className="mt-2 flex items-center gap-1 text-[13px] text-gray-600">
            <span>📍</span>
            <span>{location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
