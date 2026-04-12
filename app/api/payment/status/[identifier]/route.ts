import { NextRequest, NextResponse } from "next/server";
import { getTransactionStatus } from "@/lib/syncpay";
import { supabaseAdmin } from "@/lib/supabase";
import { sendSaleNotification } from "@/lib/telegram";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ identifier: string }> }
) {
  try {
    const { identifier } = await params;

    if (!identifier) {
      return NextResponse.json({ error: "identifier obrigatório." }, { status: 400 });
    }

    const data = await getTransactionStatus(identifier);

    // Quando pagamento confirmado, envia notificação no Telegram (caso webhook não tenha disparado)
    if (data.status === "completed") {
      const { data: rows } = await supabaseAdmin
        .from("sales")
        .select("creator, notified, amount")
        .eq("identifier", identifier)
        .limit(1);

      const record = rows?.[0];

      if (!record?.notified) {
        const amount = data.amount ?? record?.amount ?? 0;
        await sendSaleNotification(Number(amount), identifier, record?.creator ?? null);

        await supabaseAdmin
          .from("sales")
          .upsert({ identifier, notified: true }, { onConflict: "identifier" });
      }
    }

    return NextResponse.json({ status: data.status });
  } catch (err) {
    console.error("[payment/status]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erro ao consultar status." },
      { status: 500 }
    );
  }
}
