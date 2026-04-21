"use client";

import { X, Send, Globe } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTelegram: () => void;
  onSite: () => void;
  creatorSlug: string;
}

const TELEGRAM_LINKS: Record<string, string> = {
  emilly: "https://t.me/+VoVhGbElU9YwNmQx",
  yasmin: "https://t.me/+GNFQawBbmtIwMTgx",
};

export default function DeliveryChoiceModal({
  isOpen,
  onClose,
  onTelegram,
  onSite,
  creatorSlug,
}: Props) {
  if (!isOpen) return null;

  const telegramLink = TELEGRAM_LINKS[creatorSlug] || TELEGRAM_LINKS.emilly;

  const handleTelegram = () => {
    window.open(telegramLink, "_blank");
    onTelegram();
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-[480px] overflow-hidden rounded-t-[28px] border border-white/10 bg-[#0f0f0f] text-white sm:rounded-[28px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div>
            <h2 className="text-[18px] font-semibold tracking-[-0.04em] text-white">
              Como deseja receber?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/8 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-6">
          <p className="text-[14px] text-white/70 mb-6">
            Escolha como prefere receber seu conteúdo exclusivo:
          </p>

          <div className="space-y-3">
            {/* Telegram Option */}
            <button
              onClick={handleTelegram}
              className="w-full rounded-xl border border-white/10 bg-[#181818] p-4 text-left transition hover:bg-[#1f1f1f] hover:border-[#e89c30]/40 group"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0088cc]/20 group-hover:bg-[#0088cc]/30 transition">
                  <Send className="h-5 w-5 text-[#0088cc]" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-white">
                    Telegram
                  </p>
                  <p className="text-[12px] text-white/50 mt-1">
                    Receba direto no seu Telegram
                  </p>
                </div>
              </div>
            </button>

            {/* Site Option */}
            <button
              onClick={onSite}
              className="w-full rounded-xl border border-white/10 bg-[#181818] p-4 text-left transition hover:bg-[#1f1f1f] hover:border-[#e89c30]/40 group"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e89c30]/20 group-hover:bg-[#e89c30]/30 transition">
                  <Globe className="h-5 w-5 text-[#e89c30]" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-white">
                    Site
                  </p>
                  <p className="text-[12px] text-white/50 mt-1">
                    Acesse pelo site normalmente
                  </p>
                </div>
              </div>
            </button>
          </div>

          <p className="text-[12px] text-white/40 mt-6 text-center">
            Você poderá mudar essa preferência depois
          </p>
        </div>
      </div>
    </div>
  );
}
