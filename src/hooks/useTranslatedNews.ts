"use client";

import { useState, useEffect, useRef } from "react";
import { translateBatch } from "@/lib/translate";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  url: string;
  source: string;
}

export interface TranslatedNewsItem extends NewsItem {
  title_ar: string;
  summary_ar: string;
  category_ar: string;
}

// Category mappings (static — these are short well-known terms)
const CATEGORY_MAP: Record<string, string> = {
  LLM: "نماذج اللغة",
  Ethics: "الأخلاقيات",
  Business: "الأعمال",
  Energy: "الطاقة",
  Search: "البحث",
  Gaming: "الألعاب",
  Research: "الأبحاث",
  Robotics: "الروبوتات",
  Policy: "السياسات",
  Security: "الأمن",
  Healthcare: "الرعاية الصحية",
  Creative: "الإبداع",
};

export type TranslationStatus = "idle" | "loading" | "done" | "error";

/**
 * Given raw news items (English), returns translated versions when locale is "ar".
 * Titles and summaries are translated dynamically via the MyMemory API.
 * Results are cached in localStorage, so already-translated items are instant.
 */
export function useTranslatedNews(
  rawNews: NewsItem[],
  locale: "en" | "ar"
): {
  news: TranslatedNewsItem[];
  status: TranslationStatus;
} {
  const [news, setNews] = useState<TranslatedNewsItem[]>(() =>
    rawNews.map((item) => ({
      ...item,
      title_ar: item.title,
      summary_ar: item.summary,
      category_ar: CATEGORY_MAP[item.category] ?? item.category,
    }))
  );
  const [status, setStatus] = useState<TranslationStatus>("idle");
  // Track which item IDs we've already translated in this session
  const translatedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Sync the local state with rawNews whenever it changes
    setNews(
      rawNews.map((item) => ({
        ...item,
        title_ar: item.title,
        summary_ar: item.summary,
        category_ar: CATEGORY_MAP[item.category] ?? item.category,
      }))
    );
  }, [rawNews]);

  useEffect(() => {
    if (locale !== "ar") {
      if (status !== "idle") setStatus("idle");
      return;
    }

    // Find items that need translation (not yet translated this session)
    const pending = rawNews.filter(
      (item) => !translatedIds.current.has(item.id)
    );

    if (pending.length === 0) {
      setStatus("done");
      return;
    }

    setStatus("loading");

    const translate = async () => {
      try {
        // Batch all titles and summaries into a single parallel call-set
        const titles = pending.map((item) => item.title);
        const summaries = pending.map((item) => item.summary);

        const [translatedTitles, translatedSummaries] = await Promise.all([
          translateBatch(titles),
          translateBatch(summaries),
        ]);

        // Merge into our translated news registry
        setNews((prev) => {
          const updated = [...prev];
          pending.forEach((item, i) => {
            const idx = updated.findIndex((n) => n.id === item.id);
            if (idx !== -1) {
              updated[idx] = {
                ...updated[idx],
                title_ar: translatedTitles[i] || item.title,
                summary_ar: translatedSummaries[i] || item.summary,
                category_ar: CATEGORY_MAP[item.category] ?? item.category,
              };
            }
            translatedIds.current.add(item.id);
          });
          return updated;
        });

        setStatus("done");
      } catch {
        setStatus("error");
      }
    };

    translate();
  }, [rawNews, locale, status]);

  return { news, status };
}
