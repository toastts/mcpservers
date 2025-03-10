"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticate } from "./actions";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await authenticate(undefined, formData);
    if (result) {
      setError(result);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded shadow-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-center">Sign In</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
