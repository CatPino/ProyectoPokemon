"use client";

import { useEffect, useState } from "react";
import PokemonCard from "../../componentes/PokemonCard";
import { getFavorites, clearFavorites } from "../lib/favorites";
import Link from "next/link";

export default function FavoritesPage() {
  const [names, setNames] = useState<string[]>([]);

  const refresh = () => setNames(getFavorites());

  useEffect(() => {
    refresh();

    const onStorage = () => refresh();
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div>
      <Link href="/home" className="underline">Volver</Link>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Favoritos</h1>
      </div>

      {names.length === 0 ? (
        <p className="mt-6 text-sm text-gray-600">
          No has capturado ningún Pokémon todavía.
        </p>
      ) : (
        <div className="mt-6 grid gap-3">
          {names.map((name) => (<PokemonCard key={name} name={name} />))}
        </div>
      )}
    </div>
  );
}
