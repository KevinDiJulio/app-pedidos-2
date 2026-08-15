import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedidos",
  description: "App de pedidos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>
          <nav style={{ padding: "12px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", gap: "20px" }}>
            <a href="/">Catálogo</a>
            <a href="/pedidos">Mis pedidos</a>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
