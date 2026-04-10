import { NextRequest, NextResponse } from "next/server";
import { createPixCharge } from "@/lib/syncpay";

export async function POST(req: NextRequest) {
  try {
    const { amount, description } = await req.json();

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Valor inválido." }, { status: 400 });
    }

    const data = await createPixCharge(amount, description ?? "Assinatura Milly Privacy");

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
