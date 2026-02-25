"use client";

import { motion } from "framer-motion";
import { Search, Zap, Bell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar({ onSearch }: { onSearch: (query: string) => void }) {
  const { t, locale, toggleLanguage } = useLanguage();
  const isAr = locale === "ar";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-50 mx-auto max-w-5xl rounded-full border border-white/10 bg-black/40 px-4 sm:px-6 py-3 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Zap size={18} />
          </div>
          <span
            className="hidden font-heading text-lg font-bold tracking-tight text-white sm:block"
            style={isAr ? { fontFamily: "var(--font-cairo)", letterSpacing: "0" } : {}}
          >
            {t.brand}
          </span>
        </div>

        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 text-white/40 ${
                isAr ? "right-3" : "left-3"
              }`}
              size={16}
            />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              onChange={(e) => onSearch(e.target.value)}
              dir={isAr ? "rtl" : "ltr"}
              style={isAr ? { fontFamily: "var(--font-cairo)" } : {}}
              className={`w-full rounded-full border border-white/5 bg-white/5 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-indigo-500/50 transition-colors ${
                isAr ? "pr-9 pl-4" : "pl-9 pr-4"
              }`}
            />
          </div>
        </div>

        {/* Nav links — desktop only */}
        <div className="hidden items-center gap-5 lg:flex">
          <NavLink href="#news" isAr={isAr}>{t.navNews}</NavLink>
          <NavLink href="#newsletter" isAr={isAr}>{t.navNewsletter}</NavLink>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Language toggle */}
          <button
            id="lang-toggle"
            onClick={toggleLanguage}
            aria-label={isAr ? "Switch to English" : "Switch to Arabic"}
            className="flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-300 transition-all hover:bg-indigo-500/20 hover:border-indigo-400 active:scale-95"
          >
            <span>{isAr ? "🇺🇸" : "🇸🇦"}</span>
            <span>{isAr ? "EN" : "AR"}</span>
          </button>

          <button className="relative hidden text-white/60 transition-colors hover:text-white sm:block">
            <Bell size={20} />
            <span className="absolute -right-1 -top-1 block h-2 w-2 rounded-full bg-indigo-500" />
          </button>

          <button
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-transform hover:scale-105 active:scale-95"
            style={isAr ? { fontFamily: "var(--font-cairo)" } : {}}
          >
            {t.joinNow}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
  isAr,
}: {
  href: string;
  children: React.ReactNode;
  isAr: boolean;
}) {
  return (
    <a
      href={href}
      className="whitespace-nowrap text-sm font-medium text-white/60 transition-colors hover:text-white"
      style={isAr ? { fontFamily: "var(--font-cairo)" } : {}}
    >
      {children}
    </a>
  );
}
