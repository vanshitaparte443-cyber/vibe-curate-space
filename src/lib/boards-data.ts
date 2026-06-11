export type BoardCardContent =
  | { id?: string; type: "image"; src: string; caption?: string; alt: string; height: number }
  | { id?: string; type: "quote"; text: string; author?: string }
  | {
      id?: string;
      type: "note";
      title: string;
      body: string;
      font?: "serif" | "sans" | "script";
      bg?: "cream" | "beige" | "blush" | "white";
    }
  | {
      id?: string;
      type: "link";
      url: string;
      title?: string;
      description?: string;
      thumbnail?: string;
    };

export type Board = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  itemCount: number;
  lastEdited: string;
  palette: string[];
  covers: string[]; // 4 image URLs for collage
  items: BoardCardContent[];
};

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const boards: Board[] = [
  {
    id: "minimalist-interior",
    title: "Minimalist Interior Design",
    description: "Quiet rooms, natural light, and considered objects. A study in restraint.",
    tags: ["Interior", "Minimal", "Neutral", "Architecture"],
    itemCount: 42,
    lastEdited: "Edited 2 hours ago",
    palette: ["#EFE9E1", "#D8B4A0", "#A38872", "#5C4A3C", "#1F1B17"],
    covers: [
      u("1505691938895-1758d7feb511"),
      u("1554995207-c18c203602cb"),
      u("1493809842364-78817add7ffb"),
      u("1616486338812-3dadae4b4ace"),
    ],
    items: [
      { type: "image", src: u("1505691938895-1758d7feb511", 900), alt: "Sunlit minimalist living room", caption: "Morning light, slow living", height: 520 },
      { type: "quote", text: "Have nothing in your house that you do not know to be useful, or believe to be beautiful." , author: "William Morris" },
      { type: "image", src: u("1493809842364-78817add7ffb", 900), alt: "Wabi-sabi kitchen detail", caption: "Wabi-sabi kitchen", height: 700 },
      { type: "image", src: u("1616486338812-3dadae4b4ace", 900), alt: "Bedroom in cream tones", height: 450 },
      { type: "note", title: "Palette Notes", body: "Bone, oat, soft clay, walnut. Layer textures over color. Linen, oak, travertine, brushed brass." },
      { type: "image", src: u("1600585154340-be6161a56a0c", 900), alt: "Modern arched doorway", height: 620 },
      { type: "image", src: u("1586023492125-27b2c045efd7", 900), alt: "Reading nook with chair", caption: "A chair, a lamp, a book", height: 540 },
      { type: "image", src: u("1567016432779-094069958ea5", 900), alt: "Ceramic vase still life", height: 480 },
    ],
  },
  {
    id: "summer-editorial-fashion",
    title: "Summer Editorial Fashion",
    description: "Linen, sun-bleached pastels, and Mediterranean ease. A holiday in fabric.",
    tags: ["Fashion", "Editorial", "Summer", "Linen"],
    itemCount: 56,
    lastEdited: "Edited yesterday",
    palette: ["#F6E9D7", "#E7B89C", "#C97B63", "#8C5A3C", "#2B2B2B"],
    covers: [
      u("1490481651871-ab68de25d43d"),
      u("1469334031218-e382a71b716b"),
      u("1483985988355-763728e1935b"),
      u("1485518882345-15568b007407"),
    ],
    items: [
      { type: "image", src: u("1490481651871-ab68de25d43d", 900), alt: "Editorial portrait", caption: "Vogue Italia, June", height: 700 },
      { type: "image", src: u("1469334031218-e382a71b716b", 900), alt: "Linen ensemble", height: 520 },
      { type: "quote", text: "Elegance is refusal.", author: "Coco Chanel" },
      { type: "image", src: u("1483985988355-763728e1935b", 900), alt: "Beach editorial", height: 600 },
      { type: "image", src: u("1485518882345-15568b007407", 900), alt: "Sun-washed runway", height: 460 },
      { type: "note", title: "Mood", body: "Saint-Tropez ’74. Slip dresses, espadrilles, salt in the hair." },
      { type: "image", src: u("1496747611176-843222e1e57c", 900), alt: "Resortwear flatlay", height: 540 },
      { type: "image", src: u("1539109136881-3be0616acf4b", 900), alt: "Sun hat profile", height: 620 },
    ],
  },
  {
    id: "dream-study-setup",
    title: "Dream Study Setup",
    description: "Soft mornings, warm lamps, and stacks of books. Romanticizing the work.",
    tags: ["Study", "Desk", "Stationery", "Cozy"],
    itemCount: 38,
    lastEdited: "Edited 3 days ago",
    palette: ["#FAF3E7", "#E7DCCF", "#D8B4A0", "#8B6B55", "#3A2E25"],
    covers: [
      u("1497032628192-86f99bcd76bc"),
      u("1456513080510-7bf3a84b82f8"),
      u("1519682337058-a94d519337bc"),
      u("1481627834876-b7833e8f5570"),
    ],
    items: [
      { type: "image", src: u("1497032628192-86f99bcd76bc", 900), alt: "Warm desk with notebook", caption: "Sunday afternoon", height: 600 },
      { type: "note", title: "Today's intention", body: "Two hours of deep work. Phone in the drawer. One pot of jasmine tea." },
      { type: "image", src: u("1456513080510-7bf3a84b82f8", 900), alt: "Open journal and pen", height: 460 },
      { type: "image", src: u("1519682337058-a94d519337bc", 900), alt: "Books stacked by window", height: 720 },
      { type: "quote", text: "Discipline is the highest form of self-love." },
      { type: "image", src: u("1481627834876-b7833e8f5570", 900), alt: "Library aisle", height: 540 },
      { type: "image", src: u("1513475382585-d06e58bcb0e0", 900), alt: "Cozy reading corner", height: 500 },
    ],
  },
  {
    id: "cafe-aesthetic",
    title: "Cafe Aesthetic",
    description: "Steam curling above ceramic cups. Wood, brass, and the comfort of regulars.",
    tags: ["Cafe", "Coffee", "Cozy", "Branding"],
    itemCount: 29,
    lastEdited: "Edited last week",
    palette: ["#F0E6D6", "#D8B4A0", "#A0785C", "#5C3E2A", "#1B1208"],
    covers: [
      u("1453614512568-c4024d13c247"),
      u("1495474472287-4d71bcdd2085"),
      u("1442975631115-c4f7b05b8a2c"),
      u("1509042239860-f550ce710b93"),
    ],
    items: [
      { type: "image", src: u("1453614512568-c4024d13c247", 900), alt: "Latte in ceramic cup", caption: "Single origin, slow pour", height: 560 },
      { type: "image", src: u("1495474472287-4d71bcdd2085", 900), alt: "Cafe counter morning light", height: 620 },
      { type: "quote", text: "A cup of coffee shared with a friend is happiness tasted and time well spent." },
      { type: "image", src: u("1442975631115-c4f7b05b8a2c", 900), alt: "Pastry on marble", height: 480 },
      { type: "image", src: u("1509042239860-f550ce710b93", 900), alt: "Barista pouring", height: 700 },
      { type: "note", title: "Brand notes", body: "Warm off-white walls. Hand-thrown ceramics. Type set in a quiet serif." },
      { type: "image", src: u("1559925393-8be0ec4767c8", 900), alt: "Cafe window scene", height: 520 },
    ],
  },
  {
    id: "travel-vision",
    title: "Travel Vision Board",
    description: "Salt air, cobblestone, terracotta rooftops. Places that change you.",
    tags: ["Travel", "Wanderlust", "Europe", "Coast"],
    itemCount: 64,
    lastEdited: "Edited 5 hours ago",
    palette: ["#E8DCCB", "#D8B4A0", "#B07A5A", "#6B8E9F", "#1F2A33"],
    covers: [
      u("1500530855697-b586d89ba3ee"),
      u("1502602898657-3e91760cbb34"),
      u("1467269204594-9661b134dd2b"),
      u("1488646953014-85cb44e25828"),
    ],
    items: [
      { type: "image", src: u("1500530855697-b586d89ba3ee", 900), alt: "Coastal cliffs", caption: "Amalfi, golden hour", height: 640 },
      { type: "image", src: u("1502602898657-3e91760cbb34", 900), alt: "Paris rooftops", height: 500 },
      { type: "quote", text: "We travel not to escape life, but for life not to escape us." },
      { type: "image", src: u("1467269204594-9661b134dd2b", 900), alt: "Italian coast", height: 720 },
      { type: "image", src: u("1488646953014-85cb44e25828", 900), alt: "Quiet alley", height: 480 },
      { type: "note", title: "Itinerary", body: "Lisbon → Sintra → Comporta. Two weeks. One small suitcase." },
      { type: "image", src: u("1504609813442-a8924e83f76e", 900), alt: "Train window vista", height: 540 },
      { type: "image", src: u("1528127269322-539801943592", 900), alt: "Greek island doors", height: 600 },
    ],
  },
  {
    id: "personal-brand",
    title: "Personal Brand Moodboard",
    description: "Editorial calm with a quiet confidence. Typography-led, image-supported.",
    tags: ["Branding", "Editorial", "Identity", "Type"],
    itemCount: 47,
    lastEdited: "Edited 30 minutes ago",
    palette: ["#FAF7F2", "#E7DCCF", "#D8B4A0", "#7A7A7A", "#2B2B2B"],
    covers: [
      u("1561070791-2526d30994b8"),
      u("1494438639946-1ebd1d20bf85"),
      u("1517816743773-6e0fd518b4a6"),
      u("1542038784456-1ea8e935640e"),
    ],
    items: [
      { type: "image", src: u("1561070791-2526d30994b8", 900), alt: "Type specimen page", caption: "Display type, draft 03", height: 540 },
      { type: "quote", text: "Design is the silent ambassador of your brand.", author: "Paul Rand" },
      { type: "image", src: u("1494438639946-1ebd1d20bf85", 900), alt: "Stationery flatlay", height: 600 },
      { type: "image", src: u("1517816743773-6e0fd518b4a6", 900), alt: "Editorial spread", height: 700 },
      { type: "note", title: "Voice", body: "Warm. Considered. Never loud. Speak less, mean more." },
      { type: "image", src: u("1542038784456-1ea8e935640e", 900), alt: "Logo mark mockup", height: 480 },
      { type: "image", src: u("1583912267550-aae1648b5d7b", 900), alt: "Business card on linen", height: 520 },
      { type: "image", src: u("1611162616475-46b635cb6868", 900), alt: "Print sample close up", height: 560 },
    ],
  },
  {
    id: "scandinavian-living",
    title: "Scandinavian Living",
    description: "Pale oak floors, ivory linen, and the soft hush of a Nordic winter morning.",
    tags: ["Interior Design", "Scandi", "Minimal", "Cozy"],
    itemCount: 34,
    lastEdited: "Edited 4 hours ago",
    palette: ["#F4EFE8", "#E2D6C5", "#C9B7A2", "#8C7A66", "#2A2620"],
    covers: [
      u("1505691938895-1758d7feb511"),
      u("1493663284031-b7e3aefcae8e"),
      u("1501045661006-fcebe0257c3f"),
      u("1556909114-f6e7ad7d3136"),
    ],
    items: [
      { type: "image", src: u("1505691938895-1758d7feb511", 900), alt: "Nordic interior", caption: "Stockholm apartment", height: 620 },
      { type: "quote", text: "Lagom — not too much, not too little." },
      { type: "image", src: u("1556909114-f6e7ad7d3136", 900), alt: "Linen bedroom", height: 540 },
      { type: "note", title: "Materials", body: "Pale oak, bouclé, raw linen, brushed steel, ceramic.", bg: "cream", font: "serif" },
      { type: "image", src: u("1493663284031-b7e3aefcae8e", 900), alt: "Open shelving", height: 700 },
    ],
  },
  {
    id: "quiet-luxury-fashion",
    title: "Quiet Luxury Fashion",
    description: "Cashmere, camel, and the quiet confidence of clothes that whisper.",
    tags: ["Fashion", "Editorial", "Minimal", "Luxury"],
    itemCount: 51,
    lastEdited: "Edited 2 days ago",
    palette: ["#F2EBE0", "#D9C7B0", "#A88C70", "#5C4A38", "#1B1714"],
    covers: [
      u("1490481651871-ab68de25d43d"),
      u("1539109136881-3be0616acf4b"),
      u("1485518882345-15568b007407"),
      u("1483985988355-763728e1935b"),
    ],
    items: [
      { type: "image", src: u("1490481651871-ab68de25d43d", 900), alt: "Camel coat editorial", caption: "The Row, FW", height: 680 },
      { type: "quote", text: "Luxury must be comfortable, otherwise it is not luxury.", author: "Coco Chanel" },
      { type: "image", src: u("1539109136881-3be0616acf4b", 900), alt: "Soft profile", height: 540 },
      { type: "note", title: "Tones", body: "Bone, oat, camel, espresso. Never logos.", bg: "beige", font: "serif" },
      { type: "image", src: u("1485518882345-15568b007407", 900), alt: "Slip dress", height: 600 },
    ],
  },
  {
    id: "european-summer",
    title: "European Summer",
    description: "Lemon groves, linen shirts, and afternoons that stretch into golden hours.",
    tags: ["Travel", "Summer", "Europe", "Coast"],
    itemCount: 48,
    lastEdited: "Edited 6 hours ago",
    palette: ["#FFF6E5", "#F2D8A0", "#E1A36B", "#6A8DAA", "#243447"],
    covers: [
      u("1500530855697-b586d89ba3ee"),
      u("1528127269322-539801943592"),
      u("1502602898657-3e91760cbb34"),
      u("1467269204594-9661b134dd2b"),
    ],
    items: [
      { type: "image", src: u("1500530855697-b586d89ba3ee", 900), alt: "Amalfi cliffs", height: 700 },
      { type: "image", src: u("1528127269322-539801943592", 900), alt: "Greek doors", height: 540 },
      { type: "quote", text: "The world is a book, and those who do not travel read only one page.", author: "St. Augustine" },
      { type: "image", src: u("1502602898657-3e91760cbb34", 900), alt: "Paris rooftops", height: 600 },
    ],
  },
  {
    id: "creative-workspace",
    title: "Creative Workspace Setup",
    description: "Designed for deep work — warm lamps, monitor arms, and a single fresh notebook.",
    tags: ["Productivity", "Study", "Workspace", "Design"],
    itemCount: 27,
    lastEdited: "Edited last week",
    palette: ["#F5EFE6", "#E1D3BE", "#B49A7A", "#5B4A38", "#1F1814"],
    covers: [
      u("1497032628192-86f99bcd76bc"),
      u("1518770660439-4636190af475"),
      u("1519682337058-a94d519337bc"),
      u("1481627834876-b7833e8f5570"),
    ],
    items: [
      { type: "image", src: u("1497032628192-86f99bcd76bc", 900), alt: "Warm desk setup", height: 600 },
      { type: "note", title: "Rules of the desk", body: "One task at a time. Tea before email. Pen and paper always within reach.", bg: "white", font: "sans" },
      { type: "image", src: u("1518770660439-4636190af475", 900), alt: "Keyboard close-up", height: 460 },
      { type: "image", src: u("1519682337058-a94d519337bc", 900), alt: "Stacked books", height: 700 },
    ],
  },
  {
    id: "vision-board-2026",
    title: "Personal Growth Vision Board",
    description: "The year of becoming. Intentions, mantras, and the version of you waiting on the other side.",
    tags: ["Vision Boards", "Personal Growth", "Mindset", "Self"],
    itemCount: 22,
    lastEdited: "Edited 30 minutes ago",
    palette: ["#FAF3EC", "#F2D8C8", "#D8A593", "#7A5B4E", "#2A1F1A"],
    covers: [
      u("1499002238440-d264edd596ec"),
      u("1517837125937-53bd402f49d6"),
      u("1513475382585-d06e58bcb0e0"),
      u("1481627834876-b7833e8f5570"),
    ],
    items: [
      { type: "note", title: "This year, I am", body: "Slower. Stronger. Softer with myself. Braver with my work.", bg: "blush", font: "script" },
      { type: "quote", text: "She believed she could, so she did." },
      { type: "image", src: u("1499002238440-d264edd596ec", 900), alt: "Morning ritual", height: 640 },
      { type: "image", src: u("1517837125937-53bd402f49d6", 900), alt: "Notebook journal", height: 500 },
    ],
  },
  {
    id: "modern-cafe-branding",
    title: "Modern Café Branding",
    description: "Warm off-white walls, hand-thrown ceramics, and a wordmark set in a quiet serif.",
    tags: ["Branding", "Graphic Design", "Café", "Identity"],
    itemCount: 31,
    lastEdited: "Edited 3 days ago",
    palette: ["#F4ECDE", "#E2C9A7", "#B58A60", "#5E3F26", "#1A0F07"],
    covers: [
      u("1495474472287-4d71bcdd2085"),
      u("1453614512568-c4024d13c247"),
      u("1442975631115-c4f7b05b8a2c"),
      u("1611162616475-46b635cb6868"),
    ],
    items: [
      { type: "image", src: u("1495474472287-4d71bcdd2085", 900), alt: "Café counter", height: 620 },
      { type: "note", title: "Wordmark", body: "Custom serif. Wide tracking. Lowercase only.", bg: "cream", font: "serif" },
      { type: "image", src: u("1611162616475-46b635cb6868", 900), alt: "Print sample", height: 540 },
      { type: "quote", text: "Good design is as little design as possible.", author: "Dieter Rams" },
    ],
  },
];

export const getBoard = (id: string) => boards.find((b) => b.id === id);