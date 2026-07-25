import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { signUp } from "@/lib/auth";
import { useAuth } from "@/lib/useAuth";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/signup")({
component: SignupPage,
});

function SignupPage() {
const navigate = useNavigate();

const { user, loading } = useAuth();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [btnLoading, setBtnLoading] = useState(false);
const [message, setMessage] = useState("");

useEffect(() => {
if (!loading && user) {
navigate({ to: "/boards" });
}
}, [user, loading, navigate]);

async function handleSubmit(
e: React.FormEvent<HTMLFormElement>
) {
e.preventDefault();


setBtnLoading(true);
setMessage("");

const { error } = await signUp(
  email.trim(),
  password
);

if (error) {
  setMessage(error.message);
} else {
  setMessage(
    "Account created successfully 🚀 Check your email to verify your account."
  );

  setTimeout(() => {
    navigate({ to: "/login" });
  }, 2500);
}

setBtnLoading(false);


}

return ( <AuthLayout
    title="Create Your Account"
    subtitle="Join MuseBoard and start collecting inspiration."
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
          placeholder="Create a password"
          className="w-full rounded-[14px] border border-border/80 bg-background/50 p-3.5 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/60 hover:border-border/100 focus:border-primary/80 focus:bg-card focus:ring-4 focus:ring-primary/10 focus:shadow-soft"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={btnLoading}
        className="relative w-full rounded-[14px] bg-foreground p-3.5 text-sm font-semibold text-background transition-all duration-200 hover:opacity-95 hover:shadow-soft active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50"
      >
        {btnLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            Creating...
          </span>
        ) : (
          "Create Account"
        )}
      </button>

    {message && (
      <p className="text-center text-sm text-muted-foreground">
        {message}
      </p>
    )}

    <p className="text-center text-sm text-muted-foreground">
      Already have an account?{" "}
      <Link
        to="/login"
        className="font-medium text-foreground hover:underline"
      >
        Sign in
      </Link>
    </p>
  </form>
</AuthLayout>


);
}
