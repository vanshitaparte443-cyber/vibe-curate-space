import { useSyncExternalStore } from "react";
import { boards as seedBoards, type Board, type BoardCardContent } from "./boards-data";

export type UserBoard = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  cover?: string;
  palette: string[];
  createdAt: number;
};

type VaultState = {
  userBoards: UserBoard[];
  // items added by user, keyed by boardId
  userItems: Record<string, BoardCardContent[]>;
  // overrides for seed board metadata (title/description/tags)
  boardOverrides: Record<
    string,
    Partial<Pick<Board, "title" | "description" | "tags">>
  >;
  favorites: string[];
  recents: string[]; // most-recent first
};

const STORAGE_KEY = "vv-vault-v1";
const empty: VaultState = {
  userBoards: [],
  userItems: {},
  boardOverrides: {},
  favorites: [],
  recents: [],
};

let state: VaultState = empty;
let initialized = false;
const listeners = new Set<() => void>();

function load(): VaultState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    return {
      userBoards: parsed.userBoards ?? [],
      userItems: parsed.userItems ?? {},
      boardOverrides: parsed.boardOverrides ?? {},
      favorites: parsed.favorites ?? [],
      recents: parsed.recents ?? [],
    };
  } catch {
    return empty;
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota */
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function ensureInit() {
  if (initialized || typeof window === "undefined") return;
  state = load();
  initialized = true;
}

function subscribe(l: () => void) {
  ensureInit();
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function getSnapshot(): VaultState {
  ensureInit();
  return state;
}

const getServerSnapshot = (): VaultState => empty;

export function useVault() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function update(producer: (s: VaultState) => VaultState) {
  ensureInit();
  state = producer(state);
  persist();
  emit();
}

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

const DEFAULT_PALETTE = ["#FAF7F2", "#E7DCCF", "#D8B4A0", "#A38872", "#2B2B2B"];

export function createBoard(input: {
  title: string;
  description: string;
  category: string;
  tags: string[];
  cover?: string;
}): UserBoard {
  const base = slugify(input.title) || "board";
  let id = base;
  let i = 2;
  const taken = new Set([
    ...seedBoards.map((b) => b.id),
    ...state.userBoards.map((b) => b.id),
  ]);
  while (taken.has(id)) id = `${base}-${i++}`;
  const board: UserBoard = {
    id,
    title: input.title.trim(),
    description: input.description.trim(),
    category: input.category,
    tags: input.tags,
    cover: input.cover?.trim() || undefined,
    palette: DEFAULT_PALETTE,
    createdAt: Date.now(),
  };
  update((s) => ({ ...s, userBoards: [board, ...s.userBoards] }));
  return board;
}

export function deleteBoard(id: string) {
  update((s) => {
    const userBoards = s.userBoards.filter((b) => b.id !== id);
    const userItems = { ...s.userItems };
    delete userItems[id];
    return { ...s, userBoards, userItems };
  });
}

export function updateBoardMeta(
  id: string,
  patch: Partial<Pick<Board, "title" | "description" | "tags">>,
) {
  update((s) => {
    const isSeed = seedBoards.some((b) => b.id === id);
    if (isSeed) {
      return {
        ...s,
        boardOverrides: {
          ...s.boardOverrides,
          [id]: { ...(s.boardOverrides[id] ?? {}), ...patch },
        },
      };
    }
    return {
      ...s,
      userBoards: s.userBoards.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    };
  });
}

export function addItem(boardId: string, item: BoardCardContent) {
  const withId = { ...item, id: item.id ?? uid() };
  update((s) => ({
    ...s,
    userItems: {
      ...s.userItems,
      [boardId]: [withId, ...(s.userItems[boardId] ?? [])],
    },
  }));
  return withId;
}

export function updateItem(
  boardId: string,
  itemId: string,
  patch: Partial<BoardCardContent>,
) {
  update((s) => ({
    ...s,
    userItems: {
      ...s.userItems,
      [boardId]: (s.userItems[boardId] ?? []).map((it) =>
        it.id === itemId ? ({ ...it, ...patch } as BoardCardContent) : it,
      ),
    },
  }));
}

export function deleteItem(boardId: string, itemId: string) {
  update((s) => ({
    ...s,
    userItems: {
      ...s.userItems,
      [boardId]: (s.userItems[boardId] ?? []).filter((it) => it.id !== itemId),
    },
  }));
}

export function userBoardToBoard(b: UserBoard): Board {
  const items = state.userItems[b.id] ?? [];
  const coverFallback =
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80";
  const imageItems = items.filter((i) => i.type === "image") as Extract<
    BoardCardContent,
    { type: "image" }
  >[];
  const covers: string[] = [];
  if (b.cover) covers.push(b.cover);
  for (const im of imageItems) {
    if (covers.length >= 4) break;
    if (!covers.includes(im.src)) covers.push(im.src);
  }
  while (covers.length < 4) covers.push(coverFallback);
  return {
    id: b.id,
    title: b.title,
    description: b.description || "A fresh canvas. Start adding inspiration.",
    tags: b.tags.length ? b.tags : [b.category],
    itemCount: items.length,
    lastEdited: "Just now",
    palette: b.palette,
    covers,
    items,
  };
}

export function getMergedBoards(): Board[] {
  ensureInit();
  const user = state.userBoards.map(userBoardToBoard);
  const seeds = seedBoards.map((b) => {
    const o = state.boardOverrides[b.id];
    const extras = state.userItems[b.id] ?? [];
    return {
      ...b,
      ...(o ?? {}),
      items: [...extras, ...b.items],
      itemCount: b.items.length + extras.length,
    };
  });
  return [...user, ...seeds];
}

export function getMergedBoard(id: string): Board | undefined {
  return getMergedBoards().find((b) => b.id === id);
}

export function isUserBoard(id: string): boolean {
  return state.userBoards.some((b) => b.id === id);
}

// ---- Favorites ----
export function toggleFavorite(id: string) {
  update((s) => {
    const has = s.favorites.includes(id);
    return {
      ...s,
      favorites: has ? s.favorites.filter((x) => x !== id) : [id, ...s.favorites],
    };
  });
}
export function isFavorite(id: string): boolean {
  ensureInit();
  return state.favorites.includes(id);
}

// ---- Recently viewed ----
const RECENTS_LIMIT = 12;
export function trackRecent(id: string) {
  update((s) => ({
    ...s,
    recents: [id, ...s.recents.filter((x) => x !== id)].slice(0, RECENTS_LIMIT),
  }));
}

// ---- Search across boards + items ----
export function searchBoards(query: string): Board[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getMergedBoards().filter((b) => {
    if (b.title.toLowerCase().includes(q)) return true;
    if (b.description.toLowerCase().includes(q)) return true;
    if (b.tags.some((t) => t.toLowerCase().includes(q))) return true;
    return b.items.some((it) => {
      if (it.type === "note") {
        return (
          it.title.toLowerCase().includes(q) || it.body.toLowerCase().includes(q)
        );
      }
      if (it.type === "quote") return it.text.toLowerCase().includes(q);
      if (it.type === "image")
        return (it.caption ?? "").toLowerCase().includes(q) || it.alt.toLowerCase().includes(q);
      if (it.type === "link")
        return (
          (it.title ?? "").toLowerCase().includes(q) ||
          (it.description ?? "").toLowerCase().includes(q) ||
          it.url.toLowerCase().includes(q)
        );
      return false;
    });
  });
}