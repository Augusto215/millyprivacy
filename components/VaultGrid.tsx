"use client";

import { Lock, Play, Eye } from "lucide-react";

const MEDIA = [
  {
    id: "1",
    type: "video",
    title: "Preview na praia",
    caption: "Teaser borrado para apresentar uma parte da biblioteca premium.",
    tags: ["preview", "teaser"],
    duration: "1:42",
    isFree: true,
  },
  {
    id: "2",
    type: "video",
    title: "Drop reservado",
    caption: "Prévia protegida com desbloqueio somente para assinantes ativos.",
    tags: ["video", "vip"],
    duration: "2:48",
    isFree: false,
  },
  {
    id: "3",
    type: "video",
    title: "Quarto privado",
    caption: "Cena protegida da coleção exclusiva com acesso VIP.",
    tags: ["backstage", "members"],
    duration: "3:11",
    isFree: false,
  },
  {
    id: "4",
    type: "video",
    title: "Fantasia exclusiva",
    caption: "Prévia borrada com visual temático para os planos mais fortes.",
    tags: ["fantasy", "vip"],
    duration: "1:58",
    isFree: false,
  },
  {
    id: "5",
    type: "video",
    title: "Closet privado",
    caption: "Clip reservado com acesso liberado somente após o pagamento.",
    tags: ["video", "vault"],
    duration: "5:12",
    isFree: false,
  },
  {
    id: "6",
    type: "video",
    title: "Teaser do dia",
    caption: "Mais uma amostra borrada para dar clima de estreia.",
    tags: ["free-preview"],
    duration: "1:27",
    isFree: true,
  },
  {
    id: "7",
    type: "video",
    title: "Vista reservada",
    caption: "Biblioteca premium com takes exclusivos e acesso travado.",
    tags: ["request", "premium"],
    duration: "4:09",
    isFree: false,
  },
  {
    id: "8",
    type: "video",
    title: "Room preview",
    caption: "Prévia protegida para deixar a área de mídias mais premium.",
    tags: ["vip", "catalog"],
    duration: "7:01",
    isFree: false,
  },
];

// Gradient palettes for placeholder thumbnails
const GRADIENTS = [
  "from-[#2a1c0a] to-[#1a1208]",
  "from-[#1a0a1c] to-[#0d0812]",
  "from-[#0a1a1c] to-[#081012]",
  "from-[#1c0a0a] to-[#120808]",
  "from-[#0a1c0a] to-[#081208]",
  "from-[#1c1a0a] to-[#12100a]",
  "from-[#0a0a1c] to-[#080812]",
  "from-[#1c0a1a] to-[#12080f]",
];

export default function VaultGrid({ onLockedClick }: { onLockedClick: () => void }) {
  return (
    <section id="vault" className="mx-auto mt-8 w-full max-w-4xl px-4 sm:px-6">
      {/* Section header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2
            className="text-[20px] font-semibold tracking-[-0.04em] text-white sm:text-[22px]"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Cofre VIP da Nicole
          </h2>
          <p className="mt-0.5 text-[15px] text-white/50">
            Prévias borradas se transformam em acesso completo após pagamento confirmado.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-[#e89c30]/15 border border-[#e89c30]/30 px-3 py-1 text-[11px] font-bold text-[#e89c30] uppercase tracking-[0.08em]">
          {MEDIA.length} itens
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
        {MEDIA.map((item, i) => (
          <VaultCard
            key={item.id}
            item={item}
            gradient={GRADIENTS[i % GRADIENTS.length]}
            onLockedClick={onLockedClick}
          />
        ))}
      </div>

      {/* Bottom note */}
      <p className="mt-5 text-center text-[12px] text-white/35">
        Apenas para membros pagos. Nada libera antes da confirmação.
      </p>
    </section>
  );
}

function VaultCard({
  item,
  gradient,
  onLockedClick,
}: {
  item: (typeof MEDIA)[0];
  gradient: string;
  onLockedClick: () => void;
}) {
  const locked = !item.isFree;

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:brightness-110"
      onClick={locked ? onLockedClick : undefined}
    >
      {/* Thumbnail placeholder */}
      <div className={`relative aspect-[3/4] w-full bg-gradient-to-b ${gradient}`}>
        {/* Blur overlay for locked */}
        {locked && (
          <div className="absolute inset-0 backdrop-blur-[6px] bg-black/30" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Duration badge */}
        <div className="absolute right-2.5 top-2.5 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
          {item.duration}
        </div>

        {/* Lock / Play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {locked ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/58 text-white backdrop-blur-sm transition sm:h-14 sm:w-14">
              <Lock className="h-5 w-5" />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e89c30]/80 text-black backdrop-blur-sm transition group-hover:bg-[#e89c30] sm:h-14 sm:w-14">
              <Play className="h-5 w-5 fill-black" />
            </div>
          )}
        </div>

        {/* Free badge */}
        {item.isFree && (
          <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-md bg-[#e89c30]/90 px-2 py-0.5 text-[10px] font-bold text-black uppercase tracking-[0.06em]">
            <Eye className="h-2.5 w-2.5" />
            Grátis
          </div>
        )}

        {/* Title + caption */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-[15px] font-semibold leading-tight text-white">{item.title}</p>
          {!locked && (
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/60">
              {item.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
