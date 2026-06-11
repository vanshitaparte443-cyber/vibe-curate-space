import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A quiet space for the collectors of beautiful things. Build mood boards
              that look like they belong in a magazine.
            </p>
          </div>
          <FooterCol title="Product" items={[
            { label: "Dashboard", to: "/" },
            { label: "My Boards", to: "/boards" },
            { label: "Favorites", to: "/favorites" },
            { label: "Explore", to: "/explore" },
          ]} />
          <FooterCol title="Categories" items={[
            { label: "Interior Design", to: "/explore" },
            { label: "Fashion", to: "/explore" },
            { label: "Travel", to: "/explore" },
            { label: "Branding", to: "/explore" },
          ]} />
          <FooterCol title="Company" items={[
            { label: "About", to: "/settings" },
            { label: "Contact", to: "/settings" },
            { label: "Privacy", to: "/settings" },
            { label: "Terms", to: "/settings" },
          ]} />
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} VibeVault. Designed with care.</p>
          <p className="italic">For the quiet collectors of beautiful things.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              to={i.to}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
