"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BentoGrid } from "@/components/BentoGrid";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="relative min-h-screen Selection:bg-indigo-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />
      <div className="fixed inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="pt-8 px-4 sm:px-6 lg:px-8">
        <Navbar onSearch={setSearchQuery} />

        <main className="mx-auto max-w-5xl pt-24 pb-20">
          <section className="text-center mb-24">
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
              The Future of <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Intelligence</span>, Curated.
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed mb-10">
              Daily insights into the AI revolution. Stay ahead with the latest news, research, and breakthroughs delivered to your screen.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full bg-indigo-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
              >
                Explore Latest News
              </button>
              <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-95">
                Learn More
              </button>
            </div>
          </section>

          <section id="news" className="space-y-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h2 className="font-heading text-2xl font-bold text-white">Latest AI Intelligence</h2>
              
              <div className="flex flex-wrap gap-2">
                {["All", "LLM", "Ethics", "Business", "Energy", "Search"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      activeCategory === cat
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <BentoGrid searchQuery={searchQuery} category={activeCategory} />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
