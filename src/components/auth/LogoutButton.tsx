import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/lib/auth-store";

export function LogoutButton() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  async function handleLogout() {
    await logout();
    navigate({ to: "/login" });
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full bg-red-500 px-4 py-2 text-sm text-white"
    >
      Logout
    </button>
  );
}