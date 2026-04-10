import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from('sales').select('*').order('transaction_date', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ sales: data });
  } catch (err) {
    console.error('/api/admin/sales', err);
    return NextResponse.json({ sales: [] });
  }
}
