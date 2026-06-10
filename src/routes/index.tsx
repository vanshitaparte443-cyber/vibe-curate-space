import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Sparkles, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { TopNav } from "@/components/vault/TopNav";
import { BoardCard } from "@/components/vault/BoardCard";
import { CreateBoardModal } from "@/components/vault/CreateBoardModal";
import { getMergedBoards, useVault } from "@/lib/vault-store";

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

const categories = ["All", "Interior", "Fashion", "Study", "Travel", "Branding", "Personal"];

function Dashboard() {
  useVault();
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState("All");
  const allBoards = getMergedBoards();

  const filtered = useMemo(() => {
    if (active === "All") return allBoards;
    const q = active.toLowerCase();
    return allBoards.filter((b) =>
      b.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [active, allBoards]);

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
                onClick={() => setModalOpen(true)}
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
              {allBoards.length} curated spaces. Open one to step inside.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition " +
                  (active === c
                    ? "bg-foreground text-background shadow-soft"
                    : "border border-border/70 bg-card/50 text-muted-foreground hover:text-foreground")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass mx-auto grid max-w-xl place-items-center rounded-3xl px-8 py-16 text-center shadow-soft">
            <p className="font-display text-2xl text-foreground">Nothing here yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              No boards match {active}. Try another category, or start a new vault.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lift transition hover:bg-foreground/90"
            >
              <Plus className="h-4 w-4" /> Create a board
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((b, i) => (
                <BoardCard key={b.id} board={b} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <footer className="border-t border-border/60 bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <p className="font-display text-base text-foreground">VibeVault</p>
          <p>Designed for the quiet collectors of beautiful things.</p>
        </div>
      </footer>

      <CreateBoardModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
