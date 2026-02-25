"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BentoGrid } from "@/components/BentoGrid";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

import { translations } from "@/lib/i18n";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const { t, locale } = useLanguage();
  const isAr = locale === "ar";

  const displayCategories = t.categories;
  const activeEnCategory = (translations.en.categories as readonly string[])[activeCategoryIndex];

  return (
    <div
      className="relative min-h-screen selection:bg-indigo-500/30"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />
      <div className="fixed inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="pt-8 px-4 sm:px-6 lg:px-8">
        <Navbar onSearch={setSearchQuery} />

        <main className="mx-auto max-w-5xl pt-24 pb-20">
          <section className="text-center mb-24">
            <h1
              className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
              style={isAr ? { fontFamily: "var(--font-cairo)", lineHeight: "1.3" } : {}}
            >
              {t.heroHeadline1}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
                {t.heroHeadlineHighlight}
              </span>
              {t.heroHeadline2}
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed mb-10">
              {t.heroSubtext}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  document.getElementById("news")?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full bg-indigo-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
              >
                {t.heroCtaPrimary}
              </button>
              <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-95">
                {t.heroCtaSecondary}
              </button>
            </div>
          </section>

          <section id="news" className="space-y-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h2
                className="font-heading text-2xl font-bold text-white"
                style={isAr ? { fontFamily: "var(--font-cairo)" } : {}}
              >
                {t.sectionTitle}
              </h2>

              <div className="flex flex-wrap gap-2">
                {displayCategories.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryIndex(i)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      activeCategoryIndex === i
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                    style={isAr ? { fontFamily: "var(--font-cairo)", fontSize: "0.8rem" } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <BentoGrid searchQuery={searchQuery} category={activeEnCategory} />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
