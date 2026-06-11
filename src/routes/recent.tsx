import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock } from "lucide-react";
import { AppShell } from "@/components/vault/AppShell";
import { BoardCard } from "@/components/vault/BoardCard";
import { Footer } from "@/components/vault/Footer";
import { CreateBoardModal } from "@/components/vault/CreateBoardModal";
import { getMergedBoards, useVault } from "@/lib/vault-store";
import { boards as seedBoards } from "@/lib/boards-data";

export const Route = createFileRoute("/recent")({
  head: () => ({ meta: [{ title: "Recent — VibeVault" }] }),
  component: RecentPage,
});

function RecentPage() {
  const vault = useVault();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const all = getMergedBoards();
  const seedIds = useMemo(() => new Set(seedBoards.map((b) => b.id)), []);
  const recents = vault.recents
    .map((id) => all.find((b) => b.id === id))
    .filter(Boolean) as typeof all;
  const filtered = search.trim()
    ? recents.filter((b) =>
        (b.title + " " + b.tags.join(" ") + " " + b.description).toLowerCase().includes(search.toLowerCase()),
      )
    : recents;

  return (
    <AppShell onCreate={() => setModalOpen(true)} searchValue={search} onSearchChange={setSearch}>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Picking up</p>
        <h1 className="mt-1 font-display text-3xl text-foreground sm:text-4xl">Recently viewed</h1>
        <p className="mt-1 text-sm text-muted-foreground">The last {recents.length} boards you opened</p>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <div className="glass mx-auto grid max-w-xl place-items-center rounded-3xl px-8 py-16 text-center shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary/60">
                <Clock className="h-5 w-5 text-foreground" />
              </div>
              <p className="mt-4 font-display text-2xl text-foreground">No recent boards.</p>
              <p className="mt-2 text-sm text-muted-foreground">Open a board to start a trail.</p>
              <Link to="/explore" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lift transition hover:bg-foreground/90">
                Browse inspiration
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((b, i) => (
                <BoardCard key={b.id} board={b} index={i} variant={seedIds.has(b.id) ? "demo" : "user"} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
      <CreateBoardModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppShell>
  );
}
