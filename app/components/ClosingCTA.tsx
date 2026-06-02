"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BeehiveLogo } from "./BeehiveLogo";

const ease = [0.22, 1, 0.36, 1] as const;

export function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yLogo = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

  return (
    <section
      ref={ref}
      id="book-a-demo"
      data-theme="dark"
      className="theme-section relative z-10 overflow-hidden border-t border-border py-40"
    >
      {/* drifting honey orb */}
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(238,185,16,0.28), rgba(238,138,14,0.1) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, ease }}
          className="anchor-label mb-8"
        >
          <span className="hash">#</span>book-a-demo
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground"
        >
          Two ways to build.
          <br />
          <span className="text-text-dim">Zero compromises.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="mt-5 max-w-xl text-[15.5px] leading-[1.6] text-text-dim"
        >
          Run it yourself with Self-Serve, or hand it to a fully managed team. Either
          way, you only pay for the tasks you complete.
        </motion.p>

        <motion.a
          href="https://www.beehivesoftware.com/"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="cta-glow mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent-1 to-accent-3 px-7 py-3.5 text-[15px] font-semibold text-[#1a1408]"
        >
          Book a Demo
          <span aria-hidden>→</span>
        </motion.a>

        {/* big logo treatment */}
        <motion.div
          style={{ y: yLogo, scale }}
          className="relative mt-24 flex w-full max-w-3xl items-center justify-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
          >
            <div className="absolute h-[280px] w-[280px] rounded-full border border-border" />
            <div className="absolute h-[400px] w-[400px] rounded-full border border-border opacity-60" />
            <div className="absolute h-[540px] w-[540px] rounded-full border border-border opacity-30" />
          </div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.4, ease }}
            className="relative text-foreground"
            style={{
              filter:
                "drop-shadow(0 0 60px rgba(238,160,16,0.4)) drop-shadow(0 0 12px rgba(238,160,16,0.55))",
            }}
          >
            <BeehiveLogo className="relative z-10 h-auto w-[min(460px,78vw)]" uid="closing" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 font-mono text-[11px] uppercase tracking-[0.22em] text-text-faint"
        >
          Self-serve · Managed · Shipped
        </motion.p>
      </div>
    </section>
  );
}
