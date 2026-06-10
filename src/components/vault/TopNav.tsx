import { Link } from "@tanstack/react-router";
import { Search, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

export function TopNav({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 glass"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-5 sm:gap-6 sm:px-8">
        <Link to="/" className="group flex shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-primary-foreground shadow-soft">
            <span className="font-display text-base leading-none">V</span>
          </span>
          <span className="font-display text-xl tracking-tight">VibeVault</span>
        </Link>

        {!compact && (
          <div className="relative ml-auto hidden flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search boards, palettes, inspiration…"
              className="h-10 w-full rounded-full border border-border/60 bg-card/60 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/15"
            />
          </div>
        )}

        <div className={"flex items-center gap-2 " + (compact ? "ml-auto" : "")}>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/60 text-foreground transition hover:bg-card hover:shadow-soft"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div
            aria-label="Account"
            className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary/80 to-secondary font-display text-sm text-primary-foreground shadow-soft"
          >
            A
          </div>
        </div>
      </div>
    </motion.header>
  );
}