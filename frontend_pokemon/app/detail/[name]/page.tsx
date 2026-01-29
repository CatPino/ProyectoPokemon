"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getPokemonFromBackend, PokemonDetail } from "../../lib/api";
import { isFavorite, toggleFavorite } from "../../lib/favorites";

export default function DetailPage() {
  const params = useParams<{ name: string }>();
  const rawName = params?.name;

  const name = useMemo(() => {
    if (!rawName) return "";
    return Array.isArray(rawName) ? rawName[0] : rawName;
  }, [rawName]);

  const [data, setData] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (!name) return;

    setFav(isFavorite(name));
    setLoading(true);
    setErr(null);

    getPokemonFromBackend(name)
      .then((p) => setData(p))
      .catch((e: any) => {
        setErr(e?.message ?? "Error al cargar el Pokémon");
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [name]);

  const onToggleFav = () => {
    toggleFavorite(name);
    setFav(isFavorite(name));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Link href="/home" className="underline">Volver</Link>

        <button
          onClick={onToggleFav} className={`rounded-xl px-4 py-2 border ${
            fav ? "bg-yellow-100 text-black" : "hover:bg-gray-50"}`}>
          {fav ? " Capturado" : "Capturar"}
        </button>
      </div>

      {loading && (
        <div className="mt-8 rounded-2xl border bg-white p-6">
          <p className="text-sm text-gray-500">Cargando detalle...</p>
        </div>
      )}

      {!loading && err && (
        <div className="mt-8 rounded-2xl border bg-white p-6">
          <p className="text-red-600 font-semibold">{err}</p>
          <p className="text-sm text-gray-500 mt-2">
            Prueba con otro nombre (ej: <code>pikachu</code>).
          </p>
        </div>
      )}

      {!loading && data && (
        <div className="mt-8 rounded-2xl border bg-black p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
            <div className="w-40 h-40 rounded-2xl border bg-white flex items-center justify-center overflow-hidden">
              <img
                src={data.image}
                alt={data.name}
                className="w-40 h-40 object-contain"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold capitalize">{data.name}</h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {data.types.map((t) => (
                  <span key={t}
                    className="px-3 py-1 rounded-full border text-sm capitalize">{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h2 className="mt-8 text-lg font-semibold">Habilidades principales</h2>
          <ul className="mt-2 list-disc pl-6">
            {data.abilities.map((a) => (
              <li key={a} className="capitalize">{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
