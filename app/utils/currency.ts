interface CurrencyInfo {
  name: string;
  code: string;
  symbol: string;
}

const currenciesData: CurrencyInfo[] = [
  { "name": "US Dollar", "code": "USD", "symbol": "$" },
  { "name": "Euro", "code": "EUR", "symbol": "€" },
  { "name": "British Pound", "code": "GBP", "symbol": "£" },
  { "name": "Indian Rupee", "code": "INR", "symbol": "₹" },
  { "name": "Canadian Dollar", "code": "CAD", "symbol": "$" },
  { "name": "Australian Dollar", "code": "AUD", "symbol": "$" },
  { "name": "Japanese Yen", "code": "JPY", "symbol": "¥" },
  { "name": "Swiss Franc", "code": "CHF", "symbol": "CHF" },
  { "name": "Chinese Yuan", "code": "CNY", "symbol": "¥" },
  { "name": "Brazilian Real", "code": "BRL", "symbol": "R$" },
  { "name": "Mexican Peso", "code": "MXN", "symbol": "$" },
  { "name": "South Korean Won", "code": "KRW", "symbol": "₩" },
  { "name": "Russian Ruble", "code": "RUB", "symbol": "₽" },
  { "name": "South African Rand", "code": "ZAR", "symbol": "R" },
  { "name": "Singapore Dollar", "code": "SGD", "symbol": "$" },
  { "name": "Hong Kong Dollar", "code": "HKD", "symbol": "$" },
  { "name": "New Zealand Dollar", "code": "NZD", "symbol": "$" },
  { "name": "Turkish Lira", "code": "TRY", "symbol": "₺" },
  { "name": "Saudi Riyal", "code": "SAR", "symbol": "﷼" },
  { "name": "United Arab Emirates Dirham", "code": "AED", "symbol": "د.إ" }
];

const currencySymbolMap = new Map<string, string>();
currenciesData.forEach(currency => {
  currencySymbolMap.set(currency.code.toUpperCase(), currency.symbol);
});

export const getCurrencySymbol = (currencyCode?: string): string => {
  if (!currencyCode) return '';
  const upperCaseCode = currencyCode.toUpperCase();
  return currencySymbolMap.get(upperCaseCode) || upperCaseCode;
}; 