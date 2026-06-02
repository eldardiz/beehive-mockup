"use client";

import { motion } from "framer-motion";
import { Honeycomb } from "./Honeycomb";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    stat: "1/3",
    title: "Build like a unicorn, spend like a startup.",
    body: "Senior engineers at about a third of the cost of full-time hires. No equity, no benefits, no idle salaries.",
    span: "md:col-span-4",
    feature: true,
  },
  {
    stat: "10×",
    title: "In parallel, not in sequence.",
    body: "10 microtasks means 10 engineers at once. No more waiting on developer A to finish.",
    span: "md:col-span-2",
    feature: false,
  },
  {
    stat: "NDA",
    title: "Your IP, locked down.",
    body: "Enterprise-grade NDAs and siloed workflows. Your code stays yours, start to finish.",
    span: "md:col-span-3",
    feature: false,
  },
  {
    stat: "24/7",
    title: "MVP in weeks, not months.",
    body: "The swarm codes around the clock. Launch before your runway ends.",
    span: "md:col-span-3",
    feature: false,
  },
];

export function ValueBento() {
  return (
    <section
      id="why"
      data-theme="dark"
      className="theme-section relative z-10 px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl"
        >
          <div className="anchor-label mb-4">
            <span className="hash">#</span>why-beehive
          </div>
          <h2 className="text-balance text-[clamp(1.9rem,4vw,3.1rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground">
            Your code deserves a better builder.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.65, ease, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className={`group panel-card relative overflow-hidden p-7 transition-colors duration-300 hover:border-border-strong ${p.span}`}
            >
              {/* honey hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(238,160,16,0.22), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {p.feature && (
                <div
                  aria-hidden
                  className="mask-radial pointer-events-none absolute -right-8 bottom-0 z-0 h-48 w-72 opacity-50"
                >
                  <Honeycomb className="h-full w-full" side={26} />
                </div>
              )}

              <div className="relative z-10">
                <div className="bg-gradient-to-br from-accent-1 to-accent-3 bg-clip-text font-display text-[40px] font-extrabold leading-none tracking-tight text-transparent">
                  {p.stat}
                </div>
                <h3 className="mt-5 text-[19px] font-semibold leading-snug tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md text-[14px] leading-[1.55] text-text-dim">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
