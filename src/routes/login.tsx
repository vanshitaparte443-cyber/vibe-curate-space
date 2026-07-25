import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { signIn } from "@/lib/auth";
import { useAuthStore } from "@/lib/auth-store";
import { AuthLayout } from "@/components/AuthLayout";

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
}, [user, loading, navigate]);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();


setLoadingBtn(true);
setMessage("");

const { error } = await signIn(email, password);

if (error) {
  setMessage(error.message);
} else {
  navigate({ to: "/boards" });
}

setLoadingBtn(false);


}

return ( <AuthLayout
    title="Welcome Back"
    subtitle="Sign in and continue curating your inspiration."
  >
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-[13px] font-semibold text-foreground/80">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-[14px] border border-border/80 bg-background/50 p-3.5 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 hover:border-border/100 focus:border-primary/80 focus:bg-card focus:ring-4 focus:ring-primary/10 focus:shadow-soft"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-semibold text-foreground/80">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-[14px] border border-border/80 bg-background/50 p-3.5 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 hover:border-border/100 focus:border-primary/80 focus:bg-card focus:ring-4 focus:ring-primary/10 focus:shadow-soft"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        disabled={loadingBtn}
        className="relative w-full rounded-[14px] bg-foreground p-3.5 text-sm font-semibold text-background transition-all duration-200 hover:opacity-95 hover:shadow-soft active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50"
      >
        {loadingBtn ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            Logging in...
          </span>
        ) : (
          "Login"
        )}
      </button>

    {message && (
      <p className="text-center text-sm text-red-500">
        {message}
      </p>
    )}

    <p className="text-center text-sm text-muted-foreground">
      Don't have an account?{" "}
      <Link
        to="/signup"
        className="font-medium text-foreground hover:underline"
      >
        Create one
      </Link>
    </p>
  </form>
</AuthLayout>


);
}
