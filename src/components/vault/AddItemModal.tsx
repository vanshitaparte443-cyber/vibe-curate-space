import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Image as ImageIcon, Upload, Link2, FileText } from "lucide-react";
import { addItem, updateItem } from "@/lib/vault-store";
import type { BoardCardContent } from "@/lib/boards-data";

export type AddMode = "image" | "note" | "link";

export function AddItemModal({
  open,
  mode,
  boardId,
  onClose,
  editItem,
}: {
  open: boolean;
  mode: AddMode;
  boardId: string;
  onClose: () => void;
  editItem?: BoardCardContent;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative z-10 w-full max-w-lg overflow-hidden rounded-3xl shadow-lift"
          >
            <Header mode={mode} onClose={onClose} editing={!!editItem} />
            {mode === "image" && (
              <ImageForm
                boardId={boardId}
                onClose={onClose}
                editItem={editItem?.type === "image" ? editItem : undefined}
              />
            )}
            {mode === "note" && (
              <NoteForm
                boardId={boardId}
                onClose={onClose}
                editItem={editItem?.type === "note" ? editItem : undefined}
              />
            )}
            {mode === "link" && (
              <LinkForm
                boardId={boardId}
                onClose={onClose}
                editItem={editItem?.type === "link" ? editItem : undefined}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header({
  mode,
  onClose,
  editing,
}: {
  mode: AddMode;
  onClose: () => void;
  editing: boolean;
}) {
  const Icon = mode === "image" ? ImageIcon : mode === "note" ? FileText : Link2;
  const labels = {
    image: { eyebrow: "New image", title: "Add an image" },
    note: { eyebrow: "New note", title: "Capture a thought" },
    link: { eyebrow: "New link", title: "Save a link" },
  } as const;
  return (
    <div className="relative px-7 pt-7">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="h-3 w-3 text-primary" />
        {editing ? "Edit" : labels[mode].eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl text-foreground">
        {editing ? `Edit ${mode}` : labels[mode].title}
      </h2>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-2xl border border-border/60 bg-card/70 px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-4 focus:ring-primary/15";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

/* ============ Image ============ */
function ImageForm({
  boardId,
  onClose,
  editItem,
}: {
  boardId: string;
  onClose: () => void;
  editItem?: Extract<BoardCardContent, { type: "image" }>;
}) {
  const [src, setSrc] = useState(editItem?.src ?? "");
  const [urlInput, setUrlInput] = useState(editItem?.src ?? "");
  const [caption, setCaption] = useState(editItem?.caption ?? "");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSrc(result);
      setUrlInput("");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSrc = src || urlInput.trim();
    if (!finalSrc) return;
    const img = new Image();
    img.onload = () => {
      const ratio = img.naturalHeight / img.naturalWidth || 1;
      const height = Math.round(400 * ratio + 200);
      if (editItem?.id) {
        updateItem(boardId, editItem.id, {
          src: finalSrc,
          caption: caption || undefined,
          alt: caption || "Image",
          height,
        } as Partial<BoardCardContent>);
      } else {
        addItem(boardId, {
          type: "image",
          src: finalSrc,
          caption: caption || undefined,
          alt: caption || "Image",
          height,
        });
      }
      onClose();
    };
    img.onerror = () => {
      // still save with a default ratio
      if (editItem?.id) {
        updateItem(boardId, editItem.id, {
          src: finalSrc,
          caption: caption || undefined,
          alt: caption || "Image",
          height: 560,
        } as Partial<BoardCardContent>);
      } else {
        addItem(boardId, {
          type: "image",
          src: finalSrc,
          caption: caption || undefined,
          alt: caption || "Image",
          height: 560,
        });
      }
      onClose();
    };
    img.src = finalSrc;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-7 pb-7 pt-5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file && file.type.startsWith("image/")) onFile(file);
        }}
        onClick={() => fileRef.current?.click()}
        className={
          "relative grid cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed bg-card/40 px-4 py-8 text-center transition " +
          (dragging
            ? "border-primary bg-primary/5"
            : "border-border/70 hover:border-primary/50")
        }
      >
        {src ? (
          <img
            src={src}
            alt="preview"
            className="max-h-56 w-auto rounded-xl object-cover shadow-soft"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary/60 text-foreground">
              <Upload className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Drop an image or click to upload
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF</p>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />
      </div>

      <Field label="Or paste image URL">
        <input
          value={urlInput}
          onChange={(e) => {
            setUrlInput(e.target.value);
            setSrc(e.target.value);
          }}
          placeholder="https://…"
          className={inputCls}
        />
      </Field>
      <Field label="Caption (optional)">
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="A small note about this image"
          className={inputCls}
        />
      </Field>

      <Actions onClose={onClose} editing={!!editItem} disabled={!src && !urlInput} />
    </form>
  );
}

/* ============ Note ============ */
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

function NoteForm({
  boardId,
  onClose,
  editItem,
}: {
  boardId: string;
  onClose: () => void;
  editItem?: Extract<BoardCardContent, { type: "note" }>;
}) {
  const [title, setTitle] = useState(editItem?.title ?? "");
  const [body, setBody] = useState(editItem?.body ?? "");
  const [font, setFont] = useState<NonNullable<Extract<BoardCardContent, { type: "note" }>["font"]>>(
    editItem?.font ?? "serif",
  );
  const [bg, setBg] = useState<NonNullable<Extract<BoardCardContent, { type: "note" }>["bg"]>>(
    editItem?.bg ?? "cream",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !body.trim()) return;
    const payload = { title: title.trim() || "Note", body: body.trim(), font, bg };
    if (editItem?.id) {
      updateItem(boardId, editItem.id, payload as Partial<BoardCardContent>);
    } else {
      addItem(boardId, { type: "note", ...payload });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-7 pb-7 pt-5">
      <div
        className="rounded-2xl border border-border/60 p-5 shadow-soft"
        style={{ background: NOTE_BG[bg], fontFamily: NOTE_FONTS[font] }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
          Preview
        </p>
        <p className="mt-2 text-lg text-foreground">{title || "Your title"}</p>
        <p className="mt-1 text-sm text-foreground/70">
          {body || "A few words of inspiration…"}
        </p>
      </div>

      <Field label="Title">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A small heading"
          className={inputCls}
          autoFocus
        />
      </Field>
      <Field label="Text">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write something worth keeping…"
          rows={3}
          className={inputCls + " resize-none py-2.5"}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Font">
          <div className="flex flex-wrap gap-2">
            {(["serif", "sans", "script"] as const).map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setFont(f)}
                className={
                  "rounded-full px-3 py-1.5 text-xs font-medium transition " +
                  (font === f
                    ? "bg-foreground text-background"
                    : "border border-border/70 bg-card/50 text-muted-foreground hover:text-foreground")
                }
                style={{ fontFamily: NOTE_FONTS[f] }}
              >
                {f}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Background">
          <div className="flex flex-wrap gap-2">
            {(["cream", "beige", "blush", "white"] as const).map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => setBg(b)}
                aria-label={b}
                className={
                  "h-8 w-8 rounded-full ring-1 ring-foreground/10 transition " +
                  (bg === b ? "ring-2 ring-primary scale-110" : "hover:scale-105")
                }
                style={{ background: NOTE_BG[b] }}
              />
            ))}
          </div>
        </Field>
      </div>

      <Actions onClose={onClose} editing={!!editItem} disabled={!title && !body} />
    </form>
  );
}

/* ============ Link ============ */
function LinkForm({
  boardId,
  onClose,
  editItem,
}: {
  boardId: string;
  onClose: () => void;
  editItem?: Extract<BoardCardContent, { type: "link" }>;
}) {
  const [url, setUrl] = useState(editItem?.url ?? "");
  const [title, setTitle] = useState(editItem?.title ?? "");
  const [description, setDescription] = useState(editItem?.description ?? "");
  const [thumbnail, setThumbnail] = useState(editItem?.thumbnail ?? "");
  const [domain, setDomain] = useState("");

  useEffect(() => {
    try {
      const u = new URL(url);
      setDomain(u.hostname.replace(/^www\./, ""));
    } catch {
      setDomain("");
    }
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    const payload = {
      url: url.trim(),
      title: title.trim() || domain || "Saved link",
      description: description.trim() || undefined,
      thumbnail: thumbnail.trim() || undefined,
    };
    if (editItem?.id) {
      updateItem(boardId, editItem.id, payload as Partial<BoardCardContent>);
    } else {
      addItem(boardId, { type: "link", ...payload });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-7 pb-7 pt-5">
      <Field label="URL">
        <input
          autoFocus
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/article"
          className={inputCls}
          required
        />
      </Field>
      <Field label="Title (optional)">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={domain || "Page title"}
          className={inputCls}
        />
      </Field>
      <Field label="Description (optional)">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Why this caught your eye…"
          className={inputCls + " resize-none py-2.5"}
        />
      </Field>
      <Field label="Thumbnail URL (optional)">
        <input
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="https://…"
          className={inputCls}
        />
      </Field>
      <Actions onClose={onClose} editing={!!editItem} disabled={!url} />
    </form>
  );
}

function Actions({
  onClose,
  editing,
  disabled,
}: {
  onClose: () => void;
  editing: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-end gap-2 pt-2">
      <button
        type="button"
        onClick={onClose}
        className="rounded-full border border-border/70 bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-card"
      >
        Cancel
      </button>
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={disabled}
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lift transition hover:bg-foreground/90 disabled:opacity-50"
      >
        {editing ? "Save changes" : "Add to board"}
      </motion.button>
    </div>
  );
}