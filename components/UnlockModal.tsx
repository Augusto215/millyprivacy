"use client";

import { X, Check, Shield, Zap, Star, Crown, Infinity } from "lucide-react";
import { useEffect } from "react";

const PLANS = [
  { id: "weekly", name: "Semanal", priceUsd: 3.51, interval: "semana", icon: Zap },
  { id: "monthly", name: "Mensal", priceUsd: 5.03, interval: "mês", icon: Star, popular: true },
  { id: "quarterly", name: "Trimestral", priceUsd: 7.23, interval: "trimestre", icon: Crown },
  { id: "lifetime", name: "Vitalício", priceUsd: 10.19, interval: null, icon: Infinity },
];

const FEATURES = [
  "Acesso imediato ao conteúdo protegido",
  "Chat privado e pedidos personalizados",
  "Liberação VIP automática após a aprovação",
];

export default function UnlockModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#141414] text-white card-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e89c30]/80">
              Nicole VIP
            </p>
            <h2
              className="text-[19px] font-semibold tracking-[-0.04em] text-white"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Escolha seu plano VIP
            </h2>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 pb-6 pt-5">
          {/* Benefits */}
          <div className="rounded-[20px] border border-white/8 bg-[#1a1a1a] p-5">
            <h3 className="text-[15px] font-semibold text-white">Benefícios exclusivos</h3>
            <ul className="mt-3 space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[17px] text-white/75">
                  <Check className="h-4 w-4 shrink-0 text-[#e89c30]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Plans */}
          <div className="mt-5">
            <p className="mb-3 text-[15px] font-semibold uppercase tracking-[0.1em] text-white/40">
              Escolha o plano
            </p>
            <div className="space-y-2.5">
              {PLANS.map((plan) => {
                const Icon = plan.icon;
                return (
                  <button
                    key={plan.id}
                    className={`group relative flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all ${
                      plan.popular
                        ? "border-[#e89c30] bg-[#e89c30]/8 hover:bg-[#e89c30]/12"
                        : "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/6"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2.5 left-4 rounded-full bg-[#e89c30] px-2.5 py-0.5 text-[10px] font-bold text-black uppercase tracking-[0.06em]">
                        Popular
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${plan.popular ? "bg-[#e89c30]/20 text-[#e89c30]" : "bg-white/8 text-white/60"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[15px] font-semibold text-white">{plan.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[18px] font-bold tracking-[-0.04em] text-white">
                        ${plan.priceUsd.toFixed(2)}
                      </span>
                      {plan.interval && (
                        <span className="ml-1 text-[12px] text-white/40">/{plan.interval}</span>
                      )}
                      {!plan.interval && (
                        <span className="ml-1 text-[11px] font-medium text-[#e89c30]">único</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Security note */}
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/8 bg-white/3 p-4">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#e89c30]" />
            <p className="text-[12px] leading-relaxed text-white/55">
              Escolha o plano e desbloqueie o acesso somente após a verificação do pagamento aprovado.
              Prévias borradas se tornam acesso completo após o check de pagamento.
            </p>
          </div>

          {/* Legal */}
          <p className="mt-4 text-center text-[11px] text-white/30">
            As assinaturas são cobradas conforme o plano escolhido. Você pode cancelar a qualquer
            momento nas configurações da sua conta.
          </p>
        </div>
      </div>
    </div>
  );
}
