import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID obrigatório." },
        { status: 400 }
      );
    }

    // Check if user has any purchases
    const { data: purchases } = await supabaseAdmin
      .from("user_purchases")
      .select("id")
      .eq("user_id", userId)
      .limit(1);

    const hasPurchase = purchases && purchases.length > 0;

    return NextResponse.json({ hasPurchase });
  } catch (err) {
    console.error("[user/has-purchase]", err);
    return NextResponse.json({ error: "Erro interno.", hasPurchase: false }, { status: 500 });
  }
}
