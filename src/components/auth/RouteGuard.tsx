import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useAuthStore } from "@/lib/auth-store";

export function RouteGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    const path = location.pathname;

    const isAuthPage = path === "/signup" || path === "/login";

    // ❌ Not logged in → force signup
    if (!user && !isAuthPage) {
      navigate({ to: "/signup" });
    }

    // ❌ Logged in → block auth pages
    if (user && isAuthPage) {
      navigate({ to: "/boards" });
    }
  }, [user, loading, location.pathname]);

  if (loading) return null;

  return <>{children}</>;
}