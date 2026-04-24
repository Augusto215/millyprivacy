import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    console.log("[check-country] IP detected:", ip);

    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();

    console.log("[check-country] API response:", data);

    return NextResponse.json({
      countryCode: data.country_code || "BR",
      country_name: data.country_name
    });
  } catch (error) {
    console.error("Error checking country:", error);
    return NextResponse.json({ countryCode: "BR" }, { status: 500 });
  }
}
