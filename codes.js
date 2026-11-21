// Currency to Country mapping & Currency Details (Name, Symbol, Country Code)
const currencyDetails = {
  USD: { code: "USD", name: "US Dollar", symbol: "$", country: "US" },
  EUR: { code: "EUR", name: "Euro", symbol: "€", country: "EU" },
  GBP: { code: "GBP", name: "British Pound", symbol: "£", country: "GB" },
  INR: { code: "INR", name: "Indian Rupee", symbol: "₹", country: "IN" },
  JPY: { code: "JPY", name: "Japanese Yen", symbol: "¥", country: "JP" },
  AUD: { code: "AUD", name: "Australian Dollar", symbol: "A$", country: "AU" },
  CAD: { code: "CAD", name: "Canadian Dollar", symbol: "CA$", country: "CA" },
  CHF: { code: "CHF", name: "Swiss Franc", symbol: "CHF", country: "CH" },
  CNY: { code: "CNY", name: "Chinese Yuan", symbol: "¥", country: "CN" },
  AED: { code: "AED", name: "UAE Dirham", symbol: "د.إ", country: "AE" },
  SGD: { code: "SGD", name: "Singapore Dollar", symbol: "S$", country: "SG" },
  NZD: { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", country: "NZ" },
  SAR: { code: "SAR", name: "Saudi Riyal", symbol: "﷼", country: "SA" },
  BRL: { code: "BRL", name: "Brazilian Real", symbol: "R$", country: "BR" },
  ZAR: { code: "ZAR", name: "South African Rand", symbol: "R", country: "ZA" },
  KRW: { code: "KRW", name: "South Korean Won", symbol: "₩", country: "KR" },
  SEK: { code: "SEK", name: "Swedish Krona", symbol: "kr", country: "SE" },
  NOK: { code: "NOK", name: "Norwegian Krone", symbol: "kr", country: "NO" },
  MXN: { code: "MXN", name: "Mexican Peso", symbol: "Mex$", country: "MX" },
  TRY: { code: "TRY", name: "Turkish Lira", symbol: "₺", country: "TR" },
  THB: { code: "THB", name: "Thai Baht", symbol: "฿", country: "TH" },
  IDR: { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", country: "ID" },
  MYR: { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", country: "MY" },
  PHP: { code: "PHP", name: "Philippine Peso", symbol: "₱", country: "PH" },
  PKR: { code: "PKR", name: "Pakistani Rupee", symbol: "₨", country: "PK" },
  BDT: { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", country: "BD" },
  EGP: { code: "EGP", name: "Egyptian Pound", symbol: "E£", country: "EG" },
  KWD: { code: "KWD", name: "Kuwaiti Dinar", symbol: "KD", country: "KW" },
  QAR: { code: "QAR", name: "Qatari Riyal", symbol: "QR", country: "QA" },
  OMR: { code: "OMR", name: "Omani Rial", symbol: "OMR", country: "OM" },
  BHD: { code: "BHD", name: "Bahraini Dinar", symbol: "BD", country: "BH" },
  VND: { code: "VND", name: "Vietnamese Dong", symbol: "₫", country: "VN" },
  PLN: { code: "PLN", name: "Polish Zloty", symbol: "zł", country: "PL" },
  CZK: { code: "CZK", name: "Czech Koruna", symbol: "Kč", country: "CZ" },
  HUF: { code: "HUF", name: "Hungarian Forint", symbol: "Ft", country: "HU" },
  ILS: { code: "ILS", name: "Israeli Shekel", symbol: "₪", country: "IL" },
  CLP: { code: "CLP", name: "Chilean Peso", symbol: "CLP$", country: "CL" },
  COP: { code: "COP", name: "Colombian Peso", symbol: "COL$", country: "CO" },
  ARS: { code: "ARS", name: "Argentine Peso", symbol: "AR$", country: "AR" },
  NGN: { code: "NGN", name: "Nigerian Naira", symbol: "₦", country: "NG" },
  KES: { code: "KES", name: "Kenyan Shilling", symbol: "KSh", country: "KE" },
  GHS: { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵", country: "GH" },
  HKD: { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", country: "HK" },
  TWD: { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$", country: "TW" },
  DKK: { code: "DKK", name: "Danish Krone", symbol: "kr", country: "DK" },
  RUB: { code: "RUB", name: "Russian Ruble", symbol: "₽", country: "RU" },
  UAH: { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", country: "UA" },
  RON: { code: "RON", name: "Romanian Leu", symbol: "lei", country: "RO" },
  BGN: { code: "BGN", name: "Bulgarian Lev", symbol: "лв", country: "BG" },
  HRK: { code: "HRK", name: "Croatian Kuna", symbol: "kn", country: "HR" },
  ISK: { code: "ISK", name: "Icelandic Króna", symbol: "kr", country: "IS" },
  JOD: { code: "JOD", name: "Jordanian Dinar", symbol: "JD", country: "JO" },
  LKR: { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs", country: "LK" },
  MAD: { code: "MAD", name: "Moroccan Dirham", symbol: "MAD", country: "MA" },
  NPR: { code: "NPR", name: "Nepalese Rupee", symbol: "NPR", country: "NP" },
  PEN: { code: "PEN", name: "Peruvian Sol", symbol: "S/.", country: "PE" },
  RSD: { code: "RSD", name: "Serbian Dinar", symbol: "din", country: "RS" },
  TND: { code: "TND", name: "Tunisian Dinar", symbol: "DT", country: "TN" },
  UGX: { code: "UGX", name: "Ugandan Shilling", symbol: "USh", country: "UG" },
  UYU: { code: "UYU", name: "Uruguayan Peso", symbol: "$U", country: "UY" },
  UZS: { code: "UZS", name: "Uzbekistani Som", symbol: "so'm", country: "UZ" },
  VEF: { code: "VEF", name: "Venezuelan Bolívar", symbol: "Bs", country: "VE" },
  DZD: { code: "DZD", name: "Algerian Dinar", symbol: "DA", country: "DZ" },
  BAM: { code: "BAM", name: "Bosnia-Herzegovina Mark", symbol: "KM", country: "BA" },
  BND: { code: "BND", name: "Brunei Dollar", symbol: "B$", country: "BN" },
  BOB: { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs.", country: "BO" },
  CRC: { code: "CRC", name: "Costa Rican Colón", symbol: "₡", country: "CR" },
  DOP: { code: "DOP", name: "Dominican Peso", symbol: "RD$", country: "DO" },
  GEL: { code: "GEL", name: "Georgian Lari", symbol: "₾", country: "GE" },
  GTQ: { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q", country: "GT" },
  HNL: { code: "HNL", name: "Honduran Lempira", symbol: "L", country: "HN" },
  IQD: { code: "IQD", name: "Iraqi Dinar", symbol: "IQD", country: "IQ" },
  JMD: { code: "JMD", name: "Jamaican Dollar", symbol: "J$", country: "JM" },
  KZT: { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸", country: "KZ" },
  LBP: { code: "LBP", name: "Lebanese Pound", symbol: "LL", country: "LB" },
  MUR: { code: "MUR", name: "Mauritian Rupee", symbol: "₨", country: "MU" },
  NIO: { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$", country: "NI" },
  PAB: { code: "PAB", name: "Panamanian Balboa", symbol: "B/.", country: "PA" },
  PYG: { code: "PYG", name: "Paraguayan Guaraní", symbol: "₲", country: "PY" },
  TZS: { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", country: "TZ" }
};

// Popular currencies pinned for quick access
const popularCurrencies = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD", "CHF", "AED", "SGD", "CNY", "SAR"];

// Backwards-compatible countryList object with all 160 entries
const countryList = {
    AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN",
    AOA: "AO", AQD: "AQ", ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA",
    BBD: "BB", BDT: "BD", XOF: "BE", BGN: "BG", BHD: "BH", BIF: "BI",
    BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV",
    BWP: "BW", BYR: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF",
    CHF: "CH", CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU",
    CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ", DKK: "DK", DOP: "DO",
    DZD: "DZ", ECS: "EC", EEK: "EE", EGP: "EG", ETB: "ET", EUR: "FR",
    FJD: "FJ", FKP: "FK", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH",
    GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK",
    HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", IDR: "ID", ILS: "IL",
    INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO",
    JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KPW: "KP",
    KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB",
    LKR: "LK", LRD: "LR", LSL: "LS", LTL: "LT", LVL: "LV", LYD: "LY",
    MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN",
    MOP: "MO", MRO: "MR", MTL: "MT", MUR: "MU", MVR: "MV", MWK: "MW",
    MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", XPF: "NC", NGN: "NG",
    NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE",
    PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA",
    RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB",
    SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG", SKK: "SK", SLL: "SL",
    SOS: "SO", SRD: "SR", STD: "ST", SVC: "SV", SYP: "SY", SZL: "SZ",
    THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR",
    TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US",
    UYU: "UY", UZS: "UZ", VEF: "VE", VND: "VN", VUV: "VU", YER: "YE",
    ZAR: "ZA", ZMK: "ZM", ZWD: "ZW"
};

// Helper function to get clean currency meta
function getCurrencyMeta(code) {
  code = (code || "").toUpperCase();
  if (currencyDetails[code]) {
    return currencyDetails[code];
  }
  const country = countryList[code] || "US";
  return {
    code: code,
    name: code + " Currency",
    symbol: code,
    country: country
  };
}

// Crisp Flag URL helper with global support (including EU flag)
function getFlagUrl(countryCode) {
  if (!countryCode) return "https://flagcdn.com/w80/un.png";
  return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
}

