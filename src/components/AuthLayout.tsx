import { ReactNode } from "react";
import { Logo } from "@/components/vault/Logo";

export function AuthLayout({
children,
title,
subtitle,
}: {
children: ReactNode;
title: string;
subtitle: string;
}) {
return ( <div className="relative min-h-screen overflow-hidden bg-[#faf7f2]">
{/* Background Glow */} <div className="absolute -left-32 -top-32 h-[450px] w-[450px] rounded-full bg-rose-300/20 blur-3xl" /> <div className="absolute -right-32 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-300/20 blur-3xl" /> <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/20 blur-3xl" />


  <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16">
    {/* LEFT SIDE */}
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-center pr-16">
      <Logo size="lg" />

      <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
        Welcome to MuseBoard
      </p>

      <h1 className="mt-4 text-5xl font-bold leading-tight text-foreground">
        Collect What Inspires You.
        <br />
        Build Beautiful Moodboards.
      </h1>

      <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
        Save fashion finds, dream spaces, travel ideas, art,
        photography and everything that inspires your next creation.
      </p>

      {/* Pinterest Masonry Preview */}
      <div className="mt-12 flex max-w-xl gap-4">
        {/* Column 1 */}
        <div className="flex w-1/3 flex-col gap-4">
          <div className="rounded-[28px] bg-white p-4 shadow-md">
            <div className="h-36 rounded-2xl bg-rose-100" />
            <p className="mt-3 text-sm font-medium">
              Paris Street Style ✨
            </p>
          </div>

          <div className="rounded-[28px] bg-[#fff4e8] p-5 shadow-md">
            <p className="text-sm font-medium">
              "Collect moments that inspire your next idea."
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-4 shadow-md">
            <div className="h-28 rounded-2xl bg-violet-100" />
            <p className="mt-3 text-sm font-medium">
              Creative Workspace
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex w-1/3 flex-col gap-4 pt-10">
          <div className="rounded-[28px] bg-white p-4 shadow-md">
            <div className="h-24 rounded-2xl bg-sky-100" />
            <p className="mt-3 text-sm font-medium">
              Travel Bucket List 🌎
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-4 shadow-md">
            <div className="h-44 rounded-2xl bg-pink-100" />
            <p className="mt-3 text-sm font-medium">
              Dream Bedroom
            </p>
          </div>

          <div className="rounded-[28px] bg-[#f3f0ff] p-5 shadow-md">
            <p className="text-sm font-medium">
              124 saved inspirations
            </p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex w-1/3 flex-col gap-4">
          <div className="rounded-[28px] bg-white p-4 shadow-md">
            <div className="h-32 rounded-2xl bg-emerald-100" />
            <p className="mt-3 text-sm font-medium">
              Cafe Aesthetic ☕
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-4 shadow-md">
            <div className="h-24 rounded-2xl bg-orange-100" />
            <p className="mt-3 text-sm font-medium">
              Photography Ideas
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-4 shadow-md">
            <div className="h-40 rounded-2xl bg-yellow-100" />
            <p className="mt-3 text-sm font-medium">
              Fashion Moodboard
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex w-full items-center justify-center lg:w-1/2">
      <div className="w-full max-w-md rounded-[32px] border border-black/5 bg-white/85 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>

        <div className="mb-6 flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>

        <h2 className="text-4xl font-bold text-foreground">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>

        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  </div>
</div>


);
}
