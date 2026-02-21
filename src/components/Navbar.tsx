"use client";

import { motion } from "framer-motion";
import { Search, Zap, Bell } from "lucide-react";

export function Navbar({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-50 mx-auto max-w-5xl rounded-full border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-heading text-white">
            <Zap size={18} />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-white hidden sm:block">
            ANTIGRAVITY
          </span>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <input
              type="text"
              placeholder="Search AI news..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full rounded-full border border-white/5 bg-white/5 py-2 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink href="#news">News</NavLink>
          <NavLink href="#trending">Trending</NavLink>
          <NavLink href="#newsletter">Newsletter</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-white/60 transition-colors hover:text-white">
            <Bell size={20} />
            <span className="absolute -right-1 -top-1 block h-2 w-2 rounded-full bg-indigo-500"></span>
          </button>
          <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95">
            Join Now
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-white/60 transition-colors hover:text-white"
    >
      {children}
    </a>
  );
}
