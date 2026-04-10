import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: items, error } = await supabaseAdmin.from('links').select('*').eq('id', id).limit(1);
  if (error || !items || items.length === 0) return NextResponse.redirect('/', 302);
  const item = items[0] as any;

  // record click
  const clicks = item.clicks ?? [];
  clicks.push({ ts: new Date().toISOString(), ua: req.headers.get('user-agent') ?? null });
  await supabaseAdmin.from('links').update({ clicks }).eq('id', id);

  return NextResponse.redirect(item.target, 302);
}
