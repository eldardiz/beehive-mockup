"use client";

import { motion } from "framer-motion";
import { Honeycomb } from "./Honeycomb";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      data-theme="dark"
      className="theme-section relative overflow-hidden pt-44 pb-24"
    >
      {/* honey orb */}
      <div className="hero-orb" aria-hidden />

      {/* honeycomb field, dissolving in from the right (recreates home-1.webp) */}
      <div
        aria-hidden
        className="mask-right pointer-events-none absolute inset-y-0 right-0 z-0 w-[72%] opacity-70"
      >
        <Honeycomb className="comb-drift h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {/* eyebrow chip */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-panel/50 px-3 py-1.5 text-[12.5px] text-text-dim backdrop-blur-sm"
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-1 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-1" />
          </span>
          <span className="text-foreground/90">Clutch-awarded</span>
          <span className="text-text-faint">|</span>
          <span>Top AI &amp; software developer, San Jose 2026</span>
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="text-balance text-[clamp(2.6rem,6.5vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.04em] text-foreground"
        >
          Reimagining{" "}
          <span className="bg-gradient-to-br from-accent-1 via-accent-2 to-accent-3 bg-clip-text text-transparent">
            software development
          </span>
          .
        </motion.h1>

        {/* subhead */}
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="mt-7 max-w-2xl text-balance text-[17px] leading-[1.6] text-text-dim"
        >
          Custom software shouldn&apos;t be stuck in planning. Beehive&apos;s AI splits
          your build into parallel microtasks, so a global swarm of senior engineers
          ships production-ready code faster than you can brief a team.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#book-a-demo"
            className="cta-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent-1 to-accent-3 px-6 py-3 text-[14.5px] font-semibold text-[#1a1408]"
          >
            Book a Demo
            <span aria-hidden>→</span>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-panel/40 px-6 py-3 text-[14.5px] font-medium text-foreground transition-colors hover:border-border-strong hover:bg-panel"
          >
            See how it works
          </a>
        </motion.div>

        {/* trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="mt-6 text-[12.5px] text-text-faint"
        >
          Self-serve or fully managed. Pay only for the tasks you complete.
        </motion.p>
      </div>
    </section>
  );
}
