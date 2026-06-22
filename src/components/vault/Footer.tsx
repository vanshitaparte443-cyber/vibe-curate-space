import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { ArrowRight, Github, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/60 bg-card/40">
      {/* Background Glow */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* CTA SECTION */}

        <div className="border-b border-border/50 py-20 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Start Creating
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Ready to organize your inspiration?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Build beautiful boards, collect ideas effortlessly, and transform
            scattered inspiration into something worth revisiting.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-lg transition-all hover:-translate-y-0.5"
          >
            Create Your Next Board
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* MAIN FOOTER */}

        <div className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}

          <div className="space-y-5">
            <Logo />

            <div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Collect. Curate. Create.
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Turn scattered inspiration into beautiful boards. A creative
                workspace designed for dreamers, designers and collectors.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <SocialIcon>
                <Twitter className="h-4 w-4" />
              </SocialIcon>

              <SocialIcon>
                <Instagram className="h-4 w-4" />
              </SocialIcon>

              <SocialIcon>
                <Github className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <FooterCol
            title="Product"
            items={[
              { label: "Dashboard", to: "/" },
              { label: "My Boards", to: "/boards" },
              { label: "Favorites", to: "/favorites" },
              { label: "Explore", to: "/explore" },
            ]}
          />

          <FooterCol
            title="Categories"
            items={[
              { label: "Interior Design", to: "/explore" },
              { label: "Fashion", to: "/explore" },
              { label: "Travel", to: "/explore" },
              { label: "Branding", to: "/explore" },
            ]}
          />

          <FooterCol
            title="Company"
            items={[
              { label: "About", to: "/settings" },
              { label: "Contact", to: "/settings" },
              { label: "Privacy", to: "/settings" },
              { label: "Terms", to: "/settings" },
            ]}
          />
        </div>

        {/* BOTTOM BAR */}

        <div className="flex flex-col gap-3 border-t border-border/50 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} MuseBoard. All rights reserved.
          </p>

          <p className="italic">
            Built for dreamers, designers and collectors.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: {
    label: string;
    to: string;
  }[];
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground">
        {title}
      </p>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className="group inline-flex items-center text-sm text-muted-foreground transition hover:text-foreground"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground transition-all hover:-translate-y-1 hover:text-foreground">
      {children}
    </button>
  );
}