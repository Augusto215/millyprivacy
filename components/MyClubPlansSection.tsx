"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";

const DEFAULT_PLANS = [
  { id: "monthly",   label: "1 Mês",    price: "R$ 29,90", amount: 29.90 },
  { id: "quarterly", label: "3 Meses (10% off)",   price: "R$ 69,90", amount: 69.90 },
  { id: "yearly",  label: "12 Meses", price: "R$ 189,90", amount: 189.90 },
];

interface Plan {
  id: string;
  label: string;
  price: string;
  amount: number;
}

export default function MyClubPlansSection({
  onSelect,
  plans = DEFAULT_PLANS,
}: {
  onSelect: (label: string, amount: number) => void;
  plans?: Plan[];
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3.5 transition hover:bg-gray-50"
      >
        <p className="text-[17px] font-semibold text-black">Planos</p>
        <ChevronUp
          className={`h-4 w-4 text-gray-400 transition-transform ${open ? "" : "rotate-180"}`}
        />
      </button>

      {/* Plan rows */}
      {open && (
        <div className="px-3 pb-3 space-y-2">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => onSelect(plan.label, plan.amount)}
              className="flex w-full items-center justify-between rounded-2xl px-5 py-3.5 text-left font-semibold transition hover:opacity-90 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #d946a6 75%, #9d4edd 100%)",
                color: "#fff",
              }}
            >
              <span className="text-[16px] font-semibold">{plan.label}</span>
              <span className="text-[16px] font-bold">{plan.price}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
