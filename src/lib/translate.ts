const CACHE_KEY = "ar_translation_cache_v1";

function getCache(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setCache(cache: Record<string, string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // quota exceeded — ignore
  }
}

/**
 * Translate a single string from English to Arabic using MyMemory free API.
 * Results are cached in localStorage so repeated calls are instant.
 */
export async function translateToArabic(text: string): Promise<string> {
  if (!text.trim()) return text;

  const cache = getCache();
  const cacheKey = text.trim();

  if (cache[cacheKey]) return cache[cacheKey];

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Translation API error");
    const data = await res.json();
    const translated: string =
      data?.responseData?.translatedText ?? text;

    // Only cache if we got a real Arabic result (not an error message)
    if (translated && translated !== text) {
      const updated = { ...cache, [cacheKey]: translated };
      setCache(updated);
    }

    return translated;
  } catch {
    // Fallback: return original text if API fails
    return text;
  }
}

/**
 * Translate multiple strings in parallel.
 */
export async function translateBatch(
  texts: string[]
): Promise<string[]> {
  return Promise.all(texts.map((t) => translateToArabic(t)));
}
