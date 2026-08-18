"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios  from "axios";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await signup(name, email, password);
      router.push("/workspaces");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.errors?.[0]?.message ||
            err.response?.data?.message ||
            "Signup failed",
        );
      } else {
        setError("Signup failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Create your Collavix account</h1>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Password (8+ characters, 1 number)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-50"
        >
          {submitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
