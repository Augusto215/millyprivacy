import { NextRequest, NextResponse } from "next/server";
import { createPixCharge } from "@/lib/nexuspag";
import { supabaseAdmin } from "@/lib/supabase";

const MINIMUM_AMOUNT = 13.87;

export async function POST(req: NextRequest) {
  try {
    const { amount, description, creator, isLive } = await req.json();

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Valor inválido." }, { status: 400 });
    }

    if (amount < MINIMUM_AMOUNT) {
      return NextResponse.json({ error: "Valor mínimo não atingido." }, { status: 400 });
    }

    const data = await createPixCharge(amount, description ?? "Assinatura Milly Privacy");

    // Salva o identifier junto com o creator para o webhook conseguir identificar a página
    if (creator) {
      await supabaseAdmin.from("sales").upsert(
        { identifier: data.identifier, creator, amount, status: "pending", is_live: isLive ?? false },
        { onConflict: "identifier" }
      );
    }

    return NextResponse.json({
      pix_code: data.pix_code,
      identifier: data.identifier,
    });
  } catch (err) {
    console.error("[payment/create]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erro ao gerar pagamento." },
      { status: 500 }
    );
  }
}
