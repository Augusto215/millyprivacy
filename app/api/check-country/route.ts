import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();

    return NextResponse.json({ countryCode: data.country_code });
  } catch (error) {
    console.error("Error checking country:", error);
    return NextResponse.json({ countryCode: "BR" }, { status: 500 });
  }
}
