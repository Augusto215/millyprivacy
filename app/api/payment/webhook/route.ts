import { NextRequest, NextResponse } from "next/server";
import { sendSaleNotification } from "@/lib/telegram";
import { getTransactionStatus } from "@/lib/syncpay";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const identifier = body.identifier ?? body.id ?? body.reference_id ?? null;

    if (!identifier) {
      return NextResponse.json({ ok: false, error: "missing identifier" }, { status: 400 });
    }

    // Consulta o status real via API do SyncPay (webhook não envia status)
    const transaction = await getTransactionStatus(identifier);

    if (transaction.status === "completed") {
      const { data: rows } = await supabaseAdmin
        .from("sales")
        .select("creator, notified")
        .eq("identifier", identifier)
        .limit(1);

      const record = rows?.[0];

      if (!record?.notified) {
        await sendSaleNotification(transaction.amount, identifier, record?.creator ?? null);

        await supabaseAdmin
          .from("sales")
          .upsert({ identifier, notified: true }, { onConflict: "identifier" });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/payment/webhook error", err);
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
