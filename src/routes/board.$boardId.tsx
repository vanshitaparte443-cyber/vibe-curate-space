import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Share2,
  Download,
  Pencil,
  Plus,
  Clock,
  Check,
} from "lucide-react";

import { TopNav } from "@/components/vault/TopNav";
import { MasonryItem } from "@/components/vault/MasonryItem";
import { getBoard } from "@/lib/boards-data";
import {
  getMergedBoard,
  getMergedBoards,
  useVault,
  deleteItem,
  updateBoardMeta,
  trackRecent,
} from "@/lib/vault-store";
import { Fab } from "@/components/vault/Fab";
import { AddItemModal, type AddMode } from "@/components/vault/AddItemModal";
import type { BoardCardContent } from "@/lib/boards-data";

// 🔐 ADD THIS
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/board/$boardId")({
  loader: ({ params }) => {
    const board = getBoard(params.boardId);
    return { board: board ?? null, boardId: params.boardId };
  },

  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.board?.title ?? "Board"} — MuseBoard`,
          },
        ]
      : [{ title: "Board — MuseBoard" }],
  }),

  component: () => (
    <ProtectedRoute>
      <BoardWorkspace />
    </ProtectedRoute>
  ),
});

function BoardWorkspace() {
  useVault();

  const { boardId } = Route.useLoaderData() as {
    boardId: string;
  };

  const board = getMergedBoard(boardId);

  useEffect(() => {
    if (board) trackRecent(board.id);
  }, [board?.id]);

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [addMode, setAddMode] = useState<AddMode>("image");
  const [editingItem, setEditingItem] =
    useState<BoardCardContent | null>(null);

  if (!board) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div>
          <h1>Board not found</h1>
          <Link to="/">Go home</Link>
        </div>
      </div>
    );
  }

  function copyShareLink() {
    const url = `${window.location.origin}/board/${board.id}`;
    navigator.clipboard.writeText(url);
  }

  const startEditTitle = () => {
    setTitleDraft(board.title);
    setEditingTitle(true);
  };

  const commitTitle = () => {
    if (
      titleDraft.trim() &&
      titleDraft.trim() !== board.title
    ) {
      updateBoardMeta(board.id, {
        title: titleDraft.trim(),
      });
    }
    setEditingTitle(false);
  };

  const openAdd = (mode: AddMode) => {
    setEditingItem(null);
    setAddMode(mode);
    setAddOpen(true);
  };

  const openEdit = (item: BoardCardContent) => {
    if (!item.id) return;
    setEditingItem(item);
    setAddMode(
      item.type === "image"
        ? "image"
        : item.type === "link"
        ? "link"
        : "note"
    );
    setAddOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav compact />
  
      {/* TOP BAR */}
  
      <div className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/boards"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
  
          <button
            onClick={copyShareLink}
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-4 py-2 text-sm"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
  
      {/* BOARD HEADER */}
  
      <section className="border-b border-border/60 px-8 py-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Inspiration Board
            </p>
  
            <h1 className="mt-2 font-display text-5xl text-foreground">
              {board.title}
            </h1>
  
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {board.description}
            </p>
  
            <div className="mt-5 flex gap-6 text-sm text-muted-foreground">
              <span>{board.itemCount} items</span>
              <span>{board.tags.length} tags</span>
              <span>Updated recently</span>
            </div>
  
            <div className="mt-4 flex flex-wrap gap-2">
              {board.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 px-3 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
  
          <div className="flex gap-2">
            <button
              onClick={copyShareLink}
              className="rounded-xl border border-border/60 px-4 py-2"
            >
              <Share2 className="h-4 w-4" />
            </button>
  
            <button className="rounded-xl border border-border/60 px-4 py-2">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
  
      {/* MASONRY GRID */}
  
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          <AnimatePresence>
            {board.items.map((item, index) => (
              <MasonryItem
                key={item.id ?? index}
                item={item}
                index={index}
                onEdit={() => openEdit(item)}
                onDelete={() => {
                  if (item.id) {
                    deleteItem(board.id, item.id);
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
  
      <Fab onPick={openAdd} />
  
      <AddItemModal
        open={addOpen}
        mode={addMode}
        boardId={board.id}
        onClose={() => {
          setAddOpen(false);
          setEditingItem(null);
        }}
        editItem={editingItem ?? undefined}     
      />
  </div>
);
}