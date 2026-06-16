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
  // Refined geometric MB monogram — M and B share a baseline and stem
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-[58%] w-[58%]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* M */}
      <path d="M4 24 V8 L10.5 17 L17 8 V24" />
      {/* B stem + bowls */}
      <path d="M20 8 V24" />
      <path d="M20 8 H24 A4 4 0 0 1 24 16 H20" />
      <path d="M20 16 H25 A4 4 0 0 1 25 24 H20" />
    </svg>
  );
}
