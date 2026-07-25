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

function ImageCard({ item, index }: { item: typeof COLUMN_1[0]; index: number }) {
  // Scattered rotation values
  const rotations = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5, -2, 2.5];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.03, rotate: rotation * 0.4 }}
      style={{ rotate: `${rotation}deg` }}
      className="group relative overflow-hidden rounded-[4px] border border-stone-200/50 bg-[#faf8f5] p-3 shadow-[0_8px_20px_-6px_rgba(43,34,22,0.12)] transition-shadow duration-300 hover:shadow-[0_20px_35px_-8px_rgba(43,34,22,0.18)]"
    >
      {/* Washi Tape Accent */}
      <div 
        className="absolute -top-1.5 left-1/2 h-3.5 w-12 -translate-x-1/2 bg-amber-100/35 border-x border-dashed border-amber-950/5 backdrop-blur-[0.5px] rotate-[-1deg]" 
        style={{ mixBlendMode: "multiply" }}
      />

      <div className={`w-full overflow-hidden border border-stone-100 bg-muted/30 ${item.aspect}`}>
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      
      <div className="mt-3 pb-0.5 text-center">
        <p className="font-display text-[13px] italic tracking-wide text-stone-700 leading-snug">
          {item.title}
        </p>
        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-primary/70">
          {item.category}
        </p>
      </div>
    </motion.div>
  );
}

function QuoteCard({ item, index }: { item: typeof COLUMN_1[1]; index: number }) {
  const rotations = [1.5, -2, 1.2, -1.5];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.03, rotate: rotation * 0.4 }}
      style={{ rotate: `${rotation}deg` }}
      className="group relative rounded-[4px] border border-amber-200/30 bg-[#fffdfa] p-6 shadow-[0_8px_20px_-6px_rgba(43,34,22,0.1)] hover:shadow-[0_20px_35px_-8px_rgba(43,34,22,0.15)] transition-all duration-300"
    >
      {/* Washi Tape Accent */}
      <div 
        className="absolute -top-1.5 left-1/2 h-3.5 w-12 -translate-x-1/2 bg-amber-100/35 border-x border-dashed border-amber-950/5 backdrop-blur-[0.5px] rotate-[2deg]" 
        style={{ mixBlendMode: "multiply" }}
      />

      <span className="font-display text-3xl text-amber-500/50 leading-none">“</span>
      <p className="font-display -mt-3 text-[16px] italic leading-relaxed text-amber-950/80">
        {item.text}
      </p>
      <p className="mt-3 text-[9px] font-bold uppercase tracking-widest text-amber-600/70">
        {item.author}
      </p>
    </motion.div>
  );
}

function StatCard({ item, index }: { item: typeof COLUMN_2[2]; index: number }) {
  const rotations = [-1.5, 1.5, -1, 1.2];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.03, rotate: rotation * 0.4 }}
      style={{ rotate: `${rotation}deg` }}
      className="group relative rounded-[4px] border border-violet-100 bg-[#faf9ff] p-5 shadow-[0_8px_20px_-6px_rgba(43,34,22,0.08)] hover:shadow-[0_20px_35px_-8px_rgba(43,34,22,0.12)] transition-all duration-300"
    >
      {/* Washi Tape Accent */}
      <div 
        className="absolute -top-1.5 left-1/2 h-3.5 w-12 -translate-x-1/2 bg-violet-100/35 border-x border-dashed border-violet-950/5 backdrop-blur-[0.5px] rotate-[-2deg]" 
        style={{ mixBlendMode: "multiply" }}
      />

      <p className="font-display text-4xl font-semibold tracking-tight text-violet-950">
        {item.count}
      </p>
      <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-violet-400">
        {item.label}
      </p>
    </motion.div>
  );
}

function LeafShadow() {
  return (
    <motion.div
      animate={{
        x: [0, 6, -3, 0],
        y: [0, -5, 5, 0],
        rotate: [0, 0.8, -0.8, 0],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[45%] opacity-[0.05] mix-blend-multiply"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full fill-stone-900 blur-[2px]">
        {/* Main Branch */}
        <path d="M100 0 C80 15, 60 20, 40 10 C35 8, 30 15, 25 12 C15 7, 10 5, 0 0" />
        
        {/* Leaf details */}
        <path d="M85 5 C88 -2, 92 -4, 90 -10 C85 -5, 80 0, 85 5" />
        <path d="M72 9 C78 12, 82 8, 80 2 C74 0, 70 4, 72 9" />
        <path d="M60 14 C65 20, 72 18, 70 11 C65 8, 58 10, 60 14" />
        <path d="M50 12 C48 4, 42 2, 44 10 C46 16, 52 18, 50 12" />
        <path d="M38 12 C35 18, 28 20, 30 13 C32 8, 36 8, 38 12" />
        <path d="M28 11 C24 5, 18 8, 22 14 C26 18, 30 15, 28 11" />
        
        {/* Secondary branch details */}
        <path d="M70 12 C60 25, 45 35, 30 40" />
        <path d="M58 20 C62 26, 60 32, 54 28 C48 24, 52 18, 58 20" />
        <path d="M48 25 C42 32, 38 28, 42 22 C46 18, 50 20, 48 25" />
        <path d="M36 31 C32 38, 28 34, 32 28 C36 24, 40 26, 36 31" />
      </svg>
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
      {/* Tactile Dotted Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(43, 34, 22, 0.12) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating Background Glow Blobs */}
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
        className="absolute -left-32 -top-32 h-[550px] w-[550px] rounded-full bg-rose-200/25 blur-3xl pointer-events-none z-0"
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
        className="absolute -right-32 bottom-0 h-[550px] w-[550px] rounded-full bg-violet-200/25 blur-3xl pointer-events-none z-0"
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
        className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-amber-100/20 blur-3xl pointer-events-none z-0"
      />

      {/* Cinematic Sunlit Leaf Shadow */}
      <LeafShadow />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12 lg:py-16 z-10">
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
                  <ImageCard key={idx} item={item} index={idx} />
                ) : (
                  <QuoteCard key={idx} item={item} index={idx} />
                )
              )}
            </div>

            {/* Column 2 */}
            <div className="flex w-1/3 flex-col gap-4 pt-10">
              {COLUMN_2.map((item, idx) =>
                item.type === "image" ? (
                  <ImageCard key={idx} item={item} index={idx} />
                ) : (
                  <StatCard key={idx} item={item} index={idx} />
                )
              )}
            </div>

            {/* Column 3 */}
            <div className="flex w-1/3 flex-col gap-4">
              {COLUMN_3.map((item, idx) => (
                <ImageCard key={idx} item={item} index={idx} />
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
