"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const name = value.trim().toLowerCase();
    if (!name) return;
    router.push(`/detail/${encodeURIComponent(name)}`);
  };

  return (
    <form onSubmit={onSearch} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar por nombre (ej: pikachu)"
        className="flex-1 rounded-xl border px-4 py-2"
      />
      <button className="rounded-xl border px-4 py-2 hover:bg-gray-100">
        Buscar
      </button>
    </form>
  );
}
