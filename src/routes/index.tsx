import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Sparkles, ArrowUpRight, Image as ImageIcon, FileText, Link2, Clock, Heart, Compass } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/vault/AppShell";
import { BoardCard } from "@/components/vault/BoardCard";
import { CategoryCard } from "@/components/vault/CategoryCard";
import { Footer } from "@/components/vault/Footer";
import { CreateBoardModal } from "@/components/vault/CreateBoardModal";
import { getMergedBoards, useVault, searchBoards } from "@/lib/vault-store";
import { boards as seedBoards } from "@/lib/boards-data";
import { CATEGORIES, matchesCategory } from "@/lib/categories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VibeVault — Collect Ideas. Curate Aesthetics." },
      { name: "description", content: "A premium mood board space for fashion, interiors, study inspiration, travel, and branding." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const vault = useVault();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const all = getMergedBoards();
  const seedIds = useMemo(() => new Set(seedBoards.map((b) => b.id)), []);
  const myBoards = all.filter((b) => !seedIds.has(b.id));
  const inspirationBoards = all.filter((b) => seedIds.has(b.id));

  const recentBoards = useMemo(
    () =>
      vault.recents
        .map((id) => all.find((b) => b.id === id))
        .filter(Boolean) as typeof all,
    [vault.recents, all],
  );
  const favoriteBoards = all.filter((b) => vault.favorites.includes(b.id));

  const searchResults = search.trim() ? searchBoards(search) : null;

  return (
    <AppShell
      onCreate={() => setModalOpen(true)}
      searchValue={search}
      onSearchChange={setSearch}
    >
      {searchResults ? (
        <SearchResults query={search} results={searchResults} onClear={() => setSearch("")} />
      ) : (
        <>
          <Hero onCreate={() => setModalOpen(true)} />

          <Section
            id="quick-actions"
            title="Quick actions"
            kicker="Start something"
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <QuickAction onClick={() => setModalOpen(true)} Icon={Plus} label="New Board" tone="solid" />
              <QuickAction onClick={() => setModalOpen(true)} Icon={ImageIcon} label="Add Image" />
              <QuickAction onClick={() => setModalOpen(true)} Icon={FileText} label="Add Note" />
              <QuickAction onClick={() => setModalOpen(true)} Icon={Link2} label="Save Link" />
            </div>
          </Section>

          {recentBoards.length > 0 && (
            <Section title="Recently viewed" kicker="Pick up where you left off" Icon={Clock} actionTo="/recent" actionLabel="See all">
              <RowGrid>
                {recentBoards.slice(0, 4).map((b, i) => (
                  <BoardCard key={b.id} board={b} index={i} variant={seedIds.has(b.id) ? "demo" : "user"} />
                ))}
              </RowGrid>
            </Section>
          )}

          <Section
            id="my-boards"
            title="My boards"
            kicker={myBoards.length === 0 ? "Your space" : `${myBoards.length} personal ${myBoards.length === 1 ? "board" : "boards"}`}
            Icon={Heart}
          >
            {myBoards.length === 0 ? (
              <EmptyMyBoards onCreate={() => setModalOpen(true)} />
            ) : (
              <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {myBoards.map((b, i) => (
                    <BoardCard key={b.id} board={b} index={i} variant="user" />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </Section>

          {favoriteBoards.length > 0 && (
            <Section title="Favorites" kicker="Loved by you" Icon={Heart} actionTo="/favorites" actionLabel="See all">
              <RowGrid>
                {favoriteBoards.slice(0, 4).map((b, i) => (
                  <BoardCard key={b.id} board={b} index={i} variant={seedIds.has(b.id) ? "demo" : "user"} />
                ))}
              </RowGrid>
            </Section>
          )}

          <Section
            id="inspiration"
            title="Inspiration collections"
            kicker="Curated by VibeVault"
            Icon={Sparkles}
            actionTo="/explore"
            actionLabel="Explore all"
          >
            <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {inspirationBoards.slice(0, 6).map((b, i) => (
                <BoardCard key={b.id} board={b} index={i} variant="demo" />
              ))}
            </motion.div>
          </Section>

          <Section title="Browse by category" kicker="Find your aesthetic" Icon={Compass}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {CATEGORIES.slice(0, 10).map((c, i) => {
                const count = all.filter((b) => matchesCategory(c.name, b.tags)).length;
                return <CategoryCard key={c.name} category={c} count={count} index={i} />;
              })}
            </div>
            <div className="mt-4 flex justify-end">
              <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition hover:text-foreground">
                All categories <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Section>

          <Footer />
        </>
      )}

      <CreateBoardModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppShell>
  );
}

function Hero({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-secondary), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 h-[360px] w-[560px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--color-primary), transparent 70%)" }}
      />
      <div className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" />
            Your aesthetic, organized
          </span>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Welcome back.<br />
            <span className="italic text-foreground/85">Curate something beautiful.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Create mood boards for fashion, interiors, study, travel, branding —
            everything in between. A calm space to think in pictures.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCreate}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background shadow-lift transition-colors hover:bg-foreground/90"
            >
              <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
              Create New Board
            </motion.button>
            <Link to="/explore" className="inline-flex h-11 items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card">
              Explore inspiration
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Section({
  children,
  title,
  kicker,
  Icon,
  actionTo,
  actionLabel,
  id,
}: {
  children: React.ReactNode;
  title: string;
  kicker?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  actionTo?: string;
  actionLabel?: string;
  id?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-5 pb-12 pt-2 sm:px-8 sm:pb-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          {kicker && (
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {Icon && <Icon className="h-3 w-3 text-primary" />}
              {kicker}
            </p>
          )}
          <h2 className="mt-1.5 font-display text-2xl text-foreground sm:text-3xl">
            {title}
          </h2>
        </div>
        {actionTo && (
          <Link to={actionTo} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition hover:text-foreground">
            {actionLabel ?? "See all"} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function RowGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}

function QuickAction({
  Icon,
  label,
  onClick,
  tone,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  tone?: "solid";
}) {
  const solid = tone === "solid";
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={
        "group flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition " +
        (solid
          ? "border-transparent bg-foreground text-background shadow-lift"
          : "border-border/60 bg-card/60 text-foreground shadow-soft hover:bg-card hover:shadow-lift")
      }
    >
      <span className={"grid h-9 w-9 place-items-center rounded-xl " + (solid ? "bg-background/15" : "bg-secondary/60")}>
        <Icon className="h-4 w-4" />
      </span>
      {label}
    </motion.button>
  );
}

function EmptyMyBoards({ onCreate }: { onCreate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass relative overflow-hidden rounded-3xl px-8 py-14 text-center shadow-soft"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-50 blur-2xl"
        style={{ background: "radial-gradient(closest-side, var(--color-primary), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-md">
        <p className="font-display text-2xl text-foreground">Your vault is empty.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Create your first board. Add an image you love, a quote that lingers, a link
          you want to remember.
        </p>
        <button
          onClick={onCreate}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lift transition hover:bg-foreground/90"
        >
          <Plus className="h-4 w-4" /> Create your first board
        </button>
      </div>
    </motion.div>
  );
}

function SearchResults({
  query,
  results,
  onClear,
}: {
  query: string;
  results: ReturnType<typeof getMergedBoards>;
  onClear: () => void;
}) {
  const seedIds = useMemo(() => new Set(seedBoards.map((b) => b.id)), []);
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Search results
          </p>
          <h1 className="mt-1 font-display text-3xl text-foreground sm:text-4xl">
            “{query}”
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "match" : "matches"}
          </p>
        </div>
        <button
          onClick={onClear}
          className="rounded-full border border-border/70 bg-card/60 px-4 py-2 text-xs font-medium text-foreground transition hover:bg-card"
        >
          Clear
        </button>
      </div>
      {results.length === 0 ? (
        <div className="glass mx-auto grid max-w-xl place-items-center rounded-3xl px-8 py-16 text-center shadow-soft">
          <p className="font-display text-2xl text-foreground">Nothing matched.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different word — a tag, a feeling, the name of a place.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((b, i) => (
            <BoardCard key={b.id} board={b} index={i} variant={seedIds.has(b.id) ? "demo" : "user"} />
          ))}
        </div>
      )}
    </section>
  );
}
