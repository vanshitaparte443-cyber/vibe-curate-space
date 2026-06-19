import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getUser } from "@/lib/auth-session";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const user = await getUser();

      if (!user) {
        navigate({ to: "/login" });
        return;
      }

      setAuthorized(true);
      setChecking(false);
    }

    checkAuth();
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}