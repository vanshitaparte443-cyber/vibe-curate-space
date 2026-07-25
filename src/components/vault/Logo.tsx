import { Link } from "@tanstack/react-router";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "sm" ? "h-8 w-8 text-base" : size === "lg" ? "h-12 w-12 text-2xl" : "h-9 w-9 text-lg";
  const wordCls = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";
  return (
    <Link to="/" className="group flex shrink-0 items-center gap-2.5">
      <span
        aria-hidden
        className={
          dims +
          " relative grid place-items-center rounded-[0.9rem] text-[color:var(--logo-ink)] shadow-soft ring-1 ring-[color:var(--logo-ring)] transition-transform group-hover:scale-[1.03]"
        }
        style={{
          background:
            "linear-gradient(140deg, var(--logo-bg-start) 0%, var(--logo-bg-mid) 55%, var(--logo-bg-end) 100%)",
        }}
      >
        <MBMark />
        <span
          className="pointer-events-none absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full ring-2 ring-background"
          style={{ background: "var(--logo-accent)" }}
        />
      </span>
      <span className={"font-display tracking-tight text-foreground " + wordCls}>
        MuseBoard
      </span>
    </Link>
  );
}

function MBMark() {
  // Concept 1: The Curated Frame — An elegant serif M inside an arched gallery frame
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-[62%] w-[62%]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Arched Gallery Frame */}
      <path d="M6 26V12C6 8.68 8.68 6 12 6H20C23.32 6 26 8.68 26 12V26" strokeWidth={1.6} />
      
      {/* Serif M Monogram */}
      {/* Left stem and serif */}
      <path d="M10 22h3" strokeWidth={1.6} />
      <path d="M11.5 22V12.5" strokeWidth={2.2} />
      
      {/* Right stem and serif */}
      <path d="M19 22h3" strokeWidth={1.6} />
      <path d="M20.5 22V12.5" strokeWidth={2.2} />
      
      {/* Middle diagonal V connector */}
      <path d="M11.5 12.5L16 18.5L20.5 12.5" strokeWidth={2.0} />
    </svg>
  );
}
