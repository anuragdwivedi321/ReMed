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

/**
 * Extract Expiry Date from OCR text
 */
export function extractExpiryDate(text: string): string | null {
  if (!text) return null;
  const cleaned = text.toUpperCase().replace(/[|]/g, "1").replace(/\s+/g, " ");

  // Pattern 1: EXP DD/MM/YYYY
  const labelledFull = cleaned.match(/(?:EXP(?:IRY)?|USE\s*BY|BEST\s*BEFORE|E\.\s*D\.)[^A-Z0-9]{0,8}([0-3]?\d)[/.-]([01]?\d)[/.-](\d{2,4})/);
  if (labelledFull) return toIsoDate(normalizeYear(Number(labelledFull[3])), Number(labelledFull[2]), Number(labelledFull[1]));

  // Pattern 2: EXP MM/YYYY or MM/YY
  const monthYear = cleaned.match(/(?:EXP(?:IRY)?|USE\s*BY|BEST\s*BEFORE|E\.\s*D\.)[^A-Z0-9]{0,8}([01]?\d)[/.-](\d{2,4})/);
  if (monthYear) return toIsoDate(normalizeYear(Number(monthYear[2])), Number(monthYear[1]));

  // Pattern 3: Named month (e.g. EXP NOV 2026 or EXP NOV-26)
  const namedMonth = cleaned.match(/(?:EXP(?:IRY)?|USE\s*BY|BEST\s*BEFORE)[^A-Z0-9]{0,8}(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]*[ /.-]*(\d{2,4})/);
  if (namedMonth) return toIsoDate(normalizeYear(Number(namedMonth[2])), MONTHS[namedMonth[1]]);

  // Pattern 4: Fallback generic MM/YY date if occurring near the end or middle
  const genericDate = cleaned.match(/\b(0[1-9]|1[0-2])[/.-](202[4-9]|203[0-5]|2[4-9]|3[0-5])\b/);
  if (genericDate) {
    return toIsoDate(normalizeYear(Number(genericDate[2])), Number(genericDate[1]));
  }

  return null;
}

/**
 * Extract Manufacturing Date (MFD / MFG) from OCR text
 */
export function extractMfdDate(text: string): string | null {
  if (!text) return null;
  const cleaned = text.toUpperCase().replace(/[|]/g, "1").replace(/\s+/g, " ");

  // Pattern 1: MFD/MFG MM/YYYY or MM/YY
  const mfdMatch = cleaned.match(/(?:MFD|MFG|MFR|MFD\.?|MFG\.?|M\.?F\.?G\.?)[^A-Z0-9]{0,8}([01]?\d)[/.-](\d{2,4})/);
  if (mfdMatch) {
    const mm = mfdMatch[1].padStart(2, "0");
    const yy = normalizeYear(Number(mfdMatch[2]));
    return `${mm}/${yy}`;
  }

  // Pattern 2: Named month MFD (e.g. MFG MAR 2024)
  const namedMfd = cleaned.match(/(?:MFD|MFG|MFR)[^A-Z0-9]{0,8}(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[A-Z]*[ /.-]*(\d{2,4})/);
  if (namedMfd) {
    const monthNum = String(MONTHS[namedMfd[1]]).padStart(2, "0");
    const yy = normalizeYear(Number(namedMfd[2]));
    return `${monthNum}/${yy}`;
  }

  return null;
}

/**
 * Extract Batch Number from OCR text
 */
export function extractBatchNumber(text: string): string | null {
  if (!text) return null;
  const cleaned = text.toUpperCase().replace(/\s+/g, " ");
  const match = cleaned.match(/(?:B\.?NO|BATCH(?:\s*NO)?|LOT(?:\s*NO)?)[.:\s]*([A-Z0-9-]{3,14})/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}

/**
 * Extract MRP from OCR text
 */
export function extractMrp(text: string): number | null {
  if (!text) return null;
  const cleaned = text.toUpperCase().replace(/\s+/g, " ");
  const match = cleaned.match(/(?:M\.?R\.?P\.?|RS\.?|INR|₹)[^0-9]{0,6}(\d{1,4}(?:\.\d{1,2})?)/);
  if (match && match[1]) {
    const val = parseFloat(match[1]);
    if (!isNaN(val) && val > 0 && val < 50000) return val;
  }
  return null;
}
