const KEY = "pokemon_favorites";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(list: string[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function isFavorite(name: string): boolean {
  return read().includes(name.toLowerCase());
}

export function toggleFavorite(name: string) {
  const n = name.toLowerCase();
  const list = read();
  const exists = list.includes(n);

  const next = exists ? list.filter((x) => x !== n) : [...list, n];
  write(next);
}

export function getFavorites(): string[] {
  return read();
}

export function clearFavorites() {
  write([]);
}
