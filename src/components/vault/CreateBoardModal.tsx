import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Sparkles, ImageIcon } from "lucide-react";
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

    navigate({
      to: "/board/$boardId",
      params: { boardId: board.id },
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}

          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* MODAL */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 15,
              scale: 0.98,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[32px] border border-border/50 bg-card shadow-[0_25px_80px_rgba(0,0,0,0.18)]"
          >
            {/* GLOW */}

            <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

            {/* HEADER */}

            <div className="relative border-b border-border/50 px-8 py-7">
              <button
                onClick={handleClose}
                className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-background/70 text-muted-foreground transition hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" />
                Create Board
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
                Start a new inspiration board
              </h2>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Organize ideas, collect references, and build your next
                masterpiece.
              </p>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 px-8 py-7"
            >
              <Field label="Board Title">
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Luxury Apartment Inspiration"
                  className={inputCls}
                  required
                />
              </Field>

              <Field label="Description">
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the aesthetic, mood, or purpose of this board..."
                  className={`${inputCls} resize-none py-3 h-auto`}
                />
              </Field>

              <Field label="Category">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={
                        "rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 " +
                        (category === c
                          ? "bg-foreground text-background shadow-lg"
                          : "border border-border/60 bg-background hover:border-primary/40 hover:bg-primary/5")
                      }
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Tags">
                <input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="minimal, luxury, modern"
                  className={inputCls}
                />
              </Field>

              <Field label="Cover Image URL">
                <input
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={inputCls}
                />
              </Field>

              {/* PREVIEW */}

              {cover && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="overflow-hidden rounded-2xl border border-border/60"
                >
                  <img
                    src={cover}
                    alt=""
                    className="h-44 w-full object-cover"
                  />
                </motion.div>
              )}

              {!cover && (
                <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/30">
                  <div className="text-center">
                    <ImageIcon className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Cover preview appears here
                    </p>
                  </div>
                </div>
              )}

              {/* FOOTER */}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl border border-border/60 px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
                >
                  Cancel
                </button>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  Create Board
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
  "w-full rounded-2xl border border-border/60 bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}