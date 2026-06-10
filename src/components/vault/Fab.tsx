import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Plus, Image as ImageIcon, FileText, Link2 } from "lucide-react";
import type { AddMode } from "./AddItemModal";

export function Fab({ onPick }: { onPick: (m: AddMode) => void }) {
  const [open, setOpen] = useState(false);

  const options: { mode: AddMode; label: string; Icon: typeof ImageIcon }[] = [
    { mode: "image", label: "Add Image", Icon: ImageIcon },
    { mode: "note", label: "Add Note", Icon: FileText },
    { mode: "link", label: "Add Link", Icon: Link2 },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open &&
          options.map((o, i) => (
            <motion.button
              key={o.mode}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.22, delay: i * 0.04 }}
              whileHover={{ x: -2 }}
              onClick={() => {
                setOpen(false);
                onPick(o.mode);
              }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-foreground shadow-lift"
            >
              <o.Icon className="h-4 w-4 text-primary" />
              {o.label}
            </motion.button>
          ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Add to board"
        className="grid h-14 w-14 place-items-center rounded-full bg-foreground text-background shadow-lift ring-1 ring-foreground/10"
      >
        <Plus className="h-6 w-6" />
      </motion.button>
    </div>
  );
}