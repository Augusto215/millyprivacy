import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    console.log("[check-country] IP detected:", ip);

    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json();

    console.log("[check-country] API response:", data);

    // Se for IP reservado (localhost/desenvolvimento), retorna BR por padrão
    if (data.status === "fail") {
      console.log("[check-country] Usando BR como padrão (IP reservado/local)");
      return NextResponse.json({
        countryCode: "BR",
        country_name: "Brazil"
      });
    }

    return NextResponse.json({
      countryCode: data.countryCode || "BR",
      country_name: data.country || "Brazil"
    });
  } catch (error) {
    console.error("Error checking country:", error);
    return NextResponse.json({ countryCode: "BR" }, { status: 500 });
  }
}
