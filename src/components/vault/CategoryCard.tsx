import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Category } from "@/lib/categories";

export function CategoryCard({
  category,
  count,
  index = 0,
}: {
  category: Category;
  count: number;
  index?: number;
}) {
  const { Icon } = category;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <Link
        to="/explore"
        search={{ category: category.name }}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-soft transition-shadow hover:shadow-lift"
      >
        <div
          aria-hidden
          className={
            "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition-opacity group-hover:opacity-90 " +
            category.hue
          }
        />
        <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-secondary/60 text-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="relative mt-6">
          <p className="font-display text-lg leading-tight text-foreground">
            {category.name}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {count} {count === 1 ? "board" : "boards"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
