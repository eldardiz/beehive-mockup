"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const badges = [
  { src: "/brand/clutch-ai.png", alt: "Top Clutch Artificial Intelligence Company, San Jose 2026" },
  { src: "/brand/clutch-app-dev.png", alt: "Top Clutch App Development Company, San Jose 2026" },
  { src: "/brand/clutch-ml.png", alt: "Top Clutch Machine Learning Company, San Jose 2026" },
  { src: "/brand/clutch-devops.png", alt: "Top Clutch DevOps Managed Services Company, United States 2026" },
  { src: "/brand/clutch-gaming.png", alt: "Top Clutch Software Developers, Gaming, California" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function TrustRow() {
  return (
    <section
      data-theme="dark"
      aria-label="Recognition"
      className="theme-section relative z-10 px-6 pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, ease }}
          className="text-center text-[12px] uppercase tracking-[0.2em] text-text-faint"
        >
          Trusted by leading innovators
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.65, ease, delay: 0.05 }}
          className="mx-auto mt-3 max-w-2xl text-balance text-center text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.025em] text-foreground"
        >
          Teams choose Beehive to move faster, stay focused, and ship smarter.
        </motion.h2>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {badges.map((b, i) => (
            <motion.div
              key={b.src}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="relative"
            >
              <Image
                src={b.src}
                alt={b.alt}
                width={120}
                height={130}
                className="h-[118px] w-auto drop-shadow-[0_14px_40px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
