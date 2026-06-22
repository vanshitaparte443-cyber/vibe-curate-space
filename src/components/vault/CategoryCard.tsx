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
      transition={{
        duration: 0.45,
        delay: index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
    >
      <Link
        to="/explore"
        search={{ category: category.name }}
        className="
          group
          relative
          flex
          h-full
          flex-col
          justify-between
          overflow-hidden
          rounded-2xl
          border
          border-border/60
          bg-gradient-to-b
          from-card
          to-card/90
          p-5
          shadow-soft
          transition-all
          duration-300
          hover:border-primary/30
          hover:shadow-lift
        "
      >
        <div
          aria-hidden
          className={
            "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100 " +
            category.hue
          }
        />

        <div
          className="
            relative
            grid
            h-11
            w-11
            place-items-center
            rounded-xl
            border
            border-border/60
            bg-background/80
            shadow-sm
            transition-transform
            duration-300
            group-hover:scale-105
          "
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="relative mt-6">
          <p className="font-display text-lg font-semibold leading-tight text-foreground">
            {category.name}
          </p>

          <div className="mt-3 h-[2px] w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-10" />

          <p className="mt-3 text-xs text-muted-foreground">
            {count} {count === 1 ? "board" : "boards"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}