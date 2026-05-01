export type Currency = "usd" | "eur" | "try" | "gbp" | "inr" | "cny" | "chf" | "cad" | "jpy" | "mxn" | "nok" | "pln" | "ron" | "sgd";
export type Language = "en" | "pt" | "tr" | "es" | "hi" | "zh" | "ja" | "nl" | "pl";

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
  cad: 1.36,
  jpy: 149.5,
  mxn: 17.2,
  nok: 10.8,
  pln: 4.0,
  ron: 4.6,
  sgd: 1.35,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  usd: "$",
  eur: "€",
  try: "₺",
  gbp: "£",
  inr: "₹",
  cny: "¥",
  chf: "CHF",
  cad: "C$",
  jpy: "¥",
  mxn: "MEX$",
  nok: "kr",
  pln: "zł",
  ron: "lei",
  sgd: "S$",
};

// Country to localization mapping
const COUNTRY_LOCALIZATION: Record<string, LocalizationConfig> = {
  US: { currency: "usd", language: "en", countryCode: "US" },
  CA: { currency: "cad", language: "en", countryCode: "CA" },
  GB: { currency: "gbp", language: "en", countryCode: "GB" },
  DE: { currency: "eur", language: "en", countryCode: "DE" },
  FR: { currency: "eur", language: "en", countryCode: "FR" },
  ES: { currency: "eur", language: "es", countryCode: "ES" },
  IT: { currency: "eur", language: "en", countryCode: "IT" },
  NL: { currency: "eur", language: "nl", countryCode: "NL" },
  TR: { currency: "try", language: "tr", countryCode: "TR" },
  BR: { currency: "usd", language: "pt", countryCode: "BR" },
  PT: { currency: "eur", language: "pt", countryCode: "PT" },
  IN: { currency: "inr", language: "hi", countryCode: "IN" },
  CN: { currency: "cny", language: "zh", countryCode: "CN" },
  CH: { currency: "chf", language: "en", countryCode: "CH" },
  JP: { currency: "jpy", language: "ja", countryCode: "JP" },
  MX: { currency: "mxn", language: "es", countryCode: "MX" },
  NO: { currency: "nok", language: "en", countryCode: "NO" },
  PL: { currency: "pln", language: "pl", countryCode: "PL" },
  RO: { currency: "ron", language: "en", countryCode: "RO" },
  SG: { currency: "sgd", language: "en", countryCode: "SG" },
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
