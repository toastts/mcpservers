"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  initialQuery?: string;
}

export default function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/servers?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search servers..."
        className="border border-gray-700 bg-gray-800 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full max-w-md"
      />
      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded font-semibold"
      >
        Search
      </button>
    </form>
  );
}
