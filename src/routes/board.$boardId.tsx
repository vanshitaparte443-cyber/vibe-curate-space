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

      <div className="flex items-center justify-between p-4 border-b">
        <Link to="/">← Back</Link>

        <button onClick={copyShareLink}>
          <Share2 /> Share
        </button>
      </div>

      <section className="p-6">
        <h1 className="text-3xl font-bold">
          {board.title}
        </h1>
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