import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signUp } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await signUp(email, password);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Account created successfully.");

      setTimeout(() => {
        navigate({ to: "/" });
      }, 2000);
    }

    setLoading(false);
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black text-white p-3"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}