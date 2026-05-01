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
        const response = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(5000)
        });
        const data = await response.json();
        const countryCode = data.country_code || "US";

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
