export type PokemonDetail = {
  id: number;
  name: string;
  types: string[];
  image: string;
  abilities: string[];
};

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getPokemonFromBackend(name: string): Promise<PokemonDetail> {
  if (!BACKEND) throw new Error("Falta NEXT_PUBLIC_BACKEND_URL en .env.local");

  const res = await fetch(`${BACKEND}/pokemon/${encodeURIComponent(name)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`No se pudo obtener ${name} (HTTP ${res.status})`);
  }

  return res.json();
}
