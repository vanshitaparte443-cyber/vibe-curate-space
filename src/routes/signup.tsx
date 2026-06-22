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
 > <form
     onSubmit={handleSubmit}
     className="space-y-5"
   > <div> <label className="mb-2 block text-sm font-medium">
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
        placeholder="Create a password"
        className="w-full rounded-2xl border border-border bg-background/70 p-3 outline-none transition focus:border-primary"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <button
      type="submit"
      disabled={btnLoading}
      className="w-full rounded-2xl bg-black p-3 text-white transition hover:opacity-90"
    >
      {btnLoading ? "Creating..." : "Create Account"}
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
