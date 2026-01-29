import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Next + Nest + PokeAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/home" className="font-bold text-lg">Pokédex</a>
            <nav className="text-sm flex gap-4">
              <a className="underline" href="/home">Home</a>
              <a className="underline" href="/favorites">Favoritos</a>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-6">{children}</main>
      </body>
    </html>
  );
}
