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
        <nav style={{ padding: "12px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", gap: "20px" }}>
          <a href="/">Catálogo</a>
          <a href="/pedidos">Mis pedidos</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
