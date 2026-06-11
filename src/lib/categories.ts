import { Shirt, Home, BookOpen, Plane, Sparkles, Camera, Palette, Building2, UtensilsCrossed, Dumbbell, ListChecks, Heart, MonitorSmartphone, PenTool, Briefcase, Compass, Telescope, Hash, Clapperboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Category = {
  name: string;
  // tags or keywords that match boards to this category (case-insensitive)
  match: string[];
  Icon: LucideIcon;
  hue: string; // soft tint background
};

export const CATEGORIES: Category[] = [
  { name: "Fashion", match: ["fashion", "editorial", "linen", "luxury"], Icon: Shirt, hue: "from-rose-100 to-amber-100" },
  { name: "Interior Design", match: ["interior", "minimal", "neutral", "cozy", "scandi"], Icon: Home, hue: "from-amber-100 to-orange-100" },
  { name: "Study", match: ["study", "desk", "stationery", "cozy"], Icon: BookOpen, hue: "from-yellow-100 to-amber-100" },
  { name: "Travel", match: ["travel", "wanderlust", "europe", "coast", "summer"], Icon: Plane, hue: "from-sky-100 to-indigo-100" },
  { name: "Branding", match: ["branding", "identity", "type"], Icon: Sparkles, hue: "from-stone-100 to-amber-100" },
  { name: "Photography", match: ["photography", "editorial"], Icon: Camera, hue: "from-slate-100 to-stone-100" },
  { name: "Art", match: ["art"], Icon: Palette, hue: "from-pink-100 to-rose-100" },
  { name: "Architecture", match: ["architecture"], Icon: Building2, hue: "from-stone-100 to-zinc-100" },
  { name: "Food", match: ["food", "café", "cafe", "coffee"], Icon: UtensilsCrossed, hue: "from-orange-100 to-red-100" },
  { name: "Fitness", match: ["fitness"], Icon: Dumbbell, hue: "from-emerald-100 to-teal-100" },
  { name: "Productivity", match: ["productivity", "workspace"], Icon: ListChecks, hue: "from-blue-100 to-sky-100" },
  { name: "Personal Growth", match: ["personal growth", "mindset", "self"], Icon: Heart, hue: "from-rose-100 to-pink-100" },
  { name: "UI/UX Design", match: ["ui", "ux", "product design"], Icon: MonitorSmartphone, hue: "from-violet-100 to-fuchsia-100" },
  { name: "Graphic Design", match: ["graphic design", "design"], Icon: PenTool, hue: "from-fuchsia-100 to-purple-100" },
  { name: "Business", match: ["business"], Icon: Briefcase, hue: "from-zinc-100 to-stone-100" },
  { name: "Career", match: ["career"], Icon: Compass, hue: "from-teal-100 to-cyan-100" },
  { name: "Vision Boards", match: ["vision boards", "vision", "intentions"], Icon: Telescope, hue: "from-amber-100 to-rose-100" },
  { name: "Social Media", match: ["social media"], Icon: Hash, hue: "from-pink-100 to-fuchsia-100" },
  { name: "Content Creation", match: ["content creation", "creator"], Icon: Clapperboard, hue: "from-indigo-100 to-violet-100" },
];

export function matchesCategory(category: string, tags: string[]): boolean {
  const c = CATEGORIES.find((x) => x.name === category);
  if (!c) return tags.some((t) => t.toLowerCase().includes(category.toLowerCase()));
  const tagsLc = tags.map((t) => t.toLowerCase());
  return c.match.some((m) => tagsLc.some((t) => t.includes(m)));
}
