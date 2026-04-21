"use client";

import { useState } from "react";
import DeliveryChoiceModal from "@/components/DeliveryChoiceModal";

export default function TestDeliveryPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState("emilly");
  const [lastAction, setLastAction] = useState<string>("");

  const handleTelegram = () => {
    setLastAction("Telegram selecionado - redirecionando para link...");
  };

  const handleSite = () => {
    setLastAction("Site selecionado - continuando para security-fee...");
  };

  const handleClose = () => {
    setIsOpen(false);
    setLastAction("Modal fechado");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Test Delivery Choice Modal</h1>

        {/* Controls */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 mb-6 space-y-4">
          <div>
            <label className="text-white text-sm font-semibold mb-2 block">
              Selecione o criador:
            </label>
            <select
              value={selectedCreator}
              onChange={(e) => setSelectedCreator(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#e89c30]"
            >
              <option value="emilly">Emilly (Milly)</option>
              <option value="yasmin">Yasmin</option>
            </select>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-[#e89c30] text-black font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            Abrir Modal de Escolha
          </button>
        </div>

        {/* Status */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Status:</h2>
          <div className="space-y-2 text-sm">
            <p className="text-white/70">
              <span className="text-[#e89c30]">Criador selecionado:</span>{" "}
              <span className="text-white font-mono">{selectedCreator}</span>
            </p>
            <p className="text-white/70">
              <span className="text-[#e89c30]">Modal aberto:</span>{" "}
              <span className="text-white font-mono">{isOpen ? "SIM" : "NÃO"}</span>
            </p>
            {lastAction && (
              <p className="text-white/70">
                <span className="text-[#e89c30]">Última ação:</span>{" "}
                <span className="text-white font-mono">{lastAction}</span>
              </p>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-[#181818] border border-white/8 rounded-xl p-4 text-sm text-white/60">
          <p>
            🧪 Página de teste para visualizar o{" "}
            <span className="text-[#e89c30]">DeliveryChoiceModal</span>. Clique
            nos botões do modal para testar as funcionalidades.
          </p>
        </div>
      </div>

      {/* Modal */}
      <DeliveryChoiceModal
        isOpen={isOpen}
        onClose={handleClose}
        onTelegram={handleTelegram}
        onSite={handleSite}
        creatorSlug={selectedCreator}
      />
    </div>
  );
}
