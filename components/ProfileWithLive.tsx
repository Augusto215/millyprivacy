"use client";

import { useState } from "react";
import LiveViewer from "./LiveViewer";

interface ProfileWithLiveProps {
  name?: string;
  username?: string;
  bio?: string;
  profileImg?: string;
  children?: React.ReactNode;
}

export default function ProfileWithLive({
  name = "Emilly Faria",
  profileImg = "/img/profile-img.png",
  children,
}: ProfileWithLiveProps) {
  const [isLiveOpen, setIsLiveOpen] = useState(false);

  return (
    <>
      {/* Profile Section with Live Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveOpen(true)}
            className="relative"
            title="Clique para assistir ao live"
          >
            <style>{`
              @keyframes liveGradientBorder {
                0% {
                  box-shadow:
                    0 0 0 2px #ff6b35,
                    0 0 15px rgba(255, 107, 53, 0.5);
                }
                25% {
                  box-shadow:
                    0 0 0 2px #ffa500,
                    0 0 15px rgba(255, 165, 0, 0.5);
                }
                50% {
                  box-shadow:
                    0 0 0 2px #ff69b4,
                    0 0 15px rgba(255, 105, 180, 0.5);
                }
                75% {
                  box-shadow:
                    0 0 0 2px #da70d6,
                    0 0 15px rgba(218, 112, 214, 0.5);
                }
                100% {
                  box-shadow:
                    0 0 0 2px #ff6b35,
                    0 0 15px rgba(255, 107, 53, 0.5);
                }
              }
              .live-border-mini {
                border-radius: 50%;
                animation: liveGradientBorder 4s ease-in-out infinite;
              }
            `}</style>
            <div className="live-border-mini rounded-full flex items-center justify-center" style={{ width: "68px", height: "68px" }}>
              <div className="h-[68px] w-[68px] overflow-hidden rounded-full border-[2px] border-white bg-gray-200">
                <img src={profileImg} alt={name} className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center gap-0.5 bg-orange-500 rounded px-1.5 py-0.5 text-white text-[7px] font-bold shadow-lg whitespace-nowrap">
              <div className="h-1 w-1 rounded-full bg-white animate-pulse" />
              AO VIVO
            </div>
          </button>
          <div>
            <h3 className="font-bold text-sm">{name}</h3>
            <p className="text-xs text-gray-500">Clique para assistir</p>
          </div>
        </div>
        {children}
      </div>

      {/* Live Modal */}
      {isLiveOpen && <LiveViewer />}
    </>
  );
}
