import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Sparkles } from "lucide-react";
import { createBoard } from "@/lib/vault-store";
import { useNavigate } from "@tanstack/react-router";

const CATEGORIES = [
  "Fashion",
  "Interior Design",
  "Study",
  "Travel",
  "Branding",
  "Photography",
  "Art",
  "Architecture",
  "Food",
  "Fitness",
  "Productivity",
  "Personal Growth",
  "UI/UX Design",
  "Graphic Design",
  "Business",
  "Career",
  "Vision Boards",
  "Social Media",
  "Content Creation",
];

export function CreateBoardModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tagsInput, setTagsInput] = useState("");
  const [cover, setCover] = useState("");

  const reset = () => {
    setTitle("");
    setDescription("");
    setCategory(CATEGORIES[0]);
    setTagsInput("");
    setCover("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const board = createBoard({
      title,
      description,
      category,
      tags: tags.length ? tags : [category],
      cover,
    });
    handleClose();
    navigate({ to: "/board/$boardId", params: { boardId: board.id } });
  };

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
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative z-10 w-full max-w-lg overflow-hidden rounded-3xl shadow-lift"
          >
            <div className="relative px-7 pt-7">
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> New board
              </span>
              <h2 className="mt-4 font-display text-3xl text-foreground">
                Begin a new vault
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Give your inspiration a name, a mood, and a place to live.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-7 pb-7 pt-5">
              <Field label="Board title">
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Quiet Mornings"
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A line or two about the feeling you're chasing…"
                  rows={2}
                  className={inputCls + " resize-none py-2.5"}
                />
              </Field>
              <Field label="Category">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setCategory(c)}
                      className={
                        "rounded-full px-3.5 py-1.5 text-xs font-medium transition " +
                        (category === c
                          ? "bg-foreground text-background shadow-soft"
                          : "border border-border/70 bg-card/50 text-muted-foreground hover:text-foreground")
                      }
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Tags (comma separated)">
                <input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="linen, light, slow"
                  className={inputCls}
                />
              </Field>
              <Field label="Cover image URL (optional)">
                <input
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  placeholder="https://…"
                  className={inputCls}
                />
              </Field>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-full border border-border/70 bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-card"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lift transition hover:bg-foreground/90"
                >
                  <Plus className="h-4 w-4" /> Create Board
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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