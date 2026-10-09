/** Countries offered on the Join form. The database stores the 2-letter code. Add more here as ShininChrist grows. */
export const COUNTRIES: Record<string, string> = {
  Nigeria: "NG",
  Jamaica: "JM",
  "United States": "US",
  Ghana: "GH",
  Kenya: "KE",
  "South Africa": "ZA",
  "United Kingdom": "GB",
  Canada: "CA",
};

export const COUNTRY_NAMES = Object.keys(COUNTRIES);

export const countryName = (code: string | null | undefined) =>
  Object.entries(COUNTRIES).find(([, value]) => value === code)?.[0] ??
  code ??
  "";
