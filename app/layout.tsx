import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedidos",
  description: "App de pedidos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav className="flex gap-5 px-6 py-3 border-b border-gray-200">
          <a href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">Catálogo</a>
          <a href="/pedidos" className="text-sm font-medium text-gray-700 hover:text-gray-900">Mis pedidos</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
