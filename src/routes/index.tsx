import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus, Sparkles, ArrowUpRight } from "lucide-react";
import { TopNav } from "@/components/vault/TopNav";
import { BoardCard } from "@/components/vault/BoardCard";
import { boards } from "@/lib/boards-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VibeVault — Collect Ideas. Curate Aesthetics." },
      { name: "description", content: "A premium mood board space for fashion, interiors, study inspiration, travel, and branding." },
      { property: "og:title", content: "VibeVault — Collect Ideas. Curate Aesthetics." },
      { property: "og:description", content: "A premium mood board space for fashion, interiors, study inspiration, travel, and branding." },
    ],
  }),
  component: Dashboard,
});

const categories = ["All", "Interiors", "Fashion", "Study", "Travel", "Branding", "Cafe"];

function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--color-secondary), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[620px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--color-primary), transparent 70%)" }}
        />

        <div className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-8 sm:pt-24 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <Sparkles className="h-3 w-3 text-primary" />
              Your aesthetic, organized
            </span>

            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Collect Ideas.
              <br />
              <span className="italic text-foreground/85">Curate Aesthetics.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Create beautiful mood boards for fashion, interiors, study inspiration,
              travel, branding, and everything in between.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background shadow-lift transition-colors hover:bg-foreground/90"
              >
                <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                Create New Board
              </motion.button>
              <button className="inline-flex h-12 items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card">
                Explore inspiration
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">Your boards</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Six curated spaces. Open one to step inside.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button
                key={c}
                className={
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition " +
                  (i === 0
                    ? "bg-foreground text-background shadow-soft"
                    : "border border-border/70 bg-card/50 text-muted-foreground hover:text-foreground")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((b, i) => (
            <BoardCard key={b.id} board={b} index={i} />
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <p className="font-display text-base text-foreground">VibeVault</p>
          <p>Designed for the quiet collectors of beautiful things.</p>
        </div>
      </footer>
    </div>
  );
}
