"use client";

import { X, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAccountCreated: (userId: string) => void;
  planLabel?: string;
  planAmount?: number;
}

export default function CreateAccountModal({
  isOpen,
  onClose,
  onAccountCreated,
  planLabel,
  planAmount,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Nome é obrigatório.");
      return;
    }

    if (!phone.trim()) {
      setError("Telefone é obrigatório.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      // Generate a unique email from phone
      const email = `user_${phone.replace(/\D/g, "")}_${Date.now()}@myclubfans.local`;

      const { data, error: authErr } = await supabaseBrowser.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
            phone: phone,
          },
        },
      });

      if (authErr) {
        if (authErr.message.includes("exceed_cached_egress_quota")) {
          setError("Servidor sobrecarregado. Tente novamente em alguns segundos.");
        } else if (authErr.message.includes("User already registered")) {
          setError("Este email já foi cadastrado. Tente fazer login.");
        } else {
          setError(authErr.message || "Erro ao criar conta. Tente novamente.");
        }
        setLoading(false);
        return;
      }

      const userId = data.user?.id;
      if (!userId) {
        setError("Erro ao criar conta. Tente novamente.");
        setLoading(false);
        return;
      }

      setDone(true);
      setTimeout(() => {
        onAccountCreated(userId);
        setName("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setDone(false);
        onClose();
      }, 1500);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro de conexão";
      if (errorMsg.includes("exceed_cached_egress_quota")) {
        setError("Servidor sobrecarregado. Tente novamente em alguns segundos.");
      } else {
        setError("Erro de conexão. Tente novamente.");
      }
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white overflow-hidden">
        {/* Header */}
        <div className="relative px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-black">Criar Conta</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {done ? (
            <div className="flex flex-col items-center gap-4 py-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" strokeWidth={2.5} />
              </div>
              <p className="text-[16px] font-semibold text-black">Conta criada!</p>
              <p className="text-sm text-gray-600">Iniciando pagamento...</p>
            </div>
          ) : (
            <>
              <p className="text-[14px] text-gray-600 mb-4">
                Falta pouco para acessar o conteúdo exclusivo
              </p>

              <div className="bg-green-50 rounded-xl px-4 py-3 mb-4 flex items-center gap-2 text-[13px] text-green-700">
                <span>👥</span>
                <span>Mais de 859 pessoas criaram conta hoje</span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pl-10 text-[14px] text-black placeholder:text-gray-400 outline-none focus:border-[#d946a6] focus:ring-1 focus:ring-[#d946a6]"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Seu telefone"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pl-10 text-[14px] text-black placeholder:text-gray-400 outline-none focus:border-[#d946a6] focus:ring-1 focus:ring-[#d946a6]"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📞</span>
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Criar senha"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pl-10 text-[14px] text-black placeholder:text-gray-400 outline-none focus:border-[#d946a6] focus:ring-1 focus:ring-[#d946a6]"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔐</span>
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar senha"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pl-10 text-[14px] text-black placeholder:text-gray-400 outline-none focus:border-[#d946a6] focus:ring-1 focus:ring-[#d946a6]"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔐</span>
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl py-3.5 font-semibold text-white text-[16px] transition hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 30%, #d946a6 70%, #9d4edd 100%)",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    "Criar Conta"
                  )}
                </button>

                {/* Footer */}
                <div className="flex flex-col gap-2 text-center text-[13px]">
                  <p className="text-gray-500">
                    <span>⚡</span> Acesso imediato <span>🔒</span> Dados protegidos
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
