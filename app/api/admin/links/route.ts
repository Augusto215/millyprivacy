import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabaseAdmin.from('links').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('/api/admin/links GET', error);
    return NextResponse.json({ links: [] });
  }
  return NextResponse.json({ links: data });
}

export async function POST(req: NextRequest) {
  try {
    const { target, label } = await req.json();
    if (!target) return NextResponse.json({ error: "target required" }, { status: 400 });
    const id = Math.random().toString(36).slice(2, 9);
    const item = { id, target, label: label ?? id, clicks: [], created_at: new Date().toISOString() };
    const { error } = await supabaseAdmin.from('links').insert(item);
    if (error) throw error;
    return NextResponse.json({ ok: true, link: item });
  } catch (err) {
    console.error('/api/admin/links POST', err);
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
