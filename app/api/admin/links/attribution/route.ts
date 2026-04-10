import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SALES_FILE = path.resolve(process.cwd(), "data/sales.json");

export async function POST(req: NextRequest) {
  try {
    const { identifier, linkId } = await req.json();
    if (!identifier || !linkId) return NextResponse.json({ error: "identifier and linkId required" }, { status: 400 });

    const txt = await fs.readFile(SALES_FILE, "utf-8");
    const list = JSON.parse(txt || "[]");

    const idx = list.findIndex((s: any) => s.identifier === identifier);
    if (idx === -1) return NextResponse.json({ error: "sale not found" }, { status: 404 });

    list[idx].linkId = linkId;
    await fs.writeFile(SALES_FILE, JSON.stringify(list, null, 2), "utf-8");

    return NextResponse.json({ ok: true, sale: list[idx] });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
