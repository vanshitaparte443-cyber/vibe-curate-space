import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, FolderHeart, Sparkles, Sun, Moon, LogIn } from "lucide-react";
import { AppShell } from "@/components/vault/AppShell";
import { Footer } from "@/components/vault/Footer";
import { CreateBoardModal } from "@/components/vault/CreateBoardModal";
import { getMergedBoards, useVault } from "@/lib/vault-store";
import { boards as seedBoards } from "@/lib/boards-data";
import { useTheme } from "@/lib/theme";
import { useAuthStore } from "@/lib/auth-store";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — MuseBoard" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const vault = useVault();
  const { theme, toggle } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const all = getMergedBoards();
  const seedIds = useMemo(() => new Set(seedBoards.map((b) => b.id)), []);

  const myCount = all.filter((b) => !seedIds.has(b.id)).length;
  const favCount = vault.favorites.length;

  const { user } = useAuthStore();

  const email = user?.email ?? "Guest";
  const initial = email.charAt(0).toUpperCase();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AppShell onCreate={() => setModalOpen(true)}>
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Profile
        </p>

        <h1 className="mt-1 font-display text-3xl text-foreground sm:text-4xl">
          Settings
        </h1>

        {/* PROFILE CARD */}
        <div className="mt-8 glass rounded-3xl p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-center gap-5">

            {/* Avatar */}
            <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary/80 to-secondary font-display text-3xl text-primary-foreground shadow-soft">
              {initial}
            </div>

            {/* User info */}
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl text-foreground">
                {email}
              </h2>

              <p className="text-sm text-muted-foreground">
                {user ? "Signed in" : "Guest mode"}
              </p>
            </div>

            {/* AUTH BUTTON (ONLY ONE) */}
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/20"
              >
                Logout
              </button>
             ) : (
              <button
                onClick={handleLogin}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-card"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </button>
            )}
          </div>

          {/* STATS */}
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat Icon={FolderHeart} label="My Boards" value={myCount} />
            <Stat Icon={Heart} label="Favorites" value={favCount} />
            <Stat Icon={Sparkles} label="Inspiration" value={seedBoards.length} />
          </div>
        </div>

        {/* APPEARANCE */}
        <div className="mt-6 glass rounded-3xl p-6 shadow-soft sm:p-8">
          <h3 className="font-display text-xl text-foreground">Appearance</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Switch between light and dark mode.
          </p>

          <button
            onClick={toggle}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-card"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            {theme === "dark" ? "Switch to light" : "Switch to dark"}
          </button>
        </div>

        {/* ABOUT */}
        <div className="mt-6 glass rounded-3xl p-6 shadow-soft sm:p-8">
          <h3 className="font-display text-xl text-foreground">
            About MuseBoard
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            MuseBoard is a quiet space for the collectors of beautiful things.
            Build mood boards for fashion, interiors, study, travel, branding,
            and everything in between. Designed to feel like a magazine,
            organized like an app.
          </p>
        </div>
      </section>

      <Footer />

      <CreateBoardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </AppShell>
  );
}

/* STATS COMPONENT */
function Stat({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>
      <p className="mt-2 font-display text-3xl text-foreground">
        {value}
      </p>
    </div>
  );
}