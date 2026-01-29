import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
      <body className="min-h-screen bg-gray-50">
        <header className="border-b bg-white">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            
            <Link href="/home" className="flex items-center gap-2 font-bold text-lg text-black">
              <Image src="/poke-logo.png" alt="Pokédex" width={32} height={32} priority/>
              Pokédex
            </Link>

            <nav className="text-sm flex gap-4">
              <Link href="/home" className="underline text-black">Home</Link>
              <Link href="/favorites" className="underline text-black">Favoritos</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
