"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BeehiveLogo } from "./BeehiveLogo";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Why Beehive", href: "#why" },
  { label: "Industries", href: "#industries" },
  { label: "Who we are", href: "#about" },
];

type Theme = "dark" | "light";

export function Nav() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Probe which themed section currently sits under the navbar and mirror it.
    const probeY = 44; // navbar vertical centre
    let frame = 0;

    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(".theme-section[data-theme]")
      );
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          const t = el.dataset.theme === "light" ? "light" : "dark";
          setTheme((prev) => (prev === t ? prev : t));
          break;
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const isLight = theme === "light";

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-50 w-[min(1140px,calc(100%-2rem))] -translate-x-1/2"
    >
      <div
        className="flex items-center justify-between rounded-full border py-2 pl-5 pr-2 backdrop-blur-xl transition-colors duration-500"
        style={{
          color: isLight ? "#1a1408" : "#f5efe2",
          backgroundColor: isLight
            ? scrolled
              ? "rgba(255,255,255,0.82)"
              : "rgba(255,255,255,0.6)"
            : scrolled
              ? "rgba(20,16,10,0.78)"
              : "rgba(20,16,10,0.55)",
          borderColor: isLight
            ? "rgba(40,30,10,0.12)"
            : "rgba(255,238,200,0.1)",
        }}
      >
        <a href="#top" className="flex items-center gap-2" aria-label="Beehive home">
          <BeehiveLogo className="h-[22px] w-auto" uid="nav" />
        </a>

        <nav className="hidden items-center gap-7 text-[13.5px] md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="opacity-70 transition-opacity duration-300 hover:opacity-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#book-a-demo"
          className="cta-glow inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-accent-1 to-accent-3 px-4 py-2 text-[13.5px] font-semibold text-[#1a1408]"
        >
          Book a Demo
          <span aria-hidden>→</span>
        </a>
      </div>
    </motion.header>
  );
}
