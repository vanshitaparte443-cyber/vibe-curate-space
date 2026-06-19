import { useAuthStore } from "@/lib/auth-store";

export function UserMenu() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted-foreground">
        {user.email}
      </span>

      <button
        onClick={logout}
        className="rounded-md border px-3 py-1 text-xs hover:bg-muted"
      >
        Logout
      </button>
    </div>
  );
}