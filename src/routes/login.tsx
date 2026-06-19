import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { signIn } from "@/lib/auth";
import { useAuthStore } from "@/lib/auth-store";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/boards" });
    }
  }, [user, loading]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoadingBtn(true);
    setMessage("");

    const { error } = await signIn(email, password);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Welcome back 🎉");
      navigate({ to: "/boards" });
    }

    setLoadingBtn(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loadingBtn} className="w-full bg-black text-white p-2">
          {loadingBtn ? "Logging in..." : "Login"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}