import { useState, useEffect } from "react";
import { getLocalizationFromCountry, Currency, Language } from "@/lib/localization";

interface UseLocalizationReturn {
  currency: Currency;
  language: Language;
  countryCode: string;
  isLoading: boolean;
}

const CACHE_KEY = "user_country_code";
const CACHE_EXPIRY_KEY = "user_country_code_expiry";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

export function useLocalization(): UseLocalizationReturn {
  const [localization, setLocalization] = useState<UseLocalizationReturn>({
    currency: "usd",
    language: "en",
    countryCode: "US",
    isLoading: true,
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Check localStorage cache first (with expiry)
        const cached = localStorage.getItem(CACHE_KEY);
        const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
        const now = Date.now();

        if (cached && cacheExpiry && now < parseInt(cacheExpiry)) {
          console.log("✓ Using cached country code:", cached);
          const config = getLocalizationFromCountry(cached);
          setLocalization({
            currency: config.currency,
            language: config.language,
            countryCode: config.countryCode,
            isLoading: false,
          });
          return;
        }

        // Clear expired cache
        if (cached && cacheExpiry && now >= parseInt(cacheExpiry)) {
          console.log("⚠ Cache expired, fetching new location...");
          localStorage.removeItem(CACHE_KEY);
          localStorage.removeItem(CACHE_EXPIRY_KEY);
        }

        // Fetch location from IP
        console.log("🌍 Fetching location from IP...");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
          cache: "no-store"
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("IP API failed");

        const data = await response.json();
        const countryCode = data.country_code?.toUpperCase() || "US";

        console.log("✅ Detected country from IP:", countryCode, "- Currency:", getLocalizationFromCountry(countryCode).currency.toUpperCase());

        // Save to cache with expiry
        localStorage.setItem(CACHE_KEY, countryCode);
        localStorage.setItem(CACHE_EXPIRY_KEY, (now + CACHE_DURATION).toString());

        const config = getLocalizationFromCountry(countryCode);
        setLocalization({
          currency: config.currency,
          language: config.language,
          countryCode: config.countryCode,
          isLoading: false,
        });
      } catch (err) {
        console.error("❌ Failed to detect location:", err);
        setLocalization({
          currency: "usd",
          language: "en",
          countryCode: "US",
          isLoading: false,
        });
      }
    };

    detectLocation();
  }, []);

  return localization;
}
