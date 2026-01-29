"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPokemonFromBackend } from "../app/lib/api";
import { isFavorite, toggleFavorite } from "../app/lib/favorites";

type Props = { name: string };

export default function PokemonCard({ name }: Props) {
  const [fav, setFav] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setFav(isFavorite(name));

    let mounted = true;
    getPokemonFromBackend(name)
      .then((data) => mounted && setImage(data.image))
      .catch(() => mounted && setImage(null));

    return () => {
      mounted = false;
    };
  }, [name]);

  const onToggle = () => {
    toggleFavorite(name);
    setFav(isFavorite(name));
  };

  return (
    <div className="rounded-2xl border bg-black p-4 shadow-sm flex items-center justify-between gap-3">
      <Link
        href={`/detail/${encodeURIComponent(name)}`}
        className="flex items-center gap-3"
      >
        <div className="h-12 w-12 rounded-xl border bg-white flex items-center justify-center overflow-hidden">
          {image && (
                <img src={image} alt={name} className="h-12 w-12 object-contain" />
            )}
        </div>

        <div>
          <p className="font-semibold capitalize">{name}</p>
          <p className="text-xs text-gray-500">Ver detalle de pokemon</p>
        </div>
      </Link>

      <button
        onClick={onToggle} className={`rounded-xl px-3 py-2 border ${
          fav ? "bg-yellow-100 text-black" : "hover:bg-gray-50"
        }`}>
        {fav ? " Capturado" : " Capturar"}
      </button>
    </div>
  );
}
