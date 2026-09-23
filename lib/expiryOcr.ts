const MONTHS: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
};

function normalizeYear(value: number) {
  return value < 100 ? 2000 + value : value;
}

function toIsoDate(year: number, month: number, day?: number) {
  if (month < 1 || month > 12) return null;
  const expiryDay = day ?? new Date(year, month, 0).getDate();
  const date = new Date(Date.UTC(year, month - 1, expiryDay));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== expiryDay
  ) return null;

  const now = new Date();
  if (year < now.getUTCFullYear() - 5 || year > now.getUTCFullYear() + 15) return null;
  return date.toISOString().slice(0, 10);
}

export function extractExpiryDate(text: string) {
  const cleaned = text.toUpperCase().replace(/[|]/g, "1").replace(/\s+/g, " ");
  const labelled = cleaned.match(/(?:EXP(?:IRY)?|USE\s*BY|BEST\s*BEFORE)[^A-Z0-9]{0,8}([0-3]?\d)[/.-]([01]?\d)[/.-](\d{2,4})/);
  if (labelled) return toIsoDate(normalizeYear(Number(labelled[3])), Number(labelled[2]), Number(labelled[1]));

  const monthYear = cleaned.match(/(?:EXP(?:IRY)?|USE\s*BY|BEST\s*BEFORE)[^A-Z0-9]{0,8}([01]?\d)[/.-](\d{2,4})/);
  if (monthYear) return toIsoDate(normalizeYear(Number(monthYear[2])), Number(monthYear[1]));

  const namedMonth = cleaned.match(/(?:EXP(?:IRY)?|USE\s*BY|BEST\s*BEFORE)[^A-Z0-9]{0,8}(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]*[ /.-]*(\d{2,4})/);
  if (namedMonth) return toIsoDate(normalizeYear(Number(namedMonth[2])), MONTHS[namedMonth[1]]);

  return null;
}
