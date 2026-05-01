export type Currency = "usd" | "eur" | "try" | "gbp" | "inr" | "cny" | "chf";
export type Language = "en" | "pt" | "tr" | "es" | "hi" | "zh";

interface LocalizationConfig {
  currency: Currency;
  language: Language;
  countryCode: string;
}

// Exchange rates (approximate, should be fetched from API in production)
export const EXCHANGE_RATES: Record<Currency, number> = {
  usd: 1,
  eur: 0.92,
  try: 32.5,
  gbp: 0.79,
  inr: 83.5,
  cny: 7.24,
  chf: 0.88,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  usd: "$",
  eur: "€",
  try: "₺",
  gbp: "£",
  inr: "₹",
  cny: "¥",
  chf: "CHF",
};

// Country to localization mapping
const COUNTRY_LOCALIZATION: Record<string, LocalizationConfig> = {
  US: { currency: "usd", language: "en", countryCode: "US" },
  CA: { currency: "usd", language: "en", countryCode: "CA" },
  GB: { currency: "gbp", language: "en", countryCode: "GB" },
  DE: { currency: "eur", language: "en", countryCode: "DE" },
  FR: { currency: "eur", language: "en", countryCode: "FR" },
  ES: { currency: "eur", language: "es", countryCode: "ES" },
  IT: { currency: "eur", language: "en", countryCode: "IT" },
  NL: { currency: "eur", language: "en", countryCode: "NL" },
  TR: { currency: "try", language: "tr", countryCode: "TR" },
  BR: { currency: "usd", language: "pt", countryCode: "BR" },
  PT: { currency: "eur", language: "pt", countryCode: "PT" },
  IN: { currency: "inr", language: "hi", countryCode: "IN" },
  CN: { currency: "cny", language: "zh", countryCode: "CN" },
  CH: { currency: "chf", language: "en", countryCode: "CH" },
};

export function getLocalizationFromCountry(
  countryCode: string
): LocalizationConfig {
  return (
    COUNTRY_LOCALIZATION[countryCode?.toUpperCase()] || {
      currency: "usd",
      language: "en",
      countryCode: "US",
    }
  );
}

export function convertPrice(
  baseAmount: number,
  fromCurrency: Currency = "usd",
  toCurrency: Currency = "usd"
): number {
  if (fromCurrency === toCurrency) return baseAmount;
  const baseUSD = baseAmount / EXCHANGE_RATES[fromCurrency];
  return baseUSD * EXCHANGE_RATES[toCurrency];
}

export function formatPrice(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  return `${symbol}${amount.toFixed(2)}`;
}
