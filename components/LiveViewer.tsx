"use client";

import { Heart, MessageCircle, Send, Lock, Check, Copy, Loader2, RefreshCw } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Comment {
  id: string;
  username: string;
  userImg: string;
  text: string;
  timestamp: number;
}

interface FloatingHeart {
  id: string;
  left: number;
}

type PaymentStatus = "idle" | "creating" | "waiting" | "completed" | "failed" | "expired";

interface LiveViewerProps {
  creatorName?: string;
  creatorImg?: string;
  videoUrl?: string;
  viewerCount?: number;
}

const PLAN_AMOUNT = 13.87;
const PLAN_LABEL = "Acesso 1 Mês";
const FEATURES = [
  "Acesso imediato ao conteúdo protegido",
  "Chat privado e pedidos personalizados",
  "Liberação VIP automática após a aprovação",
];

export default function LiveViewer({
  creatorName = "Emilly Faria",
  creatorImg = "/img/profile-img.png",
  videoUrl = "https://slixymwrmifwomrjqsbk.supabase.co/storage/v1/object/public/content/emilly/1776196053094.MP4",
  viewerCount: initialViewerCount = 846,
}: LiveViewerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTikTokBrowser, setIsTikTokBrowser] = useState(false);

  useEffect(() => {
    // Detectar se está acessando via TikTok
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isTikTok = userAgent.includes('TikTok') || userAgent.includes('Musical.ly');
    setIsTikTokBrowser(isTikTok);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const preventInteraction = (e: Event) => {
      e.preventDefault();
    };

    const handleSeeking = () => {
      video.currentTime = video.duration || 0;
    };

    const handlePlay = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    // Listener mais agressivos para TikTok
    const handlers = [
      { event: 'seeking', handler: handleSeeking },
      { event: 'pause', handler: handlePlay },
      { event: 'dblclick', handler: preventInteraction },
      { event: 'touchstart', handler: preventInteraction as EventListener },
      { event: 'touchmove', handler: preventInteraction as EventListener },
      { event: 'touchend', handler: preventInteraction as EventListener },
    ];

    handlers.forEach(({ event, handler }) => {
      video.addEventListener(event, handler);
    });

    // Para TikTok, força play contínuo
    if (isTikTokBrowser) {
      const forcePlay = setInterval(() => {
        if (video.paused) {
          video.play().catch(() => {});
        }
      }, 500);

      return () => {
        clearInterval(forcePlay);
        handlers.forEach(({ event, handler }) => {
          video.removeEventListener(event, handler);
        });
      };
    }

    return () => {
      handlers.forEach(({ event, handler }) => {
        video.removeEventListener(event, handler);
      });
    };
  }, [isTikTokBrowser]);

  const handleClose = () => {
    router.push("/");
  };
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [viewerCount, setViewerCount] = useState(initialViewerCount);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const abortRef = useRef(false);

  // Aumenta o contador de viewers
  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);

    return () => clearInterval(viewerInterval);
  }, []);

  // Mostra modal de bloqueio após 8 segundos
  useEffect(() => {
    const blockTimer = setTimeout(() => {
      setShowBlockModal(true);
    }, 15000);
    
    return () => clearTimeout(blockTimer);
  }, []);

  // Simula comentários chegando em tempo real
  useEffect(() => {
    if (showBlockModal) return;

const comments = [
  { username: "pedro_gostosao1", text: "Gostosa demais, hein 🔥" },
  { username: "leoosafado", text: "Vai sua safada, delícia 😈" },
  { username: "brun0lok0", text: "Que raba... 🤤🍑" },
  { username: "dududiabo21", text: "Tá pedindo pra levar né? 😏" },
  { username: "RICARDOTESAO02", text: "Quero ver mais dessa bunda 🍆💦" },
  { username: "jorge_quente", text: "Delícia da porra! Vem DM 😋" },
  { username: "LUIZFOGUETEIRO", text: "Tá querendo acabar comigo? 🥵" },
  { username: "RafaCaliente33", text: "Meu pau tá latejando aqui 🍌🔥" }
];


    let index = 0;
    const interval = setInterval(() => {
      if (index < comments.length) {
        const commentId = `comment-${Date.now()}-${index}`;
        const newComment: Comment = {
          id: commentId,
          username: comments[index].username,
          userImg: "/img/profile_default_medium.jpg",
          text: comments[index].text,
          timestamp: Date.now(),
        };

        setAllComments((prev) => [newComment, ...prev]);

        // Remove comentário após 4 segundos
        setTimeout(() => {
          setAllComments((prev) => prev.filter((c) => c.id !== commentId));
        }, 2000);

        index++;
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [showBlockModal]);

  const createCharge = useCallback(async () => {
    abortRef.current = false;
    setPaymentStatus("creating");
    setPixCode(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: PLAN_AMOUNT,
          description: `Assinatura ${PLAN_LABEL} — Milly Privacy`,
          creator: creatorName,
          isLive: true,
        }),
      });

      const data = await res.json();

      if (!res.ok || abortRef.current) {
        if (!abortRef.current) {
          setPaymentStatus("failed");
          setErrorMsg(data.error ?? "Erro ao gerar pagamento PIX.");
        }
        return;
      }

      setPixCode(data.pix_code);
      setPaymentStatus("waiting");
    } catch {
      if (!abortRef.current) {
        setPaymentStatus("failed");
        setErrorMsg("Erro de conexão. Tente novamente.");
      }
    }
  }, []);

  const handleSelectPix = useCallback(() => {
    createCharge();
  }, [createCharge]);

  const handleCopy = async () => {
    if (!pixCode) return;
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: "you",
        userImg: creatorImg,
        text: newComment,
        timestamp: Date.now(),
      };

      setAllComments((prev) => [comment, ...prev]);
      setNewComment("");
    }
  };

  const addFloatingHeart = () => {
    const id = Date.now().toString();
    const left = Math.random() * 80 + 10;
    const heart: FloatingHeart = { id, left };

    setFloatingHearts((prev) => [heart, ...prev]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 3000);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addFloatingHeart(), i * 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black overflow-hidden">
      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px) scale(0.5);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        .floating-heart {
          animation: floatUp 3s ease-out forwards;
        }

        .heart-pulse {
          animation: pulse-heart 2s ease-in-out infinite;
        }

        .comment-item {
          animation: slideInUp 0.3s ease-out;
        }

        /* Bloquear controles em TikTok WebView */
        video {
          -webkit-user-select: none;
          -webkit-touch-callout: none;
          user-select: none;
          touch-action: none;
        }

        video::-webkit-media-controls {
          display: none !important;
        }

        video::-moz-media-controls {
          display: none !important;
        }
      `}</style>

      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden" style={{ touchAction: 'none' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="h-full w-full object-cover blur-sm"
          src={videoUrl}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            WebkitPlaysinline: 'true',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
            touchAction: 'none',
            WebkitAppearance: 'none'
          } as any}
        />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart absolute text-red-500 text-4xl"
            style={{
              left: `${heart.left}%`,
              bottom: 0,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/20 px-4 py-3 bg-black/40 backdrop-blur">
          <div className="flex items-center gap-3">
            <img
              src={creatorImg}
              alt={creatorName}
              className="h-10 w-10 rounded-full border-2 border-orange-500 object-cover"
            />
            <div className="flex flex-col">
              <h2 className="text-white font-semibold text-sm">{creatorName}</h2>
              <div className="flex items-center gap-1 text-white text-xs">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                AO VIVO · 👁️ {viewerCount.toLocaleString("pt-BR")} assistentes
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Comments Stack - Bottom (TikTok style) */}
          <div className="absolute bottom-24 left-0 right-0 px-3 space-y-2 pointer-events-none">
            {allComments.slice(0, 4).map((comment) => (
              <div
                key={comment.id}
                className="comment-item flex items-start gap-2 bg-black/70 backdrop-blur rounded-lg p-2.5 shadow-lg pointer-events-auto max-w-xs ml-auto mr-2"
              >
                <img
                  src={comment.userImg}
                  alt={comment.username}
                  className="h-7 w-7 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[11px] font-semibold leading-tight">
                    {comment.username}
                  </p>
                  <p className="text-white text-xs break-words line-clamp-2 mt-0.5">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-white/20 bg-black/50 backdrop-blur px-4 py-3 space-y-3">
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleLikeClick}
              className="flex items-center gap-2 text-white hover:scale-110 transition"
            >
              <div className="relative">
                <Heart
                  className={`h-6 w-6 ${liked ? "fill-red-500 text-red-500" : ""}`}
                />
                {liked && (
                  <Heart className="absolute inset-0 h-6 w-6 fill-red-500 text-red-500 heart-pulse" />
                )}
              </div>
            </button>
            <button className="flex items-center gap-2 text-white hover:scale-110 transition">
              <MessageCircle className="h-6 w-6" />
            </button>
          </div>

          {/* Comment Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendComment();
                }
              }}
              placeholder="Enviar mensagem..."
              className="flex-1 bg-white/20 backdrop-blur border border-white/30 rounded-full px-4 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-orange-500 transition"
            />
            <button
              onClick={handleSendComment}
              disabled={!newComment.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de bloqueio - overlay */}
      {showBlockModal && !showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center px-4 py-8">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

          <div className="relative w-full max-w-[480px] overflow-hidden rounded-t-[28px] border border-gray-200 bg-white text-black sm:rounded-[28px]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e89c30]">
                  CONTEÚDO EXCLUSIVO
                </p>
                <h2 className="text-[18px] font-semibold tracking-[-0.04em] text-black">
                  Desbloqueie o acesso
                </h2>
              </div>
            </div>

            {/* Body */}
            <div className="px-5 pb-6 pt-4">
              {/* Icon + message */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full p-4 bg-orange-500/10">
                    <Lock className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Você atingiu o limite do preview
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Para continuar assistindo, você precisa fazer uma assinatura
                </p>
              </div>

              {/* Info box */}
              <div className="rounded-[20px] border border-gray-200 bg-gray-50 p-4">
                <div className="rounded-xl bg-white border border-gray-200 px-3 py-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e89c30]">
                    Valor da assinatura
                  </p>
                  <p className="mt-0.5 text-[26px] font-semibold tracking-[-0.05em] text-black leading-none">
                    R$ 13,87
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-600">{PLAN_LABEL}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mt-4 rounded-[20px] border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-[15px] font-semibold text-black">
                  Benefícios exclusivos
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {FEATURES.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-[14px] text-gray-700"
                    >
                      <Check
                        className="h-4 w-4 shrink-0 text-[#e89c30]"
                        strokeWidth={2.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                onClick={() => setShowPaymentModal(true)}
                className="mt-4 w-full rounded-xl bg-[#e89c30] hover:bg-[#d4891f] text-white font-semibold py-3 transition flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Continuar para Pagamento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de pagamento PIX - overlay */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center px-4 py-8">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={handleClose} />

          <div className="relative w-full max-w-[480px] overflow-hidden rounded-t-[28px] border border-gray-200 bg-white text-black sm:rounded-[28px]" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e89c30]">SYNCPAY</p>
                <h2 className="text-[18px] font-semibold tracking-[-0.04em] text-black">Pagamento PIX</h2>
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[82vh] overflow-y-auto px-5 pb-6 pt-4">
              {/* Profile + amount */}
              <div className="rounded-[20px] border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full border-[3px] border-gray-50 bg-gradient-to-br from-[#e89c30]/40 to-[#1a1208] flex items-center justify-center">
                    <img
                      src={creatorImg}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[20px] font-semibold tracking-[-0.04em] text-black leading-tight">{creatorName}</p>
                    <div className="mt-3 rounded-xl bg-white border border-gray-200 px-3 py-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e89c30]">VALOR</p>
                      <p className="mt-0.5 text-[26px] font-semibold tracking-[-0.05em] text-black leading-none">
                        R$ {PLAN_AMOUNT.toFixed(2)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-600">{PLAN_LABEL}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits + payment */}
              <div className="mt-4 rounded-[20px] border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-[15px] font-semibold text-black">Benefícios exclusivos</h3>
                <ul className="mt-3 space-y-2.5">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[14px] text-gray-700">
                      <Check className="h-4 w-4 shrink-0 text-[#e89c30]" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="my-4 border-t border-gray-200" />
                <h3 className="text-[15px] font-semibold text-black">Formas de pagamento</h3>

                {/* Idle state - select PIX button */}
                {paymentStatus === "idle" && (
                  <div className="mt-6">
                    <button
                      onClick={handleSelectPix}
                      className="w-full rounded-2xl border-2 border-[#e89c30] px-5 py-4 text-[16px] font-bold text-black transition hover:shadow-[0_0_20px_rgba(232,156,48,0.4)]"
                      style={{ background: "linear-gradient(90deg, #ffb163, #f5bc6a, #f8c97e, #e89c30)" }}
                    >
                      ✓ PIX Instantâneo
                    </button>
                  </div>
                )}

                {/* Creating */}
                {paymentStatus === "creating" && (
                  <div className="flex flex-col items-center py-10">
                    <Loader2 className="h-9 w-9 animate-spin text-[#e89c30]" />
                    <p className="mt-4 text-sm text-gray-600">Gerando pagamento PIX...</p>
                  </div>
                )}

                {/* Failed / expired */}
                {(paymentStatus === "failed" || paymentStatus === "expired") && (
                  <div className="mt-4 flex flex-col items-center py-6 text-center">
                    <p className="text-sm text-gray-600">
                      {paymentStatus === "expired" ? "PIX expirado." : (errorMsg ?? "Erro ao gerar o PIX.")}
                    </p>
                    <button
                      onClick={handleSelectPix}
                      className="mt-4 flex items-center gap-2 rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
                    >
                      <RefreshCw className="h-4 w-4" /> Tentar novamente
                    </button>
                  </div>
                )}

                {/* Waiting - copy PIX code */}
                {paymentStatus === "waiting" && pixCode && (
                  <div className="mt-4 text-center">
                    <p className="text-[12px] font-semibold text-[#e89c30]">PIX gerado com sucesso</p>
                    <h4 className="mt-4 text-[17px] font-semibold text-black">Copie o código PIX</h4>
                    <div className="mt-2 rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-left">
                      <p className="line-clamp-2 break-all text-[12px] text-gray-600">{pixCode}</p>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#3b82f6] text-[14px] font-semibold text-white transition hover:bg-[#2563eb]"
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Código copiado!" : "Copiar código PIX"}
                    </button>

                    <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-3.5 text-left">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#e89c30] bg-[#e89c30]/10 text-[10px] font-bold text-[#e89c30]">
                          i
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-gray-700">
                            Abra o app do seu banco, escaneie o QR Code ou cole o código PIX para concluir o pagamento.
                          </p>
                          <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-gray-500">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Aguardando confirmação do pagamento...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
