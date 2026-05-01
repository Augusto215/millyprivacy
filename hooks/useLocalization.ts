import { useState, useEffect } from "react";
import { getLocalizationFromCountry, Currency, Language } from "@/lib/localization";

interface UseLocalizationReturn {
  currency: Currency;
  language: Language;
  countryCode: string;
  isLoading: boolean;
}

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
        // Check localStorage cache first
        const cached = localStorage.getItem("user_country_code");
        if (cached) {
          console.log("Using cached country code:", cached);
          const config = getLocalizationFromCountry(cached);
          setLocalization({
            currency: config.currency,
            language: config.language,
            countryCode: config.countryCode,
            isLoading: false,
          });
          return;
        }

        // Try ipapi.co first (most reliable)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch("https://ipapi.co/json/", {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const data = await response.json();
        const countryCode = data.country_code || "US";

        console.log("Detected country code from IP:", countryCode);
        localStorage.setItem("user_country_code", countryCode);

        const config = getLocalizationFromCountry(countryCode);
        setLocalization({
          currency: config.currency,
          language: config.language,
          countryCode: config.countryCode,
          isLoading: false,
        });
      } catch (err) {
        console.error("Failed to detect location:", err);
        // Fallback to browser language if available
        const browserLang = navigator?.language?.split("-")[0] || "en";
        console.log("Using browser language as fallback:", browserLang);

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
