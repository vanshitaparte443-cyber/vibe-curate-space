import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Board } from "@/lib/boards-data";

export function BoardCard({ board, index }: { board: Board; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link
        to="/board/$boardId"
        params={{ boardId: board.id }}
        className="block overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift"
      >
        <div className="grid grid-cols-2 grid-rows-2 gap-1 p-1.5">
          {board.covers.slice(0, 4).map((src, i) => (
            <div
              key={i}
              className={
                "overflow-hidden rounded-2xl bg-muted " +
                (i === 0 ? "aspect-[4/5] row-span-2" : "aspect-square")
              }
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="space-y-3 px-6 pb-6 pt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl leading-snug text-foreground">
              {board.title}
            </h3>
            <span className="shrink-0 rounded-full bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-foreground/70">
              {board.itemCount}
            </span>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {board.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {board.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/70 bg-background/40 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}