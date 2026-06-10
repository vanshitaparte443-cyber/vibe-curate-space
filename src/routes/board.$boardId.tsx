import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Share2,
  Download,
  Pencil,
  Plus,
  Clock,
} from "lucide-react";
import { TopNav } from "@/components/vault/TopNav";
import { MasonryItem } from "@/components/vault/MasonryItem";
import { getBoard, boards } from "@/lib/boards-data";

export const Route = createFileRoute("/board/$boardId")({
  loader: ({ params }) => {
    const board = getBoard(params.boardId);
    if (!board) throw notFound();
    return { board };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.board.title} — VibeVault` },
          { name: "description", content: loaderData.board.description },
          { property: "og:title", content: `${loaderData.board.title} — VibeVault` },
          { property: "og:description", content: loaderData.board.description },
          { property: "og:image", content: loaderData.board.covers[0] },
        ]
      : [{ title: "Board — VibeVault" }],
  }),
  component: BoardWorkspace,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <h1 className="font-display text-4xl">Board not found</h1>
        <p className="mt-3 text-muted-foreground">This vault doesn't exist yet.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-foreground px-5 py-2 text-sm text-background">
          Back to dashboard
        </Link>
      </div>
    </div>
  ),
});

function BoardWorkspace() {
  const { board } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <TopNav compact />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border/60 bg-card/40 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-foreground transition hover:bg-card"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All boards
          </Link>

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-foreground transition hover:bg-card">
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
            <button className="hidden items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-foreground transition hover:bg-card sm:inline-flex">
              <Download className="h-3.5 w-3.5" /> Download
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background shadow-soft transition hover:bg-foreground/90">
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>
        </div>
      </motion.div>

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Mood Board
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {board.title}
            </h1>
            <button
              aria-label="Edit title"
              className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {board.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {board.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs font-medium text-foreground/80"
              >
                {t}
              </span>
            ))}
            <span className="ml-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {board.lastEdited} · {board.itemCount} items
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass mt-10 rounded-3xl p-5 shadow-soft sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Color Palette
              </p>
              <p className="mt-1 font-display text-xl text-foreground">
                Five tones, one mood
              </p>
            </div>
            <div className="flex flex-1 gap-3 sm:max-w-md sm:justify-end">
              {board.palette.map((c) => (
                <div key={c} className="flex flex-1 flex-col items-center gap-2 sm:flex-none">
                  <motion.div
                    whileHover={{ scale: 1.08, y: -4 }}
                    className="h-14 w-14 rounded-2xl shadow-soft ring-1 ring-foreground/10 sm:h-16 sm:w-16"
                    style={{ background: c }}
                  />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {c.replace("#", "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {board.items.map((item, i) => (
            <MasonryItem key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">
          More from your vault
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {boards
            .filter((b) => b.id !== board.id)
            .slice(0, 5)
            .map((b) => (
              <Link
                key={b.id}
                to="/board/$boardId"
                params={{ boardId: b.id }}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-soft transition-shadow group-hover:shadow-lift">
                  <img
                    src={b.covers[0]}
                    alt={b.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 font-display text-sm leading-snug text-foreground">
                  {b.title}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}