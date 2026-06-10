import { motion } from "framer-motion";
import type { BoardCardContent } from "@/lib/boards-data";
import { Heart, Pencil, Trash2, Quote, Link2, ExternalLink } from "lucide-react";

const NOTE_BG: Record<string, string> = {
  cream: "#FAF3E7",
  beige: "#E7DCCF",
  blush: "#F5DCD2",
  white: "#FFFFFF",
};
const NOTE_FONTS: Record<string, string> = {
  serif: "var(--font-display)",
  sans: "var(--font-sans)",
  script: "'Dancing Script', 'Snell Roundhand', cursive",
};

export function MasonryItem({
  item,
  index,
  onEdit,
  onDelete,
}: {
  item: BoardCardContent;
  index: number;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const editable = !!onEdit || !!onDelete;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group/item mb-5 break-inside-avoid"
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
              {editable ? (
                <>
                  <button
                    onClick={onEdit}
                    aria-label="Edit"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:scale-105"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={onDelete}
                    aria-label="Delete"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:scale-105"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <button className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:scale-105">
                  <Heart className="h-4 w-4" />
                </button>
              )}
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
        <div
          className="relative rounded-2xl border border-border/60 p-6 shadow-soft"
          style={{
            background: item.bg ? NOTE_BG[item.bg] : undefined,
            fontFamily: item.font ? NOTE_FONTS[item.font] : undefined,
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
            Note
          </p>
          <h4
            className="mt-2 text-lg text-foreground"
            style={{ fontFamily: item.font ? NOTE_FONTS[item.font] : undefined }}
          >
            {item.title}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">
            {item.body}
          </p>
          {editable && <CornerActions onEdit={onEdit} onDelete={onDelete} />}
        </div>
      )}

      {item.type === "link" && <LinkCard item={item} editable={editable} onEdit={onEdit} onDelete={onDelete} />}
    </motion.div>
  );
}

function CornerActions({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) {
  return (
    <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity group-hover/item:opacity-100">
      {onEdit && (
        <button
          onClick={onEdit}
          aria-label="Edit"
          className="grid h-8 w-8 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur transition hover:scale-105"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          aria-label="Delete"
          className="grid h-8 w-8 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur transition hover:scale-105"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function LinkCard({
  item,
  editable,
  onEdit,
  onDelete,
}: {
  item: Extract<BoardCardContent, { type: "link" }>;
  editable: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  let domain = "";
  try {
    domain = new URL(item.url).hostname.replace(/^www\./, "");
  } catch {
    domain = item.url;
  }
  return (
    <div className="group/link relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-shadow hover:shadow-lift">
      {item.thumbnail ? (
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={item.thumbnail}
            alt={item.title ?? domain}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover/link:scale-105"
          />
        </div>
      ) : (
        <div className="grid aspect-[16/10] place-items-center bg-gradient-to-br from-secondary/60 via-card to-background">
          <Link2 className="h-10 w-10 text-primary/60" />
        </div>
      )}
      <div className="space-y-2 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
          {domain}
        </p>
        <h4 className="font-display text-lg leading-snug text-foreground">
          {item.title || domain}
        </h4>
        {item.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        )}
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-xs font-medium text-foreground/70 transition hover:text-foreground"
        >
          Visit <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      {editable && <CornerActions onEdit={onEdit} onDelete={onDelete} />}
    </div>
  );
}