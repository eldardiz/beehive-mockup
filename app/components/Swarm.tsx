"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const tasks = [
  { name: "POST /auth/login", tag: "API" },
  { name: "Stripe webhook handler", tag: "Payments" },
  { name: "Postgres schema migration", tag: "Data" },
  { name: "Rate limiter middleware", tag: "Infra" },
  { name: "Dashboard charts", tag: "UI" },
  { name: "E2E checkout tests", tag: "QA" },
];

const branches = [
  { name: "feat/auth-api", pct: 96 },
  { name: "feat/schema", pct: 88 },
  { name: "feat/payments", pct: 92 },
  { name: "fix/rate-limit", pct: 99 },
  { name: "feat/dashboard", pct: 84 },
];

const prTags = ["Merged", "QA passed", "Deployed", "Reviewed", "Shipped"];

const ease = [0.22, 1, 0.36, 1] as const;

function useCounter(target: number, durationMs: number, run: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, run]);
  return val;
}

export function Swarm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((p) => (p + 1) % 3), 2200);
    return () => clearInterval(id);
  }, [inView]);

  // rotating microtask feed
  const [feedIndex, setFeedIndex] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setFeedIndex((p) => (p + 1) % tasks.length), 1400);
    return () => clearInterval(id);
  }, [inView]);

  // rotating PR pops
  const [prPops, setPrPops] = useState<{ id: number; tag: string }[]>([]);
  useEffect(() => {
    if (!inView) return;
    let id = 0;
    let step = 0;
    const tick = setInterval(() => {
      const tag = prTags[step % prTags.length];
      step++;
      setPrPops((prev) => [...prev.slice(-3), { id: id++, tag }]);
    }, 900);
    return () => clearInterval(tick);
  }, [inView]);

  const engineers = useCounter(147, 2000, inView);
  const shipped = useCounter(3842, 2200, inView);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      data-theme="light"
      className="theme-section relative z-10 overflow-hidden px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* section heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="anchor-label mb-4">
            <span className="hash">#</span>how-it-works
          </div>
          <h2 className="text-balance text-[clamp(1.9rem,4vw,3.1rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground">
            From brief to shipped, in parallel.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-[1.55] text-text-dim">
            One request, sliced into microtasks and routed to a global swarm. No
            bottlenecks, no waiting on developer A, no pre-planning needed.
          </p>
        </motion.div>

        {/* glow behind middle card */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-2/3 -z-10 h-[440px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(238,185,16,0.22), rgba(238,138,14,0.08) 45%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="mt-16 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {/* CARD 1 — #brief */}
          <SwarmCard
            label="#brief"
            title="You send the requirements"
            subtitle="Beehive's AI slices each request into a set of solvable microtasks."
            activeBorder={active === 0}
            delay={0}
            inView={inView}
          >
            <div className="space-y-2.5">
              {[0, 1, 2, 3].map((rowOffset) => {
                const t = tasks[(feedIndex + rowOffset) % tasks.length];
                return (
                  <AnimatePresence mode="popLayout" key={`row-${rowOffset}`}>
                    <motion.div
                      key={`${t.name}-${rowOffset}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: rowOffset === 0 ? 1 : 1 - rowOffset * 0.18, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.45, ease }}
                      className="flex items-center gap-3 rounded-lg border border-border bg-panel-2/70 px-3 py-2"
                    >
                      <span className="font-mono text-[10px] text-accent-3">⬢</span>
                      <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-foreground">
                        {t.name}
                      </span>
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-text-dim">
                        {t.tag}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                );
              })}
            </div>
          </SwarmCard>

          <Connector active={active >= 1} />

          {/* CARD 2 — #swarm */}
          <SwarmCard
            label="#swarm"
            title="100+ engineers, in parallel"
            subtitle="Microtasks route to pre-vetted specialists working in separate branches."
            activeBorder={active === 1}
            delay={0.1}
            inView={inView}
          >
            <div className="mb-4 flex items-baseline gap-2">
              <span className="font-display text-[34px] font-bold leading-none tabular-nums text-foreground">
                {engineers}
              </span>
              <span className="text-[11.5px] text-text-faint">engineers active now</span>
            </div>
            <div className="space-y-2">
              {branches.map((b, i) => (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease }}
                  className="flex items-center gap-3"
                >
                  <span className="flex-1 truncate font-mono text-[11px] text-text-dim">
                    {b.name}
                  </span>
                  <div className="relative h-1 w-20 overflow-hidden rounded-full bg-panel-2">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-1 to-accent-3"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${b.pct}%` } : {}}
                      transition={{ duration: 1.1, delay: 0.4 + i * 0.07, ease }}
                    />
                  </div>
                  <span className="w-7 text-right font-mono text-[10.5px] tabular-nums text-text-faint">
                    {b.pct}
                  </span>
                </motion.div>
              ))}
              {/* commit pulse */}
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                <span className="text-[10.5px] uppercase tracking-wider text-text-faint">
                  Commits
                </span>
                <div className="flex flex-1 items-center gap-1">
                  {[0, 1, 2, 3, 4, 5, 6].map((step) => (
                    <motion.div
                      key={step}
                      className="h-1.5 flex-1 rounded-full"
                      style={{ backgroundColor: "#e9e1d2" }}
                      animate={{
                        backgroundColor:
                          active === 1 ? ["#e9e1d2", "#ee8a0e", "#e9e1d2"] : "#e9e1d2",
                      }}
                      transition={{
                        duration: 1.4,
                        delay: step * 0.08,
                        repeat: active === 1 ? Infinity : 0,
                        repeatDelay: 0.6,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SwarmCard>

          <Connector active={active >= 2} />

          {/* CARD 3 — #ship */}
          <SwarmCard
            label="#ship"
            title="Tested code, delivered as PRs"
            subtitle="A 3-layer QA pass, then merged with full traceability. You control the release."
            activeBorder={active === 2}
            delay={0.2}
            inView={inView}
          >
            <div className="flex flex-col gap-4">
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-wider text-text-faint">
                  Features shipped · all-time
                </div>
                <div className="mt-1 font-display text-[42px] font-bold leading-none tracking-tight tabular-nums text-foreground">
                  {shipped.toLocaleString()}
                </div>
              </div>
              <div className="relative h-[80px] overflow-hidden rounded-lg border border-border bg-panel-2/70 p-2">
                <AnimatePresence>
                  {prPops.map((pop, i) => (
                    <motion.div
                      key={pop.id}
                      initial={{ y: 30, opacity: 0, scale: 0.92 }}
                      animate={{ y: i * -20, opacity: 1 - i * 0.22, scale: 1 - i * 0.04 }}
                      exit={{ opacity: 0, y: -60 }}
                      transition={{ duration: 0.6, ease }}
                      className="absolute bottom-2 left-2 right-2 flex items-center gap-2 rounded-md border border-border bg-panel px-2.5 py-1.5"
                    >
                      <span className="text-[10px] text-accent-3">✓</span>
                      <span className="text-[11.5px] font-medium text-foreground">{pop.tag}</span>
                      <span className="ml-auto font-mono text-[10px] text-text-faint">just now</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </SwarmCard>
        </div>
      </div>
    </section>
  );
}

function SwarmCard({
  label,
  title,
  subtitle,
  children,
  activeBorder,
  delay,
  inView,
}: {
  label: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  activeBorder: boolean;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className="relative"
    >
      <motion.div
        animate={{
          boxShadow: activeBorder
            ? "0 0 0 1px rgba(238,160,16,0.55), 0 0 40px -10px rgba(238,160,16,0.4), 0 24px 60px -28px rgba(40,30,10,0.3)"
            : "0 0 0 1px rgba(40,30,10,0.1), 0 24px 60px -28px rgba(40,30,10,0.2)",
        }}
        transition={{ duration: 0.5 }}
        className="workflow-card h-full p-5"
      >
        <div className="anchor-label mb-1">
          <span className="hash">#</span>
          {label.slice(1)}
        </div>
        <h3 className="mt-0.5 text-[16px] font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mb-5 mt-1 text-[12.5px] leading-snug text-text-dim">{subtitle}</p>
        {children}
      </motion.div>
    </motion.div>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <div className="relative hidden min-w-[40px] items-center justify-center md:flex">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
      <motion.div
        className="relative h-1.5 w-1.5 rounded-full bg-accent-3"
        animate={{
          opacity: active ? [0.3, 1, 0.3] : 0.25,
          scale: active ? [0.9, 1.3, 0.9] : 1,
        }}
        transition={{ duration: 1.4, repeat: active ? Infinity : 0 }}
        style={{ boxShadow: active ? "0 0 12px rgba(238,160,16,0.85)" : "none" }}
      />
    </div>
  );
}
