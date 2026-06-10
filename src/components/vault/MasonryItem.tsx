import { motion } from "framer-motion";
import type { BoardCardContent } from "@/lib/boards-data";
import { Heart, MoreHorizontal, Quote } from "lucide-react";

export function MasonryItem({ item, index }: { item: BoardCardContent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="mb-5 break-inside-avoid"
    >
      {item.type === "image" && (
        <div className="group relative overflow-hidden rounded-2xl bg-muted shadow-soft transition-shadow hover:shadow-lift">
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            style={{ aspectRatio: `4 / ${item.height / 200}` }}
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/0 to-foreground/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {item.caption ? (
              <p className="max-w-[70%] font-display text-sm text-white drop-shadow-md">
                {item.caption}
              </p>
            ) : <span />}
            <div className="pointer-events-auto flex gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:scale-105">
                <Heart className="h-4 w-4" />
              </button>
              <button className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:scale-105">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {item.type === "quote" && (
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/60 via-card to-background p-7 shadow-soft">
          <Quote className="absolute -right-2 -top-2 h-20 w-20 text-primary/15" />
          <p className="font-display text-2xl leading-snug text-foreground">
            “{item.text}”
          </p>
          {item.author && (
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              — {item.author}
            </p>
          )}
        </div>
      )}

      {item.type === "note" && (
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Note
          </p>
          <h4 className="mt-2 font-display text-lg text-foreground">{item.title}</h4>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {item.body}
          </p>
        </div>
      )}
    </motion.div>
  );
}