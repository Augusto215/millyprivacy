"use client";

import { Users, Play, ImageIcon } from "lucide-react";

export default function Hero({ onSubscribeClick }: { onSubscribeClick: () => void }) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Cover banner */}
      <div className="h-44 w-full bg-gradient-to-br from-[#1a1208] via-[#2a1c0a] to-[#181818] sm:h-56">
        <div className="cover-bg h-full w-full opacity-30" />
      </div>

      {/* Profile card */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative -mt-10 rounded-[24px] border border-white/10 bg-[#111111] pb-6 pt-4 sm:-mt-12 sm:rounded-[28px]">
          {/* Avatar */}
          <div className="absolute -top-10 left-5 h-[72px] w-[72px] overflow-hidden rounded-full border-4 border-[#111111] bg-[#2a2a2a] sm:-top-12 sm:left-6 sm:h-[80px] sm:w-[80px]">
            <div className="h-full w-full bg-gradient-to-br from-[#e89c30]/30 to-[#111111] flex items-center justify-center text-[#e89c30] text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>
              N
            </div>
          </div>

          <div className="px-5 pt-8 sm:px-6 sm:pt-10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1
                  className="text-[22px] font-semibold tracking-[-0.05em] text-white sm:text-[26px]"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  Nicole
                </h1>
                <p className="text-[17px] text-white/50">@nicole.vip</p>

                <p className="mt-3 max-w-sm text-[17px] leading-relaxed text-white/70">
                  Conteúdo exclusivo e premium. Acesso especial com atualizações diárias,
                  conversa reservada e íntima.
                </p>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-5">
                  <div className="flex items-center gap-1.5 text-[15px] text-white/60">
                    <Users className="h-3.5 w-3.5" />
                    <span className="font-semibold text-white">18.4K</span>
                    <span>assinantes</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[15px] text-white/60">
                    <Play className="h-3.5 w-3.5" />
                    <span className="font-semibold text-white">200+</span>
                    <span>vídeos</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[15px] text-white/60">
                    <ImageIcon className="h-3.5 w-3.5" />
                    <span className="font-semibold text-white">500+</span>
                    <span>fotos</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={onSubscribeClick}
                className="shrink-0 inline-flex h-10 items-center justify-center rounded-xl bg-[#e89c30] px-5 text-[15px] font-bold text-black transition hover:bg-[#e89c30]/90 sm:h-11 sm:px-6 sm:text-sm"
              >
                Assinar agora
              </button>
            </div>

            {/* Feature pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Vault desbloqueado após pagamento",
                "WhatsApp VIP disponível",
                "Pedidos especiais nos planos maiores",
              ].map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center rounded-full border border-[#e89c30]/25 bg-[#e89c30]/10 px-3 py-1 text-[11px] font-medium text-[#e89c30]"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
