"use client";

import { motion } from "framer-motion";
import { Zap, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";
  const arabicFont = { fontFamily: "var(--font-cairo)" };

  return (
    <footer
      className="mt-20 border-t border-white/5 bg-black/20 py-12 backdrop-blur-3xl"
      id="newsletter"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-heading text-white">
                <Zap size={18} />
              </div>
              <span
                className="font-heading text-lg font-bold tracking-tight text-white"
                style={isAr ? { ...arabicFont, letterSpacing: "0" } : {}}
              >
                {t.brand}
              </span>
            </div>
            <p
              className="max-w-sm text-sm leading-relaxed text-white/50"
              style={isAr ? { ...arabicFont, lineHeight: "2" } : {}}
            >
              {t.footerTagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isAr ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/5 bg-white/5 p-8"
          >
            <h4
              className="font-heading text-xl font-bold text-white mb-2"
              style={isAr ? arabicFont : {}}
            >
              {t.newsletterTitle}
            </h4>
            <p
              className="text-sm text-white/60 mb-6"
              style={isAr ? arabicFont : {}}
            >
              {t.newsletterSubtext}
            </p>
            <form
              className="relative flex items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t.newsletterPlaceholder}
                dir={isAr ? "rtl" : "ltr"}
                style={isAr ? arabicFont : {}}
                className={`w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-500/50 transition-colors ${isAr ? "pr-6 pl-14 text-right" : ""}`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`absolute text-black bg-white hover:bg-white/90 p-2 rounded-full transition-transform ${isAr ? "left-1" : "right-1"}`}
              >
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/30 md:flex-row">
          <p style={isAr ? arabicFont : {}}>{t.footerCopyright}</p>
          <div className="flex gap-8">
            <a
              href="#"
              className="hover:text-white transition-colors"
              style={isAr ? arabicFont : {}}
            >
              {t.footerPrivacy}
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              style={isAr ? arabicFont : {}}
            >
              {t.footerTerms}
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              style={isAr ? arabicFont : {}}
            >
              {t.footerTwitter}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
