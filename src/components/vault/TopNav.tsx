import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Moon, Sun, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { useAuthStore } from "@/lib/auth-store";

export function TopNav({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate({ to: "/login" });
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 glass"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-5 sm:gap-6 sm:px-8">

        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-primary-foreground shadow-soft">
            <span className="font-display text-base">V</span>
          </span>

          <span className="font-display text-xl tracking-tight">
            MuseBoard
          </span>
        </Link>

        {/* Search */}
        {!compact && (
          <div className="relative ml-auto hidden flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              placeholder="Search boards, palettes, inspiration…"
              className="h-10 w-full rounded-full border border-border/60 bg-card/60 pl-10 pr-4 text-sm outline-none transition"
            />
          </div>
        )}

        {/* Right Side */}
        <div
          className={
            "flex items-center gap-2 " + (compact ? "ml-auto" : "")
          }
        >
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/60 hover:bg-card"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Logged In User */}
          {user ? (
            <div className="flex items-center gap-2">

              {/* Avatar */}
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground text-sm font-bold shadow-soft">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* Email */}
              <span className="hidden text-xs text-muted-foreground md:block">
                {user.email}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card/60 hover:bg-card"
              >
                <LogOut className="h-4 w-4" />
              </button>

            </div>
          ) : (
            <Link
              to="/signup"
              className="rounded-full bg-primary px-4 py-2 text-xs text-white"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}