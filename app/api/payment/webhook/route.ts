import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Attempt to extract useful fields from webhook payload
    const sale = {
      identifier: body.identifier ?? body.id ?? body.reference_id ?? null,
      amount: body.amount ?? body.value ?? body.total ?? null,
      status: body.status ?? null,
      transaction_date: body.transaction_date ?? new Date().toISOString(),
      raw: body,
    };

    // Only persist if we have an identifier
    if (!sale.identifier) {
      return NextResponse.json({ ok: false, error: "missing identifier" }, { status: 400 });
    }

    // Upsert into Supabase `sales` table
    const { error } = await supabaseAdmin.from('sales').upsert(sale, { onConflict: 'identifier' });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/payment/webhook error", err);
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
