import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { signUp } from "@/lib/auth";
import { useAuth } from "@/lib/useAuth";

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
        "Account created successfully 🚀 Check your email to verify your account, then log in."
      );

      setTimeout(() => {
        navigate({ to: "/login" });
      }, 2500);
    }

    setBtnLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold mb-2">
          Create Account
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Join MuseBoard and save your inspiration.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border p-3"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border p-3"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={btnLoading}
            className="w-full rounded-xl bg-black text-white p-3"
          >
            {btnLoading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}