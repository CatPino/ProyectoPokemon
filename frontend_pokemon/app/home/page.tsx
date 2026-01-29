"use client";

import { useMemo, useState } from "react";
import SearchBar from "../../componentes/SearchBar";
import PokemonCard from "../../componentes/PokemonCard";
import { PokemonDetail } from "../lib/api";

const BASE_20 = [
  "bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard",
  "squirtle","wartortle","blastoise","caterpie","metapod","butterfree",
  "weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate",
];

export default function HomePage() {
  const [count, setCount] = useState(20);
  const [searchResult, setSearchResult] =
    useState<PokemonDetail | null | undefined>(undefined);

  const names = useMemo(() => BASE_20.slice(0, count), [count]);

  const resetSearch = () => setSearchResult(undefined);

  return (
    <div>
      <SearchBar onResult={setSearchResult} />
      {searchResult === null && (
        <div className="mt-4 rounded-xl border bg-black p-4">
          <p className="text-sm text-red-600 font-semibold">
            Pokémon no encontrado
          </p>

          <button
            onClick={resetSearch} className="mt-3 rounded-xl border px-4 py-2 bg-gray-50 text-black">
            Volver al listado
          </button>
        </div>
      )}

      {searchResult && (
        <div className="mt-6">
          <div className="flex justify-end">
          </div>

          <div className="mt-3">
            <PokemonCard name={searchResult.name} />
          </div>
        </div>
      )}

      {searchResult === undefined && (
        <>
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
        </>
      )}
    </div>
  );
}