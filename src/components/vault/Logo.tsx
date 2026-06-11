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
          " relative grid place-items-center rounded-2xl bg-gradient-to-br from-foreground to-foreground/80 text-background shadow-soft ring-1 ring-foreground/10 transition-transform group-hover:scale-[1.03]"
        }
      >
        <span className="font-display tracking-[-0.04em] leading-none">VV</span>
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
      </span>
      <span className={"font-display tracking-tight text-foreground " + wordCls}>
        VibeVault
      </span>
    </Link>
  );
}
