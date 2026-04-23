import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      next: { revalidate: 3600 },
    });

    const data = await res.json();

    return NextResponse.json({
      country_code: data.country_code,
      country_name: data.country_name,
      is_brazil: data.country_code === "BR",
    });
  } catch (err) {
    console.error("Geo detection error:", err);
    return NextResponse.json(
      { is_brazil: true, error: "Could not detect location" },
      { status: 500 }
    );
  }
}
