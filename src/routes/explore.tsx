import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppShell } from "@/components/vault/AppShell";
import { BoardCard } from "@/components/vault/BoardCard";
import { CategoryCard } from "@/components/vault/CategoryCard";
import { Footer } from "@/components/vault/Footer";
import { CreateBoardModal } from "@/components/vault/CreateBoardModal";
import { getMergedBoards, useVault, searchBoards } from "@/lib/vault-store";
import { boards as seedBoards } from "@/lib/boards-data";
import { CATEGORIES, matchesCategory } from "@/lib/categories";

type ExploreSearch = { category?: string };

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): ExploreSearch => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({ meta: [{ title: "Explore — MuseBoard" }] }),
  component: ExplorePage,
});

function ExplorePage() {
  useVault();
  const { category: initialCategory } = Route.useSearch();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<string>(initialCategory ?? "All");

  const all = getMergedBoards();
  const seedIds = useMemo(() => new Set(seedBoards.map((b) => b.id)), []);
  const inspiration = all.filter((b) => seedIds.has(b.id));

  const visible = useMemo(() => {
    let list = inspiration;
    if (active !== "All") list = list.filter((b) => matchesCategory(active, b.tags));
    if (search.trim()) {
      const lc = search.toLowerCase();
      list = searchBoards(search).filter((b) =>
        seedIds.has(b.id) && (active === "All" || matchesCategory(active, b.tags)),
      );
      // ensure fallback when searchBoards returns user boards
      if (list.length === 0) {
        list = inspiration.filter((b) => (b.title + b.description + b.tags.join(" ")).toLowerCase().includes(lc));
      }
    }
    return list;
  }, [inspiration, active, search, seedIds]);

  return (
    <AppShell onCreate={() => setModalOpen(true)} searchValue={search} onSearchChange={setSearch}>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Curated collections</p>
        <h1 className="mt-1 font-display text-3xl text-foreground sm:text-4xl">Explore</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Hand-picked mood boards across every aesthetic. Open one for inspiration, or
          save your favorites with a tap.
        </p>

        <div className="mt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Browse by category</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((c, i) => {
              const count = all.filter((b) => matchesCategory(c.name, b.tags)).length;
              return <CategoryCard key={c.name} category={c} count={count} index={i} />;
            })}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-2">
            {["All", ...CATEGORIES.map((c) => c.name)].map((c) => (
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

          <motion.div layout className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((b, i) => (
                <BoardCard key={b.id} board={b} index={i} variant="demo" />
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <div className="glass mx-auto mt-10 grid max-w-xl place-items-center rounded-3xl px-8 py-16 text-center shadow-soft">
              <p className="font-display text-2xl text-foreground">Nothing here yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Try another category or search term.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <CreateBoardModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppShell>
  );
}
