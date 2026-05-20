"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyPassword } from "@/app/actions/auth";
import { Heart, Lock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await verifyPassword(password);
      if (result.success) {
        router.push("/message");
      } else {
        setError(result.error || "Invalid password");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream-500 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-cherry-100 relative">
        <Heart size={16} className="absolute top-4 left-4 text-cherry-200" />
        <Heart size={16} className="absolute top-4 right-4 text-cherry-200" />
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-cherry-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-cherry-200">
            <Lock className="text-cherry-600" size={24} />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-cherry-900 font-bold mb-2">Protected Area</h1>
          <p className="font-[family-name:var(--font-cormorant)] text-cherry-600 text-lg">
            Please enter the password to view the guestbook messages.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full bg-cream-50 p-4 rounded-xl text-xl outline-none text-cherry-950 placeholder:text-cherry-300 font-[family-name:var(--font-cormorant)] border border-cherry-200 focus:border-cherry-400 focus:ring-2 focus:ring-cherry-100 transition-all text-center tracking-widest"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-center font-[family-name:var(--font-cormorant)]">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-cherry-800 hover:bg-cherry-700 disabled:opacity-70 text-cream-100 font-[family-name:var(--font-playfair)] text-xl tracking-wider transition-colors shadow-md rounded-lg"
          >
            {isLoading ? "Verifying..." : "Unlock Messages"}
          </button>
        </form>
      </div>
    </main>
  );
}
