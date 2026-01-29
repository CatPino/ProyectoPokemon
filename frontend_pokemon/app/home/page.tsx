"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/componentes/SearchBar";
import PokemonCard from "@/componentes/PokemonCard";

const BASE_20 = [
  "bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard",
  "squirtle","wartortle","blastoise","caterpie","metapod","butterfree",
  "weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate",
];

export default function HomePage() {
  const [count, setCount] = useState(20);
  const names = useMemo(() => BASE_20.slice(0, count), [count]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pokédex</h1>

      <SearchBar />

      <div className="mt-6 grid gap-3">
        {names.map((name) => (
          <PokemonCard key={name} name={name} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setCount((c) => Math.min(c + 20, BASE_20.length))}
          disabled={count >= BASE_20.length}
          className="rounded-xl px-4 py-2 border hover:bg-gray-50 disabled:opacity-50"
        >
          {count >= BASE_20.length ? "No hay más" : "Cargar más"}
        </button>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        *Listado local. El detalle y búsqueda consumen tu backend NestJS (/pokemon/:name).
      </p>
    </div>
  );
}
