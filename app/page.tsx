import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TrustRow } from "./components/TrustRow";
import { Swarm } from "./components/Swarm";
import { ValueBento } from "./components/ValueBento";
import { ClosingCTA } from "./components/ClosingCTA";
import { BeehiveLogo } from "./components/BeehiveLogo";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <TrustRow />
      <Swarm />
      <ValueBento />
      <ClosingCTA />

      <footer
        data-theme="dark"
        className="theme-section relative z-10 border-t border-border py-12"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-[12.5px] text-text-faint sm:flex-row">
          <div className="flex items-center gap-2 text-foreground">
            <BeehiveLogo className="h-[18px] w-auto" uid="footer" />
          </div>
          <span className="font-mono">Reimagining software development. Silicon Valley.</span>
          <span>© Beehive Software, 2026</span>
        </div>
      </footer>
    </main>
  );
}
