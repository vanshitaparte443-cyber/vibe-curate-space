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
 > <form onSubmit={handleSubmit} className="space-y-5"> <div> <label className="mb-2 block text-sm font-medium">
Email </label>


      <input
        type="email"
        placeholder="you@example.com"
        className="w-full rounded-2xl border border-border bg-background/70 p-3 outline-none transition focus:border-primary"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium">
        Password
      </label>

      <input
        type="password"
        placeholder="••••••••"
        className="w-full rounded-2xl border border-border bg-background/70 p-3 outline-none transition focus:border-primary"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <button
      disabled={loadingBtn}
      className="w-full rounded-2xl bg-black p-3 text-white transition hover:opacity-90"
    >
      {loadingBtn ? "Logging in..." : "Login"}
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
