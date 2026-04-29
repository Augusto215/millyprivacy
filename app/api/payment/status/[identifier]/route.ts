import { NextRequest, NextResponse } from "next/server";
import { getTransactionStatus } from "@/lib/nexuspag";
import { sendSaleNotification } from "@/lib/telegram";
import { supabaseAdmin } from "@/lib/supabase";

// Track which identifiers already had their notification sent (in-memory, per instance)
const notified = new Set<string>();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ identifier: string }> }
) {
  try {
    const { identifier } = await params;

    if (!identifier) {
      return NextResponse.json({ error: "identifier obrigatório." }, { status: 400 });
    }

    const page = req.nextUrl.searchParams.get("page");
    const plan = req.nextUrl.searchParams.get("plan");
    const data = await getTransactionStatus(identifier);

    if (data.status === "completed") {
      // Fetch sale info to check if it's a live purchase
      const { data: saleData } = await supabaseAdmin
        .from("sales")
        .select("is_live")
        .eq("identifier", identifier)
        .single();

      // Update sale status in DB
      await supabaseAdmin
        .from("sales")
        .update({ status: "completed" })
        .eq("identifier", identifier);

      // Send Telegram notification only once per payment
      if (!notified.has(identifier)) {
        notified.add(identifier);
        await sendSaleNotification(data.amount, identifier, page, plan, null, saleData?.is_live ?? false);
      }
    } else if ((data.status as string) === "failed" || (data.status as string) === "expired") {
      await supabaseAdmin
        .from("sales")
        .update({ status: data.status })
        .eq("identifier", identifier);

      // Remove access by deleting the purchase
      await supabaseAdmin
        .from("user_purchases")
        .delete()
        .eq("sale_identifier", identifier);
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
