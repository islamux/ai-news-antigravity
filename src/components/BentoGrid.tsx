"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Tag, ExternalLink, X } from "lucide-react";
import newsData from "@/data/news.json";
import { Drawer } from "vaul";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  url: string;
  source: string;
}

export function BentoGrid({ 
  searchQuery = "", 
  category = "All" 
}: { 
  searchQuery?: string; 
  category?: string; 
}) {
  const filteredData = (newsData as NewsItem[]).filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
      {filteredData.length > 0 ? (
        filteredData.map((item: NewsItem, index: number) => (
          <Drawer.Root key={item.id}>
            <Drawer.Trigger asChild>
              <div className="contents cursor-pointer">
                <BentoCard item={item} index={index} />
              </div>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
              <Drawer.Content className="fixed bottom-0 right-0 top-0 z-50 mt-24 flex w-full flex-col rounded-t-[10px] bg-slate-950 border-l border-white/10 outline-none md:mt-0 md:w-[500px] md:rounded-none">
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-white/10 md:hidden" />
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 border border-indigo-500/20">
                        {item.category}
                      </span>
                      <Drawer.Close asChild>
                        <button className="text-white/40 hover:text-white transition-colors">
                          <X size={24} />
                        </button>
                      </Drawer.Close>
                    </div>

                    <div className="space-y-4">
                      <h2 className="font-heading text-4xl font-bold text-white leading-tight">
                        {item.title}
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
                      <p className="text-lg leading-relaxed text-white/70">
                        {item.summary}
                      </p>
                      <p className="text-white/50 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        <br /><br />
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full rounded-2xl bg-white py-4 text-sm font-bold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
                      >
                        Read Full Article <ExternalLink size={16} />
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
          <p className="text-lg font-medium">No results found for your search.</p>
        </div>
      )}
    </div>
  );
}

function BentoCard({ item, index }: { item: NewsItem; index: number }) {
  // Simple logic to make some cards bigger
  const isLarge = index === 0;
  const isMedium = index === 1 || index === 4;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 }
    },
    hover: { 
      y: -5,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition-shadow hover:shadow-2xl hover:shadow-indigo-500/20 
        ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
        ${isMedium ? "md:row-span-1" : ""}
      `}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 border border-indigo-500/20">
              <Tag size={12} />
              {item.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock size={12} />
              {item.date}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className={`font-heading font-bold text-white group-hover:text-indigo-300 transition-colors
              ${isLarge ? "text-3xl leading-tight" : "text-xl"}
            `}>
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/60 line-clamp-3">
              {item.summary}
            </p>
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors group-hover:bg-white group-hover:text-black"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* Background radial gradient effect */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-600/10 blur-[100px] transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}
