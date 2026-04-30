"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function Pressell() {
  const router = useRouter();
  const countryRef = useRef("BR");
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const [countdown, setCountdown] = useState(3);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/check-country")
      .then(r => r.json())
      .then(data => {
        const country = data.countryCode || "BR";
        countryRef.current = country;
        if (country !== "BR") {
          setLanguage("en");
        }
      })
      .catch(() => {
        countryRef.current = "BR";
      });
  }, []);

  // Auto-redirect after 3 seconds if no interaction
  useEffect(() => {
    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        timeoutRef.current = setTimeout(() => {
          router.replace(countryRef.current === "BR" ? "/" : "/of");
        }, 100);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [router]);

  const handleConfirm = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    router.replace(countryRef.current === "BR" ? "/" : "/of");
  };

  const isPortuguese = language === "pt";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Content */}
      <div className="w-full max-w-2xl text-center">
        {/* Logo/Icon */}
        <div className="mb-12 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600">
            <Lock className="h-12 w-12 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Site Name/Title */}
        <h1 className="text-5xl font-bold text-white mb-8 tracking-tight">
          {isPortuguese ? "Privacy" : "Privacy"}
          <span className="text-orange-500">.</span>
        </h1>

        {/* Warning Text */}
        <p className="text-2xl text-white font-semibold mb-6">
          {isPortuguese ? "Este é um site adulto" : "This is an adult site"}
        </p>

        {/* Description */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 max-w-xl mx-auto">
          <p className="text-gray-300 text-base leading-relaxed">
            {isPortuguese
              ? "Este site contém conteúdo com restrições de idade, incluindo nudez e representações de atividade sexual. Ao se registrar, você afirma que tem pelo menos 18 anos de idade ou a maioridade na jurisdição de onde está acessando o site e que consente em visualizar conteúdo sexualmente explícito."
              : "This site contains age-restricted content, including nudity and explicit sexual representations. By registering, you affirm that you are at least 18 years old or of legal age in the jurisdiction from which you are accessing this site and that you consent to view sexually explicit content."}
          </p>
        </div>

        {/* Question */}
        <p className="text-xl text-white font-semibold mb-8">
          {isPortuguese ? "Você tem 18 anos ou mais?" : "Are you 18 years old or older?"}
        </p>

        {/* Button */}
        <button
          onClick={handleConfirm}
          className="w-full max-w-sm mx-auto block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg py-4 rounded-lg transition transform hover:scale-105 shadow-lg mb-6"
        >
          {isPortuguese ? "Tenho 18 anos ou mais - Entrar" : "I'm 18 or older - Enter"}
        </button>

        {/* Disclaimer */}
        <p className="text-gray-500 text-sm max-w-xl mx-auto mb-4">
          {isPortuguese
            ? "Ao continuar, você confirma que tem 18 anos ou mais e aceita os termos de serviço."
            : "By continuing, you confirm that you are 18 years old or older and accept the terms of service."}
        </p>

        {/* Auto-redirect countdown */}
        <p className="text-gray-600 text-xs">
          {isPortuguese
            ? `Redirecionando automaticamente em ${countdown}s...`
            : `Redirecting automatically in ${countdown}s...`}
        </p>
      </div>
    </div>
  );
}
