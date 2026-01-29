"use client";

import { useState } from "react";
import { getPokemonFromBackend, PokemonDetail } from "../app/lib/api";

type Props = {
  onResult: (pokemon: PokemonDetail | null) => void;
};

export default function SearchBar({ onResult }: Props) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = value.trim().toLowerCase();
    if (!name) return;

    setLoading(true);
    try {
      const data = await getPokemonFromBackend(name);
      onResult(data); 
    } catch {
      onResult(null); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSearch} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar por nombre"
        className="flex-1 rounded-xl border px-4 py-2"
      />
      <button
        disabled={loading}
        className="rounded-xl border px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
