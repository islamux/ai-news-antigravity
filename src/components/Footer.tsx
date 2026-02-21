"use client";

import { motion } from "framer-motion";
import { Zap, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-black/20 py-12 backdrop-blur-3xl" id="newsletter">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-heading text-white">
                <Zap size={18} />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-white">
                ANTIGRAVITY
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Your daily dose of AI intelligence. We curate the most important news, research, and tools to keep you ahead of the curve.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/5 bg-white/5 p-8"
          >
            <h4 className="font-heading text-xl font-bold text-white mb-2">Subscribe to our newsletter</h4>
            <p className="text-sm text-white/60 mb-6">Join 10,000+ AI enthusiasts receiving weekly insights.</p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-500/50 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-1 text-black bg-white hover:bg-white/90 p-2 rounded-full transition-transform"
              >
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/30 md:flex-row">
          <p>© 2026 Antigravity AI News. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
