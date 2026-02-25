"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Tag, ExternalLink, X, Loader2 } from "lucide-react";
import rawNewsData from "@/data/news.json";
import { Drawer } from "vaul";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslatedNews, type NewsItem } from "@/hooks/useTranslatedNews";

export function BentoGrid({
  searchQuery = "",
  category = "All",
}: {
  searchQuery?: string;
  category?: string;
}) {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";

  const { news: translatedNews, status } = useTranslatedNews(
    rawNewsData as NewsItem[],
    locale
  );

  const filteredData = translatedNews.filter((item) => {
    const title = isAr ? item.title_ar : item.title;
    const summary = isAr ? item.summary_ar : item.summary;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Translation loading indicator */}
      <AnimatePresence>
        {status === "loading" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 mb-4 text-sm text-indigo-400"
          >
            <Loader2 size={14} className="animate-spin" />
            <span style={{ fontFamily: "var(--font-cairo)" }}>
              جارٍ ترجمة المحتوى...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Drawer.Root key={item.id}>
              <Drawer.Trigger asChild>
                <div className="contents cursor-pointer">
                  <BentoCard item={item} index={index} isTranslating={status === "loading" && isAr} />
                </div>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
                <Drawer.Content
                  className={`fixed bottom-0 top-0 z-50 mt-24 flex w-full flex-col rounded-t-[10px] bg-slate-950 border-white/10 outline-none md:mt-0 md:w-[520px] md:rounded-none ${
                    isAr ? "left-0 border-r" : "right-0 border-l"
                  }`}
                >
                  <div
                    className="flex-1 overflow-y-auto p-8"
                    dir={isAr ? "rtl" : "ltr"}
                  >
                    <div className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-white/10 md:hidden" />
                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <span
                          className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 border border-indigo-500/20"
                          style={isAr ? { fontFamily: "var(--font-cairo)" } : {}}
                        >
                          {isAr ? item.category_ar : item.category}
                        </span>
                        <Drawer.Close asChild>
                          <button className="text-white/40 hover:text-white transition-colors">
                            <X size={24} />
                          </button>
                        </Drawer.Close>
                      </div>

                      <div className="space-y-4">
                        <h2
                          className="font-heading text-3xl font-bold text-white leading-tight"
                          style={
                            isAr
                              ? { fontFamily: "var(--font-cairo)", lineHeight: "1.6" }
                              : {}
                          }
                        >
                          {isAr ? item.title_ar : item.title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-white/40">
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {item.date}
                          </span>
                          <span className="uppercase tracking-widest text-[10px] font-bold">
                            {item.source}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <p
                          className="text-lg leading-relaxed text-white/70"
                          style={
                            isAr
                              ? { fontFamily: "var(--font-cairo)", lineHeight: "2" }
                              : {}
                          }
                        >
                          {isAr ? item.summary_ar : item.summary}
                        </p>
                        <p
                          className="text-white/50 leading-relaxed"
                          style={
                            isAr
                              ? { fontFamily: "var(--font-cairo)", lineHeight: "2" }
                              : {}
                          }
                        >
                          {t.drawerBodyFiller}
                        </p>
                      </div>

                      <div className="pt-8 border-t border-white/5">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full rounded-2xl bg-white py-4 text-sm font-bold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
                          style={isAr ? { fontFamily: "var(--font-cairo)" } : {}}
                        >
                          {t.drawerReadMore} <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          ))
        ) : (
          <div className="md:col-span-3 flex flex-col items-center justify-center py-20 text-white/40">
            <p
              className="text-lg font-medium"
              style={isAr ? { fontFamily: "var(--font-cairo)" } : {}}
            >
              {t.noResults}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BentoCard({
  item,
  index,
  isTranslating,
}: {
  item: ReturnType<typeof useTranslatedNews>["news"][0];
  index: number;
  isTranslating: boolean;
}) {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const isLarge = index === 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      dir={isAr ? "rtl" : "ltr"}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-shadow hover:shadow-2xl hover:shadow-indigo-500/20
        ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
      `}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span
              className="flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 border border-indigo-500/20"
              style={isAr ? { fontFamily: "var(--font-cairo)" } : {}}
            >
              <Tag size={12} />
              {isAr ? item.category_ar : item.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock size={12} />
              {item.date}
            </span>
          </div>

          <div className="space-y-2">
            {/* Show shimmer if still translating */}
            {isTranslating && isAr ? (
              <div className="space-y-2">
                <div className="h-6 w-3/4 animate-pulse rounded-lg bg-white/10" />
                <div className="h-6 w-1/2 animate-pulse rounded-lg bg-white/10" />
                <div className="h-4 w-full animate-pulse rounded-lg bg-white/5" />
                <div className="h-4 w-5/6 animate-pulse rounded-lg bg-white/5" />
              </div>
            ) : (
              <>
                <h3
                  className={`font-heading font-bold text-white group-hover:text-indigo-300 transition-colors
                    ${isLarge ? "text-3xl leading-tight" : "text-xl"}
                  `}
                  style={
                    isAr
                      ? { fontFamily: "var(--font-cairo)", lineHeight: "1.6" }
                      : {}
                  }
                >
                  {isAr ? item.title_ar : item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-white/60 line-clamp-3"
                  style={
                    isAr
                      ? { fontFamily: "var(--font-cairo)", lineHeight: "1.8" }
                      : {}
                  }
                >
                  {isAr ? item.summary_ar : item.summary}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
            {item.source}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors group-hover:bg-white group-hover:text-black"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-600/10 blur-[100px] transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}
