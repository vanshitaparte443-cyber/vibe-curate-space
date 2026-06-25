import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { AppShell } from "@/components/vault/AppShell";
import { BoardCard } from "@/components/vault/BoardCard";
import { Footer } from "@/components/vault/Footer";
import { CreateBoardModal } from "@/components/vault/CreateBoardModal";

import {
  getMergedBoards,
  useVault,
  searchBoards,
} from "@/lib/vault-store";
import { boards as seedBoards } from "@/lib/boards-data";

// 🔐 ADD THIS
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/boards")({
  head: () => ({ meta: [{ title: "My Boards — MuseBoard" }] }),

  component: () => (
    <ProtectedRoute>
      <MyBoardsPage />
    </ProtectedRoute>
  ),
});

function MyBoardsPage() {
  useVault();

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const all = getMergedBoards();

  const seedIds = useMemo(
    () => new Set(seedBoards.map((b) => b.id)),
    []
  );

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
      <div className="rounded-[32px] border border-border/60 bg-card/50 p-8 backdrop-blur">
  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
    Your Workspace
  </p>

  <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
    My Boards
  </h1>

  <p className="mt-3 max-w-2xl text-muted-foreground">
    Organize inspiration, collect ideas and build beautiful moodboards
    for your projects.
  </p>

  <div className="mt-8 grid gap-4 sm:grid-cols-3">
     <div className="rounded-2xl border border-border/60 bg-background/60 p-5">
       <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Total Boards
       </p>
       <p className="mt-2 text-3xl font-bold">
        {mine.length}
       </p>
     </div>

     <div className="rounded-2xl border border-border/60 bg-background/60 p-5">
       <p className="text-xs uppercase tracking-wide text-muted-foreground">
         Categories
       </p>
       <p className="mt-2 text-3xl font-bold">
         {new Set(mine.flatMap((b) => b.tags)).size}
       </p>
     </div>

     <div className="rounded-2xl border border-border/60 bg-background/60 p-5">
       <p className="text-xs uppercase tracking-wide text-muted-foreground">
         Inspiration Items
       </p>
       <p className="mt-2 text-3xl font-bold">
         {mine.reduce((acc, b) => acc + b.itemCount, 0)}
       </p>
    </div>
  </div>

  <button
    onClick={() => setModalOpen(true)}
    className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
  >
    <Plus className="h-4 w-4" />
    Create New Board
  </button>
</div>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <div className="glass mx-auto grid max-w-xl place-items-center rounded-3xl px-8 py-16 text-center">
              <p className="font-display text-2xl text-foreground">
                {search
                 ? "No matches found"
                 : "Your inspiration journey starts here ✨"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {search
                  ? "Try a different keyword"
                  : "Create your first board and start saving ideas, references and inspiration."}
              
              </p>

              {!search && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-6 rounded-full bg-foreground px-5 py-2.5 text-sm text-background"
                >
                  Create board
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((b, i) => (
                <BoardCard
                  key={b.id}
                  board={b}
                  index={i}
                  variant="user"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <CreateBoardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </AppShell>
  );
}