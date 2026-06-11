import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  FolderHeart,
  Heart,
  Clock,
  Compass,
  Settings,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "@/lib/theme";
import { getMergedBoards, useVault } from "@/lib/vault-store";

const NAV = [
  { to: "/", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/boards", label: "My Boards", Icon: FolderHeart },
  { to: "/favorites", label: "Favorites", Icon: Heart },
  { to: "/recent", label: "Recent", Icon: Clock },
  { to: "/explore", label: "Explore", Icon: Compass },
  { to: "/settings", label: "Settings", Icon: Settings },
] as const;

export function AppShell({
  children,
  onCreate,
  searchValue,
  onSearchChange,
}: {
  children: ReactNode;
  onCreate?: () => void;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
}) {
  useVault();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border/60 bg-card/40 backdrop-blur lg:flex lg:flex-col">
          <SidebarBody onCreate={onCreate} pathname={pathname} />
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                key="ov"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
              />
              <motion.aside
                key="dr"
                initial={{ x: -280, opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -280, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border/60 bg-card lg:hidden"
              >
                <SidebarBody onCreate={onCreate} pathname={pathname} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            onMenu={() => setMobileOpen(true)}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
          />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

function SidebarBody({
  onCreate,
  pathname,
}: {
  onCreate?: () => void;
  pathname: string;
}) {
  const boards = getMergedBoards();
  // user boards = those NOT in the seed list; cheap heuristic: getMergedBoards returns userBoards first
  // We'll count "My Boards" via a separate import to keep simple
  // (Real counts shown elsewhere)
  return (
    <div className="flex h-full flex-col p-5">
      <div className="px-1.5">
        <Logo />
      </div>

      <button
        onClick={onCreate}
        className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-foreground text-sm font-medium text-background shadow-soft transition hover:bg-foreground/90"
      >
        <Plus className="h-4 w-4" /> New Board
      </button>

      <nav className="mt-7 flex-1 space-y-0.5">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Workspace
        </p>
        {NAV.map(({ to, label, Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition " +
                (active
                  ? "bg-foreground text-background shadow-soft"
                  : "text-muted-foreground hover:bg-card hover:text-foreground")
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <ProfileCard count={boards.length} />
    </div>
  );
}

function ProfileCard({ count }: { count: number }) {
  return (
    <Link
      to="/settings"
      className="glass mt-6 flex items-center gap-3 rounded-2xl p-3 transition hover:shadow-soft"
    >
      <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary/80 to-secondary font-display text-sm text-primary-foreground shadow-soft">
        A
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">Anonymous Curator</p>
        <p className="truncate text-[11px] text-muted-foreground">{count} boards · sign in soon</p>
      </div>
    </Link>
  );
}

function Topbar({
  onMenu,
  searchValue,
  onSearchChange,
}: {
  onMenu: () => void;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
}) {
  const { theme, toggle } = useTheme();
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl"
    >
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onMenu}
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/60 text-foreground lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="lg:hidden">
          <Logo size="sm" />
        </div>

        <div className="relative ml-auto hidden flex-1 max-w-md sm:block lg:ml-0">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchValue ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search boards, tags, notes…"
            className="h-10 w-full rounded-full border border-border/60 bg-card/60 pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/60 focus:bg-card focus:ring-4 focus:ring-primary/15"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:ml-3">
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

// Re-export for icon usage in pages
export { X };
