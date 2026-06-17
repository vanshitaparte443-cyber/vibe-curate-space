import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { AppShell } from "@/components/vault/AppShell";
import { BoardCard } from "@/components/vault/BoardCard";
import { Footer } from "@/components/vault/Footer";
import { CreateBoardModal } from "@/components/vault/CreateBoardModal";

import { getMergedBoards, useVault, searchBoards } from "@/lib/vault-store";
import { boards as seedBoards } from "@/lib/boards-data";

import { RequireAuth } from "@/lib/RequireAuth";

export const Route = createFileRoute("/boards")({
  head: () => ({ meta: [{ title: "My Boards — MuseBoard" }] }),
  component: BoardsRoute,
});

function BoardsRoute() {
  return (
    <RequireAuth>
      <MyBoardsPage />
    </RequireAuth>
  );
}

function MyBoardsPage() {
  useVault();

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const all = getMergedBoards();
  const seedIds = useMemo(() => new Set(seedBoards.map((b) => b.id)), []);
  const mine = all.filter((b) => !seedIds.has(b.id));

  const filtered = search.trim()
    ? searchBoards(search).filter((b) => !seedIds.has(b.id))
    : mine;

  return (
    <AppShell
      onCreate={() => setModalOpen(true)}
      searchValue={search}
      onSearchChange={setSearch}
    >
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Your vault
            </p>
            <h1 className="mt-1 font-display text-3xl text-foreground sm:text-4xl">
              My Boards
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mine.length} personal {mine.length === 1 ? "board" : "boards"}
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-lift transition hover:bg-foreground/90"
          >
            <Plus className="h-4 w-4" /> New Board
          </button>
        </div>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <div className="glass mx-auto grid max-w-xl place-items-center rounded-3xl px-8 py-16 text-center shadow-soft">
              <p className="font-display text-2xl text-foreground">
                {search ? "No matches." : "No personal boards yet."}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {search ? "Try a different word." : "Create a board to start collecting."}
              </p>

              {!search && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lift transition hover:bg-foreground/90"
                >
                  <Plus className="h-4 w-4" /> Create board
                </button>
              )}

              <Link
                to="/explore"
                className="mt-3 text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                or explore inspiration collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((b, i) => (
                <BoardCard key={b.id} board={b} index={i} variant="user" />
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