export type SupportedCurrency = "NPR" | "INR" | "USD";

export interface FormatCurrencyOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

const DEFAULT_LOCALES: Record<SupportedCurrency, string> = {
  NPR: "en-NP",
  INR: "en-IN",
  USD: "en-US",
};

const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  NPR: "रू",
  INR: "₹",
  USD: "$",
};

/**
 * Formats a numeric amount with the proper currency symbol and formatting rules.
 */
export function formatCurrency(
  amount: number,
  currency: SupportedCurrency = "USD",
  options?: FormatCurrencyOptions,
): string {
  const locale = options?.locale || DEFAULT_LOCALES[currency] || "en-US";
  const minDigits = options?.minimumFractionDigits ?? 0;
  const maxDigits = options?.maximumFractionDigits ?? (Number.isInteger(amount) ? 0 : 2);

  try {
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    }).format(amount);

    const symbol = CURRENCY_SYMBOLS[currency] || "$";

    // Nepal format often uses "रू " prefix, India "₹", Global "$"
    if (currency === "NPR") {
      return `${symbol} ${formattedNumber}`;
    }
    return `${symbol}${formattedNumber}`;
  } catch {
    const symbol = CURRENCY_SYMBOLS[currency] || "$";
    return `${symbol}${amount.toLocaleString()}`;
  }
}

/**
 * Returns the symbol for a supported currency.
 */
export function getCurrencySymbol(currency: SupportedCurrency): string {
  return CURRENCY_SYMBOLS[currency] || "$";
}
