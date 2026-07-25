import { ReactNode } from "react";
import { Logo } from "@/components/vault/Logo";
import { motion } from "framer-motion";

const COLUMN_1 = [
  {
    type: "image",
    title: "Paris Street Style ✨",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    aspect: "aspect-[3/4]"
  },
  {
    type: "quote",
    text: "Collect moments that inspire your next idea.",
    author: "MUSEBOARD"
  },
  {
    type: "image",
    title: "Creative Workspace",
    category: "Design",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    aspect: "aspect-video"
  }
];

const COLUMN_2 = [
  {
    type: "image",
    title: "Travel Bucket List 🌎",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop",
    aspect: "aspect-square"
  },
  {
    type: "image",
    title: "Dream Bedroom",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&auto=format&fit=crop",
    aspect: "aspect-[4/5]"
  },
  {
    type: "stat",
    count: "124",
    label: "saved inspirations"
  }
];

const COLUMN_3 = [
  {
    type: "image",
    title: "Cafe Aesthetic ☕",
    category: "Aesthetic",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
    aspect: "aspect-[4/3]"
  },
  {
    type: "image",
    title: "Photography Ideas",
    category: "Art",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    aspect: "aspect-video"
  },
  {
    type: "image",
    title: "Fashion Moodboard",
    category: "Aesthetics",
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=600&auto=format&fit=crop",
    aspect: "aspect-[3/4]"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 16
    }
  }
};

function ImageCard({ item }: { item: typeof COLUMN_1[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.015 }}
      className="group relative overflow-hidden rounded-[24px] border border-black/5 bg-white p-2.5 shadow-soft transition-all duration-300 hover:shadow-lift"
    >
      <div className={`w-full overflow-hidden rounded-[18px] bg-muted/30 ${item.aspect}`}>
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="mt-2.5 px-1.5 pb-0.5 flex items-center justify-between">
        <p className="text-[12.5px] font-medium tracking-tight text-foreground/80">
          {item.title}
        </p>
        <span className="rounded-full bg-secondary/60 px-2.5 py-0.5 text-[9.5px] font-semibold tracking-wide text-foreground/50">
          {item.category}
        </span>
      </div>
    </motion.div>
  );
}

function QuoteCard({ item }: { item: typeof COLUMN_1[1] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.015 }}
      className="rounded-[24px] border border-amber-200/35 bg-[#fffcf8] p-6 shadow-soft hover:shadow-lift transition-all duration-300"
    >
      <span className="font-display text-3xl text-amber-500/50 leading-none">“</span>
      <p className="font-display -mt-3 text-[17px] italic leading-relaxed text-amber-950/80">
        {item.text}
      </p>
      <p className="mt-3.5 text-[9px] font-bold uppercase tracking-widest text-amber-600/70">
        {item.author}
      </p>
    </motion.div>
  );
}

function StatCard({ item }: { item: typeof COLUMN_2[2] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.015 }}
      className="rounded-[24px] border border-violet-100 bg-[#faf9ff] p-5 shadow-soft hover:shadow-lift transition-all duration-300"
    >
      <p className="font-display text-4xl font-semibold tracking-tight text-violet-950">
        {item.count}
      </p>
      <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-400">
        {item.label}
      </p>
    </motion.div>
  );
}

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf7f2]">
      {/* Background Glow Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 -top-32 h-[550px] w-[550px] rounded-full bg-rose-200/25 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -right-32 bottom-0 h-[550px] w-[550px] rounded-full bg-violet-200/25 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          x: [0, 20, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-amber-100/20 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12 lg:py-16">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center pr-12 xl:pr-16">
          <Logo size="lg" />

          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            Welcome to MuseBoard
          </p>

          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.15] text-foreground tracking-tight">
            Collect What Inspires You.
            <br />
            Build Beautiful Moodboards.
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground/90">
            Save fashion finds, dream spaces, travel ideas, art,
            photography and everything that inspires your next creation.
          </p>

          {/* Pinterest-style Masonry Preview */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-12 flex max-w-2xl gap-4 select-none"
          >
            {/* Column 1 */}
            <div className="flex w-1/3 flex-col gap-4">
              {COLUMN_1.map((item, idx) =>
                item.type === "image" ? (
                  <ImageCard key={idx} item={item as any} />
                ) : (
                  <QuoteCard key={idx} item={item as any} />
                )
              )}
            </div>

            {/* Column 2 */}
            <div className="flex w-1/3 flex-col gap-4 pt-10">
              {COLUMN_2.map((item, idx) =>
                item.type === "image" ? (
                  <ImageCard key={idx} item={item as any} />
                ) : (
                  <StatCard key={idx} item={item as any} />
                )
              )}
            </div>

            {/* Column 3 */}
            <div className="flex w-1/3 flex-col gap-4">
              {COLUMN_3.map((item, idx) => (
                <ImageCard key={idx} item={item as any} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="w-full max-w-md rounded-[32px] border border-black/5 bg-white/80 p-8 shadow-[0_20px_50px_rgba(43,43,43,0.04)] backdrop-blur-xl"
          >
            <div className="mb-8 lg:hidden">
              <Logo />
            </div>

            <div className="mb-6 flex gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-300" />
              <div className="h-2 w-2 rounded-full bg-amber-300" />
              <div className="h-2 w-2 rounded-full bg-emerald-300" />
            </div>

            <h2 className="font-display text-3xl font-semibold text-foreground tracking-tight leading-tight">
              {title}
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground/80">
              {subtitle}
            </p>

            <div className="mt-8">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
